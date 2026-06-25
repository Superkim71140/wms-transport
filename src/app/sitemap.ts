import { MetadataRoute } from "next";
import { provinceMap } from "./(marketing)/service/[province]/page";
import { posts } from "./(marketing)/blog/posts";
import { searchIntentMap } from "@/data/searchIntentMap";
import { districtLandingPages, isDistrictPageIndexable } from "@/data/districtLandingPages";
import { guidesData } from "@/data/guidesData";
import { portfolioCasesData } from "@/data/mediaEvidence";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let domain = (process.env.NEXT_PUBLIC_SITE_URL || "https://wms-transport.com").trim();
  if (domain.endsWith("/")) {
    domain = domain.slice(0, -1);
  }

  // Helper to parse Thai/English dates into standard Date objects safely
  const parseLastmodDate = (dateStr: string): Date => {
    try {
      if (!dateStr) return new Date("2026-06-25");
      // Handle Thai dates like "25 มิถุนายน 2026"
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

    // Dynamic Route-to-Route pages
    const routeHubs = [
      "bangkok",
      "phuket",
      "samutsakhon",
      "samut-songkhram",
      "chiang-mai",
      "chonburi",
      "nonthaburi",
      "pathum-thani",
      "bkk-thonburi",
      "bkk-phra-nakhon",
    ];
    const routeUrls: MetadataRoute.Sitemap = routeHubs.flatMap((from) =>
      routeHubs
        .filter((to) => to !== from)
        .map((to) => ({
          url: `${domain}/route/${from}/${to}`,
          lastModified: new Date("2026-06-25"),
          changeFrequency: "monthly",
          priority: 0.7,
        }))
    );

    // ─────────────────────────────────────────────
    // Phase 2: Indexation Gate checks
    // ─────────────────────────────────────────────

    // 1. Approved District Pages (where indexable)
    const approvedDistrictUrls: MetadataRoute.Sitemap = Object.values(districtLandingPages)
      .filter(isDistrictPageIndexable)
      .map((district) => ({
        url: `${domain}/areas/${district.province}/${district.districtSlug}`,
        lastModified: parseLastmodDate(district.lastReviewedDate),
        changeFrequency: "weekly",
        priority: 0.85,
      }));

    // 2. Approved Portfolio Case Studies
    const approvedPortfolioUrls: MetadataRoute.Sitemap = Object.values(portfolioCasesData).map((caseStudy) => ({
      url: `${domain}/portfolio/${caseStudy.slug}`,
      lastModified: new Date("2026-06-25"),
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    // 3. Valid Guides (where marked indexable)
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
