import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';
import { Pool } from 'pg';
import type {
  QuotationRecord,
  QuotationSubmissionInput,
  QuotationNotificationStatus,
} from '@/types/quotation';

interface QuotationDbRow {
  id: string;
  idempotency_key?: string;
  created_at: string | Date;
  customer_name?: string | null;
  customer_phone: string;
  customer_line_id?: string | null;
  job_type: string;
  origin_province: string;
  origin_district?: string | null;
  destination_province: string;
  destination_district?: string | null;
  appointment_date: string;
  time_slot?: string | null;
  cargo_description?: string | null;
  lifting_help?: string | null;
  floor_origin?: string | null;
  floor_destination?: string | null;
  notes?: string | null;
  motorcycle_type?: string | null;
  motorcycle_model?: string | null;
  is_rideable?: string | null;
  factory_packaging?: string | null;
  factory_weight?: string | null;
  needs_pod_return?: boolean | null;
  summary_text?: string | null;
  source_url?: string | null;
  notification_status: 'pending' | 'sent' | 'failed';
  retry_count: number;
  last_error?: string | null;
  sent_at?: string | Date | null;
}

// Optional PostgreSQL driver (pg)
let pgPool: Pool | null = null;
let isDbInitialized = false;

const DATA_DIR = path.join(process.cwd(), 'data', 'quotations');
const STORAGE_FILE = path.join(DATA_DIR, 'quotations.json');
const BACKUP_FILE = path.join(DATA_DIR, 'quotations.backup.json');

// In-memory cache & write mutex for persistent server mode
let inMemoryCache: QuotationRecord[] | null = null;
let writeQueue: Promise<void> = Promise.resolve();

/**
 * Mask phone number for safe logging (e.g. 081-***-5678)
 */
export function maskPhone(phone: string): string {
  const clean = phone.replace(/[^0-9]/g, '');
  if (clean.length < 7) return '***';
  return `${clean.slice(0, 3)}-***-${clean.slice(-3)}`;
}

/**
 * Detect storage engine
 */
export function getStorageEngine(): 'postgresql' | 'persistent_file' | 'ephemeral_serverless' {
  if (process.env.DATABASE_URL) {
    return 'postgresql';
  }
  if (process.env.VERCEL === '1') {
    return 'ephemeral_serverless';
  }
  return 'persistent_file';
}

/**
 * Get PostgreSQL Pool instance
 */
function getPgPool(): Pool | null {
  const connectionString = process.env.DATABASE_URL;
  if (!connectionString) return null;

  if (!pgPool) {
    pgPool = new Pool({
      connectionString,
      ssl: connectionString.includes('localhost') ? false : { rejectUnauthorized: false },
      max: 10,
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000,
    });
  }
  return pgPool;
}

/**
 * Initialize PostgreSQL Schema
 */
async function initPgSchema(): Promise<void> {
  if (isDbInitialized) return;
  const pool = getPgPool();
  if (!pool) return;

  const createTableQuery = `
    CREATE TABLE IF NOT EXISTS wms_quotations (
      id VARCHAR(32) PRIMARY KEY,
      idempotency_key VARCHAR(64) UNIQUE,
      created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
      customer_name TEXT,
      customer_phone VARCHAR(32) NOT NULL,
      customer_line_id TEXT,
      job_type TEXT NOT NULL,
      origin_province TEXT NOT NULL,
      origin_district TEXT,
      destination_province TEXT NOT NULL,
      destination_district TEXT,
      appointment_date TEXT NOT NULL,
      time_slot TEXT,
      cargo_description TEXT,
      lifting_help TEXT,
      floor_origin TEXT,
      floor_destination TEXT,
      notes TEXT,
      motorcycle_type TEXT,
      motorcycle_model TEXT,
      is_rideable TEXT,
      factory_packaging TEXT,
      factory_weight TEXT,
      needs_pod_return BOOLEAN,
      summary_text TEXT,
      source_url TEXT,
      notification_status VARCHAR(16) NOT NULL DEFAULT 'pending',
      retry_count INT NOT NULL DEFAULT 0,
      last_error TEXT,
      sent_at TIMESTAMPTZ
    );
    CREATE INDEX IF NOT EXISTS idx_wms_quotations_phone ON wms_quotations(customer_phone);
    CREATE INDEX IF NOT EXISTS idx_wms_quotations_status ON wms_quotations(notification_status);
  `;

  try {
    await pool.query(createTableQuery);
    isDbInitialized = true;
    console.log('[QuotationStore] PostgreSQL schema initialized successfully.');
  } catch (err) {
    console.error('[QuotationStore] PostgreSQL schema initialization failed:', (err as Error).message);
    throw err;
  }
}

