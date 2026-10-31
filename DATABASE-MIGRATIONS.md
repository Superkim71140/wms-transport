# WMS TRANSPORT — Database Migrations & Rollback Procedures

This document outlines the database schema architecture, migration procedures, and safe rollback workflows.

---

## 1. Schema Separation & Safety Principles

1. **Isolation of Customer Quotation Data**:
   - The primary quotation system operates on table `quotations`.
   - All SEO Monitor tables are prefixed with `seo_` (`seo_inspections`, `seo_property_aggregates`, `seo_search_analytics`, `seo_sitemaps`, `seo_alerts`, `seo_pagespeed`, `seo_sync_runs`).
   - Under no circumstances will SEO migrations alter, drop, or lock the `quotations` table.

2. **Idempotent & Non-Destructive**:
   - All migrations use `CREATE TABLE IF NOT EXISTS` and `CREATE INDEX IF NOT EXISTS`.
   - Re-running migrations is completely safe and causes zero downtime.

3. **Production Durability**:
   - Production on Vercel requires PostgreSQL to prevent data loss across serverless restarts.

---

## 2. Migration Files

| File | Purpose | Impact on Quotations |
| :--- | :--- | :---: |
| `migrations/001_quotations_schema.sql` | Establishes the quotation and customer booking system schema. | **CREATES/PRESERVES** |
| `migrations/002_seo_monitor_schema.sql` | Establishes SEO Monitor tables (Search Console, Inspection, PageSpeed). | **ZERO IMPACT** |
| `migrations/rollback_002_seo_monitor_schema.sql` | Safely drops all `seo_*` tables if rolling back SEO Monitor. | **ZERO IMPACT** |

---

## 3. Migration Procedure

### Option A: Using `psql` Command Line
```bash
# Set your target database connection
export DATABASE_URL="postgresql://<DB_USER>:<DB_PASSWORD>@<DB_HOST>:5432/<DB_NAME>?sslmode=require"

# 1. Apply quotations schema (if setting up fresh DB)
psql "$DATABASE_URL" -f migrations/001_quotations_schema.sql

# 2. Apply SEO Monitor schema
psql "$DATABASE_URL" -f migrations/002_seo_monitor_schema.sql
```

### Option B: Using Hosted Dashboard (Neon / Supabase / Render)
1. Open your provider's **SQL Editor** console.
2. Paste the contents of `migrations/002_seo_monitor_schema.sql`.
3. Click **Run**.
4. Verify created tables:
   ```sql
   SELECT table_name FROM information_schema.tables WHERE table_schema = 'public';
   ```

---

## 4. Rollback Procedure

If the SEO Monitor schema needs to be cleanly uninstalled without affecting any quotation data:

```bash
# Run rollback script
psql "$DATABASE_URL" -f migrations/rollback_002_seo_monitor_schema.sql
```

Verify that the `quotations` table and all customer data remain completely intact:
```sql
SELECT count(*) FROM quotations;
```
