# WMS TRANSPORT — Technical SEO & Content Architecture Implementation Report

**Prepared**: October 29, 2026  
**Website**: [https://wms-transport.com](https://wms-transport.com)  
**Lead Roles**: Senior Technical SEO Specialist, Next.js Engineer, and Thai UX Content Designer  
**Status**: Implementation Complete, Tested, and Production-Ready  

---

## 1. Executive Summary

This implementation delivers a comprehensive architectural upgrade to [WMS TRANSPORT](https://wms-transport.com), addressing crawlability, indexation quality, content distinctiveness, and internal link equity across the entire Next.js App Router codebase.

All customer-facing content remains in natural, accurate Thai, preserving business names, geographic terms, and established URL slugs. All changes adhere strictly to the **Ponytail (Full Mode)** philosophy: minimal complete interventions, direct reuse of existing data structures, and zero unnecessary dependencies or CMS bloat.

### Key Outcomes:
1. **Differentiated Overlapping URLs**: Transformed `/areas/bang-khae` into a dedicated **Area Directory / Pickup Discovery Hub** and `/areas/bkk-thonburi/bang-khae` into a **Transactional Local Service Landing Page**, with distinct intents, content, headings, and cross-linking.
2. **Eliminated GSC 404 Exclusions**: Corrected invalid internal links in `src/components/Footer.tsx` (`/areas/bangkok/bang-khae`, etc.) which directly caused the 404 exclusions in Google Search Console.
3. **Harmonized 24 Service & 8 Location Pages**: Created `src/data/serviceAreaContent.ts`, providing factual, localized operational context, client requirements checklists, cargo restrictions, transparent pricing factors, and localized FAQs across all 8 location keys × 3 services.
4. **Sanitized Unverified Claims**: Removed unsubstantiated claims ("เดินทางทุกวัน", "ให้ฟรี", "เข้าถึงหน้างานภายใน 30-60 นาที", "คุ้มครองเต็มวงเงิน") across Phuket static overrides and service pages, replacing them with honest, factual operational guidance.
5. **Integrated Verified Work Evidence**: Built the reusable `WorkEvidenceSummary.tsx` module connecting 5 source-backed case studies (`moving-condo-bang-khae`, `freight-delivery-maha-chai`, `motorcycle-delivery-pinklao`, `moving-house-nongkhaem-bang-khae`, `moving-townhouse-bang-bon`) to relevant service and district pages.
6. **Resolved `lastmod` Date Collapsing**: Implemented strict calendar validation in `parseReliableLastmod` within `src/app/sitemap.ts`. Detects impossible dates (e.g. `2026-02-30`), flags future dates, refuses synthetic day creation on month-only strings, and correctly passes recorded modification dates.
7. **Validated 100% Passing Tests**: All 10 date regression tests passed, sitemap exact-set comparison passed (155 URLs, 0 duplicates, 0 draft leaks), and `npm run build` compiled 176/176 static routes cleanly in 7.3s.

---

## 2. Actual Skills and Reference Paths Used

| Skill Collection | Actual Installed Path | Application / Decision Informed |
| :--- | :--- | :--- |
| **Ponytail (Full Mode)** | `.agent/skills/ponytail/SKILL.md` | Reused existing TypeScript data models and layout components; minimal contiguous diffs; zero bloat/database additions. |
| **Ponytail Review** | `.agent/skills/ponytail-review/SKILL.md` | Verified canonical integrity, caller updates, date logic, and lack of synthetic token leakage. |
| **UI UX Pro Max** | `ui-ux-pro-max-skill-main/src/ui-ux-pro-max/SKILL.md` | Executed design script query: `"Thai transport moving local service trustworthy navy mobile-first"`. Informed navy/blue trust cues, card contrast, mobile-first single column conversion patterns, and accessible keyboard focus. |
| **Next.js Engine Rules** | `AGENTS.md` | Strictly followed Next.js 16 App Router metadata conventions, static generation params, and dynamic import patterns. |

---

## 3. Implementation Details by Task

### Task A & B: Differentiating the Two Bang Khae Pages

| URL | Type | Primary Intent | Thai Title | Thai H1 | Core Purpose & User Journey |
| :--- | :--- | :--- | :--- | :--- | :--- |
| **`/areas/bang-khae`** | Area Directory | Navigation & pickup discovery | พื้นที่บริการบางแค–เพชรเกษม เลือกจุดรับส่ง \| WMS | เลือกพื้นที่รับส่งในโซนบางแค–เพชรเกษม | Explains local pickup zone; lists 8 verified child points (`phetkasem`, `lak-song`, `wat-muang`, `bang-waek`, `bang-wa`, `bang-khae-nuea`, `bang-phai`, `kanchanaphisek-bang-khae`); callout banner linking to `/areas/bkk-thonburi/bang-khae`. |
| **`/areas/bkk-thonburi/bang-khae`** | Service Landing | Transactional hiring & quotation | รถรับจ้างบางแค ย้ายบ้านและคอนโด พร้อมคนยก \| WMS | รถรับจ้างบางแค ย้ายบ้าน คอนโด และขนส่งของ | Helps customer hire truck and team; outlines condo/townhouse loading rules, cargo restrictions, pricing factors, 4 local FAQs, verified case study link, and banner back to directory. |

Both pages maintain **self-referencing canonical tags** and distinct structured data (`ItemList` for directory, `Service` + `FAQPage` for landing).

### Task C: Location and Service Page Differentiation
- **Authoritative Dataset**: Added `src/data/serviceAreaContent.ts` containing tailored data for 24 service combinations and 8 location hubs.
- **Dynamic Wiring**:
  - `src/app/(marketing)/service/[province]/[serviceId]/page.tsx` now dynamically retrieves `getLocalizedServiceDetail(province, serviceId)` for metadata, hero tagline, audience context, preparation checklists, restrictions, transparent pricing factors, and localized FAQs.
  - `src/app/(marketing)/service/[province]/page.tsx` now displays localized hub focus, connecting routes, and verified evidence.
- **Sanitized Overrides**: Updated `src/app/(marketing)/service/phuket/moving/page.tsx`, `motorcycle/page.tsx`, and `freight/page.tsx`, removing unverified claims ("เดินทางทุกวัน", "ให้ฟรี (กล่องกระดาษ)", "คุ้มครองเต็มวงเงิน").

### Task D: Verified Work Evidence & Internal Links
- **Component**: Built `src/components/WorkEvidenceSummary.tsx` rendering clean, accessible cards for verified portfolio cases.
- **Source-Backed Cases Connected**:
  - `moving-condo-bang-khae` (Elevator booking & furniture wrapping in Bang Khae)
  - `freight-delivery-maha-chai` (Factory loading bay distribution in Maha Chai)
  - `motorcycle-delivery-pinklao` (Wheel chock & 4-point ratchet strapping in Pinklao)
  - `moving-house-nongkhaem-bang-khae` (House move in Nong Khaem - Bang Khae corridor)
  - `moving-townhouse-bang-bon` (Townhouse move in Bang Bon Ekachai)
- **Footer 404 Remediation**: Updated `src/components/Footer.tsx` to point to published canonical destinations.
- **Internal Link Matrix**: Generated `internal-link-matrix.csv` with verified crawler paths.

### Task E: Truthful `lastmod` and Build Validation
- **Refactored `parseReliableLastmod` in `src/app/sitemap.ts`**:
  - Strict calendar validation: detects and rejects impossible dates such as `2026-02-30`.
  - Rejection of future dates beyond current reference time.
  - Rejection of month-only strings ("มิถุนายน 2026") without synthetic day creation (returns `undefined`, omitting `lastmod`).
  - Correct transmission of substantive modification dates (`contentModifiedAt`) across all sitemap entries.
- **Regression Suite**: Created `tools/test-lastmod-regression.js` verifying all 10 criteria from prompt section 10.C with 100% pass rate.

---

## 4. URL Counts and Inventory Breakdown

| URL Classification | Count | Description |
| :--- | :---: | :--- |
| **Existing Keep** | 123 | Core pages, established routes, and verified blog articles. |
| **Enriched** | 30 | 24 service-detail pages + 6 location hubs enriched with localized operational data. |
| **Differentiated** | 2 | `/areas/bang-khae` (directory) & `/areas/bkk-thonburi/bang-khae` (transactional). |
| **Draft Gated** | 18 | 12 unverified district records + 6 draft local points (strictly excluded from sitemap). |
| **Total Sitemap Eligible** | **155** | Exact set match; 0 duplicates, 0 draft leaks, 100% valid canonical origins. |

---

## 5. Affected Files & Diffs

1. `src/components/Footer.tsx`: Fixed broken links pointing to non-existent URLs (`/areas/bangkok/bang-khae`, etc.).
2. `src/data/areaZonesData.ts`: Updated `ZoneHubItem` interface and differentiated `ZONE_HUBS["bang-khae"]`.
3. `src/components/service-area/ZoneHubView.tsx`: Added callout banner linking to the transactional Bang Khae service page.
4. `src/data/districtLandingPages.ts`: Differentiated `districtLandingPages["bang-khae"]` with prompt-specified Thai title, H1, restrictions, and directory link.
5. `src/components/service-area/DistrictPageView.tsx`: Replaced unverified price/arrival claims with truthful indicators; added directory link callout and contextual pricing/portfolio links.
6. `src/data/serviceAreaContent.ts`: New authoritative data file containing rich localized Thai content for all 24 service combinations and 8 location hubs.
7. `src/components/WorkEvidenceSummary.tsx`: New reusable component for rendering verified case studies.
8. `src/data/mediaEvidence.ts`: Added `dateOrMonth` and `contentModifiedAt` to `PortfolioCase` and records.
9. `src/app/(marketing)/service/[province]/[serviceId]/page.tsx`: Wired localized content, checklists, restrictions, transparent pricing factors, and evidence summary.
10. `src/app/(marketing)/service/[province]/page.tsx`: Wired localized hub focus, connecting areas, and evidence summary.
11. `src/app/(marketing)/service/phuket/moving/page.tsx`: Sanitized unverified free packing claim and updated highlight cards.
12. `src/app/(marketing)/service/phuket/motorcycle/page.tsx`: Sanitized unverified daily departure claim; added booking-based routing.
13. `src/app/(marketing)/service/phuket/freight/page.tsx`: Sanitized unverified full insurance claim; added safety standards notice.
14. `src/app/sitemap.ts`: Refactored `parseReliableLastmod` with strict calendar validation and wired `contentModifiedAt` across all sitemap entries.
15. `tools/test-lastmod-regression.js`: New test suite covering all 10 date regression criteria.

---

## 6. QA Benchmark Results

```text
> node tools/test-lastmod-regression.js
  ✓ Criterion 1: Substantive change page receives recorded modification date
  ✓ Criterion 2: Unchanged page keeps its original distinct date
  ✓ Criterion 3: Rebuild without content changes produces deterministic stable dates
  ✓ Criterion 4: Empty or undefined date input does not invent today's date
  ✓ Criterion 5: Impossible calendar date 2026-02-30 is rejected (not rolled over to March)
  ✓ Criterion 6: Future dates beyond current reference time are rejected
  ✓ Criterion 7: Missing date omits lastmod (returns undefined)
  ✓ Criterion 8: Distinct dates before and after Sept 21 preserve their distinct values
  ✓ Criterion 9: Month-only string ('มิถุนายน 2026') does not synthesize a day
  ✓ Criterion 10: Sitemap output format is strictly Date or undefined
Results: 10 passed, 0 failed.

> node tools/verify-sitemap-and-indexing.js
=== ALL REGRESSION CHECKS PASSED SUCCESSFULLY ===
  Total entries generated: 155 (0 duplicates, 0 draft leaks)
  Valid ISO dates: 28, Truthfully omitted: 127

> node tools/verify-seo-data.js
✅ ALL WMS SEO DATA CHECKS PASSED SUCCESSFULLY!

> npm run build
✓ Compiled successfully in 4.2s
✓ Finished TypeScript in 7.8s
✓ Generating static pages using 11 workers (176/176) in 7.3s
```

---

## 7. Deliverables Reference

The following deliverable files are generated in the repository root:
- [`seo-page-inventory.csv`](file:///c:/Users/PC/Desktop/Backowork/WMS%20TRANSPORT%20Update/seo-page-inventory.csv) — Canonical inventory with intents, declared canonicals, sitemap status, and actions.
- [`internal-link-matrix.csv`](file:///c:/Users/PC/Desktop/Backowork/WMS%20TRANSPORT%20Update/internal-link-matrix.csv) — Bidirectional link matrix with Thai anchors and placements.
- [`evidence-gaps.csv`](file:///c:/Users/PC/Desktop/Backowork/WMS%20TRANSPORT%20Update/evidence-gaps.csv) — Audit of verified claims, missing information, and owner action items.
- [`SEO-QA-RESULTS.md`](file:///c:/Users/PC/Desktop/Backowork/WMS%20TRANSPORT%20Update/SEO-QA-RESULTS.md) — Comprehensive test log, benchmark results, and post-deployment checklist.
- Visual artifacts (Screenshots):
  - Before: `before_areas_bang_khae_1793233761976.png`, `before_areas_bkk_thonburi_bang_khae_1793233769177.png`, `before_service_samutsakhon_freight_1793233777312.png`, `before_portfolio_moving_condo_bang_khae_1793233787431.png`
  - After: `areas_bang_khae_1793235020800.png`, `area_district_bang_khae_1793235029475.png`, `service_samutsakhon_freight_1793235041600.png`, `portfolio_moving_condo_bang_khae_1793235056515.png`

---

## 8. Ponytail Review Findings

- **Minimal Contiguous Diff**: Reused existing TypeScript interfaces, layouts, and page templates without creating duplicated data models or extra state managers.
- **Zero Bloat / No Unnecessary Dependencies**: Did not introduce any CMS, database, vector index, or heavy third-party packages.
- **Truthful Claims & Data Privacy**: Ensured no unverified review stars, fake ratings, or customer personal identifiable information (PII) leak into public assets, HTML, or JSON-LD.
- **Fail-Loud Safety**: Sitemap generation strictly enforces exact-set equality, preventing silent omissions or accidental leaks of draft pages.
