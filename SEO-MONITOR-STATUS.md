# WMS SEO Monitor — Verified Feature Status & Architecture

**Report Date**: 2026-10-31  
**Project**: WMS TRANSPORT (`https://wms-transport.com`)  
**Verified Git Commit**: `5ac2051` (HEAD -> main, origin/main)  

---

## 1. Verified Feature Status Matrix

| Module / Capability | Status | Implementation Details | Verified Evidence |
| :--- | :---: | :--- | :--- |
| **GSC Service Account Authentication** | **VERIFIED LIVE** | RS256 JWT bearer token exchange with Google OAuth2 (`wms-seo-reader@wms-seo-monitor.iam.gserviceaccount.com`). | HTTP 200 returned by `oauth2.googleapis.com/token`. Verified live token grant. |
| **GSC Property Identifier & Access** | **VERIFIED LIVE** | Exact property URL prefix: `https://wms-transport.com/`. Permission level: `siteFullUser`. | Verified via `GET https://www.googleapis.com/webmasters/v3/sites`. |
| **Property-Level Aggregates Query** | **IMPLEMENTED & VERIFIED** | Aggregates without dimension limits (`dimensions: []`) to get true site-wide clicks, impressions, CTR, and average position. | Returns true site impressions: 1,427, clicks: 47, CTR: 3.29%, avg position: 6.97. |
| **Dynamic Sitemap Resolution** | **IMPLEMENTED & VERIFIED** | Extracts live URLs directly from `/sitemap.xml` with local route generator fallback. No hardcoded 155. | Resolves live sitemap dynamically (155 published URLs currently). |
| **URL Inspection Station** | **IMPLEMENTED & VERIFIED** | Inspects Google's stored index state (`indexStatusResult`). Clearly disclaimed as stored index data, not a live crawl or submission. | Verified with representative URLs and ad-hoc single URL inspection endpoint. |
| **Bounded Resumable Batch Inspection** | **IMPLEMENTED & VERIFIED** | `POST /api/seo-monitor/inspect-batch` runs 10 URLs per batch with 500ms delays, persisting results to DB/JSON. | Quota-safe resumption verified in `tools/verify-seo-monitor.js`. |
| **Error Handling & Classification** | **IMPLEMENTED & VERIFIED** | Results categorized into: `indexed`, `not_indexed`, `error`, `unknown`. API failures (429, 500) are never marked as "not indexed". | Unit tested in `tools/verify-seo-monitor.js`. |
| **PageSpeed Insights Integration** | **IMPLEMENTED** | Server-side `pagespeed-client.ts` auditing 5 representative templates (Mobile & Desktop). Distinguishes Lab TBT from CrUX INP. | Initializes 10 audits with `pending_api_key`. Instructions provided for owner. |
| **Storage: Dual Engine** | **IMPLEMENTED & VERIFIED** | Uses PostgreSQL if `DATABASE_URL` is set; falls back to local durable JSON in development. Warns on Vercel if DB is missing. | Migration SQL files created (`001_quotations`, `002_seo_monitor`, `rollback_002`). |
| **Dashboard Security & Auth** | **IMPLEMENTED & VERIFIED** | Passcode auth (`timingSafeEqual`), signed HMAC-SHA256 session cookie, and IP-based rate limiting (5 failed attempts / 15 min lockout). | Rate limiting & cookie flags verified in test suite. |
| **Quotation & LINE Preservation** | **VERIFIED** | All customer booking schemas, quotation tables, phone masking, and LINE service routes are intact and untouched. | Verified via `tools/verify-seo-monitor.js` & `src/lib/quotations/quotationStore.ts`. |

---

## 2. Answers to Section B Verification Questions (in Thai)

### 1. Can the existing Google identity currently read the WMS property?
> **สามารถอ่านได้ 100%** บัญชีบริการ (Service Account) `wms-seo-reader@wms-seo-monitor.iam.gserviceaccount.com` ได้รับสิทธิ์ระดับ **`siteFullUser`** บน Search Console Property และผ่านการทดสอบยิง API จริง (`sites.list`, `sites.get`, `sitemaps.list`, `searchAnalytics.query`) ได้รับ HTTP 200 สำเร็จโดยไม่ต้องสร้าง OAuth Client ID หรือ Credentials ใหม่

### 2. What exact Search Console property identifier is configured?
> Identifier ที่กำหนดค่าไว้อย่างแม่นยำคือ **`https://wms-transport.com/`** (URL-prefix Property มี trailing slash) ไม่ใช่ Domain Property (`sc-domain:wms-transport.com`)

