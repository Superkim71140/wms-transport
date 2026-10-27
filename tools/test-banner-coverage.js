const http = require('http');

// Helper to fetch URL from localhost:3000
function fetchUrl(path) {
  return new Promise((resolve, reject) => {
    http.get(`http://localhost:3000${path}`, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    }).on('error', (err) => reject(err));
  });
}

async function run() {
  console.log('--- STARTING CONTACT BANNER AUDIT ---');

  // Key sample routes to check across all templates
  const routesToTest = [
    { path: '/', name: 'Homepage' },
    { path: '/areas', name: 'Areas Directory' },
    { path: '/service/bkk-thonburi', name: 'Bangkok Thonburi Hub' },
    { path: '/areas/samutsakhon/maha-chai', name: 'Maha Chai District' },
    { path: '/areas/bkk-thonburi/bang-khae', name: 'Bang Khae District' },
    { path: '/areas/bkk-thonburi/nong-khaem', name: 'Nong Khaem District' },
    { path: '/areas/krathumbaen-omnoi', name: 'Zone Hub (Krathumbaen-Omnoi)' },
    { path: '/areas/maha-chai/mueang-samut-sakhon', name: 'Local Point (Mueang Samut Sakhon)' },
    { path: '/service/samutsakhon', name: 'Province Hub (Samut Sakhon)' },
    { path: '/blog', name: 'Blog Directory' },
    { path: '/blog/what-can-box-truck-carry', name: 'Blog: What can box truck carry' },
    { path: '/blog/how-to-request-quote-checklist', name: 'Blog: How to request quote' },
  ];

  let passCount = 0;
  let failCount = 0;
  const results = [];

  for (const r of routesToTest) {
    try {
      const res = await fetchUrl(r.path);
      if (res.status !== 200) {
        console.error(`FAIL: ${r.name} (${r.path}) returned status ${res.status}`);
        failCount++;
        results.push({ ...r, status: res.status, bannerCount: 0, pass: false, error: 'HTTP status != 200' });
        continue;
      }

      // Check occurrences of ServiceContactBanner
      // In ServiceContactBanner, aria-label="ติดต่อและขอประเมินราคารถรับจ้าง WMS TRANSPORT"
      const bannerMatches = res.html.match(/aria-label="ติดต่อและขอประเมินราคารถรับจ้าง WMS TRANSPORT"/g) || [];
      const bannerCount = bannerMatches.length;

      // Check LINE button and Phone button
      const hasLine = res.html.includes('line.me/ti/p/DtICkMaDet') || res.html.includes('https://line.me/ti/p/DtICkMaDet');
      const hasPhone = res.html.includes('tel:0612402436') || res.html.includes('061-240-2436');
      const hasLineButtonText = res.html.includes('ประเมินราคาทาง LINE');
      
      // Check new concise heading
      const hasFirstPhrase = res.html.includes('ต้องการรถรับจ้างขนของ?');
      const hasSecondPhrase = res.html.includes('ปรึกษาและประเมินราคาได้เลย');
      const hasSupporting = res.html.includes('ส่งจุดรับ–ส่งและรายการของให้ทีมงาน WMS TRANSPORT');

      // Check badge was removed
      const hasOldBadge = res.html.includes('พร้อมให้คำปรึกษาและประเมินราคาก่อนเริ่มงาน');

      // Check no unsupported claims inside banner
      // Ensure "24 ชม." is not in the contact banner
      const bannerBlockMatch = res.html.match(/<aside[^>]*aria-label="ติดต่อและขอประเมินราคารถรับจ้าง WMS TRANSPORT"[\s\S]*?<\/aside>/);
      let bannerHas24h = false;
      if (bannerBlockMatch) {
        bannerHas24h = bannerBlockMatch[0].includes('24 ชม.') || bannerBlockMatch[0].includes('24 ชั่วโมง');
      }

      const passed = bannerCount === 1 && hasLine && hasPhone && hasLineButtonText && hasFirstPhrase && hasSecondPhrase && hasSupporting && !hasOldBadge && !bannerHas24h;

      if (passed) {
        passCount++;
        console.log(`PASS: [${bannerCount} banner] ${r.name} (${r.path})`);
      } else {
        failCount++;
        console.error(`FAIL: ${r.name} (${r.path}) - bannerCount: ${bannerCount}, line: ${hasLine}, phone: ${hasPhone}, heading: ${hasHeading}, banner24h: ${bannerHas24h}`);
      }

      results.push({
        ...r,
        status: res.status,
        bannerCount,
        hasLine,
        hasPhone,
        hasFirstPhrase,
        hasSecondPhrase,
        hasSupporting,
        bannerHas24h,
        pass: passed,
      });
    } catch (e) {
      console.error(`ERROR on ${r.path}:`, e.message);
      failCount++;
      results.push({ ...r, status: 'ERROR', error: e.message, pass: false });
    }
  }

  console.log(`\n--- SUMMARY: ${passCount} PASSED, ${failCount} FAILED out of ${routesToTest.length} tested ---`);
  return { passCount, failCount, results };
}

run();
