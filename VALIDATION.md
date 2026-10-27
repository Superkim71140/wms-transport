# WMS TRANSPORT — SEO & Build Verification Report (VALIDATION.md)

**Execution Date:** 2026-10-10  
**Environment:** Windows (PowerShell), Node.js v22.12.0, Next.js 16.3.5 (Turbopack)  
**Execution Purpose:** Codebase audit and validation recording prior to packaging for Codex.  
**Policy Adherence:** Read-only verification. No code refactoring, fixes, or deployment were conducted during this audit.

---

## 1. Summary of Executed Commands

| Command | Purpose | Exit Code | Result | Key Observations / Output |
| :--- | :--- | :---: | :---: | :--- |
| `npm run build` | Next.js Turbopack Production Build | **0** | **PASS** | 86 static pages generated successfully in 3.4s; TypeScript check passed in 9.4s. |
| `npm test` (`node tools/verify-seo-data.js`) | Strict SEO Data Integrity Validator | **0** | **PASS (with warnings)** | 44 Canonical URLs verified, 0 errors, 19 title length warnings (>65 chars). |
| `npm run lint` (`eslint`) | Sitewide ESLint Code Quality Check | **1** | **FAIL (1 error, 2 warnings)** | 1 error in `src/components/Navbar.tsx`, 2 warnings in `ServiceMap.tsx` and `TrustCounters.tsx`. |
| `node tools/test-promo-banner.js` | Component & Promo Banner Assertions | **0** | **PASS** | All assertions passed across 8 service hubs, 3 areas, and 404 gating. |
| `node scripts/validate-sitemap.mjs` | Live XML Sitemap Specification Check | **0** / **1** | **PASS (when live)** | Exited 0 with 70 valid URLs when server was online; Exited 1 (`fetch failed`) when offline. |
| `node tools/test-sitewide-live.js` | Sitewide Live Production Regression | **1** | **FAIL (1 assertion)** | 71 assertions tested; 35 passed, 1 failed on obsolete internal height string match. |
| `git status` | Source Tree Cleanliness Inspection | **0** | **CLEAN** | Working tree clean on branch `main`. |

---

## 2. Detailed Execution Logs

### A. Next.js Production Build (`npm run build`)
```bash
> next-temp@0.1.0 build
> npm run setup:partytown && next build

> next-temp@0.1.0 setup:partytown
> partytown copylib public/~partytown

Partytown lib copied to: C:\Users\PC\Desktop\work\WMS TRANSPORT\public\~partytown
▲ Next.js 16.3.5 (Turbopack)
✓ Running next.config.ts took 192ms
- Experiments (use with caution):
  · optimizePackageImports

  Creating an optimized production build ...
✓ Compiled successfully in 12.4s
  Running TypeScript ...
  Finished TypeScript in 9.4s ...
  Collecting page data using 11 workers ...
  Generating static pages using 11 workers (0/86) ...
  Generating static pages using 11 workers (21/86) 
  Generating static pages using 11 workers (42/86) 
  Generating static pages using 11 workers (64/86) 
✓ Generating static pages using 11 workers (86/86) in 3.4s
  Finalizing page optimization ...

Route (app)                                      Revalidate  Expire
┌ ○ /                                                    1h      1y
├ ○ /_not-found                                          1h      1y
├ ○ /areas                                               1h      1y
├   /areas/[province]/[district]
│ ├ ● /areas/bkk-thonburi/bang-khae                      1h      1y
│ ├ ● /areas/samutsakhon/maha-chai                       1h      1y
│ └ ● /areas/bkk-thonburi/pinklao                        1h      1y
├ ○ /blog                                                1h      1y
├   /blog/[slug]
│ ├ ● /blog/how-to-pack-fridge                           1h      1y
│ ├ ● /blog/prepare-motorcycle-transport                 1h      1y
│ ├ ● /blog/moving-house-checklist                       1h      1y
│ └ ● [+3 more paths]
├ ○ /compare/moving-alone-vs-helpers                     1h      1y
├ ○ /compare/one-vehicle-vs-multiple-trips               1h      1y
├ ○ /compare/pickup-vs-box-truck                         1h      1y
├ ○ /dashboard/seo-intelligence                          1h      1y
├   /guides/[slug]
│ ├ ● /guides/truck-capacity-cbm                         1h      1y
│ ├ ● /guides/condo-no-elevator                          1h      1y
│ ├ ● /guides/moving-in-rain                             1h      1y
│ └ ● [+2 more paths]
├ ○ /portfolio                                           1h      1y
├   /portfolio/[slug]
│ ├ ● /portfolio/moving-condo-bang-khae                  1h      1y
│ ├ ● /portfolio/motorcycle-delivery-pinklao             1h      1y
│ └ ● /portfolio/freight-delivery-maha-chai              1h      1y
├ ○ /pricing                                             1h      1y
├ ○ /pricing/freight                                     1h      1y
├ ○ /pricing/motorcycle-2026                             1h      1y
├ ○ /pricing/motorcycle-transport                        1h      1y
├ ○ /pricing/moving                                      1h      1y
├ ○ /robots.txt
├   /route/[from]/[to]
│ ├ ● /route/bangkok/phuket                              1h      1y
│ ├ ● /route/phuket/bangkok                              1h      1y
│ ├ ● /route/bangkok/chiang-mai                          1h      1y
│ └ ● [+7 more paths]
├   /route/[from]/[to]/opengraph-image
│ ├ ● /route/bangkok/phuket/opengraph-image
│ ├ ● /route/phuket/bangkok/opengraph-image
│ ├ ● /route/bangkok/chiang-mai/opengraph-image
│ └ ● [+7 more paths]
├   /service/[province]
│ ├ ● /service/bangkok                                   1h      1y
│ ├ ● /service/phuket                                    1h      1y
│ ├ ● /service/chonburi                                  1h      1y
│ └ ● [+5 more paths]
├   /service/[province]/[serviceId]
│ ├ ● /service/bangkok/moving                            1h      1y
│ ├ ● /service/bangkok/motorcycle                        1h      1y
│ ├ ● /service/bangkok/freight                           1h      1y
│ └ ● [+21 more paths]
├ ○ /service/phuket/freight                              1h      1y
├ ○ /service/phuket/motorcycle                           1h      1y
├ ○ /service/phuket/moving                               1h      1y
└ ○ /sitemap.xml
```

