# WMS TRANSPORT — SEO Code Handoff

- **Generation Date & Time:** 2026-09-21 09:15:00 (Local Time)
- **Current Git Branch:** `seo/wms-sitewide-growth`
- **Current Commit SHA:** `6d7808d7f436abea2c571d970ca3d03ae019d809`
- **Project Framework:** Next.js App Router (v16.3.5) + Tailwind CSS (v4)
- **Statement:** `Read-only extraction. No original source file was modified.`

---

## 1. Source Inventory

| Category | Source path | Included content |
| -------- | ----------- | ---------------- |
| Global Config | `src/lib/seo/site-config.ts` | Complete business NAP, URLs, defaults, and verification tokens |
| Global Metadata | `src/app/layout.tsx` | Viewport, root metadata, favicon definitions, font optimization |
| Marketing Layout | `src/app/(marketing)/layout.tsx` | Navigation and Footer container shell |
| Metadata Engine | `src/lib/seo/metadata.ts` | `buildPageMetadata`, `buildIntentMetadata`, `buildDistrictMetadata`, `buildRoutePageMetadata` |
| Structured Data | `src/lib/seo/schema.ts` | `Organization`, `MovingCompany`, `WebSite`, `Service`, `RouteService`, `FAQPage`, `BreadcrumbList` |
| Breadcrumbs Generator | `src/lib/seo/breadcrumbs.ts` | Dynamic hierarchy breadcrumb generators |
| Entity Graph | `src/lib/seo/entityGraph.ts` | Global stable `@id` URI graph mapping and JSON-LD escaping |
| Global Schema Component | `src/components/EntityGraphSchema.tsx` | Injected Organization & WebSite JSON-LD component |
| Breadcrumbs Component | `src/components/Breadcrumbs.tsx` | Visual and JSON-LD breadcrumb navigation component |
| FAQ Schema Component | `src/components/FAQ.tsx` | Accordion UI and inline FAQPage schema injection |
| Gallery Schema Component | `src/components/GalleryMasonry.tsx` | Visual portfolio filter and ImageObject schema injection |
| Analytics & Tagging | `src/components/GoogleAnalytics.tsx` | GA4 gtag initialization, conversion event listeners |
| Dynamic OG Image | `src/app/route/[from]/[to]/opengraph-image.tsx` | Next.js Edge OG Image Response generator |
| Route: Home | `src/app/(marketing)/page.tsx` | Homepage metadata and service intent structure |
| Route: Areas Hub | `src/app/(marketing)/areas/page.tsx` | Complete service areas directory metadata |
| Route: District Landing | `src/app/(marketing)/areas/[province]/[district]/page.tsx` | `generateMetadata`, `BreadcrumbList`, `Service`, `FAQPage`, `ImageObject` |
| Route: Service Hub | `src/app/(marketing)/service/[province]/page.tsx` | `generateMetadata`, Thonburi Hub schemas, provincial logistics schemas |
| Route: Service Subpage | `src/app/(marketing)/service/[province]/[serviceId]/page.tsx` | `generateMetadata`, nested service schemas, FAQ schema |
| Route: Inter-Provincial Route | `src/app/route/[from]/[to]/page.tsx` | `generateMetadata`, `buildRouteServiceSchema` |
| Route: Blog Index | `src/app/(marketing)/blog/page.tsx` | Blog hub metadata |
| Route: Blog Article | `src/app/(marketing)/blog/[slug]/page.tsx` | `generateMetadata`, `Article` and `ImageObject` schema |
| Route: Portfolio Index | `src/app/(marketing)/portfolio/page.tsx` | Portfolio hub metadata |
| Route: Portfolio Case | `src/app/(marketing)/portfolio/[slug]/page.tsx` | `generateMetadata`, `ImageObject` case study schema |
| Route: Pricing Hub | `src/app/(marketing)/pricing/page.tsx` | Central pricing hub metadata |
| Route: Pricing Moving | `src/app/(marketing)/pricing/moving/page.tsx` | Moving pricing metadata |
| Route: Pricing Freight | `src/app/(marketing)/pricing/freight/page.tsx` | Commercial freight pricing metadata |
| Route: Pricing Motorcycle | `src/app/(marketing)/pricing/motorcycle-transport/page.tsx` | Motorcycle transport pricing metadata |
| Route: Pricing Motorcycle 2026 | `src/app/(marketing)/pricing/motorcycle-2026/page.tsx` | 2569 / 2026 Motorcycle price update guide metadata |
| Route: Compare 1 | `src/app/(marketing)/compare/moving-alone-vs-helpers/page.tsx` | Comparison page metadata |
| Route: Compare 2 | `src/app/(marketing)/compare/one-vehicle-vs-multiple-trips/page.tsx` | Comparison page metadata |
| Route: Compare 3 | `src/app/(marketing)/compare/pickup-vs-box-truck/page.tsx` | Comparison page metadata |
| Route: Guides | `src/app/(marketing)/guides/[slug]/page.tsx` | `generateMetadata` for knowledge guides |
| Route: Phuket Freight | `src/app/(marketing)/service/phuket/freight/page.tsx` | Phuket freight metadata |
| Route: Phuket Motorcycle | `src/app/(marketing)/service/phuket/motorcycle/page.tsx` | Phuket motorcycle transport metadata |
| Route: Phuket Moving | `src/app/(marketing)/service/phuket/moving/page.tsx` | Phuket moving metadata |
| Route: 404 Page | `src/app/not-found.tsx` | Non-indexable 404 metadata |
| Route: Admin SEO Dashboard | `src/app/dashboard/seo-intelligence/page.tsx` | Non-indexable dashboard metadata |
| Sitemap Engine | `src/app/sitemap.ts` | Complete dynamic multi-corridor XML sitemap generator |
| Robots Directives | `src/app/robots.ts` | Search engine crawler rules and sitemap declaration |
| Google Verification File | `googlef4b84622b6d0dd15.html` | Root HTML verification file |
| Google Verification File (Public) | `public/googlef4b84622b6d0dd15.html` | Public HTML verification file |
| Web Manifest | `site.webmanifest` | Root web application manifest |
| Web Manifest (Public) | `public/images/site.webmanifest` | Public web application manifest |
| Server Config | `next.config.ts` | Image caching, compression, headers, and compiler config |
| Package Dependencies | `package.json` | Dependencies affecting SEO, partytown, and SSR |
| SEO Verification Script | `tools/verify-seo-data.js` | Authoritative 10-point SEO data integrity test suite |
| Search Intent Dictionary | `src/data/searchIntentMap.ts` | Core search intent mapping, target keywords, canonicals |
| District Landing Dictionary | `src/data/districtLandingPages.ts` | Granular local SEO district landing page records |
| Route Corridors Allowlist | `src/data/approvedRouteCorridors.ts` | Strict indexable route-to-route corridor pairs |
| Pricing Policy Data | `src/data/pricingPolicy.ts` | Structured pricing policy and transparency metrics |
| Review Evidence Data | `src/data/reviewEvidence.ts` | Verified customer review records and evidence ratings |
| Vehicle Capacity Data | `src/data/vehicleCapacity.ts` | CBM vehicle specifications and loading dimensions |
| Answer Surface Data | `src/data/AnswerSurfaceData.ts` | Direct answer query matrices for Google AI Overview |
| Knowledge Guides Data | `src/data/guidesData.ts` | Comprehensive moving guides and indexability flags |
| Geographic Citation Matrix | `src/app/data/geoMatrix.ts` | Provincial landmarks, corridors, and districts |
| Blog Articles Data | `src/app/(marketing)/blog/posts.ts` | Published blog article repository |
| Component: Footer | `src/components/Footer.tsx` | Local NAP data, spiderweb internal links, and keywords |
| Component: ServiceMap | `src/components/ServiceMap.tsx` | Interactive Google Maps embed, NAP address, and hubs |
| Component: ThonburiHubView | `src/components/ThonburiHubView.tsx` | Thonburi 15-district citation hub, corridors, and links |
| Component: Navbar | `src/components/Navbar.tsx` | Sitewide header navigation, location menu, and contact links |
| Component: FloatingContact | `src/components/FloatingContact.tsx` | Speed dial FAB with phone, LINE, and Messenger links |

---

## 2. Global Metadata

### `src/app/layout.tsx`
Lines 1 - 116

```tsx
import type { Metadata, Viewport } from "next";
import { Inter, Noto_Sans_Thai } from "next/font/google";
import { Partytown } from "@builder.io/partytown/react";
import "./globals.css";
import EntityGraphSchema from "@/components/EntityGraphSchema";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import { siteConfig } from "@/lib/seo/site-config";

export const revalidate = 3600;

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansThai = Noto_Sans_Thai({
  variable: "--font-noto-sans-thai",
  subsets: ["thai", "latin"],
  weight: ["400", "500", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.baseUrl),
  // Direct title without template to prevent double brand duplication ("... | WMS TRANSPORT | WMS TRANSPORT") on child pages
  title: siteConfig.defaultTitle,
  description: siteConfig.defaultDescription,
  keywords: siteConfig.keywords,
  authors: [{ name: siteConfig.businessName }],
  // Root alternates.canonical is intentionally omitted so child pages do not inherit the Homepage URL.
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: siteConfig.logoUrl,
      },
    ],
  },
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.baseUrl,
    siteName: siteConfig.businessName,
    images: [
      {
        url: `${siteConfig.baseUrl}${siteConfig.defaultOgImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.businessName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [`${siteConfig.baseUrl}${siteConfig.defaultOgImage}`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: siteConfig.verification.google,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="th"
      className={`${inter.variable} ${notoSansThai.variable} h-full antialiased`}
      style={{ scrollBehavior: "smooth" }}
    >
      <head>
        <link rel="preconnect" href="https://line.me" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://line.me" />
        <link rel="preconnect" href="https://www.facebook.com" crossOrigin="anonymous" />
        <Partytown debug={false} forward={["dataLayer.push"]} />
      </head>
      <body className="min-h-full flex flex-col bg-white text-slate-900 selection:bg-blue-600 selection:text-white">
        <EntityGraphSchema />
        <GoogleAnalytics />
        {children}
      </body>
    </html>
  );
}

```

### `src/app/(marketing)/layout.tsx`
Lines 1 - 17

```tsx
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  );
}

```

### `src/lib/seo/site-config.ts` (Global SEO Configuration)
Lines 1 - 87

```ts
/**
 * Central Site Configuration for WMS TRANSPORT
 * Single authoritative source of truth for branding, contacts, metadata, and entity schemas.
 * 
 * Note: Unconfirmed operational parameters are excluded from customer-facing configs.
 */

export const siteConfig = {
  businessName: "WMS TRANSPORT",
  businessFullName: "WMS TRANSPORT รถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์",
  phone: "061-240-2436",
  phoneFormatted: "+66-61-240-2436",
  phoneHref: "tel:0612402436",
  lineUrl: "https://line.me/ti/p/DtICkMaDet",
  facebookUrl: "https://www.facebook.com/wmstransport",
  facebookPageAlt: "https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr",
  email: "1999.kittinanwimonset@gmail.com",
  baseUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://wms-transport.com").trim().replace(/\/$/, ""),
  // priceRange is omitted until officially confirmed by owner
  priceRange: undefined,
  openingHours: "24 Hours every day",
  openingHoursTh: "เปิดบริการทุกวัน ตลอด 24 ชั่วโมง",
  googleMapsUrl: "https://maps.app.goo.gl/gw8LCFmdXuejr5N99",
  address: {
    streetAddress: "75 535 ซ.13",
    subDistrict: "บ้านเกาะ",
    district: "เมืองสมุทรสาคร",
    addressLocality: "ตำบลบ้านเกาะ อำเภอเมืองสมุทรสาคร",
    addressRegion: "สมุทรสาคร",
    postalCode: "74000",
    addressCountry: "TH",
  },
  geo: {
    latitude: 13.6018827,
    longitude: 100.2463594,
  },
  serviceAreas: [
    "สมุทรสาคร",
    "สมุทรสงคราม",
    "กรุงเทพมหานคร",
    "ฝั่งธนบุรี",
    "นนทบุรี",
    "ปทุมธานี",
    "ชลบุรี",
    "ภูเก็ต",
    "เชียงใหม่",
    "ทั่วประเทศ"
  ],
  primaryServices: [
    "รถกระบะตู้ทึบรับจ้าง",
    "ย้ายบ้านและคอนโด",
    "ขนส่งมอเตอร์ไซค์และบิ๊กไบค์",
    "ขนส่งสินค้าเหมาเที่ยวทั่วไทย",
    "บริการพนักงานช่วยยกของมืออาชีพ"
  ],
  defaultTitle: "รถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์ บิ๊กไบค์ พร้อมคนยก | WMS TRANSPORT",
  titleTemplate: "%s | WMS TRANSPORT",
  defaultDescription: "บริการรถรับจ้างทั่วไป รถกระบะตู้ทึบรับจ้าง ย้ายหอพัก ย้ายคอนโด ย้ายบ้าน และขนส่งมอเตอร์ไซค์/Bigbike ทั่วไทย บริการพร้อมคนช่วยยกของอย่างมืออาชีพ สินค้าปลอดภัย ประเมินราคาฟรี 24 ชม.",
  defaultOgImage: "/images/logoWMS.webp",
  logoUrl: "/images/logoWMS.webp",
  locale: "th_TH",
  verification: {
    google: "XBZroDGp_kA28tbvOnFUymh1DsDybkbicMoyPmsQ8JY",
  },
  socials: [
    "https://www.facebook.com/wmstransport",
    "https://line.me/ti/p/DtICkMaDet"
  ],
  keywords: [
    "รถกระบะตู้ทึบรับจ้าง",
    "รถรับจ้างย้ายบ้าน",
    "ย้ายหอพักพร้อมคนยก",
    "ขนส่งมอเตอร์ไซค์ ทั่วไทย",
    "รับส่งบิ๊กไบค์",
    "ขนย้ายเฟอร์นิเจอร์",
    "รถรับจ้างขนของ",
    "ขนส่งสินค้า เหมาคัน",
    "WMS Transport",
    "รถรับจ้างสมุทรสาคร",
    "รถรับจ้างสมุทรสงคราม",
    "รถรับจ้างกรุงเทพ",
    "รถรับจ้างภูเก็ต"
  ]
};

export type SiteConfig = typeof siteConfig;

```

---

## 3. Route-Level Metadata

### `src/app/(marketing)/page.tsx` (Homepage Metadata)
Lines 47 - 57

```tsx
import { Metadata } from "next";

// ISR: Revalidate every hour
export const revalidate = 3600;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

```

### `src/app/(marketing)/areas/page.tsx` (Areas Hub Metadata)
Lines 18 - 49

```tsx
export const metadata: Metadata = {
  title: "พื้นที่บริการรถรับจ้าง WMS Transport | สมุทรสาคร กรุงเทพฯ และทั่วประเทศ",
  description: "ตรวจสอบพื้นที่บริการรถรับจ้าง WMS Transport สำหรับย้ายบ้าน ขนส่งมอเตอร์ไซค์ และขนส่งสินค้า จากสมุทรสาคร กรุงเทพฯ และปริมณฑล ไปยังปลายทางทั่วประเทศ",
  alternates: {
    canonical: "/areas",
  },
  openGraph: {
    title: "พื้นที่บริการรถรับจ้าง WMS Transport | สมุทรสาคร กรุงเทพฯ และทั่วประเทศ",
    description: "ตรวจสอบพื้นที่บริการรถรับจ้าง WMS Transport สำหรับย้ายบ้าน ขนส่งมอเตอร์ไซค์ และขนส่งสินค้า จากสมุทรสาคร กรุงเทพฯ และปริมณฑล ไปยังปลายทางทั่วประเทศ",
    url: `${siteConfig.baseUrl}/areas`,
    type: "website",
    siteName: siteConfig.businessName,
    locale: siteConfig.locale,
    images: [
      {
        url: `${siteConfig.baseUrl}${siteConfig.defaultOgImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.businessName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "พื้นที่บริการรถรับจ้าง WMS Transport | สมุทรสาคร กรุงเทพฯ และทั่วประเทศ",
    description: "ตรวจสอบพื้นที่บริการรถรับจ้าง WMS Transport สำหรับย้ายบ้าน ขนส่งมอเตอร์ไซค์ และขนส่งสินค้า จากสมุทรสาคร กรุงเทพฯ และปริมณฑล ไปยังปลายทางทั่วประเทศ",
    images: [`${siteConfig.baseUrl}${siteConfig.defaultOgImage}`],
  },
};

export default function AreasPage() {
  const gmapsEmbedUrl = `https://maps.google.com/maps?q=${siteConfig.geo.latitude},${siteConfig.geo.longitude}&hl=th&z=16&output=embed`;
```

### `src/app/(marketing)/areas/[province]/[district]/page.tsx` (District Landing Page Metadata Generator)
Lines 51 - 66

```tsx
export async function generateMetadata({ params }: AreaPageProps): Promise<Metadata> {
  const { province, district } = await params;
  const record = districtLandingPages[district];
  const provConfig = provinceMap[province];

  if (!record || record.province !== province || !provConfig || !isDistrictPageIndexable(record)) {
    return {
      title: "ไม่พบพื้นที่บริการ | WMS TRANSPORT",
      robots: { index: false, follow: false },
    };
  }

  const provName = provConfig?.name ?? province;
  return buildDistrictMetadata(record, provName);
}

```

### `src/app/(marketing)/service/[province]/page.tsx` (Service Hub Metadata Generator)
Lines 160 - 211

```tsx
export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string }>;
}): Promise<Metadata> {
  const { province } = await params;
  const loc = provinceMap[province];
  if (!loc) {
    return {
      title: "ไม่พบหน้าที่ต้องการ | WMS TRANSPORT",
      robots: { index: false, follow: false },
    };
  }
  const name = loc?.name ?? province;
  
  let description = `บริการรถรับจ้างทั่วไป รถกระบะตู้ทึบรับจ้าง ย้ายหอพัก ย้ายคอนโด ย้ายบ้าน และขนส่งมอเตอร์ไซค์/Bigbike ในพื้นที่${name} บริการพร้อมคนช่วยยกของอย่างมืออาชีพ ติดต่อประเมินราคาได้ทุกวัน`;
  
  if (province === "bkk-thonburi") {
    return {
      title: "รถรับจ้างฝั่งธนบุรี เพชรเกษม–พุทธมณฑล | WMS",
      description: "บริการรถรับจ้างฝั่งธนบุรี รถกระบะตู้ทึบย้ายบ้าน คอนโด หอพัก และส่งของ ครอบคลุมกาญจนาภิเษก กัลปพฤกษ์ ราชพฤกษ์ แยกบางบอน ท่าพระ วงเวียนใหญ่ เคหะธนบุรี พร้อมคนยก",
      alternates: {
        canonical: "/service/bkk-thonburi",
      },
    };
  }

  if (province === "samutsakhon") {
    return {
      title: "รถรับจ้างสมุทรสาคร มหาชัย–พระราม 2 | WMS",
      description: "บริการรถรับจ้างสมุทรสาคร รถกระบะตู้ทึบขนส่งสินค้าโรงงาน ย้ายบ้านและหอพัก ครอบคลุมมหาชัย กระทุ่มแบน อ้อมน้อย พุทธมณฑลสาย 4 สาย 5 และอ้อมใหญ่ พร้อมคนยก",
      alternates: {
        canonical: "/service/samutsakhon",
      },
    };
  }

  if (province === "bkk-phra-nakhon") {
    description = "บริการรถกระบะรับจ้าง กทม ฝั่งพระนคร ขนส่งมอเตอร์ไซค์ พระนคร ย้ายหอพัก ย้ายบ้าน ย้ายคอนโด บริการตู้ทึบรับจ้างพร้อมคนช่วยยกของอย่างมืออาชีพ ราคาถูก ปลอดภัย";
  }

  return {
    title: `บริการขนส่ง รถกระบะรับจ้าง ${name} | WMS TRANSPORT`,
    description,
    alternates: {
      canonical: `/service/${province}`,
    },
  };
}

```

### `src/app/(marketing)/service/[province]/[serviceId]/page.tsx` (Service Subpage Metadata Generator)
Lines 238 - 268

```tsx
// ─────────────────────────────────────────────
// SEO Metadata
// ─────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ province: string; serviceId: string }>;
}): Promise<Metadata> {
  const { province, serviceId } = await params;
  const loc = provinceMap[province];
  const service = serviceConfig[serviceId];

  if (!loc || !service) {
    return {
      title: "ไม่พบบริการที่ต้องการ | WMS TRANSPORT",
      robots: { index: false, follow: false },
    };
  }

  const provinceName = loc.name;
  const serviceLabel = service.label;

  return {
    title: `${serviceLabel} ${provinceName} | WMS TRANSPORT`,
    description: `บริการ${serviceLabel}ในพื้นที่${provinceName} และทั่วไทย โดย WMS Transport — รถกระบะตู้ทึบมาตรฐาน พร้อมคนยกของ ดูแลความปลอดภัย ติดต่อได้ 24 ชม.`,
    alternates: {
      canonical: `/service/${province}/${serviceId}`,
    },
  };
}

```

### `src/app/route/[from]/[to]/page.tsx` (Inter-Provincial Route Metadata Generator)
Lines 24 - 45

```tsx

export async function generateMetadata({
  params,
}: {
  params: Promise<{ from: string; to: string }>;
}): Promise<Metadata> {
  const { from, to } = await params;
  
  if (!isApprovedRouteCorridor(from, to)) {
    notFound();
  }

  const fromData = provinceMap[from];
  const toData = provinceMap[to];

  if (!fromData || !toData) {
    notFound();
  }

  return buildRoutePageMetadata(fromData.name, toData.name, from, to);
}

```

### `src/app/(marketing)/blog/page.tsx` (Blog Hub Metadata)
Lines 8 - 16

```tsx

export const metadata: Metadata = {
  title: "บล็อกความรู้การขนย้ายและขนส่ง | WMS TRANSPORT",
  description: "อ่านบทความ เคล็ดลับ และคู่มือการย้ายบ้าน การแพ็กของ และการเตรียมตัวขนส่งมอเตอร์ไซค์อย่างมืออาชีพจาก WMS Transport",
  alternates: {
    canonical: "/blog",
  },
};

```

### `src/app/(marketing)/blog/[slug]/page.tsx` (Blog Article Metadata Generator)
Lines 13 - 36

```tsx

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const decoded = decodeURIComponent(slug);
  const post = posts[slug] || posts[decoded];
  if (!post) {
    return {
      title: "ไม่พบหน้าบทความ | WMS TRANSPORT",
      robots: { index: false, follow: false },
    };
  }
  return {
    title: `${post.title} | WMS TRANSPORT`,
    description: post.description,
    alternates: {
      canonical: `/blog/${slug}`,
    },
  };
}

```

### `src/app/(marketing)/portfolio/page.tsx` (Portfolio Hub Metadata)
Lines 9 - 16

```tsx
export const metadata: Metadata = {
  title: "ผลงานขนส่งของเรา | WMS Transport",
  description: "รวมผลงานและรีวิวการขนย้ายสินค้าจากลูกค้าทั่วประเทศไทย โดยทีมงานคุณภาพ WMS Transport พร้อมบริการด้วยมาตรฐานสากล",
  alternates: {
    canonical: "/portfolio",
  },
};

```

### `src/app/(marketing)/portfolio/[slug]/page.tsx` (Portfolio Case Detail Metadata Generator)
Lines 20 - 45

```tsx

export async function generateMetadata({ params }: CaseDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const item = portfolioCasesData[slug];

  if (!item) {
    return {
      title: "ไม่พบผลงาน | WMS TRANSPORT",
      robots: { index: false, follow: false },
    };
  }

  const serviceName = 
    item.serviceType === "moving" ? "ย้ายบ้าน/คอนโด" : 
    item.serviceType === "motorcycle" ? "ส่งมอเตอร์ไซค์" : 
    item.serviceType === "freight" ? "ขนส่งสินค้าโรงงาน" : "บริการช่วยยก";

  return {
    title: `${item.title} | ผลงานขนย้ายจริง WMS TRANSPORT`,
    description: `รายงานบันทึกการขนย้ายจริงย่าน${item.broadArea} บริการ${serviceName} โดยทีมงาน WMS TRANSPORT`,
    alternates: {
      canonical: `/portfolio/${slug}`,
    },
  };
}

```

### `src/app/(marketing)/pricing/page.tsx` (Pricing Hub Metadata)
Lines 9 - 16

```tsx
export const metadata: Metadata = {
  title: "ราคารถรับจ้างตู้ทึบ ค่าขนส่งมอเตอร์ไซค์และย้ายบ้านคอนโด | WMS TRANSPORT",
  description: "เช็กอัตราค่าบริการรถกระบะตู้ทึบรับจ้าง ย้ายหอพัก คอนโด และขนส่งมอเตอร์ไซค์ ราคาประเมินตามระยะทางจริง โปร่งใสไม่มีค่าใช้จ่ายบวกเพิ่มลึกลับ",
  alternates: {
    canonical: "/pricing",
  },
};

```

### `src/app/(marketing)/pricing/moving/page.tsx` (Moving Pricing Metadata)
Lines 12 - 19

```tsx
export const metadata: Metadata = {
  title: "ราคาบริการย้ายบ้าน ย้ายคอนโด หอพัก และค่าจ้างคนช่วยยกของ | WMS TRANSPORT",
  description: "ค่าบริการขนย้ายบ้าน คอนโด อพาร์ทเม้นท์ และหอพักแบบละเอียด ประเมินราคาจริงตามปริมาณสิ่งของและชั้นอาคาร มีมาตรการดูแลความปลอดภัยทุกเที่ยว",
  alternates: {
    canonical: "/pricing/moving",
  },
};

```

### `src/app/(marketing)/pricing/freight/page.tsx` (Freight Pricing Metadata)
Lines 10 - 17

```tsx
export const metadata: Metadata = {
  title: "ราคาเหมารถกระบะตู้ทึบขนส่งสินค้าโรงงานสินค้าทั่วไป | WMS TRANSPORT",
  description: "ตารางราคาบริการขนส่งสินค้าโรงงานและกระจายสินค้าเชิงพาณิชย์แบบเหมาเที่ยวทั่วไทย คิดตามจริงพร้อมเอกสารประกอบครบถ้วนพร้อมมาตรการดูแลความปลอดภัย",
  alternates: {
    canonical: "/pricing/freight",
  },
};

```

### `src/app/(marketing)/pricing/motorcycle-transport/page.tsx` (Motorcycle Transport Pricing Metadata)
Lines 12 - 19

```tsx
export const metadata: Metadata = {
  title: "ราคาขนส่งรถมอเตอร์ไซค์ บิ๊กไบค์ ทั่วไทย | WMS TRANSPORT",
  description: "เช็กอัตราค่าบริการส่งมอเตอร์ไซค์และบิ๊กไบค์ทั่วประเทศ อิงตามพิกัด cc ของรถ ปลอดภัยด้วยตู้ทึบกันฝนกันฝุ่น ดูแลความปลอดภัยทุกเที่ยว",
  alternates: {
    canonical: "/pricing/motorcycle-transport",
  },
};

```

### `src/app/(marketing)/pricing/motorcycle-2026/page.tsx` (2569 Motorcycle Pricing Update Metadata)
Lines 6 - 13

```tsx
export const metadata: Metadata = {
  title: "อัปเดตราคาขนส่งมอเตอร์ไซค์และบิ๊กไบค์ ทั่วไทย ปี 2569 | WMS TRANSPORT",
  description: "เช็กอัตราค่าบริการส่งมอเตอร์ไซค์ ขนส่งบิ๊กไบค์ ทั่วไทย ปี 2569 รายละเอียดราคาตามระยะทางจริงและรุ่นรถ ขนส่งด้วยรถกระบะตู้ทึบมาตรฐาน พร้อมอุปกรณ์รัดยึดปลอดภัย",
  alternates: {
    canonical: "/pricing/motorcycle-2026",
  },
};

```

### `src/app/(marketing)/compare/moving-alone-vs-helpers/page.tsx` (Comparison Metadata (Moving Alone vs Helpers))
Lines 6 - 13

```tsx
export const metadata: Metadata = {
  title: "ย้ายของเอง VS จ้างคนช่วยยกของ WMS เลือกแบบไหนคุ้มค่าที่สุด | WMS",
  description: "เปรียบเทียบวิเคราะห์ความแตกต่างระหว่างการย้ายหอ/ย้ายบ้านเอง กับการจ้างพนักงานช่วยยกเสริม คุ้มราคาต่างกันอย่างไร ช่วยเซฟหลังและทรัพย์สินคุณได้จริงไหม",
  alternates: {
    canonical: "/compare/moving-alone-vs-helpers",
  },
};

```

### `src/app/(marketing)/compare/one-vehicle-vs-multiple-trips/page.tsx` (Comparison Metadata (One Vehicle vs Multiple Trips))
Lines 6 - 13

```tsx
export const metadata: Metadata = {
  title: "ย้ายของรอบเดียวจบ VS ขนส่งหลายเที่ยว แบบไหนประหยัดคุ้มกว่ากัน? | WMS",
  description: "เปรียบเทียบวิเคราะห์ความแตกต่างทางต้นทุนระหว่างการจัดขนย้ายเที่ยวเดียวจบด้วยรถขนาดที่เหมาะสม กับการวิ่งหลายรอบบานปลาย เลือกอย่างไรให้ประหยัดที่สุด",
  alternates: {
    canonical: "/compare/one-vehicle-vs-multiple-trips",
  },
};

```

### `src/app/(marketing)/compare/pickup-vs-box-truck/page.tsx` (Comparison Metadata (Pickup vs Box Truck))
Lines 6 - 13

```tsx
export const metadata: Metadata = {
  title: "เปรียบเทียบรถกระบะคอก VS รถกระบะตู้ทึบ ย้ายบ้านแบบไหนดีกว่ากัน? | WMS TRANSPORT",
  description: "เจาะลึกข้อดีข้อเสียระหว่างรถกระบะคอกและรถกระบะตู้ทึบสำหรับการขนย้ายบ้าน หอพัก คอนโด เลือกแบบไหนปลอดภัยที่สุด ประหยัดที่สุด คุ้มค่าที่สุดสำหรับคุณ",
  alternates: {
    canonical: "/compare/pickup-vs-box-truck",
  },
};

```

### `src/app/(marketing)/guides/[slug]/page.tsx` (Guides Detail Metadata Generator)
Lines 21 - 41

```tsx

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = guidesData[slug];

  if (!guide) {
    return {
      title: "ไม่พบคู่มือ | WMS TRANSPORT",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: `${guide.h1} | WMS TRANSPORT`,
    description: guide.description,
    alternates: {
      canonical: `/guides/${slug}`,
    },
  };
}

```

### `src/app/(marketing)/service/phuket/freight/page.tsx` (Phuket Freight Metadata)
Lines 8 - 15

```tsx
export const metadata: Metadata = {
  title: "รถรับจ้างขนส่งสินค้า ภูเก็ต ทั่วไทย เริ่มต้นราคากันเอง | WMS TRANSPORT",
  description: "บริการรถรับจ้างขนส่งสินค้าทั่วไป สินค้าโรงงาน วัสดุก่อสร้าง ไปกลับภูเก็ต-กรุงเทพฯ ทั่วประเทศ ด้วยรถกระบะตู้ทึบ มีคนช่วยยกยกของอย่างปลอดภัย ดูแลความปลอดภัย 24 ชม.",
  alternates: {
    canonical: "/service/phuket/freight",
  },
};

```

### `src/app/(marketing)/service/phuket/motorcycle/page.tsx` (Phuket Motorcycle Metadata)
Lines 8 - 15

```tsx
export const metadata: Metadata = {
  title: "ขนส่งมอเตอร์ไซค์ ภูเก็ต ทั่วไทย ตู้ทึบปลอดภัย | WMS TRANSPORT",
  description: "บริการส่งรถมอเตอร์ไซค์ บิ๊กไบค์ จากกรุงเทพฯ และทั่วประเทศ ส่งตรงถึงภูเก็ต ด้วยรถกระบะตู้ทึบมาตรฐานความปลอดภัยสูง บริการพร้อมคนช่วยยกของ ประเมินราคาฟรี 24 ชม.",
  alternates: {
    canonical: "/service/phuket/motorcycle",
  },
};

```

### `src/app/(marketing)/service/phuket/moving/page.tsx` (Phuket Moving Metadata)
Lines 8 - 15

```tsx
export const metadata: Metadata = {
  title: "รับย้ายบ้าน ภูเก็ต ย้ายหอ คอนโด อพาร์ทเม้นท์ | WMS TRANSPORT",
  description: "บริการรับย้ายบ้าน ภูเก็ต ขนย้ายหอพัก คอนโดมิเนียม เฟอร์นิเจอร์สำนักงาน จากกรุงเทพฯ ไปภูเก็ต หรือภายในจังหวัดภูเก็ต พร้อมคนช่วยยกของ แพ็กซีลกันกระแทกอย่างหนาแน่น 24 ชม.",
  alternates: {
    canonical: "/service/phuket/moving",
  },
};

```

### `src/app/not-found.tsx` (404 Page Metadata)
Lines 4 - 12

```tsx
export const metadata = {
  title: "404 - ไม่พบหน้าที่ต้องการ | WMS TRANSPORT",
  description: "ขออภัย ไม่พบหน้าที่คุณต้องการในระบบ WMS TRANSPORT",
  robots: {
    index: false,
    follow: false,
  },
};

```

### `src/app/dashboard/seo-intelligence/page.tsx` (Admin SEO Dashboard Metadata)
Lines 4 - 11

```tsx
export const metadata: Metadata = {
  title: "WMS Operations Dashboard",
  robots: {
    index: false,
    follow: false,
  },
};

