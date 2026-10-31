import fs from 'node:fs/promises';
import fsSync from 'node:fs';
import path from 'node:path';
import { Pool } from 'pg';
import type { UrlInspectionResult, SitemapEntry, SearchAnalyticsRow, SiteAggregateMetrics } from './gsc-client';
import { type PageSpeedAuditRecord, getInitialPageSpeedRecords } from './pagespeed-client';

export type { PageSpeedAuditRecord };

export interface SeoAlert {
  id: string;
  url?: string;
  alertType: 'canonical_mismatch' | 'dropped_index' | 'discovered_not_indexed' | 'high_imp_low_ctr' | 'query_overlap' | 'area_gap' | 'traffic_drop';
  severity: 'critical' | 'warning' | 'info';
  title: string;
  message: string;
  details?: Record<string, any>;
  createdAt: string;
}

export type PageSpeedRecord = PageSpeedAuditRecord;

export interface SeoMonitorSnapshot {
  siteUrl: string;
  lastSyncAt: string | null;
  lastInspectionBatchAt?: string | null;
  lastPageSpeedAuditAt?: string | null;
  lastFailedSyncAt?: string | null;
  lastSyncError?: string | null;
  lastFailedInspectionAt?: string | null;
  lastInspectionError?: string | null;
  storageEngine: 'postgresql' | 'local_durable_file' | 'ephemeral_serverless_warning';
  sitemaps: SitemapEntry[];
  inspections: UrlInspectionResult[];
  siteAggregatesLatest28d?: SiteAggregateMetrics;
  siteAggregatesPrev28d?: SiteAggregateMetrics;
  analyticsLatest28d: SearchAnalyticsRow[];
  analyticsPrev28d: SearchAnalyticsRow[];
  analyticsDateRange: {
    latest: { start: string; end: string };
    previous: { start: string; end: string };
  };
  alerts: SeoAlert[];
  pageSpeedAudits: PageSpeedAuditRecord[];
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

export async function closePgPool(): Promise<void> {
  if (pgPool) {
    await pgPool.end();
    pgPool = null;
  }
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
        status TEXT DEFAULT 'inspected',
        error_message TEXT,
        last_inspected_at TIMESTAMPTZ DEFAULT NOW(),
        inspected_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT uq_seo_inspections_url UNIQUE (url)
      );

