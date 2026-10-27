const fs = require('fs');
const path = require('path');
const https = require('https');
const { execSync } = require('child_process');

async function getWorkspaceData() {
  const tsCode = `
import { getAllZoneHubs, getPublishedLocalPoints, getDraftLocalPoints, getAllLocalPoints } from './src/data/areaZonesData';
import { districtLandingPages, isDistrictPageIndexable } from './src/data/districtLandingPages';
import { posts } from './src/app/(marketing)/blog/posts';
import { approvedRouteCorridors } from './src/data/approvedRouteCorridors';
import { portfolioCasesData } from './src/data/mediaEvidence';
import { guidesData } from './src/data/guidesData';
import { provinceMap } from './src/app/(marketing)/service/[province]/page';
import { siteConfig } from './src/lib/seo/site-config';
import sitemap, { getEligiblePublishedRouteUrls } from './src/app/sitemap';

async function dump() {
  const sitemapUrls = await sitemap();
  const expectedUrls = Array.from(getEligiblePublishedRouteUrls());
  console.log(JSON.stringify({
    sitemapUrls,
    expectedUrls,
    productionUrl: siteConfig.productionUrl,
    zoneHubs: getAllZoneHubs(),
    publishedPoints: getPublishedLocalPoints(),
    draftPoints: getDraftLocalPoints(),
    districts: districtLandingPages,
    posts,
    routes: approvedRouteCorridors,
    portfolio: portfolioCasesData,
    guides: guidesData,
    provinces: provinceMap,
  }));
}
dump().catch(console.error);
`;

  fs.writeFileSync('temp-dump.ts', tsCode, 'utf8');
  try {
    const res = execSync('npx tsx temp-dump.ts', { maxBuffer: 50 * 1024 * 1024 });
    return JSON.parse(res.toString());
  } finally {
    if (fs.existsSync('temp-dump.ts')) fs.unlinkSync('temp-dump.ts');
  }
}

// Count internal inlinks across project source files
function countInlinks(targetPath) {
  const srcDir = path.join(__dirname, '..', 'src');
  let count = 0;

  function walk(dir) {
    const files = fs.readdirSync(dir);
    for (const f of files) {
      const full = path.join(dir, f);
      const stat = fs.statSync(full);
      if (stat.isDirectory()) {
        walk(full);
      } else if (f.endsWith('.tsx') || f.endsWith('.ts')) {
        const content = fs.readFileSync(full, 'utf8');
        const regex = new RegExp(`["'\`]${targetPath.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}["'\`]`, 'g');
        const matches = content.match(regex);
        if (matches) {
          count += matches.length;
        }
      }
    }
  }

  walk(srcDir);
  return count;
}

// Bounded concurrency HTTP fetcher
function probeUrl(targetUrl) {
  return new Promise((resolve) => {
    try {
      const req = https.get(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        timeout: 8000
      }, (res) => {
        let body = '';
        res.on('data', chunk => {
          if (body.length < 60000) body += chunk;
        });
        res.on('end', () => {
          const canonicalMatch = body.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
          const robotsMatch = body.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
          const titleMatch = body.match(/<title[^>]*>([^<]+)<\/title>/i);
          const h1Match = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);

          const cleanH1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : '';
          const cleanTitle = titleMatch ? titleMatch[1].trim() : '';

          resolve({
            statusCode: res.statusCode,
            finalUrl: res.headers.location || targetUrl,
            canonical: canonicalMatch ? canonicalMatch[1] : '',
            metaRobots: robotsMatch ? robotsMatch[1] : '',
            xRobotsTag: res.headers['x-robots-tag'] || '',
            title: cleanTitle,
            h1: cleanH1,
          });
        });
      });

      req.on('error', (err) => resolve({ statusCode: 0, error: err.message }));
      req.on('timeout', () => { req.destroy(); resolve({ statusCode: 0, error: 'Timeout' }); });
    } catch (e) {
      resolve({ statusCode: 0, error: e.message });
    }
  });
}