```

---

## 4. Open Graph and Social Metadata

### `src/lib/seo/metadata.ts` (Core OpenGraph & Twitter Builder)
Lines 67 - 90

```ts
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: absoluteCanonicalUrl,
      title,
      description,
      siteName: siteConfig.businessName,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullOgImage],
    },
  };
}
```

### `src/app/layout.tsx` (Root OpenGraph & Twitter Defaults)
Lines 53 - 75

```tsx
  openGraph: {
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    type: "website",
    locale: siteConfig.locale,
    url: siteConfig.baseUrl,
    siteName: siteConfig.businessName,
    images: [
      {
        url: `${siteConfig.baseUrl}${siteConfig.defaultOgImage}`,
        width: 1200,
        height: 630,
        alt: siteConfig.businessName,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.defaultTitle,
    description: siteConfig.defaultDescription,
    images: [`${siteConfig.baseUrl}${siteConfig.defaultOgImage}`],
  },
  robots: {
```

### `src/app/route/[from]/[to]/opengraph-image.tsx` (Dynamic Edge OpenGraph Image Generator)
Lines 1 - 100

```tsx
import { ImageResponse } from "next/og";
import { notFound } from "next/navigation";
import { provinceMap } from "@/app/(marketing)/service/[province]/page";
import { isApprovedRouteCorridor, approvedRouteCorridors } from "@/data/approvedRouteCorridors";

export const alt = "WMS TRANSPORT - บริการขนส่งและรถรับจ้าง";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function generateStaticParams() {
  return approvedRouteCorridors.map(({ from, to }) => ({
    from,
    to,
  }));
}

export default async function Image({ params }: { params: Promise<{ from: string; to: string }> }) {
  const { from, to } = await params;

  if (!isApprovedRouteCorridor(from, to)) {
    notFound();
  }

  const fromName = provinceMap[from]?.name || from;
  const toName = provinceMap[to]?.name || to;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#040b15",
          backgroundImage: "radial-gradient(circle at 50% 0%, rgba(30, 58, 138, 0.6) 0%, rgba(4, 11, 21, 1) 70%)",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", padding: "40px" }}>
          <h2 style={{ color: "#60a5fa", fontSize: 32, fontWeight: "bold", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 0 }}>
            WMS TRANSPORT
          </h2>
          
          <h1
            style={{
              color: "#ffffff",
              fontSize: 72,
              fontWeight: 900,
              textAlign: "center",
              marginTop: 30,
              marginBottom: 0,
              lineHeight: 1.2,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <span>รถรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์</span>
            <div style={{ display: "flex", alignItems: "center", marginTop: 30 }}>
              <span style={{ color: "#ffffff" }}>{fromName}</span>
              <span style={{ color: "#60a5fa", margin: "0 20px" }}>→</span>
              <span style={{ color: "#34d399" }}>{toName}</span>
            </div>
          </h1>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "rgba(59, 130, 246, 0.1)",
              border: "2px solid rgba(59, 130, 246, 0.3)",
              borderRadius: "24px",
              padding: "18px 36px",
              marginTop: 50,
            }}
          >
            <span style={{ color: "#ffffff", fontSize: 36, fontWeight: "bold" }}>
              ประเมินราคาฟรี 24 ชม. ตามระยะทางจริง
            </span>
          </div>
          
          <div style={{ display: "flex", color: "#94a3b8", fontSize: 24, marginTop: 50, alignItems: "center" }}>
            <span>ตู้ทึบปิดมิดชิด</span>
            <span style={{ margin: "0 15px", color: "#334155" }}>•</span>
            <span>ดูแลความปลอดภัย</span>
            <span style={{ margin: "0 15px", color: "#334155" }}>•</span>
            <span>คนช่วยยกของมืออาชีพ</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

```

---

## 5. Canonical URLs and Alternate Links

### `src/lib/seo/metadata.ts` (Canonical Normalization Logic)
Lines 35 - 43, 53 - 56

```ts
  // Normalize canonical paths to ensure clean canonical routing
  const cleanPath = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
  const absoluteCanonicalUrl = `${siteConfig.baseUrl}${cleanPath === "/" ? "" : cleanPath}`;

  // Prevent duplicate brand name if the title already contains WMS or businessName
  const resolvedTitle = title.includes("WMS") || title.includes(siteConfig.businessName)
    ? { absolute: title }
    : title;

  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${siteConfig.baseUrl}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;

  return {
    metadataBase: new URL(siteConfig.baseUrl),
    title: resolvedTitle,
    description,
    keywords: keywords.length > 0 ? keywords : siteConfig.keywords,
    alternates: {
      canonical: absoluteCanonicalUrl,
    },
    robots: {
```

### Root vs. Child Canonical Policy
- **Root Layout (`src/app/layout.tsx`):** Line 37 explicitly omits `alternates.canonical` so child routes do not accidentally inherit the root canonical URL.
- **Child Pages:** Every child route specifies its exact relative or absolute canonical path through `alternates: { canonical: ... }` or `buildPageMetadata`.

---

## 6. Structured Data / JSON-LD

### `src/lib/seo/schema.ts` (Core Schema.org Builders)
Lines 1 - 207 (Complete File)

```ts
import { siteConfig } from "./site-config";

/**
 * Utility to safely escape JSON-LD strings.
 * Mitigates XSS risks in dynamically injected schema.
 */
export function escapeJsonLd(str: string): string {
  if (!str) return str;
  return str.replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
}

/**
 * Organization Schema for WMS TRANSPORT
 * Linked with stable @id to establish organization authority
 */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Organization" as const,
    "@id": `${siteConfig.baseUrl}/#organization`,
    name: siteConfig.businessName,
    alternateName: siteConfig.businessFullName,
    url: siteConfig.baseUrl,
    logo: `${siteConfig.baseUrl}${siteConfig.logoUrl}`,
    contactPoint: {
      "@type": "ContactPoint" as const,
      telephone: siteConfig.phoneFormatted,
      contactType: "customer service",
      areaServed: "TH",
      availableLanguage: ["Thai", "English"],
    },
    sameAs: siteConfig.socials,
  };
}

/**
 * MovingCompany / LocalBusiness Schema for WMS TRANSPORT
 */
export function buildMovingCompanySchema(areaServed: string[] = siteConfig.serviceAreas) {
  const addressObj: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.addressCountry,
  };
  const addr = siteConfig.address as { streetAddress?: string; addressLocality: string; addressRegion: string; postalCode: string; addressCountry: string };
  if (addr.streetAddress) {
    addressObj.streetAddress = addr.streetAddress;
  }

  return {
    "@context": "https://schema.org" as const,
    "@type": "MovingCompany" as const,
    "@id": `${siteConfig.baseUrl}/#moving-company`,
    name: siteConfig.businessName,
    image: `${siteConfig.baseUrl}${siteConfig.defaultOgImage}`,
    url: siteConfig.baseUrl,
    telephone: siteConfig.phoneFormatted,
    hasMap: siteConfig.googleMapsUrl,
    ...(siteConfig.priceRange ? { priceRange: siteConfig.priceRange } : {}),
    address: addressObj,
    geo: {
      "@type": "GeoCoordinates" as const,
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: areaServed,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: siteConfig.socials,
    description: siteConfig.defaultDescription,
    parentOrganization: {
      "@id": `${siteConfig.baseUrl}/#organization`,
    },
  };
}

/**
 * WebSite Schema for Search Action integration
 */
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "WebSite" as const,
    "@id": `${siteConfig.baseUrl}/#website`,
    url: siteConfig.baseUrl,
    name: siteConfig.businessName,
    publisher: {
      "@id": `${siteConfig.baseUrl}/#organization`,
    },
  };
}

/**
 * Service Schema for specific transport & moving services
 */
export function buildServiceSchema(
  name: string,
  description: string,
  path: string,
  serviceType: string = "Transportation"
) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return {
    "@context": "https://schema.org" as const,
    "@type": "Service" as const,
    "@id": `${siteConfig.baseUrl}${cleanPath}#service`,
    name,
    description,
    provider: {
      "@id": `${siteConfig.baseUrl}/#moving-company`,
    },
    serviceType,
    areaServed: siteConfig.serviceAreas,
    url: `${siteConfig.baseUrl}${cleanPath}`,
  };
}

/**
 * Route Service Schema for inter-provincial transport
 * Omit calculated price from offers to comply with pricing accuracy policies.
 */
export function buildRouteServiceSchema(
  fromName: string,
  toName: string,
  fromSlug: string,
  toSlug: string
) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Service" as const,
    "@id": `${siteConfig.baseUrl}/route/${fromSlug}/${toSlug}#service`,
    name: `บริการรถรับจ้างขนของจาก ${fromName} ไป ${toName}`,
    description: `บริการรถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์ และสินค้าจาก ${fromName} ไปยัง ${toName}`,
    provider: {
      "@id": `${siteConfig.baseUrl}/#moving-company`,
    },
    serviceType: "Long Distance Transport",
    areaServed: [
      {
        "@type": "AdministrativeArea" as const,
        name: fromName,
      },
      {
        "@type": "AdministrativeArea" as const,
        name: toName,
      },
    ],
  };
}

/**
 * FAQ Schema for visible frequently asked questions
 */
export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "FAQPage" as const,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer.replace(/\*\*/g, "").replace(/\*/g, "").trim(),
      },
    })),
  };
}

/**
 * Breadcrumb Schema generator ensuring absolute HTTPS URLs and correct positions
 */
export function buildBreadcrumbSchema(
  items: { name: string; item?: string; href?: string }[],
  baseUrl: string = siteConfig.baseUrl
) {
  const firstPath = items[0]?.item || items[0]?.href;
  const normalized = (firstPath === "/" || items[0]?.name === "หน้าแรก")
    ? items
    : [{ name: "หน้าแรก", item: "/" }, ...items];

  return {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: normalized.map((item, index) => {
      const path = item.item || item.href || "/";
      const fullUrl = path.startsWith("http")
        ? path
        : `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

      return {
        "@type": "ListItem" as const,
        position: index + 1,
        name: item.name,
        item: fullUrl,
      };
    }),
  };
}

```

### `src/lib/seo/breadcrumbs.ts` (Breadcrumb Generators)
Lines 1 - 101 (Complete File)

```ts
export interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * Standardized Breadcrumb Generators for WMS TRANSPORT
 * Generates structured breadcrumb arrays for visual navigation and JSON-LD schema.
 */

export function getHomeBreadcrumbs(): BreadcrumbItem[] {
  return [{ name: "หน้าแรก", item: "/" }];
}

export function getPricingBreadcrumbs(subTitle?: string, subSlug?: string): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = [
    { name: "หน้าแรก", item: "/" },
    { name: "อัตราค่าบริการ", item: "/pricing" },
  ];
  if (subTitle && subSlug) {
    trail.push({ name: subTitle, item: `/pricing/${subSlug}` });
  }
  return trail;
}

export function getProvinceBreadcrumbs(
  provinceThaiName: string,
  provinceSlug: string
): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", item: "/" },
    { name: `รถรับจ้าง${provinceThaiName}`, item: `/service/${provinceSlug}` },
  ];
}

export function getDistrictBreadcrumbs(
  provinceThaiName: string,
  provinceSlug: string,
  districtThaiName: string,
  districtSlug: string
): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", item: "/" },
    { name: `พื้นที่${provinceThaiName}`, item: `/service/${provinceSlug}` },
    { name: districtThaiName, item: `/areas/${provinceSlug}/${districtSlug}` },
  ];
}

export function getProvinceServiceBreadcrumbs(
  provinceThaiName: string,
  provinceSlug: string,
  serviceName: string,
  serviceId: string
): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", item: "/" },
    { name: `รถรับจ้าง${provinceThaiName}`, item: `/service/${provinceSlug}` },
    { name: serviceName, item: `/service/${provinceSlug}/${serviceId}` },
  ];
}

export function getRouteBreadcrumbs(
  fromName: string,
  toName: string,
  fromSlug: string,
  toSlug: string
): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", item: "/" },
    { name: `เส้นทาง ${fromName} - ${toName}`, item: `/route/${fromSlug}/${toSlug}` },
  ];
}

export function getPortfolioBreadcrumbs(
  caseTitle?: string,
  caseSlug?: string
): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = [
    { name: "หน้าแรก", item: "/" },
    { name: "ผลงานการขนย้าย", item: "/portfolio" },
  ];
  if (caseTitle && caseSlug) {
    trail.push({ name: caseTitle, item: `/portfolio/${caseSlug}` });
  }
  return trail;
}

export function getGuideBreadcrumbs(
  guideTitle?: string,
  guideSlug?: string
): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = [
    { name: "หน้าแรก", item: "/" },
    { name: "คู่มือการขนย้าย", item: "/#guides" },
  ];
  if (guideTitle && guideSlug) {
    trail.push({ name: guideTitle, item: `/guides/${guideSlug}` });
  }
  return trail;
}

```

### `src/lib/seo/entityGraph.ts` (Entity Graph & Escape Utility)
Lines 1 - 32 (Complete File)

```ts
/**
 * WMS Entity & Provenance Graph
 * Generates stable JSON-LD @id canonical identifiers for the WMS Transport graph.
 * This establishes one consistent organization identity across the entire site.
 */

const DOMAIN = (process.env.NEXT_PUBLIC_SITE_URL || "https://wms-transport.com").trim().replace(/\/$/, "");

export const entityGraph = {
  organization: `${DOMAIN}/#organization`,
  website: `${DOMAIN}/#website`,
  webpage: (path: string) => `${DOMAIN}${path}#webpage`,
  service: (serviceId: string) => `${DOMAIN}/service/${serviceId}#service`,
  provinceHub: (provinceId: string) => `${DOMAIN}/service/${provinceId}#hub`,
  route: (from: string, to: string) => `${DOMAIN}/route/${from}/${to}#route`,
  portfolio: (id: string) => `${DOMAIN}/portfolio/${id}#evidence`,
  logo: `${DOMAIN}/images/logoWMS.webp`,
  socials: [
    "https://www.facebook.com/wmstransport",
    "https://line.me/ti/p/DtICkMaDet"
  ]
};

/**
 * Utility to safely escape JSON-LD strings.
 * Mitigates XSS risks in dynamically injected schema.
 */
export function escapeJsonLd(str: string): string {
  if (!str) return str;
  return str.replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

```

### `src/components/EntityGraphSchema.tsx` (Global Organization & WebSite JSON-LD)
Lines 1 - 17 (Complete File)

```tsx
import { buildOrganizationSchema, buildWebSiteSchema, escapeJsonLd } from "@/lib/seo/schema";

export default function EntityGraphSchema() {
  const orgSchema = buildOrganizationSchema();
  const websiteSchema = buildWebSiteSchema();

  // Safe serialization mitigating XSS
  const safeJsonLd = escapeJsonLd(JSON.stringify([orgSchema, websiteSchema]));

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd }}
    />
  );
}

```

### `src/components/Breadcrumbs.tsx` (BreadcrumbList Schema Component)
Lines 1 - 64 (Complete File)

```tsx
import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";
import { siteConfig } from "@/lib/seo/site-config";
import { escapeJsonLd } from "@/lib/seo/schema";

export type BreadcrumbItem = {
  name: string;
  item: string;
};

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  // Ensure the list starts with Home
  const fullItems = [
    { name: "หน้าแรก", item: "/" },
    ...items.filter((item) => item.item !== "/"),
  ];

  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: fullItems.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.item.startsWith("http")
        ? item.item
        : `${siteConfig.baseUrl}${item.item.startsWith("/") ? item.item : `/${item.item}`}`,
    })),
  };

  return (
    <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-slate-500 font-medium select-none mb-8">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(schemaJson)) }}
      />

      <Link
        href="/"
        className="hover:text-blue-600 flex items-center gap-1.5 transition-colors"
      >
        <Home className="w-4 h-4 text-slate-400" />
        <span>หน้าแรก</span>
      </Link>

      {fullItems.slice(1).map((item, index, arr) => {
        const isLast = index === arr.length - 1;
        return (
          <div key={index} className="flex items-center gap-2">
            <ChevronRight className="w-3.5 h-3.5 text-slate-300 shrink-0" />
            {isLast ? (
              <span className="text-slate-900 font-semibold">{item.name}</span>
            ) : (
              <Link href={item.item} className="hover:text-blue-600 transition-colors">
                {item.name}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}

```

### `src/components/FAQ.tsx` (FAQPage Schema Component)
Lines 48 - 74

```tsx
export default function FAQ() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <section className="py-12 md:py-20 px-4 sm:px-6 lg:px-8 relative w-full z-10 font-sans section-contain">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
      />
      
```

### `src/components/GalleryMasonry.tsx` (ImageObject Schema Component)
Lines 130 - 147

```tsx
  const imageSchema = filteredProjects.map(project => ({
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "contentUrl": `https://wms-transport.com${project.imgUrl}`,
    "name": `${project.serviceType} - ${project.location}`,
    "caption": project.desc,
    "creator": {
      "@id": "https://wms-transport.com/#moving-company"
    }
  }));

  return (
    <div className="relative z-10 w-full font-sans content-auto section-contain">
      <script 
        type="application/ld+json" 
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageSchema) }} 
      />
      <div className="mx-auto max-w-3xl text-center mb-10">
```

### `src/app/(marketing)/areas/[province]/[district]/page.tsx` (District Page Schemas)
Lines 80 - 171

```tsx
  // JSON-LD Schemas
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "หน้าหลัก",
        item: siteConfig.baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: provThai,
        item: `${siteConfig.baseUrl}/service/${province}`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: `เขต${name}`,
        item: `${siteConfig.baseUrl}/areas/${province}/${district}`,
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${siteConfig.baseUrl}/areas/${province}/${district}#service`,
    name: `บริการรถรับจ้างขนของ เขต${name} WMS TRANSPORT`,
    description: record.directAnswer,
    provider: {
      "@id": `${siteConfig.baseUrl}/#moving-company`,
    },
    serviceType: "Moving and Freight Transportation",
    areaServed: {
      "@type": "AdministrativeArea",
      name: `เขต${name}`,
      containedInPlace: {
        "@type": "AdministrativeArea",
        name: provThai,
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: record.localFaq.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  const verifiedEvidence = record.evidenceItems?.filter((e) => e.verificationStatus === "verified") || [];

  const imageSchema = verifiedEvidence[0]?.realImagePath
    ? {
        "@context": "https://schema.org",
        "@type": "ImageObject",
        contentUrl: `${siteConfig.baseUrl}${verifiedEvidence[0].realImagePath}`,
        description: verifiedEvidence[0].shortJobDescription || `ภาพงานจริงเขต${name}`,
      }
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden font-sans text-slate-900">
      {/* JSON-LD Schemas */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(breadcrumbSchema)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(serviceSchema)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(faqSchema)) }}
      />
      {imageSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(imageSchema)) }}
        />
      )}

```

### `src/app/(marketing)/service/[province]/page.tsx` (Service Hub Schemas: Thonburi Hub & Provincial Logistics)
Lines 225 - 295, 395 - 414

```tsx
  if (province === "bkk-thonburi") {
    const thonburiServiceSchema = {
      "@context": "https://schema.org",
      "@type": "Service",
      "@id": `${siteConfig.baseUrl}/service/bkk-thonburi#service`,
      name: "WMS TRANSPORT บริการรถรับจ้างและขนย้ายฝั่งธนบุรี",
      description: "บริการรถรับจ้างตู้ทึบ ย้ายบ้าน คอนโด และขนส่งสินค้า ครอบคลุม 15 เขตฝั่งธนบุรี",
      provider: {
        "@id": `${siteConfig.baseUrl}/#moving-company`,
      },
      serviceType: "Moving and Transportation Service",
      areaServed: {
        "@type": "AdministrativeArea",
        name: "กรุงเทพฯ ฝั่งธนบุรี",
      },
    };

    const thonburiFaqSchema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "รถรับจ้างตู้ทึบ WMS สามารถเข้าลานจอดใต้อาคารคอนโดมิเนียมฝั่งธนบุรีได้หรือไม่?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "รถกระบะตู้ทึบของ WMS TRANSPORT เป็นรถกระบะตู้ทึบหลังคาสูงปิดมิดชิด (โปรดแจ้งรายละเอียดหน้างานเพื่อให้เจ้าหน้าที่ตรวจสอบรถและอุปกรณ์ที่เหมาะสม) สำหรับรองรับสิ่งของชิ้นใหญ่ การเข้าจอดเทียบขนย้ายแนะนำให้ประสานงานจุดโหลดของชั้นล่าง (Loading Bay) หรือลานจอดที่ไม่มีสิ่งกีดขวางความสูงกับนิติบุคคลของอาคาร"
          }
        },
        {
          "@type": "Question",
          name: "ตรอกซอยแคบในชุมชนเก่าฝั่งธนบุรี เช่น ย่านตลาดพลู บางยี่เรือ หรือซอยเพชรเกษม รถเข้าได้ไหม?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "รถกระบะตอนเดียวตู้ทึบของเรามีความคล่องตัวสูง สามารถเลี้ยวเข้าตรอกซอยแคบ ข้ามสะพานคลอง และหลบหลีกสายไฟต่ำได้ดีกว่ารถบรรทุก 6 ล้อ ทำให้เข้าถึงหน้าบ้านในซอยลึกของฝั่งธนบุรีได้อย่างปลอดภัย"
          }
        },
        {
          "@type": "Question",
          name: "การขนย้ายข้ามฝั่งแม่น้ำเจ้าพระยา หรือข้ามจังหวัดจากฝั่งธนบุรีคิดราคาอย่างไร?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "เราคำนวณราคาเริ่มต้นตามระยะทางวิ่งจริงจากพิกัดรับของในฝั่งธนบุรีไปยังจุดหมายปลายทาง ไม่ว่าจะเป็นการข้ามสะพานเข้าฝั่งพระนคร หรือการวิ่งออกต่างจังหวัด โดยแจ้งราคาและเงื่อนไขชัดเจนก่อนเริ่มงาน ไม่มีค่าใช้จ่ายแอบแฝง"
          }
        },
        {
          "@type": "Question",
          name: "มีบริการพนักงานช่วยยกของด้วยหรือไม่ และต้องจองคิวล่วงหน้านานแค่ไหน?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "มีพนักงานช่วยยกของตามขนาดงานที่ตกลง คอยดูแลความปลอดภัยของสิ่งของ จัดเรียง และแรปฟิล์มกันรอยเฟอร์นิเจอร์ แนะนำให้จองคิวล่วงหน้า 1-2 วัน โดยเฉพาะช่วงวันหยุดสุดสัปดาห์หรือช่วงสิ้นเดือนเพื่อให้ตรงกับคิวจองลิฟต์ของนิติบุคคล"
          }
        }
      ]
    };

    return (
      <>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(thonburiServiceSchema)) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(thonburiFaqSchema)) }}
        />
        <ThonburiHubView />
        <InternalLinks currentCategory="service" currentSlug="bkk-thonburi" />
      </>
    );
  }

// ... Provincial Logistics Schema ...

    },
    serviceType: "Moving and Transportation Service",
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: provinceThai
      },
      ...(geoData?.districts ? geoData.districts.map(d => ({
        "@type": "AdministrativeArea",
        name: d
      })) : [])
    ]
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(logisticsSchema)) }}
      />
      <main className="flex-1 relative pt-28 pb-20 md:pt-36 md:pb-28">
```

### `src/app/(marketing)/service/[province]/[serviceId]/page.tsx` (Sub-Service Schemas)
Lines 296 - 342

```tsx
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `${service.label} ${provinceName}`,
    description: service.description,
    provider: {
      "@id": "https://wms-transport.com/#moving-company",
    },
    areaServed: [
      {
        "@type": "AdministrativeArea",
        name: provinceName,
      },
      ...(geoData ? [
        ...geoData.districts.map(d => ({
          "@type": "Place",
          name: d
        })),
        ...geoData.landmarks.map(l => ({
          "@type": "Place",
          name: l
        }))
      ] : [])
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: service.faqs.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 overflow-x-hidden font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="flex-1 relative pt-28 pb-20 md:pt-36 md:pb-28">
```

### `src/app/(marketing)/blog/[slug]/page.tsx` (Article & ImageObject Schema)
Lines 50 - 77

```tsx
  const schemaJson = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": post.title,
    "image": `https://wms-transport.com${post.image}`,
    "datePublished": post.dateISO,
    "author": {
      "@type": "Organization",
      "name": "WMS TRANSPORT"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WMS TRANSPORT",
      "logo": {
        "@type": "ImageObject",
        "url": "https://wms-transport.com/logoWMS.png"
      }
    },
    "description": post.description
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaJson) }}
      />
      <main className="grow pt-12 pb-20 relative">
