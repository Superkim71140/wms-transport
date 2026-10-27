# WMS TRANSPORT Update - Project Review & Development Notes

This document provides a concise technical and architectural overview of the **WMS TRANSPORT Update** project for ChatGPT review and subsequent design, performance, usability, and SEO enhancement.

---

## 1. Tech Stack & Environment

- **Framework**: [Next.js](https://nextjs.org/) 16.3.5 (App Router, Turbopack)
- **UI Library**: React 19.2.4 & React DOM 19.2.4
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) v4 (`@tailwindcss/postcss` ^4, `tailwindcss` ^4) with custom theme tokens
- **Package Manager**: `npm` (complete `package-lock.json` included)
- **Image Processing**: `sharp` ^0.35.4
- **Icons**: `lucide-react` ^1.17.0
- **Animations**: `framer-motion` ^12.40.0
- **Third-Party Script Offloading**: `@builder.io/partytown` ^0.10.3 (runs analytics off the main thread)
- **Language**: TypeScript 5 with strict configuration (`tsconfig.json`)

---

## 2. Setup, Development & Build Commands

| Command | Purpose |
| :--- | :--- |
| `npm install` | Install locked dependencies |
| `npm run dev` | Run Partytown setup and start local Next.js development server at `http://localhost:3000` |
| `npm run build` | Run Partytown setup, type-check, and generate production static/SSG bundle |
| `npm run start` | Start production server with built artifacts |
| `npm run lint` | Run ESLint with Next.js Core Web Vitals and TypeScript rules |
| `npm test` or `npm run seo:verify` | Run strict automated SEO and source-of-truth validator (`tools/verify-seo-data.js`) |
| `npm run optimize:images` | Convert JPEG/PNG images in `public/images` to WebP format using Sharp |

---

## 3. Project Architecture & Entry Points

```
WMS TRANSPORT Update/
├── public/                     # Static media, icons, and Partytown library
│   ├── images/                 # Business photos, fleet images, verified work samples
│   ├── logoWMS.webp            # Official company logo
│   └── ~partytown/             # Partytown runtime lib
├── src/
│   ├── app/                    # Next.js App Router routes & layouts
│   │   ├── (marketing)/        # Marketing route group (with shared Navbar & Footer)
│   │   │   ├── areas/          # District-level service landing pages
│   │   │   ├── blog/           # Moving tips and transport knowledge articles
│   │   │   ├── compare/        # Service comparison guides
│   │   │   ├── guides/         # Moving and cargo volume guides
│   │   │   ├── portfolio/      # Customer case studies and work gallery
│   │   │   ├── pricing/        # Transparent pricing breakdowns (moving, motorcycle, freight)
│   │   │   ├── service/        # Regional/provincial hub pages
│   │   │   ├── layout.tsx      # Marketing shell (wraps with Navbar & Footer)
│   │   │   └── page.tsx        # Primary Homepage
│   │   ├── route/              # Approved inter-provincial corridor routes
│   │   ├── dashboard/          # Internal SEO intelligence dashboard
│   │   ├── globals.css         # Tailwind 4 theme tokens, design tokens, utility classes
│   │   ├── layout.tsx          # Root HTML document, font loading, global schema & analytics
│   │   ├── robots.ts           # Dynamic robots.txt generation
│   │   └── sitemap.ts          # Truthful dynamic XML sitemap (86+ verified routes)
│   ├── components/             # Reusable UI & section components
│   │   ├── Navbar.tsx          # Responsive navigation bar with mobile drawer
│   │   ├── Footer.tsx          # Standard footer with verified contacts & crawlable links
│   │   ├── HeroImageCarousel.tsx # Hero banner image carousel
│   │   ├── ServiceSplitShowcase.tsx # Service overview presentation
│   │   ├── TrustCounters.tsx   # Trust indicators and service highlights
│   │   ├── ServiceMap.tsx      # Samut Sakhon operations base and service corridor hub
│   │   ├── FAQ.tsx             # Accessible accordion FAQ with JSON-LD FAQPage schema
│   │   ├── FloatingContact.tsx # Floating contact button (Phone, LINE, Messenger)
│   │   └── EntityGraphSchema.tsx # Root Organization, MovingCompany & WebSite JSON-LD
│   ├── data/                   # Authoritative TypeScript data sets
│   │   ├── searchIntentMap.ts  # Keyword-to-page mapping and SEO intent metadata
│   │   ├── districtLandingPages.ts # Complete data model for BMA Thonburi & Samut Sakhon districts
│   │   ├── approvedRouteCorridors.ts # Verified 10 inter-provincial transport routes
│   │   ├── mediaEvidence.ts    # Real job photos and case study metadata
│   │   └── pricingPolicy.ts    # Baseline pricing rules and moving conditions
│   ├── lib/
│   │   └── seo/
│   │       ├── site-config.ts  # Central single source of truth for branding, contact, address
│   │       ├── schema.ts       # Structured data generators (Organization, MovingCompany, Service)
│   │       ├── metadata.ts     # Meta tags and Open Graph generators
│   │       └── breadcrumbs.ts  # Crawlable BreadcrumbList schema generator
│   └── types/                  # Ambient TypeScript definitions
├── tools/
│   └── verify-seo-data.js      # Strict regression and anti-spam validator for SEO data
└── .env.example                # Safe environment variables template
```

