import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import { Pool } from 'pg';
import type { UrlInspectionResult, SitemapEntry, SearchAnalyticsRow } from './gsc-client';

export interface SeoAlert {
  id: string;
  url?: string;
  alertType: 'canonical_mismatch' | 'dropped_index' | 'discovered_not_indexed' | 'high_imp_low_ctr' | 'query_overlap' | 'area_gap';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  details?: Record<string, any>;
  createdAt: string;
}

export interface PageSpeedRecord {
  url: string;
  device: 'mobile' | 'desktop';
  templateName: string;
  performanceScore?: number;
  fcp?: number;
  lcp?: number;
  cls?: number;
  tbt?: number;
  hasCruxData: boolean;
  cruxLcp?: number;
  cruxCls?: number;
  cruxInp?: number;
  status: 'pending_api_key' | 'completed' | 'error';
  auditedAt: string;
}

export interface SeoMonitorSnapshot {
  siteUrl: string;
  lastSyncAt: string | null;
  storageEngine: 'postgresql' | 'local_durable_file';
  sitemaps: SitemapEntry[];
  inspections: UrlInspectionResult[];
  analyticsLatest28d: SearchAnalyticsRow[];
  analyticsPrev28d: SearchAnalyticsRow[];
  analyticsDateRange: {
    latest: { start: string; end: string };
    previous: { start: string; end: string };
  };
  alerts: SeoAlert[];
  pageSpeedAudits: PageSpeedRecord[];
}

const LOCAL_DATA_DIR = path.join(process.cwd(), 'data', 'seo-monitor');
const LOCAL_STORAGE_FILE = path.join(LOCAL_DATA_DIR, 'seo-snapshot.json');

let pgPool: Pool | null = null;
let isSchemaInitialized = false;

function getPgPool(): Pool | null {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) return null;
  if (!pgPool) {
    pgPool = new Pool({
      connectionString: dbUrl,
      ssl: { rejectUnauthorized: false },
      max: 5,
      idleTimeoutMillis: 30000
    });
  }
  return pgPool;
}

