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
    url: `${siteConfig.baseUrl}/`,
    name: siteConfig.businessName,
    alternateName: ["WMS Transport", "wms-transport.com"],
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
