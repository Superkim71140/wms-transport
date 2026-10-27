const https = require('https');
const fs = require('fs');

// Load URLs to test:
// 1. All 146 live sitemap URLs
// 2. All 9 new local URLs
// 3. Known routes and historical URLs
const liveUrls = JSON.parse(fs.readFileSync('tools/live-sitemap-urls.json', 'utf8'));
const localUrls = JSON.parse(fs.readFileSync('tools/local-sitemap-urls.json', 'utf8')).map(u => u.url);

const combinedUrls = [...new Set([...liveUrls, ...localUrls])];

console.log(`Auditing ${combinedUrls.length} total URLs against production (https://wms-transport.com)...`);

function fetchUrlInfo(targetUrl) {
  return new Promise((resolve) => {
    const req = https.get(targetUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', chunk => {
        // limit data to first 100kb for fast parsing
        if (data.length < 100000) data += chunk;
      });
      res.on('end', () => {
        const canonicalMatch = data.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
        const robotsMatch = data.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
        const titleMatch = data.match(/<title[^>]*>([^<]+)<\/title>/i);
        const h1Match = data.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);

        const cleanH1 = h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : '';
        const cleanTitle = titleMatch ? titleMatch[1].trim() : '';

        resolve({
          url: targetUrl,
          statusCode: res.statusCode,
          finalUrl: res.headers.location || targetUrl,
          canonical: canonicalMatch ? canonicalMatch[1] : '',
          metaRobots: robotsMatch ? robotsMatch[1] : '',
          xRobotsTag: res.headers['x-robots-tag'] || '',
          title: cleanTitle,
          h1: cleanH1,
          hasContent: data.length > 500,
          inLiveSitemap: liveUrls.includes(targetUrl),
          inLocalSitemap: localUrls.includes(targetUrl)
        });
      });
    });

    req.on('error', (err) => {
      resolve({
        url: targetUrl,
        statusCode: 0,
        error: err.message,
        inLiveSitemap: liveUrls.includes(targetUrl),
        inLocalSitemap: localUrls.includes(targetUrl)
      });
    });

    req.on('timeout', () => {
      req.destroy();
      resolve({
        url: targetUrl,
        statusCode: 0,
        error: 'Timeout',
        inLiveSitemap: liveUrls.includes(targetUrl),
        inLocalSitemap: localUrls.includes(targetUrl)
      });
    });
  });
}

// Bounded concurrency pool
async function pool(items, fn, concurrency = 5) {
  const results = [];
  let index = 0;
  async function worker() {
    while (index < items.length) {
      const i = index++;
      results[i] = await fn(items[i]);
      if ((i + 1) % 25 === 0 || i + 1 === items.length) {
        console.log(`Progress: ${i + 1}/${items.length} audited...`);
      }
    }
  }
  const workers = Array.from({ length: concurrency }, () => worker());
  await Promise.all(workers);
  return results;
}

async function run() {
  const results = await pool(combinedUrls, fetchUrlInfo, 5);
  fs.writeFileSync('tools/production-audit-results.json', JSON.stringify(results, null, 2), 'utf8');

  // Analysis
  const statusCounts = {};
  const canonicalMismatches = [];
  const noindexPages = [];
  const missingH1 = [];
  const errors = [];

  results.forEach(r => {
    statusCounts[r.statusCode] = (statusCounts[r.statusCode] || 0) + 1;
    if (r.statusCode === 200) {
      if (r.canonical && r.canonical !== r.url) {
        canonicalMismatches.push({ url: r.url, canonical: r.canonical });
      }
      if (r.metaRobots && r.metaRobots.includes('noindex')) {
        noindexPages.push({ url: r.url, robots: r.metaRobots });
      }
      if (!r.h1) {
        missingH1.push(r.url);
      }
    } else {
      errors.push({ url: r.url, status: r.statusCode, error: r.error });
    }
  });

  console.log('\n--- AUDIT SUMMARY ---');
  console.log('HTTP Status Codes on Production:', statusCounts);
  console.log('Canonical Mismatches:', canonicalMismatches.length);
  if (canonicalMismatches.length) console.log(canonicalMismatches);
  console.log('Noindex Pages:', noindexPages.length);
  if (noindexPages.length) console.log(noindexPages);
  console.log('Missing H1:', missingH1.length);
  console.log('Errors/Non-200 URLs:', errors.length);
  if (errors.length) console.log(errors);
}

run();