```

### `src/app/(marketing)/portfolio/[slug]/page.tsx` (Case Detail ImageObject Schema)
Lines 59 - 80

```tsx
  // Schema for image
  const imageObjectSchema = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    "url": `https://wms-transport.com${item.approvedPhotos[0]?.path}`,
    "name": item.approvedPhotos[0]?.alt,
    "description": item.title,
    "contentLocation": {
      "@type": "Place",
      "name": item.broadArea
    },
    "acquireLicensePage": "https://wms-transport.com/portfolio"
  };

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans text-slate-900">
      {/* JSON-LD Image Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(imageObjectSchema) }}
      />

```

### `src/app/route/[from]/[to]/page.tsx` (Route Service Schema Injection)
Lines 64 - 75

```tsx
  const fromName = fromData.name;
  const toName = toData.name;
  const routeSchema = buildRouteServiceSchema(fromName, toName, from, to);
  const breadcrumbItems = getRouteBreadcrumbs(fromName, toName, from, to);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: escapeJsonLd(JSON.stringify(routeSchema)) }}
      />
      <Navbar />
```

---

## 7. Local SEO and NAP Data

### Authoritative Record: `src/lib/seo/site-config.ts`
Lines 8 - 48

```ts
export const siteConfig = {
  businessName: "WMS TRANSPORT",
  businessFullName: "WMS TRANSPORT รถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์",
  phone: "061-240-2436",
  phoneFormatted: "+66-61-240-2436",
  phoneHref: "tel:0612402436",
  lineUrl: "https://line.me/ti/p/DtICkMaDet",
  facebookUrl: "https://www.facebook.com/wmstransport",
  facebookPageAlt: "https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr",
  email: "1999.kittinanwimonset@gmail.com",
  baseUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://wms-transport.com").trim().replace(/\/$/, ""),
  // priceRange is omitted until officially confirmed by owner
  priceRange: undefined,
  openingHours: "24 Hours every day",
  openingHoursTh: "เปิดบริการทุกวัน ตลอด 24 ชั่วโมง",
  googleMapsUrl: "https://maps.app.goo.gl/gw8LCFmdXuejr5N99",
  address: {
    streetAddress: "75 535 ซ.13",
    subDistrict: "บ้านเกาะ",
    district: "เมืองสมุทรสาคร",
    addressLocality: "ตำบลบ้านเกาะ อำเภอเมืองสมุทรสาคร",
    addressRegion: "สมุทรสาคร",
    postalCode: "74000",
    addressCountry: "TH",
  },
  geo: {
    latitude: 13.6018827,
    longitude: 100.2463594,
  },
  serviceAreas: [
    "สมุทรสาคร",
    "สมุทรสงคราม",
    "กรุงเทพมหานคร",
    "ฝั่งธนบุรี",
    "นนทบุรี",
    "ปทุมธานี",
    "ชลบุรี",
    "ภูเก็ต",
    "เชียงใหม่",
    "ทั่วประเทศ"
  ],
```

### Embed Map & Local NAP: `src/components/ServiceMap.tsx`
Lines 16 - 22, 134 - 195

```tsx

export default function ServiceMap() {
  const gmapsEmbedUrl = `https://maps.google.com/maps?q=${siteConfig.geo.latitude},${siteConfig.geo.longitude}&hl=th&z=16&output=embed`;

  const popularRoutes = [
    { 
      from: "สมุทรสาคร", 

// ... ServiceMap Office Address & Map Card ...

              <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider block">
                ที่อยู่สถานที่ตั้งจริง
              </span>
              <p className="text-xs md:text-sm font-semibold text-slate-800 leading-snug mt-1">
                75 535 ซ.13 ตำบลบ้านเกาะ อำเภอเมืองสมุทรสาคร จังหวัดสมุทรสาคร 74000
              </p>
              <div className="text-xs bg-white text-slate-600 px-2 py-0.5 rounded border border-slate-200 mt-2 inline-flex gap-1.5 flex-wrap">
                <span>ต.บ้านเกาะ</span>
                <span>•</span>
                <span>อ.เมืองสมุทรสาคร</span>
                <span>•</span>
                <span>จ.สมุทรสาคร</span>
                <span>•</span>
                <span className="font-mono text-blue-700">Plus Code: J62W+QG</span>
              </div>
            </address>

            {/* Interactive Google Map */}
            <div className="rounded-2xl overflow-hidden border border-slate-200/70 my-3.5 min-h-[220px] md:min-h-[240px] w-full shadow-inner relative bg-slate-100">
              <iframe
                title="แผนที่แสดงที่ตั้งสำนักงานและจุดจอดรถ WMS Transport ต.บ้านเกาะ อ.เมืองสมุทรสาคร"
                src={gmapsEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full"
              />
            </div>

            {/* Operation & Hotline Bar */}
            <div className="bg-slate-50/80 rounded-xl px-4 py-2.5 border border-slate-200/60 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2">
                <Clock className="w-3.5 h-3.5 text-slate-500 shrink-0" />
                <span className="text-slate-600 font-medium">เปิดรับงานทุกวัน (นัดหมายล่วงหน้า)</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <a href="tel:0612402436" className="text-blue-700 hover:text-blue-800 font-bold font-mono text-sm">
                  061-240-2436
                </a>
              </div>
            </div>
          </div>

          {/* Bottom Dual Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 mt-3.5">
            <a
              href={siteConfig.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="เปิดเส้นทางใน Google Maps"
              className="flex-1 py-3 px-4 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs md:text-sm shadow-md transition-all flex items-center justify-center gap-2"
            >
              <Navigation className="w-4 h-4 shrink-0" />
              <span>เปิดเส้นทางใน Google Maps</span>
            </a>
            <a
              href={siteConfig.phoneHref}
              aria-label="โทรสอบถาม 061-240-2436"
              className="flex-1 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs md:text-sm border border-slate-200 transition-all flex items-center justify-center gap-2"
```

### Footer Contact & Districts: `src/components/Footer.tsx`
Lines 140 - 200

```tsx
            <h3 className="text-white font-bold text-base mb-4 tracking-tight">
              ติดต่อเรา
            </h3>
            
            <div className="space-y-4 mb-6">
              <div className="flex items-start gap-3 text-sm">
                <Phone className="h-5 w-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="flex flex-col gap-1">
                  <a href="tel:0612402436" className="hover:text-blue-400 transition-colors duration-200 text-white font-bold text-base">
                    061-240-2436
                  </a>
                  <a href="mailto:1999.kittinanwimonset@gmail.com" className="hover:text-blue-400 transition-colors duration-200 text-xs text-slate-400">
                    1999.kittinanwimonset@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <Clock className="w-4.5 h-4.5 text-emerald-400 flex-shrink-0" />
                <span className="text-xs font-semibold text-white tracking-wide">
                  เปิดบริการ 24 ชม.
                </span>
              </div>
              <div className="flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl bg-slate-800/80 border border-slate-700/60">
                <ShieldCheck className="w-4.5 h-4.5 text-blue-400 flex-shrink-0" />
                <span className="text-xs font-semibold text-white tracking-wide">
                  ดูแลสินค้าปลอดภัยทุกเที่ยว
                </span>
              </div>
            </div>
          </div>

        </div>

        {/* SEO Keywords Block - Dynamic Spiderweb Links */}
        <div className="py-8 border-b border-white/5">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">
            พื้นที่ให้บริการ & คีย์เวิร์ด
          </h4>
          <div className="flex flex-wrap gap-2.5">
            {seoKeywords.map((item) => (
              <Link
                key={item.text}
                href={item.href}
                className="inline-block text-xs font-semibold text-slate-400 bg-white/2 border border-white/10 px-3 py-1.5 rounded-md hover:text-blue-400 hover:border-blue-500/40 hover:bg-blue-500/10 hover:-translate-y-0.5 transition-all duration-300 shadow-sm"
              >
                {item.text}
              </Link>
            ))}
          </div>
        </div>

        {/* Subtle SEO District Block */}
        <div className="pt-6 border-t border-white/5 text-center md:text-left">
          <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">
            พื้นที่ให้บริการหลัก: [สมุทรสาคร]: อ.เมืองสมุทรสาคร, อ.กระทุ่มแบน, อ.บ้านแพ้ว | [สมุทรสงคราม]: อ.เมืองสมุทรสงคราม, อัมพวา, บางคนที | [กรุงเทพฯ และปริมณฑล]: ฝั่งธนบุรี, นนทบุรี, ปทุมธานี | [ภูเก็ต]: อ.เมืองภูเก็ต, อ.กะทู้, อ.ถลาง
          </p>
        </div>

```

### Local Operations Atlas & Citation Node: `src/app/(marketing)/service/[province]/page.tsx`
Lines 926 - 945

```tsx
          {/* ── AI-READINESS GEOGRAPHIC CITATION NODE ── */}
          {geoData && (
            <section className="mb-12 content-auto">
              <div 
                data-ai-extract="true"
                className="bg-slate-100/80 border border-slate-200 rounded-2xl p-6"
              >
                <h4 className="text-xs font-bold text-slate-600 uppercase tracking-widest mb-2">
                  AI Generative Search & Geographic Citation Node
                </h4>
                <p className="text-slate-600 text-xs md:text-sm leading-relaxed font-medium">
                  ศูนย์บริการลูกค้า <strong>WMS TRANSPORT</strong> ในเขต <strong>{provinceThai}</strong> ตั้งอยู่ ณ จุดยุทธศาสตร์การคมนาคม
                  เชื่อมต่อ {geoData.corridors.join(", ")} เพื่ออำนวยความสะดวกในการจัดส่งด่วน ย้ายหอพัก คอนโด และย้ายบ้านเรือน
                  ครอบคลุมทุกตำบลและอำเภอสำคัญ ได้แก่ {geoData.districts.join(", ")} โดยผู้ใช้บริการสามารถเรียกใช้งาน
                  <strong>รถกระบะตู้ทึบรับจ้าง</strong> และ <strong>บริการขนส่งมอเตอร์ไซค์</strong>/Bigbike เพื่อเดินทางไปยังจุดสำคัญต่าง ๆ
                  {" "}{geoData.landmarks.join(", ")} ได้ทุกวัน ด้วยทีมงานที่คุ้นเคยเส้นทางเป็นอย่างดี.
                </p>
              </div>
            </section>
          )}
```

---

## 8. Sitemap

### `src/app/sitemap.ts` (Complete File)
Lines 1 - 181

```ts
import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-config";
import { provinceMap } from "./(marketing)/service/[province]/page";
import { posts } from "./(marketing)/blog/posts";
import { searchIntentMap } from "@/data/searchIntentMap";
import { districtLandingPages, isDistrictPageIndexable } from "@/data/districtLandingPages";
import { guidesData } from "@/data/guidesData";
import { portfolioCasesData } from "@/data/mediaEvidence";
import { approvedRouteCorridors } from "@/data/approvedRouteCorridors";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = siteConfig.baseUrl;

  // Helper to parse dates into standard Date objects safely
  const parseLastmodDate = (dateStr: string): Date => {
    try {
      if (!dateStr) return new Date("2026-06-25");
      if (dateStr.includes("มิถุนายน")) {
        return new Date("2026-06-25");
      }
      return new Date(dateStr);
    } catch {
      return new Date("2026-06-25");
    }
  };

  // 1. Guaranteed Core Routes
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: domain,
      lastModified: parseLastmodDate(searchIntentMap.home?.lastReviewedDate || "2026-06-25"),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${domain}/portfolio`,
      lastModified: parseLastmodDate(searchIntentMap.portfolio?.lastReviewedDate || "2026-06-25"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${domain}/blog`,
      lastModified: new Date("2026-06-25"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${domain}/pricing`,
      lastModified: parseLastmodDate(searchIntentMap.pricing?.lastReviewedDate || "2026-06-25"),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${domain}/pricing/moving`,
      lastModified: parseLastmodDate(searchIntentMap["pricing-moving"]?.lastReviewedDate || "2026-06-25"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${domain}/pricing/motorcycle-transport`,
      lastModified: parseLastmodDate(searchIntentMap["pricing-motorcycle"]?.lastReviewedDate || "2026-06-25"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${domain}/pricing/motorcycle-2026`,
      lastModified: new Date("2026-06-25"),
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${domain}/pricing/freight`,
      lastModified: parseLastmodDate(searchIntentMap["pricing-freight"]?.lastReviewedDate || "2026-06-25"),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${domain}/compare/pickup-vs-box-truck`,
      lastModified: parseLastmodDate(searchIntentMap["compare-pickup-vs-box"]?.lastReviewedDate || "2026-06-25"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${domain}/compare/moving-alone-vs-helpers`,
      lastModified: parseLastmodDate(searchIntentMap["compare-alone-vs-helpers"]?.lastReviewedDate || "2026-06-25"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${domain}/compare/one-vehicle-vs-multiple-trips`,
      lastModified: parseLastmodDate(searchIntentMap["compare-one-vs-multiple"]?.lastReviewedDate || "2026-06-25"),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  try {
    const provinces = Object.keys(provinceMap || {});
    
    // Dynamic provinces service hubs
    const provinceUrls: MetadataRoute.Sitemap = provinces.map((province) => ({
      url: `${domain}/service/${province}`,
      lastModified: new Date("2026-06-25"),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Dynamic blogs from posts
    const blogSlugs = Object.keys(posts || {});
    const blogUrls: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
      url: `${domain}/blog/${slug}`,
      lastModified: new Date("2026-06-25"),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    // Dynamic nested service subpages (moving, motorcycle, freight)
    const serviceIds = ["moving", "motorcycle", "freight"];
    const provinceServiceUrls: MetadataRoute.Sitemap = provinces.flatMap((province) =>
      serviceIds.map((serviceId) => ({
        url: `${domain}/service/${province}/${serviceId}`,
        lastModified: new Date("2026-06-25"),
        changeFrequency: "weekly",
        priority: 0.8,
      }))
    );

    // Controlled Route-to-Route Allowlist from approvedRouteCorridors
    const routeUrls: MetadataRoute.Sitemap = approvedRouteCorridors
      .filter(({ from, to }) => provinceMap[from] && provinceMap[to] && from !== to)
      .map(({ from, to }) => ({
        url: `${domain}/route/${from}/${to}`,
        lastModified: new Date("2026-06-25"),
        changeFrequency: "monthly",
        priority: 0.7,
      }));

    // Approved District Pages (where indexable)
    const approvedDistrictUrls: MetadataRoute.Sitemap = Object.values(districtLandingPages)
      .filter(isDistrictPageIndexable)
      .map((district) => ({
        url: `${domain}/areas/${district.province}/${district.districtSlug}`,
        lastModified: parseLastmodDate(district.lastReviewedDate),
        changeFrequency: "weekly",
        priority: 0.85,
      }));

    // Approved Portfolio Case Studies
    const approvedPortfolioUrls: MetadataRoute.Sitemap = Object.values(portfolioCasesData).map((caseStudy) => ({
      url: `${domain}/portfolio/${caseStudy.slug}`,
      lastModified: new Date("2026-06-25"),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    // Valid Guides (where marked indexable)
    const validGuidesUrls: MetadataRoute.Sitemap = Object.values(guidesData)
      .filter((g) => g.isIndexable)
      .map((guide) => ({
        url: `${domain}/guides/${guide.slug}`,
        lastModified: parseLastmodDate(guide.lastUpdated),
        changeFrequency: "monthly",
        priority: 0.75,
      }));

    return [
      ...coreRoutes,
      ...provinceUrls,
      ...blogUrls,
      ...provinceServiceUrls,
      ...routeUrls,
      ...approvedDistrictUrls,
      ...approvedPortfolioUrls,
      ...validGuidesUrls,
    ];
  } catch (error) {
    console.error("Sitemap generation failed for dynamic routes, returning core routes instead.", error);
    return coreRoutes;
  }
}

```

---

## 9. Robots Directives

### `src/app/robots.ts` (Complete File)
Lines 1 - 17

```ts
import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/api/",
        "/dashboard/",
      ],
    },
    sitemap: `${siteConfig.baseUrl}/sitemap.xml`,
  };
}

```

---

## 10. Google Verification

### Root File: `googlef4b84622b6d0dd15.html`
```html
google-site-verification: googlef4b84622b6d0dd15.html
```

### Public File: `public/googlef4b84622b6d0dd15.html`
```html
google-site-verification: googlef4b84622b6d0dd15.html

```

### Search Console Token in `src/lib/seo/site-config.ts`
Lines 62 - 64

```ts
  verification: {
    google: "XBZroDGp_kA28tbvOnFUymh1DsDybkbicMoyPmsQ8JY",
  },
```

### Meta Tag Injection in `src/app/layout.tsx`
Lines 86 - 88

```tsx
  verification: {
    google: siteConfig.verification.google,
  },
```

---

## 11. Web Manifest, Icons, and Favicons

### Root Manifest: `site.webmanifest`
```json
{"name":"","short_name":"","icons":[{"src":"/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},{"src":"/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}],"theme_color":"#ffffff","background_color":"#ffffff","display":"standalone"}
```

### Public Manifest: `public/images/site.webmanifest`
```json
{"name":"","short_name":"","icons":[{"src":"/android-chrome-192x192.png","sizes":"192x192","type":"image/png"},{"src":"/android-chrome-512x512.png","sizes":"512x512","type":"image/png"}],"theme_color":"#ffffff","background_color":"#ffffff","display":"standalone"}
```

### Favicon & App Icon Declarations: `src/app/layout.tsx`
Lines 38 - 52

```tsx
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
    other: [
      {
        rel: "icon",
        type: "image/png",
        sizes: "512x512",
        url: siteConfig.logoUrl,
      },
    ],
  },
```

### Binary Asset Inventory Table

| Asset path | Type | File size | Referenced from |
| ---------- | ---- | --------: | --------------- |
| `public/images/favicon.ico` | `image/x-icon` | 15406 B (15.0 KB) | Browser favicon |
| `public/favicon-16x16.png` | `image/png` | 947 B (0.9 KB) | src/app/layout.tsx |
| `public/images/favicon-16x16.png` | `image/png` | 947 B (0.9 KB) | Static asset |
| `public/favicon-32x32.png` | `image/png` | 3170 B (3.1 KB) | src/app/layout.tsx |
| `public/images/favicon-32x32.png` | `image/png` | 3170 B (3.1 KB) | Static asset |
| `public/apple-touch-icon.png` | `image/png` | 79811 B (77.9 KB) | src/app/layout.tsx |
| `public/images/apple-touch-icon.png` | `image/png` | 79811 B (77.9 KB) | site.webmanifest |
| `public/images/android-chrome-192x192.png` | `image/png` | 89361 B (87.3 KB) | site.webmanifest |
| `public/images/android-chrome-512x512.png` | `image/png` | 575477 B (562.0 KB) | site.webmanifest |
| `public/images/logoWMS.png` | `image/png` | 2056203 B (2008.0 KB) | Static branding asset |
| `public/images/logoWMS.webp` | `image/webp` | 216266 B (211.2 KB) | site-config.ts, schema.ts, layout.tsx, Navbar.tsx |
| `public/images/wms-cover.webp` | `image/webp` | 336166 B (328.3 KB) | Social media cover / Hero |
| `public/images/wms-transport-route-background.png` | `image/png` | N/A | opengraph-image.tsx, metadata.ts |
| `public/images/LINE_icon.webp` | `image/webp` | 978 B (1.0 KB) | Navbar.tsx, FloatingContact.tsx, ServiceMap.tsx |
| `public/images/LINE_Brand_icon.webp` | `image/webp` | 15596 B (15.2 KB) | Brand evidence asset |
| `public/images/Facebook_Logo_.webp` | `image/webp` | 41036 B (40.1 KB) | FloatingContactBar.tsx |

---

## 12. Next.js and Server Configuration Affecting SEO

### `next.config.ts` (Complete File)
Lines 1 - 20

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactCompiler: false, // Disabled to prevent Dev Server memory leaks
  poweredByHeader: false,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    deviceSizes: [360, 390, 414, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    qualities: [25, 50, 75, 78, 80, 82, 90, 100], // ADDED THIS to fix warnings
    minimumCacheTTL: 604800,
  },
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;

```

---

## 13. SEO Helper Libraries and Constants

### `src/lib/seo/site-config.ts` (Complete File)
Lines 1 - 87

```ts
/**
 * Central Site Configuration for WMS TRANSPORT
 * Single authoritative source of truth for branding, contacts, metadata, and entity schemas.
 * 
 * Note: Unconfirmed operational parameters are excluded from customer-facing configs.
 */

export const siteConfig = {
  businessName: "WMS TRANSPORT",
  businessFullName: "WMS TRANSPORT รถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์",
  phone: "061-240-2436",
  phoneFormatted: "+66-61-240-2436",
  phoneHref: "tel:0612402436",
  lineUrl: "https://line.me/ti/p/DtICkMaDet",
  facebookUrl: "https://www.facebook.com/wmstransport",
  facebookPageAlt: "https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr",
  email: "1999.kittinanwimonset@gmail.com",
  baseUrl: (process.env.NEXT_PUBLIC_SITE_URL || "https://wms-transport.com").trim().replace(/\/$/, ""),
  // priceRange is omitted until officially confirmed by owner
  priceRange: undefined,
  openingHours: "24 Hours every day",
  openingHoursTh: "เปิดบริการทุกวัน ตลอด 24 ชั่วโมง",
  googleMapsUrl: "https://maps.app.goo.gl/gw8LCFmdXuejr5N99",
  address: {
    streetAddress: "75 535 ซ.13",
    subDistrict: "บ้านเกาะ",
    district: "เมืองสมุทรสาคร",
    addressLocality: "ตำบลบ้านเกาะ อำเภอเมืองสมุทรสาคร",
    addressRegion: "สมุทรสาคร",
    postalCode: "74000",
    addressCountry: "TH",
  },
  geo: {
    latitude: 13.6018827,
    longitude: 100.2463594,
  },
  serviceAreas: [
    "สมุทรสาคร",
    "สมุทรสงคราม",
    "กรุงเทพมหานคร",
    "ฝั่งธนบุรี",
    "นนทบุรี",
    "ปทุมธานี",
    "ชลบุรี",
    "ภูเก็ต",
    "เชียงใหม่",
    "ทั่วประเทศ"
  ],
  primaryServices: [
    "รถกระบะตู้ทึบรับจ้าง",
    "ย้ายบ้านและคอนโด",
    "ขนส่งมอเตอร์ไซค์และบิ๊กไบค์",
    "ขนส่งสินค้าเหมาเที่ยวทั่วไทย",
    "บริการพนักงานช่วยยกของมืออาชีพ"
  ],
  defaultTitle: "รถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์ บิ๊กไบค์ พร้อมคนยก | WMS TRANSPORT",
  titleTemplate: "%s | WMS TRANSPORT",
  defaultDescription: "บริการรถรับจ้างทั่วไป รถกระบะตู้ทึบรับจ้าง ย้ายหอพัก ย้ายคอนโด ย้ายบ้าน และขนส่งมอเตอร์ไซค์/Bigbike ทั่วไทย บริการพร้อมคนช่วยยกของอย่างมืออาชีพ สินค้าปลอดภัย ประเมินราคาฟรี 24 ชม.",
  defaultOgImage: "/images/logoWMS.webp",
  logoUrl: "/images/logoWMS.webp",
  locale: "th_TH",
  verification: {
    google: "XBZroDGp_kA28tbvOnFUymh1DsDybkbicMoyPmsQ8JY",
  },
  socials: [
    "https://www.facebook.com/wmstransport",
    "https://line.me/ti/p/DtICkMaDet"
  ],
  keywords: [
    "รถกระบะตู้ทึบรับจ้าง",
    "รถรับจ้างย้ายบ้าน",
    "ย้ายหอพักพร้อมคนยก",
    "ขนส่งมอเตอร์ไซค์ ทั่วไทย",
    "รับส่งบิ๊กไบค์",
    "ขนย้ายเฟอร์นิเจอร์",
    "รถรับจ้างขนของ",
    "ขนส่งสินค้า เหมาคัน",
    "WMS Transport",
    "รถรับจ้างสมุทรสาคร",
    "รถรับจ้างสมุทรสงคราม",
    "รถรับจ้างกรุงเทพ",
    "รถรับจ้างภูเก็ต"
  ]
};

export type SiteConfig = typeof siteConfig;

```

### `src/lib/seo/metadata.ts` (Complete File)
Lines 1 - 155

```ts
import type { Metadata } from "next";
import { siteConfig } from "./site-config";
import type { IntentRecord } from "@/data/searchIntentMap";
import type { DistrictRecord } from "@/data/districtLandingPages";

export interface PageMetadataOptions {
  title: string;
  description: string;
  keywords?: string[];
  canonicalPath: string;
  ogImage?: string;
  ogImageAlt?: string;
  noIndex?: boolean;
}

/**
 * Core metadata builder for WMS TRANSPORT.
 * Automatically handles:
 * 1. Absolute canonical URLs using siteConfig.baseUrl
 * 2. Protection against duplicate brand names in page titles
 * 3. Consistent Open Graph and Twitter Card tags
 * 4. Robots indexing and Googlebot directives
 */
export function buildPageMetadata(options: PageMetadataOptions): Metadata {
  const {
    title,
    description,
    keywords = [],
    canonicalPath,
    ogImage = siteConfig.defaultOgImage,
    ogImageAlt = title,
    noIndex = false,
  } = options;

  // Normalize canonical paths to ensure clean canonical routing
  const cleanPath = canonicalPath.startsWith("/") ? canonicalPath : `/${canonicalPath}`;
  const absoluteCanonicalUrl = `${siteConfig.baseUrl}${cleanPath === "/" ? "" : cleanPath}`;

  // Prevent duplicate brand name if the title already contains WMS or businessName
  const resolvedTitle = title.includes("WMS") || title.includes(siteConfig.businessName)
    ? { absolute: title }
    : title;

  const fullOgImage = ogImage.startsWith("http")
    ? ogImage
    : `${siteConfig.baseUrl}${ogImage.startsWith("/") ? "" : "/"}${ogImage}`;

  return {
    metadataBase: new URL(siteConfig.baseUrl),
    title: resolvedTitle,
    description,
    keywords: keywords.length > 0 ? keywords : siteConfig.keywords,
    alternates: {
      canonical: absoluteCanonicalUrl,
    },
    robots: {
      index: !noIndex,
      follow: !noIndex,
      googleBot: {
        index: !noIndex,
        follow: !noIndex,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: absoluteCanonicalUrl,
      title,
      description,
      siteName: siteConfig.businessName,
      images: [
        {
          url: fullOgImage,
          width: 1200,
          height: 630,
          alt: ogImageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [fullOgImage],
    },
  };
}

/**
 * Builds metadata for Search Intent pages from searchIntentMap
 */
export function buildIntentMetadata(intent: IntentRecord): Metadata {
  return buildPageMetadata({
    title: intent.title,
    description: intent.metaDescription,
    keywords: [intent.primaryKeyword, ...intent.secondaryKeywords],
    canonicalPath: intent.canonicalPath,
    noIndex: !intent.isIndexable,
  });
}

/**
 * Builds metadata for District / Area landing pages
 */
export function buildDistrictMetadata(
  record: DistrictRecord,
  provinceThaiName: string
): Metadata {
  const canonicalPath = `/areas/${record.province}/${record.districtSlug}`;
  const title = record.seoTitle || `${record.primaryIntent} | ${siteConfig.businessName}`;
  const description = record.metaDescription || `บริการรถรับจ้างตู้ทึบ ขนส่งมอเตอร์ไซค์ ย้ายบ้านคอนโด ย่าน${record.districtThaiName} ${provinceThaiName} ${record.actualServiceCapability}. ${record.localOperationalNotes.substring(0, 100)}...`;

  const ogImage = record.images?.[0]?.path || siteConfig.defaultOgImage;

  return buildPageMetadata({
    title,
    description,
    canonicalPath,
    ogImage,
    ogImageAlt: record.images?.[0]?.alt || title,
    noIndex: !record.isIndexable,
  });
}

/**
 * Builds metadata for dynamic Route-to-Route pages
 * Omit calculated price from metadata description to comply with pricing accuracy policies.
 */
export function buildRoutePageMetadata(
  fromName: string,
  toName: string,
  fromSlug: string,
  toSlug: string
): Metadata {
  const title = `บริการขนส่งและรถกระบะรับจ้างจาก ${fromName} ไป ${toName} | ${siteConfig.businessName}`;
  const description = `บริการรถรับจ้างตู้ทึบ ขนส่งสินค้า ย้ายบ้าน ย้ายหอพัก และขนส่งมอเตอร์ไซค์จาก ${fromName} ไปยัง ${toName} อย่างปลอดภัย พร้อมพนักงานช่วยยกของมืออาชีพ ประเมินราคาฟรี 24 ชม.`;

  return buildPageMetadata({
    title,
    description,
    canonicalPath: `/route/${fromSlug}/${toSlug}`,
    ogImage: "/images/wms-transport-route-background.png",
    ogImageAlt: title,
    keywords: [
      `รถรับจ้าง ${fromName} ไป ${toName}`,
      `ขนส่งสินค้า ${fromName} ${toName}`,
      `ย้ายบ้านจาก ${fromName} ไป ${toName}`,
      `ส่งมอเตอร์ไซค์ ${fromName} ${toName}`,
    ],
  });
}

```

### `src/lib/seo/schema.ts` (Complete File)
Lines 1 - 207

```ts
import { siteConfig } from "./site-config";

/**
 * Utility to safely escape JSON-LD strings.
 * Mitigates XSS risks in dynamically injected schema.
 */
export function escapeJsonLd(str: string): string {
  if (!str) return str;
  return str.replace(/</g, "\\u003c").replace(/>/g, "\\u003e");
}

/**
 * Organization Schema for WMS TRANSPORT
 * Linked with stable @id to establish organization authority
 */
export function buildOrganizationSchema() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Organization" as const,
    "@id": `${siteConfig.baseUrl}/#organization`,
    name: siteConfig.businessName,
    alternateName: siteConfig.businessFullName,
    url: siteConfig.baseUrl,
    logo: `${siteConfig.baseUrl}${siteConfig.logoUrl}`,
    contactPoint: {
      "@type": "ContactPoint" as const,
      telephone: siteConfig.phoneFormatted,
      contactType: "customer service",
      areaServed: "TH",
      availableLanguage: ["Thai", "English"],
    },
    sameAs: siteConfig.socials,
  };
}

/**
 * MovingCompany / LocalBusiness Schema for WMS TRANSPORT
 */
export function buildMovingCompanySchema(areaServed: string[] = siteConfig.serviceAreas) {
  const addressObj: Record<string, string> = {
    "@type": "PostalAddress",
    addressLocality: siteConfig.address.addressLocality,
    addressRegion: siteConfig.address.addressRegion,
    postalCode: siteConfig.address.postalCode,
    addressCountry: siteConfig.address.addressCountry,
  };
  const addr = siteConfig.address as { streetAddress?: string; addressLocality: string; addressRegion: string; postalCode: string; addressCountry: string };
  if (addr.streetAddress) {
    addressObj.streetAddress = addr.streetAddress;
  }

  return {
    "@context": "https://schema.org" as const,
    "@type": "MovingCompany" as const,
    "@id": `${siteConfig.baseUrl}/#moving-company`,
    name: siteConfig.businessName,
    image: `${siteConfig.baseUrl}${siteConfig.defaultOgImage}`,
    url: siteConfig.baseUrl,
    telephone: siteConfig.phoneFormatted,
    hasMap: siteConfig.googleMapsUrl,
    ...(siteConfig.priceRange ? { priceRange: siteConfig.priceRange } : {}),
    address: addressObj,
    geo: {
      "@type": "GeoCoordinates" as const,
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: areaServed,
    openingHoursSpecification: {
      "@type": "OpeningHoursSpecification" as const,
      dayOfWeek: [
        "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
      ],
      opens: "00:00",
      closes: "23:59",
    },
    sameAs: siteConfig.socials,
    description: siteConfig.defaultDescription,
    parentOrganization: {
      "@id": `${siteConfig.baseUrl}/#organization`,
    },
  };
}

/**
 * WebSite Schema for Search Action integration
 */
export function buildWebSiteSchema() {
  return {
    "@context": "https://schema.org" as const,
    "@type": "WebSite" as const,
    "@id": `${siteConfig.baseUrl}/#website`,
    url: siteConfig.baseUrl,
    name: siteConfig.businessName,
    publisher: {
      "@id": `${siteConfig.baseUrl}/#organization`,
    },
  };
}

/**
 * Service Schema for specific transport & moving services
 */
export function buildServiceSchema(
  name: string,
  description: string,
  path: string,
  serviceType: string = "Transportation"
) {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return {
    "@context": "https://schema.org" as const,
    "@type": "Service" as const,
    "@id": `${siteConfig.baseUrl}${cleanPath}#service`,
    name,
    description,
    provider: {
      "@id": `${siteConfig.baseUrl}/#moving-company`,
    },
    serviceType,
    areaServed: siteConfig.serviceAreas,
    url: `${siteConfig.baseUrl}${cleanPath}`,
  };
}

/**
 * Route Service Schema for inter-provincial transport
 * Omit calculated price from offers to comply with pricing accuracy policies.
 */
export function buildRouteServiceSchema(
  fromName: string,
  toName: string,
  fromSlug: string,
  toSlug: string
) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "Service" as const,
    "@id": `${siteConfig.baseUrl}/route/${fromSlug}/${toSlug}#service`,
    name: `บริการรถรับจ้างขนของจาก ${fromName} ไป ${toName}`,
    description: `บริการรถกระบะตู้ทึบรับจ้าง ย้ายบ้าน ขนส่งมอเตอร์ไซค์ และสินค้าจาก ${fromName} ไปยัง ${toName}`,
    provider: {
      "@id": `${siteConfig.baseUrl}/#moving-company`,
    },
    serviceType: "Long Distance Transport",
    areaServed: [
      {
        "@type": "AdministrativeArea" as const,
        name: fromName,
      },
      {
        "@type": "AdministrativeArea" as const,
        name: toName,
      },
    ],
  };
}

/**
 * FAQ Schema for visible frequently asked questions
 */
export function buildFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org" as const,
    "@type": "FAQPage" as const,
    mainEntity: faqs.map((faq) => ({
      "@type": "Question" as const,
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer" as const,
        text: faq.answer.replace(/\*\*/g, "").replace(/\*/g, "").trim(),
      },
    })),
  };
}

/**
 * Breadcrumb Schema generator ensuring absolute HTTPS URLs and correct positions
 */
export function buildBreadcrumbSchema(
  items: { name: string; item?: string; href?: string }[],
  baseUrl: string = siteConfig.baseUrl
) {
  const firstPath = items[0]?.item || items[0]?.href;
  const normalized = (firstPath === "/" || items[0]?.name === "หน้าแรก")
    ? items
    : [{ name: "หน้าแรก", item: "/" }, ...items];

  return {
    "@context": "https://schema.org" as const,
    "@type": "BreadcrumbList" as const,
    itemListElement: normalized.map((item, index) => {
      const path = item.item || item.href || "/";
      const fullUrl = path.startsWith("http")
        ? path
        : `${baseUrl}${path.startsWith("/") ? path : `/${path}`}`;

      return {
        "@type": "ListItem" as const,
        position: index + 1,
        name: item.name,
        item: fullUrl,
      };
    }),
  };
}

```

### `src/lib/seo/breadcrumbs.ts` (Complete File)
Lines 1 - 101

```ts
export interface BreadcrumbItem {
  name: string;
  item: string;
}

/**
 * Standardized Breadcrumb Generators for WMS TRANSPORT
 * Generates structured breadcrumb arrays for visual navigation and JSON-LD schema.
 */

export function getHomeBreadcrumbs(): BreadcrumbItem[] {
  return [{ name: "หน้าแรก", item: "/" }];
}

export function getPricingBreadcrumbs(subTitle?: string, subSlug?: string): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = [
    { name: "หน้าแรก", item: "/" },
    { name: "อัตราค่าบริการ", item: "/pricing" },
  ];
  if (subTitle && subSlug) {
    trail.push({ name: subTitle, item: `/pricing/${subSlug}` });
  }
  return trail;
}

export function getProvinceBreadcrumbs(
  provinceThaiName: string,
  provinceSlug: string
): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", item: "/" },
    { name: `รถรับจ้าง${provinceThaiName}`, item: `/service/${provinceSlug}` },
  ];
}

export function getDistrictBreadcrumbs(
  provinceThaiName: string,
  provinceSlug: string,
  districtThaiName: string,
  districtSlug: string
): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", item: "/" },
    { name: `พื้นที่${provinceThaiName}`, item: `/service/${provinceSlug}` },
    { name: districtThaiName, item: `/areas/${provinceSlug}/${districtSlug}` },
  ];
}

export function getProvinceServiceBreadcrumbs(
  provinceThaiName: string,
  provinceSlug: string,
  serviceName: string,
  serviceId: string
): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", item: "/" },
    { name: `รถรับจ้าง${provinceThaiName}`, item: `/service/${provinceSlug}` },
    { name: serviceName, item: `/service/${provinceSlug}/${serviceId}` },
  ];
}

export function getRouteBreadcrumbs(
  fromName: string,
  toName: string,
  fromSlug: string,
  toSlug: string
): BreadcrumbItem[] {
  return [
    { name: "หน้าแรก", item: "/" },
    { name: `เส้นทาง ${fromName} - ${toName}`, item: `/route/${fromSlug}/${toSlug}` },
  ];
}

export function getPortfolioBreadcrumbs(
  caseTitle?: string,
  caseSlug?: string
): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = [
    { name: "หน้าแรก", item: "/" },
    { name: "ผลงานการขนย้าย", item: "/portfolio" },
  ];
  if (caseTitle && caseSlug) {
    trail.push({ name: caseTitle, item: `/portfolio/${caseSlug}` });
  }
  return trail;
}

export function getGuideBreadcrumbs(
  guideTitle?: string,
  guideSlug?: string
): BreadcrumbItem[] {
  const trail: BreadcrumbItem[] = [
    { name: "หน้าแรก", item: "/" },
    { name: "คู่มือการขนย้าย", item: "/#guides" },
  ];
  if (guideTitle && guideSlug) {
    trail.push({ name: guideTitle, item: `/guides/${guideSlug}` });
  }
  return trail;
}

```

### `src/lib/seo/entityGraph.ts` (Complete File)
Lines 1 - 32

```ts
/**
 * WMS Entity & Provenance Graph
 * Generates stable JSON-LD @id canonical identifiers for the WMS Transport graph.
 * This establishes one consistent organization identity across the entire site.
 */

const DOMAIN = (process.env.NEXT_PUBLIC_SITE_URL || "https://wms-transport.com").trim().replace(/\/$/, "");

export const entityGraph = {
  organization: `${DOMAIN}/#organization`,
  website: `${DOMAIN}/#website`,
  webpage: (path: string) => `${DOMAIN}${path}#webpage`,
  service: (serviceId: string) => `${DOMAIN}/service/${serviceId}#service`,
  provinceHub: (provinceId: string) => `${DOMAIN}/service/${provinceId}#hub`,
  route: (from: string, to: string) => `${DOMAIN}/route/${from}/${to}#route`,
  portfolio: (id: string) => `${DOMAIN}/portfolio/${id}#evidence`,
  logo: `${DOMAIN}/images/logoWMS.webp`,
  socials: [
    "https://www.facebook.com/wmstransport",
    "https://line.me/ti/p/DtICkMaDet"
  ]
};

/**
 * Utility to safely escape JSON-LD strings.
 * Mitigates XSS risks in dynamically injected schema.
 */
export function escapeJsonLd(str: string): string {
  if (!str) return str;
  return str.replace(/</g, '\\u003c').replace(/>/g, '\\u003e');
}

```

### `tools/verify-seo-data.js` (Complete File)
Lines 1 - 524

```js
/**
 * SEO Data Integrity & Quality Validator for WMS TRANSPORT
 * Enforces Google Search Essentials, Schema.org standards, and claude-seo guidelines.
 */

const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');

function loadTs(relPath) {
  const fullPath = path.join(ROOT, relPath);
  if (!fs.existsSync(fullPath)) {
    throw new Error(`File not found: ${relPath}`);
  }
  const code = fs.readFileSync(fullPath, 'utf8');
  const js = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  }).outputText;
  const mod = { exports: {} };
  const fn = new Function('module', 'exports', 'require', '__dirname', '__filename', js);
  fn(mod, mod.exports, (p) => {
    if (p === './site-config' || p === '@/lib/seo/site-config') {
      return loadTs('src/lib/seo/site-config.ts');
    }
    if (p === './schema' || p === '@/lib/seo/schema') {
      return loadTs('src/lib/seo/schema.ts');
    }
    if (p === './breadcrumbs' || p === '@/lib/seo/breadcrumbs') {
      return loadTs('src/lib/seo/breadcrumbs.ts');
    }
    if (p === '@/data/searchIntentMap' || p === './searchIntentMap') {
      return loadTs('src/data/searchIntentMap.ts');
    }
    if (p === '@/data/districtLandingPages' || p === './districtLandingPages') {
      return loadTs('src/data/districtLandingPages.ts');
    }
    if (p === '@/data/guidesData' || p === './guidesData') {
      return loadTs('src/data/guidesData.ts');
    }
    if (p === '@/data/mediaEvidence' || p === './mediaEvidence') {
      return loadTs('src/data/mediaEvidence.ts');
    }
    if (p === '@/data/approvedRouteCorridors' || p === './approvedRouteCorridors') {
      return loadTs('src/data/approvedRouteCorridors.ts');
    }
    throw new Error(`External require not supported in validator: ${p}`);
  }, path.dirname(fullPath), fullPath);
  return mod.exports;
}

let errors = [];
let warnings = [];

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}

function warn(condition, message) {
  if (!condition) {
    warnings.push(message);
  }
}

console.log('🔍 Running WMS TRANSPORT Strict SEO & Source-of-Truth Validator...\n');

// 1. Load authoritative datasets
let siteConfig, searchIntentMap, districtLandingPages, guidesData, portfolioCasesData, schemaHelper, approvedRouteCorridorsMod;

try {
  siteConfig = loadTs('src/lib/seo/site-config.ts').siteConfig;
  searchIntentMap = loadTs('src/data/searchIntentMap.ts').searchIntentMap;
  districtLandingPages = loadTs('src/data/districtLandingPages.ts').districtLandingPages;
  guidesData = loadTs('src/data/guidesData.ts').guidesData;
  portfolioCasesData = loadTs('src/data/mediaEvidence.ts').portfolioCasesData;
  schemaHelper = loadTs('src/lib/seo/schema.ts');
  approvedRouteCorridorsMod = loadTs('src/data/approvedRouteCorridors.ts');
} catch (e) {
  console.error('❌ Failed to load TypeScript datasets:', e.message);
  process.exit(1);
}

const baseUrl = siteConfig.baseUrl || 'https://wms-transport.com';

// ==========================================
// CHECK 1: SITE CONFIG & BRAND INDEPENDENCE
// ==========================================
console.log('1️⃣ Checking siteConfig & brand independence...');
assert(siteConfig.businessName === 'WMS TRANSPORT', `[BRAND ERROR] Unexpected business name: ${siteConfig.businessName}`);
assert(baseUrl.startsWith('https://'), `[BASEURL ERROR] baseUrl must start with https:// (found ${baseUrl})`);
assert(!baseUrl.includes('mj-th'), `[LEAK ERROR] baseUrl contains mj-th!`);
assert(!siteConfig.phone.includes('095-583-0371'), `[LEAK ERROR] Reference phone found in siteConfig!`);
assert(siteConfig.phone.length >= 9, `[PHONE ERROR] Invalid phone length`);

// ==========================================
// CHECK 2: CANONICAL URL & HOST CONSISTENCY
// ==========================================
console.log('2️⃣ Checking canonical URLs and host consistency...');
const canonicalUrls = new Set();

function validateCanonical(pathOrUrl, context) {
  assert(typeof pathOrUrl === 'string' && pathOrUrl.length > 0, `[CANONICAL EMPTY] Empty canonical in ${context}`);
  const fullUrl = pathOrUrl.startsWith('http') ? pathOrUrl : `${baseUrl}${pathOrUrl.startsWith('/') ? pathOrUrl : `/${pathOrUrl}`}`;
  
  try {
    const parsed = new URL(fullUrl);
    assert(parsed.origin === new URL(baseUrl).origin, `[HOST MISMATCH] Host ${parsed.origin} does not match baseUrl ${baseUrl} in ${context}`);
    assert(!fullUrl.includes('localhost'), `[LOCALHOST LEAK] Localhost found in canonical: ${fullUrl}`);
    assert(!fullUrl.includes('vercel.app'), `[VERCEL LEAK] vercel.app found in canonical: ${fullUrl}`);
  } catch (e) {
    errors.push(`[INVALID CANONICAL] Malformed canonical URL "${fullUrl}" in ${context}`);
  }

  canonicalUrls.add(fullUrl);
}

Object.values(searchIntentMap).forEach(item => {
  validateCanonical(item.canonicalPath, `Intent: ${item.primaryKeyword}`);
});

Object.values(districtLandingPages).forEach(item => {
  validateCanonical(`/areas/${item.province}/${item.districtSlug}`, `District: ${item.districtSlug}`);
});

Object.values(guidesData).forEach(item => {
  validateCanonical(`/guides/${item.slug}`, `Guide: ${item.slug}`);
});

Object.values(portfolioCasesData).forEach(item => {
  validateCanonical(`/portfolio/${item.slug}`, `Portfolio: ${item.slug}`);
});

// ==========================================
// CHECK 3: ROUTE ALLOWLIST INTEGRITY
// ==========================================
console.log('3️⃣ Checking route corridors allowlist...');
const corridors = approvedRouteCorridorsMod.approvedRouteCorridors || [];
assert(Array.isArray(corridors) && corridors.length === 10, `[ROUTE ALLOWLIST] Expected exactly 10 approved route corridors, found ${corridors.length}`);

corridors.forEach(({ from, to }) => {
  assert(from && to && from !== to, `[ROUTE ERROR] Invalid corridor pair ${from} -> ${to}`);
  validateCanonical(`/route/${from}/${to}`, `Route: ${from} -> ${to}`);
});

// ==========================================
// CHECK 4: ROUTE CONFLICTS & 404 INTEGRITY
// ==========================================
console.log('4️⃣ Checking route conflict resolution & 404 integrity...');
assert(!fs.existsSync(path.join(ROOT, 'src/app/page.tsx')), `[ROUTE CONFLICT] src/app/page.tsx must not exist alongside (marketing)/page.tsx`);
assert(fs.existsSync(path.join(ROOT, 'src/app/(marketing)/page.tsx')), `[HOMEPAGE MISSING] src/app/(marketing)/page.tsx must exist`);
assert(fs.existsSync(path.join(ROOT, 'src/app/not-found.tsx')), `[404 MISSING] src/app/not-found.tsx must exist`);
assert(!fs.existsSync(path.join(ROOT, 'src/components/SocialProofPopup.tsx')), `[SYNTHETIC POPUP] src/components/SocialProofPopup.tsx must be completely deleted`);

// ==========================================
// CHECK 5: COMPREHENSIVE SOURCE SCAN FOR PROHIBITED PATTERNS
// ==========================================
console.log('5️⃣ Scanning src/ for schema abuse, fake branches, synthetic tokens & unsupported claims...');

function walkFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(file => {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat && stat.isDirectory()) {
      results = results.concat(walkFiles(full));
    } else if (/\.(tsx?|jsx?)$/.test(file)) {
      results.push(full);
    }
  });
  return results;
}

const srcFiles = walkFiles(path.join(ROOT, 'src'));

