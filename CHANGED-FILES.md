# WMS SEO Monitor — Changed Files Summary

This document lists the files created, modified, or updated to implement and harden the WMS SEO Monitor according to the review specifications.

---

## 1. Core Implementation & Security Hardening

### `src/lib/seo-monitor/inspection-service.ts`
- **Issue 1 Fixed**: Corrected verdict & indexing categorization. Explicitly matches negative states (`Crawled - currently not indexed`, `Discovered - currently not indexed`, Thai equivalents `พบแล้ว - ยังไม่ได้จัดทำดัชนี`, `รวบรวมข้อมูลแล้ว...`, `noindex`, redirects, duplicate canonicals) before positive checks. Removed dangerous `.includes('indexed')`.
- **Issue 5 Fixed**: Added concurrency mutex (`isBatchInProgress`, `isInspectionBatchActive`) with 60s safety timeout to reject overlapping runs with 409 Conflict. Bounded batch size to 10 URLs. Prioritizes never-inspected URLs, then sorts refresh candidates by oldest `lastInspectedAt` timestamp ascending. Limits error retries to at most 2 per batch and skips errors attempted within 15 minutes. Incremental persistence (`saveSingleInspection`) writes each URL immediately after inspection.

### `src/lib/seo-monitor/seo-store.ts`
- **Issue 2 Fixed**: Enforces durable PostgreSQL storage in production (`NODE_ENV === 'production'` or `VERCEL === '1'`). Returns immediately after successful PostgreSQL write. Throws actionable error if `DATABASE_URL` is missing or DB query fails. Never falls back to local JSON or `/tmp` in production.
- **Issue 3 Fixed**: Made repeated snapshot saves fully idempotent with `ON CONFLICT (url) DO UPDATE ...` on `seo_inspections`, `ON CONFLICT (path) DO UPDATE ...` on `seo_sitemaps`, and `ON CONFLICT (url, device) DO UPDATE ...` on `seo_pagespeed`. Persists and restores `status`, `errorMessage`, and `lastInspectedAt`.
- **Issue 4 Fixed**: Added full database round-trip persistence for `pageSpeedAudits` in `saveSeoSnapshot` and restoration in `getSeoSnapshot`. Added `saveSingleInspection` for incremental write safety.
- **Added**: Added `traffic_drop` alert type to detect queries with >=50% click loss compared to previous 28-day period.

### `src/lib/seo-monitor/auth.ts`
- **Issue 6 Fixed**: Removed hard-coded fallback secrets (`wms-seo-default-secret`). Fails closed when required authentication secrets (`SEO_DASHBOARD_PASSCODE` / `SEO_SESSION_SECRET`) are missing. Validates token structure, `auth: true`, finite numeric `exp`, non-expired status, and maximum 7-day lifetime. Added `verifyCsrfOrigin` to reject state-changing requests with mismatched origins.

### `src/app/seo-monitor/SeoDashboardClient.tsx`
- **Issue 7 Fixed**: In `perfMetrics`: when `snapshot.siteAggregatesLatest28d` is null or missing, marks metrics as unavailable (`isAvailable: false`, values set to `null`). NEVER calculates whole-site clicks or impressions by summing the 500-row sample query table, and NEVER calculates whole-site average position by unweighted row averaging. In the Overview UI, displays `N/A` with clear status notices and prompts to "Sync Now" for aggregates.

### `src/app/api/seo-monitor/inspect-batch/route.ts`
- Returns HTTP 409 Conflict if a batch inspection is already running. Validates authorized session and rate limiting.

### `migrations/002_seo_monitor_schema.sql`
- Added `status`, `error_message`, and `last_inspected_at` columns to `seo_inspections`.
- Added unique constraints `seo_inspections_url_unique` on `url`, `seo_sitemaps_path_unique` on `path`, and `seo_pagespeed_url_device_unique` on `(url, device)`.
- Uses safe `ALTER TABLE ... ADD COLUMN IF NOT EXISTS` and `ON CONFLICT DO NOTHING` statements that are non-destructive to existing quotation and customer data.

---

## 2. Tools & Verification Scripts

### `tools/test-failure-cases.js`
- **Issue 8 Implemented**: 22 automated test cases covering:
  1. Not-indexed classification (English and Thai variants, API errors, unknown verdict)
  2. Missing-secret rejection (fail-closed behavior)
  3. Repeated database saves (idempotency)
  4. Production database outage behavior (actionable error thrown, no JSON fallback)
  5. Inspection and PageSpeed round-trip database persistence
  6. Concurrency mutex rejection (409 Conflict)
  7. Aggregate API failure display / fallback behavior

### `tools/verify-seo-monitor.js`
- Main verification suite with 23 integration tests against live GSC credentials, live sitemap parsing, token handling, PageSpeed defaults, and quotation privacy.

### `tools/set-seo-passcode.js`
- Utility for the site owner to generate or set a custom `SEO_DASHBOARD_PASSCODE` in `.env.local` securely without exposing the secret in chat or stdout.

### `tools/create-review-zip.js`
- Script to package the clean, sanitized codebase, migrations, tests, and documentation into `WMS-SEO-Monitor-Review-YYYYMMDD.zip` excluding `.git`, `.env.local`, `node_modules`, and sensitive credentials.
