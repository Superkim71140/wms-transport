# WMS TRANSPORT — Google SEO Technical Code Handoff

**Authoritative Developer Documentation for Codex AI & Engineering Team**  
**Project:** WMS TRANSPORT (รถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์)  
**Snapshot Date:** 2026-10-10  
**Repository Branch:** `main`  
**Architecture:** Next.js App Router (v16.3.5) with Turbopack, React 19, Tailwind CSS v4

---

## 1. Project Overview & Operational Foundation

### 1.1 Business Identity & Authoritative NAP
* **Brand Name:** `WMS TRANSPORT`
* **Full Registered Branding:** `WMS TRANSPORT รถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์`
* **Authoritative Production URL:** `https://wms-transport.com`
* **Primary Telephone:** `061-240-2436`
* **International Telephone:** `+66-61-240-2436`
* **Direct Telephone Link:** `tel:0612402436`
* **Customer Service Email:** `1999.kittinanwimonset@gmail.com`
* **LINE Official Contact:** `https://line.me/ti/p/DtICkMaDet`
* **Facebook Profile:** `https://www.facebook.com/wmstransport`
* **Registered Base / Operational Hub:**
  * **Street Address:** `75 535 ซ.13`
  * **Subdistrict:** ตำบลบ้านเกาะ (`subDistrict: "บ้านเกาะ"`)
  * **District:** อำเภอเมืองสมุทรสาคร (`district: "เมืองสมุทรสาคร"`)
  * **Province:** จังหวัดสมุทรสาคร (`addressRegion: "สมุทรสาคร"`)
  * **Postal Code:** `74000`
  * **Country:** `TH`
  * **HQ Geographic Coordinates:** Latitude `13.6018827`, Longitude `100.2463594`
  * **Google Maps Link:** `https://maps.app.goo.gl/gw8LCFmdXuejr5N99`
* **Operating Hours:** Open 24 Hours every day (`เปิดบริการทุกวัน ตลอด 24 ชั่วโมง`)

### 1.2 Technology Stack & Core Versions
* **Next.js:** `16.3.5` (App Router, Turbopack enabled)
* **React:** `19.2.4`
* **React DOM:** `19.2.4`
* **TypeScript:** `^5`
* **Tailwind CSS:** `^4` (PostCSS `@tailwindcss/postcss`)
* **Analytics & Performance:** `@builder.io/partytown` `^0.10.3` (runs Google Tag Manager/GA4 in a web worker to preserve Core Web Vitals)
* **Iconography & UI:** `lucide-react` `^1.17.0`, `framer-motion` `^12.40.0`
* **Image Processing:** `sharp` `^0.35.4`

### 1.3 Developer Commands & Workflow
```bash
# Install exact pinned dependencies
npm install

# Run local development server (automatically copies Partytown library assets)
npm run dev

# Execute Turbopack production build (pre-renders 86 static pages)
npm run build

# Start local production preview server
npm run start

# Run strict SEO data integrity validator (44 canonical assertions, zero fake branch checks)
npm test
# or
npm run seo:verify

# Run ESLint quality check
npm run lint

# Run Sitewide Component & Promo Banner test (spawns temporary local server on port 3010)
node tools/test-promo-banner.js

# Run Sitewide Live Production Regression test (spawns temporary local server on port 3008)
node tools/test-sitewide-live.js

# Validate live XML sitemap against running server on port 3000
node scripts/validate-sitemap.mjs

# Optimize and convert raster images to WebP/AVIF
npm run optimize:images
```

---

## 2. SEO File Architecture & System Controls