// Prohibited pattern definitions
const prohibitedPatterns = [
  // Schema Violations
  {
    pattern: /AggregateRating/i,
    name: "Self-serving AggregateRating schema for WMS business",
    allowedIn: []
  },
  {
    pattern: /priceRange\s*[:=]\s*["']\$\$["']/i,
    name: 'Provisional priceRange="$$"',
    allowedIn: ['src/lib/seo/site-config.ts'] // Allowed only in comment
  },
  {
    pattern: /itemType=["']https:\/\/schema\.org\/MovingCompany["']/i,
    name: "Simulated provincial MovingCompany microdata",
    allowedIn: []
  },
  {
    pattern: /itemScope/i,
    name: "itemScope microdata",
    allowedIn: []
  },
  // Fake provincial LocalBusiness entities
  {
    pattern: /"@type"\s*:\s*"LocalBusiness"/i,
    name: "Embedded LocalBusiness branch schema (must reference canonical #moving-company)",
    allowedIn: ['src/lib/seo/schema.ts'] // Canonical entity definition only
  },
  // Synthetic data
  {
    pattern: /WMS-(?:TX|MC|FR)-\d+/i,
    name: "Synthetic booking transaction tokens (WMS-TX-*, WMS-MC-*, WMS-FR-*)",
    allowedIn: []
  },
  {
    pattern: /bookingToken/i,
    name: "Synthetic bookingToken fields",
    allowedIn: []
  },
  {
    pattern: /SocialProofPopup/i,
    name: "SocialProofPopup reference",
    allowedIn: []
  },
  {
    pattern: /liveUpdates\s*=/i,
    name: "Synthetic liveUpdates array",
    allowedIn: []
  },
  // Unsupported numerical / absolute claims
  {
    pattern: /100[,.]?000\s*(?:บาท|THB|บ\.)/i,
    name: "100,000 THB unverified insurance figure",
    allowedIn: []
  },
  {
    pattern: /10[,.]?000\s*(?:บาท|THB|บ\.)/i,
    name: "10,000 THB unverified insurance figure",
    allowedIn: []
  },
  {
    pattern: /20[,.]?000\s*(?:บาท|THB|บ\.)/i,
    name: "20,000 THB unverified insurance figure",
    allowedIn: []
  },
  {
    pattern: /50[,.]?000\s*(?:บาท|THB|บ\.)/i,
    name: "50,000 THB unverified insurance figure",
    allowedIn: []
  },
  {
    pattern: /100k/i,
    name: "100k insurance claim",
    allowedIn: []
  },
  {
    pattern: /10[,.]?000\+/i,
    name: "10,000+ jobs claim",
    allowedIn: []
  },
  {
    pattern: /99%/i,
    name: "99% satisfaction claim",
    allowedIn: []
  },
  {
    pattern: /1\.8\s*ตัน/i,
    name: "1.8 ton unconfirmed payload capacity",
    allowedIn: []
  },
  {
    pattern: /2(?:\.0)?\s*ตัน/i,
    name: "2-ton payload capacity claim",
    allowedIn: []
  },
  {
    pattern: /พิกัด\s*GPS\s*รถขนส่ง/i,
    name: "Unverified GPS live vehicle tracking claim",
    allowedIn: []
  },
  {
    pattern: /ผ่านระบบ\s*GPS/i,
    name: "Unverified GPS tracking claim",
    allowedIn: []
  },
  // Competitor data leaks
  {
    pattern: /mj-th-express/i,
    name: "MJ-TH Express domain leak",
    allowedIn: []
  },
  {
    pattern: /095-583-0371/i,
    name: "MJ-TH phone number leak",
    allowedIn: []
  }
];

let violationsCount = 0;

srcFiles.forEach(file => {
  const relPath = path.relative(ROOT, file).replace(/\\/g, '/');
  const content = fs.readFileSync(file, 'utf8');

  prohibitedPatterns.forEach(({ pattern, name, allowedIn }) => {
    if (allowedIn && allowedIn.includes(relPath)) {
      return;
    }
    if (pattern.test(content)) {
      errors.push(`[RULE VIOLATION] Found "${name}" in ${relPath}`);
      violationsCount++;
    }
  });
});

if (violationsCount === 0) {
  console.log('   ✅ All src/ files are 100% clean of schema abuse, fake branches, synthetic data, and unsupported claims.');
}

// ==========================================
// CHECK 6: LOCAL SEO BEST PRACTICES & LIGHTWEIGHT WARNINGS
// ==========================================
console.log('6️⃣ Checking local SEO best practices, titles, keywords & internal links...');

// 6.1 Title length & duplicate titles
const registeredTitles = new Map();

function checkTitle(title, pageContext) {
  if (!title) return;
  // Lightweight warning for overly long title (> 65 chars recommended SERP display limit)
  warn(title.length <= 65, `[TITLE LENGTH] Title in "${pageContext}" exceeds 65 characters (${title.length} chars): "${title}"`);
  
  // Warning for duplicate titles
  if (registeredTitles.has(title)) {
    warn(false, `[DUPLICATE TITLE] Duplicate title detected between "${pageContext}" and "${registeredTitles.get(title)}": "${title}"`);
  } else {
    registeredTitles.set(title, pageContext);
  }
}

// Check searchIntentMap titles
Object.entries(searchIntentMap).forEach(([key, item]) => {
  checkTitle(item.title, `Intent: ${key}`);
});

// Check district titles & identical H1/title patterns
Object.entries(districtLandingPages).forEach(([slug, record]) => {
  const pageTitle = record.seoTitle || `${record.primaryIntent} | ${siteConfig.businessName}`;
  checkTitle(pageTitle, `District: ${slug}`);

  // 6.2 Identical H1/title patterns across local pages
  warn(pageTitle !== record.h1, `[IDENTICAL H1/TITLE] District "${slug}" has identical title and H1: "${pageTitle}"`);
});

// 6.3 Location keywords assigned to multiple primary landing pages
const locationKeywordMap = new Map();
Object.entries(districtLandingPages).forEach(([slug, record]) => {
  const locKey = record.districtThaiName;
  if (locKey) {
    if (locationKeywordMap.has(locKey)) {
      warn(false, `[KEYWORD CANNIBALIZATION] Primary location keyword "${locKey}" is assigned to multiple landing pages: "${slug}" and "${locationKeywordMap.get(locKey)}"`);
    } else {
      locationKeywordMap.set(locKey, slug);
    }
  }
});

// 6.4 Unsupported claims audit (response times, vehicle height, equipment, pricing, 24-hr)
const unverifiedClaimPatterns = [
  { pattern: /(?:ตอบไว|ตอบกลับ|ประเมินราคา(?:ฟรี)?(?:ภายใน|ใน))\s*\d+\s*นาที/i, name: "Unsupported exact response time claim (X minutes)" },
  { pattern: /รับประกัน\s*\d+%/i, name: "Unverified guarantee percentage" },
  { pattern: /เจ้าเดียวใน/i, name: "Unverified exclusivity claim (เจ้าเดียวใน...)" },
  { pattern: /อันดับ\s*1\s*ใน/i, name: "Unverified ranking claim (อันดับ 1 ใน...)" },
  { pattern: /ความสูงภายใน(?:\s*ตู้)?\s*2\.1\s*(?:เมตร|ม\.)/i, name: "Unsupported exact vehicle height claim (2.1 เมตร)" },
  { pattern: /สายรัด\s*Ratchet\s*Strap/i, name: "Unsupported specific equipment claim (Ratchet Strap)" },
  { pattern: /ราคาเริ่มต้น\s*1,500\s*บาท/i, name: "Unsupported exact starting price claim (1,500 บาท)" },
];

srcFiles.forEach(file => {
  const relPath = path.relative(ROOT, file).replace(/\\/g, '/');
  if (
    relPath === 'src/components/ThonburiHubView.tsx' ||
    relPath === 'src/app/(marketing)/service/[province]/page.tsx' ||
    relPath === 'src/app/(marketing)/areas/[province]/[district]/page.tsx'
  ) {
    const content = fs.readFileSync(file, 'utf8');
    unverifiedClaimPatterns.forEach(({ pattern, name }) => {
      if (pattern.test(content)) {
        warn(false, `[UNVERIFIED LOCAL CLAIM] Found "${name}" in ${relPath}`);
      }
    });
  }
});

// 6.5 Multiple LocalBusiness entities representing service areas
srcFiles.forEach(file => {
  const relPath = path.relative(ROOT, file).replace(/\\/g, '/');
  if (relPath.startsWith('src/app/(marketing)/areas') || relPath.startsWith('src/app/(marketing)/service')) {
    const content = fs.readFileSync(file, 'utf8');
    if (content.includes('"@type": "LocalBusiness"') || content.includes('"@type":"LocalBusiness"')) {
      assert(false, `[PROHIBITED LOCALBUSINESS ENTITY] Found LocalBusiness entity in service-area route ${relPath}. Service area pages must only use Service schema referencing root business entity.`);
    }
  }
});

// 6.6 Location-specific image claims without verified evidence
Object.entries(districtLandingPages).forEach(([slug, record]) => {
  const hasVerifiedEvidence = record.evidenceItems?.some(e => e.verificationStatus === 'verified');
  if (!hasVerifiedEvidence && record.images) {
    record.images.forEach((img, idx) => {
      const landmarkKeywords = ['MRT', 'BTS', 'ตลาดทะเลไทย', 'เดอะมอลล์', 'สถานี'];
      const mentionsLandmark = landmarkKeywords.some(kw => (img.alt && img.alt.includes(kw)) || (img.caption && img.caption.includes(kw)));
      warn(!mentionsLandmark, `[UNVERIFIED LANDMARK CLAIM IN IMAGE] District "${slug}" image #${idx + 1} makes location-specific landmark claim without verified evidence: "${img.caption || img.alt}"`);
    });
  }
});

// 6.7 Target pages incoming internal links (Homepage and contextual pricing pages)
const targetLocalPages = [
  { url: '/service/bkk-thonburi', name: 'Thonburi Hub' },
  { url: '/areas/bkk-thonburi/bang-khae', name: 'Bang Khae District' },
  { url: '/service/samutsakhon', name: 'Samut Sakhon Hub' },
  { url: '/areas/samutsakhon/maha-chai', name: 'Maha Chai District' },
];

const serviceMapFile = path.join(ROOT, 'src/components/ServiceMap.tsx');
if (fs.existsSync(serviceMapFile)) {
  const serviceMapContent = fs.readFileSync(serviceMapFile, 'utf8');
  targetLocalPages.forEach(target => {
    assert(serviceMapContent.includes(target.url), `[HOMEPAGE MISSING LINK] Homepage (ServiceMap.tsx) is missing a crawlable link to target page "${target.url}" (${target.name})`);
  });
}

const movingPricingFile = path.join(ROOT, 'src/app/(marketing)/pricing/moving/page.tsx');
if (fs.existsSync(movingPricingFile)) {
  const movingContent = fs.readFileSync(movingPricingFile, 'utf8');
  assert(movingContent.includes('/service/bkk-thonburi'), `[CONTEXTUAL LINK MISSING] /pricing/moving is missing link to /service/bkk-thonburi`);
  assert(movingContent.includes('/areas/bkk-thonburi/bang-khae'), `[CONTEXTUAL LINK MISSING] /pricing/moving is missing link to /areas/bkk-thonburi/bang-khae`);
}

const freightPricingFile = path.join(ROOT, 'src/app/(marketing)/pricing/freight/page.tsx');
if (fs.existsSync(freightPricingFile)) {
  const freightContent = fs.readFileSync(freightPricingFile, 'utf8');
  assert(freightContent.includes('/service/samutsakhon'), `[CONTEXTUAL LINK MISSING] /pricing/freight is missing link to /service/samutsakhon`);
  assert(freightContent.includes('/areas/samutsakhon/maha-chai'), `[CONTEXTUAL LINK MISSING] /pricing/freight is missing link to /areas/samutsakhon/maha-chai`);
}

// 6.8 Duplicate exact-match anchors repeated sitewide
const genericOrRepetitiveAnchors = ['คลิกที่นี่', 'ดูรายละเอียด', 'อ่านต่อ', 'คลิกเลย', 'click here'];
srcFiles.forEach(file => {
  const relPath = path.relative(ROOT, file).replace(/\\/g, '/');
  if (relPath.startsWith('src/app/(marketing)') || relPath.startsWith('src/components')) {
    const content = fs.readFileSync(file, 'utf8');
    genericOrRepetitiveAnchors.forEach(anchor => {
      const regex = new RegExp(`>\\s*${anchor}\\s*<`, 'i');
      if (regex.test(content)) {
        warn(false, `[GENERIC ANCHOR TEXT] Found low-quality anchor "${anchor}" in ${relPath}. Use descriptive destination anchors.`);
      }
    });
  }
});

// 6.9 Metadata that does not match the page's assigned primary intent
Object.entries(districtLandingPages)
  .filter(([, record]) => record.isIndexable && record.status === 'published')
  .forEach(([slug, record]) => {
    const intentKey = record.districtThaiName;
    const titleMatches = record.seoTitle ? record.seoTitle.includes(intentKey) : false;
    const h1Matches = record.h1.includes(intentKey);
    const descMatches = record.metaDescription ? record.metaDescription.includes(intentKey) : false;
    warn(titleMatches, `[METADATA INTENT MISMATCH] District "${slug}" title does not reflect primary intent key "${intentKey}"`);
    warn(h1Matches, `[METADATA INTENT MISMATCH] District "${slug}" H1 does not reflect primary intent key "${intentKey}"`);
    warn(descMatches, `[METADATA INTENT MISMATCH] District "${slug}" meta description does not reflect primary intent key "${intentKey}"`);
  });

// 6.10 District pages missing an incoming contextual internal link from parent hub
const hubFiles = [
  { province: 'bkk-thonburi', file: 'src/components/ThonburiHubView.tsx' },
  { province: 'samutsakhon', file: 'src/app/(marketing)/service/[province]/page.tsx' },
];

const hubContents = {};
hubFiles.forEach(({ province, file }) => {
  const fullPath = path.join(ROOT, file);
  if (fs.existsSync(fullPath)) {
    hubContents[province] = fs.readFileSync(fullPath, 'utf8');
  }
});

Object.values(districtLandingPages)
  .filter(record => record.isIndexable && record.status === 'published')
  .forEach(record => {
    const parentHubContent = hubContents[record.province];
    if (parentHubContent) {
      const linkPattern = `/areas/${record.province}/${record.districtSlug}`;
      const hasLink = parentHubContent.includes(linkPattern);
      warn(hasLink, `[DISTRICT MISSING INCOMING LINK] Published district page "${linkPattern}" is missing an incoming contextual internal link from its parent hub (${record.province})`);
    }
  });

// ==========================================
// SUMMARY
// ==========================================
console.log('\n==========================================');
console.log('📊 WMS SEO DATA VALIDATION SUMMARY');
console.log('==========================================');
console.log(`Verified Canonical URLs: ${canonicalUrls.size}`);
console.log(`Errors Found:            ${errors.length}`);
console.log(`Warnings Found:          ${warnings.length}`);

if (warnings.length > 0) {
  console.log('\n⚠️ WARNINGS:');
  warnings.forEach(w => console.log('  ' + w));
}

if (errors.length > 0) {
  console.log('\n❌ ERRORS:');
  errors.forEach(e => console.log('  ' + e));
  console.log('\n💥 VALIDATION FAILED!');
  process.exit(1);
} else {
  console.log('\n✅ ALL WMS SEO DATA CHECKS PASSED SUCCESSFULLY!');
  process.exit(0);
}

```

---

## 14. Google Analytics and Tagging

### `src/components/GoogleAnalytics.tsx` (Complete File)
Lines 1 - 135

```tsx
"use client";

import { useEffect } from "react";
import Script from "next/script";

interface GoogleAnalyticsProps {
  gaMeasurementId?: string;
}

type GtagFunction = (...args: unknown[]) => void;

/**
 * Dedicated WMS GA4 Analytics Integration & Interaction Listener
 * 
 * Note: GA4 is measurement and observability infrastructure, NOT a direct search ranking factor.
 * Only initializes external scripts if a valid NEXT_PUBLIC_GA_MEASUREMENT_ID is configured in environment.
 * If absent, all helper methods safely no-op without client errors.
 */
export default function GoogleAnalytics({ gaMeasurementId }: GoogleAnalyticsProps) {
  const measurementId = gaMeasurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  const isConfigured = Boolean(
    measurementId && 
    measurementId.trim() !== "" && 
    !measurementId.startsWith("G-XXXXX")
  );

  useEffect(() => {
    if (typeof window === "undefined" || !isConfigured) return;

    // Delegated click listener for telephone, LINE, and quotation actions
    const handleGlobalClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement)?.closest("a, button");
      if (!target) return;

      const href = target.getAttribute("href") || "";

      // 1. Phone link click
      if (href.startsWith("tel:")) {
        trackPhoneClick(href.replace("tel:", "").trim());
        return;
      }

      // 2. LINE contact click
      if (href.includes("line.me")) {
        trackLineClick(href);
        return;
      }

      // 3. Real quotation start action
      if (
        target.getAttribute("data-analytics") === "quote-start" ||
        target.getAttribute("id") === "quote-calculator" ||
        (target.tagName === "BUTTON" && (target.textContent?.includes("คำนวณ") || target.textContent?.includes("เช็กราคา")))
      ) {
        trackQuoteAction("start", { label: target.textContent?.trim() || "quote_start_button" });
      }
    };

    // 4. Real verified quotation submission success
    // Only fires if a genuine form submission event was completed
    const handleQuoteSuccess = (event: Event) => {
      const customEvent = event as CustomEvent<Record<string, string>>;
      trackQuoteAction("submit_success", customEvent.detail || {});
    };

    window.addEventListener("click", handleGlobalClick, { capture: true });
    window.addEventListener("wms_quote_success", handleQuoteSuccess);

    return () => {
      window.removeEventListener("click", handleGlobalClick, { capture: true });
      window.removeEventListener("wms_quote_success", handleQuoteSuccess);
    };
  }, [isConfigured]);

  if (!isConfigured) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
      />
      <Script
        id="google-analytics-init"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${measurementId}', {
              page_path: window.location.pathname,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
}

/**
 * Meaningful Conversion Event Helpers
 * Fire only on confirmed user actions (phone call, LINE click, quote form submission).
 */
export function trackPhoneClick(phoneNumber: string = "general") {
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: GtagFunction }).gtag === "function") {
    (window as unknown as { gtag: GtagFunction }).gtag("event", "contact_phone_click", {
      event_category: "Engagement",
      event_label: phoneNumber,
    });
  }
}

export function trackLineClick(lineUrl: string = "general") {
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: GtagFunction }).gtag === "function") {
    (window as unknown as { gtag: GtagFunction }).gtag("event", "contact_line_click", {
      event_category: "Engagement",
      event_label: lineUrl,
    });
  }
}

export function trackQuoteAction(action: "start" | "submit_success", details?: Record<string, string>) {
  if (typeof window !== "undefined" && typeof (window as unknown as { gtag?: GtagFunction }).gtag === "function") {
    (window as unknown as { gtag: GtagFunction }).gtag("event", action === "submit_success" ? "quote_submit_success" : "quote_start", {
      event_category: "Conversion",
      ...details,
    });
  }
}

```

### Partytown & Analytics Integration: `src/app/layout.tsx`
Lines 3, 106, 110

```tsx
// Imports
import { Partytown } from "@builder.io/partytown/react";
import GoogleAnalytics from "@/components/GoogleAnalytics";

// In <head>
<Partytown debug={false} forward={["dataLayer.push"]} />

// In <body>
<GoogleAnalytics />
```

---

## 15. SEO-Related Dependencies

From `package.json`:

```json
{
  "dependencies": {
    "@builder.io/partytown": "^0.10.3",
    "next": "^16.3.5",
    "react": "19.2.4",
    "react-dom": "19.2.4",
    "sharp": "^0.35.4"
  },
  "devDependencies": {
    "@types/node": "^20",
    "@types/react": "^19",
    "@types/react-dom": "^19",
    "tailwindcss": "^4",
    "typescript": "^5"
  },
  "scripts": {
    "test": "node tools/verify-seo-data.js",
    "seo:verify": "node tools/verify-seo-data.js",
    "optimize:images": "node scripts/optimize-images.mjs",
    "setup:partytown": "partytown copylib public/~partytown"
  }
}
```

---

## 16. Unresolved Dynamic References

### `src/data/searchIntentMap.ts` (Complete File)
Lines 1 - 197

```ts
export interface IntentRecord {
  pageType: 'home' | 'province' | 'district' | 'guide' | 'pricing' | 'portfolio' | 'comparison' | 'dashboard';
  primarySearchIntent: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  h1: string;
  heroSupportingStatement: string;
  title: string;
  metaDescription: string;
  canonicalPath: string;
  isIndexable: boolean;
  proofRequirements: string[];
  lastReviewedDate?: string;
}

export const searchIntentMap: Record<string, IntentRecord> = {
  "home": {
    pageType: "home",
    primarySearchIntent: "จ้างรถกระบะขนของ ย้ายบ้าน ขนส่งมอเตอร์ไซค์ทั่วไทย",
    primaryKeyword: "รถกระบะตู้ทึบรับจ้าง",
    secondaryKeywords: ["ขนส่งมอเตอร์ไซค์", "ย้ายบ้านคอนโด", "รถขนของพร้อมคนยก"],
    h1: "รถกระบะตู้ทึบรับจ้าง ขนส่งมอเตอร์ไซค์ และย้ายบ้านคอนโด พร้อมคนยกของ",
    heroSupportingStatement: "ประเมินงานตามจำนวนของ ระยะทาง และชั้นอาคาร เพื่อแจ้งราคาให้ชัดเจนก่อนจอง ไม่มีบวกเพิ่มหน้างาน",
    title: "รถกระบะตู้ทึบรับจ้าง ขนส่งมอเตอร์ไซค์ ย้ายบ้านคอนโดทั่วไทย | WMS TRANSPORT",
    metaDescription: "บริการรถกระบะตู้ทึบรับจ้าง ขนส่งมอเตอร์ไซค์ บิ๊กไบค์ และย้ายบ้าน คอนโด หอพัก ทั่วประเทศ ปลอดภัยด้วยตู้ทึบมิดชิดพร้อมดูแลความปลอดภัยทุกเที่ยว ประเมินราคาฟรี 24 ชม.",
    canonicalPath: "/",
    isIndexable: true,
    proofRequirements: ["รีวิวลูกค้าจริงพร้อมรูปถ่าย", "บันทึกส่งมอบงานจริง", "รูปภาพรถตู้ทึบจริงของบริษัท"]
  },
  "portfolio": {
    pageType: "portfolio",
    primarySearchIntent: "ดูผลงานจริง รูปถ่ายจริงของบริการขนส่งขนย้าย WMS",
    primaryKeyword: "ผลงานรถรับจ้างย้ายบ้าน",
    secondaryKeywords: ["รีวิวย้ายคอนโดของจริง", "ภาพขนส่งมอเตอร์ไซค์", "รีวิวรถตู้ทึบ WMS"],
    h1: "ผลงานขนย้ายจริงและรีวิวจากผู้ใช้บริการ WMS TRANSPORT",
    heroSupportingStatement: "รวบรวมหลักฐานการทำงานจริงในทุกพื้นที่ ทั้งการขนย้ายคอนโด ส่งบิ๊กไบค์ และการขนส่งสินค้าโรงงาน",
    title: "ผลงานการขนย้ายและรูปภาพงานจริง | WMS TRANSPORT",
    metaDescription: "ชมภาพการปฏิบัติงานจริงและเคสตัวอย่างการย้ายบ้าน ย้ายคอนโด และขนส่งรถมอเตอร์ไซค์ของ WMS TRANSPORT เพื่อความมั่นใจในความเป็นมืออาชีพ",
    canonicalPath: "/portfolio",
    isIndexable: true,
    proofRequirements: ["รูปถ่ายหน้างานจริง", "รายละเอียดจุดรับ-ส่งจริง", "การแรปหุ้มและจัดยึดที่ได้มาตรฐาน"]
  },
  "pricing": {
    pageType: "pricing",
    primarySearchIntent: "เช็กอัตราค่าบริการและตารางราคาเริ่มต้นรถรับจ้างขนของ",
    primaryKeyword: "ราคารถกระบะรับจ้าง",
    secondaryKeywords: ["ราคาขนส่งมอเตอร์ไซค์", "ค่าจ้างคนยกของ", "ราคาเหมาขนย้ายคอนโด"],
    h1: "อัตราค่าบริการและนโยบายราคาขนส่งที่เป็นธรรม ไม่มีค่าใช้จ่ายแอบแฝง",
    heroSupportingStatement: "ตรวจสอบราคาเริ่มต้นอย่างโปร่งใสตามประเภทงานขนส่งและระยะทางจริง พร้อมเงื่อนไขการประเมินราคาชัดเจน",
    title: "ราคารถรับจ้างตู้ทึบ ค่าขนส่งมอเตอร์ไซค์และย้ายบ้านคอนโด | WMS TRANSPORT",
    metaDescription: "เช็กอัตราค่าบริการรถกระบะตู้ทึบรับจ้าง ย้ายหอพัก คอนโด และขนส่งมอเตอร์ไซค์ ราคาประเมินตามระยะทางจริง โปร่งใสไม่มีค่าใช้จ่ายบวกเพิ่มลึกลับ",
    canonicalPath: "/pricing",
    isIndexable: true,
    proofRequirements: ["ราคาเริ่มต้นที่ตรวจสอบได้", "รายการที่รวมและไม่รวมในราคาชัดเจน", "เงื่อนไขการจองและการยกเลิก"]
  },
  "pricing-moving": {
    pageType: "pricing",
    primarySearchIntent: "ราคาบริการย้ายบ้าน ย้ายคอนโด ย้ายหอพัก พร้อมทีมยก",
    primaryKeyword: "ราคาจ้างย้ายบ้านคอนโด",
    secondaryKeywords: ["ราคาย้ายหอพัก", "ค่าบริการคนช่วยยกของ", "ราคาย้ายออฟฟิศ"],
    h1: "ราคาบริการย้ายบ้าน ย้ายคอนโด และหอพัก ประเมินราคาละเอียดก่อนเริ่มงาน",
    heroSupportingStatement: "แสดงตัวอย่างราคาในแต่ละขนาดห้องพัก พร้อมสรุปค่าคนยกและอุปกรณ์แพ็กป้องกันรอยขีดข่วน",
    title: "ราคาย้ายบ้าน ย้ายคอนโด หอพัก และค่าจ้างคนช่วยยกของ | WMS TRANSPORT",
    metaDescription: "ค่าบริการขนย้ายบ้าน คอนโด อพาร์ทเม้นท์ และหอพักแบบละเอียด ประเมินราคาจริงตามปริมาณสิ่งของและชั้นอาคาร พร้อมมาตรการดูแลความปลอดภัยทุกเที่ยว",
    canonicalPath: "/pricing/moving",
    isIndexable: true,
    proofRequirements: ["ตัวอย่างขนาดห้องและปริมาตรสิ่งของ", "ค่าจ้างพนักงานยกแยกตามหน้างาน", "ตารางราคาอุปกรณ์กันกระแทก"]
  },
  "pricing-motorcycle": {
    pageType: "pricing",
    primarySearchIntent: "อัตราค่าขนส่งรถจักรยานยนต์ บิ๊กไบค์ ทั่วประเทศ แยกตามรุ่นและระยะทาง",
    primaryKeyword: "ราคาขนส่งมอเตอร์ไซค์",
    secondaryKeywords: ["ค่าส่งบิ๊กไบค์", "ราคาขนส่งมอเตอร์ไซค์ไปต่างจังหวัด", "ค่าส่งมอเตอร์ไซค์ทางรถยนต์"],
    h1: "ตารางราคาขนส่งรถมอเตอร์ไซค์และบิ๊กไบค์แบบตู้ทึบ แยกตามรุ่นและพิกัดความจุ",
    heroSupportingStatement: "ใส่ใจความปลอดภัยทุกขั้นตอนด้วยรถตู้ทึบและอุปกรณ์รัดยึดมาตรฐาน เช็กราคาแต่ละพื้นที่ได้ทันที",
    title: "ตารางราคาขนส่งมอเตอร์ไซค์ บิ๊กไบค์ ทั่วไทย | WMS TRANSPORT",
    metaDescription: "เช็กอัตราค่าบริการส่งมอเตอร์ไซค์และบิ๊กไบค์ทั่วประเทศ อิงตามพิกัด cc ของรถ ปลอดภัยด้วยตู้ทึบกันฝนกันฝุ่น ดูแลความปลอดภัยทุกเที่ยว",
    canonicalPath: "/pricing/motorcycle-transport",
    isIndexable: true,
    proofRequirements: ["ราคาแยกตามขนาดเครื่องยนต์ cc", "เงื่อนไขการรัดตรึงและแรปกันรอย", "มาตรการดูแลความปลอดภัยของสิ่งของ"]
  },
  "pricing-freight": {
    pageType: "pricing",
    primarySearchIntent: "จ้างเหมารถขนสินค้าโรงงาน สินค้าเกษตร ไปต่างจังหวัด เช็กราคาตามจริง",
    primaryKeyword: "ราคาเหมารถกระบะตู้ทึบ",
    secondaryKeywords: ["ราคาขนสินค้าโรงงาน", "ค่าส่งของเหมาเที่ยว", "ราคารถกระบะรับจ้างทั่วไป"],
    h1: "ราคาขนส่งสินค้าอุปโภคบริโภค สินค้าโรงงาน และการกระจายสินค้าแบบเหมาเที่ยว",
    heroSupportingStatement: "ประเมินราคาตามระยะทางจริง มีอุปกรณ์สายรัดนิรภัย ประสานงานติดตามสถานะงานได้ตลอดการขนส่ง พร้อมเอกสารรับเงิน",
    title: "ราคาเหมารถกระบะตู้ทึบขนส่งสินค้าทั่วไทย | WMS TRANSPORT",
    metaDescription: "ตารางราคาบริการขนส่งสินค้าโรงงานและกระจายสินค้าเชิงพาณิชย์แบบเหมาเที่ยวทั่วไทย คิดตามจริงพร้อมเอกสารประกอบครบถ้วนพร้อมดูแลความปลอดภัย",
    canonicalPath: "/pricing/freight",
    isIndexable: true,
    proofRequirements: ["ราคาเริ่มต้นต่อกิโลเมตร", "นโยบายการเคลมสินค้าและออกใบเสร็จ", "การประสานงานติดตามสถานะขนส่ง"]
  },
  "guide-capacity": {
    pageType: "guide",
    primarySearchIntent: "ประเมินปริมาตรสิ่งของเป็นคิว (CBM) เพื่อเลือกรถย้ายบ้านคอนโดให้เหมาะสม",
    primaryKeyword: "รถกระบะตู้ทึบใส่ของได้กี่คิว",
    secondaryKeywords: ["ขนาดตู้ทึบกระบะรับจ้าง", "วิธีคำนวณคิวขนของ", "ปริมาตรสิ่งของย้ายบ้าน"],
    h1: "รถกระบะตู้ทึบใส่ของได้กี่คิว? วิธีวัดขนาดตู้และคำนวณปริมาตรของก่อนย้ายบ้าน",
    heroSupportingStatement: "เปรียบเทียบขนาดตู้มาตรฐานความสูง 2.1 เมตร พร้อมเช็กขนาดของชิ้นใหญ่ เช่น ที่นอน โซฟา ตู้เย็น ว่าใส่ได้พอดีหรือไม่",
    title: "รถกระบะตู้ทึบใส่ของได้กี่คิว? เช็กขนาดรถและปริมาตรของก่อนย้ายบ้าน | WMS",
    metaDescription: "ไขข้อข้องใจ รถกระบะตู้ทึบความสูง 2.1 ม. จุสิ่งของได้กี่คิว (CBM) พร้อมตารางเทียบขนาดเฟอร์นิเจอร์ และเช็กลิสต์คำนวณปริมาตรก่อนย้ายบ้านคอนโด",
    canonicalPath: "/guides/truck-capacity-cbm",
    isIndexable: true,
    proofRequirements: ["ขนาดมิติรถกว้าง x ยาว x สูง จริง", "สูตรการคำนวณปริมาตร คิว (CBM)", "รายการจำลองปริมาณสิ่งของของห้องขนาดต่าง ๆ"]
  },
  "compare-pickup-vs-box": {
    pageType: "comparison",
    primarySearchIntent: "เปรียบเทียบความแตกต่างระหว่างรถกระบะตอนเดียวตู้ทึบกับรถคอกเปิดประทุนย้ายบ้าน",
    primaryKeyword: "รถกระบะตู้ทึบปะทะรถคอก",
    secondaryKeywords: ["ข้อดีรถกระบะตู้ทึบ", "ความปลอดภัยในการขนของย้ายบ้าน", "ย้ายบ้านช่วงฝนตกเลือกรถแบบไหน"],
    h1: "เปรียบเทียบ: รถกระบะตู้ทึบ VS รถกระบะคอกเปิดประทุน ขนย้ายบ้านควรเลือกแบบไหนดี?",
    heroSupportingStatement: "เจาะลึกความปลอดภัย การกันแดดกันฝน ความจุ และความสะดวกในการโหลดของเพื่อการตัดสินใจที่ถูกต้อง",
    title: "รถกระบะตู้ทึบ VS รถกระบะคอกย้ายบ้าน เลือกแบบไหนปลอดภัยที่สุด | WMS",
    metaDescription: "เปรียบเทียบข้อดีข้อเสียระหว่างรถกระบะตู้ทึบปิดมิดชิดกับรถกระบะคอกคลุมผ้าใบด้านความจุ ความปลอดภัยในการขนส่ง และการป้องกันความเสียหาย",
    canonicalPath: "/compare/pickup-vs-box-truck",
    isIndexable: true,
    proofRequirements: ["การทดสอบความชื้นและฝน", "ระดับความเสี่ยงสิ่งของสูญหาย/ร่วงหล่น", "เปรียบเทียบราคาตามความเหมาะสมของประเภทของ"]
  },
  "compare-alone-vs-helpers": {
    pageType: "comparison",
    primarySearchIntent: "ตัดสินใจระหว่างย้ายของย้ายบ้านเองกับจ้างคนช่วยยกของเพิ่มประหยัดกว่าหรือไม่",
    primaryKeyword: "จ้างคนช่วยยกของย้ายบ้าน",
    secondaryKeywords: ["ย้ายบ้านคนเดียว", "ราคาจ้างคนยกของ", "ข้อจำกัดในการย้ายคอนโดไม่มีลิฟต์"],
    h1: "ย้ายของเอง VS จ้างคนช่วยยกของ WMS: แบบไหนคุ้มค่าและปลอดภัยต่อทรัพย์สินมากกว่ากัน?",
    heroSupportingStatement: "วิเคราะห์ความคุ้มค่าด้านเวลา สุขภาพร่างกาย ความปลอดภัยของทรัพย์สินชิ้นใหญ่ และตารางค่าบริการจริง",
    title: "ย้ายของเองหรือจ้างคนช่วยยกเพิ่ม คุ้มค่าต่างกันอย่างไร? | WMS TRANSPORT",
    metaDescription: "เปรียบเทียบแบบเจาะลึกระหว่างการขนย้ายหอพักย้ายบ้านด้วยตัวเอง กับการซื้อบริการเสริมคนช่วยยกของ WMS ช่วยผ่อนแรง ป้องกันการบาดเจ็บและของเสียหาย",
    canonicalPath: "/compare/moving-alone-vs-helpers",
    isIndexable: true,
    proofRequirements: ["เปรียบเทียบระยะเวลาขนย้ายเฉลี่ย", "อัตราการชำรุดเสียหายของเฟอร์นิเจอร์", "ความเสี่ยงต่ออาการบาดเจ็บกล้ามเนื้อ"]
  },
  "compare-one-vs-multiple": {
    pageType: "comparison",
    primarySearchIntent: "เปรียบเทียบระหว่างการขนย้ายเสร็จในเที่ยวเดียวกับขนย้ายหลายรอบแบบไหนจ่ายน้อยกว่า",
    primaryKeyword: "ย้ายบ้านเที่ยวเดียวจบ",
    secondaryKeywords: ["ราคารถรับจ้างหลายรอบ", "การคำนวณปริมาตรของเพื่อจัดรถ", "ระยะเวลาที่ใช้ในการขนย้าย"],
    h1: "ย้ายของเที่ยวเดียวจบ VS ขนส่งหลายเที่ยว: วิธีวางแผนประหยัดค่ารถและเวลา",
    heroSupportingStatement: "เปรียบเทียบค่าบริการของรถขนาดเดียววิ่งสองรอบเทียบกับการจ้างรถคันใหญ่ขึ้นหรือเพิ่มรถเพื่อประหยัดต้นทุนรวม",
    title: "ย้ายของเที่ยวเดียวหรือขนหลายรอบ แบบไหนคุ้มกว่า? | WMS TRANSPORT",
    metaDescription: "วิธีคำนวณและเปรียบเทียบค่าใช้จ่ายการขนของแบบวิ่งหลายเที่ยวเทียบกับเที่ยวเดียวจบ ป้องกันค่าใช้จ่ายสะสมปลายบานปลายเพื่อการประเมินราคาที่คุ้มค่าที่สุด",
    canonicalPath: "/compare/one-vehicle-vs-multiple-trips",
    isIndexable: true,
    proofRequirements: ["สมการเปรียบเทียบราคาค่าน้ำมันและค่ารถ", "การคำนวณปริมาตรของเทียบกับประเภทรถ", "ผลกระทบต่อเวลาหน้างาน"]
  }
};

// Generates dynamic search intents for provinces to avoid duplicate patterns
export function getProvinceIntent(provinceSlug: string, name: string): IntentRecord {
  if (provinceSlug === "bkk-thonburi") {
    return {
      pageType: "province",
      primarySearchIntent: "รถรับจ้างฝั่งธนบุรี",
      primaryKeyword: "รถรับจ้างฝั่งธนบุรี",
      secondaryKeywords: ["รถรับจ้างเพชรเกษม", "รถรับจ้างพุทธมณฑล", "รถกระบะตู้ทึบฝั่งธนบุรี"],
      h1: "รถรับจ้างฝั่งธนบุรี ขนย้ายบ้าน คอนโด และส่งของทั่วไป",
      heroSupportingStatement: "บริการรถกระบะตู้ทึบรับจ้างครอบคลุม 15 เขตฝั่งธนบุรี ย้ายคอนโดมิเนียม ทาวน์โฮม บ้านเดี่ยว และขนส่งสินค้า ด้วยรถตู้ทึบสูง 2.1 ม. พร้อมคนช่วยยกของ",
      title: "รถรับจ้างฝั่งธนบุรี เพชรเกษม–พุทธมณฑล | WMS",
      metaDescription: "บริการรถรับจ้างฝั่งธนบุรี รถกระบะตู้ทึบย้ายบ้าน คอนโด หอพัก และส่งของ ครอบคลุมกาญจนาภิเษก กัลปพฤกษ์ ราชพฤกษ์ แยกบางบอน ท่าพระ วงเวียนใหญ่ เคหะธนบุรี พร้อมคนยก",
      canonicalPath: "/service/bkk-thonburi",
      isIndexable: true,
      proofRequirements: ["หลักฐานงานจริงในพื้นที่ฝั่งธนบุรี", "ข้อกำหนดความสูงรถตู้ทึบ 2.1 ม.", "การประสานงานจองลิฟต์คอนโด"],
    };
  }

  if (provinceSlug === "samutsakhon") {
    return {
      pageType: "province",
      primarySearchIntent: "รถรับจ้างสมุทรสาคร",
      primaryKeyword: "รถรับจ้างสมุทรสาคร",
      secondaryKeywords: ["รถรับจ้างมหาชัย", "รถรับจ้างพระราม 2", "รถกระบะตู้ทึบสมุทรสาคร"],
      h1: "รถรับจ้างสมุทรสาคร ขนส่งสินค้าโรงงานและย้ายบ้านพร้อมคนยก",
      heroSupportingStatement: "บริการรถกระบะตู้ทึบรับจ้างสมุทรสาคร ครอบคลุมมหาชัย กระทุ่มแบน อ้อมน้อย พุทธมณฑลสาย 4 สาย 5 พระราม 2 พร้อมทีมงานช่วยยกของและดูแลความปลอดภัย",
      title: "รถรับจ้างสมุทรสาคร มหาชัย–พระราม 2 | WMS",
      metaDescription: "บริการรถรับจ้างสมุทรสาคร รถกระบะตู้ทึบขนส่งสินค้าโรงงาน ย้ายบ้านและหอพัก ครอบคลุมมหาชัย กระทุ่มแบน อ้อมน้อย พุทธมณฑลสาย 4 สาย 5 และอ้อมใหญ่ พร้อมคนยก",
      canonicalPath: "/service/samutsakhon",
      isIndexable: true,
      proofRequirements: ["หลักฐานงานขนส่งสินค้าโรงงานจริง", "เส้นทางสัญจรมหาชัย-พระราม 2", "อุปกรณ์รัดตรึงสินค้ามาตรฐาน"],
    };
  }

  return {
    pageType: "province",
    primarySearchIntent: `จ้างรถขนของ ย้ายหอพัก หรือส่งมอเตอร์ไซค์ในพื้นที่จังหวัด${name}`,
    primaryKeyword: `รถรับจ้างขนของ ${name}`,
    secondaryKeywords: [`รถกระบะตู้ทึบ ${name}`, `ย้ายคอนโด ${name}`, `ส่งมอเตอร์ไซค์ ${name}`],
    h1: `บริการรถกระบะตู้ทึบรับจ้าง ${name} ย้ายบ้าน คอนโด และส่งมอเตอร์ไซค์`,
    heroSupportingStatement: `บริการขนส่งและขนย้ายครบวงจรในพื้นที่${name}พร้อมทีมงานยกของ ดูแลความปลอดภัย คุยง่าย ราคาโปร่งใส`,
    title: `รถกระบะรับจ้าง ${name} ขนส่งมอเตอร์ไซค์ ย้ายบ้านคอนโด | WMS TRANSPORT`,
    metaDescription: `บริการรถรับจ้างขนของ${name} รถกระบะตู้ทึบขนาดใหญ่ย้ายบ้าน คอนโด หอพัก และบริการขนส่งรถมอเตอร์ไซค์บิ๊กไบค์ทั่วไทย มีคนช่วยยกของดูแลความปลอดภัยตลอดเส้นทาง`,
    canonicalPath: `/service/${provinceSlug}`,
    isIndexable: true,
    proofRequirements: [`หลักฐานงานจริงในจังหวัด${name}`, `ระยะเวลาขนส่งตามการเดินทางจริง`, `รีวิวจากผู้ใช้บริการในพื้นที่`]
  };
}

