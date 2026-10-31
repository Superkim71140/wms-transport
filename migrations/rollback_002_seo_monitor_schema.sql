-- =============================================================================
-- Migration Rollback: rollback_002_seo_monitor_schema.sql
-- Description: Safely drops all WMS SEO Monitor tables
-- COMPLETELY PRESERVES 'quotations' table and all customer data intact.
-- =============================================================================

DROP TABLE IF EXISTS seo_sync_runs;
DROP TABLE IF EXISTS seo_pagespeed;
DROP TABLE IF EXISTS seo_alerts;
DROP TABLE IF EXISTS seo_sitemaps;
DROP TABLE IF EXISTS seo_search_analytics;
DROP TABLE IF EXISTS seo_property_aggregates;
DROP TABLE IF EXISTS seo_inspections;