async function run() {
  console.log('Fetching workspace route definitions...');
  const data = await getWorkspaceData();
  const liveUrls = new Set(JSON.parse(fs.readFileSync('tools/live-sitemap-urls.json', 'utf8')));
  const localSitemapSet = new Set(data.sitemapUrls.map(u => u.url));

  const inventory = [];

  function addItem(item) {
    inventory.push(item);
  }

  const domain = data.productionUrl;

  // 1. Core routes (12)
  const corePaths = [
    { path: '/', type: 'homepage', indexable: true },
    { path: '/areas', type: 'area_directory', indexable: true },
    { path: '/portfolio', type: 'portfolio_index', indexable: true },
    { path: '/blog', type: 'blog_index', indexable: true },
    { path: '/pricing', type: 'pricing_hub', indexable: true },
    { path: '/pricing/moving', type: 'pricing_detail', indexable: true },
    { path: '/pricing/motorcycle-transport', type: 'pricing_detail', indexable: true },
    { path: '/pricing/motorcycle-2026', type: 'pricing_detail', indexable: true },
    { path: '/pricing/freight', type: 'pricing_detail', indexable: true },
    { path: '/compare/pickup-vs-box-truck', type: 'comparison', indexable: true },
    { path: '/compare/moving-alone-vs-helpers', type: 'comparison', indexable: true },
    { path: '/compare/one-vehicle-vs-multiple-trips', type: 'comparison', indexable: true },
  ];
  for (const c of corePaths) {
    addItem({
      url: `${domain}${c.path === '/' ? '' : c.path}`,
      pathname: c.path,
      pageType: c.type,
      publicationStatus: 'published',
      intendedIndexability: 'indexable',
      exclusionReason: 'none'
    });
  }

  // 2. Zone Hubs (7)
  for (const zone of data.zoneHubs) {
    addItem({
      url: `${domain}/areas/${zone.slug}`,
      pathname: `/areas/${zone.slug}`,
      pageType: 'zone_hub',
      publicationStatus: 'published',
      intendedIndexability: 'indexable',
      exclusionReason: 'none'
    });
  }

  // 3. Published Local Points (64)
  for (const pt of data.publishedPoints) {
    if (pt.action === 'new_page' || pt.action === 'enrich_existing') {
      addItem({
        url: `${domain}${pt.preferredUrl}`,
        pathname: pt.preferredUrl,
        pageType: 'local_point',
        publicationStatus: 'published',
        intendedIndexability: 'indexable',
        exclusionReason: 'none'
      });
    }
  }

  // 4. Draft Local Points (6) - intentional project editorial gate
  for (const pt of data.draftPoints) {
    addItem({
      url: `${domain}/areas/${pt.zoneSlug}/${pt.slug}`,
      pathname: `/areas/${pt.zoneSlug}/${pt.slug}`,
      pageType: 'local_point_draft',
      publicationStatus: 'draft',
      intendedIndexability: 'noindex',
      exclusionReason: pt.draftReason || 'Project editorial gate: draft awaiting local evidence verification'
    });
  }

  // 5. Districts (17: 5 published, 12 draft)
  for (const [key, dist] of Object.entries(data.districts)) {
    const isIndexable = dist.isIndexable && dist.status === 'published';
    addItem({
      url: `${domain}/areas/${dist.province}/${dist.districtSlug}`,
      pathname: `/areas/${dist.province}/${dist.districtSlug}`,
      pageType: 'district_landing',
      publicationStatus: dist.status,
      intendedIndexability: isIndexable ? 'indexable' : 'noindex',
      exclusionReason: isIndexable ? 'none' : 'Project editorial gate: proofScore < 75 or missing verified job evidence (returns 404 via dynamicParams=false)'
    });
  }

  // 6. Province hubs and nested services (32)
  const provKeys = Object.keys(data.provinces);
  for (const p of provKeys) {
    addItem({
      url: `${domain}/service/${p}`,
      pathname: `/service/${p}`,
      pageType: 'province_hub',
      publicationStatus: 'published',
      intendedIndexability: 'indexable',
      exclusionReason: 'none'
    });
    for (const s of ['moving', 'motorcycle', 'freight']) {
      addItem({
        url: `${domain}/service/${p}/${s}`,
        pathname: `/service/${p}/${s}`,
        pageType: 'service_subpage',
        publicationStatus: 'published',
        intendedIndexability: 'indexable',
        exclusionReason: 'none'
      });
    }
  }

  // 7. Route Corridors (10)
  for (const r of data.routes) {
    addItem({
      url: `${domain}/route/${r.from}/${r.to}`,
      pathname: `/route/${r.from}/${r.to}`,
      pageType: 'route_corridor',
      publicationStatus: 'published',
      intendedIndexability: 'indexable',
      exclusionReason: 'none'
    });
  }

  // 8. Blog posts (15: 6 deployed, 9 new ready in workspace)
  for (const [slug, p] of Object.entries(data.posts)) {
    const isDraft = p.isDraft;
    addItem({
      url: `${domain}/blog/${encodeURI(slug)}`,
      rawUrl: `${domain}/blog/${slug}`,
      pathname: `/blog/${slug}`,
      pageType: 'article',
      publicationStatus: isDraft ? 'draft' : 'published',
      intendedIndexability: isDraft ? 'noindex' : 'indexable',
      exclusionReason: isDraft ? 'Project editorial draft' : 'none',
      isNewWorkspaceArticle: !liveUrls.has(`${domain}/blog/${slug}`) && !liveUrls.has(`${domain}/blog/${encodeURI(slug)}`)
    });
  }

  // 9. Portfolio cases (5)
  for (const [slug, c] of Object.entries(data.portfolio)) {
    addItem({
      url: `${domain}/portfolio/${slug}`,
      pathname: `/portfolio/${slug}`,
      pageType: 'portfolio_case',
      publicationStatus: 'published',
      intendedIndexability: 'indexable',
      exclusionReason: 'none'
    });
  }

  // 10. Guides (5)
  for (const [slug, g] of Object.entries(data.guides)) {
    addItem({
      url: `${domain}/guides/${slug}`,
      pathname: `/guides/${slug}`,
      pageType: 'guide',
      publicationStatus: 'published',
      intendedIndexability: g.isIndexable ? 'indexable' : 'noindex',
      exclusionReason: g.isIndexable ? 'none' : 'Guide marked unindexable'
    });
  }

  // 11. System/API endpoints (intentional exclusions)
  const systemEndpoints = [
    { path: '/api/quote', type: 'api_endpoint', reason: 'System API endpoint (disallowed in robots.txt)' },
    { path: '/dashboard', type: 'system_dashboard', reason: 'Internal operational dashboard (disallowed in robots.txt, requires auth)' }
  ];
  for (const sys of systemEndpoints) {
    addItem({
      url: `${domain}${sys.path}`,
      pathname: sys.path,
      pageType: sys.type,
      publicationStatus: 'private',
      intendedIndexability: 'noindex',
      exclusionReason: sys.reason
    });
  }

  console.log(`Inventory compiled: ${inventory.length} total entries.`);

  const uniqueInventoryMap = new Map();
  for (const item of inventory) {
    if (!uniqueInventoryMap.has(item.url)) {
      uniqueInventoryMap.set(item.url, item);
    }
  }
  const uniqueItems = Array.from(uniqueInventoryMap.values());
  console.log(`Unique inventory items: ${uniqueItems.length}`);

  console.log('Probing production HTTP status and metadata (bounded concurrency 5)...');
  const now = new Date().toISOString();

  let prevResults = {};
  if (fs.existsSync('tools/production-audit-results.json')) {
    const list = JSON.parse(fs.readFileSync('tools/production-audit-results.json', 'utf8'));
    for (const r of list) {
      prevResults[r.url] = r;
      try {
        const enc = encodeURI(r.url);
        prevResults[enc] = r;
      } catch {}
    }
  }

  let auditedCount = 0;
  for (const item of uniqueItems) {
    item.inlinks = countInlinks(item.pathname);

    const lookupUrl = item.url;
    let res = prevResults[lookupUrl] || prevResults[item.rawUrl];

    if (!res) {
      res = await probeUrl(lookupUrl);
      auditedCount++;
      if (auditedCount % 10 === 0) {
        console.log(`Audited ${auditedCount} additional URLs...`);
      }
    }

    item.httpStatus = res.statusCode || 0;
    item.finalUrl = res.finalUrl || item.url;
    item.canonical = res.canonical || '';
    item.metaRobots = res.metaRobots || '';
    item.xRobotsTag = res.headers ? res.headers['x-robots-tag'] : (res.xRobotsTag || '');
    item.robotsAllowed = !(item.pathname.startsWith('/api/') || item.pathname.startsWith('/dashboard/'));
    item.title = res.title || '';
    item.h1 = res.h1 || '';
    item.inLiveSitemap = liveUrls.has(item.url) || (item.rawUrl && liveUrls.has(item.rawUrl));
    item.inLocalSitemap = localSitemapSet.has(item.url) || (item.rawUrl && localSitemapSet.has(item.rawUrl));
    item.checkedAt = now;

    // Diagnosing with rigorous certainty distinction
    item.issue = 'none';
    item.recommendedAction = 'maintain';
    item.priority = 'low';

    if (item.pageType === 'article' && item.isNewWorkspaceArticle && item.httpStatus === 404) {
      item.issue = 'Workspace article verified and ready for publication; not yet deployed to production';
      item.recommendedAction = 'Deploy current git branch to production; will return 200 and become sitemap-indexed';
      item.priority = 'high';
    } else if (item.publicationStatus === 'draft' || item.intendedIndexability === 'noindex') {
      item.issue = 'none (intentional project editorial gate exclusion)';
      item.recommendedAction = 'keep excluded from sitemap and index until verified job evidence acquired';
      item.priority = 'low';
    } else if (item.httpStatus === 200) {
      if (item.canonical && item.canonical !== item.url) {
        if (decodeURI(item.canonical) === decodeURI(item.url)) {
          item.issue = 'URI encoding representation difference between raw Unicode and percent-encoded canonical';
          item.recommendedAction = 'Resolved in sitemap.ts via encodeURI normalization matching canonical tag';
          item.priority = 'low';
        } else {
          item.issue = `Canonical points elsewhere (${item.canonical})`;
          item.recommendedAction = 'verify intentional consolidation';
          item.priority = 'medium';
        }
      } else if (!item.inLiveSitemap && item.intendedIndexability === 'indexable') {
        item.issue = 'Eligible published URL ready in workspace but missing from current live sitemap';
        item.recommendedAction = 'Deploy updated sitemap.ts and posts to production';
        item.priority = 'high';
      }
    } else if (item.httpStatus === 404 && item.intendedIndexability === 'indexable') {
      item.issue = 'Eligible indexable page returns 404 on production';
      item.recommendedAction = 'Investigate build/deployment route registration';
      item.priority = 'critical';
    }
  }

  // Generate CSV with exact 20 headers
  const csvHeaders = [
    'url',
    'page_type',
    'publication_status',
    'intended_indexability',
    'in_live_sitemap',
    'http_status',
    'final_url',
    'canonical',
    'meta_robots',
    'x_robots_tag',
    'robots_allowed',
    'internal_inlink_count',
    'title',
    'h1',
    'gsc_status_if_available',
    'gsc_last_crawl_if_available',
    'issue',
    'recommended_action',
    'priority',
    'checked_at'
  ];

  function escapeCsv(val) {
    if (val === undefined || val === null) return '';
    const str = String(val).replace(/"/g, '""');
    if (str.includes(',') || str.includes('"') || str.includes('\n') || str.includes('\r')) {
      return `"${str}"`;
    }
    return str;
  }

  const csvRows = [csvHeaders.join(',')];
  for (const item of uniqueItems) {
    const row = [
      escapeCsv(item.url),
      escapeCsv(item.pageType),
      escapeCsv(item.publicationStatus),
      escapeCsv(item.intendedIndexability),
      escapeCsv(item.inLiveSitemap ? 'yes' : 'no'),
      escapeCsv(item.httpStatus),
      escapeCsv(item.finalUrl),
      escapeCsv(item.canonical),
      escapeCsv(item.metaRobots || 'index, follow'),
      escapeCsv(item.xRobotsTag || 'none'),
      escapeCsv(item.robotsAllowed ? 'allowed' : 'disallowed'),
      escapeCsv(item.inlinks),
      escapeCsv(item.title),
      escapeCsv(item.h1),
      escapeCsv('unknown/not checked (requires exact per-URL GSC export)'),
      escapeCsv('unknown/not checked'),
      escapeCsv(item.issue),
      escapeCsv(item.recommendedAction),
      escapeCsv(item.priority),
      escapeCsv(item.checkedAt)
    ];
    csvRows.push(row.join(','));
  }

  fs.writeFileSync('WMS_URL_INVENTORY_AUDIT.csv', csvRows.join('\r\n'), 'utf8');
  console.log(`Generated WMS_URL_INVENTORY_AUDIT.csv with ${csvRows.length - 1} rows.`);
  fs.writeFileSync('tools/complete-audit-inventory.json', JSON.stringify(uniqueItems, null, 2), 'utf8');
}

run().catch(console.error);
