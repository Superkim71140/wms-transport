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
