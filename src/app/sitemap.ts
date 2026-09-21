import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/seo/site-config";
import { provinceMap } from "./(marketing)/service/[province]/page";
import { posts } from "./(marketing)/blog/posts";
import { searchIntentMap } from "@/data/searchIntentMap";
import { districtLandingPages, isDistrictPageIndexable } from "@/data/districtLandingPages";
import { guidesData } from "@/data/guidesData";
import { portfolioCasesData } from "@/data/mediaEvidence";
import { approvedRouteCorridors } from "@/data/approvedRouteCorridors";

// Fixed release date for this technical SEO deployment (Phase 4)
const SEO_RELEASE_DATE = new Date("2026-09-21");

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = siteConfig.baseUrl;

  // Helper to parse dates into standard Date objects safely, respecting truthful release and review dates
  const parseTruthfulLastmod = (dateStr?: string): Date => {
    if (!dateStr) return SEO_RELEASE_DATE;
    try {
      let parsed: Date;
      if (dateStr.includes("มิถุนายน")) {
        parsed = new Date("2026-06-25");
      } else {
        parsed = new Date(dateStr);
      }
      if (isNaN(parsed.getTime())) return SEO_RELEASE_DATE;
      // Do not assign a date later than the actual release date
      if (parsed > SEO_RELEASE_DATE) return SEO_RELEASE_DATE;
      // Because root Entity Graph rendered output changed across all public routes in this release,
      // use the later truthful date when both a content review date and release date apply.
      return SEO_RELEASE_DATE > parsed ? SEO_RELEASE_DATE : parsed;
    } catch {
      return SEO_RELEASE_DATE;
    }
  };

  // 1. Guaranteed Core Routes
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: domain,
      lastModified: SEO_RELEASE_DATE,
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${domain}/portfolio`,
      lastModified: parseTruthfulLastmod(searchIntentMap.portfolio?.lastReviewedDate),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${domain}/blog`,
      lastModified: SEO_RELEASE_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${domain}/pricing`,
      lastModified: parseTruthfulLastmod(searchIntentMap.pricing?.lastReviewedDate),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${domain}/pricing/moving`,
      lastModified: parseTruthfulLastmod(searchIntentMap["pricing-moving"]?.lastReviewedDate),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${domain}/pricing/motorcycle-transport`,
      lastModified: parseTruthfulLastmod(searchIntentMap["pricing-motorcycle"]?.lastReviewedDate),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${domain}/pricing/motorcycle-2026`,
      lastModified: SEO_RELEASE_DATE,
      changeFrequency: "monthly",
      priority: 0.75,
    },
    {
      url: `${domain}/pricing/freight`,
      lastModified: parseTruthfulLastmod(searchIntentMap["pricing-freight"]?.lastReviewedDate),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${domain}/compare/pickup-vs-box-truck`,
      lastModified: parseTruthfulLastmod(searchIntentMap["compare-pickup-vs-box"]?.lastReviewedDate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${domain}/compare/moving-alone-vs-helpers`,
      lastModified: parseTruthfulLastmod(searchIntentMap["compare-alone-vs-helpers"]?.lastReviewedDate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${domain}/compare/one-vehicle-vs-multiple-trips`,
      lastModified: parseTruthfulLastmod(searchIntentMap["compare-one-vs-multiple"]?.lastReviewedDate),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  try {
    const provinces = Object.keys(provinceMap || {});
    
    // Dynamic provinces service hubs
    const provinceUrls: MetadataRoute.Sitemap = provinces.map((province) => ({
      url: `${domain}/service/${province}`,
      lastModified: SEO_RELEASE_DATE,
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Dynamic blogs from posts
    const blogSlugs = Object.keys(posts || {});
    const blogUrls: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
      url: `${domain}/blog/${slug}`,
      lastModified: parseTruthfulLastmod(posts[slug]?.dateISO),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    // Dynamic nested service subpages (moving, motorcycle, freight)
    const serviceIds = ["moving", "motorcycle", "freight"];
    const provinceServiceUrls: MetadataRoute.Sitemap = provinces.flatMap((province) =>
      serviceIds.map((serviceId) => ({
        url: `${domain}/service/${province}/${serviceId}`,
        lastModified: SEO_RELEASE_DATE,
        changeFrequency: "weekly",
        priority: 0.8,
      }))
    );

    // Controlled Route-to-Route Allowlist from approvedRouteCorridors
    const routeUrls: MetadataRoute.Sitemap = approvedRouteCorridors
      .filter(({ from, to }) => provinceMap[from] && provinceMap[to] && from !== to)
      .map(({ from, to }) => ({
        url: `${domain}/route/${from}/${to}`,
        lastModified: SEO_RELEASE_DATE,
        changeFrequency: "monthly",
        priority: 0.7,
      }));

    // Approved District Pages (where indexable)
    const approvedDistrictUrls: MetadataRoute.Sitemap = Object.values(districtLandingPages)
      .filter(isDistrictPageIndexable)
      .map((district) => ({
        url: `${domain}/areas/${district.province}/${district.districtSlug}`,
        lastModified: parseTruthfulLastmod(district.lastReviewedDate),
        changeFrequency: "weekly",
        priority: 0.85,
      }));

    // Approved Portfolio Case Studies
    const approvedPortfolioUrls: MetadataRoute.Sitemap = Object.values(portfolioCasesData).map((caseStudy) => ({
      url: `${domain}/portfolio/${caseStudy.slug}`,
      lastModified: SEO_RELEASE_DATE,
      changeFrequency: "monthly",
      priority: 0.7,
    }));

    // Valid Guides (where marked indexable)
    const validGuidesUrls: MetadataRoute.Sitemap = Object.values(guidesData)
      .filter((g) => g.isIndexable)
      .map((guide) => ({
        url: `${domain}/guides/${guide.slug}`,
        lastModified: parseTruthfulLastmod(guide.lastUpdated),
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
