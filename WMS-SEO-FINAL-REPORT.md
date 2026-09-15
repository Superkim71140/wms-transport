# WMS TRANSPORT — Final SEO & Source-of-Truth Remediation Report

**Date:** September 16, 2026  
**Target Repository:** `WMS TRANSPORT`  
**Active Branch:** `seo/wms-safe-remediation`  
**Protected Reference:** `mj-expressModi` (100% Read-Only, untouched)  
**Deployment Status:** NOT DEPLOYED (Local remediation and build verification only)  

---

## 1. Executive Summary

A comprehensive source-of-truth remediation pass was executed on the `WMS TRANSPORT` codebase on branch `seo/wms-safe-remediation`. All discrepancies between previous claims and actual source code were systematically investigated and permanently eliminated.

Key achievements in this final pass:
1. **Source Discrepancies Purged:** Permanently deleted the synthetic social proof popup component (`SocialProofPopup.tsx`), stripped all fake booking tokens (`WMS-TX-*`, `WMS-MC-*`, `WMS-FR-*`), removed all unsubstantiated insurance figures (10k, 20k, 50k, 100k THB), eliminated GPS vehicle tracking claims, removed arbitrary payload capacities ("1.8 ตัน", "2 ตัน"), and purged absolute marketing guarantees ("100%").
2. **Province & Service Schema Fully Standardized:** Completely eliminated microdata attributes (`itemScope`, `itemType="https://schema.org/MovingCompany"`, `priceRange="$$"`, `PostalAddress`) from `service/[province]/page.tsx`. Replaced embedded `LocalBusiness` definitions in `service/[province]/[serviceId]/page.tsx` and `GalleryMasonry.tsx` with canonical entity `@id` references (`https://wms-transport.com/#moving-company`) and `areaServed: AdministrativeArea`.
3. **Runtime Route Corridor Allowlist Enforced:** Implemented `src/data/approvedRouteCorridors.ts` containing 10 approved corridors. Enforced across `sitemap.ts`, `generateStaticParams()`, `dynamicParams = false`, runtime 404 validation (`notFound()`), metadata, and OG images. Removed unused Haversine formula and `calculateBasePrice()`.
4. **Vulnerable Dependency Path Eliminated:** Removed `@vercel/og` package. Confirmed zero imports from `@vercel/og` in source code. Eliminated nested vulnerable `sharp@0.34.5`.
5. **GA4 Customer Interaction Tracking Wired:** Implemented client-side event delegation in `src/components/GoogleAnalytics.tsx` for phone clicks (`contact_phone_click`), LINE clicks (`contact_line_click`), quotation starts (`quote_start`), and form submissions (`quote_submit_success`). Verified safe no-op when measurement ID is not provided.
6. **SEO Validator Hardened:** Re-engineered `tools/verify-seo-data.js` with comprehensive AST/regex scanning for forbidden schemas, synthetic tokens, fake branches, and unsupported claims. Passed with 0 errors and 0 warnings.
7. **End-to-End Build & Live HTTP Verification:** Clean compilation across TypeScript, ESLint, partytown, Next.js build (85 static pages prerendered), and 107/107 automated live server HTTP/HTML assertions passed.

---

## 2. Report / Source Discrepancy Remediation

### 2.1 Synthetic Social Proof Purge
* **File Deleted:** `src/components/SocialProofPopup.tsx` was permanently removed from disk.
* **Imports & Layout:** Verified zero remaining imports or references across `src/app/layout.tsx` and other components.

### 2.2 Booking Tokens Purged
* **File Cleaned:** `src/data/reviewEvidence.ts`
* **Action:** Removed the `bookingToken` property definition from the `CustomerReview` interface and purged all synthetic identifiers (`WMS-TX-2026-0412`, `WMS-TX-2026-0501`, `WMS-MC-2026-0488`, `WMS-MC-2026-0515`, `WMS-FR-2026-0490`, `WMS-FR-2026-0520`). No synthetic or internal transaction IDs are exposed in client-visible code.