| File Path | Functional Role & What It Controls |
| :--- | :--- |
| `src/lib/seo/site-config.ts` | **Single Source of Truth (SSOT).** Controls business NAP, base canonical URL, default OpenGraph images, phone numbers, social links, Google Search Console verification token, and primary keywords. |
| `src/lib/seo/metadata.ts` | **Metadata Engine.** Provides `buildPageMetadata`, `buildIntentMetadata`, `buildDistrictMetadata`, and `buildRoutePageMetadata`. Automatically enforces absolute HTTPS canonical URLs, prevents duplicate brand suffixes, and injects Googlebot directives (`max-image-preview: large`, `max-snippet: -1`). |
| `src/lib/seo/schema.ts` | **Structured Data Engine.** Builds valid Schema.org JSON-LD definitions: `Organization`, `MovingCompany`, `WebSite`, `Service`, `RouteService`, `FAQPage`, `BreadcrumbList`. Includes `escapeJsonLd` to neutralize XSS vulnerabilities in injected script tags. |
| `src/lib/seo/entityGraph.ts` | **Knowledge Graph & Stable URI `@id` Linking.** Enforces stable persistent `@id` nodes (`#organization`, `#moving-company`, `#website`, `#hub`, `#service`) across all page schemas to establish unambiguous entity identity in Google's Knowledge Graph. |
| `src/lib/seo/breadcrumbs.ts` | **Breadcrumb Route Hierarchy.** Generates standardized breadcrumb trails for visual breadcrumb navigation and Schema.org `BreadcrumbList` across all nested page categories. |
| `src/components/EntityGraphSchema.tsx` | **Sitewide Root Schema Injector.** Renders the root `Organization`, `MovingCompany`, and `WebSite` JSON-LD graph inside `src/app/layout.tsx`. |
| `src/components/Breadcrumbs.tsx` | **Visual & JSON-LD Breadcrumbs Component.** Renders accessible breadcrumb markup and injects dynamic `BreadcrumbList` schema. |
| `src/components/FAQ.tsx` | **FAQ UI & Schema Accordion.** Renders user-facing accordion and dynamically injects `FAQPage` JSON-LD schema matching visible text. |
| `src/components/GoogleAnalytics.tsx` | **GA4 Analytics & Conversion Listener.** Initializes Google Analytics via Partytown or script tag when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set. Tracks meaningful conversion events: `contact_phone_click`, `contact_line_click`, `quote_start`, and `quote_submit_success`. Safely no-ops when ID is omitted. |
| `src/app/robots.ts` | **Crawl Directives Engine.** Emits `/robots.txt`. Allows all search crawlers (`userAgent: *`), disallows internal `/dashboard/` and `/api/`, and declares canonical sitemap URL (`https://wms-transport.com/sitemap.xml`). |
| `src/app/sitemap.ts` | **Dynamic XML Sitemap Generator.** Emits `/sitemap.xml` containing exactly 70 verified public indexable URLs with truthful `lastModified` timestamps, `priority`, and `changeFrequency`. Excludes all draft or unverified routes. |
| `src/data/searchIntentMap.ts` | **Commercial & Informational Search Intent Dictionary.** Maps user query intent, primary/secondary keywords, SEO titles, meta descriptions, canonical paths, and required proof evidence for core pages. |
| `src/data/districtLandingPages.ts` | **Granular Local SEO District Registry.** Defines 17 district landing page models with proof scores, BMA Khwaeng coverage, travel corridors, local operational notes, and publication status (`published` vs `draft_evidence_required`). |
| `src/data/approvedRouteCorridors.ts` | **Interprovincial Corridors Allowlist.** Defines 10 verified route pairs (e.g. Bangkok ⇄ Phuket, Bangkok ⇄ Chiang Mai) preventing crawl-budget waste and duplicate doorway permutations. |
| `src/data/guidesData.ts` | **Moving Knowledge & Educational Guides.** Structured repository for technical customer guides (e.g. CBM truck capacity, high-rise moving without elevators, rainy season transport). |
| `src/data/mediaEvidence.ts` | **Photographic Work & Case Studies Evidence.** Authentic job photos, GPS records, vehicle registration proof, and portfolio cases. |
| `src/data/pricingPolicy.ts` | **Pricing Transparency Matrix.** Defines base fares, helper crew surcharges, and distance calculations to ensure truthful E-E-A-T pricing representations without deceptive claims. |
| `src/data/reviewEvidence.ts` | **Customer Reviews & Testimonial Evidence.** Genuine customer review quotes, service ratings, and locations. |
| `src/data/vehicleCapacity.ts` | **Vehicle Specifications.** Dimensions, volume (CBM), and loading capacities for enclosed pickup trucks. |
| `googlef4b84622b6d0dd15.html` & `public/googlef4b84622b6d0dd15.html` | **Google Site Verification Files.** HTML file verification tokens for Google Search Console. |
| `next.config.ts` | **Next.js Server & Asset Optimization.** Configures AVIF/WebP image formats, device/image sizes, image cache TTL (604,800s), response compression, and disables `poweredByHeader` for security. |

