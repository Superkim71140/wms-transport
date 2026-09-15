# WMS TRANSPORT — Thonburi SEO Area Architecture Report

**Date:** September 16, 2026  
**Target Repository:** `WMS TRANSPORT`  
**Active Branch:** `seo/wms-thonburi-area-pages`  
**Protected Reference:** `mj-expressModi` (100% Read-Only, untouched)  
**Deployment Status:** NOT DEPLOYED (Local build and production verification only)  

---

## 1. Executive Summary

A comprehensive, evidence-based SEO area architecture has been established for Bangkok's Thonburi region in WMS TRANSPORT. The system establishes `/service/bkk-thonburi` as the central regional hub and introduces structured, non-thin district pages under `/areas/bkk-thonburi/[district]`.

To protect the website from Google's Scaled Content Abuse policy, doorway page penalties, and E-E-A-T quality degradation, a strict **Evidence-Based Quality Gate** was implemented:
- **Pilot Group (Published & Indexable):** 3 districts with confirmed local operational proof, real WMS job records, verified images, and proof scores >= 80:
  1. **บางแค** (`bang-khae`) — Proof Score: 85
  2. **หนองแขม** (`nong-khaem`) — Proof Score: 82
  3. **ภาษีเจริญ** (`phasi-charoen`) — Proof Score: 80
- **Draft Status (Evidence Required):** The remaining 12 official districts have been audited with verified Bangkok Metropolitan Administration (BMA) administrative data, subdistricts, and road corridors. They are maintained in the structured data records as `status: 'draft_evidence_required'` (`isIndexable: false`) and return true HTTP 404 at runtime until real job records are provided by the business owner.

---

## 2. Official BMA Thonburi District Structure & Evidence Matrix

