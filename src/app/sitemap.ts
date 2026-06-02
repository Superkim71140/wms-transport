import { MetadataRoute } from "next";
import { provinceMap } from "./service/[province]/page";
import { posts } from "./blog/posts";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = "https://wmstransport.com";

  // Dynamic provinces from page metadata config
  const provinces = Object.keys(provinceMap);
  const provinceUrls = provinces.map((province) => ({
    url: `${domain}/service/${province}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Dynamic blogs from blog posts data
  const blogSlugs = Object.keys(posts);
  const blogUrls = blogSlugs.map((slug) => ({
    url: `${domain}/blog/${slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  // Phuket specific nested services
  const phuketServices = ["motorcycle", "freight", "moving"];
  const phuketServiceUrls = phuketServices.map((service) => ({
    url: `${domain}/service/phuket/${service}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  // Commercial intent pages
  const staticIntentUrls = [
    {
      url: `${domain}/compare/pickup-vs-box-truck`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    },
    {
      url: `${domain}/pricing/motorcycle-2026`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.9,
    },
  ];

  return [
    {
      url: domain,
      lastModified: new Date(),
      changeFrequency: "daily" as const,
      priority: 1.0,
    },
    {
      url: `${domain}/blog`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.7,
    },
    ...provinceUrls,
    ...blogUrls,
    ...phuketServiceUrls,
    ...staticIntentUrls,
  ];
}