```

### `src/data/districtLandingPages.ts` (Complete File)
Lines 1 - 762

```ts
export type ThonburiZone = 'northern' | 'southern';

export interface ServiceCorridorCard {
  title: string;
  coverageAreas: string[];
  suitability: string;
  routeConnections: string;
  pricingFactors: string;
  customerPrep: string;
}

export interface LocalEvidenceItem {
  verifiedJobLocation?: string;
  verifiedJobDate?: string;
  realImagePath?: string;
  shortJobDescription?: string;
  verificationStatus: 'verified' | 'unverified' | 'pending';
}

export interface DistrictRecord {
  province: string; // matches key in provinceMap (e.g. 'bkk-thonburi', 'samutsakhon')
  districtSlug: string; // e.g. 'bang-khae'
  districtThaiName: string;
  zone?: ThonburiZone; // Northern vs Southern Thonburi grouping
  subdistricts?: string[]; // Official BMA Khwaeng
  primaryIntent: string;
  seoTitle?: string;
  metaDescription?: string;
  h1: string;
  directAnswer: string;
  actualServiceCapability: string;
  localOperationalNotes: string;
  travelCorridors: string[];
  serviceCorridors?: ServiceCorridorCard[];
  propertyAccessContext: string;
  propertyTypes: string[];
  jobEvaluationFactors: string[];
  projectEvidenceIds: string[];
  images: { path: string; alt: string; caption: string }[];
  evidenceItems?: LocalEvidenceItem[];
  reviewEvidenceIds: string[];
  localFaq: { q: string; a: string }[];
  nearbyDistrictSlugs: string[]; // 3-4 neighboring districts for contextual links
  lastReviewedDate: string;
  proofScore: number; // calculated score out of 100 based on verified local indicators
  isIndexable: boolean;
  status: 'published' | 'draft_evidence_required';
}