---

## 3. Comprehensive Route Inventory

The site generates **86 static pages** during `npm run build`, of which **70 canonical public URLs** are indexed and published in `sitemap.xml`. All routes use canonical base `https://wms-transport.com`.

### 3.1 Core Brand, Service & Transactional Routes

| Route URL | Page Purpose | Primary Target Keyword | Meta Title | Canonical Path | Indexability | Schema Types Implemented |
| :--- | :--- | :--- | :--- | :--- | :---: | :--- |
| `/` | Homepage / Primary Brand Portal | รถกระบะตู้ทึบรับจ้าง | รถกระบะตู้ทึบรับจ้าง ขนส่งมอเตอร์ไซค์ ย้ายบ้านคอนโดทั่วไทย \| WMS TRANSPORT | `/` | `index, follow` | `Organization`, `MovingCompany`, `WebSite`, `FAQPage` |
| `/portfolio` | Real Work Portfolio Hub | ผลงานรถรับจ้างย้ายบ้าน | ผลงานการขนย้ายและรูปภาพงานจริง \| WMS TRANSPORT | `/portfolio` | `index, follow` | `CollectionPage`, `BreadcrumbList`, `ImageGallery` |
| `/portfolio/moving-condo-bang-khae` | Case Study: Condo Moving Bang Khae | ย้ายคอนโด บางแค | เคสย้ายคอนโดมิเนียม บางแค \| WMS TRANSPORT | `/portfolio/moving-condo-bang-khae` | `index, follow` | `Article`, `ImageObject`, `BreadcrumbList` |
| `/portfolio/motorcycle-delivery-pinklao` | Case Study: Bigbike Transport Pinklao | ส่งมอเตอร์ไซค์ ปิ่นเกล้า | เคสจัดส่งบิ๊กไบค์ ปิ่นเกล้า \| WMS TRANSPORT | `/portfolio/motorcycle-delivery-pinklao` | `index, follow` | `Article`, `ImageObject`, `BreadcrumbList` |
| `/portfolio/freight-delivery-maha-chai` | Case Study: Factory Freight Maha Chai | ขนส่งสินค้า มหาชัย | เคสขนส่งสินค้าโรงงาน มหาชัย สมุทรสาคร \| WMS TRANSPORT | `/portfolio/freight-delivery-maha-chai` | `index, follow` | `Article`, `ImageObject`, `BreadcrumbList` |
| `/blog` | Blog & Logistics Insights Hub | ข้อมูลรถรับจ้าง | บทความและสาระน่ารู้เรื่องการขนส่ง ขนย้ายบ้าน \| WMS TRANSPORT | `/blog` | `index, follow` | `Blog`, `BreadcrumbList` |
| `/blog/how-to-pack-fridge` | Blog: Refrigerator Moving Guide | วิธีย้ายตู้เย็น | วิธีย้ายตู้เย็นที่ถูกต้อง ไม่ให้คอมเพรสเซอร์พัง \| WMS TRANSPORT | `/blog/how-to-pack-fridge` | `index, follow` | `Article`, `ImageObject`, `BreadcrumbList` |
| `/blog/prepare-motorcycle-transport` | Blog: Motorcycle Shipping Prep | เตรียมรถมอเตอร์ไซค์ส่งต่างจังหวัด | 5 ขั้นตอนเตรียมมอเตอร์ไซค์ก่อนส่งต่างจังหวัด \| WMS TRANSPORT | `/blog/prepare-motorcycle-transport` | `index, follow` | `Article`, `ImageObject`, `BreadcrumbList` |
| `/blog/moving-house-checklist` | Blog: Moving Checklist | เช็กลิสต์ย้ายบ้าน | เช็กลิสต์ย้ายบ้าน ย้ายหอพัก ฉบับสมบูรณ์ \| WMS TRANSPORT | `/blog/moving-house-checklist` | `index, follow` | `Article`, `ImageObject`, `BreadcrumbList` |
| `/blog/moving-cost-factors` | Blog: Cost Factors in Moving | ปัจจัยคิดราคารถรับจ้าง | ปัจจัยที่ทำให้ค่ารถรับจ้างถูกหรือแพง \| WMS TRANSPORT | `/blog/moving-cost-factors` | `index, follow` | `Article`, `ImageObject`, `BreadcrumbList` |
| `/blog/box-truck-vs-open-truck` | Blog: Box vs Open Truck Comparison | ข้อดีรถตู้ทึบรับจ้าง | ทำไมต้องเลือกรถกระบะตู้ทึบในการขนย้าย? \| WMS TRANSPORT | `/blog/box-truck-vs-open-truck` | `index, follow` | `Article`, `ImageObject`, `BreadcrumbList` |
| `/blog/condo-moving-regulations` | Blog: Condo Moving Rules & Timings | กฎการย้ายคอนโด นิติคอนโด | กฎระเบียบนิติคอนโดที่ต้องรู้ก่อนวันย้ายของ \| WMS TRANSPORT | `/blog/condo-moving-regulations` | `index, follow` | `Article`, `ImageObject`, `BreadcrumbList` |
| `/pricing` | Central Pricing Hub | ราคารถกระบะรับจ้าง | ราคารถรับจ้างตู้ทึบ ค่าขนส่งมอเตอร์ไซค์และย้ายบ้านคอนโด \| WMS TRANSPORT | `/pricing` | `index, follow` | `Service`, `BreadcrumbList`, `FAQPage` |
| `/pricing/moving` | Home/Condo Moving Pricing | ราคาจ้างย้ายบ้านคอนโด | ราคาย้ายบ้าน ย้ายคอนโด หอพัก และค่าจ้างคนช่วยยกของ \| WMS TRANSPORT | `/pricing/moving` | `index, follow` | `Service`, `BreadcrumbList`, `FAQPage` |
| `/pricing/motorcycle-transport` | Motorcycle Transport Pricing | ราคาขนส่งมอเตอร์ไซค์ | ราคาขนส่งมอเตอร์ไซค์ บิ๊กไบค์ ทั่วไทย มัดยึดปลอดภัย \| WMS TRANSPORT | `/pricing/motorcycle-transport` | `index, follow` | `Service`, `BreadcrumbList`, `FAQPage` |
| `/pricing/motorcycle-2026` | 2026 Motorcycle Rate Update | ค่าส่งมอเตอร์ไซค์ 2569 | อัตราค่าขนส่งมอเตอร์ไซค์ 2569 ทั่วไทย \| WMS TRANSPORT | `/pricing/motorcycle-2026` | `index, follow` | `Service`, `BreadcrumbList`, `FAQPage` |
| `/pricing/freight` | Factory & Freight Pricing | ราคาเหมารถส่งสินค้า | ราคาเหมารถกระบะขนส่งสินค้า โรงงาน และกระจายสินค้า \| WMS TRANSPORT | `/pricing/freight` | `index, follow` | `Service`, `BreadcrumbList`, `FAQPage` |
| `/compare/pickup-vs-box-truck` | Compare: Pickup vs Box Truck | รถกระบะตู้ทึบ vs คอก | รถกระบะตู้ทึบ VS รถกระบะคอกย้ายบ้าน เลือกแบบไหนปลอดภัยที่สุด \| WMS | `/compare/pickup-vs-box-truck` | `index, follow` | `Article`, `BreadcrumbList`, `FAQPage` |
| `/compare/moving-alone-vs-helpers` | Compare: Alone vs Crew | จ้างคนช่วยยกของ | ย้ายของเองหรือจ้างคนช่วยยกเพิ่ม คุ้มค่าต่างกันอย่างไร? \| WMS TRANSPORT | `/compare/moving-alone-vs-helpers` | `index, follow` | `Article`, `BreadcrumbList`, `FAQPage` |
| `/compare/one-vehicle-vs-multiple-trips`| Compare: 1 Trip vs Multi Trips | ขนของเที่ยวเดียว | จ้างรถขนของเที่ยวเดียวจบ หรือขนเองหลายรอบ แบบไหนประหยัดกว่า? \| WMS | `/compare/one-vehicle-vs-multiple-trips` | `index, follow` | `Article`, `BreadcrumbList`, `FAQPage` |
| `/guides/truck-capacity-cbm` | Guide: CBM Cargo Capacity | รถกระบะตู้ทึบจุได้กี่คิว | รถกระบะตู้ทึบใส่ของได้กี่คิว? เช็กขนาดรถและปริมาตรของก่อนย้ายบ้าน \| WMS | `/guides/truck-capacity-cbm` | `index, follow` | `Article`, `BreadcrumbList`, `FAQPage` |
| `/guides/condo-no-elevator` | Guide: Moving Without Elevator | ย้ายของไม่มีลิฟต์ | ขนของขึ้นบันไดไม่มีลิฟต์ คิดราคาอย่างไร? เตรียมตัวอย่างไร \| WMS | `/guides/condo-no-elevator` | `index, follow` | `Article`, `BreadcrumbList`, `FAQPage` |
| `/guides/moving-in-rain` | Guide: Moving During Rain | ขนของหน้าฝน | ขนย้ายบ้านหน้าฝนอย่างไรให้ของไม่เปียกและปลอดภัย 100% \| WMS | `/guides/moving-in-rain` | `index, follow` | `Article`, `BreadcrumbList`, `FAQPage` |
| `/guides/motorcycle-lashing-standards`| Guide: Motorcycle Lashing Prep | วิธีรัดมอเตอร์ไซค์ขึ้นกระบะ | มาตรฐานการยึดรัดมอเตอร์ไซค์และบิ๊กไบค์ในตู้ทึบ \| WMS TRANSPORT | `/guides/motorcycle-lashing-standards` | `index, follow` | `Article`, `BreadcrumbList`, `FAQPage` |
| `/guides/urgent-moving-booking` | Guide: Same-Day Moving Tips | จ้างรถรับจ้างด่วน | จองรถรับจ้างด่วนภายในวัน ต้องเตรียมข้อมูลอะไรบ้าง? \| WMS TRANSPORT | `/guides/urgent-moving-booking` | `index, follow` | `Article`, `BreadcrumbList`, `FAQPage` |