/**
 * Convert DB row to QuotationRecord
 */
function rowToQuotationRecord(row: QuotationDbRow): QuotationRecord {
  return {
    id: row.id,
    idempotencyKey: row.idempotency_key,
    createdAt: new Date(row.created_at).toISOString(),
    customer: {
      name: row.customer_name || undefined,
      phone: row.customer_phone,
      lineId: row.customer_line_id || undefined,
    },
    jobDetails: {
      jobType: row.job_type,
      origin: {
        province: row.origin_province,
        district: row.origin_district || undefined,
      },
      destination: {
        province: row.destination_province,
        district: row.destination_district || undefined,
      },
      appointmentDate: row.appointment_date,
      timeSlot: row.time_slot || undefined,
      cargoDescription: row.cargo_description || undefined,
      liftingHelp: row.lifting_help || undefined,
      floorOrigin: row.floor_origin || undefined,
      floorDestination: row.floor_destination || undefined,
      notes: row.notes || undefined,
      motorcycleType: row.motorcycle_type || undefined,
      motorcycleModel: row.motorcycle_model || undefined,
      isRideable: row.is_rideable || undefined,
      factoryPackaging: row.factory_packaging || undefined,
      factoryWeight: row.factory_weight || undefined,
      needsPodReturn: row.needs_pod_return || undefined,
    },
    summaryText: row.summary_text || '',
    sourceUrl: row.source_url || undefined,
    notification: {
      status: row.notification_status,
      retryCount: row.retry_count || 0,
      lastError: row.last_error || undefined,
      sentAt: row.sent_at ? new Date(row.sent_at).toISOString() : undefined,
    },
  };
}

/**
 * Compute Idempotency Hash
 */
function computeIdempotencyKey(input: QuotationSubmissionInput): string {
  if (input.idempotencyKey) return input.idempotencyKey;
  const cleanPhone = input.customerPhone.replace(/[^0-9]/g, '');
  const keySource = [
    cleanPhone,
    input.originProvince.trim().toLowerCase(),
    (input.originDistrict || '').trim().toLowerCase(),
    input.destinationProvince.trim().toLowerCase(),
    (input.destinationDistrict || '').trim().toLowerCase(),
    input.appointmentDate.trim(),
    (input.cargoDescription || '').trim().toLowerCase(),
  ].join('|');
  return crypto.createHash('sha256').update(keySource).digest('hex');
}

/**
 * Ensure storage directory and file exist for persistent file mode
 */
async function ensureFileStorage(): Promise<void> {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    try {
      await fs.access(STORAGE_FILE);
    } catch {
      await fs.writeFile(STORAGE_FILE, JSON.stringify([], null, 2), 'utf-8');
    }
  } catch (err) {
    console.error('[QuotationStore] Storage initialization error:', (err as Error).message);
  }
}

/**
 * Save Quotation to PostgreSQL
 */
