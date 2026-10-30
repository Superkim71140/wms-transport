# WMS TRANSPORT — SEO QA & Validation Results
**Execution Date**: October 29, 2026  
**Environment**: Next.js 16.3.5 (Turbopack), Node.js v26.2.0, Windows PowerShell  
**Target Domain**: [https://wms-transport.com](https://wms-transport.com)

---

## 1. Test Execution Summary

| Test Suite / Command | Tool / Command | Result | Details |
| :--- | :--- | :---: | :--- |
| **Sitemap lastmod Regression** | `node tools/test-lastmod-regression.js` | **PASS (10/10)** | All 10 calendar validity, future-date, stability, and omission tests passed. |
| **Sitemap Exact-Set & Eligibility** | `node tools/verify-sitemap-and-indexing.js` | **PASS** | 155 unique URLs, 0 duplicates, 0 draft leaks, 28 truthful ISO dates, 127 omitted. |
| **SEO Source-of-Truth Data Validation** | `node tools/verify-seo-data.js` | **PASS** | 123 verified canonical URLs, 0 schema abuse errors, 0 synthetic tokens, 18 length warnings. |
| **Production Build & Type Check** | `npm run build` | **PASS** | TypeScript check clean, 176/176 static routes generated successfully in 7.3s. |
| **Production Server Preview** | `npx next start -p 3000` | **PASS** | Ready in 456ms on port 3000, served all priority pages with HTTP 200. |
| **Browser Visual & DOM Validation** | `browser_subagent` (Playwright engine) | **PASS** | Captured "before" and "after" high-resolution screenshots for 4 priority pages. |

---

## 2. Detailed Test Results by Section

### A. Build and Behavior Check (Section 10.A)
- **TypeScript & Next.js App Router**: Build completed with zero type errors. Clean generation across dynamic route groups `[province]`, `[province]/[serviceId]`, `[slug]`, and static overrides.
- **Phuket Static Overrides**: Sanitized `phuket/moving/page.tsx`, `phuket/motorcycle/page.tsx`, and `phuket/freight/page.tsx`. Removed unverified claims ("เดินทางทุกวัน", "ให้ฟรี"), and linked to transparent pricing policies and capacity guides.
- **Dynamic 404 Routing**: Verified that unknown slugs in `[province]` and `[serviceId]` invoke `notFound()` properly, avoiding empty HTTP 200 soft-404 traps.
- **CTAs & Contact Integrity**: Maintained official phone link `tel:0612402436` and LINE contact URL throughout all headers, banners, and consultation components.

### B. Crawl and Indexing Eligibility (Section 10.B)
- **Sitemap Inventory**: Exactly 155 indexable canonical URLs.
  - Core routes: 12
  - Province hubs & nested services: 8 + 24 = 32
  - Published blog articles: 16
  - Approved route corridors: 10
  - Approved district pages: 12 (12 unverified drafts gated)
  - Portfolio cases: 5
  - Indexable guides: 5
  - Zone hubs: 7
  - Published local area points: 56 (6 drafts gated)
- **URL Normalization**: All sitemap URLs strictly use production origin `https://wms-transport.com` with percent-encoded non-ASCII characters matching declared `<link rel="canonical">` tags.
- **Footers & Broken Link Fixes**: Eliminated broken URLs in `src/components/Footer.tsx` (`/areas/bangkok/bang-khae`, `/areas/bangkok/nong-khaem`, `/areas/bangkok/bang-bon`, `/areas/salaya-phutthamonthon`, `/areas/samphran-phetkasem`) by updating them to canonical published paths. This directly eliminates the 4 GSC 404 exclusions observed in historical reports.

### C. Date Regression Suite (Section 10.C — 10/10 Passed)
1. **Criterion 1**: Substantive change to page receives recorded modification date (`2026-10-29T08:00:00+07:00` -> `2026-10-29T01:00:00.000Z`). **PASS**
2. **Criterion 2**: Unchanged page keeps its original distinct date without alteration. **PASS**
3. **Criterion 3**: Rebuilding without content changes produces deterministic, stable date output. **PASS**
4. **Criterion 4**: Empty, whitespace, or undefined dates return `undefined`, preventing sitewide date bumps on footer/copyright changes. **PASS**
5. **Criterion 5**: Impossible calendar dates (e.g. `2026-02-30`, `2026-04-31`) are detected and rejected rather than rolling over to March/May. **PASS**
6. **Criterion 6**: Future dates beyond current reference time are rejected rather than silently clamped to release dates. **PASS**
7. **Criterion 7**: Missing dates omit `lastmod` completely. **PASS**
8. **Criterion 8**: Dates before and after September 21 preserve their distinct values; no collapsing to September 21. **PASS**
9. **Criterion 9**: Month-only strings (e.g. "มิถุนายน 2026") without an explicit day return `undefined` rather than inventing a day 1 or day 25. **PASS**
10. **Criterion 10**: Sitemap output format is strictly `Date` or `undefined`, fully compliant with Next.js Sitemap API. **PASS**

### D. Evidence Verification (Section 10.D)
- Built `WorkEvidenceSummary.tsx` to surface only source-backed case studies on matching service and district pages.
- Connected verified proof for:
  - Bang Khae condo move (`moving-condo-bang-khae`)
  - Maha Chai factory freight (`freight-delivery-maha-chai`)
  - Pinklao motorcycle transport (`motorcycle-delivery-pinklao`)
  - Nong Khaem - Bang Khae house move (`moving-house-nongkhaem-bang-khae`)
  - Bang Bon townhouse move (`moving-townhouse-bang-bon`)
- Redacted all private customer names, unit numbers, phone numbers, and license plates.
- Documented remaining unconfirmed claims in `evidence-gaps.csv` without publishing unsupported badges or fake reviews.

---

## 3. Visual & UI Regression Summary (Section 10.E)

Captured before and after screenshots stored in the local artifacts directory:

| Page | Before Screenshot | After Screenshot | UX / Visual Verification |
| :--- | :--- | :--- | :--- |
| **Bang Khae Directory** (`/areas/bang-khae`) | `before_areas_bang_khae_1793233761976.png` | `areas_bang_khae_1793235020800.png` | Prominent blue callout linking to transactional service page (`ดูบริการรถรับจ้างบางแคและการประเมินราคา`); directory explanation notice added; 8 verified child points crawlable. |
| **Bang Khae Service** (`/areas/bkk-thonburi/bang-khae`) | `before_areas_bkk_thonburi_bang_khae_1793233769177.png` | `area_district_bang_khae_1793235029475.png` | Prominent banner linking back to directory (`เลือกพื้นที่รับส่งในโซนบางแค`); job restrictions disclosure card; direct link to `/pricing/moving` and `/portfolio/moving-condo-bang-khae`. |
| **Samut Sakhon Freight** (`/service/samutsakhon/freight`) | `before_service_samutsakhon_freight_1793233777312.png` | `service_samutsakhon_freight_1793235041600.png` | Localized B2B freight context; factory loading rules; PPE/safety gear notice; verified Maha Chai case study card rendered with direct link to portfolio. |
| **Portfolio Case** (`/portfolio/moving-condo-bang-khae`) | `before_portfolio_moving_condo_bang_khae_1793233787431.png` | `portfolio_moving_condo_bang_khae_1793235056515.png` | High-rise elevator booking, wrapping process, and bidirectional link back to `/areas/bkk-thonburi/bang-khae` and `/service/bkk-thonburi/moving`. |

---

## 4. Checks Not Performed (Honest Reporting)

The following checks could not be executed in this local session due to external credential/access boundaries:
1. **Google Search Console Live URL Inspection**: Requires live Google OAuth credentials and Search Console property access. Must be performed post-deployment via GSC.
2. **Production DNS & www Subdomain Configuration**: Involves DNS provider / domain registrar nameservers (Cloudflare / Namecheap / GoDaddy) which are outside this local repository's scope.
3. **Live Production HTTP Header & 301 Redirect Check**: Requires Vercel deployment credentials to inspect production edge routing.

---

## 5. Post-Deployment Verification Checklist for Owner

After deploying this commit to Vercel production:
- [ ] **Step 1: Check Live Robots & Sitemap**
  - Visit `https://wms-transport.com/robots.txt` — verify `Sitemap: https://wms-transport.com/sitemap.xml`.
  - Visit `https://wms-transport.com/sitemap.xml` — verify 155 URLs and stable `lastmod` ISO strings.
- [ ] **Step 2: Submit Sitemap in Google Search Console**
  - Go to **Google Search Console > Sitemaps**.
  - Submit `https://wms-transport.com/sitemap.xml`.
  - Verify status: "Success" and total discovered pages count matching 155.
- [ ] **Step 3: Inspect Differentiated Bang Khae URLs**
  - In GSC URL Inspection tool, inspect `https://wms-transport.com/areas/bang-khae`.
  - In GSC URL Inspection tool, inspect `https://wms-transport.com/areas/bkk-thonburi/bang-khae`.
  - Verify that Google recognizes both self-referencing canonicals and distinct page content.
- [ ] **Step 4: Request Validation of Historical 404 Exclusions**
  - Go to **GSC > Pages > Not found (404)**.
  - Click **Validate Fix** to confirm that the old invalid footer links are gone and resolved.