---

## 4. Key Design & SEO File Locations

- **Design System & Styling**:
  - `src/app/globals.css`: Defines CSS tokens, light-theme palette, typography (`Noto Sans Thai` + `Inter`), custom animations, and responsive utilities.
  - `impeccable_SKILL.md` & `ui-ux-pro-max-skill-main/`: Embedded frontend and UI/UX design guides.
- **SEO & Structured Data**:
  - `src/lib/seo/site-config.ts`: Business details (WMS TRANSPORT, Samut Sakhon address, phone `061-240-2436`, LINE link).
  - `src/lib/seo/schema.ts`: Compliant Schema.org structured data avoiding self-serving ratings and synthetic data.
  - `src/data/searchIntentMap.ts`: Intent mapping for primary services, comparisons, and guides.
  - `src/app/sitemap.ts` & `src/app/robots.ts`: XML Sitemap and crawling directives.
  - `claude-seo/`: Comprehensive reference guide for Google Search Essentials and technical SEO.

---

## 5. Service-Area & Dynamic Route Architecture

1. **Provincial Hubs (`/service/[province]`)**:
   - Implemented in `src/app/(marketing)/service/[province]/page.tsx`.
   - Hubs include `bkk-thonburi`, `samutsakhon`, `bangkok`, `phuket`, `chonburi`, `chiang-mai`, `samut-songkhram`.
   - Subpages for individual service categories (`moving`, `motorcycle`, `freight`) are at `/service/[province]/[serviceId]`.
2. **District Landing Pages (`/areas/[province]/[district]`)**:
   - Implemented in `src/app/(marketing)/areas/[province]/[district]/page.tsx`.
   - Populated from `src/data/districtLandingPages.ts`.
   - Controlled indexability: Pages use `isDistrictPageIndexable` and only publish with verified local operational evidence to prevent thin-content doorway penalties.
3. **Inter-Provincial Corridors (`/route/[from]/[to]`)**:
   - Implemented in `src/app/route/[from]/[to]/page.tsx`.
   - Constrained strictly to the 10 approved real-world transport corridors in `src/data/approvedRouteCorridors.ts`.

---

## 6. Known Considerations & Enhancement Opportunities

1. **Performance & Core Web Vitals**:
   - Several artwork PNGs in `public/` (`wms-transport-page.png`, `wms-transport-page-1.png`, `wms-transport-employee.png`) range between 1.8MB and 2.3MB. Converting these to WebP/AVIF can save ~85% bandwidth and improve LCP.
2. **ESLint Notices**:
   - `src/components/Navbar.tsx`: React 19 Compiler flags `setState` within `useEffect` on `pathname` change.
   - `src/components/ServiceMap.tsx`: Raw `<img>` tag on line 112 can be upgraded to Next.js `<Image>`.
   - `src/components/TrustCounters.tsx`: Helper function `StatNumber` is declared but uncalled.
3. **SEO Title Lengths**:
   - Running `npm test` checks page titles against a 65-character Google SERP limit. 19 titles in `searchIntentMap.ts` and default district titles currently exceed 65 characters and can be shortened for optimal search display.
4. **Business Parameters**:
   - `priceRange` in `site-config.ts` is currently omitted until officially confirmed by the business owner.
5. **External Dependencies**:
   - None. All packages and assets reside within this self-contained project repository.
