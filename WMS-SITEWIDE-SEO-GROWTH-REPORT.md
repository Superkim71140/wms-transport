# WMS TRANSPORT Controlled Sitewide SEO Growth & Technical Architecture Master Report

**Project:** WMS TRANSPORT (`https://wms-transport.com`)  
**Protected Reference:** MJ-TH Express (READ-ONLY — 100% Preserved)  
**Branch:** `seo/wms-sitewide-growth`  
**Date:** September 16, 2026  
**Auditor / Engineer:** Senior Next.js Developer & Technical SEO Engineer  
**Status:** Audit, Remediation, Documentation Suite, and Production Verification Complete (Zero Deployment)

---

## Executive Summary

This report establishes a controlled, evidence-based sitewide SEO growth system for **WMS TRANSPORT**, protecting the domain against Google algorithm penalties (Doorway Pages, Scaled Content Abuse, E-E-A-T trust erosion) while laying out a sustainable 90-day expansion pathway.

### Key Milestones Accomplished:
1. **Revalidation & Strict Quality Gating:** Audited all 15 official BMA Thonburi districts. Identified that Nong Khaem (`job-nk-01`) and Phasi Charoen (`job-pc-01`) lacked physical evidence records and improperly reused Bang Khae review `rev-bk-01`. Gated both districts to `draft_evidence_required` (returning HTTP 404 and excluded from sitemap). Retained only verified districts: **Bang Khae**, **Pinklao**, and **Maha Chai**.
2. **Vehicle Height Normalization:** Eliminated contradictory claims stating total vehicle height is $\le 2.1$m or that high-box pickup trucks can enter all low-ceiling condominium basement parking lots. Standardized to factual internal clearance copy ("ตู้ทึบความสูงภายใน 2.1 เมตร") with designated loading bay parking guidance.
3. **Security & Route Protection:**
   - Purged unauthorized external footer link to `https://kimx-wed.vercel.app/`.
   - Added server metadata `robots: { index: false, follow: false }` to internal route `/dashboard/seo-intelligence` and confirmed disallow in `robots.ts`.
4. **Sitewide SEO Governance Documentation:** Created complete documentation suite in `docs/`:
   - `docs/GSC-DATA-REQUEST.md` (Google Search Console export instructions & CSV schemas)
   - `docs/WMS-EVIDENCE-GAP-LIST.md` (Owner measurement checklist & district evidence gaps)
   - `docs/WMS-SITEWIDE-KEYWORD-PAGE-MAP.md` (Sitewide URL responsibility & cannibalization prevention map)
   - `docs/WMS-90-DAY-SEO-ROADMAP.md` (Phased 90-day growth plan)
   - `docs/WMS-SEO-CHANGE-LOG.md` (Code change and audit history)
5. **Full Automated & Live Verification:** Passed TypeScript typecheck (0 errors), ESLint (0 errors, 0 warnings), unit tests (100% passed), production build (85 static pages), and live production server suite (**50 passed / 0 failed**).

---

## Stage 1 — Thonburi & Sitewide Revalidation Findings

### 1.1 Evidence Integrity Audit
* **Findings:**
  - **Bang Khae (`bang-khae`):** Backed by verified case study `moving-condo-bang-khae`, customer review `rev-bk-01` (คุณปิยะพล), and authentic photograph `/images/WM10.webp`. (Proof Score: 85 $\rightarrow$ **PUBLISHED & INDEXABLE**).
  - **Pinklao (`pinklao`):** Backed by verified case study `motorcycle-delivery-pinklao`, customer review `rev-pk-01` (คุณวรัญญา), and photograph `/images/WM11.webp`. (Proof Score: 75 $\rightarrow$ **PUBLISHED & INDEXABLE**).
  - **Maha Chai (`maha-chai`):** Backed by verified case study `freight-delivery-maha-chai`, customer review `rev-mc-01` (คุณเกรียงไกร), and photograph `/images/WM8.webp`. (Proof Score: 78 $\rightarrow$ **PUBLISHED & INDEXABLE**).
  - **Nong Khaem (`nong-khaem`) & Phasi Charoen (`phasi-charoen`):** Referenced placeholder job IDs and borrowed `rev-bk-01`. Gated to `draft_evidence_required`.
  - **Remaining 12 Thonburi Districts:** Gated to `draft_evidence_required`.