      ALTER TABLE seo_inspections ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'inspected';
      ALTER TABLE seo_inspections ADD COLUMN IF NOT EXISTS error_message TEXT;
      ALTER TABLE seo_inspections ADD COLUMN IF NOT EXISTS last_inspected_at TIMESTAMPTZ DEFAULT NOW();

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
        CONSTRAINT uq_seo_sitemaps_path UNIQUE (path)
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
        error_message TEXT,
        audited_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT uq_seo_pagespeed UNIQUE (url, device)
      );

      ALTER TABLE seo_pagespeed ADD COLUMN IF NOT EXISTS error_message TEXT;

      CREATE TABLE IF NOT EXISTS seo_sync_runs (
        id SERIAL PRIMARY KEY,
        sync_type TEXT NOT NULL,
        status TEXT NOT NULL,
        summary JSONB,
        created_at TIMESTAMPTZ DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS seo_property_aggregates (
        id SERIAL PRIMARY KEY,
        date_range_start DATE NOT NULL,
        date_range_end DATE NOT NULL,
        period_type TEXT NOT NULL,
        clicks INTEGER DEFAULT 0,
        impressions INTEGER DEFAULT 0,
        ctr DOUBLE PRECISION DEFAULT 0,
        position DOUBLE PRECISION DEFAULT 0,
        recorded_at TIMESTAMPTZ DEFAULT NOW(),
        CONSTRAINT uq_seo_aggregates UNIQUE (date_range_start, date_range_end, period_type)
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
  analyticsPrev: SearchAnalyticsRow[] = []
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

  // 5. Significant Drop Detection (Clicks dropped by >=50% compared to previous 28d)
  if (analyticsPrev && analyticsPrev.length > 0) {
    const prevClicksMap = new Map<string, number>();
    for (const r of analyticsPrev) {
      const q = r.keys[0] || '';
      if (q) prevClicksMap.set(q, (prevClicksMap.get(q) || 0) + (r.clicks || 0));
    }
    for (const r of analyticsLatest) {
      const q = r.keys[0] || '';
      const prevClicks = prevClicksMap.get(q) || 0;
      if (prevClicks >= 5 && r.clicks <= prevClicks * 0.5) {
        alerts.push({
          id: `traffic_drop_${q}`,
          alertType: 'traffic_drop',
          severity: 'warning',
          title: `Traffic Drop Detected on "${q}"`,
          message: `Clicks dropped from ${prevClicks} in previous period to ${r.clicks} in the latest 28 days.`,
          details: { query: q, prevClicks, currentClicks: r.clicks },
          createdAt: new Date().toISOString()
        });
      }
    }
  }

  return alerts;
}

export function getDefaultPageSpeedAudits(): PageSpeedAuditRecord[] {
  return getInitialPageSpeedRecords();
}

/**
 * Loads the current SEO snapshot.
 * Reads from PostgreSQL if configured, or from local durable snapshot.
 */
export async function getSeoSnapshot(): Promise<SeoMonitorSnapshot> {
  const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
  const pool = getPgPool();

  if (isProduction && !pool) {
    throw new Error('Durable PostgreSQL storage required in production. DATABASE_URL must be configured on Vercel/Production.');
  }

  if (pool) {
    try {
      await ensurePostgresTables(pool);
      const sitemapsRes = await pool.query('SELECT * FROM seo_sitemaps ORDER BY fetched_at DESC LIMIT 5');
      const inspRes = await pool.query('SELECT * FROM seo_inspections ORDER BY inspected_at DESC LIMIT 500');
      const saLatestRes = await pool.query("SELECT * FROM seo_search_analytics WHERE period_type = 'latest_28d' ORDER BY impressions DESC LIMIT 500");
      const saPrevRes = await pool.query("SELECT * FROM seo_search_analytics WHERE period_type = 'previous_28d' ORDER BY impressions DESC LIMIT 500");
      const aggLatestRes = await pool.query("SELECT * FROM seo_property_aggregates WHERE period_type = 'latest_28d' ORDER BY recorded_at DESC LIMIT 1");
      const aggPrevRes = await pool.query("SELECT * FROM seo_property_aggregates WHERE period_type = 'previous_28d' ORDER BY recorded_at DESC LIMIT 1");
      const alertsRes = await pool.query('SELECT * FROM seo_alerts ORDER BY created_at DESC LIMIT 100');
      const psRes = await pool.query('SELECT * FROM seo_pagespeed ORDER BY audited_at DESC LIMIT 20');

      if (inspRes.rows.length > 0 || saLatestRes.rows.length > 0 || psRes.rows.length > 0) {
        return {
          siteUrl: 'https://wms-transport.com/',
          lastSyncAt: inspRes.rows[0]?.inspected_at ? new Date(inspRes.rows[0].inspected_at).toISOString() : null,
          storageEngine: 'postgresql',
          sitemaps: sitemapsRes.rows.map(r => ({
            path: r.path,
            lastSubmitted: r.last_submitted ? new Date(r.last_submitted).toISOString() : undefined,
            lastDownloaded: r.last_downloaded ? new Date(r.last_downloaded).toISOString() : undefined,
            contents: [{ type: 'web', submitted: String(r.submitted_count || 0), indexed: String(r.indexed_count || 0) }]
          })),
          inspections: inspRes.rows.map(r => ({
            inspectionUrl: r.url,
            verdict: r.verdict,
            coverageState: r.coverage_state,
            robotsTxtState: r.robots_txt_state,
            indexingState: r.indexing_state,
            pageFetchState: r.page_fetch_state,
            lastCrawlTime: r.last_crawl_time ? new Date(r.last_crawl_time).toISOString() : undefined,
            googleCanonical: r.google_canonical,
            userCanonical: r.user_canonical,
            crawledAs: r.crawled_as,
            httpStatus: r.http_status,
            status: r.status || 'inspected',
            errorMessage: r.error_message || undefined,
            lastInspectedAt: r.last_inspected_at ? new Date(r.last_inspected_at).toISOString() : (r.inspected_at ? new Date(r.inspected_at).toISOString() : undefined)
          })),
          siteAggregatesLatest28d: aggLatestRes.rows[0] ? {
            clicks: aggLatestRes.rows[0].clicks,
            impressions: aggLatestRes.rows[0].impressions,
            ctr: aggLatestRes.rows[0].ctr,
            position: aggLatestRes.rows[0].position
          } : undefined,
          siteAggregatesPrev28d: aggPrevRes.rows[0] ? {
            clicks: aggPrevRes.rows[0].clicks,
            impressions: aggPrevRes.rows[0].impressions,
            ctr: aggPrevRes.rows[0].ctr,
            position: aggPrevRes.rows[0].position
          } : undefined,
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
            latest: { start: aggLatestRes.rows[0]?.date_range_start || '', end: aggLatestRes.rows[0]?.date_range_end || '' },
            previous: { start: aggPrevRes.rows[0]?.date_range_start || '', end: aggPrevRes.rows[0]?.date_range_end || '' }
          },
          alerts: alertsRes.rows.map(r => ({
            id: r.id,
            url: r.url,
            alertType: r.alert_type,
            severity: r.severity,
            title: r.title,
            message: r.message,
            details: r.details,
            createdAt: r.created_at ? new Date(r.created_at).toISOString() : new Date().toISOString()
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
            errorMessage: r.error_message || undefined,
            auditedAt: r.audited_at ? new Date(r.audited_at).toISOString() : new Date().toISOString()
          })) : getDefaultPageSpeedAudits()
        };
      }
    } catch (e: any) {
      if (isProduction) {
        throw new Error(`Production database read error: ${e.message}`);
      }
      console.warn('PostgreSQL fetch error, falling back to local file in development:', e.message);
    }
  }

  // Local File Fallback (Only in local development)
  if (!isProduction && fsSync.existsSync(LOCAL_STORAGE_FILE)) {
    try {
      const data = JSON.parse(fsSync.readFileSync(LOCAL_STORAGE_FILE, 'utf8'));
      return {
        siteUrl: data.siteUrl || 'https://wms-transport.com/',
        ...data,
        storageEngine: 'local_durable_file'
      };
    } catch {}
  }

  return {
    siteUrl: 'https://wms-transport.com/',
    lastSyncAt: null,
    storageEngine: pool ? 'postgresql' : (isProduction ? 'ephemeral_serverless_warning' : 'local_durable_file'),
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
 * Persists an individual URL inspection result incrementally.
 * Ensures interrupted batches retain all completed inspections.
 */
export async function saveSingleInspection(item: UrlInspectionResult): Promise<void> {
  const pool = getPgPool();
  if (pool) {
    await ensurePostgresTables(pool);
    const client = await pool.connect();
    try {
      await client.query(
        `INSERT INTO seo_inspections (
          url, verdict, coverage_state, robots_txt_state, indexing_state, page_fetch_state,
          last_crawl_time, google_canonical, user_canonical, crawled_as, http_status,
          status, error_message, last_inspected_at, inspected_at
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
        ON CONFLICT (url) DO UPDATE SET
          verdict = EXCLUDED.verdict,
          coverage_state = EXCLUDED.coverage_state,
          robots_txt_state = EXCLUDED.robots_txt_state,
          indexing_state = EXCLUDED.indexing_state,
          page_fetch_state = EXCLUDED.page_fetch_state,
          last_crawl_time = EXCLUDED.last_crawl_time,
          google_canonical = EXCLUDED.google_canonical,
          user_canonical = EXCLUDED.user_canonical,
          crawled_as = EXCLUDED.crawled_as,
          http_status = EXCLUDED.http_status,
          status = EXCLUDED.status,
          error_message = EXCLUDED.error_message,
          last_inspected_at = EXCLUDED.last_inspected_at,
          inspected_at = EXCLUDED.inspected_at`,
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
          item.httpStatus || null,
          item.status || 'inspected',
          item.errorMessage || null,
          item.lastInspectedAt || new Date().toISOString(),
          item.lastInspectedAt || new Date().toISOString()
        ]
      );
    } finally {
      client.release();
    }
  }

  const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
  if (!isProduction) {
    try {
      const snap = await getSeoSnapshot();
      const idx = snap.inspections.findIndex(i => i.inspectionUrl === item.inspectionUrl);
      if (idx >= 0) {
        snap.inspections[idx] = item;
      } else {
        snap.inspections.unshift(item);
      }
      snap.lastSyncAt = new Date().toISOString();
      await fs.mkdir(LOCAL_DATA_DIR, { recursive: true });
      await fs.writeFile(LOCAL_STORAGE_FILE, JSON.stringify(snap, null, 2), 'utf8');
    } catch {}
  }
}

/**
 * Saves a full SEO snapshot.
 * In production: strictly requires PostgreSQL, commits transaction, and propagates actionable errors.
 * Never silently falls back to local JSON on Vercel.
 */
export async function saveSeoSnapshot(snapshot: SeoMonitorSnapshot): Promise<void> {
  const isProduction = process.env.VERCEL === '1' || process.env.NODE_ENV === 'production';
  const pool = getPgPool();

  if (isProduction && !pool) {
    throw new Error('Durable PostgreSQL storage required in production. DATABASE_URL must be configured on Vercel/Production.');
  }

  if (pool) {
    await ensurePostgresTables(pool);
    const client = await pool.connect();
    try {
      await client.query('BEGIN');

      // 1. Save Sitemaps (Idempotent ON CONFLICT)
      for (const sm of snapshot.sitemaps) {
        const webContent = sm.contents?.find(c => c.type === 'web');
        await client.query(
          `INSERT INTO seo_sitemaps (path, last_submitted, last_downloaded, submitted_count, indexed_count, warnings_count, errors_count, fetched_at)
           VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
           ON CONFLICT (path) DO UPDATE SET
             last_submitted = COALESCE(EXCLUDED.last_submitted, seo_sitemaps.last_submitted),
             last_downloaded = COALESCE(EXCLUDED.last_downloaded, seo_sitemaps.last_downloaded),
             submitted_count = EXCLUDED.submitted_count,
             indexed_count = EXCLUDED.indexed_count,
             warnings_count = EXCLUDED.warnings_count,
             errors_count = EXCLUDED.errors_count,
             fetched_at = NOW()`,
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

      // 2. Save Inspections (Idempotent ON CONFLICT with status, error_message, last_inspected_at)
      for (const item of snapshot.inspections) {
        await client.query(
          `INSERT INTO seo_inspections (
            url, verdict, coverage_state, robots_txt_state, indexing_state, page_fetch_state,
            last_crawl_time, google_canonical, user_canonical, crawled_as, http_status,
            status, error_message, last_inspected_at, inspected_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          ON CONFLICT (url) DO UPDATE SET
            verdict = EXCLUDED.verdict,
            coverage_state = EXCLUDED.coverage_state,
            robots_txt_state = EXCLUDED.robots_txt_state,
            indexing_state = EXCLUDED.indexing_state,
            page_fetch_state = EXCLUDED.page_fetch_state,
            last_crawl_time = EXCLUDED.last_crawl_time,
            google_canonical = EXCLUDED.google_canonical,
            user_canonical = EXCLUDED.user_canonical,
            crawled_as = EXCLUDED.crawled_as,
            http_status = EXCLUDED.http_status,
            status = EXCLUDED.status,
            error_message = EXCLUDED.error_message,
            last_inspected_at = EXCLUDED.last_inspected_at,
            inspected_at = EXCLUDED.inspected_at`,
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
            item.httpStatus || null,
            item.status || 'inspected',
            item.errorMessage || null,
            item.lastInspectedAt || new Date().toISOString(),
            item.lastInspectedAt || new Date().toISOString()
          ]
        );
      }

      // 3. Save Search Analytics (Idempotent ON CONFLICT)
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

      // 4. Save Property Aggregates (Idempotent ON CONFLICT)
      if (snapshot.siteAggregatesLatest28d) {
        await client.query(
          `INSERT INTO seo_property_aggregates (date_range_start, date_range_end, period_type, clicks, impressions, ctr, position)
           VALUES ($1, $2, 'latest_28d', $3, $4, $5, $6)
           ON CONFLICT (date_range_start, date_range_end, period_type)
           DO UPDATE SET clicks = EXCLUDED.clicks, impressions = EXCLUDED.impressions, ctr = EXCLUDED.ctr, position = EXCLUDED.position, recorded_at = NOW()`,
          [
            snapshot.analyticsDateRange.latest.start || new Date().toISOString().split('T')[0],
            snapshot.analyticsDateRange.latest.end || new Date().toISOString().split('T')[0],
            snapshot.siteAggregatesLatest28d.clicks,
            snapshot.siteAggregatesLatest28d.impressions,
            snapshot.siteAggregatesLatest28d.ctr,
            snapshot.siteAggregatesLatest28d.position
          ]
        );
      }

      if (snapshot.siteAggregatesPrev28d) {
        await client.query(
          `INSERT INTO seo_property_aggregates (date_range_start, date_range_end, period_type, clicks, impressions, ctr, position)
           VALUES ($1, $2, 'previous_28d', $3, $4, $5, $6)
           ON CONFLICT (date_range_start, date_range_end, period_type)
           DO UPDATE SET clicks = EXCLUDED.clicks, impressions = EXCLUDED.impressions, ctr = EXCLUDED.ctr, position = EXCLUDED.position, recorded_at = NOW()`,
          [
            snapshot.analyticsDateRange.previous.start || new Date().toISOString().split('T')[0],
            snapshot.analyticsDateRange.previous.end || new Date().toISOString().split('T')[0],
            snapshot.siteAggregatesPrev28d.clicks,
            snapshot.siteAggregatesPrev28d.impressions,
            snapshot.siteAggregatesPrev28d.ctr,
            snapshot.siteAggregatesPrev28d.position
          ]
        );
      }

      // 5. Save PageSpeed Audits (Idempotent ON CONFLICT with error_message and timestamps)
      for (const ps of snapshot.pageSpeedAudits || []) {
        await client.query(
          `INSERT INTO seo_pagespeed (
            url, device, template_name, performance_score, fcp, lcp, cls, tbt,
            has_crux_data, crux_lcp, crux_cls, crux_inp, status, error_message, audited_at
          )
          VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15)
          ON CONFLICT (url, device) DO UPDATE SET
            template_name = EXCLUDED.template_name,
            performance_score = EXCLUDED.performance_score,
            fcp = EXCLUDED.fcp,
            lcp = EXCLUDED.lcp,
            cls = EXCLUDED.cls,
            tbt = EXCLUDED.tbt,
            has_crux_data = EXCLUDED.has_crux_data,
            crux_lcp = EXCLUDED.crux_lcp,
            crux_cls = EXCLUDED.crux_cls,
            crux_inp = EXCLUDED.crux_inp,
            status = EXCLUDED.status,
            error_message = EXCLUDED.error_message,
            audited_at = EXCLUDED.audited_at`,
          [
            ps.url,
            ps.device,
            ps.templateName,
            ps.performanceScore ?? null,
            ps.fcp ?? null,
            ps.lcp ?? null,
            ps.cls ?? null,
            ps.tbt ?? null,
            Boolean(ps.hasCruxData),
            ps.cruxLcp ?? null,
            ps.cruxCls ?? null,
            ps.cruxInp ?? null,
            ps.status,
            ps.errorMessage ?? null,
            ps.auditedAt || new Date().toISOString()
          ]
        );
      }

      // 6. Save Alerts (Idempotent ON CONFLICT)
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

      if (isProduction) {
        // Return immediately on production without writing to ephemeral disk
        return;
      }
    } catch (err: any) {
      await client.query('ROLLBACK');
      if (isProduction) {
        throw new Error(`Production database persistence failed: ${err.message}`);
      }
      console.warn('Failed to save to PostgreSQL in development, falling back to local file:', err.message);
    } finally {
      client.release();
    }
  }

  // Only reached in local development
  await fs.mkdir(LOCAL_DATA_DIR, { recursive: true });
  await fs.writeFile(LOCAL_STORAGE_FILE, JSON.stringify(snapshot, null, 2), 'utf8');
}