### 2.3 Insurance Claims Neutralized
* **Files Cleaned:**
  - `src/data/pricingPolicy.ts`: Removed references to 10,000 THB, 20,000 THB, and 50,000 THB coverage. Replaced with neutral phrasing: *"มีประกันภัยความคุ้มครองความเสียหายระหว่างการขนส่งตามเงื่อนไขที่ตกลง (สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่)"*.
  - `src/components/portfolio/DeliveryMap.tsx`: Removed "มีประกันสินค้า 100,000 บาท". Replaced with *"มีประกันสินค้าคุ้มครองความเสียหาย (สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่)"*.
  - `src/app/(marketing)/service/[province]/[serviceId]/page.tsx`: Removed 100,000 THB claim.
  - `src/app/(marketing)/service/phuket/freight/page.tsx`: Removed 100,000 THB claim.
  - `src/app/(marketing)/pricing/page.tsx` & `src/app/(marketing)/page.tsx`: Removed numerical insurance coverage limits.
  - `src/components/FAQ.tsx`: Replaced blanket insurance promises with policy inquiry guidance.

### 2.4 GPS Vehicle Tracking Claims Purged
* **Files Cleaned:**
  - `src/data/mediaEvidence.ts`: Removed *"ระบบ GPS ติดตามรถ Real-time ตลอด 24 ชม."*. Replaced with *"อัปเดตสถานะการเดินทางและการขนส่งกับพนักงานขับรถได้ตลอดเส้นทาง"*.
  - `src/app/(marketing)/areas/[province]/[district]/page.tsx`: Removed *"ติดตามรถผ่าน GPS"*. Replaced with *"ติดตามสถานะงานขนย้ายได้ตลอดการเดินทาง"*.

### 2.5 Payload Capacities & Absolute Guarantees Neutralized
* **Files Cleaned:**
  - `src/data/guidesData.ts`: Removed specific unverified weight limits ("1.8 ตัน", "2 ตัน"). Replaced with *"รองรับน้ำหนักบรรทุกตามมาตรฐานความปลอดภัยทางวิศวกรรมของตัวรถ"*.
  - Removed all absolute marketing claims ("100%", "ปลอดภัย 100%", "ตรงเวลา 100%") across `DeliveryMap.tsx`, `pricingPolicy.ts`, `mediaEvidence.ts`, and marketing pages.

---

## 3. Structured Data & Schema Architecture

### 3.1 Province Hubs (`service/[province]/page.tsx`)
* **Microdata Purged:** The JSX wrapper `<div>` previously contained `itemScope`, `itemType="https://schema.org/MovingCompany"`, and child `<meta itemProp="priceRange" content="$$" />`. These simulated provincial physical branches and provisional price tiers have been completely eradicated.
* **Canonical JSON-LD:** Structured as a `Service` schema:
  - Provider references canonical entity: `"@id": "https://wms-transport.com/#moving-company"`
  - Geographic jurisdiction represented cleanly: `"areaServed": { "@type": "AdministrativeArea", "name": province.name }`
  - No fake addresses, geo-coordinates, or physical branch representations.

### 3.2 Service Subpages (`service/[province]/[serviceId]/page.tsx`)
* **Nested LocalBusiness Purged:** Removed embedded `"@type": "LocalBusiness"` and provincial `PostalAddress` objects.
* **Canonical JSON-LD:**
  - `provider: { "@id": "https://wms-transport.com/#moving-company" }`
  - `areaServed: { "@type": "AdministrativeArea", "name": province.name }`
* **Gallery & Schema Elements:** Updated `src/components/GalleryMasonry.tsx` so image `creator` references canonical `@id: "https://wms-transport.com/#moving-company"`.

---

## 4. Route Corridor Runtime Allowlist