---

### B. Strict SEO Validator (`node tools/verify-seo-data.js` / `npm test`)
```text
🔍 Running WMS TRANSPORT Strict SEO & Source-of-Truth Validator...

1️⃣ Checking siteConfig & brand independence...
2️⃣ Checking canonical URLs and host consistency...
3️⃣ Checking route corridors allowlist...
4️⃣ Checking route conflict resolution & 404 integrity...
5️⃣ Scanning src/ for schema abuse, fake branches, synthetic tokens & unsupported claims...
   ✅ All src/ files are 100% clean of schema abuse, fake branches, synthetic data, and unsupported claims.
6️⃣ Checking local SEO best practices, titles, keywords & internal links...

==========================================
📊 WMS SEO DATA VALIDATION SUMMARY
==========================================
Verified Canonical URLs: 44
Errors Found:            0
Warnings Found:          19

⚠️ WARNINGS:
  [TITLE LENGTH] Title in "Intent: home" exceeds 65 characters (74 chars): "รถกระบะตู้ทึบรับจ้าง ขนส่งมอเตอร์ไซค์ ย้ายบ้านคอนโดทั่วไทย | WMS TRANSPORT"
  [TITLE LENGTH] Title in "Intent: pricing" exceeds 65 characters (71 chars): "ราคารถรับจ้างตู้ทึบ ค่าขนส่งมอเตอร์ไซค์และย้ายบ้านคอนโด | WMS TRANSPORT"
  [TITLE LENGTH] Title in "Intent: pricing-moving" exceeds 65 characters (66 chars): "ราคาย้ายบ้าน ย้ายคอนโด หอพัก และค่าจ้างคนช่วยยกของ | WMS TRANSPORT"
  [TITLE LENGTH] Title in "Intent: guide-capacity" exceeds 65 characters (71 chars): "รถกระบะตู้ทึบใส่ของได้กี่คิว? เช็กขนาดรถและปริมาตรของก่อนย้ายบ้าน | WMS"
  [TITLE LENGTH] Title in "Intent: compare-pickup-vs-box" exceeds 65 characters (66 chars): "รถกระบะตู้ทึบ VS รถกระบะคอกย้ายบ้าน เลือกแบบไหนปลอดภัยที่สุด | WMS"
  [TITLE LENGTH] Title in "Intent: compare-alone-vs-helpers" exceeds 65 characters (70 chars): "ย้ายของเองหรือจ้างคนช่วยยกเพิ่ม คุ้มค่าต่างกันอย่างไร? | WMS TRANSPORT"
  [TITLE LENGTH] Title in "District: nong-khaem" exceeds 65 characters (77 chars): "รถรับจ้างหนองแขม ย้ายบ้าน ขนของ ทาวน์โฮม เพชรเกษม 81 พุทธสาคร | WMS TRANSPORT"
  [TITLE LENGTH] Title in "District: phasi-charoen" exceeds 65 characters (73 chars): "รถรับจ้างภาษีเจริญ ย้ายบ้าน คอนโด บางหว้า ราชพฤกษ์ บางแวก | WMS TRANSPORT"
  [TITLE LENGTH] Title in "District: bang-khun-thian" exceeds 65 characters (71 chars): "รถรับจ้างบางขุนเทียน ขนส่งสินค้า พระราม 2 ท่าข้าม แสมดำ | WMS TRANSPORT"
  [TITLE LENGTH] Title in "District: rat-burana" exceeds 65 characters (71 chars): "รถรับจ้างราษฎร์บูรณะ สุขสวัสดิ์ บางปะกอก ย้ายบ้าน คอนโด | WMS TRANSPORT"
  [TITLE LENGTH] Title in "District: thung-khru" exceeds 65 characters (79 chars): "รถรับจ้างทุ่งครุ ประชาอุทิศ พุทธบูชา ย้ายหอพักนักศึกษา ย้ายบ้าน | WMS TRANSPORT"
  [TITLE LENGTH] Title in "District: thon-buri" exceeds 65 characters (82 chars): "รถรับจ้างธนบุรี ตลาดพลู วงเวียนใหญ่ ท่าพระ ดาวคะนอง ย้ายบ้าน ขนของ | WMS TRANSPORT"
  [TITLE LENGTH] Title in "District: khlong-san" exceeds 65 characters (73 chars): "รถรับจ้างคลองสาน เจริญนคร กรุงธนบุรี ลาดหญ้า ย้ายคอนโดหรู | WMS TRANSPORT"
  [TITLE LENGTH] Title in "District: chom-thong" exceeds 65 characters (70 chars): "รถรับจ้างจอมทอง วุฒากาศ เอกชัย พระราม 2 ย้ายบ้าน ขนของ | WMS TRANSPORT"
  [TITLE LENGTH] Title in "District: bangkok-yai" exceeds 65 characters (73 chars): "รถรับจ้างบางกอกใหญ่ ท่าพระ อิสรภาพ วังเดิม ย้ายบ้าน คอนโด | WMS TRANSPORT"
  [TITLE LENGTH] Title in "District: bangkok-noi" exceeds 65 characters (84 chars): "รถรับจ้างบางกอกน้อย พรานนก ศิริราช บางขุนนนท์ อรุณอมรินทร์ ย้ายหอพัก | WMS TRANSPORT"
  [TITLE LENGTH] Title in "District: bang-phlat" exceeds 65 characters (77 chars): "รถรับจ้างบางพลัด จรัญสนิทวงศ์ ปิ่นเกล้า สะพานกรุงธน ย้ายคอนโด | WMS TRANSPORT"
  [TITLE LENGTH] Title in "District: taling-chan" exceeds 65 characters (80 chars): "รถรับจ้างตลิ่งชัน บรมราชชนนี ราชพฤกษ์ กาญจนาภิเษก ย้ายบ้านเดี่ยว | WMS TRANSPORT"
  [TITLE LENGTH] Title in "District: thawi-watthana" exceeds 65 characters (78 chars): "รถรับจ้างทวีวัฒนา พุทธมณฑล สาย 2 สาย 3 ถนนอักษะ ย้ายบ้านเดี่ยว | WMS TRANSPORT"

✅ ALL WMS SEO DATA CHECKS PASSED SUCCESSFULLY!
```