async function saveQuotationToPg(
  input: QuotationSubmissionInput,
  idempotencyKey: string,
  cleanPhone: string
): Promise<{ quotation: QuotationRecord; isDuplicate: boolean }> {
  const pool = getPgPool()!;
  await initPgSchema();

  // 1. Check for duplicate within the last 10 minutes
  const dupQuery = `
    SELECT * FROM wms_quotations 
    WHERE idempotency_key = $1 
       OR (customer_phone = $2 AND destination_province = $3 AND appointment_date = $4 AND created_at > NOW() - INTERVAL '10 minutes')
    ORDER BY created_at DESC LIMIT 1;
  `;
  const dupRes = await pool.query(dupQuery, [
    idempotencyKey,
    cleanPhone,
    input.destinationProvince,
    input.appointmentDate,
  ]);

  if (dupRes.rows.length > 0) {
    const existing = rowToQuotationRecord(dupRes.rows[0]);
    console.log(`[QuotationStore:PG] Duplicate detected: ${existing.id} (${maskPhone(cleanPhone)})`);
    return { quotation: existing, isDuplicate: true };
  }

  // 2. Insert new record
  const randomSuffix = Math.floor(100000 + Math.random() * 900000);
  const quoteRef = `WMS-${randomSuffix}`;

  const insertQuery = `
    INSERT INTO wms_quotations (
      id, idempotency_key, customer_name, customer_phone, customer_line_id,
      job_type, origin_province, origin_district, destination_province, destination_district,
      appointment_date, time_slot, cargo_description, lifting_help, floor_origin, floor_destination,
      notes, motorcycle_type, motorcycle_model, is_rideable, factory_packaging, factory_weight,
      needs_pod_return, summary_text, source_url, notification_status, retry_count
    ) VALUES (
      $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
      $11, $12, $13, $14, $15, $16, $17, $18, $19, $20,
      $21, $22, $23, $24, $25, 'pending', 0
    )
    ON CONFLICT (idempotency_key) DO UPDATE SET idempotency_key = EXCLUDED.idempotency_key
    RETURNING *;
  `;

  const values = [
    quoteRef,
    idempotencyKey,
    input.customerName?.trim() || null,
    cleanPhone,
    input.customerLineId?.trim() || null,
    input.jobType || 'ขนย้ายทั่วไป',
    input.originProvince,
    input.originDistrict || null,
    input.destinationProvince,
    input.destinationDistrict || null,
    input.appointmentDate,
    input.timeSlot || null,
    input.cargoDescription || null,
    input.liftingHelp || null,
    input.floorOrigin || null,
    input.floorDestination || null,
    input.notes || null,
    input.motorcycleType || null,
    input.motorcycleModel || null,
    input.isRideable || null,
    input.factoryPackaging || null,
    input.factoryWeight || null,
    input.needsPodReturn || null,
    input.summaryText || '',
    input.sourceUrl || null,
  ];

  const res = await pool.query(insertQuery, values);
  const createdRecord = rowToQuotationRecord(res.rows[0]);
  const isDuplicate = createdRecord.id !== quoteRef;

  console.log(`[QuotationStore:PG] Persisted quotation ${createdRecord.id} (${maskPhone(cleanPhone)})`);
  return { quotation: createdRecord, isDuplicate };
}

/**
 * Save Quotation to File (Persistent Server Mode)
 */
