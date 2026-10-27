const http = require('http');
const fs = require('fs');
const ts = require('typescript');

async function fetchUrl(urlPath) {
  return new Promise((resolve, reject) => {
    http.get('http://localhost:3000' + urlPath, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, html: data }));
    }).on('error', reject);
  });
}

async function test() {
  const paths = [
    '/areas',
    '/areas/maha-chai',
    '/areas/krathumbaen-omnoi',
    '/areas/rama2-bangkradi',
    '/areas/bangbon-ekachai',
    '/areas/nongkhaem-phetkasem81',
    '/areas/bang-khae',
    '/areas/phutthamonthon-sai-1-4',
    '/areas/bkk-thonburi/bang-khae',
    '/areas/samutsakhon/maha-chai',
    '/areas/bkk-thonburi/nong-khaem',
    '/areas/bkk-thonburi/bang-bon',
    '/areas/bkk-thonburi/pinklao',
    '/areas/maha-chai/mueang-samut-sakhon',
    '/service/bkk-thonburi',
    '/service/samutsakhon',
    '/service/bangkok',
    '/service/phuket',
    '/service/chonburi',
    '/service/chiang-mai',
    '/service/samut-songkhram',
    '/service/bkk-phra-nakhon'
  ];

  console.log('Testing banner coverage on all key area paths...\n');
  let passCount = 0;
  for (const p of paths) {
    try {
      const { status, html } = await fetchUrl(p);
      const asideMatches = (html.match(/aria-label="แบนเนอร์ประชาสัมพันธ์บริการรถรับจ้างขนย้าย WMS TRANSPORT"/g) || []).length;
      console.log(`${p.padEnd(42)} | Status: ${status} | Aside Banners: ${asideMatches}`);
      if (status === 200 && asideMatches === 1) passCount++;
    } catch (err) {
      console.log(`${p.padEnd(42)} | ERROR: ${err.message}`);
    }
  }
  console.log(`\nKey Paths: ${passCount}/${paths.length} passed.`);

  // Test all published local points
  const code = fs.readFileSync('src/data/areaZonesData.ts', 'utf8');
  const js = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS } }).outputText;
  const mod = { exports: {} };
  new Function('module', 'exports', 'require', js)(mod, mod.exports, () => ({}));
  const publishedPoints = mod.exports.getPublishedLocalPoints().filter(p => p.action === 'new_page' || p.action === 'enrich_existing');
  console.log(`\nTesting all ${publishedPoints.length} published local area points...`);
  let ptOk = 0, ptFail = 0;
  for (const pt of publishedPoints) {
    try {
      const { status, html } = await fetchUrl(pt.preferredUrl);
      const asideMatches = (html.match(/aria-label="แบนเนอร์ประชาสัมพันธ์บริการรถรับจ้างขนย้าย WMS TRANSPORT"/g) || []).length;
      if (status === 200 && asideMatches === 1) {
        ptOk++;
      } else {
        console.log(`FAIL: ${pt.preferredUrl} | Status: ${status} | Banners: ${asideMatches}`);
        ptFail++;
      }
    } catch (e) {
      console.log(`ERROR: ${pt.preferredUrl} | ${e.message}`);
      ptFail++;
    }
  }
  console.log(`Local Points Result: ${ptOk}/${publishedPoints.length} PASS (${ptFail} failed)\n`);
}

test();