### 3.2 Regional & Provincial Hub Routes (`/service/[province]`)

All 8 provincial hubs implement `Service`, `BreadcrumbList`, `FAQPage`, and provincial logistics schema:
1. `/service/bangkok` — กรุงเทพมหานคร (Central Mega Hub)
2. `/service/bkk-thonburi` — กรุงเทพฯ ฝั่งธนบุรี (Flagship Dual-Zone Atlas Hub)
3. `/service/bkk-phra-nakhon` — กรุงเทพฯ ฝั่งพระนคร (Commercial Core Hub)
4. `/service/samutsakhon` — สมุทรสาคร (Primary Base & Industrial Corridor)
5. `/service/samut-songkhram` — สมุทรสงคราม (Agricultural & Residential Gateway)
6. `/service/chonburi` — ชลบุรี (Eastern Seaboard Logistics Corridor)
7. `/service/chiang-mai` — เชียงใหม่ (Northern Regional Hub)
8. `/service/phuket` — ภูเก็ต (Southern Tourism & Residential Hub)

### 3.3 Nested Provincial Service Subpages (`/service/[province]/[serviceId]`)
Each of the 8 provinces features 3 structured sub-service offerings (24 pages total):
* `/service/[province]/moving` — ย้ายบ้านและคอนโด (Home & Condo Moving)
* `/service/[province]/motorcycle` — ขนส่งมอเตอร์ไซค์ (Motorcycle & Bigbike Transport)
* `/service/[province]/freight` — ขนส่งสินค้าโรงงาน/เหมาเที่ยว (Commercial Cargo & Factory Freight)