async function saveQuotationToFile(
  input: QuotationSubmissionInput,
  idempotencyKey: string,
  cleanPhone: string
): Promise<{ quotation: QuotationRecord; isDuplicate: boolean }> {
  if (process.env.VERCEL === '1') {
    console.warn(
      '⚠️ [QuotationStore] Vercel serverless environment detected without DATABASE_URL. Local file writes are ephemeral. Please configure DATABASE_URL in Vercel project settings for durable database storage.'
    );
  }

  return new Promise((resolve, reject) => {
    writeQueue = writeQueue.then(async () => {
      try {
        await ensureFileStorage();
        let records: QuotationRecord[] = [];
        try {
          const raw = await fs.readFile(STORAGE_FILE, 'utf-8');
          records = JSON.parse(raw);
        } catch {
          records = inMemoryCache || [];
        }

        const tenMinutesAgo = Date.now() - 10 * 60 * 1000;
        const existing = records.find((r) => {
          const isSameIdempotency = r.idempotencyKey === idempotencyKey;
          const isSamePhoneAndRoute =
            r.customer.phone.replace(/[^0-9]/g, '') === cleanPhone &&
            r.jobDetails.destination.province === input.destinationProvince &&
            r.jobDetails.appointmentDate === input.appointmentDate;
          const isRecent = new Date(r.createdAt).getTime() > tenMinutesAgo;
          return (isSameIdempotency || isSamePhoneAndRoute) && isRecent;
        });

        if (existing) {
          console.log(`[QuotationStore:File] Duplicate submission detected: ${existing.id} (${maskPhone(cleanPhone)})`);
          resolve({ quotation: existing, isDuplicate: true });
          return;
        }

        const randomSuffix = Math.floor(100000 + Math.random() * 900000);
        const quoteRef = `WMS-${randomSuffix}`;

        const newRecord: QuotationRecord = {
          id: quoteRef,
          idempotencyKey,
          createdAt: new Date().toISOString(),
          customer: {
            name: input.customerName?.trim() || undefined,
            phone: cleanPhone,
            lineId: input.customerLineId?.trim() || undefined,
          },
          jobDetails: {
            jobType: input.jobType || 'ขนย้ายทั่วไป',
            origin: {
              province: input.originProvince,
              district: input.originDistrict || undefined,
            },
            destination: {
              province: input.destinationProvince,
              district: input.destinationDistrict || undefined,
            },
            appointmentDate: input.appointmentDate,
            timeSlot: input.timeSlot,
            cargoDescription: input.cargoDescription,
            liftingHelp: input.liftingHelp,
            floorOrigin: input.floorOrigin,
            floorDestination: input.floorDestination,
            notes: input.notes,
            motorcycleType: input.motorcycleType,
            motorcycleModel: input.motorcycleModel,
            isRideable: input.isRideable,
            factoryPackaging: input.factoryPackaging,
            factoryWeight: input.factoryWeight,
            needsPodReturn: input.needsPodReturn,
          },
          summaryText: input.summaryText || '',
          sourceUrl: input.sourceUrl,
          notification: {
            status: 'pending',
            retryCount: 0,
          },
        };

        records.unshift(newRecord);
        const jsonStr = JSON.stringify(records, null, 2);

        // Atomic write
        const tempFile = path.join(DATA_DIR, `quotations_${Date.now()}_${Math.random().toString(36).slice(2)}.tmp`);
        await fs.writeFile(tempFile, jsonStr, 'utf-8');
        await fs.rename(tempFile, STORAGE_FILE);

        // Periodic backup replication
        try {
          await fs.writeFile(BACKUP_FILE, jsonStr, 'utf-8');
        } catch {
          // Non-critical backup error
        }

        inMemoryCache = records;
        console.log(`[QuotationStore:File] Successfully persisted quotation ${quoteRef} (${maskPhone(cleanPhone)})`);
        resolve({ quotation: newRecord, isDuplicate: false });
      } catch (err) {
        reject(err);
      }
    });
  });
}

/**
 * Public API: Save Quotation (Strict PostgreSQL in Serverless, with file support for persistent local servers)
 */
export async function saveQuotation(
  input: QuotationSubmissionInput
): Promise<{ quotation: QuotationRecord; isDuplicate: boolean }> {
  const cleanPhone = input.customerPhone.replace(/[^0-9]/g, '');
  const idempotencyKey = computeIdempotencyKey(input);
  const isServerless = process.env.VERCEL === '1';

  if (isServerless && !process.env.DATABASE_URL) {
    throw new Error(
      'Durable database storage is required in Vercel serverless environment. Please configure DATABASE_URL in Vercel settings.'
    );
  }

  if (process.env.DATABASE_URL) {
    try {
      return await saveQuotationToPg(input, idempotencyKey, cleanPhone);
    } catch (err) {
      console.error('[QuotationStore] PostgreSQL operation failed:', (err as Error).message);
      throw err;
    }
  }

  return saveQuotationToFile(input, idempotencyKey, cleanPhone);
}

