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

const THAI_MONTH_MAP: Record<string, number> = {
  "มกราคม": 1, "ม.ค.": 1,
  "กุมภาพันธ์": 2, "ก.พ.": 2,
  "มีนาคม": 3, "มี.ค.": 3,
  "เมษายน": 4, "เม.ย.": 4,
  "พฤษภาคม": 5, "พ.ค.": 5,
  "มิถุนายน": 6, "มิ.ย.": 6,
  "กรกฎาคม": 7, "ก.ค.": 7,
  "สิงหาคม": 8, "ส.ค.": 8,
  "กันยายน": 9, "ก.ย.": 9,
  "ตุลาคม": 10, "ต.ค.": 10,
  "พฤศจิกายน": 11, "พ.ย.": 11,
  "ธันวาคม": 12, "ธ.ค.": 12,
};

/**
 * Safely parse dates into standard Date objects.
 * Returns a genuine Date when a reliable significant modification date is supplied,
 * or undefined when unknown (allowing truthful omission of lastmod in the sitemap).
 */
export function parseReliableLastmod(dateStr?: string): Date | undefined {
  if (!dateStr || typeof dateStr !== "string") return undefined;
  const trimmed = dateStr.trim();
  if (!trimmed) return undefined;

  // Try ISO or standard YYYY-MM-DD
  const directDate = new Date(trimmed);
  if (!isNaN(directDate.getTime())) {
    return directDate;
  }

  // Handle Thai text dates such as "25 มิถุนายน 2026" or "15 พฤษภาคม 2569"
  for (const [monthName, monthNum] of Object.entries(THAI_MONTH_MAP)) {
    if (trimmed.includes(monthName)) {
      const dayMatch = trimmed.match(/(\d{1,2})/);
      const yearMatch = trimmed.match(/(\d{4})/);
      const day = dayMatch ? parseInt(dayMatch[1], 10) : 1;
      let year = yearMatch ? parseInt(yearMatch[1], 10) : 2026;
      if (year > 2500) {
        year -= 543;
      }
      const pad = (n: number) => String(n).padStart(2, "0");
      const isoStr = `${year}-${pad(monthNum)}-${pad(day)}T00:00:00+07:00`;
      const parsed = new Date(isoStr);
      if (!isNaN(parsed.getTime())) return parsed;
    }
  }

  return undefined;
}

/**
 * Normalizes any URL to a clean, unique absolute URL using the verified production origin.
 * Ensures percent-encoding of non-ASCII characters in Thai slugs to match canonical tags.
 */
export function normalizeCanonicalUrl(rawUrl: string, baseOrigin: string = siteConfig.productionUrl): string {
  let url = rawUrl.trim();
  if (!url.startsWith("http://") && !url.startsWith("https://")) {
    url = `${baseOrigin}${url.startsWith("/") ? "" : "/"}${url}`;
  }
  try {
    const parsed = new URL(url);
    const targetOrigin = new URL(baseOrigin);
    parsed.protocol = targetOrigin.protocol;
    parsed.host = targetOrigin.host;
    // Idempotent encodeURI for non-ASCII pathname matching canonical tags
    parsed.pathname = encodeURI(decodeURI(parsed.pathname));
    if (parsed.pathname.length > 1 && parsed.pathname.endsWith("/")) {
      parsed.pathname = parsed.pathname.slice(0, -1);
    }
    return parsed.toString();
  } catch {
    return url;
  }
}

/**
 * Independently derives the exact Set of eligible published URLs.
 * Preserves draft/evidence gates (draft districts and draft points are excluded).
 */
