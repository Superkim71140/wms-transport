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

  // Prevent duplicate brand name if the title already contains WMS TRANSPORT
  const resolvedTitle = title.includes(siteConfig.businessName)
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
  const title = `${record.primaryIntent} | ${siteConfig.businessName}`;
  const description = `บริการรถรับจ้างตู้ทึบ ขนส่งมอเตอร์ไซค์ ย้ายบ้านคอนโด ย่าน${record.districtThaiName} ${provinceThaiName} ${record.actualServiceCapability}. ${record.localOperationalNotes.substring(0, 100)}...`;

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
