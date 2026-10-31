-- =============================================================================
-- Migration: 002_seo_monitor_schema.sql
-- Description: WMS SEO Monitor durable tables (Search Console, Inspections, PageSpeed)
-- Safe, non-destructive migration. Completely isolated from quotations.
-- =============================================================================

-- 1. URL Inspection History (Google's Stored Index Data)
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

-- Safe upgrades for existing databases
ALTER TABLE seo_inspections ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'inspected';
ALTER TABLE seo_inspections ADD COLUMN IF NOT EXISTS error_message TEXT;
ALTER TABLE seo_inspections ADD COLUMN IF NOT EXISTS last_inspected_at TIMESTAMPTZ DEFAULT NOW();

CREATE INDEX IF NOT EXISTS idx_seo_inspections_url ON seo_inspections(url);
CREATE INDEX IF NOT EXISTS idx_seo_inspections_verdict ON seo_inspections(verdict);
CREATE INDEX IF NOT EXISTS idx_seo_inspections_inspected_at ON seo_inspections(inspected_at DESC);

-- 2. Property-Level Aggregates (True site-wide totals from Google Search Console)
CREATE TABLE IF NOT EXISTS seo_property_aggregates (
  id SERIAL PRIMARY KEY,
  date_range_start DATE NOT NULL,
  date_range_end DATE NOT NULL,
  period_type TEXT NOT NULL, -- 'latest_28d' | 'previous_28d'
  clicks INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  ctr DOUBLE PRECISION DEFAULT 0,
  position DOUBLE PRECISION DEFAULT 0,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_seo_aggregates UNIQUE (date_range_start, date_range_end, period_type)
);

CREATE INDEX IF NOT EXISTS idx_seo_aggregates_period ON seo_property_aggregates(period_type, recorded_at DESC);

-- 3. Search Analytics Breakdown (Queries & Pages)
CREATE TABLE IF NOT EXISTS seo_search_analytics (
  id SERIAL PRIMARY KEY,
  date_range_start DATE NOT NULL,
  date_range_end DATE NOT NULL,
  period_type TEXT NOT NULL, -- 'latest_28d' | 'previous_28d'
  query TEXT NOT NULL,
  page TEXT NOT NULL,
  clicks INTEGER DEFAULT 0,
  impressions INTEGER DEFAULT 0,
  ctr DOUBLE PRECISION DEFAULT 0,
  position DOUBLE PRECISION DEFAULT 0,
  recorded_at TIMESTAMPTZ DEFAULT NOW(),
  CONSTRAINT uq_seo_analytics UNIQUE (date_range_start, date_range_end, period_type, query, page)
);

CREATE INDEX IF NOT EXISTS idx_seo_analytics_query ON seo_search_analytics(query);
CREATE INDEX IF NOT EXISTS idx_seo_analytics_page ON seo_search_analytics(page);

-- 4. Dynamic Sitemaps Feed
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

-- 5. SEO Health Alerts & Opportunities
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

CREATE INDEX IF NOT EXISTS idx_seo_alerts_severity ON seo_alerts(severity);

-- 6. PageSpeed & Core Web Vitals Audits (Lab vs CrUX Field Data)
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

-- Safe upgrade for existing databases
ALTER TABLE seo_pagespeed ADD COLUMN IF NOT EXISTS error_message TEXT;

CREATE INDEX IF NOT EXISTS idx_seo_pagespeed_url_device ON seo_pagespeed(url, device);

-- 7. Sync Runs Audit Log
CREATE TABLE IF NOT EXISTS seo_sync_runs (
  id SERIAL PRIMARY KEY,
  sync_type TEXT NOT NULL,
  status TEXT NOT NULL,
  summary JSONB,
  created_at TIMESTAMPTZ DEFAULT NOW()
);
