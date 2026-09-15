# WMS TRANSPORT SEO Change Log & Remediation History

## Branch: `seo/wms-sitewide-growth`

### Commit / Modification Summary

1. **Evidence Integrity & District Gating:**
   - Audited all 15 official Thonburi districts plus legacy districts.
   - Identified missing `job-nk-01` and `job-pc-01` references and inappropriate reuse of `rev-bk-01` across multiple districts.
   - Gated Nong Khaem (`nong-khaem`) and Phasi Charoen (`phasi-charoen`) to `status: 'draft_evidence_required'`, `isIndexable: false`, excluded from sitemap, returning HTTP 404.
   - Retained only verified districts with authentic records: Bang Khae (`bang-khae`), Pinklao (`pinklao`), and Maha Chai (`maha-chai`).

2. **Vehicle Height Normalization:**
   - Removed contradictory claims stating that total vehicle height is $le 2.1$m or that the truck can enter all condominium basement parking lots.
   - Standardized terminology to "ตู้ทึบความสูงภายใน 2.1 เมตร" and added explicit notes that loading occurs in designated bays or areas with adequate overhead clearance.
   - Created owner measurement checklist for physical vehicle dimensions.

3. **Unsupported Claims Cleanup:**
   - Replaced absolute phrases ("ทุกโครงการ", "ทุกตรอกซอกซอย", "ทีมงานมืออาชีพ", "ไม่มีค่าใช้จ่ายแฝง") with conservative, factual operating descriptions.

4. **Security & Route Protection:**
   - Removed unauthorized external footer link to `https://kimx-wed.vercel.app/`.
   - Added `robots: { index: false, follow: false }` metadata to `/dashboard/seo-intelligence` and confirmed disallow in `robots.ts`.

5. **Sitewide Documentation Suite Created:**
   - `docs/GSC-DATA-REQUEST.md`
   - `docs/WMS-EVIDENCE-GAP-LIST.md`
   - `docs/WMS-SITEWIDE-KEYWORD-PAGE-MAP.md`
   - `docs/WMS-90-DAY-SEO-ROADMAP.md`
   - `docs/WMS-SEO-CHANGE-LOG.md`

6. **Promotional Showcase Banner Implementation (`ServiceAreaPromoBanner`):**
   - Built reusable component `src/components/service-area/ServiceAreaPromoBanner.tsx` using original high-quality assets (`/wms-transport-employee.png`, `/wms-transport-route-background.png`, `quality={90}`).
   - Embedded across all published service area landing pages (`/service/[province]`, `/service/bkk-thonburi`, `/areas/[province]/[district]`).
   - Integrated owner-verified LINE CTA (`https://line.me/ti/p/DtICkMaDet`) and phone link (`tel:0612402436`).
   - Strictly avoided duplicated H1 tags, preserved responsive layout (desktop split, mobile vertical stack with min 48px touch targets).

7. **Service-Area Decision Summary Redesign (`CompactServiceSummary`):**
   - Previous Problem: The legacy "ข้อมูลสรุปเพื่อการตัดสินใจ" (`DecisionAnswerSurface.tsx` + `TLDRVerdict.tsx`) was oversized (600–900px vertical height), repetitive, visually heavy, and contained generic customer descriptions and unsupported claims.
   - Removed Content: Generic customer-audience descriptions ("ลูกค้าที่เหมาะสม"), nationwide coverage claims on district pages, unverified fixed booking timeframes, 2.1m basement parking claims, redundant price chips, and "TL;DR" customer-facing acronym.
   - New Compact Design: Built `src/components/service-area/CompactServiceSummary.tsx` with heading `ข้อมูลบริการในพื้นที่แบบย่อ` (H2), 3 compact cards (จุดให้บริการหลัก, งานที่รองรับ, ข้อมูลที่ใช้ประเมินราคา), and a collapsed native disclosure for service conditions.
   - Height Reduction: Decreased section height from ~750px to ~260px on desktop (65% reduction in visual clutter).
   - Routes Affected: All published location hub pages (`/service/[province]`, `/service/bkk-thonburi`) and district pages (`/areas/[province]/[district]`).
   - Risk Level: Low. Preserved all real HTML text, metadata, canonical URLs, and schema without altering route structures.
   - Rollback Instructions: `git checkout HEAD~1 -- src/app/(marketing)/service/[province]/page.tsx src/app/(marketing)/areas/[province]/[district]/page.tsx src/components/ThonburiHubView.tsx`