*(Note: Static override directories exist for `/service/phuket/freight`, `/service/phuket/motorcycle`, `/service/phuket/moving`)*

### 3.4 Approved Interprovincial Route Corridors (`/route/[from]/[to]`)
Only the 10 approved corridors from `approvedRouteCorridors.ts` are indexed. Each features `RouteService`, `BreadcrumbList`, transit time calculations, and dynamic OpenGraph image generation (`/route/[from]/[to]/opengraph-image`):
1. `/route/bangkok/phuket` (กรุงเทพฯ ⇄ ภูเก็ต)
2. `/route/phuket/bangkok` (ภูเก็ต ⇄ กรุงเทพฯ)
3. `/route/bangkok/chiang-mai` (กรุงเทพฯ ⇄ เชียงใหม่)
4. `/route/chiang-mai/bangkok` (เชียงใหม่ ⇄ กรุงเทพฯ)
5. `/route/bangkok/samutsakhon` (กรุงเทพฯ ⇄ สมุทรสาคร)
6. `/route/samutsakhon/bangkok` (สมุทรสาคร ⇄ กรุงเทพฯ)
7. `/route/bangkok/chonburi` (กรุงเทพฯ ⇄ ชลบุรี)
8. `/route/chonburi/bangkok` (ชลบุรี ⇄ กรุงเทพฯ)
9. `/route/samutsakhon/samut-songkhram` (สมุทรสาคร ⇄ สมุทรสงคราม)
10. `/route/samut-songkhram/samutsakhon` (สมุทรสงคราม ⇄ สมุทรสาคร)

