# README FIRST — WMS TRANSPORT Service-Area UX/UI & Banner Update Review

Welcome to the independent code review package for the **WMS TRANSPORT Area UX/UI, Banner, and Footer Update**.

---

## 1. Package Overview
- **Package Name:** `WMS-TRANSPORT-Area-UXUI-Banner-Footer-Review.zip`
- **Scope:** Form readability overhaul, Deep Navy hero standardization, semantic figure/figcaption image captions, 4-column footer redesign, and service-confidence banner placement immediately above the authentic work gallery.

```
WMS-TRANSPORT-Area-UXUI-Banner-Footer-Review.zip
├── manifest.json              # SHA-256 integrity hash for every included file
├── project/                   # Complete current application source code
│   ├── src/                   # React 19 / Next.js 16.3.5 App Router source
│   │   ├── components/ui/InputWithIcon.tsx # Dedicated non-shrinking icon input
│   │   ├── components/service-area/QuotationPlanner.tsx # Overhauled 4-item quote panel
│   │   ├── components/service-area/AreaServiceConfidenceBanner.tsx # Approved banner
│   │   ├── components/service-area/ServiceAreaHero.tsx # Standardized navy hero
│   │   ├── components/service-area/ServiceAreaLayout.tsx # Pre-gallery banner placement
│   │   ├── components/service-area/LocalPointView.tsx # Navy hero + figure/figcaption
│   │   ├── components/service-area/ZoneHubView.tsx # Navy hero + banner order
│   │   └── components/Footer.tsx # Redesigned 4-column structured footer
│   ├── public/                # Static WebP assets, branding, Partytown lib
│   ├── tools/                 # Validation tools (verify-seo-data.js, package script)
│   ├── package.json & package-lock.json
│   ├── tsconfig.json & next.config.ts
│   └── .env.example           # Sanitized environment template
├── reports/                   # All technical, SEO, and audit deliverables
│   ├── README-FIRST.md        # This guide
│   ├── implementation-summary-th.md # Comprehensive executive summary in Thai
│   ├── changed-files.md       # Ledger of created and modified files
│   ├── route-coverage-matrix.csv # Detailed coverage matrix of all area routes
│   ├── banner-placement-report.md # Order of banner & gallery across templates
│   ├── seo-baseline-comparison.md # 123 canonical URLs & heading structure audit
│   ├── url-baseline-before.csv & url-baseline-after.csv # 123 URLs preserved
│   ├── validation-results.md  # Test suite logs (TS, lint, SEO, build, viewports)
│   └── skills-used.md         # Provenance and application of Claude SEO & UI/UX skills
└── evidence/                  # Browser verification screenshots & logs
    ├── desktop_repaired_quotation_form.png
    ├── banner_immediately_above_work_gallery.png
    ├── redesigned_4_column_footer.png
    ├── deep_navy_hero_standardized.png
    ├── mobile_390px_hero.png
    ├── mobile_390px_quotation_form.png
    ├── mobile_390px_banner.png
    ├── mobile_390px_footer.png
    └── validation_execution_log.txt
```

---

## 2. Quick Reproduction Steps

1. Extract this archive into an empty directory.
2. Verify file integrity using `manifest.json`:
   ```powershell
   Get-FileHash -Algorithm SHA256 project/package.json
   ```
3. Install dependencies:
   ```bash
   cd project
   npm install
   ```
4. Run validation checks:
   ```bash
   # Run strict SEO and canonical URL validator (123 URLs)
   node tools/verify-seo-data.js

   # Run TypeScript check (strict mode)
   npx tsc --noEmit

   # Run ESLint
   npm run lint

   # Run production build (161 static pages)
   npm run build
   ```

---

## 3. Key Contact & Branding Details
- **Company:** WMS TRANSPORT (ดับบลิวเอ็มเอส ทรานสปอร์ต)
- **Headquarters:** 75 535 ซอย 13 ตำบลบ้านเกาะ อำเภอเมืองสมุทรสาคร จังหวัดสมุทรสาคร 74000
- **Phone:** `061-240-2436`
- **LINE Official:** `https://line.me/ti/p/DtICkMaDet`
