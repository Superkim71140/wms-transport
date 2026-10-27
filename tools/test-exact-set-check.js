const { execSync } = require('child_process');
const fs = require('fs');

const tsCode = `
import { siteConfig } from './src/lib/seo/site-config';
import { provinceMap } from './src/app/(marketing)/service/[province]/page';
import { posts } from './src/app/(marketing)/blog/posts';
import { districtLandingPages, isDistrictPageIndexable } from './src/data/districtLandingPages';
import { getAllZoneHubs, getPublishedLocalPoints } from './src/data/areaZonesData';
import { guidesData } from './src/data/guidesData';
import { portfolioCasesData } from './src/data/mediaEvidence';
import { approvedRouteCorridors } from './src/data/approvedRouteCorridors';
import { normalizeCanonicalUrl } from './src/app/sitemap';

export function getEligiblePublishedRouteUrls(domain: string = siteConfig.productionUrl): Set<string> {
  const urls = new Set<string>();

  // 1. Core Routes (12)
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

  // 2. Province hubs (8)
  for (const prov of Object.keys(provinceMap || {})) {
    urls.add(normalizeCanonicalUrl('/service/' + prov, domain));
    // Nested services (24)
    for (const s of ['moving', 'motorcycle', 'freight']) {
      urls.add(normalizeCanonicalUrl('/service/' + prov + '/' + s, domain));
    }
  }

  // 3. Published blog articles (15)
  for (const [slug, post] of Object.entries(posts || {})) {
    if (!post?.isDraft) {
      urls.add(normalizeCanonicalUrl('/blog/' + slug, domain));
    }
  }

  // 4. Approved route corridors (10)
  for (const { from, to } of approvedRouteCorridors) {
    if (provinceMap[from] && provinceMap[to] && from !== to) {
      urls.add(normalizeCanonicalUrl('/route/' + from + '/' + to, domain));
    }
  }

  // 5. Approved district pages (5)
  for (const district of Object.values(districtLandingPages || {})) {
    if (isDistrictPageIndexable(district)) {
      urls.add(normalizeCanonicalUrl('/areas/' + district.province + '/' + district.districtSlug, domain));
    }
  }

  // 6. Portfolio cases (5)
  for (const caseStudy of Object.values(portfolioCasesData || {})) {
    urls.add(normalizeCanonicalUrl('/portfolio/' + caseStudy.slug, domain));
  }

  // 7. Indexable guides (5)
  for (const guide of Object.values(guidesData || {})) {
    if (guide.isIndexable) {
      urls.add(normalizeCanonicalUrl('/guides/' + guide.slug, domain));
    }
  }

  // 8. 7 Zone Hubs (7)
  for (const zone of getAllZoneHubs()) {
    urls.add(normalizeCanonicalUrl('/areas/' + zone.slug, domain));
  }

  // 9. Published Local Area Points (64)
  for (const point of getPublishedLocalPoints()) {
    if ((point.action === 'new_page' || point.action === 'enrich_existing') && point.status === 'published') {
      urls.add(normalizeCanonicalUrl(point.preferredUrl, domain));
    }
  }

  return urls;
}

// Compare against sitemap()
import sitemap from './src/app/sitemap';

async function test() {
  const generated = await sitemap();
  const generatedUrls = new Set(generated.map(u => u.url));
  const expectedUrls = getEligiblePublishedRouteUrls();

  console.log('Expected URLs count:', expectedUrls.size);
  console.log('Generated URLs count:', generatedUrls.size);

  const missing = [...expectedUrls].filter(u => !generatedUrls.has(u));
  const unexpected = [...generatedUrls].filter(u => !expectedUrls.has(u));

  console.log('Missing count:', missing.length);
  if (missing.length) console.log('Missing:', missing);

  console.log('Unexpected count:', unexpected.length);
  if (unexpected.length) console.log('Unexpected:', unexpected);
}

test().catch(console.error);
`;

fs.writeFileSync('temp-set-test.ts', tsCode, 'utf8');
try {
  const res = execSync('npx tsx temp-set-test.ts').toString();
  console.log(res);
} finally {
  if (fs.existsSync('temp-set-test.ts')) fs.unlinkSync('temp-set-test.ts');
}