async function ensurePostgresTables(pool: Pool) {
  if (isSchemaInitialized) return;
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS seo_inspections (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        verdict TEXT NOT NULL,
        coverage_state TEXT,
        robots_txt_state TEXT,
        indexing_state TEXT,
        page_fetch_state TEXT,
        last_crawl_time TIMESTAMPTZ,
        google_canonical TEXT,
        user_canonical TEXT,
        crawled_as TEXT,
        http_status INTEGER,
        inspected_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS seo_search_analytics (
        id SERIAL PRIMARY KEY,
        date_range_start DATE NOT NULL,
        date_range_end DATE NOT NULL,
        period_type TEXT NOT NULL,
        query TEXT NOT NULL,
        page TEXT NOT NULL,
        clicks INTEGER DEFAULT 0,
        impressions INTEGER DEFAULT 0,
        ctr DOUBLE PRECISION DEFAULT 0,
        position DOUBLE PRECISION DEFAULT 0,
        recorded_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT uq_seo_analytics UNIQUE (date_range_start, date_range_end, period_type, query, page)
      );

      CREATE TABLE IF NOT EXISTS seo_sitemaps (
        id SERIAL PRIMARY KEY,
        path TEXT NOT NULL,
        last_submitted TIMESTAMPTZ,
        last_downloaded TIMESTAMPTZ,
        submitted_count INTEGER DEFAULT 0,
        indexed_count INTEGER DEFAULT 0,
        warnings_count INTEGER DEFAULT 0,
        errors_count INTEGER DEFAULT 0,
        fetched_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT uq_seo_sitemaps UNIQUE (path, last_submitted)
      );

      CREATE TABLE IF NOT EXISTS seo_alerts (
        id TEXT PRIMARY KEY,
        url TEXT,
        alert_type TEXT NOT NULL,
        severity TEXT NOT NULL,
        title TEXT NOT NULL,
        message TEXT NOT NULL,
        details JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS seo_pagespeed (
        id SERIAL PRIMARY KEY,
        url TEXT NOT NULL,
        device TEXT NOT NULL,
        template_name TEXT NOT NULL,
        performance_score INTEGER,
        fcp DOUBLE PRECISION,
        lcp DOUBLE PRECISION,
        cls DOUBLE PRECISION,
        tbt DOUBLE PRECISION,
        has_crux_data BOOLEAN DEFAULT FALSE,
        crux_lcp DOUBLE PRECISION,
        crux_cls DOUBLE PRECISION,
        crux_inp DOUBLE PRECISION,
        status TEXT NOT NULL,
        audited_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS seo_sync_runs (
        id SERIAL PRIMARY KEY,
        sync_type TEXT NOT NULL,
        status TEXT NOT NULL,
        summary JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );
    `);
    isSchemaInitialized = true;
  } finally {
    client.release();
  }
}

/**
 * Derives comprehensive historical alerts and opportunities from raw GSC data.
 */
export function deriveAlertsAndOpportunities(
  inspections: UrlInspectionResult[],
  analyticsLatest: SearchAnalyticsRow[],
  _analyticsPrev: SearchAnalyticsRow[]
): SeoAlert[] {
  const alerts: SeoAlert[] = [];

  // 1. Inspect Canonical Mismatches
  for (const item of inspections) {
    if (
      item.googleCanonical &&
      item.userCanonical &&
      item.googleCanonical.replace(/\/$/, '') !== item.userCanonical.replace(/\/$/, '')
    ) {
      alerts.push({
        id: `canonical_mismatch_${item.inspectionUrl}`,
        url: item.inspectionUrl,
        alertType: 'canonical_mismatch',
        severity: 'critical',
        title: 'Google Canonical Mismatch Detected',
        message: `Google selected a different canonical than declared by the page. Declared: ${item.userCanonical} | Selected: ${item.googleCanonical}`,
        details: { userCanonical: item.userCanonical, googleCanonical: item.googleCanonical },
        createdAt: new Date().toISOString()
      });
    }

    // 2. Discovered - Not Indexed
    if (
      item.coverageState &&
      (item.coverageState.includes('พบแล้ว') || item.coverageState.includes('ยังไม่ได้จัดทำดัชนี') || item.verdict === 'NEUTRAL')
    ) {
      alerts.push({
        id: `discovered_not_indexed_${item.inspectionUrl}`,
        url: item.inspectionUrl,
        alertType: 'discovered_not_indexed',
        severity: 'warning',
        title: 'URL Discovered but Not Indexed Yet',
        message: `Google has discovered this URL (${item.coverageState}) but has not yet included it in the live Google index.`,
        details: { coverageState: item.coverageState, verdict: item.verdict },
        createdAt: new Date().toISOString()
      });
    }
  }

  // 3. High Impression, Low CTR Opportunities
  for (const row of analyticsLatest) {
    const query = row.keys[0] || '';
    const page = row.keys[1] || '';
    // If ranking on page 1 (average position <= 10) and impressions >= 10, but CTR < 4%
    if (row.impressions >= 10 && row.position <= 10 && row.ctr < 0.04) {
      alerts.push({
        id: `high_imp_low_ctr_${query}_${page}`,
        url: page,
        alertType: 'high_imp_low_ctr',
        severity: 'warning',
        title: `Low CTR on High Impression Query: "${query}"`,
        message: `Average position is ${row.position.toFixed(1)} with ${row.impressions} impressions, but CTR is only ${(row.ctr * 100).toFixed(1)}%. Review title tag & meta description appeal.`,
        details: { query, page, impressions: row.impressions, clicks: row.clicks, ctr: row.ctr, position: row.position },
        createdAt: new Date().toISOString()
      });
    }
  }

  // 4. Query Overlap Detection (Multiple URLs ranking for the same query)
  const queryToPagesMap: Record<string, Array<{ page: string; impressions: number; clicks: number; position: number }>> = {};
  for (const row of analyticsLatest) {
    const query = (row.keys[0] || '').trim();
    const page = row.keys[1] || '';
    if (!query || !page) continue;
    if (!queryToPagesMap[query]) queryToPagesMap[query] = [];
    queryToPagesMap[query].push({
      page,
      impressions: row.impressions,
      clicks: row.clicks,
      position: row.position
    });
  }

  for (const [query, pages] of Object.entries(queryToPagesMap)) {
    if (pages.length > 1) {
      alerts.push({
        id: `query_overlap_${query}`,
        alertType: 'query_overlap',
        severity: 'info',
        title: `Potential Query Overlap on "${query}"`,
        message: `${pages.length} URLs receive impressions for this query. Clearly label for review to ensure intentional intent separation.`,
        details: { query, pages },
        createdAt: new Date().toISOString()
      });
    }
  }

  return alerts;
}

export function getDefaultPageSpeedAudits(): PageSpeedRecord[] {
  return [
    {
      url: 'https://wms-transport.com/',
      templateName: 'Homepage',
      device: 'mobile',
      status: 'pending_api_key',
      hasCruxData: false,
      auditedAt: new Date().toISOString()
    },
    {
      url: 'https://wms-transport.com/areas',
      templateName: 'Service Hub Directory',
      device: 'mobile',
      status: 'pending_api_key',
      hasCruxData: false,
      auditedAt: new Date().toISOString()
    },
    {
      url: 'https://wms-transport.com/service/bkk-thonburi',
      templateName: 'Regional Service Hub',
      device: 'mobile',
      status: 'pending_api_key',
      hasCruxData: false,
      auditedAt: new Date().toISOString()
    },
    {
      url: 'https://wms-transport.com/service/bkk-bang-khae',
      templateName: 'District Service Page',
      device: 'mobile',
      status: 'pending_api_key',
      hasCruxData: false,
      auditedAt: new Date().toISOString()
    },
    {
      url: 'https://wms-transport.com/blog/moving-house-checklist',
      templateName: 'Article Detail Page',
      device: 'mobile',
      status: 'pending_api_key',
      hasCruxData: false,
      auditedAt: new Date().toISOString()
    }
  ];
}

/**
 * Loads the current SEO snapshot.
 * Reads from PostgreSQL if configured, or from local durable snapshot.
 */
export async function getSeoSnapshot(): Promise<SeoMonitorSnapshot> {
  const pool = getPgPool();
  if (pool) {
    try {
      await ensurePostgresTables(pool);
      const sitemapsRes = await pool.query('SELECT * FROM seo_sitemaps ORDER BY fetched_at DESC LIMIT 5');
      const inspRes = await pool.query('SELECT * FROM seo_inspections ORDER BY inspected_at DESC LIMIT 200');
      const saLatestRes = await pool.query("SELECT * FROM seo_search_analytics WHERE period_type = 'latest_28d' ORDER BY impressions DESC LIMIT 500");
      const saPrevRes = await pool.query("SELECT * FROM seo_search_analytics WHERE period_type = 'previous_28d' ORDER BY impressions DESC LIMIT 500");
      const alertsRes = await pool.query('SELECT * FROM seo_alerts ORDER BY created_at DESC LIMIT 100');
      const psRes = await pool.query('SELECT * FROM seo_pagespeed ORDER BY audited_at DESC LIMIT 20');

      if (inspRes.rows.length > 0 || saLatestRes.rows.length > 0) {
        return {
          siteUrl: 'https://wms-transport.com/',
          lastSyncAt: inspRes.rows[0]?.inspected_at || null,
          storageEngine: 'postgresql',
          sitemaps: sitemapsRes.rows.map(r => ({
            path: r.path,
            lastSubmitted: r.last_submitted,
            lastDownloaded: r.last_downloaded,
            contents: [{ type: 'web', submitted: String(r.submitted_count), indexed: String(r.indexed_count) }]
          })),
          inspections: inspRes.rows.map(r => ({
            inspectionUrl: r.url,
            verdict: r.verdict,
            coverageState: r.coverage_state,
            robotsTxtState: r.robots_txt_state,
            indexingState: r.indexing_state,
            pageFetchState: r.page_fetch_state,
            lastCrawlTime: r.last_crawl_time,
            googleCanonical: r.google_canonical,
            userCanonical: r.user_canonical,
            crawledAs: r.crawled_as,
            httpStatus: r.http_status
          })),
          analyticsLatest28d: saLatestRes.rows.map(r => ({
            keys: [r.query, r.page],
            clicks: r.clicks,
            impressions: r.impressions,
            ctr: r.ctr,
            position: r.position
          })),
          analyticsPrev28d: saPrevRes.rows.map(r => ({
            keys: [r.query, r.page],
            clicks: r.clicks,
            impressions: r.impressions,
            ctr: r.ctr,
            position: r.position
          })),
          analyticsDateRange: {
            latest: { start: '', end: '' },
            previous: { start: '', end: '' }
          },
          alerts: alertsRes.rows.map(r => ({
            id: r.id,
            url: r.url,
            alertType: r.alert_type,
            severity: r.severity,
            title: r.title,
            message: r.message,
            details: r.details,
            createdAt: r.created_at
          })),
          pageSpeedAudits: psRes.rows.length > 0 ? psRes.rows.map(r => ({
            url: r.url,
            templateName: r.template_name,
            device: r.device,
            performanceScore: r.performance_score,
            fcp: r.fcp,
            lcp: r.lcp,
            cls: r.cls,
            tbt: r.tbt,
            hasCruxData: r.has_crux_data,
            cruxLcp: r.crux_lcp,
            cruxCls: r.crux_cls,
            cruxInp: r.crux_inp,
            status: r.status,
            auditedAt: r.audited_at
          })) : getDefaultPageSpeedAudits()
        };
      }
    } catch (e: any) {
      console.warn('PostgreSQL fetch error, falling back to local file:', e.message);
    }
  }

  // Local File Fallback
  if (fsSync.existsSync(LOCAL_STORAGE_FILE)) {
    try {
      const data = JSON.parse(fsSync.readFileSync(LOCAL_STORAGE_FILE, 'utf8'));
      return {
        ...data,
        storageEngine: 'local_durable_file'
      };
    } catch {}
  }

  // Initial Empty Snapshot
  return {
    siteUrl: 'https://wms-transport.com/',
    lastSyncAt: null,
    storageEngine: pool ? 'postgresql' : 'local_durable_file',
    sitemaps: [],
    inspections: [],
    analyticsLatest28d: [],
    analyticsPrev28d: [],
    analyticsDateRange: {
      latest: { start: '', end: '' },
      previous: { start: '', end: '' }
    },
    alerts: [],
    pageSpeedAudits: getDefaultPageSpeedAudits()
  };
}

/**
 * Saves a full SEO snapshot both to PostgreSQL (if configured) and local file.
 */
export async function saveSeoSnapshot(snapshot: SeoMonitorSnapshot): Promise<void> {
  const pool = getPgPool();
  if (pool) {
    try {
      await ensurePostgresTables(pool);
      const client = await pool.connect();
      try {
        await client.query('BEGIN');

        // Save Sitemaps
        for (const sm of snapshot.sitemaps) {
          const webContent = sm.contents?.find(c => c.type === 'web');
          await client.query(
            `INSERT INTO seo_sitemaps (path, last_submitted, last_downloaded, submitted_count, indexed_count, warnings_count, errors_count)
             VALUES ($1, $2, $3, $4, $5, $6, $7)`,
            [
              sm.path,
              sm.lastSubmitted || null,
              sm.lastDownloaded || null,
              parseInt(webContent?.submitted || '0', 10),
              parseInt(webContent?.indexed || '0', 10),
              parseInt(sm.warnings || '0', 10),
              parseInt(sm.errors || '0', 10)
            ]
          );
        }

        // Save Inspections
        for (const item of snapshot.inspections) {
          await client.query(
            `INSERT INTO seo_inspections (url, verdict, coverage_state, robots_txt_state, indexing_state, page_fetch_state, last_crawl_time, google_canonical, user_canonical, crawled_as, http_status)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)`,
            [
              item.inspectionUrl,
              item.verdict,
              item.coverageState,
              item.robotsTxtState || null,
              item.indexingState || null,
              item.pageFetchState || null,
              item.lastCrawlTime || null,
              item.googleCanonical || null,
              item.userCanonical || null,
              item.crawledAs || null,
              item.httpStatus || null
            ]
          );
        }

        // Save Search Analytics
        for (const row of snapshot.analyticsLatest28d) {
          await client.query(
            `INSERT INTO seo_search_analytics (date_range_start, date_range_end, period_type, query, page, clicks, impressions, ctr, position)
             VALUES ($1, $2, 'latest_28d', $3, $4, $5, $6, $7, $8)
             ON CONFLICT (date_range_start, date_range_end, period_type, query, page)
             DO UPDATE SET clicks = EXCLUDED.clicks, impressions = EXCLUDED.impressions, ctr = EXCLUDED.ctr, position = EXCLUDED.position, recorded_at = NOW()`,
            [
              snapshot.analyticsDateRange.latest.start || new Date().toISOString().split('T')[0],
              snapshot.analyticsDateRange.latest.end || new Date().toISOString().split('T')[0],
              row.keys[0] || '',
              row.keys[1] || '',
              row.clicks,
              row.impressions,
              row.ctr,
              row.position
            ]
          );
        }

        for (const row of snapshot.analyticsPrev28d) {
          await client.query(
            `INSERT INTO seo_search_analytics (date_range_start, date_range_end, period_type, query, page, clicks, impressions, ctr, position)
             VALUES ($1, $2, 'previous_28d', $3, $4, $5, $6, $7, $8)
             ON CONFLICT (date_range_start, date_range_end, period_type, query, page)
             DO UPDATE SET clicks = EXCLUDED.clicks, impressions = EXCLUDED.impressions, ctr = EXCLUDED.ctr, position = EXCLUDED.position, recorded_at = NOW()`,
            [
              snapshot.analyticsDateRange.previous.start || new Date().toISOString().split('T')[0],
              snapshot.analyticsDateRange.previous.end || new Date().toISOString().split('T')[0],
              row.keys[0] || '',
              row.keys[1] || '',
              row.clicks,
              row.impressions,
              row.ctr,
              row.position
            ]
          );
        }

        // Save Alerts
        for (const alert of snapshot.alerts) {
          await client.query(
            `INSERT INTO seo_alerts (id, url, alert_type, severity, title, message, details)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             ON CONFLICT (id) DO UPDATE SET message = EXCLUDED.message`,
            [
              alert.id,
              alert.url || null,
              alert.alertType,
              alert.severity,
              alert.title,
              alert.message,
              JSON.stringify(alert.details || {})
            ]
          );
        }

        await client.query('COMMIT');
      } catch (err) {
        await client.query('ROLLBACK');
        throw err;
      } finally {
        client.release();
      }
    } catch (e: any) {
      console.warn('Failed to save to PostgreSQL, fallback to local file:', e.message);
    }
  }

  // Always write local file as persistent backup
  await fs.mkdir(LOCAL_DATA_DIR, { recursive: true });
  await fs.writeFile(LOCAL_STORAGE_FILE, JSON.stringify(snapshot, null, 2), 'utf8');
}
