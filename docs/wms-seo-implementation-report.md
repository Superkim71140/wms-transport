# WMS TRANSPORT: Technical SEO Architecture Implementation Report

## 1. Project Overview

This implementation safely adapts the high-performance technical SEO architecture of the reference project (MJ-TH Express) into **WMS TRANSPORT**, while strictly adhering to read-only safety for MJ-TH Express and preserving all existing, uncommitted work in WMS TRANSPORT.

The goal is to elevate WMS TRANSPORT's crawl efficiency, entity authority, rich-snippet eligibility, indexation control, and search intent alignment on Google Thailand.

---

## 2. Implemented Architecture & File Changes

### A. Central Site Configuration (`src/lib/seo/site-config.ts`)
- **Status:** Created new.
- **Description:** Acts as the single source of truth for all business attributes, contact points, coordinates, default metadata, and JSON-LD schema parameters.
- **Key Fields:**
  - `businessName`: "WMS TRANSPORT"
  - `baseUrl`: derived from `process.env.NEXT_PUBLIC_SITE_URL` with fallback to `https://wms-transport.com`
  - `phone`: "061-240-2436"
  - `phoneFormatted`: "+66-61-240-2436"
  - `email`: "1999.kittinanwimonset@gmail.com"
  - `socials`: Facebook & LINE official profiles
  - `verification.google`: "XBZroDGp_kA28tbvOnFUymh1DsDybkbicMoyPmsQ8JY"
  - Service areas: Bangkok & Thonburi, Samut Sakhon, Samut Songkhram, Chonburi, Phuket, Chiang Mai.

### B. Standardized Metadata Builder (`src/lib/seo/metadata.ts`)
- **Status:** Created new.
- **Capabilities:**
  - Automatic conversion of relative paths to absolute HTTPS canonical URLs.
  - Brand name duplication check: prevents `Title | WMS TRANSPORT | WMS TRANSPORT`.
  - Rich OpenGraph and Twitter card generation with fallback images and proper dimensions (1200x630).
  - Explicit Googlebot directives (`max-snippet: -1`, `max-image-preview: large`).
  - Specialized builders for Search Intent, District, and Inter-provincial Route pages.

### C. JSON-LD Structured Data Builder (`src/lib/seo/schema.ts`)
- **Status:** Created new.
- **Capabilities:**
  - `buildOrganizationSchema()`: Standard Organization schema linked to stable entity `@id`.
  - `buildMovingCompanySchema()`: LocalBusiness specialization with operating hours, service areas, and geo coordinates.
  - `buildWebSiteSchema()`: Connects site entity to organization publisher.
  - `buildServiceSchema()`: Granular transport service schema.
  - `buildRouteServiceSchema()`: Origin-to-Destination AdministrativeArea mapping for route queries.
  - `buildFAQSchema()`: Automated markdown stripping to deliver clean text to search engines.
  - `buildBreadcrumbSchema()`: Clean BreadcrumbList with 1-based position indexing and HTTPS URLs.
  - `escapeJsonLd()`: Sanitization helper to protect against script injection in serialized JSON-LD.

### D. Breadcrumbs Generator & Visual Component
- **Files:** `src/lib/seo/breadcrumbs.ts` (new) & `src/components/Breadcrumbs.tsx` (updated).
- **Capabilities:**
  - Pre-defined breadcrumb hierarchies for Home, Pricing, Province Hubs, District Landing Pages, Routes, Guides, and Portfolio cases.
  - Integration with `siteConfig.baseUrl` replacing hardcoded domain strings.
  - Sanitized inline JSON-LD `<script>` tag alongside accessible HTML `<nav>` element.

### E. Contextual Internal Linking (`src/components/InternalLinks.tsx`)
- **Status:** Created new.
- **Capabilities:**
  - Contextual link hub connecting services, pricing, provincial hubs, and popular inter-provincial routes.
  - Natural Thai anchor text without repetitive keyword stuffing.
  - Responsive 3-column layout built with Tailwind CSS.

### F. Crawl & Indexation Controls (`robots.ts` & `sitemap.ts`)
- **`src/app/robots.ts`:**
  - Dynamically bound to `siteConfig.baseUrl`.
  - Disallows internal administrative endpoints: `/dashboard/`, `/api/`, `/data/`, and `/scripts/`.
- **`src/app/sitemap.ts`:**
  - References `siteConfig.baseUrl` dynamically.
  - Strictly enforces indexation gates (`isDistrictPageIndexable`, `isIndexable`).
  - Produces valid, non-duplicate, canonical URLs.

### G. Root Layout Enhancement (`src/app/layout.tsx`)
- **Status:** Enhanced.
- **Capabilities:**
  - Configured global `title` with default and template pattern (`%s | WMS TRANSPORT`).
  - Added canonical alternate URL to root metadata.
  - Integrated `siteConfig` constants for icons, verification tokens, and openGraph definitions.

### H. SEO Data Integrity Validation Suite (`tools/verify-seo-data.js`)
- **Status:** Created new.
- **Capabilities:**
  - Validates siteConfig brand uniqueness and absence of reference data leaks.
  - Verifies slug uniqueness across `searchIntentMap`, `districtLandingPages`, `guidesData`, and `portfolioCasesData`.
  - Validates all canonical URLs for HTTPS, correct domain origin, and absence of localhost/vercel leaks.
  - Validates schema objects and prevents fake or unverified `AggregateRating` on own business.
  - Checks breadcrumb trail length, schema type, and position numbers.
  - Audits content completeness (H1, title, metaDescription).
  - Flags high-risk marketing claims ("ปลอดภัย 100%", "ดีที่สุดใน") for editorial review.
- **Script Integrations (`package.json`):**
  - `npm test`: runs `node tools/verify-seo-data.js`
  - `npm run seo:verify`: runs `node tools/verify-seo-data.js`

---

## 3. Verification & Validation Summary

Execution of `node tools/verify-seo-data.js` yielded:
- **Canonical URLs Verified:** 20+ core routes
- **Errors Found:** 0
- **Warnings Found:** 2 (Expected: 1 duplicate guide route in dual datasets; 1 absolute claim warning in pricing-motorcycle for editorial attention)
- **Exit Code:** 0 (Passed successfully)

---

## 4. Protected Project Confirmation

- **MJ-TH Express** was strictly maintained as a read-only technical reference.
- No files in MJ-TH Express were modified, created, deleted, or formatted.
- No dependencies were altered in MJ-TH Express.
- All implementations are self-contained within WMS TRANSPORT.