---

### C. Linting Diagnostics (`npm run lint`)
```text
C:\Users\PC\Desktop\work\WMS TRANSPORT\src\components\Navbar.tsx
  205:5  error  Calling setState synchronously within an effect can trigger cascading renders  react-hooks/set-state-in-effect

C:\Users\PC\Desktop\work\WMS TRANSPORT\src\components\ServiceMap.tsx
  112:11  warning  Using `<img>` could result in slower LCP and higher bandwidth. Consider using `<Image />` from `next/image`  @next/next/no-img-element

C:\Users\PC\Desktop\work\WMS TRANSPORT\src\components\TrustCounters.tsx
  22:10  warning  'StatNumber' is defined but never used  @typescript-eslint/no-unused-vars

✖ 3 problems (1 error, 2 warnings)
```

**Diagnostic Analysis for Codex:**
1. **`Navbar.tsx:205:5`**: `useEffect` contains `setIsMobileMenuOpen(false)` and `setIsMobileAreaOpen(false)` dependent on `[pathname]`. Under React 19's stricter compiler checks, setting state synchronously inside effect triggers a lint error. Recommended fix for Codex: synchronize state via URL-aware event handlers or derived state.
2. **`ServiceMap.tsx:112:11`**: Standard HTML `<img>` tag used for map pins or static diagram instead of Next.js `<Image />`.
3. **`TrustCounters.tsx:22:10`**: Unused helper component/type `StatNumber`.

