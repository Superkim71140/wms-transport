const https = require('https');
const fs = require('fs');

const localSitemap = JSON.parse(fs.readFileSync('tools/local-sitemap-urls.json', 'utf8'));
const allPublishedPaths = new Set(localSitemap.map(u => new URL(u.url).pathname));

// Seed pages to crawl
const seedPages = [
  '/',
  '/areas',
  '/blog',
  '/portfolio',
  '/pricing',
  '/pricing/moving',
  '/pricing/motorcycle-transport',
  '/pricing/motorcycle-2026',
  '/pricing/freight',
  '/compare/pickup-vs-box-truck',
  '/compare/moving-alone-vs-helpers',
  '/compare/one-vehicle-vs-multiple-trips',
  '/service/samutsakhon',
  '/service/bkk-thonburi',
  '/service/bangkok',
  '/service/bkk-phra-nakhon',
  '/service/samut-songkhram',
  '/service/chonburi',
  '/service/phuket',
  '/service/chiang-mai',
  '/areas/maha-chai',
  '/areas/krathumbaen-omnoi',
  '/areas/rama2-bangkradi',
  '/areas/bangbon-ekachai',
  '/areas/nongkhaem-phetkasem81',
  '/areas/bang-khae',
  '/areas/phutthamonthon-sai-1-4',
  '/areas/samutsakhon/maha-chai',
  '/areas/bkk-thonburi/bang-khae',
  '/areas/bkk-thonburi/nong-khaem',
  '/areas/bkk-thonburi/bang-bon',
  '/areas/bkk-thonburi/pinklao',
  '/guides/truck-capacity-cbm'
];

function fetchHtml(pathname) {
  return new Promise((resolve) => {
    https.get('https://wms-transport.com' + pathname, (res) => {
      let data = '';
      res.on('data', chunk => { data += chunk; });
      res.on('end', () => resolve({ pathname, status: res.statusCode, html: data }));
    }).on('error', () => resolve({ pathname, status: 0, html: '' }));
  });
}

async function run() {
  console.log(`Fetching ${seedPages.length} hub pages from production...`);
  const inlinks = {};
  for (const p of allPublishedPaths) {
    inlinks[p] = new Set();
  }

  for (const seed of seedPages) {
    const res = await fetchHtml(seed);
    if (res.status !== 200) {
      console.log(`Failed to fetch ${seed}: status ${res.status}`);
      continue;
    }
    // Extract hrefs
    const hrefMatches = [...res.html.matchAll(/href=["'](\/[^"'#?]*)["']/g)].map(m => m[1]);
    for (let href of hrefMatches) {
      if (href.length > 1 && href.endsWith('/')) href = href.slice(0, -1);
      // Decoded
      try { href = decodeURI(href); } catch {}
      if (inlinks[href]) {
        inlinks[href].add(seed);
      }
    }
  }

  const orphans = [];
  const oneLink = [];
  const multiLink = [];

  for (const [pathname, sources] of Object.entries(inlinks)) {
    if (sources.size === 0) {
      orphans.push(pathname);
    } else if (sources.size === 1) {
      oneLink.push({ pathname, source: [...sources][0] });
    } else {
      multiLink.push({ pathname, count: sources.size });
    }
  }

  console.log('\n=== REAL PRODUCTION CRAWL RESULTS (from seed hubs) ===');
  console.log(`Total published paths audited: ${allPublishedPaths.size}`);
  console.log(`Orphans (0 inlinks from any seed hub): ${orphans.length}`);
  orphans.forEach(o => console.log('  ❌ ORPHAN:', o));
  console.log(`\nSingle inlink paths: ${oneLink.length}`);
  oneLink.forEach(o => console.log(`  ⚠️ 1 LINK: ${o.pathname} (from ${o.source})`));
  console.log(`\nWell-linked paths (2+ hubs): ${multiLink.length}`);
}

run();

