import { MetadataRoute } from "next";
import { provinceMap } from "./service/[province]/page";
import { posts } from "./blog/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let domain = (process.env.NEXT_PUBLIC_SITE_URL || "https://wms-transport.com").trim();
  if (domain.endsWith("/")) {
    domain = domain.slice(0, -1);
  }

  // 1. Guaranteed Core Routes
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
    },
    {
      url: `${domain}/portfolio`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${domain}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
    {
      url: `${domain}/pricing/motorcycle-2026`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${domain}/compare/pickup-vs-box-truck`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];

  // 2. Try to inject dynamic routes safely
  try {
    // Dynamic provinces from page metadata config
    const provinces = Object.keys(provinceMap || {});
    const provinceUrls: MetadataRoute.Sitemap = provinces.map((province) => ({
      url: `${domain}/service/${province}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    // Dynamic blogs from blog posts data
    const blogSlugs = Object.keys(posts || {});
    const blogUrls: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
      url: `${domain}/blog/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.6,
    }));

    // Dynamic nested services for all provinces (moving, motorcycle, freight)
    const serviceIds = ["moving", "motorcycle", "freight"];
    const provinceServiceUrls: MetadataRoute.Sitemap = provinces.flatMap((province) =>
      serviceIds.map((serviceId) => ({
        url: `${domain}/service/${province}/${serviceId}`,
        lastModified: new Date(),
        changeFrequency: "weekly",
        priority: 0.8,
      }))
    );

    return [...coreRoutes, ...provinceUrls, ...blogUrls, ...provinceServiceUrls];
  } catch (error) {
    // 3. The Fail-Safe
    console.error("Sitemap generation failed for dynamic routes, returning core routes instead.", error);
    return coreRoutes;
  }
}