### 3.5 Granular District Landing Pages (`/areas/[province]/[district]`)
Strict quality gating is enforced via `isDistrictPageIndexable`: only records with `status: 'published'`, `proofScore >= 75`, and authentic project photographic evidence are prerendered and indexed.
* **Published & Indexed (3 Pages):**
  1. `/areas/bkk-thonburi/bang-khae` (บางแค, Proof Score: 85, Image: `WM10.webp`)
  2. `/areas/bkk-thonburi/pinklao` (ปิ่นเกล้า, Proof Score: 75, Image: `WM11.webp`)
  3. `/areas/samutsakhon/maha-chai` (มหาชัย, Proof Score: 78, Image: `WM8.webp`)
* **Strictly Gated & Non-Indexable Drafts (HTTP 404):**
  The remaining 14 Thonburi districts are held in `draft_evidence_required` (HTTP 404) to strictly comply with Google's helpful content guidelines against programmatic thin doorway generation.

### 3.6 Internal & Non-Indexable Pages
* `/areas` — Directory index hub (prerendered HTML)
* `/dashboard/seo-intelligence` — Internal SEO and keyword matrix dashboard (`robots: { index: false, follow: false }`, disallowed in `robots.ts`)
* `/_not-found` — Standard 404 error template (`robots: { index: false, follow: false }`)

---

## 4. Local SEO Coverage & Unfinished Work