### 4.1 Single Source of Truth: `src/data/approvedRouteCorridors.ts`
The 10 approved corridors:
1. Bangkok ⇄ Phuket (`bangkok` ⇄ `phuket`)
2. Bangkok ⇄ Chiang Mai (`bangkok` ⇄ `chiang-mai`)
3. Bangkok ⇄ Samut Sakhon (`bangkok` ⇄ `samutsakhon`)
4. Bangkok ⇄ Chonburi (`bangkok` ⇄ `chonburi`)
5. Samut Sakhon ⇄ Samut Songkhram (`samutsakhon` ⇄ `samut-songkhram`)

*Status:* `approved_pending_owner_audit` (explicitly marked owner confirmation required).

### 4.2 Runtime Enforcement & 404 Integrity
* `dynamicParams = false` added to `src/app/route/[from]/[to]/page.tsx`.
* Runtime check: `if (!isApprovedRouteCorridor(from, to)) { notFound(); }`.
* Open Graph Image generator (`opengraph-image.tsx`): Calls `notFound()` for unapproved corridors.
* Sitemap (`sitemap.ts`): Strictly iterates `approvedRouteCorridors`.
* Internal Links (`InternalLinks.tsx`): Displays only approved corridors.
* Pricing Code Cleanup: Deleted unused Haversine distance calculator and `calculateBasePrice()` from `src/app/route/[from]/[to]/page.tsx`.

---

## 5. Dependency & Security Audit

### 5.1 Package Removal
* Command executed: `npm uninstall @vercel/og`
* Updated: `package.json` and `package-lock.json`.
* `ImageResponse` now correctly imported from standard `next/og`.

### 5.2 Dependency Tree Inspection
```bash
$ npm ls @vercel/og sharp next
next-temp@0.1.0
├── next@16.3.5
└── sharp@0.35.4
```
*(Vulnerable nested `sharp@0.34.5` introduced via `@vercel/og` is completely eliminated).*

### 5.3 Production Vulnerability Scan (`npm audit --omit=dev --json`)
```json
{
  "auditReportVersion": 2,
  "vulnerabilities": {
    "baseline-browser-mapping": {
      "name": "baseline-browser-mapping",
      "severity": "moderate",
      "isDirect": false,
      "via": ["browserslist"],
      "effects": [],
      "range": "<2.9.0"
    }
  },
  "metadata": {
    "vulnerabilities": {
      "info": 0,
      "low": 0,
      "moderate": 1,
      "high": 0,
      "critical": 0,
      "total": 1
    },
    "dependencies": {
      "prod": 43,
      "dev": 481,
      "optional": 16,
      "peer": 0,
      "peerOptional": 0,
      "total": 524
    }
  }
}
```
* **Findings:** 0 Critical, 0 High, 1 Moderate (`baseline-browser-mapping` CWE-705).
* Note: Per instructions, `npm audit fix` was not run. The Moderate advisory is recorded transparently.

---

## 6. GA4 Customer Interaction Tracking

* **Implementation:** Client-side event tracking centralized in `src/components/GoogleAnalytics.tsx`.
* **Interactions Tracked:**
  - Telephone link clicks (`href^="tel:"`): triggers `contact_phone_click` with target phone number.
  - LINE link clicks (`href*="line.me"`): triggers `contact_line_click` with destination URL.
  - Quote button clicks (`[data-action="quote-start"]` or links to quotation sections): triggers `quote_start`.
  - Quote form submission: triggers `quote_submit_success` only upon real form submit events.
* **Environment Safeguard:** If `NEXT_PUBLIC_GA_MEASUREMENT_ID` is absent or undefined, all handlers safe no-op without console errors or outbound network requests.
* **SEO Context:** Documented that GA4 is strictly measurement and attribution infrastructure, not a direct Google organic ranking factor.

---

## 7. SEO Validator Strengthening

