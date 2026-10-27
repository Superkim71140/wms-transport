import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-config";
import { provinceMap } from "./(marketing)/service/[province]/page";
import { posts } from "./(marketing)/blog/posts";
import { searchIntentMap } from "@/data/searchIntentMap";
import { districtLandingPages, isDistrictPageIndexable } from "@/data/districtLandingPages";
import { getAllZoneHubs, getPublishedLocalPoints } from "@/data/areaZonesData";
import { guidesData } from "@/data/guidesData";
import { portfolioCasesData } from "@/data/mediaEvidence";
import { approvedRouteCorridors } from "@/data/approvedRouteCorridors";
import { pricingPolicyData } from "@/data/pricingPolicy";

// Fixed release date for this technical SEO deployment (Phase 4 & Local SEO Expansion)
const SEO_RELEASE_DATE = new Date("2026-09-21");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = siteConfig.productionUrl || siteConfig.baseUrl;

  // Helper to parse dates into standard Date objects safely.
  // Returns a genuine Date when a reliable significant modification date is supplied, or undefined when unknown.
  const parseReliableLastmod = (dateStr?: string): Date | undefined => {
    if (!dateStr) return undefined;
    try {
      let parsed: Date;
      if (dateStr.includes("มิถุนายน") || dateStr.includes("มิ.ย.")) {
        parsed = new Date("2026-06-25T00:00:00+07:00");
      } else if (dateStr.includes("พฤษภาคม") || dateStr.includes("พ.ค.")) {
        parsed = new Date("2026-05-20T00:00:00+07:00");
      } else {
        parsed = new Date(dateStr);
      }
      if (isNaN(parsed.getTime())) return undefined;
      return parsed;
    } catch {
      return undefined;
    }
  };

  type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

  const buildEntry = (
    url: string,
    priority: number,
    changeFrequency?: ChangeFreq,
    rawDate?: string
  ): MetadataRoute.Sitemap[number] => {
    const lastModified = parseReliableLastmod(rawDate);
    return {
      url,
      ...(lastModified ? { lastModified } : {}),
      ...(changeFrequency ? { changeFrequency } : {}),
      priority,
    };
  };

  const movingPricingDate = pricingPolicyData.find((p) => p.serviceType === "moving")?.lastReviewedDate;
  const motorcyclePricingDate = pricingPolicyData.find((p) => p.serviceType === "motorcycle")?.lastReviewedDate;
  const freightPricingDate = pricingPolicyData.find((p) => p.serviceType === "freight")?.lastReviewedDate;

  // 1. Guaranteed Core Routes
  const coreRoutes: MetadataRoute.Sitemap = [
    buildEntry(domain, 1.0, "daily"),
    buildEntry(`${domain}/areas`, 0.9, "weekly"),
    buildEntry(`${domain}/portfolio`, 0.8, "weekly", searchIntentMap.portfolio?.lastReviewedDate),
    buildEntry(`${domain}/blog`, 0.8, "weekly"),
    buildEntry(`${domain}/pricing`, 0.9, "weekly", movingPricingDate || searchIntentMap.pricing?.lastReviewedDate),
    buildEntry(`${domain}/pricing/moving`, 0.8, "weekly", movingPricingDate),
    buildEntry(`${domain}/pricing/motorcycle-transport`, 0.8, "weekly", motorcyclePricingDate),
    buildEntry(`${domain}/pricing/motorcycle-2026`, 0.75, "monthly"),
    buildEntry(`${domain}/pricing/freight`, 0.8, "weekly", freightPricingDate),
    buildEntry(`${domain}/compare/pickup-vs-box-truck`, 0.8, "monthly", searchIntentMap["compare-pickup-vs-box"]?.lastReviewedDate),
    buildEntry(`${domain}/compare/moving-alone-vs-helpers`, 0.8, "monthly", searchIntentMap["compare-alone-vs-helpers"]?.lastReviewedDate),
    buildEntry(`${domain}/compare/one-vehicle-vs-multiple-trips`, 0.8, "monthly", searchIntentMap["compare-one-vs-multiple"]?.lastReviewedDate),
  ];

  try {
    const provinces = Object.keys(provinceMap || {});

    // Dynamic provinces service hubs - lastModified omitted when unknown
    const provinceUrls: MetadataRoute.Sitemap = provinces.map((province) =>
      buildEntry(`${domain}/service/${province}`, 0.8, "weekly")
    );

    // Dynamic blogs from posts - uses authentic per-post publication/modification dateISO
    const blogSlugs = Object.keys(posts || {});
    const blogUrls: MetadataRoute.Sitemap = blogSlugs.map((slug) =>
      buildEntry(`${domain}/blog/${slug}`, 0.6, "monthly", posts[slug]?.dateISO)
    );

    // Dynamic nested service subpages (moving, motorcycle, freight) - lastModified omitted when unknown
    const serviceIds = ["moving", "motorcycle", "freight"];
    const provinceServiceUrls: MetadataRoute.Sitemap = provinces.flatMap((province) =>
      serviceIds.map((serviceId) =>
        buildEntry(`${domain}/service/${province}/${serviceId}`, 0.8, "weekly")
      )
    );

    // Controlled Route-to-Route Allowlist from approvedRouteCorridors - lastModified omitted when unknown
    const routeUrls: MetadataRoute.Sitemap = approvedRouteCorridors
      .filter(({ from, to }) => provinceMap[from] && provinceMap[to] && from !== to)
      .map(({ from, to }) =>
        buildEntry(`${domain}/route/${from}/${to}`, 0.7, "monthly")
      );

    // Approved District Pages (where indexable) - uses per-district verified lastReviewedDate
    const approvedDistrictUrls: MetadataRoute.Sitemap = Object.values(districtLandingPages)
      .filter(isDistrictPageIndexable)
      .map((district) =>
        buildEntry(
          `${domain}/areas/${district.province}/${district.districtSlug}`,
          0.85,
          "weekly",
          district.lastReviewedDate
        )
      );

    // Approved Portfolio Case Studies - lastModified omitted when unknown
    const approvedPortfolioUrls: MetadataRoute.Sitemap = Object.values(portfolioCasesData).map(
      (caseStudy) => buildEntry(`${domain}/portfolio/${caseStudy.slug}`, 0.7, "monthly")
    );

    // Valid Guides (where marked indexable) - uses authentic guide lastUpdated date
    const validGuidesUrls: MetadataRoute.Sitemap = Object.values(guidesData)
      .filter((g) => g.isIndexable)
      .map((guide) =>
        buildEntry(`${domain}/guides/${guide.slug}`, 0.75, "monthly", guide.lastUpdated)
      );

    // 7 Strategic Zone Hubs
    const zoneHubUrls: MetadataRoute.Sitemap = getAllZoneHubs().map((zone) => ({
      url: `${domain}/areas/${zone.slug}`,
      lastModified: SEO_RELEASE_DATE,
      changeFrequency: "weekly",
      priority: 0.85,
    }));

    // Detailed Local Area Points (where action === 'new_page' or 'enrich_existing' and status === 'published')
    const publishedLocalPointUrls: MetadataRoute.Sitemap = getPublishedLocalPoints()
      .filter((p) => p.action === "new_page" || p.action === "enrich_existing")
      .map((point) => ({
        url: `${domain}${point.preferredUrl}`,
        lastModified: SEO_RELEASE_DATE,
        changeFrequency: "weekly",
        priority: 0.8,
      }));

    return [
      ...coreRoutes,
      ...zoneHubUrls,
      ...publishedLocalPointUrls,
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