### 4.1 Completed Local SEO Infrastructure
1. **Thonburi Operations Atlas (`ThonburiHubView.tsx`):**
   * Covers all 15 official districts of Thonburi divided into Northern (`กรุงธนเหนือ`) and Southern (`กรุงธนใต้`) zones.
   * Maps transit corridors: ถนนเพชรเกษม, ถนนบรมราชชนนี, ถนนพระราม 2, ถนนจรัญสนิทวงศ์, ถนนราชพฤกษ์, ถนนกัลปพฤกษ์, ทางพิเศษกาญจนาภิเษก.
   * Integrates clear client preparation checklists for condo elevator bookings and parking permits.
2. **Entity Consistency & Local Geocoordinates:**
   * Primary Schema anchor: `Samut Sakhon HQ` (Lat `13.6018827`, Lng `100.2463594`).
   * Explicit `areaServed` coverage declared across 10 core territories.
3. **Internal Linking Spiderweb (`InternalLinks.tsx`):**
   * Cross-links district pages to regional hubs, pricing pages, and customer guides without creating circular redirect chains.

### 4.2 Unfinished Local SEO Work (Action Plan for Codex)
1. **Collection of Verified Photographic Evidence for 14 Draft Districts:**
   * To graduate each district from `draft_evidence_required` to `published` in `src/data/districtLandingPages.ts`, the following real-world data points must be populated:
     * Minimum 1 authentic job photo taken in that district (placed in `public/images/`).
     * Real job reference ID and verifiable service context.
     * Proof score calculation reaching at least 75/100.
   * *Target districts:* หนองแขม (`nong-khaem`), ภาษีเจริญ (`phasi-charoen`), บางขุนเทียน (`bang-khun-thian`), บางบอน (`bang-bon`), ราษฎร์บูรณะ (`rat-burana`), ทุ่งครุ (`thung-khru`), ธนบุรี (`thon-buri`), คลองสาน (`khlong-san`), จอมทอง (`chom-thong`), บางกอกใหญ่ (`bangkok-yai`), บางกอกน้อย (`bangkok-noi`), บางพลัด (`bang-phlat`), ตลิ่งชัน (`taling-chan`), ทวีวัฒนา (`thawi-watthana`).
2. **Interprovincial Corridor Expansion:**
   * Currently, 10 out of 64 permutations are active. Adding routes like `bangkok ⇄ rayong`, `bangkok ⇄ nakhon-ratchasima`, or `chonburi ⇄ phuket` requires adding corridor records to `src/data/approvedRouteCorridors.ts` once verified pricing and vehicle availability are signed off by the owner.

---

## 5. Google Search Console & Google Business Profile Integration Status

### 5.1 Code-Level Configuration (Verified & Fully Working)
* **GSC HTML Verification File:** File `googlef4b84622b6d0dd15.html` is present in both root and `public/googlef4b84622b6d0dd15.html` containing `google-site-verification: googlef4b84622b6d0dd15.html`.
* **GSC Meta Tag Verification:** Hardcoded token `XBZroDGp_kA28tbvOnFUymh1DsDybkbicMoyPmsQ8JY` is injected into HTML `<head>` by `src/app/layout.tsx` via `siteConfig.verification.google`.
* **Robots.txt & Sitemap Linking:** `src/app/robots.ts` correctly exposes `https://wms-transport.com/sitemap.xml` with zero syntax errors.
* **Googlebot Directives:** Explicit meta directives (`index: true, follow: true, max-video-preview: -1, max-image-preview: "large", max-snippet: -1`) configured sitewide.

### 5.2 External Setup Status (Requires Owner / Webmaster Action)
* **GSC Property Verification:** Code configuration is complete, but the business owner must click "Verify" inside Google Search Console for `https://wms-transport.com` or domain-level DNS.
* **Google Business Profile (GBP) Claim & Sync:**
  * Google Maps URL `https://maps.app.goo.gl/gw8LCFmdXuejr5N99` is wired into Schema `hasMap`.
  * The business owner must ensure the physical name on GBP exactly matches `WMS TRANSPORT` and telephone matches `061-240-2436` to ensure NAP consistency (Name, Address, Phone) between Google Maps and the website.
