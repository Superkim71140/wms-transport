/**
 * Verification Script for Promo Banner & Compact Service Summary in WMS TRANSPORT
 */
const http = require('http');
const { spawn } = require('child_process');
const path = require('path');

const PORT = 3010;
const HOST = '127.0.0.1';
const BASE = `http://${HOST}:${PORT}`;

function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    const req = http.get(`${BASE}${urlPath}`, {
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

async function run() {
  console.log('🚀 Starting Next.js Production Server for Sitewide Component Verification on port', PORT);
  
  const serverProc = spawn('npx', ['next', 'start', '-p', String(PORT)], {
    cwd: path.resolve(__dirname, '..'),
    shell: true,
    stdio: 'pipe'
  });

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
    console.error('❌ Server failed to start.');
    serverProc.kill();
    process.exit(1);
  }

  const targetPages = [
    '/service/bkk-thonburi',
    '/service/bkk-phra-nakhon',
    '/service/bangkok',
    '/service/phuket',
    '/service/samutsakhon',
    '/service/samut-songkhram',
    '/areas/bkk-thonburi/bang-khae',
    '/areas/bkk-thonburi/pinklao',
    '/areas/samutsakhon/maha-chai'
  ];

  let passed = true;

  for (const page of targetPages) {
    const res = await fetchUrl(page);
    console.log(`\nTesting page: ${page} (HTTP ${res.statusCode})`);
    
    if (res.statusCode !== 200) {
      console.error(`  ❌ Failed HTTP status ${res.statusCode}`);
      passed = false;
      continue;
    }

    // 1. Promotional Banner presence
    const hasEmployeeImg = res.body.includes('wms-transport-employee.png') || res.body.includes('wms-transport-employee');
    const hasBannerHeadline = res.body.includes('ขนย้ายสะดวก') && res.body.includes('พร้อมดูแลทุกขั้นตอน');
    const hasLineCta = res.body.includes('ขอประเมินงานทาง LINE');

    // 2. Compact Service Summary presence
    const hasCompactSummaryHeading = res.body.includes('ข้อมูลบริการในพื้นที่แบบย่อ');
    const hasCard1 = res.body.includes('จุดให้บริการหลัก');
    const hasCard2 = res.body.includes('งานที่รองรับ');
    const hasCard3 = res.body.includes('ข้อมูลที่ใช้ประเมินราคา');
    const hasConditionsDisclosure = res.body.includes('ดูเงื่อนไขและข้อจำกัดการให้บริการ');

    // 3. Absence of old oversized/TL;DR components
    const hasOldDecisionTitle = res.body.includes('ข้อมูลสรุปเพื่อการตัดสินใจ');
    const hasTldrAbbreviation = res.body.includes('TL;DR') || res.body.includes('บทสรุปบริการ (TL;DR)');

    // 4. Single H1 check
    const h1Count = (res.body.match(/<h1[\s>]/gi) || []).length;

    console.log(`  - Promo Banner (Image & CTA): ${hasEmployeeImg && hasBannerHeadline && hasLineCta ? '✅' : '❌'}`);
    console.log(`  - Compact Summary Heading: ${hasCompactSummaryHeading ? '✅' : '❌'}`);
    console.log(`  - 3 Compact Cards (จุดบริการ/งาน/ประเมินราคา): ${hasCard1 && hasCard2 && hasCard3 ? '✅' : '❌'}`);
    console.log(`  - Service Conditions Disclosure: ${hasConditionsDisclosure ? '✅' : '❌'}`);
    console.log(`  - Old oversized 'ข้อมูลสรุปเพื่อการตัดสินใจ' removed: ${!hasOldDecisionTitle ? '✅' : '❌'}`);
    console.log(`  - Customer-facing 'TL;DR' removed: ${!hasTldrAbbreviation ? '✅' : '❌'}`);
    console.log(`  - Exactly 1 H1 tag: ${h1Count === 1 ? '✅ (1)' : `❌ (${h1Count})`}`);

    if (
      !hasEmployeeImg ||
      !hasBannerHeadline ||
      !hasLineCta ||
      !hasCompactSummaryHeading ||
      !hasCard1 ||
      !hasCard2 ||
      !hasCard3 ||
      !hasConditionsDisclosure ||
      hasOldDecisionTitle ||
      hasTldrAbbreviation ||
      h1Count !== 1
    ) {
      passed = false;
    }
  }

  // Verify draft district is still 404
  const draftRes = await fetchUrl('/areas/bkk-thonburi/nong-khaem');
  console.log(`\nTesting draft district: /areas/bkk-thonburi/nong-khaem (HTTP ${draftRes.statusCode})`);
  if (draftRes.statusCode === 404) {
    console.log('  ✅ Draft district remains strict HTTP 404');
  } else {
    console.error(`  ❌ Draft district returned HTTP ${draftRes.statusCode}`);
    passed = false;
  }

  serverProc.kill();

  if (passed) {
    console.log('\n🎉 ALL PROMO BANNER & COMPACT SUMMARY ASSERTIONS PASSED!');
    process.exit(0);
  } else {
    console.error('\n❌ SOME ASSERTIONS FAILED!');
    process.exit(1);
  }
}

run();