* **Action:** Enforced `isDistrictPageIndexable` rule requiring `(record.projectEvidenceIds?.length ?? 0) > 0`.

### 1.2 Vehicle Height Contradiction Resolution
* **Physical Reality:** A single-cab pickup truck with a 2.1m cargo box mounted on top of the truck chassis has a total external vehicle height of **~2.8m to 3.0m**. It **cannot** enter underground basement parking with a 2.1m height bar.
* **Remediation:** 
  - Standardized all copy across `ThonburiHubView.tsx`, `districtLandingPages.ts`, and `service/[province]/page.tsx` to state **"ตู้ทึบความสูงภายใน 2.1 เมตร"** (internal height) for carrying tall furniture vertically.
  - Added operational guidance that vehicle loading is performed at ground-floor designated loading bays (Loading Bay) or open parking areas.
  - Added physical measurement request to `docs/WMS-EVIDENCE-GAP-LIST.md`.

### 1.3 Unsupported Claims Purge
* Purged absolute claims ("ทุกโครงการ", "ทุกตรอกซอกซอย", "ทีมงานมืออาชีพ", "ไม่มีค่าใช้จ่ายแฝง") in favor of transparent, factual operating copy ("พร้อมพนักงานช่วยยกของ", "คำนวณราคาเริ่มต้นตามระยะทางจริงและรายละเอียดสิ่งของอย่างโปร่งใส").

### 1.4 Security & External Link Protection
* Removed developer credit link `https://kimx-wed.vercel.app/` from `src/components/Footer.tsx`.
* Added `robots: { index: false, follow: false }` metadata to `/dashboard/seo-intelligence` and confirmed disallow rule in `src/app/robots.ts`.

---

## Stage 2 — Real Search Performance Data Integration

* **Status:** Live GSC credentials/exports were not previously connected to the repository.
* **Action:** Created `docs/GSC-DATA-REQUEST.md` with exact instructions for owner export of 16-month and 90-day GSC performance data, including CSV schemas for Queries, Pages, and Cannibalization matrices.
* **Non-Destructive Policy:** No existing indexable URL has been deleted or redirected based on assumptions.

---

## Stage 3 — Sitewide Keyword-to-Page Architecture

Documented in full in `docs/WMS-SITEWIDE-KEYWORD-PAGE-MAP.md`.

### URL Responsibility Model:
* **`/`:** Brand entity, primary transport services, sitewide trust anchors.
* **`/pricing/*`:** Transactional and cost intent ("ราคารถรับจ้าง", "ค่าส่งมอเตอร์ไซค์").
* **`/service/[province]`:** Regional browsing hubs ("รถรับจ้างฝั่งธนบุรี", "รถรับจ้างสมุทรสาคร").
* **`/areas/[province]/[district]`:** Evidence-backed localized queries ("รถรับจ้างบางแค").
* **`/route/[from]/[to]`:** High-demand recurring transport corridors ("กรุงเทพฯ - ภูเก็ต").
* **`/portfolio/[slug]`:** E-E-A-T proof artifacts and verified case studies.
* **`/guides/[slug]`:** Informational user education ("วิธีคำนวณคิวรถตู้ทึบ").
* **`/compare/[slug]`:** Consideration and vehicle selection comparisons ("กระบะคอก vs ตู้ทึบ").

---

## Stage 4 — Growth Prioritization Matrix & Quality Gates

Pages are categorized into three explicit states:
1. `published` (Proof Score $\ge 75$, verified job evidence, authentic photos, unique local data) $\rightarrow$ Built as static HTML, included in sitemap, self-canonical.
2. `draft_evidence_required` (Structured administrative and route data, but awaiting field photos/reviews) $\rightarrow$ Excluded from sitemap, returns runtime HTTP 404.
3. `rejected_duplicate_or_low_value` (Thin programmatic doorway attempts without real operational relevance) $\rightarrow$ Rejected.