* **GA4 Measurement ID Deployment:**
  * Component `src/components/GoogleAnalytics.tsx` is ready. The owner must supply the real GA4 Measurement ID (`G-XXXXXXXXXX`) via host environment variables (`NEXT_PUBLIC_GA_MEASUREMENT_ID`).

---

## 6. Prioritized Issues & Recommended Next Steps

### 🔴 Priority 1: High (Immediate Technical Cleanliness)
1. **Resolve ESLint Error in `src/components/Navbar.tsx` (Line 205):**
   * *Issue:* Synchronous `setState` in `useEffect` when route changes (`react-hooks/set-state-in-effect`).
   * *Remedy:* Derive modal state or reset via route transition handlers without triggering cascading renders in React 19.
2. **Update Live Test Assertion in `tools/test-sitewide-live.js` (Line 190):**
   * *Issue:* Test looks for legacy string `ความสูงภายในตู้ 2.1 เมตร` which was modernized in the promo banner upgrade.
   * *Remedy:* Update the string assertion in the test runner to match `CompactServiceSummary` specs.
3. **Configure Production Environment Variables:**
   * Set `NEXT_PUBLIC_SITE_URL=https://wms-transport.com` and `NEXT_PUBLIC_GA_MEASUREMENT_ID` in production hosting (e.g. Vercel / VPS).

### 🟡 Priority 2: Medium (On-Page SEO Optimization)
1. **Refine Title Tag Lengths (19 Pages):**
   * *Issue:* 19 titles exceed Google's desktop cut-off threshold of 65 characters (70–84 characters).
   * *Remedy:* Streamline secondary district keywords in `src/data/districtLandingPages.ts` and intent titles in `src/data/searchIntentMap.ts` so brand names and core keywords fit within 60 characters.
2. **Convert Remaining Raw `<img>` in `src/components/ServiceMap.tsx`:**
   * *Issue:* Line 112 uses standard HTML `<img>` causing ESLint warning `@next/next/no-img-element`.
   * *Remedy:* Replace with Next.js `<Image />` component with optimized dimensions and priority loading.

### 🟢 Priority 3: Low (Content Expansion & Evidence Growth)
1. **Gradual Expansion of 14 Gated Districts:**
   * Acquire genuine customer moving photos in each district and upgrade records in `src/data/districtLandingPages.ts` one by one.
2. **Review Evidence Population:**
   * Expand `src/data/reviewEvidence.ts` with authentic customer testimonials linked to specific route corridors.

---

## 7. Known Constraints & Business Details Requiring Owner Confirmation

| Item | Current Code State | Owner Confirmation Required |
| :--- | :--- | :--- |
| **Legal Entity Name** | Currently defaults to `WMS TRANSPORT` | Provide formal registered company / partnership name for `Organization.legalName`. |
| **Commercial Tax ID** | Not published on website | Provide registered 13-digit Tax ID to enhance B2B factory cargo trust. |
| **Physical Storefront vs Service Area** | Set to `75 535 ซ.13 ตำบลบ้านเกาะ อำเภอเมืองสมุทรสาคร` | Confirm whether customers visit this location physically (Storefront) or if operations are dispatch-only (Service Area Business). |
| **Schema `priceRange`** | Intentionally set to `undefined` in `site-config.ts` | Confirm typical transaction range (e.g. `฿1,000 - ฿25,000`) before re-enabling in Schema.org to prevent deceptive pricing flags. |
| **Insurance Coverage Policy** | Mentioned in footer badge as up to 100,000 THB | Provide policy conditions (deductible, covered damage types, carrier policy number) for customer contract disclosures. |
| **LINE Official Account (OA)** | Currently uses personal invite `https://line.me/ti/p/DtICkMaDet` | Register a verified LINE Official Account (e.g., `@wmstransport`) for professional corporate communication. |
