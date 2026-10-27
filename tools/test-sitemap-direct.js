const path = require('path');
const fs = require('fs');
const ts = require('typescript');

const ROOT = path.resolve(__dirname, '..');

function loadTs(relPath) {
  const fullPath = path.join(ROOT, relPath);
  const code = fs.readFileSync(fullPath, 'utf8');
  const js = ts.transpileModule(code, {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 }
  }).outputText;
  const mod = { exports: {} };
  const fn = new Function('module', 'exports', 'require', '__dirname', '__filename', js);
  fn(mod, mod.exports, (p) => {
    if (p === '@/lib/seo/site-config' || p === './site-config') return loadTs('src/lib/seo/site-config.ts');
    if (p === '@/data/searchIntentMap') return loadTs('src/data/searchIntentMap.ts');
    if (p === '@/data/districtLandingPages') return loadTs('src/data/districtLandingPages.ts');
    if (p === '@/data/areaZonesData') return loadTs('src/data/areaZonesData.ts');
    if (p === '@/data/guidesData') return loadTs('src/data/guidesData.ts');
    if (p === '@/data/mediaEvidence') return loadTs('src/data/mediaEvidence.ts');
    if (p === '@/data/approvedRouteCorridors') return loadTs('src/data/approvedRouteCorridors.ts');
    if (p === './(marketing)/service/[province]/page') return {
      provinceMap: {
        samutsakhon: { name: 'สมุทรสาคร' },
        bangkok: { name: 'กรุงเทพมหานคร' },
        'bkk-thonburi': { name: 'กรุงเทพฯ ฝั่งธนบุรี' },
        'bkk-phra-nakhon': { name: 'กรุงเทพฯ ฝั่งพระนคร' },
        'samut-songkhram': { name: 'สมุทรสงคราม' },
        chonburi: { name: 'ชลบุรี' },
        phuket: { name: 'ภูเก็ต' },
        'chiang-mai': { name: 'เชียงใหม่' },
      }
    };
    if (p === './(marketing)/blog/posts') return {
      posts: {
        'pickup-vs-box-truck': { dateISO: '2026-06-15' },
        'moving-alone-vs-helpers': { dateISO: '2026-06-20' },
        'capacity-guide': { dateISO: '2026-06-25' },
        'motorcycle-transport-guide': { dateISO: '2026-07-01' },
      }
    };
    return {};
  }, path.dirname(fullPath), fullPath);
  return mod.exports;
}

async function run() {
  console.log('🧪 Validating sitemap output directly from src/app/sitemap.ts...\n');

  const sitemapMod = loadTs('src/app/sitemap.ts');
  const sitemapFn = sitemapMod.default;
  const entries = await sitemapFn();

  console.log(`✅ Total Sitemap URLs: ${entries.length}`);

  const urls = entries.map(e => e.url);
  const seen = new Set();
  const duplicates = [];

  for (const url of urls) {
    if (seen.has(url)) {
      duplicates.push(url);
    }
    seen.add(url);
  }

  if (duplicates.length > 0) {
    console.error('❌ Duplicate URLs found in sitemap:', duplicates);
    process.exit(1);
  } else {
    console.log('✅ ZERO duplicate URLs found in sitemap!');
  }

  // Check 5 newly published points
  const expectedNewUrls = [
    'https://wms-transport.com/areas/maha-chai/ban-phaeo',
    'https://wms-transport.com/areas/maha-chai/yok-krabat',
    'https://wms-transport.com/areas/phutthamonthon-sai-1-4/rai-khing',
    'https://wms-transport.com/areas/phutthamonthon-sai-1-4/phutthamonthon-sai-5',
    'https://wms-transport.com/areas/phutthamonthon-sai-1-4/nakhon-chai-si',
  ];

  for (const exp of expectedNewUrls) {
    if (!urls.includes(exp)) {
      console.error(`❌ Missing newly published URL in sitemap: ${exp}`);
      process.exit(1);
    }
  }
  console.log('✅ All 5 newly published expansion local points are present in sitemap!');

  // Check 6 drafts are NOT in sitemap
  const forbiddenDraftSlugs = [
    'mueang-nakhon-pathom',
    'bang-yai',
    'bang-bua-thong',
    'bang-kruai',
    'phra-pradaeng',
    'rangsit',
  ];

  for (const slug of forbiddenDraftSlugs) {
    const leak = urls.find(u => u.includes(slug));
    if (leak) {
      console.error(`❌ DRAFT LEAK! Draft "${slug}" was found in public sitemap: ${leak}`);
      process.exit(1);
    }
  }
  console.log('✅ All 6 draft expansion points are strictly excluded from sitemap!');

  // Check 7 zone hubs
  const expectedZones = [
    'https://wms-transport.com/areas/maha-chai',
    'https://wms-transport.com/areas/krathumbaen-omnoi',
    'https://wms-transport.com/areas/rama2-bangkradi',
    'https://wms-transport.com/areas/bangbon-ekachai',
    'https://wms-transport.com/areas/nongkhaem-phetkasem81',
    'https://wms-transport.com/areas/bang-khae',
    'https://wms-transport.com/areas/phutthamonthon-sai-1-4',
  ];

  for (const z of expectedZones) {
    if (!urls.includes(z)) {
      console.error(`❌ Missing Zone Hub in sitemap: ${z}`);
      process.exit(1);
    }
  }
  console.log('✅ All 7 Zone Hubs are present in sitemap!');

  // Check Point 70 Sam Phran canonical integrity
  const samPhranCanonical = 'https://wms-transport.com/areas/phutthamonthon-sai-1-4/sam-phran';

  if (!urls.includes(samPhranCanonical)) {
    console.error(`❌ Missing canonical sam-phran point page: ${samPhranCanonical}`);
    process.exit(1);
  }
  console.log('✅ Sam Phran canonical integrity verified: enriched point URL present in sitemap!');

  console.log('\n🎉 ALL SITEMAP VERIFICATION CHECKS PASSED PERFECTLY!');
}

run().catch(err => {
  console.error('Validation crashed:', err);
  process.exit(1);
});