export function getEligiblePublishedRouteUrls(domain: string = siteConfig.productionUrl): Set<string> {
  const urls = new Set<string>();

  // 1. Guaranteed Core Routes (12)
  const corePaths = [
    '',
    '/areas',
    '/portfolio',
    '/blog',
    '/pricing',
    '/pricing/moving',
    '/pricing/motorcycle-transport',
    '/pricing/motorcycle-2026',
    '/pricing/freight',
    '/compare/pickup-vs-box-truck',
    '/compare/moving-alone-vs-helpers',
    '/compare/one-vehicle-vs-multiple-trips'
  ];
  for (const p of corePaths) {
    urls.add(normalizeCanonicalUrl(p, domain));
  }

  // 2. Province Hubs and Subservices (8 + 24 = 32)
  for (const prov of Object.keys(provinceMap || {})) {
    urls.add(normalizeCanonicalUrl(`/service/${prov}`, domain));
    for (const s of ['moving', 'motorcycle', 'freight']) {
      urls.add(normalizeCanonicalUrl(`/service/${prov}/${s}`, domain));
    }
  }

  // 3. Published Blog Articles (excludes drafts)
  for (const [slug, post] of Object.entries(posts || {})) {
    if (!post?.isDraft) {
      urls.add(normalizeCanonicalUrl(`/blog/${slug}`, domain));
    }
  }

  // 4. Approved Route Corridors (10)
  for (const { from, to } of approvedRouteCorridors) {
    if (provinceMap[from] && provinceMap[to] && from !== to) {
      urls.add(normalizeCanonicalUrl(`/route/${from}/${to}`, domain));
    }
  }

  // 5. Approved District Pages (where isDistrictPageIndexable is true; preserves 12 draft gates)
  for (const district of Object.values(districtLandingPages || {})) {
    if (isDistrictPageIndexable(district)) {
      urls.add(normalizeCanonicalUrl(`/areas/${district.province}/${district.districtSlug}`, domain));
    }
  }

  // 6. Portfolio Case Studies (5)
  for (const caseStudy of Object.values(portfolioCasesData || {})) {
    urls.add(normalizeCanonicalUrl(`/portfolio/${caseStudy.slug}`, domain));
  }

  // 7. Indexable Guides (5)
  for (const guide of Object.values(guidesData || {})) {
    if (guide.isIndexable) {
      urls.add(normalizeCanonicalUrl(`/guides/${guide.slug}`, domain));
    }
  }

  // 8. Seven Strategic Zone Hubs (7)
  for (const zone of getAllZoneHubs()) {
    urls.add(normalizeCanonicalUrl(`/areas/${zone.slug}`, domain));
  }

  // 9. Published Local Area Points (where action is new_page/enrich_existing and status is published; preserves 6 draft gates)
  for (const point of getPublishedLocalPoints()) {
    if ((point.action === 'new_page' || point.action === 'enrich_existing') && point.status === 'published') {
      urls.add(normalizeCanonicalUrl(point.preferredUrl, domain));
    }
  }

  return urls;
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const domain = siteConfig.productionUrl;
  const sitemapMap = new Map<string, MetadataRoute.Sitemap[number]>();

  type ChangeFreq = MetadataRoute.Sitemap[number]["changeFrequency"];

  const addEntry = (
    url: string,
    priority: number,
    changeFrequency?: ChangeFreq,
    rawDate?: string
  ) => {
    const cleanUrl = normalizeCanonicalUrl(url, domain);
    const lastModified = parseReliableLastmod(rawDate);
    sitemapMap.set(cleanUrl, {
      url: cleanUrl,
      ...(lastModified ? { lastModified } : {}),
      ...(changeFrequency ? { changeFrequency } : {}),
      priority,
    });
  };

  const movingPricingDate = pricingPolicyData.find((p) => p.serviceType === "moving")?.lastReviewedDate;
  const motorcyclePricingDate = pricingPolicyData.find((p) => p.serviceType === "motorcycle")?.lastReviewedDate;
  const freightPricingDate = pricingPolicyData.find((p) => p.serviceType === "freight")?.lastReviewedDate;

  // 1. Guaranteed Core Routes
  addEntry(domain, 1.0, "daily");
  addEntry(`${domain}/areas`, 0.9, "weekly");
  addEntry(`${domain}/portfolio`, 0.8, "weekly", searchIntentMap.portfolio?.lastReviewedDate);
  addEntry(`${domain}/blog`, 0.8, "weekly");
  addEntry(`${domain}/pricing`, 0.9, "weekly", movingPricingDate || searchIntentMap.pricing?.lastReviewedDate);
  addEntry(`${domain}/pricing/moving`, 0.8, "weekly", movingPricingDate);
  addEntry(`${domain}/pricing/motorcycle-transport`, 0.8, "weekly", motorcyclePricingDate);
  addEntry(`${domain}/pricing/motorcycle-2026`, 0.75, "monthly");
  addEntry(`${domain}/pricing/freight`, 0.8, "weekly", freightPricingDate);
  addEntry(`${domain}/compare/pickup-vs-box-truck`, 0.8, "monthly", searchIntentMap["compare-pickup-vs-box"]?.lastReviewedDate);
  addEntry(`${domain}/compare/moving-alone-vs-helpers`, 0.8, "monthly", searchIntentMap["compare-alone-vs-helpers"]?.lastReviewedDate);
  addEntry(`${domain}/compare/one-vehicle-vs-multiple-trips`, 0.8, "monthly", searchIntentMap["compare-one-vs-multiple"]?.lastReviewedDate);

  // 2. Dynamic Provinces & Regional Service Hubs
  const provinces = Object.keys(provinceMap || {});
  if (provinces.length === 0) {
    throw new Error("Sitemap validation failed: provinceMap is empty.");
  }
  for (const province of provinces) {
    addEntry(`${domain}/service/${province}`, 0.8, "weekly");
  }

  // 3. Dynamic Nested Service Subpages (moving, motorcycle, freight)
  const serviceIds = ["moving", "motorcycle", "freight"];
  for (const province of provinces) {
    for (const serviceId of serviceIds) {
      addEntry(`${domain}/service/${province}/${serviceId}`, 0.8, "weekly");
    }
  }

  // 4. Dynamic Blogs from posts (excludes drafts)
  const publishedBlogEntries = Object.entries(posts || {}).filter(([, p]) => !p?.isDraft);
  for (const [slug, post] of publishedBlogEntries) {
    addEntry(`${domain}/blog/${slug}`, 0.6, "monthly", post?.dateISO || post?.date);
  }

  // 5. Controlled Route-to-Route Allowlist
  const validRoutes = approvedRouteCorridors.filter(
    ({ from, to }) => provinceMap[from] && provinceMap[to] && from !== to
  );
  for (const { from, to } of validRoutes) {
    addEntry(`${domain}/route/${from}/${to}`, 0.7, "monthly");
  }

  // 6. Approved District Pages (where indexable)
  const approvedDistricts = Object.values(districtLandingPages || {}).filter(isDistrictPageIndexable);
  for (const district of approvedDistricts) {
    addEntry(
      `${domain}/areas/${district.province}/${district.districtSlug}`,
      0.85,
      "weekly",
      district.lastReviewedDate
    );
  }

  // 7. Approved Portfolio Case Studies
  for (const caseStudy of Object.values(portfolioCasesData || {})) {
    addEntry(`${domain}/portfolio/${caseStudy.slug}`, 0.7, "monthly");
  }

  // 8. Valid Guides (where indexable)
  const indexableGuides = Object.values(guidesData || {}).filter((g) => g.isIndexable);
  for (const guide of indexableGuides) {
    addEntry(`${domain}/guides/${guide.slug}`, 0.75, "monthly", guide.lastUpdated);
  }

  // 9. Seven Strategic Zone Hubs (truthful modification dates; omitted when unknown)
  const zoneHubs = getAllZoneHubs();
  if (zoneHubs.length === 0) {
    throw new Error("Sitemap validation failed: getAllZoneHubs returned 0 hubs.");
  }
  for (const zone of zoneHubs) {
    addEntry(`${domain}/areas/${zone.slug}`, 0.85, "weekly");
  }

  // 10. Detailed Published Local Area Points (truthful modification dates; omitted when unknown)
  const publishedPoints = getPublishedLocalPoints().filter(
    (p) => (p.action === "new_page" || p.action === "enrich_existing") && p.status === "published"
  );
  if (publishedPoints.length === 0) {
    throw new Error("Sitemap validation failed: getPublishedLocalPoints returned 0 published points.");
  }
  for (const point of publishedPoints) {
    addEntry(`${domain}${point.preferredUrl}`, 0.8, "weekly");
  }

  // 11. Exact Set Comparison against Independently Derived Eligible Published Routes
  const expectedUrls = getEligiblePublishedRouteUrls(domain);
  const generatedUrls = new Set(sitemapMap.keys());

  const missingUrls = [...expectedUrls].filter((u) => !generatedUrls.has(u));
  const unexpectedUrls = [...generatedUrls].filter((u) => !expectedUrls.has(u));

  if (missingUrls.length > 0 || unexpectedUrls.length > 0) {
    const errorDetails = [
      `Sitemap Exact Set Validation Failed:`,
      `Expected total: ${expectedUrls.size}, Generated: ${generatedUrls.size}`,
      missingUrls.length > 0 ? `Missing URLs (${missingUrls.length}):\n  - ${missingUrls.join("\n  - ")}` : "",
      unexpectedUrls.length > 0 ? `Unexpected URLs (${unexpectedUrls.length}):\n  - ${unexpectedUrls.join("\n  - ")}` : ""
    ].filter(Boolean).join("\n");

    throw new Error(errorDetails);
  }

  return Array.from(sitemapMap.values());
}
