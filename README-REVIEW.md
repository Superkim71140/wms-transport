# WMS SEO Monitor — Review & Development Guide

This package contains the complete, sanitized codebase of **WMS TRANSPORT** along with the **WMS SEO Monitor** implementation ready for ChatGPT or other AI agents and senior engineers to inspect, review, and continue development.

---

## 1. Project Overview & Entry Points

- **Production Domain**: `https://wms-transport.com`
- **Dashboard URL**: `http://localhost:3000/seo-monitor` (Local) / `https://wms-transport.com/seo-monitor` (Production)
- **API Entry Points**:
  - `POST /api/seo-monitor/auth` — Session login with passcode & rate limiting
  - `DELETE /api/seo-monitor/auth` — Session logout & cookie clearance
  - `GET /api/seo-monitor/data` — Fetch aggregated SEO monitor snapshot
  - `POST /api/seo-monitor/sync` — Synchronize live Google Search Console data & property aggregates
  - `POST /api/seo-monitor/inspect` — On-demand single URL inspection
  - `POST /api/seo-monitor/inspect-batch` — Resumable bounded batch URL inspection across dynamic sitemap
  - `GET /api/seo-monitor/pagespeed` — Fetch PageSpeed audit records & configuration status
  - `POST /api/seo-monitor/pagespeed` — Run representative template audits (Mobile & Desktop)

---

## 2. Runtime Requirements

- **Node.js**: v20+ (tested and verified on Node.js v26.2.0)
- **Package Manager**: `npm` (with `package-lock.json` lockfile integrity)
- **Framework**: Next.js 16.3.5 (App Router, React 19)
- **Database (Optional for Local / Required for Production)**: PostgreSQL 14+ (Neon / Supabase / Vercel Postgres)

---

## 3. Setup Commands

### Installation
```bash
npm install
```

### Setup Partytown & Dev Server
```bash
# Setup Partytown web-worker library and start dev server
npm run setup:partytown
npm run dev
```

### Verification & Testing
```bash
# Type check without emission
npx tsc --noEmit

# Lint check (clean with 0 errors)
npm run lint

# Secret check (ensures no credential leaks)
npm run secret:check

# Production SEO verification
npm run seo:verify

# Integration verification test suite
npx tsx tools/verify-seo-monitor.js
```

---

## 4. Architecture & Key Features

1. **Google Search Console Integration**:
   - Authenticates via Google Cloud Service Account (`wms-seo-reader@wms-seo-monitor.iam.gserviceaccount.com`).
   - Uses JWT RS256 token exchange with `https://www.googleapis.com/auth/webmasters.readonly`.
   - Property identifier: `https://wms-transport.com/` (Exact URL-prefix).
   - Fetches **property-level aggregates** (`byProperty`) for site-wide summary totals (clicks, impressions, overall CTR, average position), preventing incomplete sums from truncated query tables.
   - Dynamically resolves sitemap URLs without hardcoding any fixed page count.

2. **URL Inspection Station**:
   - Inspects Google's **stored index data** (`indexStatusResult`) from its last crawl.
   - Clearly disclaimed: Not a live crawler test and not an indexing submission.
   - Bounded resumable batch inspection (10 URLs per run with 500ms rate-limit delays).
   - Strict categorization: `indexed`, `not_indexed`, `error`, `unknown`. API failures (e.g. 429 quota exhaustion) are strictly recorded as `error`, never falsified as "not indexed".

3. **Storage Abstraction**:
   - Dual-engine architecture:
     - **PostgreSQL**: Durable tables (`seo_inspections`, `seo_property_aggregates`, `seo_search_analytics`, `seo_sitemaps`, `seo_alerts`, `seo_pagespeed`, `seo_sync_runs`).
     - **Local Durable File**: `data/seo-monitor/seo-snapshot.json` for local offline development.
   - Ephemeral Warning: Explicitly detects Vercel serverless environment (`process.env.VERCEL === '1'`) and warns if `DATABASE_URL` is unconfigured to prevent silent data loss.

4. **Security & Authentication**:
   - Passcode verification using `crypto.timingSafeEqual`.
   - HMAC-SHA256 signed session tokens with `httpOnly`, `sameSite: lax`, `secure` (production).
   - Rate limiting on `POST /api/seo-monitor/auth` (maximum 5 failed attempts per 15-minute sliding window).
   - No credentials exposed in client bundles or `NEXT_PUBLIC_` variables.

5. **PageSpeed Insights**:
   - Server-side integration with Google PageSpeed Insights API v5.
   - Audits 5 representative page templates across both Mobile and Desktop.
   - Clear distinction between **Lighthouse Lab data** (Score, FCP, LCP, CLS, TBT) and **CrUX Real-User Field data** (LCP, CLS, INP).
   - TBT is never mislabeled as INP; missing field data is never assumed passing.

---

## 5. Known Limitations

1. **GSC API Quotas**:
   - Google Search Console URL Inspection API has a daily quota of 2,000 queries per property and ~600 QPM rate limit. Batch inspection runs in paced slices of 10 to protect quotas.
2. **PageSpeed Insights API Key**:
   - `PAGESPEED_API_KEY` is not committed (must be configured by the owner in Google Cloud Console under `wms-seo-monitor`).