* **File:** `tools/verify-seo-data.js`
* **Enforced AST/Regex Checks:**
  - ❌ Rejects `AggregateRating` on WMS entities
  - ❌ Rejects first-party Review schemas
  - ❌ Rejects synthetic social proof / live update strings
  - ❌ Rejects synthetic booking tokens (`WMS-TX-*`, `WMS-MC-*`, `WMS-FR-*`)
  - ❌ Rejects provincial `LocalBusiness` or `MovingCompany` microdata
  - ❌ Rejects `priceRange="$$"`
  - ❌ Rejects unsupported insurance figures (10k, 20k, 50k, 100k THB)
  - ❌ Rejects arbitrary payload capacities ("1.8 ตัน", "2 ตัน")
  - ❌ Rejects unverified route corridor combinations
  - ❌ Rejects MJ-TH Express mentions or business data
  - ❌ Rejects localhost or preview canonical URLs

*Validator Execution Output:*
```
> node tools/verify-seo-data.js
🔍 Running WMS TRANSPORT Strict SEO & Source-of-Truth Validator...
1️⃣ Checking siteConfig & brand independence...
2️⃣ Checking canonical URLs and host consistency...
3️⃣ Checking route corridors allowlist...
4️⃣ Checking route conflict resolution & 404 integrity...
5️⃣ Scanning src/ for schema abuse, fake branches, synthetic tokens & unsupported claims...
   ✅ All src/ files are 100% clean of schema abuse, fake branches, synthetic data, and unsupported claims.

==========================================
📊 WMS SEO DATA VALIDATION SUMMARY
==========================================
Verified Canonical URLs: 30
Errors Found:            0
Warnings Found:          0

✅ ALL WMS SEO DATA CHECKS PASSED SUCCESSFULLY!
```

---

## 8. Verification Results & Evidence

### 8.1 Required Toolchain Execution
| Check | Command | Exit Code | Result |
|---|---|:---:|---|
| Dependency Validation | `npm install` | 0 | Clean dependency tree |
| TypeScript Compiler | `npx tsc --noEmit` | 0 | 0 Type errors |
| Next.js Linter | `npm run lint` | 0 | 0 ESLint errors |
| SEO Validator | `npm run seo:verify` | 0 | 0 Errors, 0 Warnings |
| Unit / Data Tests | `npm test` | 0 | 0 Failures |
| Production Build | `npm run build` | 0 | 85 Static Pages prerendered |

### 8.2 Live HTTP & Rendered HTML Test Suite
Executed against local production server (`http://127.0.0.1:3005`):
```
==========================================
Total Checks Passed: 107
Total Checks Failed: 0
==========================================
```

* **Approved Route Corridors (10/10 return HTTP 200):**
  - `/route/bangkok/phuket` (200)
  - `/route/phuket/bangkok` (200)
  - `/route/bangkok/chiang-mai` (200)
  - `/route/chiang-mai/bangkok` (200)
  - `/route/bangkok/samutsakhon` (200)
  - `/route/samutsakhon/bangkok` (200)
  - `/route/bangkok/chonburi` (200)
  - `/route/chonburi/bangkok` (200)
  - `/route/samutsakhon/samut-songkhram` (200)
  - `/route/samut-songkhram/samutsakhon` (200)

* **Unapproved Route Pairs (All return HTTP 404):**
  - `/route/phuket/chonburi` (404)
  - `/route/bangkok/rayong` (404)
  - `/route/chiang-mai/phuket` (404)
  - `/route/bangkok/bangkok` (404, same-origin)

* **Invalid Dynamic Routes (All return HTTP 404):**
  - `/service/invalid-prov` (404)
  - `/service/bangkok/invalid-service` (404)
  - `/areas/bangkok/invalid-dist` (404)
  - `/guides/invalid-guide` (404)
  - `/portfolio/invalid-slug` (404)
  - `/blog/invalid-slug` (404)

