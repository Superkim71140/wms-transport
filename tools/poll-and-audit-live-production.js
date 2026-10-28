const https = require('https');
const fs = require('fs');

function fetchHttp(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Cache-Control': 'no-cache, no-store'
      },
      timeout: 10000
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        body: data
      }));
    }).on('error', (err) => resolve({ statusCode: 0, error: err.message }));
  });
}

async function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function main() {
  console.log('--- POLLING PRODUCTION FOR DEPLOYMENT OF COMMIT ec5e241 ---');
  const canaryUrl = 'https://wms-transport.com/blog/how-to-request-quote-checklist';
  const sitemapUrl = 'https://wms-transport.com/sitemap.xml';

  let deployed = false;
  let attempts = 0;
  const maxAttempts = 15; // up to 2.5 minutes

  while (!deployed && attempts < maxAttempts) {
    attempts++;
    console.log(`[Attempt ${attempts}/${maxAttempts}] Checking canary URL: ${canaryUrl}...`);
    const canaryRes = await fetchHttp(canaryUrl);
    console.log(`    Canary status: ${canaryRes.statusCode}`);
    
    if (canaryRes.statusCode === 200) {
      console.log('✅ Canary URL returned 200 OK! New deployment is LIVE on production!');
      deployed = true;
      break;
    }
    await sleep(10000); // wait 10 seconds
  }

  // Fetch live sitemap
  console.log('\n--- FETCHING LIVE SITEMAP ---');
  const sitemapRes = await fetchHttp(sitemapUrl);
  console.log(`Live sitemap HTTP status: ${sitemapRes.statusCode}`);
  console.log(`Live sitemap content-type: ${sitemapRes.headers['content-type']}`);
  console.log(`Live sitemap size: ${sitemapRes.body.length} bytes`);

  // Parse XML locs
  const locMatches = [...sitemapRes.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  console.log(`Live sitemap total URLs extracted: ${locMatches.length}`);
  const uniqueLiveLocs = new Set(locMatches);
  console.log(`Live sitemap unique URLs: ${uniqueLiveLocs.size}`);

  fs.writeFileSync('tools/live-deployed-sitemap-urls.json', JSON.stringify([...uniqueLiveLocs], null, 2), 'utf8');

  // Verify against local expected URLs
  const { execSync } = require('child_process');
  const expectedUrls = JSON.parse(execSync('npx tsx -e "import { getEligiblePublishedRouteUrls } from \'./src/app/sitemap\'; console.log(JSON.stringify(Array.from(getEligiblePublishedRouteUrls())))"').toString());
  const expectedSet = new Set(expectedUrls);

  console.log(`Expected eligible published URLs count: ${expectedSet.size}`);

  const missingFromLiveSitemap = [...expectedSet].filter(u => !uniqueLiveLocs.has(u));
  const unexpectedInLiveSitemap = [...uniqueLiveLocs].filter(u => !expectedSet.has(u));

  console.log(`Missing from live sitemap count: ${missingFromLiveSitemap.length}`);
  if (missingFromLiveSitemap.length) console.log('Missing:', missingFromLiveSitemap);

  console.log(`Unexpected in live sitemap count: ${unexpectedInLiveSitemap.length}`);
  if (unexpectedInLiveSitemap.length) console.log('Unexpected:', unexpectedInLiveSitemap);

  // Probe every URL on live production (bounded concurrency)
  console.log(`\n--- PROBING ALL ${uniqueLiveLocs.size} SITEMAP URLS ON PRODUCTION ---`);
  
  function probeUrl(targetUrl) {
    return new Promise((resolve) => {
      https.get(targetUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        },
        timeout: 10000
      }, (res) => {
        let body = '';
        res.on('data', chunk => { if (body.length < 50000) body += chunk; });
        res.on('end', () => {
          const canonicalMatch = body.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i);
          const robotsMatch = body.match(/<meta[^>]*name=["']robots["'][^>]*content=["']([^"']+)["']/i);
          const titleMatch = body.match(/<title[^>]*>([^<]+)<\/title>/i);
          const h1Match = body.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i);
          
          resolve({
            url: targetUrl,
            status: res.statusCode,
            canonical: canonicalMatch ? canonicalMatch[1] : '',
            metaRobots: robotsMatch ? robotsMatch[1] : '',
            xRobotsTag: res.headers['x-robots-tag'] || '',
            title: titleMatch ? titleMatch[1].trim() : '',
            h1: h1Match ? h1Match[1].replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ') : '',
            hasContent: body.length > 500
          });
        });
      }).on('error', err => resolve({ url: targetUrl, status: 0, error: err.message }));
    });
  }

  async function pool(items, fn, concurrency = 5) {
    const results = [];
    let index = 0;
    async function worker() {
      while (index < items.length) {
        const i = index++;
        results[i] = await fn(items[i]);
        if ((i + 1) % 25 === 0 || i + 1 === items.length) {
          console.log(`Audited ${i + 1}/${items.length} live production URLs...`);
        }
      }
    }
    await Promise.all(Array.from({ length: concurrency }, () => worker()));
    return results;
  }

  const liveAuditResults = await pool([...uniqueLiveLocs], probeUrl, 5);
  fs.writeFileSync('tools/live-deployed-audit-results.json', JSON.stringify(liveAuditResults, null, 2), 'utf8');

  // Summary analysis
  const statusCounts = {};
  const non200 = [];
  const canonicalMismatches = [];
  const noindexPages = [];

  liveAuditResults.forEach(r => {
    statusCounts[r.status] = (statusCounts[r.status] || 0) + 1;
    if (r.status !== 200) non200.push(r);
    if (r.status === 200) {
      if (r.canonical && r.canonical !== r.url && decodeURI(r.canonical) !== decodeURI(r.url)) {
        canonicalMismatches.push(r);
      }
      if (r.metaRobots && r.metaRobots.includes('noindex')) {
        noindexPages.push(r);
      }
    }
  });

  console.log('\n=============================================');
  console.log('📊 LIVE PRODUCTION DEPLOYMENT AUDIT REPORT');
  console.log('=============================================');
  console.log('HTTP Status distribution:', statusCounts);
  console.log(`Non-200 URLs: ${non200.length}`);
  if (non200.length) console.log(non200);
  console.log(`Canonical Mismatches: ${canonicalMismatches.length}`);
  if (canonicalMismatches.length) console.log(canonicalMismatches);
  console.log(`Noindex leaks on production: ${noindexPages.length}`);
  if (noindexPages.length) console.log(noindexPages);
  console.log('=============================================');
}

main().catch(console.error);