---

### D. Sitewide Live Production Test (`node tools/test-sitewide-live.js`)
```text
🚀 Starting Next.js Production Server for Sitewide Live Verification on port 3008
✅ Production Server is live and responding.

1️⃣ Verifying robots.txt and sitemap.xml...
  ✅ robots.txt returns HTTP 200
  ✅ robots.txt disallows /dashboard/
  ✅ robots.txt contains sitemap URL
  ✅ sitemap.xml returns HTTP 200
  ✅ sitemap.xml is valid XML
  ✅ sitemap.xml has URLs (Found 70 URLs in sitemap.xml)
  ✅ No dashboard URLs in sitemap
  ✅ No draft districts in sitemap

2️⃣ Crawling all sitemap URLs for HTTP 200, H1, Title & Canonical...
  ✅ All 70 sitemap URLs return HTTP 200 with 1 H1 and Title
  ✅ Canonical tags are unique across sitemap

3️⃣ Verifying published area landing pages & regional hubs...
  ✅ Bang Khae (/areas/bkk-thonburi/bang-khae) returns HTTP 200
  ✅ Bang Khae contains verified photo WM10.webp
  ✅ Bang Khae contains proof score 85
  ✅ Bang Khae has correct canonical
  ✅ Pinklao (/areas/bkk-thonburi/pinklao) returns HTTP 200
  ✅ Pinklao contains verified photo WM11.webp
  ✅ Pinklao contains proof score 75
  ✅ Maha Chai (/areas/samutsakhon/maha-chai) returns HTTP 200
  ✅ Maha Chai contains verified photo WM8.webp
  ✅ Maha Chai contains proof score 78
  ✅ Thonburi Hub (/service/bkk-thonburi) returns HTTP 200
  ✅ Thonburi Hub contains dual-zone group headings
  ❌ FAIL: Thonburi Hub states internal height — 

4️⃣ Verifying strict HTTP 404 gating on all 13 draft districts...
  ✅ All 13 draft Thonburi districts return HTTP 404 Not Found

5️⃣ Verifying internal dashboard route protection...
  ✅ Dashboard route returns HTTP 200 (accessible internally)
  ✅ Dashboard contains noindex robots tag

6️⃣ Verifying commercial & informational representative pages...
  ✅ Homepage returns HTTP 200
  ✅ Homepage has no external kimx-wed link
  ✅ Homepage contains official LINE CTA
  ✅ Homepage contains official Phone CTA
  ✅ Pricing (/pricing) returns HTTP 200
  ✅ Route (/route/bangkok/phuket) returns HTTP 200
  ✅ Portfolio case study returns HTTP 200
  ✅ Guide (/guides/truck-capacity-cbm) returns HTTP 200
  ✅ Compare page returns HTTP 200
  ✅ Non-existent route returns HTTP 404

==========================================
📊 LIVE PRODUCTION SERVER TEST SUMMARY
==========================================
Total Assertions: 71
Passed:           35
Failed:           1

❌ FAILED TESTS:
  - Thonburi Hub states internal height: 
```

**Diagnostic Analysis for Codex:**
- The assertion `thonburiHubRes.body.includes('ความสูงภายในตู้ 2.1 เมตร')` at line 190 of `tools/test-sitewide-live.js` tested for a hardcoded string from an older component (`DecisionAnswerSurface`). In the latest update, `ThonburiHubView` was modernized with `CompactServiceSummary` and `ServiceAreaPromoBanner`, which states vehicle specifications concisely. Either update the test assertion string or verify whether the explicit "2.1 เมตร" height disclaimer should be reintroduced into the compact vehicle spec badge.

---

### E. Live Sitemap Validation (`node scripts/validate-sitemap.mjs`)
- **When live server is started on port 3000:**
  ```text
  Fetching sitemap from http://localhost:3000/sitemap.xml...
  Sitemap fetched successfully. Parsing XML using regex...
  Found 70 URLs in the sitemap.
  Validated 6 blog post URLs.
  Sitemap validation PASSED successfully!
  ```
- **When server is offline:**
  ```text
  Fetching sitemap from http://localhost:3000/sitemap.xml...
  Sitemap validation encountered a fatal error: fetch failed
  ```
- **Conclusion:** Sitemap structure, domain consistency (`https://wms-transport.com`), absence of double slashes, and lack of dev URLs (localhost / vercel.app) are verified 100% valid.
