import React from "react";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { siteConfig } from "@/lib/seo/site-config";
import { provinceMap } from "../../service/[province]/page";
import {
  districtLandingPages,
  isDistrictPageIndexable,
} from "@/data/districtLandingPages";
import { buildDistrictMetadata } from "@/lib/seo/metadata";
import {
  ZONE_HUBS,
  getZoneHub,
  getLocalPointBySlug,
  getPointsForZone,
  getAllLocalPoints,
} from "@/data/areaZonesData";
import ZoneHubView from "@/components/service-area/ZoneHubView";
import LocalPointView from "@/components/service-area/LocalPointView";
import DistrictPageView from "@/components/service-area/DistrictPageView";

interface CatchAllAreaProps {
  params: Promise<{
    slug: string[];
  }>;
}

export const dynamicParams = false;

export async function generateStaticParams() {
  const params: { slug: string[] }[] = [];

  // 1. Seven Zone Hubs (length 1: /areas/{zone})
  for (const zoneSlug of Object.keys(ZONE_HUBS)) {
    params.push({ slug: [zoneSlug] });
  }

  // 2. Existing indexable districts (length 2: /areas/{province}/{district})
  for (const record of Object.values(districtLandingPages)) {
    if (isDistrictPageIndexable(record)) {
      params.push({ slug: [record.province, record.districtSlug] });
    }
  }

  // 3. New detailed local area points (length 2: /areas/{zone}/{locality})
  for (const point of getAllLocalPoints()) {
    if (
      (point.action === "new_page" || point.action === "enrich_existing") &&
      point.status === "published"
    ) {
      params.push({ slug: [point.zoneSlug, point.slug] });
    }
  }

  return params;
}

export async function generateMetadata({
  params,
}: CatchAllAreaProps): Promise<Metadata> {
  const { slug } = await params;

  // Length 1: Zone Hub
  if (slug.length === 1) {
    const zone = getZoneHub(slug[0]);
    if (!zone) {
      return {
        title: "ไม่พบพื้นที่บริการ | WMS TRANSPORT",
        robots: { index: false, follow: false },
      };
    }

    const canonicalUrl = `${siteConfig.baseUrl}/areas/${zone.slug}`;

    return {
      title: zone.title,
      description: zone.description,
      alternates: {
        canonical: `/areas/${zone.slug}`,
      },
      openGraph: {
        title: zone.title,
        description: zone.description,
        url: canonicalUrl,
        type: "website",
        siteName: siteConfig.businessName,
        locale: siteConfig.locale,
        images: [
          {
            url: `${siteConfig.baseUrl}${siteConfig.defaultOgImage}`,
            width: 1200,
            height: 630,
            alt: zone.title,
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: zone.title,
        description: zone.description,
        images: [`${siteConfig.baseUrl}${siteConfig.defaultOgImage}`],
      },
    };
  }

  // Length 2: Either District or Local Area Point
  if (slug.length === 2) {
    const [first, second] = slug;

    // Check Case A: District landing page
    const districtRecord = districtLandingPages[second];
    const provConfig = provinceMap[first];
    if (
      districtRecord &&
      districtRecord.province === first &&
      provConfig &&
      isDistrictPageIndexable(districtRecord)
    ) {
      const provName = provConfig?.name ?? first;
      return buildDistrictMetadata(districtRecord, provName);
    }

    // Check Case B: Local Area Point
    const point = getLocalPointBySlug(first, second);
    if (
      point &&
      (point.action === "new_page" || point.action === "enrich_existing") &&
      point.status === "published"
    ) {
      const canonicalUrl = `${siteConfig.baseUrl}${point.preferredUrl}`;
      return {
        title: point.title,
        description: point.description,
        alternates: {
          canonical: point.preferredUrl,
        },
        openGraph: {
          title: point.title,
          description: point.description,
          url: canonicalUrl,
          type: "website",
          siteName: siteConfig.businessName,
          locale: siteConfig.locale,
          images: [
            {
              url: `${siteConfig.baseUrl}${siteConfig.defaultOgImage}`,
              width: 1200,
              height: 630,
              alt: point.title,
            },
          ],
        },
        twitter: {
          card: "summary_large_image",
          title: point.title,
          description: point.description,
          images: [`${siteConfig.baseUrl}${siteConfig.defaultOgImage}`],
        },
      };
    }
  }

  // Unknown route
  return {
    title: "ไม่พบพื้นที่บริการ | WMS TRANSPORT",
    robots: { index: false, follow: false },
  };
}

export default async function AreaRouteResolver({ params }: CatchAllAreaProps) {
  const { slug } = await params;

  // Case 1: Length 1 -> Zone Hub
  if (slug.length === 1) {
    const zone = getZoneHub(slug[0]);
    if (!zone) {
      notFound();
    }
    const points = getPointsForZone(slug[0]);
    return <ZoneHubView zone={zone} localPoints={points} />;
  }

  // Case 2: Length 2 -> District Page OR Local Area Point
  if (slug.length === 2) {
    const [first, second] = slug;

    // Check Case 2A: Existing District Page
    const districtRecord = districtLandingPages[second];
    const provConfig = provinceMap[first];
    if (
      districtRecord &&
      districtRecord.province === first &&
      provConfig &&
      isDistrictPageIndexable(districtRecord)
    ) {
      return (
        <DistrictPageView
          province={first}
          district={second}
          record={districtRecord}
        />
      );
    }

    // Check Case 2B: Local Area Point
    const point = getLocalPointBySlug(first, second);
    const zone = getZoneHub(first);
    if (
      point &&
      zone &&
      (point.action === "new_page" || point.action === "enrich_existing") &&
      point.status === "published"
    ) {
      return <LocalPointView point={point} zone={zone} />;
    }
  }

  // Any other parameter combination -> real 404
  notFound();
}