### 3. Is the dashboard using real API data, cached data, fixtures or examples?
> แดชบอร์ดใช้ **ข้อมูลจริงจาก Google Search Console API (Real API Data)** ที่ดึงมาบันทึกลงใน Durable Snapshot Cache (`data/seo-monitor/seo-snapshot.json` / PostgreSQL) และสามารถกดปุ่ม **"Sync Now"** หรือ **"Inspect Next Batch"** เพื่อดึงข้อมูลจริงสดๆ จาก Google ได้ตลอดเวลา ไม่ใช่ข้อมูลตัวอย่าง (Mock/Fixtures)

### 4. Is storage PostgreSQL or local JSON in each environment?
> - **ในเครื่องพัฒนา Local ปัจจุบัน**: เป็น **Local Durable JSON** (`data/seo-monitor/seo-snapshot.json`) เนื่องจากใน `.env.local` ยังไม่ได้ใส่ `DATABASE_URL`
> - **ใน Production (Vercel)**: กำหนดให้ต้องใช้ **PostgreSQL** ผ่านตัวแปร `DATABASE_URL` โดยระบบมีกลไกตรวจจับสภาพแวดล้อม Vercel Serverless (`process.env.VERCEL === '1'`) หากไม่มี PostgreSQL จะแสดงสถานะแจ้งเตือน `ephemeral_serverless_warning` อย่างชัดเจน เพื่อป้องกันการสูญหายของข้อมูลจากการรีสตาร์ตของ Serverless Container

### 5. How many unique sitemap URLs have actually been inspected?
> ใน Snapshot เดิม มี URL ที่ได้รับการตรวจสอบแล้ว **5 URLs ตัวแทน** ได้แก่:
> 1. `https://wms-transport.com/` (PASS / ส่งและจัดทำดัชนีแล้ว)
> 2. `https://wms-transport.com/areas` (PASS / ส่งและจัดทำดัชนีแล้ว)
> 3. `https://wms-transport.com/pricing` (PASS / ส่งและจัดทำดัชนีแล้ว)
> 4. `https://wms-transport.com/service/bkk-thonburi` (PASS / ส่งและจัดทำดัชนีแล้ว)
> 5. `https://wms-transport.com/blog/how-to-request-quote-checklist` (NEUTRAL / พบแล้ว - ยังไม่ได้จัดทำดัชนี)
> โดยระบบใหม่รองรับการกด **Batch Inspection (ครั้งละ 10 URLs)** เพื่อทยอยตรวจจนครบทั้ง Sitemap ได้อย่างต่อเนื่อง

### 6. Is PageSpeed configured and returning real results?
> **ยังไม่ได้ผลลัพธ์จริง** เนื่องจากในเครื่องยังไม่มีตัวแปร `PAGESPEED_API_KEY` ระบบจึงแสดงสถานะ **`pending_api_key` / `not_audited`** อย่างถูกต้อง พร้อมแสดงคู่มือขั้นตอนการขอ API Key จาก Google Cloud Console แก่เจ้าของระบบ

### 7. Which changes are local, committed, pushed and deployed?
> - **Committed & Pushed & Deployed**: Commit `5ac2051` ("feat(seo): complete sitemap validation, orphan remediation, and homepage zone hub internal linking") อยู่บน branch `main` ของ GitHub (`origin/main`) และได้ทำการ Deploy ขึ้น Production Vercel (`https://wms-transport.com`) เรียบร้อยแล้ว (ตรวจสอบผ่าน HTTP 200 บน Production)
> - **Local Changes (ในงานครั้งนี้)**: การยกระดับระบบ Search Console, Dynamic Sitemap Batch Inspection, PageSpeed Client, Rate Limiting, SQL Migrations, และ Integration Verification Suite

### 8. What exact owner setup remains?
> 1. **PageSpeed Insights API Key**: เจ้าของระบบเข้า Google Cloud Console (`wms-seo-monitor`) เพื่อ Generate API Key และตั้งค่าจำกัดการใช้งานเฉพาะ PageSpeed Insights API จากนั้นนำไปใส่ใน `PAGESPEED_API_KEY` (ใน Vercel Dashboard / `.env.local`)
> 2. **Production PostgreSQL**: ผูกฐานข้อมูล PostgreSQL (เช่น Supabase หรือ Neon) เข้ากับ Vercel Production โดยใส่ `DATABASE_URL` และรัน Migration `migrations/002_seo_monitor_schema.sql`
> 3. **Production GSC Env on Vercel**: ใส่ `GSC_SERVICE_ACCOUNT_EMAIL` และ `GSC_PRIVATE_KEY` ใน Vercel Environment Variables
> 4. **Passcode Rotation**: กำหนดรหัสผ่าน `SEO_DASHBOARD_PASSCODE` ที่รัดกุมใน Server Environment

