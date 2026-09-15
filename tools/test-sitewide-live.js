/**
 * Comprehensive Live Production Server Verifier for WMS TRANSPORT
 * Tests sitemap URLs, representative routes, 404 gates, canonicals, H1s, and CTAs.
 */

const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const PORT = 3008;
const HOST = '127.0.0.1';
const BASE = `http://${HOST}:${PORT}`;

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    const fullUrl = urlPath.startsWith('http') ? urlPath : `${BASE}${urlPath}`;
    const req = http.get(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)'
      }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body
        });
      });
    });
    req.on('error', reject);
    req.setTimeout(5000, () => {
      req.destroy();
      reject(new Error(`Timeout fetching ${urlPath}`));
    });
  });
}

async function runTests() {
  console.log('🚀 Starting Next.js Production Server for Sitewide Live Verification on port', PORT);
  
  const serverProc = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    cwd: path.resolve(__dirname, '..'),
    shell: true,
    stdio: 'pipe'
  });

  serverProc.stdout.on('data', d => {
    // console.log(`[Next.js stdout]: ${d}`);
  });
  serverProc.stderr.on('data', d => {
    // console.error(`[Next.js stderr]: ${d}`);
  });

  // Wait for server to start
  let ready = false;
  for (let i = 0; i < 30; i++) {
    try {
      const res = await fetchUrl('/');
      if (res.statusCode === 200) {
        ready = true;
        break;
      }
    } catch (e) {
      await new Promise(r => setTimeout(r, 500));
    }
  }

  if (!ready) {
    console.error('❌ Server failed to start within 15 seconds.');
    serverProc.kill();
    process.exit(1);
  }

  console.log('✅ Production Server is live and responding.\n');

  let totalTests = 0;
  let passedTests = 0;
  let failedTests = [];

  function assertTest(name, condition, details = '') {
    totalTests++;
    if (condition) {
      passedTests++;
      console.log(`  ✅ ${name}`);
    } else {
      failedTests.push({ name, details });
      console.error(`  ❌ FAIL: ${name} — ${details}`);
    }
  }

  try {
    // ==========================================
    // 1. ROBOTS.TXT & SITEMAP.XML
    // ==========================================
    console.log('1️⃣ Verifying robots.txt and sitemap.xml...');
    const robotsRes = await fetchUrl('/robots.txt');
    assertTest('robots.txt returns HTTP 200', robotsRes.statusCode === 200);
    assertTest('robots.txt disallows /dashboard/', robotsRes.body.includes('Disallow: /dashboard/'));
    assertTest('robots.txt contains sitemap URL', robotsRes.body.includes('sitemap.xml'));

    const sitemapRes = await fetchUrl('/sitemap.xml');
    assertTest('sitemap.xml returns HTTP 200', sitemapRes.statusCode === 200);
    assertTest('sitemap.xml is valid XML', sitemapRes.body.includes('<urlset') && sitemapRes.body.includes('</urlset>'));

    // Extract all URLs from sitemap.xml
    const urlMatches = [...sitemapRes.body.matchAll(/<loc>(.*?)<\/loc>/g)].map(m => m[1]);
    assertTest('sitemap.xml has URLs', urlMatches.length > 0, `Found ${urlMatches.length} URLs`);
    console.log(`   Found ${urlMatches.length} URLs in sitemap.xml`);

    // Check for prohibited URLs in sitemap
    const hasNoDashboardInSitemap = !urlMatches.some(u => u.includes('/dashboard'));
    assertTest('No dashboard URLs in sitemap', hasNoDashboardInSitemap);

    const hasNoDraftDistrictsInSitemap = !urlMatches.some(u => 
      u.includes('/nong-khaem') || u.includes('/phasi-charoen') || u.includes('/thon-buri')
    );
    assertTest('No draft districts in sitemap', hasNoDraftDistrictsInSitemap);

    // ==========================================
    // 2. CRAWL EVERY SITEMAP URL
    // ==========================================
    console.log('\n2️⃣ Crawling all sitemap URLs for HTTP 200, H1, Title & Canonical...');
    let sitemapFailures = 0;
    const canonicalSet = new Set();

    for (const fullUrl of urlMatches) {
      const urlPath = new URL(fullUrl).pathname;
      const res = await fetchUrl(urlPath);

      if (res.statusCode !== 200) {
        sitemapFailures++;
        failedTests.push({ name: `Sitemap URL status ${urlPath}`, details: `Expected 200, got ${res.statusCode}` });
        continue;
      }

      // Check Title
      const titleMatch = res.body.match(/<title>(.*?)<\/title>/);
      if (!titleMatch || !titleMatch[1].trim()) {
        sitemapFailures++;
        failedTests.push({ name: `Title tag on ${urlPath}`, details: 'Missing or empty <title>' });
      }

      // Check H1 count (must have at least one on content pages, ideally exactly 1)
      const h1Count = (res.body.match(/<h1[\s>]/gi) || []).length;
      if (h1Count !== 1) {
        sitemapFailures++;
        failedTests.push({ name: `Single H1 on ${urlPath}`, details: `Found ${h1Count} <h1> tags` });
      }

      // Check Canonical
      const canonicalMatch = res.body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["'](.*?)["']/i);
      if (canonicalMatch) {
        canonicalSet.add(canonicalMatch[1]);
      }
    }

    assertTest(`All ${urlMatches.length} sitemap URLs return HTTP 200 with 1 H1 and Title`, sitemapFailures === 0, `${sitemapFailures} failures found`);
    assertTest('Canonical tags are unique across sitemap', canonicalSet.size === urlMatches.length, `Expected ${urlMatches.length} unique canonicals, got ${canonicalSet.size}`);

    // ==========================================
    // 3. VERIFY PUBLISHED THONBURI & AREA HUBS
    // ==========================================
    console.log('\n3️⃣ Verifying published area landing pages & regional hubs...');
    
    // Bang Khae
    const bkRes = await fetchUrl('/areas/bkk-thonburi/bang-khae');
    assertTest('Bang Khae (/areas/bkk-thonburi/bang-khae) returns HTTP 200', bkRes.statusCode === 200);
    assertTest('Bang Khae contains verified photo WM10.webp', bkRes.body.includes('WM10.webp'));
    assertTest('Bang Khae contains proof score 85', /85[\s\S]*?100/.test(bkRes.body));
    assertTest('Bang Khae has correct canonical', bkRes.body.includes('https://wms-transport.com/areas/bkk-thonburi/bang-khae'));

    // Pinklao
    const pkRes = await fetchUrl('/areas/bkk-thonburi/pinklao');
    assertTest('Pinklao (/areas/bkk-thonburi/pinklao) returns HTTP 200', pkRes.statusCode === 200);
    assertTest('Pinklao contains verified photo WM11.webp', pkRes.body.includes('WM11.webp'));
    assertTest('Pinklao contains proof score 75', /75[\s\S]*?100/.test(pkRes.body));

    // Maha Chai
    const mcRes = await fetchUrl('/areas/samutsakhon/maha-chai');
    assertTest('Maha Chai (/areas/samutsakhon/maha-chai) returns HTTP 200', mcRes.statusCode === 200);
    assertTest('Maha Chai contains verified photo WM8.webp', mcRes.body.includes('WM8.webp'));
    assertTest('Maha Chai contains proof score 78', /78[\s\S]*?100/.test(mcRes.body));

    // Thonburi Regional Hub
    const thonburiHubRes = await fetchUrl('/service/bkk-thonburi');
    assertTest('Thonburi Hub (/service/bkk-thonburi) returns HTTP 200', thonburiHubRes.statusCode === 200);
    assertTest('Thonburi Hub contains dual-zone group headings', thonburiHubRes.body.includes('กรุงธนเหนือ') && thonburiHubRes.body.includes('กรุงธนใต้'));
    assertTest('Thonburi Hub states internal height', thonburiHubRes.body.includes('ความสูงภายในตู้ 2.1 เมตร'));

    // ==========================================
    // 4. VERIFY STRICT 404 GATING FOR DRAFT DISTRICTS
    // ==========================================
    console.log('\n4️⃣ Verifying strict HTTP 404 gating on all 13 draft districts...');
    const draftDistricts = [
      'nong-khaem', 'phasi-charoen', 'bang-khun-thian', 'bang-bon',
      'rat-burana', 'thung-khru', 'thon-buri', 'khlong-san',
      'chom-thong', 'bangkok-yai', 'bangkok-noi', 'bang-phlat',
      'taling-chan', 'thawi-watthana'
    ];

    let allDrafts404 = true;
    for (const dist of draftDistricts) {
      const res = await fetchUrl(`/areas/bkk-thonburi/${dist}`);
      if (res.statusCode !== 404) {
        allDrafts404 = false;
        failedTests.push({ name: `Draft district /areas/bkk-thonburi/${dist}`, details: `Expected 404, got ${res.statusCode}` });
      }
    }
    assertTest('All 13 draft Thonburi districts return HTTP 404 Not Found', allDrafts404);

    // ==========================================
    // 5. INTERNAL ROUTE PROTECTION (/dashboard/seo-intelligence)
    // ==========================================
    console.log('\n5️⃣ Verifying internal dashboard route protection...');
    const dashRes = await fetchUrl('/dashboard/seo-intelligence');
    assertTest('Dashboard route returns HTTP 200 (accessible internally)', dashRes.statusCode === 200);
    assertTest('Dashboard contains noindex robots tag', dashRes.body.includes('noindex'));

    // ==========================================
    // 6. REPRESENTATIVE COMMERCIAL & INFORMATIONAL PAGES
    // ==========================================
    console.log('\n6️⃣ Verifying commercial & informational representative pages...');
    
    // Homepage
    const homeRes = await fetchUrl('/');
    assertTest('Homepage returns HTTP 200', homeRes.statusCode === 200);
    assertTest('Homepage has no external kimx-wed link', !homeRes.body.includes('kimx-wed.vercel.app'));
    assertTest('Homepage contains official LINE CTA', homeRes.body.includes('line.me'));
    assertTest('Homepage contains official Phone CTA', homeRes.body.includes('tel:0612402436'));

    // Pricing
    const pricingRes = await fetchUrl('/pricing');
    assertTest('Pricing (/pricing) returns HTTP 200', pricingRes.statusCode === 200);

    // Route Corridors
    const routeRes = await fetchUrl('/route/bangkok/phuket');
    assertTest('Route (/route/bangkok/phuket) returns HTTP 200', routeRes.statusCode === 200);

    // Portfolio
    const portRes = await fetchUrl('/portfolio/moving-condo-bang-khae');
    assertTest('Portfolio case study returns HTTP 200', portRes.statusCode === 200);

    // Guide
    const guideRes = await fetchUrl('/guides/truck-capacity-cbm');
    assertTest('Guide (/guides/truck-capacity-cbm) returns HTTP 200', guideRes.statusCode === 200);

    // Compare
    const compRes = await fetchUrl('/compare/pickup-vs-box-truck');
    assertTest('Compare page returns HTTP 200', compRes.statusCode === 200);

    // Invalid URL 404 check
    const badRes = await fetchUrl('/non-existent-random-page-12345');
    assertTest('Non-existent route returns HTTP 404', badRes.statusCode === 404);

  } catch (err) {
    console.error('💥 Error during test execution:', err);
    failedTests.push({ name: 'General Test Runner Error', details: err.message });
  } finally {
    // Graceful server shutdown
    console.log('\n🛑 Shutting down test server...');
    serverProc.kill();
  }

  // ==========================================
  // FINAL SUMMARY
  // ==========================================
  console.log('\n==========================================');
  console.log('📊 LIVE PRODUCTION SERVER TEST SUMMARY');
  console.log('==========================================');
  console.log(`Total Assertions: ${totalTests + passedTests}`);
  console.log(`Passed:           ${passedTests}`);
  console.log(`Failed:           ${failedTests.length}`);

  if (failedTests.length > 0) {
    console.log('\n❌ FAILED TESTS:');
    failedTests.forEach(f => console.log(`  - ${f.name}: ${f.details}`));
    process.exit(1);
  } else {
    console.log('\n🎉 ALL LIVE PRODUCTION ASSERTIONS PASSED WITH ZERO ERRORS!');
    process.exit(0);
  }
}

runTests();
