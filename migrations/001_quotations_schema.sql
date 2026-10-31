-- =============================================================================
-- Migration: 001_quotations_schema.sql
-- Description: Quotation and customer booking system schema
-- Safe, non-destructive migration preserving customer quotation data
-- =============================================================================

CREATE TABLE IF NOT EXISTS quotations (
  id TEXT PRIMARY KEY,
  idempotency_key TEXT UNIQUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  customer_name TEXT,
  customer_phone TEXT NOT NULL,
  customer_line_id TEXT,
  job_type TEXT NOT NULL,
  origin_province TEXT NOT NULL,
  origin_district TEXT,
  destination_province TEXT NOT NULL,
  destination_district TEXT,
  appointment_date DATE NOT NULL,
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
  needs_pod_return BOOLEAN DEFAULT FALSE,
  summary_text TEXT,
  source_url TEXT,
  notification_status TEXT NOT NULL DEFAULT 'pending',
  retry_count INTEGER NOT NULL DEFAULT 0,
  last_error TEXT,
  sent_at TIMESTAMPTZ
);

CREATE INDEX IF NOT EXISTS idx_quotations_created_at ON quotations(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_quotations_customer_phone ON quotations(customer_phone);
CREATE INDEX IF NOT EXISTS idx_quotations_notification_status ON quotations(notification_status);

