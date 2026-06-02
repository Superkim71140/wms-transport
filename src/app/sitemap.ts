import { MetadataRoute } from "next";
import { provinceMap } from "./service/[province]/page";
import { posts } from "./blog/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = process.env.NEXT_PUBLIC_SITE_URL 
    ? process.env.NEXT_PUBLIC_SITE_URL 
    : process.env.VERCEL_URL 
      ? `https://${process.env.VERCEL_URL}` 
      : "https://wms-transport.vercel.app";

  // 1. Guaranteed Core Routes
  const coreRoutes: MetadataRoute.Sitemap = [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1.0,
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

    // Phuket specific nested services
    const phuketServices = ["motorcycle", "freight", "moving"];
    const phuketServiceUrls: MetadataRoute.Sitemap = phuketServices.map((service) => ({
      url: `${domain}/service/phuket/${service}`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    }));

    return [...coreRoutes, ...provinceUrls, ...blogUrls, ...phuketServiceUrls];
  } catch (error) {
    // 3. The Fail-Safe
    console.error("Sitemap generation failed for dynamic routes, returning core routes instead.", error);
    return coreRoutes;
  }
}