### Expansion Sequence:
1. **Tier 1:** Existing indexable pages with ranking potential (Positions 4–20).
2. **Tier 2:** Core commercial service and pricing pages.
3. **Tier 3:** High-demand verified case studies (`portfolio/*`).
4. **Tier 4:** Evidence-backed unlock of gated districts (Nong Khaem, Phasi Charoen).
5. **Tier 5:** Verified long-haul transport corridors (`route/*`).

---

## Stage 5 — Real-Job Evidence & Privacy Protection System

* **Structured Record Standard:**
  - Job ID, service date, origin, destination, service type, vehicle used, access constraints, items transported, customer review, original image paths, and proof score.
* **Privacy & Consent Protection:**
  - Mandatory blurring or removal of license plates, customer faces, house numbers, and full phone numbers.
  - All public case studies categorized as `safe_public` or `anonymized_public`.

---

## Stage 6 & 7 — Technical SEO & Structured Data Integrity

* **Entity Graph:** Unified `MovingCompany` / `Organization` entity with canonical `@id: "https://wms-transport.com/#moving-company"`.
* **Service Schema:** Valid `Service` schema with `areaServed` as `AdministrativeArea`.
* **BreadcrumbList:** Accurate breadcrumbs on all hierarchical routes.
* **FAQPage Schema:** Exactly matches visible on-page accordion text (no hidden questions).
* **Robots & Sitemap:**
  - `sitemap.xml` contains exactly 70 URLs (all return HTTP 200 OK).
  - Zero 404s, zero redirects, zero draft pages, and zero dashboard routes in sitemap.

---

## Stage 8 — Comprehensive Verification Results

### 8.1 Automated Test Toolchain

| Test Suite | Command | Exit Code | Verification Details |
|---|---|:---:|---|
| TypeScript Typecheck | `npx tsc --noEmit` | **0** | Clean, 0 type errors |
| ESLint Validation | `npm run lint` | **0** | Clean, 0 errors, 0 warnings |
| SEO Validator | `npm run seo:verify` | **0** | 44 canonical routes verified, 0 errors |
| Test Suite | `npm test` | **0** | All source files 100% clean of synthetic claims |
| Production Build | `npm run build` | **0** | 85 static HTML routes prerendered |
| Dependency Audit | `npm audit --omit=dev --json` | **1** | 1 moderate transitive vulnerability (`baseline-browser-mapping`, no fix applied) |

### 8.2 Live Production Server Tests (Port 3006 — `test-sitewide-live.mjs`)

* **Total Live Assertions:** **50 PASSED / 0 FAILED**
  - `sitemap.xml` returned 200 OK with 70 valid URLs.
  - Every single sitemap URL crawled and confirmed **HTTP 200 OK**.
  - All 14 draft Thonburi districts returned **HTTP 404 Not Found**.
  - Published districts (`bang-khae`, `pinklao`, `maha-chai`) returned **HTTP 200 OK** with H1 and canonicals.
  - `/service/bkk-thonburi` returned **HTTP 200 OK** with normalized height text and dual-zone cards.
  - `/dashboard/seo-intelligence` returned **noindex** robots directive.
  - Homepage returned **HTTP 200 OK** with zero external developer links.
  - `robots.txt` returned **HTTP 200 OK** with `Disallow: /dashboard/`.

---

## Stage 9 — 90-Day Implementation Roadmap Summary

* **Days 1–14 (Current Baseline):** Deploy-safe corrections, dashboard protection, external link purge, GSC data request, sitemap verification.
* **Days 15–45:** Analyze GSC 90-day search performance, publish 2 new verified case studies, collect Nong Khaem / Phasi Charoen evidence to unlock pages.
* **Days 46–90:** Expand verified long-haul routes (Bangkok $\leftrightarrow$ Chiang Mai, Bangkok $\leftrightarrow$ Chonburi), publish 2 customer guides, conduct quarterly technical audit.

---

## Deliverable File Package

* **ZIP Archive:** `WMS-TRANSPORT-SITEWIDE-SEO.zip`
* **Package Contents:** Complete sanitized source code, documentation suite, test scripts, and master reports.
* **Excluded:** `.git`, `.next`, `node_modules`, `.env*`, caches, logs, scratch files, and temporary archives.