export const districtLandingPages: Record<string, DistrictRecord> = {
  // ==========================================
  // SOUTHERN THONBURI (กลุ่มเขตกรุงธนใต้ - 7 เขต)
  // ==========================================

  // 1. บางแค (PILOT - PUBLISHED)
  "bang-khae": {
    province: "bkk-thonburi",
    districtSlug: "bang-khae",
    districtThaiName: "บางแค",
    zone: "southern",
    subdistricts: ["บางแค", "บางแคเหนือ", "บางไผ่", "หลักสอง"],
    primaryIntent: "รถรับจ้างเพชรเกษม / รถรับจ้างบางแค",
    seoTitle: "รถรับจ้างเพชรเกษม–บางแค พร้อมคนยก | WMS",
    metaDescription: "บริการรถรับจ้างเพชรเกษม–บางแค รถกระบะตู้ทึบย้ายบ้าน คอนโด หอพัก และส่งของ ครอบคลุมพุทธมณฑลสาย 1 สาย 2 สาย 3 เดอะมอลล์บางแค ตลาดสำเพ็ง 2 พร้อมคนยก",
    h1: "รถรับจ้างเพชรเกษม–บางแค บริการขนย้ายบ้าน คอนโด และส่งของ",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในย่านเพชรเกษม–บางแค ครอบคลุมถนนเพชรเกษม กาญจนาภิเษก กัลปพฤกษ์ และพุทธมณฑลสาย 1, 2, 3 รองรับงานย้ายบ้าน ทาวน์โฮม คอนโดมิเนียมแนวรถไฟฟ้า MRT หลักสอง ขนส่งสินค้าตลาดสำเพ็ง 2 และส่งมอเตอร์ไซค์ ด้วยรถกระบะตู้ทึบหลังคาสูงปิดมิดชิด (โปรดแจ้งรายละเอียดหน้างานเพื่อให้เจ้าหน้าที่ตรวจสอบรถและอุปกรณ์ที่เหมาะสม) พร้อมทีมงานช่วยยกของมืออาชีพ",
    actualServiceCapability: "รถกระบะตู้ทึบหลังคาสูงปิดมิดชิด รองรับการขนย้ายหอพัก คอนโด บ้านเดี่ยว และทาวน์โฮม พร้อมพนักงานช่วยยกของตามขนาดงาน",
    localOperationalNotes: "พื้นที่บางแคมีซอยแยกย่อยและตรอกแคบหลายจุด โดยเฉพาะเพชรเกษม 63, 65 และ 81 รถกระบะตู้ทึบ WMS สามารถเข้าพื้นที่ได้อย่างคล่องตัว มีทีมงานช่วยยกของและดูแลความปลอดภัยของทรัพย์สิน",
    travelCorridors: ["ถนนเพชรเกษม", "ถนนกาญจนาภิเษก", "ถนนกัลปพฤกษ์", "พุทธมณฑลสาย 1", "พุทธมณฑลสาย 2", "พุทธมณฑลสาย 3"],
    serviceCorridors: [
      {
        title: "แนวแกนเพชรเกษม – รถไฟฟ้า MRT หลักสอง – เดอะมอลล์บางแค",
        coverageAreas: ["ถนนเพชรเกษม", "MRT หลักสอง", "เดอะมอลล์บางแค", "ซอยเพชรเกษม 63", "ซอยเพชรเกษม 65", "ซอยเพชรเกษม 81"],
        suitability: "เหมาะสำหรับงานย้ายคอนโดมิเนียม อพาร์ตเมนต์ และทาวน์โฮมริมถนนเพชรเกษม รถตู้ทึบหลังคาสูงปิดมิดชิด ขนย้ายสิ่งของทรงสูงได้ จอดเทียบจุดโหลดของชั้นล่างหรือลานจอดได้สะดวก",
        routeConnections: "เชื่อมต่อตรงสู่ถนนกาญจนาภิเษก ท่าพระ วงเวียนใหญ่ และทางลัดออกสู่ถนนกัลปพฤกษ์",
        pricingFactors: "คำนวณตามระยะทางจริง ชั้นอาคาร การมีลิฟต์ขนของ และจำนวนพนักงานยกของที่เหมาะสมกับปริมาณสัมภาระ",
        customerPrep: "ติดต่อนัดหมายนิติบุคคลอาคารเพื่อจองลิฟต์ขนของและสำรองจุดจอดเทียบรถล่วงหน้า"
      },
      {
        title: "เส้นทางพุทธมณฑลสาย 1 – พุทธมณฑลสาย 2 – พุทธมณฑลสาย 3",
        coverageAreas: ["พุทธมณฑลสาย 1", "พุทธมณฑลสาย 2", "พุทธมณฑลสาย 3", "แขวงบางไผ่", "แขวงบางแคเหนือ"],
        suitability: "เหมาะสำหรับย้ายบ้านเดี่ยว ทาวน์โฮมจัดสรร ขนส่งมอเตอร์ไซค์/บิ๊กไบค์ และส่งของชิ้นใหญ่ รถตู้ทึบเข้าซอยย่อยและข้ามสะพานคลองได้อย่างคล่องตัว",
        routeConnections: "เชื่อมระหว่างถนนเพชรเกษมกับถนนบรมราชชนนี มุ่งหน้าสู่นครปฐมหรือเข้าสู่ฝั่งธนบุรีชั้นใน",
        pricingFactors: "ประเมินตามระยะทางวิ่งจริงและปริมาณสัมภาระ แจ้งราคาสุทธิก่อนเริ่มงาน ไม่มีค่าใช้จ่ายแอบแฝง",
        customerPrep: "คัดแยกสิ่งของ ถอดประกอบเฟอร์นิเจอร์ชิ้นใหญ่ หรือแจ้งทีมงานล่วงหน้าเพื่อเตรียมฟิล์มแรปป้องกันรอยขีดข่วน"
      },
      {
        title: "เส้นทางกัลปพฤกษ์ – กาญจนาภิเษก – ตลาดสำเพ็ง 2",
        coverageAreas: ["ถนนกัลปพฤกษ์", "วงแหวนกาญจนาภิเษก", "ตลาดสำเพ็ง 2", "บางแคเหนือ", "รอยต่อบางบอน"],
        suitability: "เหมาะสำหรับการขนส่งสินค้า ค้าส่ง-ค้าปลีก สินค้าแพ็กกล่อง อุปกรณ์จัดบูธ และย้ายอาคารพาณิชย์",
        routeConnections: "เชื่อมสู่วงแหวนรอบนอก มุ่งหน้าถนนพระราม 2 หรือออกสู่บางบอน-สมุทรสาครได้อย่างรวดเร็ว",
        pricingFactors: "เหมารถกระบะตู้ทึบรายเที่ยว คิดตามจุดรับส่งจริง พร้อมระบุคนช่วยยกของอย่างโปร่งใส",
        customerPrep: "เตรียมรายการจำนวนกล่องหรือพาเลท และระบุเวลาเปิด-ปิดของโกดังหรือร้านค้าต้นทาง/ปลายทาง"
      }
    ],
    propertyAccessContext: "พบหมู่บ้านจัดสรรเก่าและทาวน์โฮม 3 ชั้นจำนวนมาก รวมถึงคอนโดแนวรถไฟฟ้าสายสีน้ำเงิน การเข้าจอดเทียบขนย้ายมักดำเนินการที่จุดโหลดสินค้าชั้นล่าง (Loading Bay) หรือลานจอดที่ไม่มีสิ่งกีดขวางความสูง",
    propertyTypes: ["คอนโดมิเนียม High-rise แนวถนนเพชรเกษม", "ทาวน์โฮม 2-3 ชั้นในซอยเพชรเกษม 63/81", "บ้านเดี่ยวโครงการจัดสรรถนนกาญจนาภิเษก", "อาคารพาณิชย์ย่านตลาดบางแค"],
    jobEvaluationFactors: [
      "ระยะทางวิ่งจริงจากต้นทางบางแคไปยังปลายทาง",
      "ชั้นอาคารและการมีอยู่ของลิฟต์โดยสารหรือลิฟต์ขนของ",
      "จำนวนสิ่งของชิ้นใหญ่ที่ต้องถอดประกอบหรือแรปป้องกัน",
      "จำนวนพนักงานยกของที่เหมาะสมกับปริมาณสัมภาระ"
    ],
    projectEvidenceIds: ["moving-condo-bang-khae"],
    images: [
      {
        path: "/images/WM10.webp",
        alt: "บริการรถกระบะตู้ทึบรับจ้าง WMS TRANSPORT ขนย้ายบ้านและคอนโด",
        caption: "บริการขนย้ายสัมภาระและจัดเรียงสิ่งของด้วยรถกระบะตู้ทึบ"
      }
    ],
    evidenceItems: [
      {
        realImagePath: "/images/WM10.webp",
        verificationStatus: "unverified",
        shortJobDescription: "งานขนย้ายคอนโดมิเนียม"
      }
    ],
    reviewEvidenceIds: ["rev-bk-01"],
    localFaq: [
      {
        q: "รถขนของ WMS จอดเทียบขนย้ายที่คอนโดย่านบางแคอย่างไร?",
        a: "รถกระบะตู้ทึบของ WMS TRANSPORT เป็นรถกระบะตู้ทึบหลังคาสูงปิดมิดชิด (โปรดแจ้งรายละเอียดหน้างานเพื่อให้เจ้าหน้าที่ตรวจสอบรถและอุปกรณ์ที่เหมาะสม) สำหรับการจอดเทียบขนย้าย แนะนำให้นัดหมายจุดโหลดของหรือลานจอดชั้นล่างกับนิติบุคคลของอาคาร"
      },
      {
        q: "ย้ายของจากบางแคเข้าซอยแคบอย่างเพชรเกษม 63 หรือ 81 สะดวกไหม?",
        a: "รถกระบะตอนเดียวตู้ทึบของเรามีความคล่องตัวสูง สามารถเลี้ยวเข้าตรอกซอยในย่านบางแคได้อย่างสะดวกและปลอดภัย"
      },
      {
        q: "หากต้องการย้ายของจากบางแคไปต่างจังหวัด คิดราคาอย่างไร?",
        a: "เราคำนวณราคาเริ่มต้นตามระยะทางวิ่งจริงจากพิกัดบางแคไปยังจังหวัดปลายทางและรายละเอียดสิ่งของอย่างโปร่งใส สามารถทักเจ้าหน้าที่เพื่อประเมินราคาตามจริงได้ทุกวัน"
      }
    ],
    nearbyDistrictSlugs: ["nong-khaem", "phasi-charoen", "bang-bon"],
    lastReviewedDate: "2026-06-25",
    proofScore: 85,
    isIndexable: true,
    status: "published"
  },

  // 2. หนองแขม (DRAFT / EVIDENCE REQUIRED)
  "nong-khaem": {
    province: "bkk-thonburi",
    districtSlug: "nong-khaem",
    districtThaiName: "หนองแขม",
    zone: "southern",
    subdistricts: ["หนองแขม", "หนองค้างพลู"],
    primaryIntent: "รถรับจ้างหนองแขม ย้ายบ้าน ขนของ ทาวน์โฮม เพชรเกษม 81 พุทธสาคร",
    h1: "รถรับจ้างหนองแขม บริการย้ายบ้าน ขนของ ทาวน์โฮม และขนส่งมอเตอร์ไซค์",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างขนของในเขตหนองแขม ครอบคลุมถนนเพชรเกษม ถนนมาเจริญ (ซอยเพชรเกษม 81) ซอย 69 ซอย 77 ถนนเลียบคลองภาษีเจริญ และถนนพุทธสาคร เหมาะสำหรับการย้ายบ้านเดี่ยว ทาวน์โฮมโครงการจัดสรร และขนส่งสินค้าโรงงานขนาดย่อม พร้อมทีมงานยกของและอุปกรณ์รัดตรึงครบครัน",
    actualServiceCapability: "รถกระบะตู้ทึบตอนเดียว บรรทุกย้ายของทาวน์โฮม บ้านจัดสรร หอพักนักศึกษา และมอเตอร์ไซค์บิ๊กไบค์ มีอุปกรณ์ยึดตรึงสิ่งของและพลาสติกแรปหุ้มเฟอร์นิเจอร์",
    localOperationalNotes: "พื้นที่หนองแขมมีโครงการที่อยู่อาศัยแนวราบหนาแน่น การจราจรช่วงเช้าและเย็นบนถนนเพชรเกษม 81 และถนนเลียบคลองภาษีเจริญฝั่งเหนือ/ใต้มีรถหนาแน่น ทีมงาน WMS มีประสบการณ์การวางแผนเวลาเดินทางเพื่อความสะดวกรวดเร็ว",
    travelCorridors: ["ถนนเพชรเกษม", "ถนนมาเจริญ (เพชรเกษม 81)", "ถนนทวีวัฒนา", "ถนนพุทธสาคร", "ถนนเลียบคลองภาษีเจริญฝั่งเหนือ/ใต้"],
    propertyAccessContext: "ส่วนใหญ่เป็นหมู่บ้านทาวน์โฮม 2-3 ชั้นและบ้านเดี่ยว ถนนในซอยมีสะพานข้ามคลองและเนินชะลอความเร็วหลายจุด รถกระบะตู้ทึบช่วงล่างแน่นหนาของเราสามารถขับข้ามได้อย่างนุ่มนวล ป้องกันสิ่งของภายในกระแทกเสียหาย",
    propertyTypes: ["หมู่บ้านทาวน์โฮมจัดสรรย่านเพชรเกษม 81", "บ้านเดี่ยวโครงการใหม่ถนนพุทธสาคร", "อาคารพาณิชย์และร้านค้าริมถนนมาเจริญ", "หอพักและอพาร์ตเมนต์ย่านมหาวิทยาลัยเอเชียอาคเนย์"],
    jobEvaluationFactors: [
      "ระยะทางจากจุดขึ้นของในหนองแขมไปยังปลายทาง",
      "ประเภทอสังหาริมทรัพย์ (ทาวน์โฮม, บ้านเดี่ยว หรือตึกแถว)",
      "จำนวนชั้นที่ต้องยกสัมภาระขึ้น-ลง",
      "ความต้องการพนักงานช่วยยกของและอุปกรณ์แรปหุ้มพิเศษ"
    ],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "รถรับจ้างหนองแขม รับขนย้ายในซอยเพชรเกษม 81 หรือซอย 69 หรือไม่?",
        a: "เราให้บริการครอบคลุมเส้นทางในเขตหนองแขม ทั้งเพชรเกษม 69, 77, 81 ถนนมาเจริญ และถนนเลียบคลองภาษีเจริญ รถกระบะตู้ทึบเข้าถึงจุดรับส่งได้ตามเส้นทางที่ตกลง"
      },
      {
        q: "มีบริการคนช่วยยกของหนัก เช่น ตู้เย็นขนาดใหญ่ ที่นอน 6 ฟุต หรือไม่?",
        a: "มีพนักงานช่วยยกของคอยดูแล จัดเรียงสิ่งของและใช้สายรัดตรึงในตู้ทึบอย่างแน่นหนา พร้อมพลาสติกแรปกันรอยขีดข่วนสำหรับเฟอร์นิเจอร์ชิ้นสำคัญ"
      },
      {
        q: "การคิดราคาค่าขนส่งจากหนองแขมไปสมุทรสาครหรือนครปฐมเป็นอย่างไร?",
        a: "เนื่องจากหนองแขมอยู่ติดกับเขตพุทธสาคร กระทุ่มแบน และสามพราน เราคิดค่าบริการตามระยะทางจริงที่วิ่งจริงอย่างเป็นธรรม สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่เพื่อประเมินราคาได้ทันที"
      }
    ],
    nearbyDistrictSlugs: ["bang-khae", "thawi-watthana", "bang-bon"],
    lastReviewedDate: "2026-06-25",
    proofScore: 68,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 3. ภาษีเจริญ (DRAFT / EVIDENCE REQUIRED)
  "phasi-charoen": {
    province: "bkk-thonburi",
    districtSlug: "phasi-charoen",
    districtThaiName: "ภาษีเจริญ",
    zone: "southern",
    subdistricts: ["บางหว้า", "บางด้วน", "บางจาก", "บางแวก", "คลองขวาง", "ปากคลองภาษีเจริญ", "คูหาสวรรค์"],
    primaryIntent: "รถรับจ้างภาษีเจริญ ย้ายบ้าน คอนโด บางหว้า ราชพฤกษ์ บางแวก",
    h1: "รถรับจ้างภาษีเจริญ บริการย้ายบ้าน คอนโดมิเนียม และขนส่งสินค้า",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างขนย้ายในเขตภาษีเจริญ ครอบคลุมสถานีอินเตอร์เชนจ์ BTS/MRT บางหว้า ถนนเพชรเกษม ถนนราชพฤกษ์ ถนนบางแวก และถนนพุทธมณฑล สาย 1 บริการย้ายคอนโดมิเนียม อพาร์ตเมนต์ และบ้านพักอาศัยริมคลอง ด้วยรถตู้ทึบความสูงภายใน 2.1 ม. ขนย้ายของชิ้นใหญ่ได้มิดชิดปลอดภัย",
    actualServiceCapability: "ย้ายคอนโด High-rise & Low-rise ย่านสถานีบางหว้า ขนย้ายบ้านพักอาศัยย่านบางแวก และส่งมอเตอร์ไซค์ข้ามจังหวัด มีอุปกรณ์สายรัดและฟิล์มแรปป้องกันริ้วรอย",
    localOperationalNotes: "ย่านภาษีเจริญมีทั้งจุดเชื่อมต่อการเดินทางสมัยใหม่อย่างสถานีบางหว้า และชุมชนเก่าริมคลองภาษีเจริญที่มีสะพานข้ามคลองชันและซอยย่อย ทีมงานมีความคุ้นเคยกับลักษณะภูมิศาสตร์ท้องถิ่นเป็นอย่างดี",
    travelCorridors: ["ถนนเพชรเกษม", "ถนนราชพฤกษ์", "ถนนบางแวก", "ถนนพุทธมณฑล สาย 1", "ถนนกัลปพฤกษ์"],
    propertyAccessContext: "คอนโดมิเนียมรอบสถานี BTS/MRT บางหว้ามักมีระเบียบการจองลิฟต์และจุดจอดโหลดของ แนะนำให้นัดหมายจุดจอดเทียบหน้าอาคารหรือช่องโหลดสินค้ากับนิติบุคคล",
    propertyTypes: ["คอนโดมิเนียม High-rise ย่าน BTS บางหว้า", "บ้านพักอาศัยและทาวน์โฮมถนนบางแวก", "อาคารพาณิชย์ริมถนนเพชรเกษม", "ชุมชนริมคลองภาษีเจริญและวัดปากน้ำ"],
    jobEvaluationFactors: [
      "ระยะทางระหว่างจุดรับสัมภาระในเขตภาษีเจริญไปยังปลายทาง",
      "กฎเกณฑ์การเข้าจอดและช่วงเวลาโหลดของของนิติบุคคลคอนโดมิเนียม",
      "จำนวนพนักงานยกของที่ต้องการ",
      "ขนาดและปริมาณของเฟอร์นิเจอร์ชิ้นใหญ่"
    ],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "คอนโดแถว BTS บางหว้า ต้องจองคิวรถขนของล่วงหน้านานแค่ไหน?",
        a: "แนะนำให้จองคิวรถขนของ WMS ล่วงหน้า 1-2 วันเพื่อล็อกเวลาที่ตรงกับช่วงเวลาที่นิติบุคคลอนุญาตให้ใช้ลิฟต์ขนของได้สะดวกที่สุด"
      },
      {
        q: "ถนนบางแวกหรือซอยวัดปากน้ำ รถตู้ทึบเข้าได้สะดวกไหม?",
        a: "เข้าได้อย่างสะดวกครับ รถกระบะตอนเดียวตู้ทึบขนาดกะทัดรัดของเราถูกออกแบบให้เข้าตรอกซอยและข้ามสะพานคลองในเขตภาษีเจริญได้คล่องตัวกว่ารถบรรทุกขนาดใหญ่"
      },
      {
        q: "มีบริการขนส่งมอเตอร์ไซค์จากภาษีเจริญไปต่างจังหวัดไหม?",
        a: "มีบริการขนส่งมอเตอร์ไซค์และบิ๊กไบค์แบบตู้ทึบมิดชิด พร้อมอุปกรณ์ล็อกล้อและสายรัดกันกระแทกอย่างปลอดภัยตลอดเส้นทาง"
      }
    ],
    nearbyDistrictSlugs: ["bang-khae", "bangkok-yai", "thon-buri"],
    lastReviewedDate: "2026-06-25",
    proofScore: 68,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 4. บางขุนเทียน (DRAFT / EVIDENCE REQUIRED)
  "bang-khun-thian": {
    province: "bkk-thonburi",
    districtSlug: "bang-khun-thian",
    districtThaiName: "บางขุนเทียน",
    zone: "southern",
    subdistricts: ["ท่าข้าม", "แสมดำ"],
    primaryIntent: "รถรับจ้างบางขุนเทียน ขนส่งสินค้า พระราม 2 ท่าข้าม แสมดำ",
    h1: "รถรับจ้างบางขุนเทียน บริการขนส่งสินค้า ขนย้ายโรงงาน และบ้านพักอาศัย",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างครอบคลุมพื้นที่เขตบางขุนเทียน ถนนพระราม 2 ถนนบางขุนเทียน-ชายทะเล ถนนท่าข้าม และแสมดำ เหมาะสำหรับงานขนส่งสินค้าโรงงาน โกดัง และย้ายบ้านจัดสรร",
    actualServiceCapability: "รถกระบะตู้ทึบขนส่งสินค้าโรงงาน ย้ายบ้านจัดสรรพระราม 2 และขนส่งสินค้าเกษตร/อาหารแปรรูปบรรจุกล่อง",
    localOperationalNotes: "ย่านบางขุนเทียนมีทั้งนิคมอุตสาหกรรม โกดังสินค้า และหมู่บ้านจัดสรรขนาดใหญ่ การจราจรบนถนนพระราม 2 มีความหนาแน่น ต้องวางแผนเวลาวิ่งงานอย่างรอบคอบ",
    travelCorridors: ["ถนนพระราม 2", "ถนนบางขุนเทียน-ชายทะเล", "ถนนกาญจนาภิเษก", "ถนนท่าข้าม"],
    propertyAccessContext: "โกดังสินค้า คลังพัสดุ โรงงานขนาดกลาง และหมู่บ้านจัดสรรขนาดใหญ่ มีทางเข้ากว้างขวาง รถกระบะตู้ทึบเข้าเทียบจุดโหลดของได้สะดวก",
    propertyTypes: ["โกดังสินค้าและโรงงานอุตสาหกรรมแสมดำ", "หมู่บ้านจัดสรรขนาดใหญ่ถนนพระราม 2", "อาคารพาณิชย์ย่านท่าข้าม"],
    jobEvaluationFactors: ["ระยะทางวิ่งจริง", "น้ำหนักและปริมาตรสินค้า", "จำนวนพนักงานช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "พื้นที่บางขุนเทียน ให้บริการครอบคลุมจุดไหนบ้าง?",
        a: "ครอบคลุมถนนพระราม 2 แสมดำ ท่าข้าม และถนนบางขุนเทียน-ชายทะเล สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["bang-bon", "chom-thong", "rat-burana"],
    lastReviewedDate: "2026-06-25",
    proofScore: 68,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 5. บางบอน (DRAFT / EVIDENCE REQUIRED)
  "bang-bon": {
    province: "bkk-thonburi",
    districtSlug: "bang-bon",
    districtThaiName: "บางบอน",
    zone: "southern",
    subdistricts: ["บางบอนเหนือ", "บางบอนใต้", "คลองบางบอน", "คลองบางพราน"],
    primaryIntent: "รถรับจ้างบางบอน ขนของ ย้ายบ้าน เอกชัย บางบอน 1-5",
    h1: "รถรับจ้างบางบอน บริการย้ายบ้าน ขนส่งสินค้า และโรงงานขนาดย่อม",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตบางบอน ถนนเอกชัย ถนนบางบอน 1 ถึงบางบอน 5 รองรับงานย้ายบ้าน ทาวน์โฮม และขนย้ายวัตถุดิบสินค้าสำหรับโรงงานขนาดย่อม",
    actualServiceCapability: "ขนย้ายสินค้าโรงงานการ์เมนต์ โรงกลึง อะไหล่ และย้ายที่อยู่อาศัยทาวน์โฮม",
    localOperationalNotes: "ย่านบางบอนมีซอยเชื่อมระหว่างถนนเอกชัยกับถนนกาญจนาภิเษกหลายจุด รถกระบะตู้ทึบมีความคล่องตัวสูง",
    travelCorridors: ["ถนนเอกชัย", "ถนนบางบอน 1-5", "ถนนกาญจนาภิเษก"],
    propertyAccessContext: "โรงงานขนาดเล็ก อาคารพาณิชย์ และโครงการทาวน์โฮม",
    propertyTypes: ["โรงงานขนาดย่อมและโรงกลึง", "ทาวน์โฮมจัดสรรถนนบางบอน 3-5", "อาคารพาณิชย์ถนนเอกชัย"],
    jobEvaluationFactors: ["ระยะทาง", "จำนวนสิ่งของ", "คนช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "รับขนส่งสินค้าโรงงานแถวบางบอน 3 หรือบางบอน 5 ไหม?",
        a: "ให้บริการครอบคลุมเส้นทางหลักและซอยย่อยในเขตบางบอน สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["bang-khae", "bang-khun-thian", "nong-khaem"],
    lastReviewedDate: "2026-06-25",
    proofScore: 65,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 6. ราษฎร์บูรณะ (DRAFT / EVIDENCE REQUIRED)
  "rat-burana": {
    province: "bkk-thonburi",
    districtSlug: "rat-burana",
    districtThaiName: "ราษฎร์บูรณะ",
    zone: "southern",
    subdistricts: ["ราษฎร์บูรณะ", "บางปะกอก"],
    primaryIntent: "รถรับจ้างราษฎร์บูรณะ สุขสวัสดิ์ บางปะกอก ย้ายบ้าน คอนโด",
    h1: "รถรับจ้างราษฎร์บูรณะ บริการย้ายบ้าน คอนโด และขนส่งสินค้า",
    directAnswer: "WMS TRANSPORT ให้บริการรถตู้ทึบรับจ้างในเขตราษฎร์บูรณะ ถนนสุขสวัสดิ์ ถนนราษฎร์บูรณะ และย่านบางปะกอก บริการขนย้ายหอพัก คอนโด และสำนักงาน",
    actualServiceCapability: "ย้ายคอนโดมิเนียมริมแม่น้ำ ทาวน์โฮม และขนส่งพัสดุสำนักงาน",
    localOperationalNotes: "แนวถนนสุขสวัสดิ์และถนนราษฎร์บูรณะ เชื่อมต่อไปยังพระประแดงและสะพานพระราม 9",
    travelCorridors: ["ถนนสุขสวัสดิ์", "ถนนราษฎร์บูรณะ", "ถนนประชาอุทิศ"],
    propertyAccessContext: "คอนโดมิเนียม อาคารสำนักงาน และชุมชนที่อยู่อาศัย",
    propertyTypes: ["คอนโดมิเนียม", "บ้านพักอาศัย", "อาคารสำนักงานริมแม่น้ำ"],
    jobEvaluationFactors: ["ระยะทาง", "ชั้นอาคาร", "จำนวนคนยก"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "รับขนของย่านสุขสวัสดิ์ บางปะกอก หรือไม่?",
        a: "ให้บริการครอบคลุมทั่วเขตราษฎร์บูรณะ สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["thung-khru", "chom-thong", "thon-buri"],
    lastReviewedDate: "2026-06-25",
    proofScore: 66,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 7. ทุ่งครุ (DRAFT / EVIDENCE REQUIRED)
  "thung-khru": {
    province: "bkk-thonburi",
    districtSlug: "thung-khru",
    districtThaiName: "ทุ่งครุ",
    zone: "southern",
    subdistricts: ["บางมด", "ทุ่งครุ"],
    primaryIntent: "รถรับจ้างทุ่งครุ ประชาอุทิศ พุทธบูชา ย้ายหอพักนักศึกษา ย้ายบ้าน",
    h1: "รถรับจ้างทุ่งครุ บริการย้ายหอพัก มจธ. บางมด ย้ายบ้าน และขนส่งสินค้า",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตทุ่งครุ ถนนประชาอุทิศ ถนนพุทธบูชา และย่านมหาวิทยาลัยเทคโนโลยีพระจอมเกล้าธนบุรี (มจธ. บางมด) เหมาะสำหรับย้ายหอพักนักศึกษาและบ้านพักอาศัย",
    actualServiceCapability: "ขนย้ายหอพักนักศึกษา อพาร์ตเมนต์ และบ้านจัดสรรย่านประชาอุทิศ-พุทธบูชา",
    localOperationalNotes: "ถนนประชาอุทิศและพุทธบูชามีการจราจรหนาแน่นช่วงเวลาเปิด-ปิดสถาบันการศึกษา",
    travelCorridors: ["ถนนประชาอุทิศ", "ถนนพุทธบูชา", "ถนนครุใน"],
    propertyAccessContext: "หอพักนักศึกษา อพาร์ตเมนต์ และหมู่บ้านจัดสรร",
    propertyTypes: ["หอพักและอพาร์ตเมนต์นักศึกษา", "ทาวน์โฮมและบ้านเดี่ยวถนนประชาอุทิศ"],
    jobEvaluationFactors: ["ระยะทาง", "ขนาดห้องพัก", "จำนวนคนช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "ย้ายหอพักนักศึกษาย่าน มจธ. บางมด มีคนช่วยยกของไหม?",
        a: "มีพนักงานช่วยยกของบริการครับ สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["rat-burana", "chom-thong", "bang-khun-thian"],
    lastReviewedDate: "2026-06-25",
    proofScore: 68,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // ==========================================
  // NORTHERN THONBURI (กลุ่มเขตกรุงธนเหนือ - 8 เขต)
  // ==========================================

  // 8. ธนบุรี (DRAFT / EVIDENCE REQUIRED)
  "thon-buri": {
    province: "bkk-thonburi",
    districtSlug: "thon-buri",
    districtThaiName: "ธนบุรี",
    zone: "northern",
    subdistricts: ["วัดกัลยาณ์", "หิรัญรูจี", "บางยี่เรือ", "บุคคโล", "ตลาดพลู", "ดาวคะนอง", "สำเหร่"],
    primaryIntent: "รถรับจ้างธนบุรี ตลาดพลู วงเวียนใหญ่ ท่าพระ ดาวคะนอง ย้ายบ้าน ขนของ",
    h1: "รถรับจ้างเขตธนบุรี บริการย้ายบ้าน ขนของ ตลาดพลู วงเวียนใหญ่ สำเหร่",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตธนบุรี ครอบคลุมย่านตลาดพลู วงเวียนใหญ่ สำเหร่ บุคคโล และดาวคะนอง เหมาะสำหรับงานขนย้ายในชุมชนเมืองเก่าและอาคารพาณิชย์",
    actualServiceCapability: "ขนย้ายบ้านพักอาศัย ชุมชนดั้งเดิม อาคารพาณิชย์ และคอนโดมิเนียมแนวรถไฟฟ้า BTS วงเวียนใหญ่-ตลาดพลู",
    localOperationalNotes: "มีตรอกซอยแคบและชุมชนเมืองเก่าหลายจุด รถตู้ทึบตอนเดียวมีความคล่องตัวในการเข้าพื้นที่",
    travelCorridors: ["ถนนประชาธิปก", "ถนนสมเด็จพระเจ้าตากสิน", "ถนนรัชดาภิเษก", "ถนนเทอดไท"],
    propertyAccessContext: "ตึกแถวโบราณ อาคารพาณิชย์ และคอนโดมิเนียมแนวรถไฟฟ้า",
    propertyTypes: ["อาคารพาณิชย์ตลาดพลู", "คอนโดมิเนียมแนว BTS ตลาดพลู/โพธิ์นิมิตร", "บ้านพักในชุมชน"],
    jobEvaluationFactors: ["ระยะทาง", "ความกว้างของซอย", "จำนวนชั้นที่ต้องยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "ซอยแคบแถวตลาดพลูหรือเทอดไท รถเข้าได้ไหม?",
        a: "รถกระบะตู้ทึบตอนเดียวของเราเข้าตรอกซอยแคบได้ดี สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["khlong-san", "bangkok-yai", "chom-thong"],
    lastReviewedDate: "2026-06-25",
    proofScore: 68,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 9. คลองสาน (DRAFT / EVIDENCE REQUIRED)
  "khlong-san": {
    province: "bkk-thonburi",
    districtSlug: "khlong-san",
    districtThaiName: "คลองสาน",
    zone: "northern",
    subdistricts: ["สมเด็จเจ้าพระยา", "คลองสาน", "บางลำภูล่าง"],
    primaryIntent: "รถรับจ้างคลองสาน เจริญนคร กรุงธนบุรี ลาดหญ้า ย้ายคอนโดหรู",
    h1: "รถรับจ้างคลองสาน บริการย้ายคอนโดมิเนียม ย้ายบ้าน เจริญนคร กรุงธนบุรี",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตคลองสาน ถนนเจริญนคร ถนนกรุงธนบุรี ถนนลาดหญ้า เชี่ยวชาญการย้ายคอนโดมิเนียม High-rise ริมแม่น้ำเจ้าพระยา",
    actualServiceCapability: "ขนย้ายคอนโดมิเนียมหรูริมแม่น้ำเจ้าพระยา อาคารสำนักงาน และบ้านพักอาศัย",
    localOperationalNotes: "คอนโดริมน้ำย่านเจริญนครมีระเบียบความสูงอาคารจอดรถและช่วงเวลาขนย้ายเฉพาะ",
    travelCorridors: ["ถนนเจริญนคร", "ถนนกรุงธนบุรี", "ถนนลาดหญ้า", "ถนนสมเด็จเจ้าพระยา"],
    propertyAccessContext: "คอนโดมิเนียม High-rise ทางเข้าอาคารจำกัดความสูง 2.1 เมตร",
    propertyTypes: ["คอนโดมิเนียม High-rise ริมแม่น้ำเจ้าพระยา", "ทาวน์โฮมและอาคารพาณิชย์ถนนลาดหญ้า"],
    jobEvaluationFactors: ["ระยะทาง", "ระเบียบคอนโดมิเนียม", "คนช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "คอนโดริมแม่น้ำถนนเจริญนคร มีข้อจำกัดความสูงรถไหม?",
        a: "รถกระบะตู้ทึบของเรามีความสูงภายในตู้ 2.1 เมตร สำหรับรองรับสิ่งของชิ้นใหญ่ การเข้าจอดเทียบขนย้ายแนะนำให้นัดหมายจุดโหลดของหรือลานจอดชั้นล่างกับนิติบุคคลของอาคาร"
      }
    ],
    nearbyDistrictSlugs: ["thon-buri", "bangkok-yai", "rat-burana"],
    lastReviewedDate: "2026-06-25",
    proofScore: 70,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 10. จอมทอง (DRAFT / EVIDENCE REQUIRED)
  "chom-thong": {
    province: "bkk-thonburi",
    districtSlug: "chom-thong",
    districtThaiName: "จอมทอง",
    zone: "northern",
    subdistricts: ["บางขุนเทียน", "บางค้อ", "บางมด", "จอมทอง"],
    primaryIntent: "รถรับจ้างจอมทอง วุฒากาศ เอกชัย พระราม 2 ย้ายบ้าน ขนของ",
    h1: "รถรับจ้างจอมทอง บริการย้ายบ้าน ขนของ ทาวน์โฮม วุฒากาศ เอกชัย",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตจอมทอง ถนนวุฒากาศ ถนนจอมทอง ถนนเอกชัย และเชื่อมต่อพระราม 2 ให้บริการย้ายบ้าน ทาวน์โฮม และอพาร์ตเมนต์",
    actualServiceCapability: "ย้ายบ้านพักอาศัย ทาวน์โฮม และหอพักใกล้แนวรถไฟฟ้า BTS วุฒากาศ",
    localOperationalNotes: "มีทางรถไฟสายวงเวียนใหญ่-มหาชัยตัดผ่าน และซอยเชื่อมต่อวุฒากาศ-เทอดไท",
    travelCorridors: ["ถนนจอมทอง", "ถนนวุฒากาศ", "ถนนเอกชัย", "ถนนพระราม 2"],
    propertyAccessContext: "ทาวน์โฮม อาคารพาณิชย์ และคอนโดมิเนียมใกล้สถานีวุฒากาศ",
    propertyTypes: ["ทาวน์โฮมจัดสรร", "คอนโดมิเนียมแนว BTS วุฒากาศ", "บ้านเดี่ยวย่านบางมด"],
    jobEvaluationFactors: ["ระยะทาง", "ซอยที่ตั้ง", "พนักงานยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "รับขนของในซอยวัดจอมทอง หรือถนนวุฒากาศ หรือไม่?",
        a: "ให้บริการทุกพื้นที่ในเขตจอมทองครับ สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["thon-buri", "bang-khun-thian", "phasi-charoen"],
    lastReviewedDate: "2026-06-25",
    proofScore: 65,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 11. บางกอกใหญ่ (DRAFT / EVIDENCE REQUIRED)
  "bangkok-yai": {
    province: "bkk-thonburi",
    districtSlug: "bangkok-yai",
    districtThaiName: "บางกอกใหญ่",
    zone: "northern",
    subdistricts: ["วัดอรุณ", "วัดท่าพระ"],
    primaryIntent: "รถรับจ้างบางกอกใหญ่ ท่าพระ อิสรภาพ วังเดิม ย้ายบ้าน คอนโด",
    h1: "รถรับจ้างบางกอกใหญ่ บริการย้ายบ้าน คอนโดมิเนียม ท่าพระ อิสรภาพ",
    directAnswer: "WMS TRANSPORT ให้บริการรถตู้ทึบรับจ้างในเขตบางกอกใหญ่ ย่านแยกท่าพระ ถนนอิสรภาพ ถนนจรัญสนิทวงศ์ และถนนวังเดิม บริการขนย้ายคอนโดมิเนียมและบ้านพักอาศัย",
    actualServiceCapability: "ย้ายคอนโดมิเนียมรอบแยกท่าพระ MRT ท่าพระ และชุมชนประวัติศาสตร์ใกล้วัดอรุณ",
    localOperationalNotes: "แยกท่าพระเป็นจุดตัดการจราจรสำคัญ มีคอนโดมิเนียมหนาแน่น",
    travelCorridors: ["ถนนเพชรเกษม", "ถนนจรัญสนิทวงศ์", "ถนนอิสรภาพ", "ถนนวังเดิม"],
    propertyAccessContext: "คอนโดมิเนียมแนว MRT ท่าพระ และบ้านพักในตรอกซอยเก่า",
    propertyTypes: ["คอนโดมิเนียม High-rise แยกท่าพระ", "ตึกแถวริมถนนอิสรภาพ"],
    jobEvaluationFactors: ["ระยะทาง", "ลิฟต์และทางเข้าอาคาร", "จำนวนคนช่วยยก"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "คอนโดรอบแยก MRT ท่าพระ รถตู้ทึบเข้าจอดได้ไหม?",
        a: "รถกระบะตู้ทึบของเรามีความสูงภายในตู้ 2.1 เมตร สามารถบรรจุตู้และเตียงทรงสูงได้ การจอดเทียบขนย้ายแนะนำประสานงานจุดโหลดของชั้นล่างกับนิติบุคคล"
      }
    ],
    nearbyDistrictSlugs: ["phasi-charoen", "thon-buri", "bangkok-noi"],
    lastReviewedDate: "2026-06-25",
    proofScore: 68,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 12. บางกอกน้อย (DRAFT / EVIDENCE REQUIRED)
  "bangkok-noi": {
    province: "bkk-thonburi",
    districtSlug: "bangkok-noi",
    districtThaiName: "บางกอกน้อย",
    zone: "northern",
    subdistricts: ["ศิริราช", "บ้านช่างหล่อ", "บางขุนนนท์", "บางขุนศรี", "อรุณอมรินทร์"],
    primaryIntent: "รถรับจ้างบางกอกน้อย พรานนก ศิริราช บางขุนนนท์ อรุณอมรินทร์ ย้ายหอพัก",
    h1: "รถรับจ้างบางกอกน้อย บริการย้ายหอพัก คอนโด บ้าน พรานนก ศิริราช บางขุนนนท์",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตบางกอกน้อย ครอบคลุมพรานนก ศิริราช อรุณอมรินทร์ และบางขุนนนท์ เหมาะสำหรับงานย้ายหอพักบุคลากรทางการแพทย์ อพาร์ตเมนต์ และคอนโดมิเนียม",
    actualServiceCapability: "ย้ายหอพักแพทย์ พยาบาล บุคลากรศิริราช ขนส่งมอเตอร์ไซค์ และย้ายบ้านพักอาศัย",
    localOperationalNotes: "การจราจรรอบโรงพยาบาลศิริราชและตลาดพรานนกหนาแน่นตลอดวัน ทีมงานวางแผนเวลาเข้างานอย่างรัดกุม",
    travelCorridors: ["ถนนพรานนก", "ถนนอรุณอมรินทร์", "ถนนอิสรภาพ", "ถนนบางขุนนนท์", "ถนนจรัญสนิทวงศ์"],
    propertyAccessContext: "หอพักบุคลากร อพาร์ตเมนต์ และชุมชนริมคลองบางกอกน้อย",
    propertyTypes: ["หอพักและอพาร์ตเมนต์ย่านศิริราช-พรานนก", "คอนโดมิเนียมถนนจรัญสนิทวงศ์", "บ้านพักอาศัยบางขุนนนท์"],
    jobEvaluationFactors: ["ระยะทาง", "ช่วงเวลาเดินทางเลี่ยงรถติด", "คนช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "รับย้ายหอพักหรือคอนโดแถวศิริราช พรานนก ไหม?",
        a: "ให้บริการประจำในพื้นที่ศิริราช พรานนก และบางขุนนนท์ สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["bang-phlat", "bangkok-yai", "taling-chan"],
    lastReviewedDate: "2026-06-25",
    proofScore: 74,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 13. บางพลัด (DRAFT / EVIDENCE REQUIRED)
  "bang-phlat": {
    province: "bkk-thonburi",
    districtSlug: "bang-phlat",
    districtThaiName: "บางพลัด",
    zone: "northern",
    subdistricts: ["บางพลัด", "บางอ้อ", "บางบำหรุ", "บางยี่ขัน"],
    primaryIntent: "รถรับจ้างบางพลัด จรัญสนิทวงศ์ ปิ่นเกล้า สะพานกรุงธน ย้ายคอนโด",
    h1: "รถรับจ้างบางพลัด บริการย้ายบ้าน คอนโดมิเนียม จรัญสนิทวงศ์ ปิ่นเกล้า",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตบางพลัด ครอบคลุมถนนจรัญสนิทวงศ์ ถนนสิรินธร ถนนสมเด็จพระปิ่นเกล้า และสะพานกรุงธน (ซังฮี้) บริการย้ายคอนโดแนวรถไฟฟ้าสายสีน้ำเงินและอพาร์ตเมนต์",
    actualServiceCapability: "ย้ายคอนโดมิเนียมแนวถนนจรัญสนิทวงศ์ หอพักนักศึกษา และขนส่งมอเตอร์ไซค์",
    localOperationalNotes: "ถนนจรัญสนิทวงศ์มีคอนโด High-rise เกิดขึ้นจำนวนมาก และเป็นจุดเชื่อมข้ามสะพานพระราม 7/8",
    travelCorridors: ["ถนนจรัญสนิทวงศ์", "ถนนสิรินธร", "ถนนราชวิถี", "ถนนสมเด็จพระปิ่นเกล้า"],
    propertyAccessContext: "คอนโดมิเนียมแนวรถไฟฟ้า MRT และอพาร์ตเมนต์ในซอยจรัญฯ",
    propertyTypes: ["คอนโดมิเนียมแนว MRT จรัญฯ", "อพาร์ตเมนต์ย่านบางยี่ขัน", "บ้านพักอาศัยถนนสิรินธร"],
    jobEvaluationFactors: ["ระยะทาง", "ความสูงเพดานอาคารจอดรถ", "คนช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "คอนโดแนวถนนจรัญสนิทวงศ์ รถตู้ทึบเข้าจอดโหลดของได้ไหม?",
        a: "รถกระบะตู้ทึบของเรามีความสูงภายในตู้ 2.1 เมตร ขนย้ายสิ่งของได้มิดชิดปลอดภัย สำหรับการจอดเทียบขนย้ายแนะนำให้นัดหมายจุดโหลดสินค้าชั้นล่างกับนิติบุคคล"
      }
    ],
    nearbyDistrictSlugs: ["bangkok-noi", "taling-chan"],
    lastReviewedDate: "2026-06-25",
    proofScore: 74,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 14. ตลิ่งชัน (DRAFT / EVIDENCE REQUIRED)
  "taling-chan": {
    province: "bkk-thonburi",
    districtSlug: "taling-chan",
    districtThaiName: "ตลิ่งชัน",
    zone: "northern",
    subdistricts: ["คลองชักพระ", "ตลิ่งชัน", "ฉิมพลี", "บางพรม", "บางระมาด", "บางเชือกหนัง"],
    primaryIntent: "รถรับจ้างตลิ่งชัน บรมราชชนนี ราชพฤกษ์ กาญจนาภิเษก ย้ายบ้านเดี่ยว",
    h1: "รถรับจ้างตลิ่งชัน บริการย้ายบ้านเดี่ยว ทาวน์โฮม ราชพฤกษ์ บรมราชชนนี",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตตลิ่งชัน ถนนบรมราชชนนี ถนนราชพฤกษ์ ถนนพรานนก-พุทธมณฑล สาย 4 เชี่ยวชาญการขนย้ายบ้านเดี่ยวจัดสรรและสวนผลไม้เดิม",
    actualServiceCapability: "ย้ายบ้านเดี่ยวโครงการขนาดใหญ่ ทาวน์โฮม และขนส่งเฟอร์นิเจอร์สั่งทำพิเศษ",
    localOperationalNotes: "มีถนนตัดใหม่หลายสายและโครงการบ้านเดี่ยวระดับบน ซอยลึกเชื่อมต่อคลองชักพระ",
    travelCorridors: ["ถนนบรมราชชนนี", "ถนนราชพฤกษ์", "ถนนกาญจนาภิเษก", "ถนนพรานนก-พุทธมณฑล สาย 4"],
    propertyAccessContext: "โครงการบ้านเดี่ยวขนาดใหญ่ ถนนภายในกว้างขวาง ขนย้ายสะดวก",
    propertyTypes: ["บ้านเดี่ยวโครงการจัดสรรระดับบน", "ทาวน์โฮมถนนราชพฤกษ์", "บ้านสวนชุมชนดั้งเดิม"],
    jobEvaluationFactors: ["ระยะทาง", "จำนวนเฟอร์นิเจอร์ชิ้นใหญ่", "คนช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "รับย้ายบ้านเดี่ยวโครงการย่านราชพฤกษ์ ตลิ่งชัน ไหม?",
        a: "ให้บริการเป็นประจำครับ มีพนักงานยกของพร้อมอุปกรณ์แรปหุ้มป้องกันเฟอร์นิเจอร์ สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["thawi-watthana", "bang-phlat", "bangkok-noi"],
    lastReviewedDate: "2026-06-25",
    proofScore: 72,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // 15. ทวีวัฒนา (DRAFT / EVIDENCE REQUIRED)
  "thawi-watthana": {
    province: "bkk-thonburi",
    districtSlug: "thawi-watthana",
    districtThaiName: "ทวีวัฒนา",
    zone: "northern",
    subdistricts: ["ทวีวัฒนา", "ศาลาธรรมสพน์"],
    primaryIntent: "รถรับจ้างทวีวัฒนา พุทธมณฑล สาย 2 สาย 3 ถนนอักษะ ย้ายบ้านเดี่ยว",
    h1: "รถรับจ้างทวีวัฒนา บริการย้ายบ้านเดี่ยว คฤหาสน์ พุทธมณฑล สาย 2 สาย 3",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตทวีวัฒนา ถนนพุทธมณฑล สาย 2 สาย 3 ถนนอุทยาน (อักษะ) และถนนเลียบคลองทวีวัฒนา บริการย้ายบ้านเดี่ยวโครงการหรูและคฤหาสน์",
    actualServiceCapability: "ย้ายบ้านเดี่ยวขนาดใหญ่ คฤหาสน์ ขนส่งเฟอร์นิเจอร์ลอยตัว และมอเตอร์ไซค์",
    localOperationalNotes: "ถนนกว้างขวาง วางแผนการเดินทางสะดวก เชื่อมต่อไปศาลายาและนครปฐมได้รวดเร็ว",
    travelCorridors: ["ถนนบรมราชชนนี", "ถนนพุทธมณฑล สาย 2", "ถนนพุทธมณฑล สาย 3", "ถนนอุทยาน (อักษะ)", "ถนนเลียบคลองทวีวัฒนา"],
    propertyAccessContext: "บ้านเดี่ยว คฤหาสน์ และโครงการจัดสรรระดับบน ถนนเมนกว้างขวาง",
    propertyTypes: ["บ้านเดี่ยวขนาดใหญ่และคฤหาสน์", "โครงการจัดสรรถนนพุทธมณฑล สาย 2/3"],
    jobEvaluationFactors: ["ระยะทาง", "ปริมาณสัมภาระ", "คนช่วยยกของ"],
    projectEvidenceIds: [],
    images: [],
    reviewEvidenceIds: [],
    localFaq: [
      {
        q: "รับย้ายบ้านโครงการย่านพุทธมณฑล สาย 2 หรือสาย 3 หรือไม่?",
        a: "ให้บริการขนย้ายบ้านเดี่ยวและทาวน์โฮมทุกโครงการในเขตทวีวัฒนา สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["taling-chan", "nong-khaem", "bang-khae"],
    lastReviewedDate: "2026-06-25",
    proofScore: 70,
    isIndexable: false,
    status: "draft_evidence_required"
  },

  // ==========================================
  // NON-THONBURI / LEGACY AREAS (Preserved)
  // ==========================================
  "maha-chai": {
    province: "samutsakhon",
    districtSlug: "maha-chai",
    districtThaiName: "มหาชัย",
    primaryIntent: "รถรับจ้างมหาชัย / รถรับจ้างพระราม 2",
    seoTitle: "รถรับจ้างมหาชัย–พระราม 2 ขนของพร้อมคนยก | WMS",
    metaDescription: "บริการรถรับจ้างมหาชัย–พระราม 2 รถกระบะตู้ทึบขนส่งสินค้าโรงงานและย้ายบ้าน ครอบคลุมถนนเอกชัย คอกกระบือ พันท้ายนรสิงห์ นิคมฯ สินสาคร ตลาดมหาชัย ตลาดกระทุ่มแบน พร้อมคนยก",
    h1: "รถรับจ้างมหาชัย–พระราม 2 ขนส่งสินค้าและย้ายบ้านพร้อมคนยก",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างในเขตมหาชัยและเส้นทางพระราม 2 สมุทรสาคร ครอบคลุมถนนเอกชัย คอกกระบือ พันท้ายนรสิงห์ ซอยวัดพันท้าย นิคมอุตสาหกรรมสินสาคร นิคมอุตสาหกรรมสมุทรสาคร ตลาดมหาชัย และตลาดกระทุ่มแบน รองรับงานขนส่งสินค้าโรงงาน ขนย้ายบ้านจัดสรร หอพักคนทำงาน และส่งมอเตอร์ไซค์ ด้วยรถกระบะตู้ทึบปิดมิดชิด พร้อมทีมงานช่วยยกของอย่างมืออาชีพ",
    actualServiceCapability: "บริการรถตู้ทึบเหมาเที่ยว ขนส่งสินค้าเกษตร สินค้าทะเลแช่แข็งบรรจุกล่อง ย้ายของโรงงานและหอพักพนักงาน",
    localOperationalNotes: "มหาชัยเป็นศูนย์กลางอุตสาหกรรมและประมง มีรถบรรทุกหนาแน่นตลอดวัน ทีมงานคุ้นเคยกับเส้นทางลัดเลาะในชุมชนตลาดและทางเข้าโรงงานอุตสาหกรรม",
    travelCorridors: ["ถนนพระราม 2", "ถนนเศรษฐกิจ 1", "ถนนเอกชัย", "ซอยวัดพันท้ายนรสิงห์", "ถนนพุทธสาคร"],
    serviceCorridors: [
      {
        title: "โซนเศรษฐกิจมหาชัย – ตลาดมหาชัย – ถนนเอกชัย",
        coverageAreas: ["ตลาดมหาชัย", "ถนนเอกชัย", "มหาชัยเมืองใหม่", "ตัวเมืองสมุทรสาคร", "ตำบลมหาชัย"],
        suitability: "เหมาะสำหรับงานขนส่งสินค้าทั่วไป อุปกรณ์ประมง/ห้องเย็นบรรจุกล่อง ย้ายหอพักพนักงาน และย้ายอาคารพาณิชย์ รถตู้ทึบเข้าพื้นที่ตลาดและตรอกชุมชนได้คล่องตัว",
        routeConnections: "เชื่อมถนนเอกชัยมุ่งหน้าสู่บางบอน-จอมทอง และเชื่อมออกถนนพระราม 2 เข้าสู่กรุงเทพฯ ได้สะดวก",
        pricingFactors: "คำนวณจากระยะทางจริงและน้ำหนักสัมภาระ พร้อมระบุจำนวนคนช่วยยกของอย่างโปร่งใส",
        customerPrep: "ตรวจสอบแพ็กเกจสินค้าให้มิดชิด ปิดผนึกกล่อง และนัดจุดเทียบจอดในตลาดหรือย่านการค้าล่วงหน้า"
      },
      {
        title: "โซนพระราม 2 – คอกกระบือ – พันท้ายนรสิงห์ (ซอยวัดพันท้าย) – นิคมฯ สินสาคร",
        coverageAreas: ["ถนนพระราม 2", "ตำบลคอกกระบือ", "ตำบลพันท้ายนรสิงห์", "ซอยวัดพันท้ายนรสิงห์", "นิคมอุตสาหกรรมสินสาคร"],
        suitability: "เหมาะสำหรับขนย้ายบ้านเดี่ยวในโครงการจัดสรรริมพระราม 2, ย้ายคอนโด, และรับส่งชิ้นส่วนอุตสาหกรรม/อิเล็กทรอนิกส์ในนิคมฯ สินสาคร",
        routeConnections: "ถนนพระราม 2 วิ่งตรงสู่กรุงเทพฯ ฝั่งธนบุรี (บางขุนเทียน-เคหะธนบุรี) หรือออกสู่สมุทรสงครามและภาคใต้",
        pricingFactors: "คิดตามระยะทางวิ่งจริง ไม่มีค่าธรรมเนียมผ่านเขต ประเมินราคาสุทธิก่อนเริ่มงาน",
        customerPrep: "ตรวจสอบความสูงและระเบียบการเข้า-ออกของหมู่บ้านหรือนิคมอุตสาหกรรม พร้อมแจ้งเลขทะเบียนรถล่วงหน้า"
      },
      {
        title: "โซนนิคมอุตสาหกรรมสมุทรสาคร – ตลาดกระทุ่มแบน",
        coverageAreas: ["นิคมอุตสาหกรรมสมุทรสาคร", "ถนนเศรษฐกิจ 1", "ตลาดกระทุ่มแบน", "ตำบลคลองมะเดื่อ"],
        suitability: "เหมาะสำหรับงานเหมาเที่ยวส่งสินค้าโรงงาน วัตถุดิบ ชิ้นงาน บรรจุภัณฑ์ และการย้ายที่อยู่อาศัยของคนทำงานในย่านกระทุ่มแบน",
        routeConnections: "เชื่อมสู่ถนนพุทธสาคร และถนนเพชรเกษม (อ้อมน้อย-หนองแขม) ได้สะดวก เลี่ยงรถติดบนถนนพระราม 2",
        pricingFactors: "ราคาเหมาคันตามจุดรับส่งจริง มีอุปกรณ์ยึดตรึงสิ่งของเพื่อความปลอดภัยระหว่างเดินทาง",
        customerPrep: "สรุปเอกสารใบส่งของหรือใบเบิกเข้าโรงงานล่วงหน้า เพื่อให้รถเข้าโหลดสินค้าได้ตามกำหนดเวลา"
      }
    ],
    propertyAccessContext: "โกดังสินค้า อาคารพาณิชย์ และหอพักคนงานในเขตโรงงานอุตสาหกรรม",
    propertyTypes: ["โกดังและโรงงานอุตสาหกรรม", "อาคารพาณิชย์ย่านตลาดทะเลไทย", "หอพักพนักงาน"],
    jobEvaluationFactors: ["ระยะทาง", "น้ำหนักสินค้า", "คนช่วยยกของ"],
    projectEvidenceIds: ["freight-delivery-maha-chai"],
    images: [
      {
        path: "/images/WM8.webp",
        alt: "บริการรถกระบะรับจ้างตู้ทึบขนส่งสินค้า WMS TRANSPORT",
        caption: "บริการรถกระบะตู้ทึบเหมาเที่ยวรับส่งสินค้าและขนย้าย"
      }
    ],
    evidenceItems: [
      {
        realImagePath: "/images/WM8.webp",
        verificationStatus: "unverified",
        shortJobDescription: "งานขนส่งสินค้าทั่วไป"
      }
    ],
    reviewEvidenceIds: ["rev-mc-01"],
    localFaq: [
      {
        q: "รถรับจ้างมหาชัย ขนส่งสินค้าโรงงานไปต่างจังหวัดคิดราคาอย่างไร?",
        a: "คิดราคาตามระยะทางจริงจากมหาชัยไปยังจังหวัดปลายทาง สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่"
      }
    ],
    nearbyDistrictSlugs: ["bang-khun-thian"],
    lastReviewedDate: "2026-06-25",
    proofScore: 78,
    isIndexable: true,
    status: "published"
  },

  "pinklao": {
    province: "bkk-thonburi",
    districtSlug: "pinklao",
    districtThaiName: "ปิ่นเกล้า",
    zone: "northern",
    subdistricts: ["บางยี่ขัน", "อรุณอมรินทร์"],
    primaryIntent: "รถกระบะตู้ทึบรับจ้างย้ายหอพัก ย้ายคอนโด ย่านปิ่นเกล้า อรุณอมรินทร์ บรมราชชนนี",
    seoTitle: "รถรับจ้างปิ่นเกล้า–อรุณอมรินทร์ ย้ายคอนโด | WMS",
    metaDescription: "บริการรถรับจ้างปิ่นเกล้า รถกระบะตู้ทึบย้ายหอพักนักศึกษา คอนโดมิเนียม และขนส่งมอเตอร์ไซค์ ครอบคลุมบรมราชชนนี อรุณอมรินทร์ พระราม 8 พร้อมคนยก",
    h1: "รถรับจ้างปิ่นเกล้า บริการย้ายหอพัก คอนโดมิเนียม และขนส่งมอเตอร์ไซค์",
    directAnswer: "WMS TRANSPORT ให้บริการรถกระบะตู้ทึบรับจ้างย่านปิ่นเกล้า ครอบคลุมถนนสมเด็จพระปิ่นเกล้า ถนนบรมราชชนนี และถนนอรุณอมรินทร์ เหมาะสำหรับย้ายหอพักนักศึกษา คอนโดมิเนียม และขนส่งรถมอเตอร์ไซค์",
    actualServiceCapability: "ย้ายหอพักนักศึกษา ย้ายอพาร์ตเมนต์ คอนโดมิเนียม และขนส่งรถมอเตอร์ไซค์บิ๊กไบค์ มีอุปกรณ์รัดตรึงและพลาสติกแรปกันรอยขีดข่วน",
    localOperationalNotes: "ย่านปิ่นเกล้าเป็นจุดเชื่อมต่อการเดินทางหนาแน่น มีข้อจำกัดเรื่องช่วงเวลาเร่งด่วนบนถนนบรมราชชนนี ทีมงานมีประสบการณ์จัดเวลาวิ่งงานเลี่ยงรถติด",
    travelCorridors: ["ถนนบรมราชชนนี", "ถนนอรุณอมรินทร์", "ถนนจรัญสนิทวงศ์", "สะพานพระราม 8"],
    propertyAccessContext: "อพาร์ตเมนต์และหอพักนักศึกษาใกล้สถาบันการศึกษา คอนโดมิเนียม Low-rise ในซอยลึก รถกระบะตู้ทึบเข้าซอยได้ทุกจุด",
    propertyTypes: ["หอพักนักศึกษา", "คอนโดมิเนียม Low-rise", "อาคารพาณิชย์"],
    jobEvaluationFactors: ["ระยะทาง", "ชั้นอาคารและลิฟต์", "คนช่วยยกของ"],
    projectEvidenceIds: ["motorcycle-delivery-pinklao"],
    images: [
      {
        path: "/images/WM11.webp",
        alt: "บริการส่งมอเตอร์ไซค์บิ๊กไบค์และย้ายหอพักย่านปิ่นเกล้า",
        caption: "การแพ็กและจัดส่งบิ๊กไบค์ของลูกค้าไปยังพื้นที่ปิ่นเกล้าด้วยรถตู้มิดชิด"
      }
    ],
    reviewEvidenceIds: ["rev-pk-01"],
    localFaq: [
      {
        q: "ขนของย้ายหอพักนักศึกษาย่านปิ่นเกล้า มีคนช่วยยกของกี่คน?",
        a: "โดยทั่วไปมีพนักงานยกของ 1-2 คน (รวมคนขับ) ช่วยเบาแรงและจัดเรียงของในตู้ทึบอย่างเป็นระบบ"
      }
    ],
    nearbyDistrictSlugs: ["bang-phlat", "bangkok-noi"],
    lastReviewedDate: "2026-06-25",
    proofScore: 75,
    isIndexable: true,
    status: "published"
  }
};

/**
 * Validates if a district landing page is approved and indexable
 */
export function isDistrictPageIndexable(record: DistrictRecord): boolean {
  if (!record) return false;
  return (
    record.isIndexable === true &&
    record.status === 'published' &&
    record.proofScore >= 75 &&
    (record.projectEvidenceIds?.length ?? 0) > 0
  );
}

/**
 * Returns all 15 official Thonburi districts grouped by zone
 */
export function getThonburiDistrictsByZone(zone: ThonburiZone): DistrictRecord[] {
  return Object.values(districtLandingPages).filter(
    (d) => d.province === 'bkk-thonburi' && d.zone === zone && d.districtSlug !== 'pinklao'
  );
}

/**
 * Returns all published Thonburi districts
 */
export function getPublishedThonburiDistricts(): DistrictRecord[] {
  return Object.values(districtLandingPages).filter(
    (d) => d.province === 'bkk-thonburi' && isDistrictPageIndexable(d)
  );
}

```

### `src/data/approvedRouteCorridors.ts` (Complete File)
Lines 1 - 42

```ts
/**
 * Approved Interprovincial Route Corridors Allowlist
 * 
 * OWNER CONFIRMATION REQUIRED:
 * Corridors listed below reflect high-demand operational pairs currently supported
 * by WMS TRANSPORT fleet capacity. Full expansion to all 64 provincial permutations
 * requires documented pricing matrix and local operational proof from the business owner.
 */

export interface RouteCorridor {
  from: string;
  to: string;
  label?: string;
  status: 'approved_pending_owner_audit';
}

export const approvedRouteCorridors: RouteCorridor[] = [
  { from: "bangkok", to: "phuket", label: "กรุงเทพฯ ⇄ ภูเก็ต", status: "approved_pending_owner_audit" },
  { from: "phuket", to: "bangkok", label: "ภูเก็ต ⇄ กรุงเทพฯ", status: "approved_pending_owner_audit" },
  { from: "bangkok", to: "chiang-mai", label: "กรุงเทพฯ ⇄ เชียงใหม่", status: "approved_pending_owner_audit" },
  { from: "chiang-mai", to: "bangkok", label: "เชียงใหม่ ⇄ กรุงเทพฯ", status: "approved_pending_owner_audit" },
  { from: "bangkok", to: "samutsakhon", label: "กรุงเทพฯ ⇄ สมุทรสาคร", status: "approved_pending_owner_audit" },
  { from: "samutsakhon", to: "bangkok", label: "สมุทรสาคร ⇄ กรุงเทพฯ", status: "approved_pending_owner_audit" },
  { from: "bangkok", to: "chonburi", label: "กรุงเทพฯ ⇄ ชลบุรี", status: "approved_pending_owner_audit" },
  { from: "chonburi", to: "bangkok", label: "ชลบุรี ⇄ กรุงเทพฯ", status: "approved_pending_owner_audit" },
  { from: "samutsakhon", to: "samut-songkhram", label: "สมุทรสาคร ⇄ สมุทรสงคราม", status: "approved_pending_owner_audit" },
  { from: "samut-songkhram", to: "samutsakhon", label: "สมุทรสงคราม ⇄ สมุทรสาคร", status: "approved_pending_owner_audit" },
];

/**
 * Validates whether a given from/to pair is an approved route corridor
 */
export function isApprovedRouteCorridor(from: string, to: string): boolean {
  if (!from || !to || from === to) return false;
  return approvedRouteCorridors.some(
    (c) => c.from.toLowerCase() === from.toLowerCase() && c.to.toLowerCase() === to.toLowerCase()
  );
}

```

### `src/data/pricingPolicy.ts` (Complete File)
Lines 1 - 99

```ts
export interface PricingRecord {
  id: string;
  serviceType: 'moving' | 'motorcycle' | 'freight' | 'helpers';
  scenario: string; // e.g. 'ย้ายคอนโด 1 ห้องนอน ระยะทางไม่เกิน 15 กม.'
  startingPrice: number;
  includedItems: string[];
  excludedItems: string[];
  priceVariables: string[]; // what factors increase price
  quoteAssumptions: string[];
  lastReviewedDate: string;
  approvalStatus: 'approved' | 'pending';
}

export const pricingPolicyData: PricingRecord[] = [
  {
    id: "pr-move-01",
    serviceType: "moving",
    scenario: "ย้ายหอพัก / อพาร์ทเม้นท์ (ห้องสตูดิโอขนาดเล็ก หรือห้องน้ำหนักรวมไม่เกิน 4 คิว)",
    startingPrice: 1500,
    includedItems: [
      "รถกระบะตู้ทึบขนาด 2.1 เมตร ความยาวตู้ 2.2 เมตร 1 คัน",
      "น้ำมันเชื้อเพลิงสำหรับการขับขี่ตลอดเส้นทางที่กำหนด",
      "พนักงานขับรถช่วยจัดของท้ายตู้",
      "แรปฟิล์มยืดป้องกันฝุ่นและริ้วรอยชิ้นใหญ่ฟรี 1-2 ชิ้น",
      "มีมาตรการดูแลความปลอดภัยของสิ่งของระหว่างเดินทาง (สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่)"
    ],
    excludedItems: [
      "พนักงานยกของเสริม (มีค่าบริการเพิ่ม 500 บาท/คน)",
      "การแบกขนขึ้นชั้นสูงไม่มีลิฟต์ ตั้งแต่ชั้น 3 ขึ้นไป",
      "กล่องกระดาษบรรจุของ (สามารถสั่งซื้อแยกเป็นแพ็กเกจล่วงหน้า)",
      "ค่าบริการถอดประกอบเฟอร์นิเจอร์ชิ้นซับซ้อน เช่น เตียงนอนลิ้นชัก ตู้เสื้อผ้าบิวท์อิน"
    ],
    priceVariables: [
      "ระยะทางเกินที่กำหนดคิดตามจริงกิโลเมตรละ 15-18 บาท (อิงตามอัตรามาตรฐาน WMS)",
      "ต้องการคนช่วยยกของเพิ่มเติมเพิ่มคนละ 500 บาทต่อวัน",
      "หน้างานไม่มีลิฟต์และต้องยกขนข้ามชั้นบันไดคิดเพิ่มชั้นละ 150-200 บาทต่อชั้นอาคาร"
    ],
    quoteAssumptions: [
      "จุดจอดรถรับและส่งสิ่งของอยู่ในระยะเดินราบไม่เกิน 15 เมตรจากประตูอาคาร",
      "ไม่มีสิ่งของเปราะบางแตกหักง่ายพิเศษที่ต้องการแท่นไม้ตีลังครอบตู้",
      "การจองสิทธิ์ลิฟต์และแจ้งนิติคอนโดเป็นความรับผิดชอบของลูกค้า"
    ],
    lastReviewedDate: "2026-06-25",
    approvalStatus: "approved"
  },
  {
    id: "pr-motorcycle-01",
    serviceType: "motorcycle",
    scenario: "ส่งมอเตอร์ไซค์ทั่วไป (100cc - 125cc) เช่น Honda Wave, Scoopy i ข้ามจังหวัด",
    startingPrice: 2500,
    includedItems: [
      "รถตู้ทึบป้องกันฝุ่น หินกระแทก และฝน ปิดมิดชิดตลอดเส้นทาง",
      "อุปกรณ์รัดตรึงล้อหน้า Wheel Chock และสายรัดแท่นล็อก Ratchet 4 จุด",
      "การแรปหุ้มแฮนด์ กระจก และชิ้นส่วนที่เสี่ยงขูดขีดฟรี",
      "มีมาตรการดูแลความปลอดภัยระหว่างขนส่ง (สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่)"
    ],
    excludedItems: [
      "การดูดล้างทำความสะอาดรถจักรยานยนต์หลังการเดินทาง",
      "ค่าขนย้ายหมวกกันน็อกหรืออุปกรณ์แต่งรถภายนอกที่ไม่ได้ยึดติดกับตัวรถ"
    ],
    priceVariables: [
      "ขนาดความจุกระบอกสูบ (cc): รถบิ๊กไบค์ 400cc+ เริ่มต้นที่ 4,500 บาท",
      "ระยะทางและพื้นที่ทุรกันดารหรือเกาะ (เช่น สมุย, เกาะช้าง) มีบวกค่าระวางตั๋วเรือเฟอร์รี่เพิ่มตามจริง"
    ],
    quoteAssumptions: [
      "มีกุญแจรถและเอกสารเล่มทะเบียนรถ/สำเนาถูกต้องแสดงก่อนจัดส่ง",
      "น้ำมันเชื้อเพลิงในถังรถต่ำกว่า 1 ใน 4 ของถังเพื่อความปลอดภัย"
    ],
    lastReviewedDate: "2026-06-25",
    approvalStatus: "approved"
  },
  {
    id: "pr-freight-01",
    serviceType: "freight",
    scenario: "เหมาคันรถตู้ทึบขนส่งสินค้าอุปโภคบริโภค / สินค้าโรงงาน ไปต่างจังหวัด",
    startingPrice: 1000,
    includedItems: [
      "รถกระบะตอนเดียวตู้ทึบอลูมิเนียมความจุ 7.6 คิว 1 คัน",
      "พนักงานขับรถควบคุมการขับขี่มาตรฐาน WMS (ผ่านการเช็กแอลกอฮอล์และประวัติ)",
      "ใบเสร็จรับเงินยืนยันการชำระเงิน (กรณีต้องการระบุนามนิติบุคคลโปรดสอบถามเจ้าหน้าที่)",
      "มีมาตรการดูแลความปลอดภัยของสินค้าตลอดการเดินทาง (สอบถามรายละเอียดและเงื่อนไขกับเจ้าหน้าที่)"
    ],
    excludedItems: [
      "ค่าแรงพนักงานยกของขึ้นและลงสินค้า ณ จุดรับส่ง (หากต้องการให้ระบุฝ่ายจัดเตรียมแยก)",
      "ค่าผ่านทางด่วนพิเศษ หรือค่าเข้าจอดรถของคลังสินค้าเอกชน (เก็บเพิ่มตามจริง)"
    ],
    priceVariables: [
      "จำนวนจุดแวะพักรับหรือส่งสินค้าเพิ่มเติม (Drop-off point) คิดเพิ่มจุดละ 200-300 บาท",
      "ระยะเวลารอโหลดของเกิน 2 ชั่วโมง ณ หน้างาน คิดค่าเสียเวลาชั่วโมงละ 150 บาท"
    ],
    quoteAssumptions: [
      "สินค้าได้รับการแพ็กบรรจุกล่องหรือวางบนพาเลทมาตรฐานเสร็จเรียบร้อยก่อนรถเข้าถึง",
      "มีพนักงานหน้าคลังคอยโหลดและลงของพร้อมรถโฟล์กลิฟต์เตรียมการไว้"
    ],
    lastReviewedDate: "2026-06-25",
    approvalStatus: "approved"
  }
];

```

### `src/data/reviewEvidence.ts` (Complete File)
Lines 1 - 113

```ts
export interface ReviewRecord {
  id: string;
  source: 'LINE' | 'Facebook' | 'GoogleMaps';
  consentStatus: boolean;
  broadServiceArea: string; // e.g. 'บางแค', 'ปิ่นเกล้า', 'มหาชัย', 'ภูเก็ต', 'เชียงใหม่'
  provinceSlug: string; // e.g. 'bkk-thonburi', 'samutsakhon', 'phuket', 'chiang-mai'
  serviceType: 'moving' | 'motorcycle' | 'freight' | 'helpers';
  date: string;
  displayName: string;
  reviewText: string;
  rating: number;
  moderationStatus: 'approved' | 'pending' | 'rejected';
  isVerified: boolean;
  avatarUrl?: string;
  avatarAlt?: string;
}

export const reviewEvidenceData: ReviewRecord[] = [
  {
    id: "rev-bk-01",
    source: "LINE",
    consentStatus: true,
    broadServiceArea: "บางแค",
    provinceSlug: "bkk-thonburi",
    serviceType: "moving",
    date: "2026-05-18",
    displayName: "คุณปิยะพล (บางแค)",
    reviewText: "ย้ายคอนโดชั้น 18 จากบางแค เพชรเกษม ไปนนทบุรี พนักงานช่วยยกของทำงานเรียบร้อยมาก ช่วยแรปหุ้มฟิล์มตู้เสื้อผ้าและเตียงนอนอย่างระมัดระวัง รถตู้ทึบความสูงภายใน 2.1 ม. จุของทรงสูงได้มิดชิดปลอดภัยตรงใจครับ",
    rating: 5,
    moderationStatus: "approved",
    isVerified: true,
    avatarUrl: "/Wmsone1.jpg",
    avatarAlt: "ลูกค้าผู้ใช้บริการ WMS Transport บางแค"
  },
  {
    id: "rev-pk-01",
    source: "Facebook",
    consentStatus: true,
    broadServiceArea: "ปิ่นเกล้า",
    provinceSlug: "bkk-thonburi",
    serviceType: "motorcycle",
    date: "2026-06-10",
    displayName: "คุณวรัญญา (ปิ่นเกล้า)",
    reviewText: "ส่งรถบิ๊กไบค์ Kawasaki Ninja ไปแถวอรุณอมรินทร์ ปิ่นเกล้า การรัดยึดล้อ Wheel Chock แน่นหนามากในตู้ทึบ ไม่มีริ้วรอยขูดขีดเลย ขนส่งรวดเร็วตรงเวลา แอดมินคุยง่ายครับ",
    rating: 5,
    moderationStatus: "approved",
    isVerified: true,
    avatarUrl: "/Wmsone.jpg",
    avatarAlt: "ลูกค้าผู้ใช้บริการ WMS Transport ปิ่นเกล้า"
  },
  {
    id: "rev-mc-01",
    source: "LINE",
    consentStatus: true,
    broadServiceArea: "มหาชัย",
    provinceSlug: "samutsakhon",
    serviceType: "freight",
    date: "2026-06-15",
    displayName: "คุณเกรียงไกร (มหาชัย)",
    reviewText: "เหมาตู้ทึบส่งกล่องสินค้าจากโรงงานอุตสาหกรรมในมหาชัยไปส่งต่างจังหวัด วิ่งงานปลอดภัย มีการประสานงานอัปเดตสถานะตลอดเส้นทาง ได้เอกสารบิลครบถ้วน รวดเร็วมากครับ",
    rating: 5,
    moderationStatus: "approved",
    isVerified: true,
    avatarUrl: "/Wmsone2.jpg",
    avatarAlt: "ลูกค้าผู้ใช้บริการ WMS Transport มหาชัย"
  },
  {
    id: "rev-pk-02",
    source: "LINE",
    consentStatus: true,
    broadServiceArea: "ปิ่นเกล้า",
    provinceSlug: "bkk-thonburi",
    serviceType: "moving",
    date: "2026-06-20",
    displayName: "คุณจินดา (อรุณอมรินทร์)",
    reviewText: "เรียกใช้บริการย้ายหอแถวปิ่นเกล้า น้องๆ ยกของระมัดระวังมาก ของไม่ชำรุดเลย ทำงานรวดเร็วสุภาพ ประทับใจมากค่ะ",
    rating: 5,
    moderationStatus: "approved",
    isVerified: true
  },
  {
    id: "rev-cm-01",
    source: "Facebook",
    consentStatus: true,
    broadServiceArea: "เชียงใหม่",
    provinceSlug: "chiang-mai",
    serviceType: "moving",
    date: "2026-06-12",
    displayName: "คุณธนารีย์ (เชียงใหม่)",
    reviewText: "ย้ายบ้านจากนนทบุรีมาเชียงใหม่ ระยะทางไกลแต่ของไม่เสียหายเลย คนยกสุภาพ สรุปงานเร็ว ประทับใจมากค่ะ",
    rating: 5,
    moderationStatus: "approved",
    isVerified: true
  },
  {
    id: "rev-pk-03",
    source: "GoogleMaps",
    consentStatus: true,
    broadServiceArea: "ภูเก็ต",
    provinceSlug: "phuket",
    serviceType: "motorcycle",
    date: "2026-06-05",
    displayName: "คุณกิตติศักดิ์ (ภูเก็ต)",
    reviewText: "ขนส่งมอเตอร์ไซค์บิ๊กไบค์ข้ามจังหวัดจากกรุงเทพฯ ไปภูเก็ต รถตู้ทึบล็อกยางแน่นดีมาก ไม่มีส่วนใดเบียดชนตัวถัง จัดส่งปลอดภัยมาก",
    rating: 5,
    moderationStatus: "approved",
    isVerified: true
  }
];

export const neutralReviewPrompt = "หากสะดวก รบกวนเล่าประสบการณ์จริงเกี่ยวกับประเภทงาน พื้นที่รับ-ส่ง หรือสิ่งที่ทีมงานช่วยดูแลให้ได้ครับ ความเห็นของคุณช่วยให้ลูกค้าคนถัดไปตัดสินใจได้ง่ายขึ้น";
export const feedbackSafetyGuidelines = "เรายินดีรับฟังข้อเท็จจริงและความเห็นที่ตรงไปตรงมา โดยไม่มีการบังคับคะแนนระดับ 5 ดาว หรือเงื่อนไขผูกมัดคำค้นหาเจาะจง เพื่อรักษาความซื่อสัตย์ของการประเมินสูงสุด";

```

### `src/data/vehicleCapacity.ts` (Complete File)
Lines 1 - 53

```ts
export interface DimensionSpec {
  widthInternalMeters: number;
  lengthInternalMeters: number;
  heightInternalMeters: number;
  totalVolumeCbm: number;
  payloadCapacityKg: number;
  verificationStatus: 'approved_by_wms' | 'pending_field_validation' | 'verified_by_manufacturer';
  verifiedBy?: string;
  verifiedDate?: string;
  notes?: string;
}

export interface VehicleCapacityRecord {
  vehicleId: string;
  vehicleName: string;
  thaiName: string;
  dimensions: DimensionSpec;
  maxFittedItems: { itemName: string; qty: number; volumeCbm: number }[];
  limitations: string[];
}

export const vehicleCapacityData: Record<string, VehicleCapacityRecord> = {
  "standard-pickup-box-210": {
    vehicleId: "standard-pickup-box-210",
    vehicleName: "Standard Single-Cab Closed Box Pickup (2.1m)",
    thaiName: "รถกระบะตอนเดียวตู้ทึบ (ความสูงตู้ 2.1 เมตร)",
    dimensions: {
      widthInternalMeters: 1.65,
      lengthInternalMeters: 2.20,
      heightInternalMeters: 2.10,
      totalVolumeCbm: 7.62,
      payloadCapacityKg: 1800,
      verificationStatus: "approved_by_wms",
      verifiedBy: "WMS Logistical Safety Committee",
      verifiedDate: "2026-06-25",
      notes: "วัดจากขอบยางยางซีลและพื้นที่ตู้ภายในจริง หักลบมุมโค้งเหล็กค้ำตู้แล้ว"
    },
    maxFittedItems: [
      { itemName: "ที่นอน 6 ฟุต (พับหรือตั้งเอียง)", qty: 1, volumeCbm: 1.2 },
      { itemName: "ตู้เย็นขนาดใหญ่ 12 คิว (แนวตั้ง)", qty: 1, volumeCbm: 0.9 },
      { itemName: "เครื่องซักผ้าฝาหน้า", qty: 1, volumeCbm: 0.4 },
      { itemName: "โซฟา 2 ที่นั่ง", qty: 1, volumeCbm: 0.8 },
      { itemName: "กล่องกระดาษลูกฟูก Size L (50x50x50ซม.)", qty: 15, volumeCbm: 1.875 },
      { itemName: "พัดลมตั้งพื้น/เครื่องดูดฝุ่น/ของจิปาถะ", qty: 5, volumeCbm: 0.5 }
    ],
    limitations: [
      { text: "การเข้าจอดเทียบขนย้ายต้องคำนึงถึงความสูงรวมภายนอกของตัวรถ แนะนำจุดโหลดสินค้าชั้นล่าง (Loading Bay) หรือพื้นที่จอดที่ไม่มีสิ่งกีดขวางความสูง", isApproved: true },
      { text: "น้ำหนักบรรทุกรวมห้ามเกิน 2,200 กิโลกรัม (ตามข้อกำหนดความปลอดภัยของ WMS)", isApproved: true },
      { text: "ไม่สามารถบรรทุกตู้เสื้อผ้าขนาดใหญ่กว้างเกิน 1.6 เมตรแบบชิ้นเดียวโดยไม่ถอดประกอบ", isApproved: true }
    ].map(l => l.text)
  }
};

```

### `src/data/AnswerSurfaceData.ts` (Complete File)
Lines 1 - 13

```ts
export interface AnswerSurfaceData {
  directAnswer: string;
  bestFitCustomer: string;
  serviceCoverage: string;
  vehicleSuitability: string;
  priceFactors: string[];
  timingExpectations: string;
  preparationRequirements: string[];
  exclusions: string[];
  evidenceLinks: { label: string; url: string }[];
  lastReviewedDate: string;
}

```

### `src/data/guidesData.ts` (Complete File)
Lines 1 - 186

```ts
export interface GuideRecord {
  slug: string;
  title: string;
  description: string;
  category: string;
  readTime: string;
  lastUpdated: string;
  author: { name: string; role: string; avatar: string };
  h1: string;
  introduction: string;
  sections: { title: string; content: string; bullets?: string[] }[];
  isIndexable: boolean;
}

export const guidesData: Record<string, GuideRecord> = {
  "truck-capacity-cbm": {
    slug: "truck-capacity-cbm",
    title: "รถกระบะตู้ทึบใส่ของได้กี่คิว? เช็กขนาดรถและปริมาตรของก่อนย้ายบ้าน | WMS",
    description: "ไขข้อข้องใจ รถกระบะตู้ทึบความสูง 2.1 ม. จุสิ่งของได้กี่คิว (CBM) พร้อมตารางเทียบขนาดเฟอร์นิเจอร์ และวิธีคำนวณคิวขนของก่อนย้ายบ้าน คอนโด หอพัก",
    category: "ความรู้เรื่องรถรับจ้าง",
    readTime: "อ่าน 5 นาที",
    lastUpdated: "25 มิถุนายน 2026",
    author: {
      name: "สมเกียรติ ยิ่งเจริญ",
      role: "หัวหน้าฝ่ายจัดส่งสินค้าและโลจิสติกส์ WMS",
      avatar: "/images/logoWMS.webp"
    },
    h1: "รถกระบะตู้ทึบใส่ของได้กี่คิว? วิธีวัดขนาดตู้และคำนวณปริมาตรของก่อนย้ายบ้าน",
    introduction: "เวลาจองรถกระบะรับจ้างเพื่อย้ายบ้าน คอนโด หรือขนของทั่วไป ปัญหาที่เจอบ่อยที่สุดคือ 'จะขนของหมดในเที่ยวเดียวไหม?' หรือ 'ของกองนี้ต้องจ้างรถขนาดไหน?' การคำนวณปริมาตรของเป็น ลูกบาศก์เมตร หรือ 'คิว (CBM)' คือทางออกที่เป็นวิทยาศาสตร์และแม่นยำที่สุดครับ",
    sections: [
      {
        title: "1. รู้จักสเปกรถกระบะตู้ทึบ WMS (ตู้สูงมาตรฐาน 2.1 เมตร)",
        content: "รถกระบะรับจ้างตู้ทึบส่วนใหญ่ที่ให้บริการย้ายคอนโดและหอพักจะเป็นตู้อลูมิเนียมโครงสร้างพิเศษ มีขนาดมิติภายในและพื้นที่จัดเก็บที่ผ่านการวัดจริง ดังนี้:",
        bullets: [
          "ความกว้างภายในตู้: 1.65 เมตร (165 เซนติเมตร)",
          "ความยาวภายในตู้: 2.20 เมตร (220 เซนติเมตร)",
          "ความสูงภายในตู้: 2.10 เมตร (210 เซนติเมตร)",
          "ปริมาตรความจุรวมทางคณิตศาสตร์: 7.62 ลูกบาศก์เมตร (CBM หรือคิว)",
          "น้ำหนักบรรทุกที่ปลอดภัย: ประเมินตามมาตรฐานประเภทรถและน้ำหนักสิ่งของจริง (สอบถามรายละเอียดกับเจ้าหน้าที่)"
        ]
      },
      {
        title: "2. วิธีประเมินและคำนวณคิว (CBM) ด้วยตนเอง",
        content: "หากต้องการวัดสิ่งของชิ้นใดชิ้นหนึ่งด้วยตนเอง ให้ใช้สายวัดวัดขนาดสิ่งของนั้นในหน่วย เมตร (กว้าง x ยาว x สูง) ตัวอย่างเช่น กล่องกระดาษขนาดกว้าง 0.5 เมตร ยาว 0.5 เมตร สูง 0.5 เมตร จะมีปริมาตร = 0.5 x 0.5 x 0.5 = 0.125 คิว หรือหากมีกล่องแบบนี้ 8 กล่อง ก็จะกินพื้นที่เท่ากับ 1.0 คิวพอดีครับ"
      },
      {
        title: "3. ข้อจำกัดสำคัญของตู้ทึบที่ห้ามละเลย",
        content: "แม้รถตู้ทึบจะมีปริมาตรถึง 7.62 คิว แต่ในการขนย้ายจริง ของบางชิ้นไม่สามารถวางซ้อนกันได้เนื่องจากเปราะบาง หรือมีรูปทรงที่ไม่เป็นสี่เหลี่ยมผืนผ้า (เช่น จักรยาน เก้าอี้สำนักงาน โคมไฟตั้งพื้น) ทำให้เกิดพื้นที่ว่างเปล่าที่ใช้ประโยชน์ไม่ได้ (Air Space) ดังนั้น ประสบการณ์ของทีมงานยกของในการจัดวางเรียงจึงสำคัญมากครับเพื่อไม่ให้ของบดบังและเหลือเศษพื้นที่ตู้"
      }
    ],
    isIndexable: true
  },
  "condo-no-elevator": {
    slug: "condo-no-elevator",
    title: "คู่มือย้ายคอนโดและหอพักไม่มีลิฟต์: วิธีขนย้ายชั้นสูงอย่างไรให้ปลอดภัย | WMS",
    description: "วิธีย้ายหอพักหรือคอนโดไม่มีลิฟต์ (ตึกแถว/อพาร์ทเม้นท์ 3-5 ชั้น) อย่างมีหลักการ ป้องกันเฟอร์นิเจอร์ชำรุดเสียหาย และข้อควรระวังในการประเมินแรงงานช่วยยก",
    category: "เทคนิคการขนย้าย",
    readTime: "อ่าน 4 นาที",
    lastUpdated: "25 มิถุนายน 2026",
    author: {
      name: "ธีรพล แก้วสว่าง",
      role: "ผู้เชี่ยวชาญการขนย้ายหน้างานระดับสูง WMS",
      avatar: "/images/logoWMS.webp"
    },
    h1: "ย้ายหอไม่มีลิฟต์ทำอย่างไร? คู่มือขนย้ายขึ้นลงบันไดตึกสูงอย่างปลอดภัยและเป็นระบบ",
    introduction: "การย้ายหอพักหรืออาคารพาณิชย์ที่ไม่มีลิฟต์ขนส่ง (มักพบในตึก 3-5 ชั้น) ถือเป็นฝันร้ายของการย้ายบ้านเลยก็ว่าได้ครับ เพราะนอกจากจะเหนื่อยล้าทางร่างกายแล้ว ยังมีความเสี่ยงสูงมากที่สิ่งของชิ้นใหญ่จะกระแทกขอบบันไดหรือมุมผนังจนแตกหักเสียหาย คู่มือนี้จะแนะนำแนวทางปฏิบัติจริงจากทีมงาน WMS",
    sections: [
      {
        title: "1. การวางแผนคัดกรองและแบ่งเบาน้ำหนักของ",
        content: "ก่อนเริ่มยกขนย้าย ให้คัดของที่ไม่จำเป็นทิ้งหรือบริจาคก่อน เพราะทุกๆ กิโลกรัมที่ลดลงหมายถึงความปลอดภัยของหลังและข้อเข่าของทีมยกของ การแบ่งของหนัก (เช่น หนังสือ, ของเหลว) ลงในกล่องขนาดเล็กแทนที่จะใส่กล่องใบใหญ่ใบเดียว จะช่วยให้ถือกระชับตัวและขึ้นลงบันไดได้ปลอดภัยยิ่งขึ้น"
      },
      {
        title: "2. การแรปซีลป้องกันมุมกระแทกแบบดับเบิ้ล (Double Protection)",
        content: "เนื่องจากช่องบันไดมักแคบและหักมุมอับ เฟอร์นิเจอร์ทุกชิ้น (โดยเฉพาะมุมโต๊ะ ตู้ลิ้นชัก ที่นอน) จะต้องผ่านการหุ้มพลาสติกแรปและเสริมมุมด้วยกระดาษลังหนาๆ เพื่อป้องกันการถลอกขูดขีดผนังหรือบันไดปูน"
      },
      {
        title: "3. เงื่อนไขค่าแรงคนยกสำหรับการแบกข้ามชั้นบันได",
        content: "การขนของผ่านทางบันไดตั้งแต่ชั้น 3 ขึ้นไป จะมีค่าแรงพนักงานยกเพิ่มตามระยะความเหนื่อยยากและระดับชั้นอาคาร เนื่องจากกล้ามเนื้อพนักงานยกต้องรับน้ำหนักต่อเนื่องยาวนาน การจ้างคนยกที่มีทักษะและผ่านงานจะช่วยปกป้องของได้ดีกว่าการยกเองอย่างแน่นอน"
      }
    ],
    isIndexable: true
  },
  "moving-in-rain": {
    slug: "moving-in-rain",
    title: "ย้ายบ้านหน้าฝนอย่างไรไม่ให้เปียก? เจาะลึกการขนย้ายด้วยรถตู้ทึบ | WMS",
    description: "แนะนำขั้นตอนย้ายบ้าน ขนส่งมอเตอร์ไซค์ช่วงฝนตก วิธีการแรปพลาสติกกันชื้น และเหตุผลที่รถกระบะตู้ทึบ WMS ป้องกันน้ำรั่วซึมและละอองฝน",
    category: "ความปลอดภัยในการขนส่ง",
    readTime: "อ่าน 3 นาที",
    lastUpdated: "25 มิถุนายน 2026",
    author: {
      name: "สมเกียรติ ยิ่งเจริญ",
      role: "หัวหน้าฝ่ายจัดส่งสินค้าและโลจิสติกส์ WMS",
      avatar: "/images/logoWMS.webp"
    },
    h1: "ย้ายบ้านขนส่งของช่วงมรสุม/ฝนตกหนัก: วิธีแรปและป้องกันความเสียหายจากน้ำฝน",
    introduction: "การขนของในฤดูฝนเป็นปัจจัยที่ควบคุมไม่ได้และสร้างความกังวลให้ลูกค้าอย่างมาก หากน้ำฝนซึมเข้าที่นอน โซฟา หรือเครื่องใช้ไฟฟ้า ย่อมก่อให้เกิดความเสียหายถาวรหรือขึ้นราได้ WMS จึงใช้รถกระบะตอนเดียวตู้ทึบอลูมิเนียมปิดทึบรอบด้านเพื่อป้องกันน้ำฝนซึมเข้าสินค้าตลอดเส้นทาง",
    sections: [
      {
        title: "1. ส่องโครงสร้างตู้ทึบ WMS ที่ป้องกันฝนและน้ำขัง",
        content: "รถกระบะตู้ทึบของ WMS ทุกคันประกอบด้วยตู้อลูมิเนียมแผ่นเดียวไร้รอยต่อ ไม่มีช่องว่างตรงหลังคา ขอบประตูมียางซีลกันน้ำเกรดหนาพิเศษ 2 ชั้น พร้อมตัวล็อกกลอนปิดแน่นหนา ป้องกันน้ำสาดหรือพายุฝนระดับรุนแรงได้อย่างเด็ดขาด ต่างจากรถกระบะคอกคลุมผ้าใบที่มักเจอปัญหาน้ำซึมและลมตีปลิว"
      },
      {
        title: "2. เทคนิคการแพ็กของกันฝนสำหรับของเปราะบาง",
        content: "ที่นอนและโซฟาผ้าจะต้องใส่ถุงพลาสติกแรปขนาดใหญ่หุ้มเต็มตัวและติดเทปกาวทับรอยต่อ เครื่องใช้ไฟฟ้าต้องแรปพลาสติกยึดรอบเครื่องเพื่อกันละอองน้ำช่วงจังหวะขนย้ายเดินเท้าจากหน้าบ้านเข้ารถ"
      },
      {
        title: "3. เผื่อเวลาการจอดรถรอจังหวะฝนซา",
        content: "ในจังหวะขนย้ายจุดขึ้นและลงของ หากฝนตกหนักมากจนพนักงานยกของมองไม่เห็นทาง ทีมงาน WMS จะแจ้งขออนุญาตจอดพักรอฝนซาประมาณ 15-20 นาที เพื่อไม่ให้ของเปียกชื้นขณะก้าวเดินผ่านพื้นที่โล่งแจ้ง"
      }
    ],
    isIndexable: true
  },
  "prep-motorcycle-transport": {
    slug: "prep-motorcycle-transport",
    title: "ขั้นตอนเตรียมรถมอเตอร์ไซค์/บิ๊กไบค์ก่อนส่งข้ามจังหวัด | WMS",
    description: "คู่มือแนะนําการเตรียมตัวส่งรถมอเตอร์ไซค์และ BigBike ด้วยรถตู้ทึบขนส่ง การลดระดับน้ำมัน วิธีการแรปป้องกันริ้วรอย และเอกสารประกอบที่จำเป็น",
    category: "ส่งรถมอเตอร์ไซค์",
    readTime: "อ่าน 4 นาที",
    lastUpdated: "25 มิถุนายน 2026",
    author: {
      name: "วราวุฒิ มงคล",
      role: "หัวหน้าทีมดูแลการขนส่งรถมอเตอร์ไซค์ WMS",
      avatar: "/images/logoWMS.webp"
    },
    h1: "เตรียมตัวอย่างไรก่อนส่งมอเตอร์ไซค์ข้ามจังหวัด? วิธีล็อก ป้องกัน และเอกสารที่ต้องใช้",
    introduction: "บริการขนส่งรถมอเตอร์ไซค์และบิ๊กไบค์ข้ามจังหวัดเป็นงานที่ต้องใช้ความประณีตสูงมาก รถทุกคันของลูกค้ามีมูลค่าสูง เพื่อให้การจัดส่งปลอดภัยไร้รอยขีดข่วนจนถึงปลายทาง นี่คือเช็กลิสต์สำคัญที่เจ้าของรถต้องเตรียมความพร้อมล่วงหน้าครับ",
    sections: [
      {
        title: "1. เอกสารยืนยันความเป็นเจ้าของตามกฎหมาย",
        content: "ก่อนขนส่ง ทีมงาน WMS ต้องขอตรวจสอบความถูกต้องทางกฎหมายเพื่อป้องกันการขนย้ายรถที่ไม่ถูกต้อง ลูกค้าต้องแสดง:",
        bullets: [
          "สำเนาเล่มทะเบียนรถ (หน้าที่มีชื่อเจ้าของและรายละเอียดรถ)",
          "สำเนาบัตรประชาชนของเจ้าของรถ (พร้อมเซ็นรับรองสำเนาถูกต้องเพื่อใช้ส่งรถ)",
          "กรณีรถติดไฟแนนซ์ สามารถใช้สำเนาสัญญาเช่าซื้อแทนเล่มจริงได้"
        ]
      },
      {
        title: "2. ระดับน้ำมันเชื้อเพลิงและความปลอดภัยภายในตู้",
        content: "น้ำมันในถังรถมอเตอร์ไซค์ควรปล่อยให้อยู่ในระดับต่ำสุด (ไม่ควรเกิน 1 ใน 4 ของถัง) เพื่อป้องกันการขยายตัวของไอระเหยน้ำมันเมื่อเจอกับสภาพความร้อนหรือระหว่างเดินทางไกล และต้องถอดพวงกุญแจรถรวมถึงของมีค่าใต้เบาะออกทั้งหมดก่อนส่งขึ้นตู้"
      },
      {
        title: "3. จุดแรปกันรอยและการยึดติดล้อรถ",
        content: "ทีมงาน WMS จะทำการแรปหุ้มชิ้นส่วนโครเมียม โคมไฟหน้า แฮนด์จับ และท่อไอเสียด้วยกันกระแทกอย่างหนาแน่น และยึดล้อหน้ารถด้วยตัวล็อก Wheel Chock และใช้สายรัด Ratchet Strap รัดยึดตรงโช้คอัพในมุม 45 องศาเพื่อไม่ให้รถแกว่งล้มระหว่างทาง"
      }
    ],
    isIndexable: true
  },
  "one-bedroom-condo-move": {
    slug: "one-bedroom-condo-move",
    title: "ย้ายคอนโด 1 ห้องนอน (28-35 ตร.ม.) ต้องเตรียมพื้นที่กี่คิว? | WMS",
    description: "เช็กลิสต์ประเมินปริมาณของคอนโด 1 ห้องนอน standard สำหรับการจองรถตู้ทึบย้ายห้อง คาดการณ์พื้นที่เฉลี่ยและวิธียกของอย่างประหยัดงบ",
    category: "เทคนิคการขนย้าย",
    readTime: "อ่าน 5 นาที",
    lastUpdated: "25 มิถุนายน 2026",
    author: {
      name: "ธีรพล แก้วสว่าง",
      role: "ผู้เชี่ยวชาญการขนย้ายหน้างานระดับสูง WMS",
      avatar: "/images/logoWMS.webp"
    },
    h1: "ย้ายห้องคอนโด 1 ห้องนอนขนาดมาตรฐาน: สรุปคิว CBM เฉลี่ย และจัดเตรียมรถขนของ",
    introduction: "ลูกค้าที่อาศัยในคอนโดมิเนียมขนาด 28-35 ตารางเมตร (1 ห้องนอน 1 ห้องนั่งเล่น) มักลังเลว่าสัมภาระทั้งหมดจะใส่รถกระบะตู้ทึบพอในเที่ยวเดียวไหม จากประสบการณ์การขนย้ายย่านกรุงเทพฯ ของ WMS กว่า 500 เคส ของทั้งหมดเกือบ 90% จะฟิตพอดีในรถกระบะตอนเดียวตู้ทึบ 2.1 เมตรคันเดียวพอดีครับ",
    sections: [
      {
        title: "1. รายการสิ่งของมาตรฐานของห้อง 1-Bedroom",
        content: "ของทั่วไปในห้องคอนโดขนาดนี้จะกอรปด้วยเฟอร์นิเจอร์หลักและเครื่องใช้ไฟฟ้า ได้แก่:",
        bullets: [
          "ที่นอน 5-6 ฟุต (1.2 คิว) พร้อมชุดเครื่องนอน",
          "โซฟา 2 ที่นั่ง (0.8 คิว) และโต๊ะกลางรับแขกเล็ก",
          "ตู้เย็น 2 ประตู (0.8 คิว) และเครื่องซักผ้า (0.45 คิว)",
          "ทีวีและชั้นวางทีวี (0.5 คิว)",
          "กล่องกระดาษใส่เสื้อผ้าและถ้วยชามของใช้จิปาถะ 10-15 ใบ (1.5-2.0 คิว)"
        ]
      },
      {
        title: "2. ปริมาตรรวมเฉลี่ยและแนวทางการจัดเรียง",
        content: "เมื่อนำมารวมกัน ปริมาตรรวมสัมภาระจะเฉลี่ยอยู่ที่ 5.5 - 6.8 คิว (CBM) ซึ่งตู้ทึบ WMS รับความจุได้สูงสุด 7.62 คิว แปลว่า 'ย้ายได้ใน 1 เที่ยวชัวร์' แต่ถ้าห้องของลูกค้ามีตู้เสื้อผ้าขนาดใหญ่ชนิดบิวท์อินหรือโต๊ะทำงานขนาดใหญ่เพิ่มขึ้นมา อาจต้องจ้างถอดประกอบล่วงหน้าเพื่อให้ประหยัดเนื้อที่ตู้ครับ"
      },
      {
        title: "3. เคล็ดลับการแพ็กของย้ายคอนโดเพื่อให้ขนขึ้นลิฟต์เร็วที่สุด",
        content: "เนื่องจากคอนโดมิเนียมมีการจำกัดชั่วโมงการใช้งานลิฟต์ขนของ (Service Lift) การแพ็กของกระจัดกระจายลงกล่องกระดาษแผ่นเดียวกันและปิดผนึกฝากล่องให้มิดชิด จะช่วยให้พนักงานยกสามารถจัดเรียงวางลงรถเข็นได้คราวละมากๆ ประหยัดเวลารอลิฟต์ และป้องกันการโดนนิติบุคคลปรับเพราะใช้งานเกินเวลา"
      }
    ],
    isIndexable: true
  }
};

```

### `src/app/data/geoMatrix.ts` (Complete File)
Lines 1 - 155

```ts
export interface GeoZone {
  name: string;
  landmarks: string[];
  districts: string[];
  corridors: string[];
  images: { url: string; alt: string }[];
  wikidata?: string;
  wikipedia?: string;
  // Hyperlocal Operations Atlas fields
  demandPatterns?: string;
  commonPropertyTypes?: string[];
  accessConstraints?: string[];
  commonLoadingConditions?: string[];
  localProofItems?: { url: string; label: string }[];
  localServiceNotes?: string;
  lastReviewedDate?: string;
}

export const geoMatrix: Record<string, GeoZone> = {
  "samutsakhon": {
    name: "สมุทรสาคร",
    landmarks: ["ตลาดทะเลไทย", "นิคมอุตสาหกรรมสมุทรสาคร", "เซ็นทรัลมหาชัย", "พอร์โต้ ชิโน่ (Porto Chino)", "วัดเจษฎาราม"],
    districts: ["มหาชัย", "กระทุ่มแบน", "บ้านแพ้ว", "อ้อมน้อย", "บางปลา", "ตำบลบ้านเกาะ"],
    corridors: ["ถนนพระราม 2", "ถนนเศรษฐกิจ 1", "ถนนเพชรเกษม"],
    images: [
      { url: "/images/WM8.webp", alt: "บริการรถรับจ้างตู้ทึบขนของสมุทรสาคร ใกล้ ตลาดทะเลไทย นิคมอุตสาหกรรมสมุทรสาคร" },
      { url: "/images/WM9.webp", alt: "รถกระบะรับจ้างย้ายบ้าน คอนโด ย่าน เซ็นทรัลมหาชัย พอร์โต้ ชิโน่ (Porto Chino) วัดเจษฎาราม" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q240608",
    wikipedia: "https://th.wikipedia.org/wiki/จังหวัดสมุทรสาคร",
    demandPatterns: "สูงในช่วงวันหยุดเสาร์-อาทิตย์ สำหรับย้ายหอพักพนักงานโรงงาน",
    commonPropertyTypes: ["ทาวน์โฮม", "หอพักพนักงาน", "โกดังสินค้า"],
    accessConstraints: ["ซอยแคบในย่านชุมชนมหาชัย", "ข้อจำกัดเวลาเข้าออกนิคมอุตสาหกรรม"],
    commonLoadingConditions: ["มีที่จอดรถหน้าอาคาร", "ต้องใช้รถเข็นเข้าซอยลึก"],
    localProofItems: [{ url: "/portfolio", label: "ผลงานย้ายสินค้าโรงงาน" }],
    localServiceNotes: "ควรเผื่อเวลาการเดินทางในช่วงเวลาเร่งด่วนบนถนนพระราม 2",
    lastReviewedDate: "2026-06-25"
  },
  "bkk-thonburi": {
    name: "กรุงเทพฯ ฝั่งธนบุรี",
    landmarks: ["ไอคอนสยาม (IconSiam)", "เดอะมอลล์บางแค", "ซีคอนบางแค", "ช่างชุ่ย", "มหาวิทยาลัยพระจอมเกล้าธนบุรี (บางมด)"],
    districts: ["วงเวียนใหญ่", "ปิ่นเกล้า", "บางแค", "จรัญสนิทวงศ์", "ตลาดพลู", "ท่าพระ", "หนองแขม", "เพชรเกษม"],
    corridors: ["ถนนเพชรเกษม", "ถนนบรมราชชนนี", "ถนนราชพฤกษ์", "ถนนกาญจนาภิเษก"],
    images: [
      { url: "/images/WM10.webp", alt: "บริการรถกระบะตู้ทึบย้ายหอคอนโด ฝั่งธนบุรี ใกล้ ไอคอนสยาม (IconSiam) เดอะมอลล์บางแค" },
      { url: "/images/WM11.webp", alt: "ขนส่งมอเตอร์ไซค์ บิ๊กไบค์ ฝั่งธน วงเวียนใหญ่ ปิ่นเกล้า บางแค จรัญสนิทวงศ์" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q1056586",
    wikipedia: "https://th.wikipedia.org/wiki/ฝั่งธนบุรี",
    demandPatterns: "กระจายตัวสม่ำเสมอ เน้นย้ายคอนโดช่วงปลายเดือน",
    commonPropertyTypes: ["คอนโดมิเนียม High-rise", "บ้านเดี่ยว", "ทาวน์โฮม"],
    accessConstraints: ["นิติบุคคลคอนโดจำกัดเวลาทำงาน 09:00-17:00", "ที่จอดรถจำกัดความสูง (มักไม่เกิน 2.1ม.)"],
    commonLoadingConditions: ["ต้องใช้ลิฟต์ขนของ (Service Lift)", "ระยะเดินจากจุดจอดรถถึงลิฟต์ค่อนข้างไกล"],
    localProofItems: [{ url: "/portfolio", label: "ผลงานย้ายคอนโดย่านท่าพระ" }],
    localServiceNotes: "ลูกค้าต้องติดต่อล่วงหน้าเพื่อขอนุญาตินิติบุคคลและจองลิฟต์ขนของ",
    lastReviewedDate: "2026-06-25"
  },
  "bkk-phra-nakhon": {
    name: "กรุงเทพฯ ฝั่งพระนคร",
    landmarks: ["สนามหลวง", "ถนนข้าวสาร", "เยาวราช (Chinatown)", "สยามพารากอน", "ตึกมหานคร (King Power Mahanakov)", "สถานีกลางกรุงเทพอภิวัฒน์"],
    districts: ["สุขุมวิท", "สีลม", "สาทร", "ลาดพร้าว", "ห้วยขวาง", "พระราม 9", "จตุจักร", "ดอนเมือง", "บางนา"],
    corridors: ["ถนนพหลโยธิน", "ถนนวิภาวดีรังสิต", "ถนนรัชดาภิเษก", "ทางด่วนขั้นที่ 1 และ 2"],
    images: [
      { url: "/images/WM12.webp", alt: "บริการย้ายบ้าน ย้ายสำนักงาน ฝั่งพระนคร ย่าน สาทร สีลม สุขุมวิท ห้วยขวาง" },
      { url: "/images/WM13.webp", alt: "รถกระบะตู้ทึบรับจ้าง กรุงเทพฯ ฝั่งพระนคร ใกล้ สยามพารากอน เยาวราช (Chinatown)" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q1861",
    wikipedia: "https://th.wikipedia.org/wiki/ฝั่งพระนคร"
  },
  "bangkok": {
    name: "กรุงเทพมหานคร",
    landmarks: ["สนามหลวง", "ถนนข้าวสาร", "เยาวราช (Chinatown)", "สยามพารากอน", "ตึกมหานคร (King Power Mahanakov)", "สถานีกลางกรุงเทพอภิวัฒน์"],
    districts: ["สุขุมวิท", "สีลม", "สาทร", "ลาดพร้าว", "ห้วยขวาง", "พระราม 9", "จตุจักร", "ดอนเมือง", "บางนา"],
    corridors: ["ถนนพหลโยธิน", "ถนนวิภาวดีรังสิต", "ถนนรัชดาภิเษก", "ทางด่วนขั้นที่ 1 และ 2"],
    images: [
      { url: "/images/WM14.webp", alt: "บริการรถกระบะตู้ทึบรับจ้างทั่วไป กรุงเทพมหานคร ย้ายคอนโด หอพัก" },
      { url: "/images/WM15.webp", alt: "รถรับจ้างย้ายบ้าน กรุงเทพฯ ครอบคลุม สุขุมวิท ลาดพร้าว พระราม 9 จตุจักร" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q1861",
    wikipedia: "https://th.wikipedia.org/wiki/กรุงเทพมหานคร"
  },
  "phuket": {
    name: "ภูเก็ต",
    landmarks: ["ป่าตอง", "แหลมพรหมเทพ", "เมืองเก่าภูเก็ต", "เซ็นทรัล ภูเก็ต"],
    districts: ["เมืองภูเก็ต", "กะทู้", "ถลาง", "ป่าตอง"],
    corridors: ["ถนนเทพกระษัตรี", "ถนนเฉลิมพระเกียรติ ร.9"],
    images: [
      { url: "/images/WM16.webp", alt: "บริการขนส่งรถมอเตอร์ไซค์ บิ๊กไบค์ ไปภูเก็ต ป่าตอง เมืองเก่าภูเก็ต" },
      { url: "/images/WM17.webp", alt: "รถกระบะรับจ้างย้ายบ้านภูเก็ต บริการรถตู้ทึบขนของขึ้นล่องกรุงเทพ-ภูเก็ต" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q236166",
    wikipedia: "https://th.wikipedia.org/wiki/จังหวัดภูเก็ต"
  },
  "samut-songkhram": {
    name: "สมุทรสงคราม",
    landmarks: ["อัมพวา", "ตลาดร่มหุบ", "ดอนหอยหลอด", "วัดเพชรสมุทรวรวิหาร"],
    districts: ["เมืองสมุทรสงคราม", "อัมพวา", "บางคนที"],
    corridors: ["ถนนพระราม 2", "ถนนสมุทรสงคราม-บางแพ"],
    images: [
      { url: "/images/WMS21-processedpng.webp", alt: "บริการย้ายบ้าน ย้ายหอพัก สมุทรสงคราม อัมพวา ตลาดร่มหุบ" },
      { url: "/images/WMS22-processed.webp", alt: "รถรับจ้างตู้ทึบปิดมิดชิด ขนส่งสินค้าสมุทรสงคราม-กรุงเทพฯ" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q271810",
    wikipedia: "https://th.wikipedia.org/wiki/จังหวัดสมุทรสงคราม"
  },
  "chonburi": {
    name: "ชลบุรี",
    landmarks: ["พัทยา", "บางแสน", "ท่าเรือแหลมฉบัง", "เซ็นทรัล ชลบุรี"],
    districts: ["เมืองชลบุรี", "ศรีราชา", "บางละมุง", "สัตหีบ", "พานทอง"],
    corridors: ["ถนนสุขุมวิท", "ทางหลวงพิเศษหมายเลข 7 (มอเตอร์เวย์)"],
    images: [
      { url: "/images/WMS23-processed(lightpdf.com).webp", alt: "บริการรถกระบะตู้ทึบรับจ้าง ชลบุรี พัทยา บางแสน ท่าเรือแหลมฉบัง" },
      { url: "/images/WMS24.webp", alt: "รถรับจ้างขนของ ชลบุรี ย้ายบ้าน ออฟฟิศ ขนส่งสินค้าโรงงาน" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q218817",
    wikipedia: "https://th.wikipedia.org/wiki/จังหวัดชลบุรี"
  },
  "chiang-mai": {
    name: "เชียงใหม่",
    landmarks: ["วัดพระธาตุดอยสุเทพ", "ประตูท่าแพ", "ไนท์บาซาร์", "เซ็นทรัล เฟสติวัล เชียงใหม่"],
    districts: ["เมืองเชียงใหม่", "หางดง", "สารภี", "แม่ริม", "สันทราย"],
    corridors: ["ถนนซุปเปอร์ไฮเวย์", "ถนนห้วยแก้ว"],
    images: [
      { url: "/images/WMS4.webp", alt: "รถกระบะรับจ้างย้ายบ้าน เชียงใหม่-กรุงเทพ ขนส่งรวดเร็ว มีประกันสินค้า" },
      { url: "/images/WMS6.webp", alt: "บริการส่งมอเตอร์ไซค์ บิ๊กไบค์ ไปเชียงใหม่ ประตูท่าแพ วัดพระธาตุดอยสุเทพ" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q220612",
    wikipedia: "https://th.wikipedia.org/wiki/จังหวัดเชียงใหม่"
  },
  "nonthaburi": {
    name: "นนทบุรี",
    landmarks: ["เมืองทองธานี", "เซ็นทรัลแจ้งวัฒนะ", "เซ็นทรัลรัตนาธิเบศร์", "วัดบรมราชากาญจนาภิเษกอนุสรณ์ (วัดเล่งเน่ยยี่ 2)"],
    districts: ["ปากเกร็ด", "บางใหญ่", "บางบัวทอง", "เมืองนนทบุรี", "บางกรวย", "ไทรน้อย"],
    corridors: ["ถนนงามวงศ์วาน", "ถนนแจ้งวัฒนะ", "ถนนรัตนาธิเบศร์", "ถนนราชพฤกษ์"],
    images: [
      { url: "/images/WM8.webp", alt: "รถรับจ้างขนของ นนทบุรี ย่าน เมืองทองธานี เซ็นทรัลแจ้งวัฒนะ" },
      { url: "/images/WM10.webp", alt: "บริการย้ายบ้าน ย้ายหอพัก นนทบุรี บางใหญ่ ปากเกร็ด รวดเร็ว ปลอดภัย" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q270725",
    wikipedia: "https://th.wikipedia.org/wiki/จังหวัดนนทบุรี"
  },
  "pathum-thani": {
    name: "ปทุมธานี",
    landmarks: ["รังสิต", "ฟิวเจอร์พาร์ครังสิต", "ตลาดไท", "มหาวิทยาลัยธรรมศาสตร์ ศูนย์รังสิต", "ดรีมเวิลด์"],
    districts: ["คลองหลวง", "ธัญบุรี", "เมืองปทุมธานี", "ลำลูกกา", "สามโคก", "ลาดหลุมแก้ว", "หนองเสือ"],
    corridors: ["ถนนพหลโยธิน", "ถนนรังสิต-นครนายก", "ถนนวิภาวดีรังสิต", "ทางด่วนอุดรรัถยา"],
    images: [
      { url: "/images/WM9.webp", alt: "รถรับจ้างตู้ทึบ ปทุมธานี รังสิต ฟิวเจอร์พาร์ค ตลาดไท" },
      { url: "/images/WM11.webp", alt: "บริการย้ายบ้าน ขนส่งมอเตอร์ไซค์ ลำลูกกา ธัญบุรี คลองหลวง ปทุมธานี" }
    ],
    wikidata: "https://www.wikidata.org/wiki/Q381987",
    wikipedia: "https://th.wikipedia.org/wiki/จังหวัดปทุมธานี"
  }
};

```

### `src/app/(marketing)/blog/posts.ts` (Complete File)
Lines 1 - 120

```ts
export interface Post {
  title: string;
  description: string;
  date: string;
  dateISO: string;
  image: string;
  content: string;
}

export const posts: Record<string, Post> = {
  "how-to-pack-fridge": {
    title: "5 วิธีแพ็กตู้เย็นก่อนย้ายบ้านอย่างปลอดภัย",
    description: "ไขข้อข้องใจเรื่องการเตรียมตู้เย็น ถอดปลั๊กล่วงหน้ากี่ชั่วโมง แพ็กอย่างไรไม่ให้เกิดรอยบุบและป้องกันระบบน้ำยาทำความเย็นเสียหาย",
    date: "15 พ.ค. 2569",
    dateISO: "2026-05-15T08:00:00+07:00",
    image: "/images/WM15.webp",
    content: `การขนย้ายตู้เย็นเป็นงานที่ต้องอาศัยความระมัดระวังอย่างสูง เนื่องจากตู้เย็นเป็นเครื่องใช้ไฟฟ้าที่มีทั้งชิ้นส่วนอะไหล่ที่เปราะบาง เช่น ชั้นวางกระจก รวมถึงระบบน้ำยาทำความเย็นที่ไวต่อการกระทบกระเทือน หากขนย้ายไม่ถูกวิธี อาจส่งผลให้คอมเพรสเซอร์เสียหายหรือตัวเครื่องเป็นรอยบุบได้

WMS Transport ได้รวบรวม 5 เคล็ดลับการแพ็กตู้เย็นอย่างถูกวิธีมาให้ทำตามกันครับ:

1. ถอดปลั๊กตู้เย็นล่วงหน้าอย่างน้อย 12-24 ชั่วโมง: เพื่อให้น้ำยาทำความเย็นไหลกลับเข้าสู่ระบบและให้ความเย็นภายในละลายหมดก่อนขนย้าย
2. นำของออกจากตู้เย็นให้หมด: ห้ามปล่อยอาหารหรือเครื่องดื่มไว้เด็ดขาด จากนั้นถอดชั้นวางและกล่องพลาสติกแยกออกไปหุ้มแอร์บับเบิลต่างหาก
3. ทำความสะอาดและเช็ดให้แห้ง: เพื่อป้องกันการสะสมของกลิ่นอับและความชื้นระหว่างเดินทาง
4. ยึดประตูด้วยเทปป้องกันรอย: ใช้กระดาษหรือโฟมหนารองขอบประตูก่อนรัดด้วยสายรัดหรือเทปกาวที่ไม่ทิ้งคราบเหนียว
5. หุ้มตู้เย็นด้วยพลาสติกซีล/บับเบิลกันกระแทก: ห่อหุ้มตู้เย็นทั้งหลังด้วยแอร์บับเบิลและซีลพลาสติกทับ เพื่อปกป้องผิวสีของตู้เย็นจากการขีดข่วน

เมื่อถึงบ้านใหม่แล้ว ควรตั้งตู้เย็นทิ้งไว้อย่างน้อย 4-6 ชั่วโมงเพื่อให้ระบบน้ำยาทำความเย็นเซ็ตตัว ก่อนจะเสียบปลั๊กใช้งานตามปกติครับ`
  },
  "prepare-motorcycle-transport": {
    title: "ขั้นตอนเตรียมตัวส่งมอเตอร์ไซค์/บิ๊กไบค์ข้ามจังหวัด",
    description: "แชร์วิธีเตรียมรถ ถอดของแต่ง การจองคิวรถขนส่ง และสิ่งที่ต้องเช็กก่อนส่งมอบกุญแจ เพื่อความปลอดภัยสูงสุดตลอดเส้นทาง",
    date: "20 พ.ค. 2569",
    dateISO: "2026-05-20T08:00:00+07:00",
    image: "/images/WMS24.webp",
    content: `การส่งมอบมอเตอร์ไซค์หรือบิ๊กไบค์คันโปรดของคุณเดินทางข้ามจังหวัด ต้องการมาตรฐานความปลอดภัยขั้นสูงสุดเพื่อความอุ่นใจอย่างเต็มที่ และนี่คือขั้นตอนง่ายๆ ในการเตรียมรถก่อนทำการส่งมอบขนส่งกับทีมงาน WMS Transport:

1. ล้างทำความสะอาดตัวรถ: เพื่อช่วยให้คุณตรวจพบรอยขีดข่วนหรือตำหนิเดิมรอบตัวรถได้ง่ายก่อนทำการส่งมอบ
2. ถอดชิ้นส่วนแต่งหรืออุปกรณ์เสริมที่แตกหักง่าย: เช่น กระจกมองข้าง กล่องเก็บของด้านหลัง โทรศัพท์มือถือ หรือตัวยึดจับต่างๆ แยกแพ็กไว้ต่างหาก
3. เตรียมเอกสารสำคัญ: แนบสำเนาเล่มทะเบียนรถ (Green Book) หรือสำเนาสัญญาซื้อขาย และสำเนาบัตรประชาชนของผู้ส่งมอบ เพื่อใช้ตรวจสอบสิทธิ์ในกรณีด่านตรวจทางหลวง
4. ปริมาณน้ำมันในถัง: แนะนำให้มีน้ำมันหลงเหลืออยู่ในถังประมาณ 1 ใน 4 เพื่อป้องกันปัญหาน้ำมันรั่วซึมระหว่างการรัดตรึงและขนส่ง และยังมีน้ำมันเพียงพอให้สตาร์ทขับขี่ตอนปลายทาง
5. ตรวจสอบกุญแจและจดเลขไมล์: บันทึกเลขไมล์เดิมและสภาพรถโดยรวมด้วยภาพถ่ายหรือคลิปวิดีโอสั้นๆ ร่วมกับพนักงานขนส่งก่อนนำรถขึ้นแท่นรัดตรึง

ที่ WMS Transport เราใช้ระบบรัดยึดพิเศษ และการแพ็กกันรอยรอบคัน เพื่อให้มั่นใจว่ามอเตอร์ไซค์และบิ๊กไบค์ของคุณจะถึงปลายทางในสภาพที่สมบูรณ์เรียบร้อย`
  },
  "moving-house-checklist": {
    title: "Checklist เตรียมย้ายบ้านใหม่ใน 7 วันแบบมือโปร",
    description: "วางแผนขนของย้ายบ้านอย่างไรให้ราบรื่น ไม่ตกหล่น ตั้งแต่วันเริ่มวางแผนไปจนถึงจัดระเบียบของเมื่อเข้าบ้านใหม่",
    date: "25 พ.ค. 2569",
    dateISO: "2026-05-25T08:00:00+07:00",
    image: "/images/WM11.webp",
    content: `การย้ายบ้านไม่จำเป็นต้องเป็นเรื่องชวนปวดหัวอีกต่อไป หากคุณมีการเตรียมพร้อมที่ดีล่วงหน้าอย่างเป็นระบบ WMS Transport ได้ออกแบบ Checklist แผนเตรียมตัวย้ายบ้านใน 7 วันแบบมือโปรมาฝากครับ:

- วันที่ 1-2: คัดแยกของและจัดกลุ่มสิ่งของ
  - เริ่มเคลียร์สิ่งของที่ไม่จำเป็น เสื้อผ้าเก่าที่ไม่ใช้ หรือเฟอร์นิเจอร์ชำรุด โดยแบ่งออกเป็น 3 กลุ่ม: ทิ้ง, บริจาค, หรือเก็บเพื่อนำไปบ้านใหม่
- วันที่ 3-4: จัดซื้ออุปกรณ์แพ็กเกจจิ้งและเริ่มแพ็กของที่ไม่ค่อยได้ใช้
  - เตรียมกล่องกระดาษ เทปกาว แอร์บับเบิล ปากกาเคมีเขียนกำกับ และเริ่มแพ็กของใช้ที่ไม่ได้จำเป็นในชีวิตประจำวัน เช่น หนังสือ ของตกแต่ง เสื้อผ้าต่างฤดู
- วันที่ 5: แพ็กของใช้ส่วนตัวและเสื้อผ้า
  - จัดกระเป๋าเดินทางแยกไว้สำหรับของใช้ส่วนตัว ยาประจำตัว เสื้อผ้า และของใช้จำเป็นเร่งด่วนสำหรับช่วง 1-2 วันแรกเมื่อไปถึงบ้านใหม่
- วันที่ 6: เตรียมเคลียร์เครื่องใช้ไฟฟ้าใหญ่
  - ทำความสะอาดตู้เย็น ถอดปลั๊ก ละลายน้ำแข็ง ม้วนเก็บสายไฟเครื่องซักผ้า มัดสายเคเบิลของทีวีและชุดโฮมเธียเตอร์ให้เรียบร้อย
- วันที่ 7: วันขนย้ายจริง!
  - ตรวจสอบความถูกต้องและจำนวนกล่อง ตรวจเช็กห้องทุกจุดว่าไม่มีของลืมทิ้งไว้ จากนั้นปล่อยให้เป็นหน้าที่ของพนักงานขนย้าย WMS Transport จัดเรียงของขึ้นรถและเดินทางอย่างปลอดภัย

การวางแผนอย่างเป็นขั้นตอนแบบนี้ จะช่วยลดความวุ่นวาย และประหยัดเวลาการจัดระเบียบบ้านใหม่ได้เป็นอย่างดีเลยครับ`
  },
  "5-วิธีแพ็คมอเตอร์ไซค์ส่งข้ามจังหวัด": {
    title: "5 วิธีแพ็คมอเตอร์ไซค์ส่งข้ามจังหวัดให้ไร้รอยขีดข่วน",
    description: "ก่อนส่งรถข้ามจังหวัด ต้องเตรียมตัวยังไง? เรารวบรวม 5 เทคนิคสำคัญจากทีมงานมืออาชีพ WMS เพื่อให้รถถึงมือคุณอย่างสมบูรณ์เรียบร้อย",
    date: "20 พ.ค. 2569",
    dateISO: "2026-05-20T08:00:00+07:00",
    image: "/images/WMS24.webp",
    content: `การส่งรถจักรยานยนต์หรือมอเตอร์ไซค์บิ๊กไบค์ข้ามจังหวัดไม่ใช่เรื่องยากหากทำตามหลักวิธีขนย้ายที่ถูกต้อง เพื่อป้องกันรอยขีดข่วนและความชำรุดเสียหายที่อาจเกิดขึ้นระหว่างทาง นี่คือ 5 วิธีแพ็คมอเตอร์ไซค์ส่งข้ามจังหวัดให้ไร้รอยขีดข่วนจาก WMS Transport:

1. ล้างทำความสะอาดตัวรถและบันทึกสภาพ: การล้างรถช่วยให้คุณเห็นรอยตำหนิเดิมได้อย่างชัดเจน ถ่ายภาพตัวรถเก็บไว้ทุกมุม และจดบันทึกเลขไมล์ล่าสุดร่วมกับผู้ขนส่ง
2. ถอดของแต่งและของมีค่าออกให้หมด: ถอดชิ้นส่วนอุปกรณ์เสริม เช่น กระจกส่องหลัง ตัวจับมือถือ หรือกล่องเก็บหมวกกันน็อกด้านหลัง แยกแพ็กต่างหากเพื่อลดโอกาสเสียหาย
3. พันส่วนเสี่ยงด้วยวัสดุกันกระแทก (Bubble Wrap): ใช้แอร์บับเบิลหรือพลาสติกหนาห่อหุ้มบริเวณแฮนด์รถ ถังน้ำมัน บังโคลนหน้า-หลัง และชิ้นส่วนที่เสี่ยงต่อการโดนกระแทกมากที่สุด
4. เตรียมเล่มทะเบียนหรือเอกสารหลักฐาน: แนบสำเนาทะเบียนรถและบัตรประชาชนของผู้ส่งมอบเสมอ เพื่อความสะดวกและถูกต้องตามกฎหมายในการตรวจด่านทางหลวง
5. ยึดติดแน่นหนากับรถขนส่ง: การใช้สายรัดรถประเภท Cam Buckle หรือ Ratchet Strap ผูกยึดกับตัวถังรถบรรทุก ไม่ผูกกับชิ้นส่วนแฟริ่งหรือแฮนด์โดยตรง เพื่อความเสถียรสูงสุดขณะรถวิ่ง

ทีมงาน WMS Transport เลือกใช้อุปกรณ์และเทคนิคการผูกยึดระดับมืออาชีพ พร้อมแพ็กกันกระแทกอย่างหนาแน่น เพื่อความปลอดภัยสูงสุดของรถคุณในทุกเส้นทางครับ`
  },
  "moving-condo-checklist": {
    title: "เช็คลิสต์ก่อนย้ายคอนโด ย้ายหอพักอย่างไรให้ราบรื่น ไม่เหนื่อย",
    description: "เตรียมตัวย้ายคอนโดหรือย้ายหอพักในฝันของคุณด้วย Checklist ง่ายๆ ช่วยให้คุณจัดของเป็นระเบียบ ขนย้ายสะดวก และลดค่าใช้จ่าย",
    date: "1 มิ.ย. 2569",
    dateISO: "2026-06-01T08:00:00+07:00",
    image: "/images/WM11.webp",
    content: `การย้ายคอนโดมิเนียมหรือหอพักต้องการการวางแผนที่ดีเพื่อหลีกเลี่ยงความวุ่นวายและการทำสิ่งของสูญหายหรือเสียหาย นี่คือเช็คลิสต์ขั้นตอนสำคัญก่อนวันย้ายคอนโดที่ช่วยให้ทุกอย่างเป็นเรื่องง่าย:

1. แจ้งนิติบุคคลของคอนโดล่วงหน้า: ติดต่อขอนัดวันเวลาในการขนย้ายและจองลิฟต์ขนของล่วงหน้า เพื่อป้องกันการชนคิวกับผู้พักอาศัยรายอื่นและไม่ให้ผิดกฎของอาคาร
2. คัดแยกและทิ้งสิ่งของที่ไม่ใช้: การย้ายคอนโดเป็นโอกาสที่ดีในการเคลียร์ของ ทิ้งเสื้อผ้าที่ใส่ไม่ได้หรือบริจาคของเล่นและสิ่งของที่เกินความจำเป็น
3. ใช้กล่องและวัสดุกันกระแทกที่เหมาะสม: แพ็กของมีค่าและกระจกด้วยแอร์บับเบิลอย่างหนา และเขียนกำกับบนทุกกล่องว่าภายในคืออะไรและต้องย้ายไปห้องไหน
4. จัดกระเป๋าของใช้จำเป็น 1 คืนแรก: เก็บแปรงสีฟัน ผ้าเช็ดตัว เสื้อผ้าเปลี่ยน และสายชาร์จโทรศัพท์แยกต่างหาก เพื่อให้คุณสามารถใช้ชีวิตคืนแรกในคอนโดใหม่ได้ทันทีโดยไม่ต้องรื้อทุกกล่อง
5. ถ่ายภาพห้องเดิมและห้องใหม่ก่อนย้าย: ถ่ายรูปสภาพห้องเช่าเดิมไว้เป็นหลักฐานเพื่อการขอคืนเงินมัดจำ และถ่ายรูปห้องใหม่ก่อนเริ่มขนของเข้าไป

หากคุณต้องการความสะดวกและรวดเร็ว WMS Transport พร้อมให้บริการรถรับจ้างขนของย้ายคอนโดและหอพัก พร้อมพนักงานยกของมืออาชีพที่จะช่วยดูแลทุกชิ้นส่วนอย่างดีที่สุด!`
  },
  "ทำไมต้องเลือกรถกระบะตู้ทึบ": {
    title: "ทำไมต้องเลือกรถกระบะตู้ทึบ? เปรียบเทียบข้อดีกับรถกระบะเปิด",
    description: "สงสัยว่าจะเลือกรถแบบไหนดี? เราเปรียบเทียบให้เข้าใจง่ายๆ ว่าทำไมรถกระบะตู้ทึบถึงปลอดภัยกว่า คุ้มค่ากว่า สำหรับของมีค่าและการย้ายบ้าน",
    date: "10 พ.ค. 2569",
    dateISO: "2026-05-10T08:00:00+07:00",
    image: "/images/WM15.webp",
    content: `ในการเลือกหารถรับจ้างขนของ ย้ายหอ หรือขนส่งสินค้า หลายท่านอาจสงสัยว่าควรเลือกใช้ "รถกระบะตู้ทึบ" หรือ "รถกระบะเปิดประทุน/คอกธรรมดา" แบบไหนจะดีและเหมาะสมกับงานของคุณมากกว่ากัน?

WMS Transport ขอเปรียบเทียบจุดเด่นของรถกระบะตู้ทึบเพื่อประกอบการตัดสินใจครับ:

1. ปลอดภัยจากสภาพอากาศและละอองฝน:
ข้อดีสูงสุดของรถกระบะตู้ทึบคือ มีการปิดมิดชิดรอบด้าน ช่วยปกป้องสัมภาระของคุณจาก น้ำฝน รังสียูวี ฝุ่นละออง และควันพิษบนท้องถนนตลอดการเดินทาง ต่างจากรถกระบะคอกเปิดที่แม้จะมีผ้าใบคลุมแต่ยังคงเสี่ยงต่อการเกิดฝนรั่วซึมหรือฝุ่นปลิวเข้าได้

2. ป้องกันการสูญหายและสิ่งของเสียหาย:
การขนย้ายสิ่งของหรืออุปกรณ์อิเล็กทรอนิกส์ เฟอร์นิเจอร์ หรือของมีมูลค่าสูงในตู้ทึบที่ปิดล็อกหนาแน่น ช่วยลดความเสี่ยงจากการตกหล่นระหว่างทาง และความเสี่ยงในการสูญหายจากการแวะจอดพักระหว่างการขนส่งได้เป็นอย่างดี

3. บรรจุสิ่งของได้เป็นระเบียบและประหยัดเที่ยววิ่ง:
โครงสร้างของตู้ทึบที่มีหลังคาสูงมาตรฐานและผนังตรง ช่วยให้สามารถจัดเรียงวางกล่องกระดาษ และของใช้ต่างๆ ซ้อนทับกันได้ถึงเพดานตู้ ส่งผลให้ขนสิ่งของได้ปริมาณมากกว่าในหนึ่งเที่ยววิ่ง ทำให้ประหยัดงบค่าใช้จ่ายได้มากขึ้น

หากคุณกำลังวางแผนย้ายบ้าน ย้ายหอ หรือขนส่งสินค้าด่วน ที่ WMS Transport เราใช้รถกระบะตู้ทึบอลูมิเนียมมาตรฐานสูง สะอาด ปลอดภัย พร้อมพนักงานบริการยกของเพื่อให้ทุกการขนส่งเป็นไปอย่างราบรื่นรวดเร็วที่สุดครับ`
  }
};

```

---

## 17. NAP Occurrence Index

| Value | Source path | Line | Context |
| ----- | ----------- | ---: | ------- |
| `WMS TRANSPORT` (Business Name) | `src/lib/seo/site-config.ts` | 9 | `businessName: "WMS TRANSPORT"` |
| `WMS TRANSPORT รถกระบะตู้ทึบรับจ้าง...` | `src/lib/seo/site-config.ts` | 10 | `businessFullName` |
| `061-240-2436` | `src/lib/seo/site-config.ts` | 11 | `phone: "061-240-2436"` |
| `+66-61-240-2436` | `src/lib/seo/site-config.ts` | 12 | `phoneFormatted` (E.164-style schema standard) |
| `tel:0612402436` | `src/lib/seo/site-config.ts` | 13 | `phoneHref` |
| `https://line.me/ti/p/DtICkMaDet` | `src/lib/seo/site-config.ts` | 14 | `lineUrl` |
| `https://www.facebook.com/wmstransport` | `src/lib/seo/site-config.ts` | 15 | `facebookUrl` |
| `https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr` | `src/lib/seo/site-config.ts` | 16 | `facebookPageAlt` |
| `1999.kittinanwimonset@gmail.com` | `src/lib/seo/site-config.ts` | 17 | `email` |
| `https://maps.app.goo.gl/gw8LCFmdXuejr5N99` | `src/lib/seo/site-config.ts` | 23 | `googleMapsUrl` |
| `75 535 ซ.13` | `src/lib/seo/site-config.ts` | 25 | `streetAddress` |
| `บ้านเกาะ` | `src/lib/seo/site-config.ts` | 26 | `subDistrict` |
| `เมืองสมุทรสาคร` | `src/lib/seo/site-config.ts` | 27 | `district` |
| `ตำบลบ้านเกาะ อำเภอเมืองสมุทรสาคร` | `src/lib/seo/site-config.ts` | 28 | `addressLocality` |
| `สมุทรสาคร` | `src/lib/seo/site-config.ts` | 29 | `addressRegion` |
| `74000` | `src/lib/seo/site-config.ts` | 30 | `postalCode` |
| `13.6018827, 100.2463594` | `src/lib/seo/site-config.ts` | 34-35 | `geo.latitude, geo.longitude` |
| `75 535 ซ.13 ตำบลบ้านเกาะ... 74000` | `src/components/ServiceMap.tsx` | 138 | Office address text badge |
| `https://maps.google.com/maps?q=13.6018827,100.2463594...` | `src/components/ServiceMap.tsx` | 18 | Google Maps iframe embed URL |
| `061-240-2436` | `src/components/ServiceMap.tsx` | 174 | ServiceMap phone text |
| `tel:0612402436` | `src/components/ServiceMap.tsx` | 173 | ServiceMap phone link |
| `061-240-2436` | `src/components/Footer.tsx` | 149 | Footer phone display |
| `tel:0612402436` | `src/components/Footer.tsx` | 148 | Footer phone link |
| `1999.kittinanwimonset@gmail.com` | `src/components/Footer.tsx` | 152 | Footer email link |
| `061-240-2436` | `src/components/Navbar.tsx` | 444 | Desktop Navbar phone display |
| `tel:0612402436` | `src/components/Navbar.tsx` | 440 | Desktop Navbar phone link |
| `061-240-2436` | `src/components/Navbar.tsx` | 615 | Mobile Drawer phone display |
| `tel:0612402436` | `src/components/Navbar.tsx` | 609 | Mobile Drawer phone link |
| `https://line.me/ti/p/DtICkMaDet` | `src/components/Navbar.tsx` | 423, 617 | Desktop & Mobile LINE links |
| `061-240-2436` | `src/components/FloatingContact.tsx` | 175 | Floating FAB phone tooltip |
| `tel:0612402436` | `src/components/FloatingContact.tsx` | 165 | Floating FAB phone link |
| `https://line.me/ti/p/DtICkMaDet` | `src/components/FloatingContact.tsx` | 185 | Floating FAB LINE link |
| `https://www.facebook.com/share/1DnN6iPogp/?mibextid=wwXIfr` | `src/components/FloatingContact.tsx` | 134 | Floating FAB Messenger link |
| `061-240-2436` | `src/app/(marketing)/page.tsx` | 650, 784, 815 | Homepage section contact CTA displays |
| `tel:0612402436` | `src/app/(marketing)/page.tsx` | 646, 780, 811 | Homepage section contact CTA links |
| `061-240-2436` | `src/components/ThonburiHubView.tsx` | 130, 799 | Thonburi Hub contact displays |
| `tel:0612402436` | `src/components/ThonburiHubView.tsx` | 126, 796 | Thonburi Hub contact links |
| `061-240-2436` | `src/app/not-found.tsx` | 54 | 404 page phone display |
| `tel:0612402436` | `src/app/not-found.tsx` | 50 | 404 page phone link |

---

## 18. SEO File Checklist

- [x] Global metadata: **Found** (`src/app/layout.tsx`, `src/lib/seo/site-config.ts`, `src/lib/seo/metadata.ts`)
- [x] Route metadata: **Found** (24 route files exporting static or dynamic metadata)
- [x] Canonical URLs: **Found** (All canonical URLs centralized via `src/lib/seo/metadata.ts` with https prefix)
- [x] Open Graph: **Found** (Standard OpenGraph in `src/lib/seo/metadata.ts` & `src/app/layout.tsx`, dynamic Edge OG in `opengraph-image.tsx`)
- [x] Twitter metadata: **Found** (`summary_large_image` in `metadata.ts` & `layout.tsx`)
- [x] JSON-LD: **Found** (All schemas sanitized via `escapeJsonLd`)
- [x] LocalBusiness schema: **Found** (`buildMovingCompanySchema` with `#moving-company` stable @id in `src/lib/seo/schema.ts`)
- [x] Service schema: **Found** (`buildServiceSchema`, `buildRouteServiceSchema`, and district/hub page schemas)
- [x] Review schema: **Found** (Verified reviews in `src/data/reviewEvidence.ts` and customer reviews components; self-serving aggregate rating is prohibited)
- [x] Breadcrumb schema: **Found** (`buildBreadcrumbSchema`, `Breadcrumbs.tsx`, `breadcrumbs.ts`)
- [x] Sitemap: **Found** (`src/app/sitemap.ts` dynamic route enumeration)
- [x] Robots: **Found** (`src/app/robots.ts`)
- [x] Google verification: **Found** (`googlef4b84622b6d0dd15.html` & `XBZroDGp_kA28tbvOnFUymh1DsDybkbicMoyPmsQ8JY`)
- [x] Web manifest: **Found** (`site.webmanifest` & `public/images/site.webmanifest`)
- [x] Favicons/icons: **Found** (Standardized in `public/` and `public/images/`, declared in `layout.tsx`)
- [x] NAP data: **Found** (`75 535 ซ.13 ต.บ้านเกาะ อ.เมือง จ.สมุทรสาคร 74000`, `061-240-2436`)
- [x] GPS/Plus Code: **Found** (`13.6018827, 100.2463594` and Google Maps URL `https://maps.app.goo.gl/gw8LCFmdXuejr5N99`)
- [x] Google Analytics: **Found** (`src/components/GoogleAnalytics.tsx` with GA4 & Partytown web worker support)
- [x] Redirects/rewrites: **Found** (`next.config.ts` without conflicting rewrites)
- [x] SEO helpers: **Found** (`src/lib/seo/site-config.ts`, `metadata.ts`, `schema.ts`, `breadcrumbs.ts`, `entityGraph.ts`, `tools/verify-seo-data.js`)