* **Sitemap URLs Integrity (70/70 return HTTP 200 & Self-Canonical):**
  - Every URL in `/sitemap.xml` returns HTTP 200.
  - Zero `noindex` tags present on sitemap URLs.
  - Every sitemap URL renders a self-referencing canonical tag.

* **Rendered HTML Schema & Claims Audit:**
  - Zero `AggregateRating` instances found in rendered HTML.
  - Zero `Review` instances found in rendered HTML.
  - Zero `itemType="https://schema.org/MovingCompany"` or `LocalBusiness` instances in provincial pages.
  - Zero `priceRange="$$"` instances.
  - Zero synthetic booking tokens (`WMS-TX-*`, etc.) in rendered HTML.
  - Zero unsupported insurance numbers (10k, 20k, 50k, 100k THB).
  - Zero GPS vehicle tracking claims.
  - Zero MJ-TH Express brand names or phone numbers.

---

## 9. Categorized Item Manifest

### 9.1 Removed from Rendered Production
* Synthetic social proof popup.
* Province-level `MovingCompany` microdata and `priceRange="$$"` attributes.
* Nested `LocalBusiness` schemas on service detail subpages.
* First-party Review / AggregateRating JSON-LD on WMS business entity.
* Unapproved route combinations (now return HTTP 404).

### 9.2 Removed from Source Code
* `src/components/SocialProofPopup.tsx` (deleted).
* `bookingToken` field and synthetic token values in `src/data/reviewEvidence.ts`.
* Haversine formula and `calculateBasePrice()` in `src/app/route/[from]/[to]/page.tsx`.
* Package `@vercel/og` and nested `sharp@0.34.5` in `package.json` / `package-lock.json`.
* Numerical insurance limits (10,000, 20,000, 50,000, 100,000 THB) across all components and data files.
* GPS vehicle tracking claims in `mediaEvidence.ts` and `areas/[province]/[district]/page.tsx`.
* "1.8 ตัน" and "2 ตัน" vehicle payload claims in `guidesData.ts`.
* "100%" absolute guarantee marketing claims across all files.

### 9.3 Retained but Unused
* Outdated report artifacts in local scratch directories (excluded from final ZIP).

### 9.4 Owner Confirmation Required
* **Approved Route Corridors:** Currently 10 corridors in `src/data/approvedRouteCorridors.ts`. Expansion to further corridors requires operational dispatch confirmation.
* **Insurance Coverage Policy:** Current copy directs users to confirm terms with staff. If an official commercial cargo insurance underwriter policy exists, coverage caps may be documented with policy evidence.
* **Base Pricing Tiers:** Starting price points (e.g. 1,500 THB / 2,500 THB) should be periodically reviewed against operational fuel and labor costs.
* **Vehicle Fleet Specifications:** Exact curb weight and legal gross vehicle weight limits (GVW) can be published once vehicle registration books are verified.

### 9.5 Search Console Decision Required
* `/pricing/motorcycle-2026`: Retained in this pass with clean canonical and metadata. Final decision (keep, redirect 301 to `/pricing/motorcycle-transport`, or canonicalize) pending GSC organic impression and click data.

---

## 10. Reference Repository Isolation Verification

### Status of `mj-expressModi`
Command executed before and after remediation:
```bash
$ git status --short
?? docs/integrations-inventory.md
?? docs/keyword-page-map.md
?? docs/seo-action-plan.md
?? docs/seo-full-audit.md
?? docs/seo-transfer-plan.md
```
* **Result:** 100% untouched. Exactly 5 pre-existing untracked documentation files remain. Zero file modifications, zero commits, zero build executions, zero package installs.

---

## 11. Final Deliverable Summary

* **Archive Name:** `WMS-TRANSPORT-SEO-FINAL-REVIEW.zip`
* **Report Included:** `WMS-SEO-FINAL-REPORT.md` (Only this single master report)
* **Excluded Items:** `.git`, `.next`, `node_modules`, `.env*`, scratch scripts, previous ZIPs, and outdated reports.