/**
 * Update Notification Status
 */
export async function updateQuotationNotification(
  id: string,
  update: Partial<QuotationNotificationStatus>
): Promise<void> {
  if (process.env.DATABASE_URL) {
    try {
      const pool = getPgPool()!;
      await initPgSchema();
      const query = `
        UPDATE wms_quotations 
        SET notification_status = COALESCE($1, notification_status),
            retry_count = COALESCE($2, retry_count),
            last_error = $3,
            sent_at = COALESCE($4, sent_at)
        WHERE id = $5;
      `;
      await pool.query(query, [
        update.status || null,
        update.retryCount !== undefined ? update.retryCount : null,
        update.lastError || null,
        update.sentAt ? new Date(update.sentAt) : null,
        id,
      ]);
      return;
    } catch (err) {
      console.error('[QuotationStore:PG] Update notification error:', (err as Error).message);
      if (process.env.VERCEL === '1') throw err;
    }
  }

  // File fallback for local/persistent server
  return new Promise((resolve, reject) => {
    writeQueue = writeQueue.then(async () => {
      try {
        await ensureFileStorage();
        let records: QuotationRecord[] = [];
        try {
          const raw = await fs.readFile(STORAGE_FILE, 'utf-8');
          records = JSON.parse(raw);
        } catch {
          records = inMemoryCache || [];
        }

        const index = records.findIndex((r) => r.id === id);
        if (index !== -1) {
          records[index].notification = {
            ...records[index].notification,
            ...update,
          };
          const jsonStr = JSON.stringify(records, null, 2);
          const tempFile = path.join(DATA_DIR, `quotations_${Date.now()}_${Math.random().toString(36).slice(2)}.tmp`);
          await fs.writeFile(tempFile, jsonStr, 'utf-8');
          await fs.rename(tempFile, STORAGE_FILE);
          inMemoryCache = records;
        }
        resolve();
      } catch (err) {
        reject(err);
      }
    });
  });
}

/**
 * Get Failed Notifications
 */
export async function getFailedNotifications(): Promise<QuotationRecord[]> {
  if (process.env.DATABASE_URL) {
    try {
      const pool = getPgPool()!;
      await initPgSchema();
      const res = await pool.query(
        `SELECT * FROM wms_quotations WHERE notification_status IN ('pending', 'failed') ORDER BY created_at DESC LIMIT 50;`
      );
      return res.rows.map(rowToQuotationRecord);
    } catch (err) {
      console.error('[QuotationStore:PG] Get failed notifications error:', (err as Error).message);
      if (process.env.VERCEL === '1') throw err;
    }
  }

  // File fallback for local/persistent server
  await ensureFileStorage();
  try {
    const raw = await fs.readFile(STORAGE_FILE, 'utf-8');
    const records: QuotationRecord[] = JSON.parse(raw);
    return records.filter((r) => r.notification.status === 'failed' || r.notification.status === 'pending');
  } catch {
    return [];
  }
}

/**
 * Get All Quotations
 */
export async function getAllQuotations(limit = 100): Promise<QuotationRecord[]> {
  if (process.env.DATABASE_URL) {
    try {
      const pool = getPgPool()!;
      await initPgSchema();
      const res = await pool.query(
        `SELECT * FROM wms_quotations ORDER BY created_at DESC LIMIT $1;`,
        [limit]
      );
      return res.rows.map(rowToQuotationRecord);
    } catch (err) {
      console.error('[QuotationStore:PG] Get all quotations error:', (err as Error).message);
      if (process.env.VERCEL === '1') throw err;
    }
  }

  // File fallback for local/persistent server
  await ensureFileStorage();
  try {
    const raw = await fs.readFile(STORAGE_FILE, 'utf-8');
    const records: QuotationRecord[] = JSON.parse(raw);
    return records.slice(0, limit);
  } catch {
    return [];
  }
}
