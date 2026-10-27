import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo/site-config";
import { getPublishedLocalPoints } from "@/data/areaZonesData";
import AreasDirectoryView from "@/components/service-area/AreasDirectoryView";

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
        name: "พื้นที่บริการ",
        item: `${siteConfig.baseUrl}/areas`,
      },
    ],
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    "@id": `${siteConfig.baseUrl}/#moving-company`,
    name: siteConfig.businessFullName,
    url: `${siteConfig.baseUrl}/areas`,
    telephone: siteConfig.phone,
    email: siteConfig.email,
    openingHours: siteConfig.openingHours,
    hasMap: siteConfig.googleMapsUrl,
    address: {
      "@type": "PostalAddress",
      streetAddress: siteConfig.address.streetAddress,
      addressLocality: siteConfig.address.addressLocality,
      addressRegion: siteConfig.address.addressRegion,
      postalCode: siteConfig.address.postalCode,
      addressCountry: siteConfig.address.addressCountry,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: siteConfig.geo.latitude,
      longitude: siteConfig.geo.longitude,
    },
    areaServed: siteConfig.serviceAreas.map((area) => ({
      "@type": "AdministrativeArea",
      name: area,
    })),
  };

  const collectionPageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${siteConfig.baseUrl}/areas#webpage`,
    url: `${siteConfig.baseUrl}/areas`,
    name: "พื้นที่บริการรถรับจ้าง WMS Transport",
    description: "สารบัญพื้นที่บริการรถรับจ้าง 7 โซนยุทธศาสตร์ และจังหวัดครอบคลุมทั่วประเทศ",
    isPartOf: {
      "@type": "WebSite",
      "@id": `${siteConfig.baseUrl}/#website`,
      name: siteConfig.businessName,
      url: siteConfig.baseUrl,
    },
    about: {
      "@id": `${siteConfig.baseUrl}/#moving-company`,
    },
    mainEntity: {
      "@type": "ItemList",
      name: "7 โซนบริการยุทธศาสตร์ WMS Transport",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "โซน 1: มหาชัย – เมืองสมุทรสาคร",
          url: `${siteConfig.baseUrl}/areas/maha-chai`,
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "โซน 2: กระทุ่มแบน – อ้อมน้อย",
          url: `${siteConfig.baseUrl}/areas/krathumbaen-omnoi`,
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "โซน 3: พระราม 2 – บางกระดี่",
          url: `${siteConfig.baseUrl}/areas/rama2-bangkradi`,
        },
        {
          "@type": "ListItem",
          position: 4,
          name: "โซน 4: บางบอน – เอกชัย",
          url: `${siteConfig.baseUrl}/areas/bangbon-ekachai`,
        },
        {
          "@type": "ListItem",
          position: 5,
          name: "โซน 5: หนองแขม – เพชรเกษม 81",
          url: `${siteConfig.baseUrl}/areas/nongkhaem-phetkasem81`,
        },
        {
          "@type": "ListItem",
          position: 6,
          name: "โซน 6: บางแค – เพชรเกษม",
          url: `${siteConfig.baseUrl}/areas/bang-khae`,
        },
        {
          "@type": "ListItem",
          position: 7,
          name: "โซน 7: พุทธมณฑลสาย 1–4 – ศาลายา",
          url: `${siteConfig.baseUrl}/areas/phutthamonthon-sai-1-4`,
        },
      ],
    },
  };

  const publishedPoints = getPublishedLocalPoints().map((p) => ({
    pointId: p.pointId,
    zoneSlug: p.zoneSlug,
    slug: p.slug,
    thaiName: p.thaiName,
    disambiguation: p.disambiguation,
    preferredUrl: p.preferredUrl,
    primaryKeyword: p.primaryKeyword,
  }));

  return (
    <div className="flex flex-col min-h-screen bg-white text-slate-900 font-sans">
      {/* Schema Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />

      <main className="flex-1">
        <AreasDirectoryView initialPoints={publishedPoints} />
      </main>
    </div>
  );
}
