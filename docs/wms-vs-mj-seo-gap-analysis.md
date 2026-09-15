# WMS TRANSPORT vs. MJ-TH Express: Comprehensive Technical SEO Gap Analysis

## Executive Summary

This audit compares the production SEO architecture of **MJ-TH Express** (used as a strictly read-only technical reference) with **WMS TRANSPORT** (the target project). The goal is to identify architectural strengths, resolve technical vulnerabilities, and adapt best-in-class crawlability, indexability, structured data, and internal linking models without duplicating any business content.

---

## 1. Core Architectural & Environment Comparison

| Dimension | MJ-TH Express (Reference) | WMS TRANSPORT (Baseline Before Migration) | WMS Target (Post-Implementation) |
| :--- | :--- | :--- | :--- |
| **Framework & Router** | Next.js 16.2.9 (App Router) | Next.js 16.2.6 (App Router) | Next.js 16.2.6 (App Router) |
| **UI & Styling** | Bootstrap 5 + Vanilla CSS | Tailwind CSS v4 + Framer Motion | Tailwind CSS v4 + Framer Motion |
| **Central Site Config** | Authoritative `src/lib/seo/site-config.ts` | Scattered constants across layout, entityGraph, and components | Authoritative `src/lib/seo/site-config.ts` |
| **Metadata Builder** | `buildPageMetadata` in `metadata.ts` | Ad-hoc metadata per page, missing absolute canonical resolver | Unified `buildPageMetadata`, `buildIntentMetadata`, `buildDistrictMetadata` |
| **Title Template** | `%s \| MJ-TH Express` with duplicate check | Hardcoded string in RootLayout; potential duplicate branding | `%s \| WMS TRANSPORT` with automated brand duplicate suppression |
| **Canonical URLs** | Strict absolute HTTPS URLs based on `siteConfig.baseUrl` | Mixed relative `/` and absolute URLs; risk of host mismatches | Strict absolute HTTPS canonical URLs derived from `siteConfig.baseUrl` |
| **Open Graph / Twitter** | Centralized in `metadata.ts` (1200x630, summary_large_image) | Partially specified in layout, missing dynamic overrides on some pages | Full OpenGraph & Twitter Card generator with dynamic image fallbacks |
| **Robots Directives** | Disallows `/admin/`, `/tools/`, `/api/`, `/_old_site/` | Disallowed only `/api/`; `/dashboard/` exposed to web crawlers | Disallows `/api/`, `/dashboard/`, `/data/`, `/scripts/` |
| **Sitemap Generation** | Dynamic `sitemap.ts` referencing `siteConfig.baseUrl` | Dynamic `sitemap.ts` using inline fallback domains | Authoritative `sitemap.ts` linked to `siteConfig.baseUrl` with indexability gating |
| **JSON-LD Schema** | Comprehensive `Organization`, `MovingCompany`, `BreadcrumbList`, `FAQPage`, `Service` | Standalone `EntityGraphSchema` + manual breadcrumb schema | Unified `schema.ts` supporting Entity Graph, MovingCompany, Service, Route, FAQ, Breadcrumbs |
| **Breadcrumb Schema** | Validated `BreadcrumbList` schema with 1-based indexing | Localized component with hardcoded domain in schema string | Standardized `breadcrumbs.ts` + `Breadcrumbs.tsx` with XSS escaping and dynamic domain |
| **Internal Linking** | Spiderweb related-service & related-area blocks | Footer keyword links, but lacks in-content contextual cross-hub cards | Contextual `InternalLinks.tsx` linking services, areas, and popular routes |
| **Route Architecture** | Static data in `src/data/seo/routes.ts` | Dynamic calculation via `[from]/[to]/page.tsx` with Haversine distance | Preserved dynamic distance pricing + standardized metadata & breadcrumbs |
| **Area Architecture** | 17 verified local areas in `src/data/seo/areas.ts` | District landing pages gated by `isDistrictPageIndexable` | Retained high-proof district landing pages + clean canonical routing |
| **SEO Validation Tool** | Automated `tools/verify-seo-data.js` checking 9 safety invariants | Only runtime `scripts/validate-sitemap.mjs` against localhost:3000 | Static TypeScript transpile-and-test validator `tools/verify-seo-data.js` |

---

## 2. Deep-Dive Gap Analysis & Identified Weaknesses

### Gap 1: Scattered Business Configuration vs. Single Source of Truth
- **MJ-TH Express**: All telephone numbers, LINE links, Facebook profiles, addresses, geo-coordinates, and canonical domains originate from `src/lib/seo/site-config.ts`.
- **WMS TRANSPORT Issue**: Domain strings were duplicated across `layout.tsx`, `robots.ts`, `Breadcrumbs.tsx`, and `entityGraph.ts`. Updating contact info required edits in multiple files.
- **Remediation**: Implemented `src/lib/seo/site-config.ts` as the single authoritative source for WMS TRANSPORT.

### Gap 2: Crawl Leakage via Robots.txt
- **MJ-TH Express**: Effectively blocked administrative endpoints, old site folders, and internal tooling.
- **WMS TRANSPORT Issue**: `robots.ts` only disallowed `/api/`. Internal dashboard (`/dashboard/seo-intelligence`) was technically crawlable by search bots.
- **Remediation**: Updated `robots.ts` to disallow `/dashboard/`, `/api/`, `/data/`, and `/scripts/`.

### Gap 3: Title Duplication & Branding Redundancy
- **MJ-TH Express**: Contained smart logic: `title.includes(businessName) ? { absolute: title } : title`.
- **WMS TRANSPORT Issue**: Child pages setting titles containing `| WMS TRANSPORT` risked being transformed into `... | WMS TRANSPORT | WMS TRANSPORT` when using a global title template.
- **Remediation**: Implemented `buildPageMetadata()` in `src/lib/seo/metadata.ts` with brand duplicate protection.

### Gap 4: Breadcrumb Schema URL Consistency
- **MJ-TH Express**: Breadcrumb URLs strictly validated to match production baseUrl and canonical targets.
- **WMS TRANSPORT Issue**: `Breadcrumbs.tsx` had hardcoded `https://wms-transport.com` string interpolation and unescaped JSON injection.
- **Remediation**: Updated `Breadcrumbs.tsx` to reference `siteConfig.baseUrl` and apply `escapeJsonLd` to neutralize XSS risks.

### Gap 5: Offline SEO Data Validation
- **MJ-TH Express**: Ran `node tools/verify-seo-data.js` directly during tests to check slug uniqueness, canonical integrity, and risky claims before deploying.
- **WMS TRANSPORT Issue**: Depended on `validate-sitemap.mjs` which required a live dev server on port 3000.
- **Remediation**: Ported and adapted `tools/verify-seo-data.js` into WMS TRANSPORT, hooked into `package.json` under `npm test` and `npm run seo:verify`.

---

## 3. Business Content Safeguard Verification

To ensure strict compliance with Google search quality guidelines and prevent copyright/brand infringement:
- **No data from MJ-TH Express** was transferred to WMS TRANSPORT.
- All telephone numbers (`061-240-2436`), emails (`1999.kittinanwimonset@gmail.com`), social links, and area records are strictly specific to WMS TRANSPORT.
- Missing legal entity details and exact registered office coordinates are explicitly marked as `OWNER CONFIRMATION REQUIRED`.