Administrative boundaries and subdistrict classifications verified against official Bangkok Metropolitan Administration records:
* Official BMA Portal: [http://www.bangkok.go.th](http://www.bangkok.go.th)
* BMA Strategy and Evaluation Department (สถิติกรุงเทพมหานคร): [http://pipda.bangkok.go.th](http://pipda.bangkok.go.th)

### 2.1 Northern Thonburi (กลุ่มเขตกรุงธนเหนือ — 8 เขต)
| # | เขต (District) | Slug | แขวงทางการ (Khwaeng) | เส้นทางคมนาคมหลัก | ความพร้อมในการบริการ WMS | คะแนนหลักฐาน | สถานะ Indexation |
|---|---|---|---|---|---|:---:|:---:|
| 1 | ธนบุรี | `thon-buri` | วัดกัลยาณ์, หิรัญรูจี, บางยี่เรือ, บุคคโล, ตลาดพลู, ดาวคะนอง, สำเหร่ | ถ.ประชาธิปก, ถ.สมเด็จพระเจ้าตากสิน, ถ.รัชดาภิเษก, ถ.เทอดไท, สะพานพุทธ, สะพานพระปกเกล้า | ชุมชนเมืองเก่า, ตรอกซอยแคบ, ตลาดพลู, อาคารพาณิชย์ | 68 | **DRAFT / EVIDENCE REQUIRED** |
| 2 | คลองสาน | `khlong-san` | สมเด็จเจ้าพระยา, คลองสาน, บางลำภูล่าง | ถ.เจริญนคร, ถ.ลาดหญ้า, ถ.กรุงธนบุรี, ถ.สมเด็จเจ้าพระยา, สะพานตากสิน | คอนโด High-rise ริมแม่น้ำ, ทางเข้าอาคารจำกัดความสูง 2.1 ม. | 70 | **DRAFT / EVIDENCE REQUIRED** |
| 3 | จอมทอง | `chom-thong` | บางขุนเทียน, บางค้อ, บางมด, จอมทอง | ถ.พระราม 2, ถ.เอกชัย, ถ.จอมทอง, ถ.วุฒากาศ | ทาวน์โฮม, ชุมชนดั้งเดิม, จุดเชื่อมต่อพระราม 2 | 65 | **DRAFT / EVIDENCE REQUIRED** |
| 4 | บางกอกใหญ่ | `bangkok-yai` | วัดอรุณ, วัดท่าพระ | ถ.เพชรเกษม, ถ.จรัญสนิทวงศ์, ถ.วังเดิม, ถ.อิสรภาพ | แยกท่าพระ, ชุมชนประวัติศาสตร์, ซอยวัดอรุณ | 68 | **DRAFT / EVIDENCE REQUIRED** |
| 5 | บางกอกน้อย | `bangkok-noi` | ศิริราช, บ้านช่างหล่อ, บางขุนนนท์, บางขุนศรี, อรุณอมรินทร์ | ถ.พรานนก, ถ.อิสรภาพ, ถ.อรุณอมรินทร์, ถ.บางขุนนนท์, ถ.จรัญสนิทวงศ์ | ย่านศิริราช, หอพักบุคลากรการแพทย์, ชุมชนริมคลอง | 74 | **DRAFT / EVIDENCE REQUIRED** |
| 6 | บางพลัด | `bang-phlat` | บางพลัด, บางอ้อ, บางบำหรุ, บางยี่ขัน | ถ.จรัญสนิทวงศ์, ถ.สิรินธร, ถ.ราชวิถี, ถ.สมเด็จพระปิ่นเกล้า, สะพานซังฮี้, สะพานพระราม 7/8 | คอนโดแนวรถไฟฟ้าสายสีน้ำเงิน, อพาร์ตเมนต์ | 74 | **DRAFT / EVIDENCE REQUIRED** |
| 7 | ตลิ่งชัน | `taling-chan` | คลองชักพระ, ตลิ่งชัน, ฉิมพลี, บางพรม, บางระมาด, บางเชือกหนัง | ถ.บรมราชชนนี, ถ.กาญจนาภิเษก, ถ.ราชพฤกษ์, ถ.พรานนก-พุทธมณฑล สาย 4 | บ้านเดี่ยวจัดสรรขนาดใหญ่, ชุมชนสวน, ซอยลึก | 72 | **DRAFT / EVIDENCE REQUIRED** |
| 8 | ทวีวัฒนา | `thawi-watthana` | ทวีวัฒนา, ศาลาธรรมสพน์ | ถ.บรมราชชนนี, ถ.พุทธมณฑล สาย 2/3, ถ.อุทยาน (อักษะ), ถ.เลียบคลองทวีวัฒนา | บ้านเดี่ยว, คฤหาสน์, โครงการระดับบน, ถนนกว้าง | 70 | **DRAFT / EVIDENCE REQUIRED** |

### 2.2 Southern Thonburi (กลุ่มเขตกรุงธนใต้ — 7 เขต)
| # | เขต (District) | Slug | แขวงทางการ (Khwaeng) | เส้นทางคมนาคมหลัก | ความพร้อมในการบริการ WMS | คะแนนหลักฐาน | สถานะ Indexation |
|---|---|---|---|---|---|:---:|:---:|
| 9 | ภาษีเจริญ | `phasi-charoen` | บางหว้า, บางด้วน, บางจาก, บางแวก, คลองขวาง, ปากคลองภาษีเจริญ, คูหาสวรรค์ | ถ.เพชรเกษม, ถ.ราชพฤกษ์, ถ.พุทธมณฑล สาย 1, ถ.บางแวก | จุดตัด BTS/MRT บางหว้า, คอนโดมิเนียม, ชุมชนริมคลอง | **80** | **APPROVED / PUBLISHED** (Pilot) |
| 10 | บางแค | `bang-khae` | บางแค, บางแคเหนือ, บางไผ่, หลักสอง | ถ.เพชรเกษม, ถ.กาญจนาภิเษก, ถ.กัลปพฤกษ์, ถ.พุทธมณฑล สาย 2 | ตลาดบางแค, เดอะมอลล์, MRT หลักสอง, ซอย 63/81, คอนโด/ทาวน์โฮม | **85** | **APPROVED / PUBLISHED** (Pilot) |
| 11 | หนองแขม | `nong-khaem` | หนองแขม, หนองค้างพลู | ถ.เพชรเกษม, ถ.ทวีวัฒนา, ถ.พุทธสาคร, ถ.มาเจริญ (เพชรเกษม 81), ถ.เลียบคลองภาษีเจริญ | ชุมชนอยู่อาศัยหนาแน่น, เพชรเกษม 69/77/81, ทาวน์โฮมจัดสรร | **82** | **APPROVED / PUBLISHED** (Pilot) |
| 12 | บางขุนเทียน | `bang-khun-thian` | ท่าข้าม, แสมดำ | ถ.พระราม 2, ถ.บางขุนเทียน-ชายทะเล, ถ.กาญจนาภิเษก | โรงงานอุตสาหกรรม, โกดังสินค้า, หมู่บ้านจัดสรรพระราม 2 | 68 | **DRAFT / EVIDENCE REQUIRED** |
| 13 | บางบอน | `bang-bon` | บางบอนเหนือ, บางบอนใต้, คลองบางบอน, คลองบางพราน | ถ.เอกชัย, ถ.บางบอน 1-5, ถ.กาญจนาภิเษก | โรงงานขนาดย่อม, การ์เมนต์, โกดัง, อพาร์ตเมนต์คนงาน | 65 | **DRAFT / EVIDENCE REQUIRED** |
| 14 | ราษฎร์บูรณะ | `rat-burana` | ราษฎร์บูรณะ, บางปะกอก | ถ.สุขสวัสดิ์, ถ.ราษฎร์บูรณะ, ถ.ประชาอุทิศ | ชุมชนฝั่งแม่น้ำ, อาคารสำนักงาน, โรงพยาบาลบางปะกอก | 66 | **DRAFT / EVIDENCE REQUIRED** |
| 15 | ทุ่งครุ | `thung-khru` | บางมด, ทุ่งครุ | ถ.ประชาอุทิศ, ถ.พุทธบูชา, ถ.ครุใน | ย่าน มจธ. บางมด, หอพักนักศึกษา, อาคารพาณิชย์ | 68 | **DRAFT / EVIDENCE REQUIRED** |

---

## 3. Metadata & Canonical URLs

| หน้าเพจ (Page) | Canonical URL | Title Tag | Meta Description |
|---|---|---|---|
| **Thonburi Hub** | `https://wms-transport.com/service/bkk-thonburi` | รถรับจ้างฝั่งธนบุรี ย้ายบ้าน คอนโด ขนของ พร้อมคนยก | WMS TRANSPORT | บริการรถรับจ้างและขนย้ายฝั่งธนบุรี ครอบคลุม 15 เขต ทั้งกรุงธนเหนือและกรุงธนใต้ รถกระบะตู้ทึบความสูง 2.1 ม. เข้าจอดใต้อาคารคอนโดได้สะดวก พร้อมทีมงานช่วยยกของมืออาชีพ |
| **บางแค** | `https://wms-transport.com/areas/bkk-thonburi/bang-khae` | รถรับจ้างบางแค ย้ายบ้าน ขนของ คอนโด เพชรเกษม กาญจนาภิเษก พร้อมคนยก | WMS TRANSPORT | บริการรถรับจ้างตู้ทึบ ขนส่งมอเตอร์ไซค์ ย้ายบ้านคอนโด ย่านบางแค กรุงเทพฯ ฝั่งธนบุรี รถกระบะตู้ทึบหลังคาสูง 2.1 ม. รองรับการขนย้ายหอพัก คอนโด บ้านเดี่ยว... |
| **หนองแขม** | `https://wms-transport.com/areas/bkk-thonburi/nong-khaem` | รถรับจ้างหนองแขม ย้ายบ้าน ขนของ ทาวน์โฮม เพชรเกษม 81 พุทธสาคร | WMS TRANSPORT | บริการรถรับจ้างตู้ทึบ ขนส่งมอเตอร์ไซค์ ย้ายบ้านคอนโด ย่านหนองแขม กรุงเทพฯ ฝั่งธนบุรี รถกระบะตู้ทึบตอนเดียว บรรทุกย้ายของทาวน์โฮม บ้านจัดสรร หอพักนักศึกษา... |
| **ภาษีเจริญ** | `https://wms-transport.com/areas/bkk-thonburi/phasi-charoen` | รถรับจ้างภาษีเจริญ ย้ายบ้าน คอนโด บางหว้า ราชพฤกษ์ บางแวก | WMS TRANSPORT | บริการรถรับจ้างตู้ทึบ ขนส่งมอเตอร์ไซค์ ย้ายบ้านคอนโด ย่านภาษีเจริญ กรุงเทพฯ ฝั่งธนบุรี ย้ายคอนโด High-rise & Low-rise ย่านสถานีบางหว้า ขนย้ายบ้านพักอาศัย... |

---

## 4. Structured Data & Schema Implementation

All pages use strictly compliant Schema.org JSON-LD without simulation of physical local branches:

| หน้าเพจ | ประเภท Schema.org | @id อ้างอิง | การระบุพื้นที่ (areaServed) | การป้องกัน Schema Abuse |
|---|---|---|---|---|
| **Thonburi Hub** | `Service` + `FAQPage` | `https://wms-transport.com/service/bkk-thonburi#service` | `AdministrativeArea` ("กรุงเทพฯ ฝั่งธนบุรี") | Provider อ้างอิง `#moving-company` หลัก ไม่สร้าง LocalBusiness สาขาปลอม |
| **บางแค** | `Service` + `FAQPage` + `ImageObject` + `BreadcrumbList` | `https://wms-transport.com/areas/bkk-thonburi/bang-khae#service` | `AdministrativeArea` ("เขตบางแค", containedIn: "กรุงเทพมหานคร") | ไร้ AggregateRating, ไร้ Review บนตัว WMS, ไร้ priceRange="$$" |
| **หนองแขม** | `Service` + `FAQPage` + `ImageObject` + `BreadcrumbList` | `https://wms-transport.com/areas/bkk-thonburi/nong-khaem#service` | `AdministrativeArea` ("เขตหนองแขม", containedIn: "กรุงเทพมหานคร") | ไร้ AggregateRating, ไร้ Review บนตัว WMS, ไร้ priceRange="$$" |
| **ภาษีเจริญ** | `Service` + `FAQPage` + `ImageObject` + `BreadcrumbList` | `https://wms-transport.com/areas/bkk-thonburi/phasi-charoen#service` | `AdministrativeArea` ("เขตภาษีเจริญ", containedIn: "กรุงเทพมหานคร") | ไร้ AggregateRating, ไร้ Review บนตัว WMS, ไร้ priceRange="$$" |

---

## 5. Internal Linking Architecture

```
                     [ Homepage: / ]
                            │
               [ Thonburi Hub: /service/bkk-thonburi ]
              /             │               \
             /              │                \
    [ bang-khae ]     [ nong-khaem ]     [ phasi-charoen ]
    (Published)        (Published)         (Published)
         │                  │                   │
         └────────── Contextual Cross-Links ────┘
          (Each links to 2-3 neighbors + Hub + Pricing)
```

* **From Hub (`/service/bkk-thonburi`):**
  - Links to approved pilot districts: `/areas/bkk-thonburi/bang-khae`, `/areas/bkk-thonburi/nong-khaem`, `/areas/bkk-thonburi/phasi-charoen`.
  - Displays the other 12 districts as informative covered-area service text with contact CTAs (zero dead or thin links).
  - Contextual links to `/pricing/moving`, `/pricing/motorcycle-transport`, `/pricing/freight`, and `/portfolio`.
* **From District Pages:**
  - Backlink to Thonburi Regional Hub (`/service/bkk-thonburi`).
  - Strict 3–4 neighboring district links:
    - Bang Khae links to Nong Khaem, Phasi Charoen, Bang Bon.
    - Nong Khaem links to Bang Khae, Thawi Watthana, Bang Bon.
    - Phasi Charoen links to Bang Khae, Bangkok Yai, Thon Buri.
  - Zero self-links. Zero 15-link keyword-stuffing blocks.

---

## 6. Files Changed & Pages Created

* **New Components Created:**
  - `src/components/ThonburiHubView.tsx`: Rich, interactive Thonburi regional hub layout with dual-zone district grids, condo height access guidance, booking steps, FAQs, and CTAs.
* **Core Data Updated:**
  - `src/data/districtLandingPages.ts`: Complete schema records for all 15 official BMA districts with subdistricts, road corridors, property types, job evaluation factors, proof scores, and indexable flags.
* **Pages Enhanced:**
  - `src/app/(marketing)/service/[province]/page.tsx`: Integrated `ThonburiHubView` for `bkk-thonburi` with dedicated metadata, breadcrumbs, Service schema, and FAQ schema.
  - `src/app/(marketing)/areas/[province]/[district]/page.tsx`: Enforced `dynamicParams = false`, strict 404 on unapproved/draft districts, and enhanced non-thin content architecture.

---

## 7. Verification Test Results

| ขั้นตอนตรวจสอบ (Check) | คำสั่ง (Command) | รหัสผ่าน (Exit Code) | ผลลัพธ์ (Result) |
|---|---|:---:|---|
| TypeScript Typecheck | `npx tsc --noEmit` | **0** | ผ่านสมบูรณ์ (0 errors) |
| ESLint Validation | `npm run lint` | **0** | ผ่านสมบูรณ์ (0 errors, 0 warnings) |
| SEO Validator | `npm run seo:verify` | **0** | ผ่านสมบูรณ์ (0 errors, 0 warnings) |
| Unit / Data Test Suite | `npm test` | **0** | ผ่านสมบูรณ์ (0 errors, 0 warnings) |
| Next.js Production Build | `npm run build` | **0** | 87 Static Pages prerendered |
| Live Server Inspection Suite | `node test-thonburi-live.mjs` | **0** | **65 passed / 0 failed** |
| Full Regression Suite | `node test-live-server.mjs` | **0** | **109 passed / 0 failed** |

### Detailed Live Assertions
1. **Thonburi Hub (`/service/bkk-thonburi`):** Returns HTTP 200, correct H1, direct answer, dual-zone district listings, active links to 3 pilot districts, zero broken links to draft districts.
2. **Pilot Districts (`bang-khae`, `nong-khaem`, `phasi-charoen`):** All return HTTP 200, unique metadata, self-referencing canonicals, approved images, visible FAQs, and zero noindex.
3. **Draft & Invalid Districts (13 routes tested):** All return true HTTP 404.
4. **Sitemap Integrity (`/sitemap.xml`):** Exactly 72 URLs, all return HTTP 200, self-canonical, zero draft districts present.
5. **Rendered HTML Audit:** Zero AggregateRating, zero review schemas on WMS, zero fake provincial/district LocalBusiness entities, zero synthetic tokens, and zero unconfirmed claims.

---

## 8. Business Information & Search Console Decisions

### 8.1 Business Information Still Required from Owner
1. **Expansion Proof for Draft Districts:** To publish remaining districts (e.g. Bang Phlat, Bangkok Noi, Taling Chan, Thawi Watthana), the business owner must provide at least 1 verified job record or delivery photo for each district.
2. **Commercial Cargo Insurance Documentation:** Current copy directs customers to confirm coverage terms with staff. If an official insurance certificate or policy underwriter contract exists, exact coverage figures can be documented.
3. **Vehicle Fleet Specs:** Specific curb weight and legal GVW documentation can be published once vehicle registration documents are reviewed.

### 8.2 Google Search Console Decisions Required
1. `/pricing/motorcycle-2026`: Retained in this pass with clean canonical. Final decision (keep, redirect 301 to `/pricing/motorcycle-transport`, or canonicalize) requires organic search performance review in Search Console.
2. Monitor indexation and click-through rates of the 3 pilot Thonburi district pages before publishing the second group.

---

## 9. Risk & Rollback Plan

* **Branch Isolation:** All changes reside on reversible branch `seo/wms-thonburi-area-pages`.
* **Rollback Procedure:**
  ```bash
  git checkout seo/wms-safe-remediation
  ```
* **Zero Production Risk:** The website has NOT been deployed.

---

## 10. Repository Isolation Verification

* **MJ-TH Express (`mj-expressModi`):**
  - `git status --short` before and after:
    ```
    ?? docs/integrations-inventory.md
    ?? docs/keyword-page-map.md
    ?? docs/seo-action-plan.md
    ?? docs/seo-full-audit.md
    ?? docs/seo-transfer-plan.md
    ```
  - Confirmed 100% untouched. Zero modifications, zero package installations, zero commits.
