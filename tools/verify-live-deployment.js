const https = require('https');
const fs = require('fs');

function fetchHttp(url) {
  return new Promise((resolve) => {
    https.get(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; Googlebot/2.1; +http://www.google.com/bot.html)',
        'Cache-Control': 'no-cache, no-store'
      },
      timeout: 15000
    }, (res) => {
      let data = '';
      res.on('data', c => { data += c; });
      res.on('end', () => resolve({
        statusCode: res.statusCode,
        headers: res.headers,
        body: data
      }));
    }).on('error', err => resolve({ statusCode: 0, error: err.message, body: '' }));
  });
}

async function verifyLive() {
  console.log('====================================================');
  console.log('🚀 LIVE PRODUCTION VERIFICATION SUITE — 5ac2051');
  console.log('Timestamp:', new Date().toISOString());
  console.log('====================================================\n');

  // 1. Verify robots.txt
  console.log('1️⃣ Checking https://wms-transport.com/robots.txt...');
  const robotsRes = await fetchHttp('https://wms-transport.com/robots.txt?t=' + Date.now());
  const hasPreviewDisallow = robotsRes.body.includes('/preview/');
  const hasSeoMonitorDisallow = robotsRes.body.includes('/seo-monitor/');
  const hasSitemapRef = robotsRes.body.includes('https://wms-transport.com/sitemap.xml');
  console.log('   Status:', robotsRes.statusCode);
  console.log('   Disallow /preview/:', hasPreviewDisallow ? '✅ PASS' : '❌ FAIL');
  console.log('   Disallow /seo-monitor/:', hasSeoMonitorDisallow ? '✅ PASS' : '❌ FAIL');
  console.log('   Sitemap reference:', hasSitemapRef ? '✅ PASS' : '❌ FAIL');

  // 2. Verify /sitemap.xml
  console.log('\n2️⃣ Checking https://wms-transport.com/sitemap.xml...');
  const sitemapRes = await fetchHttp('https://wms-transport.com/sitemap.xml?t=' + Date.now());
  const locMatches = [...sitemapRes.body.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
  console.log('   Status:', sitemapRes.statusCode);
  console.log('   Total URLs in live sitemap:', locMatches.length);
  console.log('   Unique URLs in live sitemap:', new Set(locMatches).size);
  console.log('   Exactly 155 published URLs:', locMatches.length === 155 ? '✅ PASS' : '❌ FAIL');

  // Verify draft gates (no draft URLs leaked in sitemap)
  const draftKeywords = ['bang-yai', 'bang-bua-thong', 'bang-kruai', 'phra-pradaeng', 'rangsit', 'preview'];
  const leakedDrafts = locMatches.filter(u => draftKeywords.some(dk => u.includes(dk)));
  console.log('   Draft gates preserved (0 leaks):', leakedDrafts.length === 0 ? '✅ PASS' : '❌ FAIL: ' + leakedDrafts.join(', '));

  // 3. Verify Homepage (/) for 7 Strategic Zone Hub links
  console.log('\n3️⃣ Checking Homepage (/) for 7 Strategic Zone links...');
  const homeRes = await fetchHttp('https://wms-transport.com/?t=' + Date.now());
  const expectedZones = [
    '/areas/maha-chai',
    '/areas/krathumbaen-omnoi',
    '/areas/rama2-bangkradi',
    '/areas/bangbon-ekachai',
    '/areas/nongkhaem-phetkasem81',
    '/areas/bang-khae',
    '/areas/phutthamonthon-sai-1-4'
  ];
  const missingZones = expectedZones.filter(z => !homeRes.body.includes(`href="${z}"`));
  console.log('   Homepage Status:', homeRes.statusCode);
  console.log('   Contains 7 Strategic Zone Hub links in raw HTML:', missingZones.length === 0 ? '✅ PASS (All 7 present)' : '❌ FAIL: ' + missingZones.join(', '));
  console.log('   Contains 7 Zone Section Title (7 โซนยุทธศาสตร์การให้บริการ):', homeRes.body.includes('7 โซนยุทธศาสตร์การให้บริการ') ? '✅ PASS' : '❌ FAIL');

  // 4. Verify 10 Priority Area Destinations (Status 200, Canonical, Robots)
  console.log('\n4️⃣ Checking 10 Priority Area Destinations...');
  const priority10 = [
    '/areas/samutsakhon/maha-chai',
    '/areas/krathumbaen-omnoi/krathum-baen',
    '/areas/bkk-thonburi/nong-khaem',
    '/areas/bkk-thonburi/bang-khae',
    '/areas/maha-chai/ban-phaeo',
    '/areas/krathumbaen-omnoi/om-noi',
    '/areas/bkk-thonburi/bang-bon',
    '/areas/rama2-bangkradi/rama-2',
    '/areas/phutthamonthon-sai-1-4/salaya',
    '/areas/phutthamonthon-sai-1-4/sam-phran'
  ];
  let p10AllPass = true;
  for (const p of priority10) {
    const res = await fetchHttp('https://wms-transport.com' + p);
    const canon = res.body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1];
    const isIndexable = !res.body.includes('noindex');
    const ok = res.statusCode === 200 && canon === `https://wms-transport.com${p}` && isIndexable;
    if (!ok) p10AllPass = false;
    console.log(`   ${p.padEnd(42)} -> Status: ${res.statusCode}, Canonical OK: ${canon === `https://wms-transport.com${p}`}, Indexable: ${isIndexable}`);
  }
  console.log('   10 Priority Areas Overall:', p10AllPass ? '✅ ALL 10 PASS' : '❌ FAIL');

  // 5. Verify Previously Orphaned Pages & New Contextual Links
  console.log('\n5️⃣ Checking Previously Orphaned Pages & Contextual Links...');
  
  // A. Compare Cluster: /compare/one-vehicle-vs-multiple-trips
  const compRes = await fetchHttp('https://wms-transport.com/compare/one-vehicle-vs-multiple-trips');
  const compCanon = compRes.body.match(/<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["']/i)?.[1];
  console.log('   /compare/one-vehicle-vs-multiple-trips Status:', compRes.statusCode, 'Canon:', compCanon);

  // Check if pickup-vs-box-truck links to one-vehicle-vs-multiple-trips and moving-in-rain
  const pickupRes = await fetchHttp('https://wms-transport.com/compare/pickup-vs-box-truck');
  const pickupHasOneVehicle = pickupRes.body.includes('/compare/one-vehicle-vs-multiple-trips');
  const pickupHasRainGuide = pickupRes.body.includes('/guides/moving-in-rain');
  console.log('   /compare/pickup-vs-box-truck links to one-vehicle:', pickupHasOneVehicle ? '✅ PASS' : '❌ FAIL');
  console.log('   /compare/pickup-vs-box-truck links to moving-in-rain:', pickupHasRainGuide ? '✅ PASS' : '❌ FAIL');

  // B. Pricing Moving: links to guides
  const movingRes = await fetchHttp('https://wms-transport.com/pricing/moving');
  const movingHasNoElevator = movingRes.body.includes('/guides/condo-no-elevator');
  const movingHasOneBed = movingRes.body.includes('/guides/one-bedroom-condo-move');
  const movingHasOneVehicle = movingRes.body.includes('/compare/one-vehicle-vs-multiple-trips');
  console.log('   /pricing/moving links to condo-no-elevator:', movingHasNoElevator ? '✅ PASS' : '❌ FAIL');
  console.log('   /pricing/moving links to one-bedroom-condo-move:', movingHasOneBed ? '✅ PASS' : '❌ FAIL');
  console.log('   /pricing/moving links to one-vehicle-vs-multiple-trips:', movingHasOneVehicle ? '✅ PASS' : '❌ FAIL');

  // C. Motorcycle Pricing: links to prep-motorcycle-transport
  const motoRes = await fetchHttp('https://wms-transport.com/pricing/motorcycle-transport');
  const motoHasPrep = motoRes.body.includes('/guides/prep-motorcycle-transport');
  console.log('   /pricing/motorcycle-transport links to prep-motorcycle-transport:', motoHasPrep ? '✅ PASS' : '❌ FAIL');

  // D. Route Chonburi -> Bangkok
  const routeRes = await fetchHttp('https://wms-transport.com/route/chonburi/bangkok');
  console.log('   /route/chonburi/bangkok Status:', routeRes.statusCode);

  // E. Footer link to one-vehicle-vs-multiple-trips and condo-no-elevator
  const footerHasOneVehicle = homeRes.body.includes('/compare/one-vehicle-vs-multiple-trips');
  const footerHasNoElevator = homeRes.body.includes('/guides/condo-no-elevator');
  console.log('   Footer links to one-vehicle-vs-multiple-trips:', footerHasOneVehicle ? '✅ PASS' : '❌ FAIL');
  console.log('   Footer links to condo-no-elevator:', footerHasNoElevator ? '✅ PASS' : '❌ FAIL');

  // F. Samut Sakhon Hub links to real areas (not self-links)
  const samutRes = await fetchHttp('https://wms-transport.com/service/samutsakhon');
  const samutHasKrathumBaen = samutRes.body.includes('/areas/krathumbaen-omnoi/krathum-baen');
  const samutHasBanPhaeo = samutRes.body.includes('/areas/maha-chai/ban-phaeo');
  console.log('   /service/samutsakhon links to /areas/krathumbaen-omnoi/krathum-baen:', samutHasKrathumBaen ? '✅ PASS' : '❌ FAIL');
  console.log('   /service/samutsakhon links to /areas/maha-chai/ban-phaeo:', samutHasBanPhaeo ? '✅ PASS' : '❌ FAIL');

  // G. Check Repaired Guide URLs
  const noElevatorGuideRes = await fetchHttp('https://wms-transport.com/guides/condo-no-elevator');
  const rainGuideRes = await fetchHttp('https://wms-transport.com/guides/moving-in-rain');
  const motoGuideRes = await fetchHttp('https://wms-transport.com/guides/prep-motorcycle-transport');
  const oneBedGuideRes = await fetchHttp('https://wms-transport.com/guides/one-bedroom-condo-move');
  console.log('   /guides/condo-no-elevator Status:', noElevatorGuideRes.statusCode, noElevatorGuideRes.statusCode === 200 ? '✅ PASS' : '❌ FAIL');
  console.log('   /guides/moving-in-rain Status:', rainGuideRes.statusCode, rainGuideRes.statusCode === 200 ? '✅ PASS' : '❌ FAIL');
  console.log('   /guides/prep-motorcycle-transport Status:', motoGuideRes.statusCode, motoGuideRes.statusCode === 200 ? '✅ PASS' : '❌ FAIL');
  console.log('   /guides/one-bedroom-condo-move Status:', oneBedGuideRes.statusCode, oneBedGuideRes.statusCode === 200 ? '✅ PASS' : '❌ FAIL');

  console.log('\n====================================================');
  console.log('🎉 ALL LIVE PRODUCTION VERIFICATION CHECKS COMPLETE');
  console.log('====================================================');
}

verifyLive();

