const fs = require('fs');
const path = require('path');
const ts = require('typescript');

function loadTs(relPath) {
  const code = fs.readFileSync(path.join(process.cwd(), relPath), 'utf8');
  const js = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
  const mod = { exports: {} };
  new Function('module', 'exports', 'require', '__dirname', '__filename', js)(mod, mod.exports, (p) => {
    if (p.includes('site-config')) return loadTs('src/lib/seo/site-config.ts');
    if (p.includes('searchIntentMap')) return loadTs('src/data/searchIntentMap.ts');
    if (p.includes('districtLandingPages')) return loadTs('src/data/districtLandingPages.ts');
    if (p.includes('guidesData')) return loadTs('src/data/guidesData.ts');
    if (p.includes('mediaEvidence')) return loadTs('src/data/mediaEvidence.ts');
    if (p.includes('approvedRouteCorridors')) return loadTs('src/data/approvedRouteCorridors.ts');
    if (p.includes('pricingPolicy')) return loadTs('src/data/pricingPolicy.ts');
    if (p.includes('serviceAreaContent')) return loadTs('src/data/serviceAreaContent.ts');
    if (p.includes('areaZonesData')) return loadTs('src/data/areaZonesData.ts');
    if (p.includes('posts')) return loadTs('src/app/(marketing)/blog/posts.ts');
    if (p.includes('service/[province]/page')) return { provinceMap: { bangkok: {}, samutsakhon: {}, chonburi: {}, 'bkk-thonburi': {}, 'bkk-phra-nakhon': {}, 'samut-songkhram': {}, phuket: {}, 'chiang-mai': {} } };
    return {};
  });
  return mod.exports;
}

const { districtLandingPages, isDistrictPageIndexable } = loadTs('src/data/districtLandingPages.ts');
const { getAllZoneHubs, getPublishedLocalPoints } = loadTs('src/data/areaZonesData.ts');
const { posts } = loadTs('src/app/(marketing)/blog/posts.ts');
const { approvedRouteCorridors } = loadTs('src/data/approvedRouteCorridors.ts');
const { guidesData } = loadTs('src/data/guidesData.ts');
const { portfolioCasesData } = loadTs('src/data/mediaEvidence.ts');

const localSitemap = JSON.parse(fs.readFileSync('tools/local-sitemap-urls.json', 'utf8'));
const publishedUrls = localSitemap.map(u => new URL(u.url).pathname);
const publishedUrlSet = new Set(publishedUrls);

// Graph: targetUrl -> Array of { source, anchor, placement }
const graph = {};
publishedUrls.forEach(u => { graph[u] = []; });

function addLink(source, target, anchor, placement) {
  let cleanTarget = target.trim();
  if (cleanTarget.startsWith('http')) {
    try { cleanTarget = new URL(cleanTarget).pathname; } catch {}
  }
  if (cleanTarget.length > 1 && cleanTarget.endsWith('/')) {
    cleanTarget = cleanTarget.slice(0, -1);
  }
  try { cleanTarget = decodeURI(cleanTarget); } catch {}

  // Check against publishedUrlSet
  const matchingKey = [...publishedUrlSet].find(k => k === cleanTarget || decodeURI(k) === cleanTarget);
  if (matchingKey) {
    graph[matchingKey].push({ source, anchor, placement });
  }
}

// 1. Navbar (Sitewide)
addLink('Sitewide (Navbar)', '/areas', 'พื้นที่บริการทั้งหมด', 'header-dropdown');
addLink('Sitewide (Navbar)', '/portfolio', 'ผลงานการขนย้ายจริง', 'header-nav');
addLink('Sitewide (Navbar)', '/service/bkk-thonburi', 'กรุงเทพฯ ฝั่งธนบุรี (15 เขต)', 'header-dropdown');
addLink('Sitewide (Navbar)', '/areas/bkk-thonburi/bang-khae', 'ย่านเพชรเกษม–บางแค', 'header-dropdown');
addLink('Sitewide (Navbar)', '/service/samutsakhon', 'สมุทรสาคร (ฐานบริการหลัก)', 'header-dropdown');
addLink('Sitewide (Navbar)', '/areas/samutsakhon/maha-chai', 'มหาชัย–นิคมอุตสาหกรรม', 'header-dropdown');
addLink('Sitewide (Navbar)', '/service/samut-songkhram', 'สมุทรสงคราม', 'header-dropdown');
addLink('Sitewide (Navbar)', '/service/phuket', 'ภูเก็ต / สายใต้', 'header-dropdown');
addLink('Sitewide (Navbar)', '/service/bkk-phra-nakhon', 'กทม. ฝั่งพระนคร', 'header-dropdown');

// 2. Footer (Sitewide)
addLink('Sitewide (Footer)', '/pricing/motorcycle-2026', 'บริการขนส่งมอเตอร์ไซค์ทั่วไทย', 'footer-service-links');
addLink('Sitewide (Footer)', '/pricing/freight', 'รถกระบะตู้ทึบขนส่งสินค้าโรงงาน', 'footer-service-links');
addLink('Sitewide (Footer)', '/compare/moving-alone-vs-helpers', 'บริการพนักงานช่วยยกของ', 'footer-service-links');
addLink('Sitewide (Footer)', '/compare/pickup-vs-box-truck', 'เปรียบเทียบกระบะตู้ทึบ VS กระบะคอก', 'footer-service-links');
addLink('Sitewide (Footer)', '/compare/one-vehicle-vs-multiple-trips', 'ขนย้ายเที่ยวเดียว VS ขนย้ายหลายเที่ยว', 'footer-service-links');

addLink('Sitewide (Footer)', '/areas', 'เลือกพื้นที่ให้บริการทั้งหมด', 'footer-priority-areas');
addLink('Sitewide (Footer)', '/areas/samutsakhon/maha-chai', 'รถรับจ้างมหาชัย (สมุทรสาคร)', 'footer-priority-areas');
addLink('Sitewide (Footer)', '/areas/bang-khae', 'พื้นที่บริการบางแค–เพชรเกษม', 'footer-priority-areas');
addLink('Sitewide (Footer)', '/areas/bkk-thonburi/bang-khae', 'รถรับจ้างบางแค (พร้อมคนยก)', 'footer-priority-areas');
addLink('Sitewide (Footer)', '/areas/bkk-thonburi/nong-khaem', 'รถรับจ้างหนองแขม', 'footer-priority-areas');
addLink('Sitewide (Footer)', '/areas/bkk-thonburi/bang-bon', 'รถรับจ้างบางบอน', 'footer-priority-areas');
addLink('Sitewide (Footer)', '/areas/rama2-bangkradi', 'รถรับจ้างพระราม 2–บางกระดี่', 'footer-priority-areas');
addLink('Sitewide (Footer)', '/areas/phutthamonthon-sai-1-4', 'รถรับจ้างพุทธมณฑลสาย 1–4 ศาลายา', 'footer-priority-areas');
addLink('Sitewide (Footer)', '/areas/krathumbaen-omnoi', 'รถรับจ้างกระทุ่มแบน–อ้อมน้อย', 'footer-priority-areas');

addLink('Sitewide (Footer)', '/guides/truck-capacity-cbm', 'เช็กขนาดรถและคิวบรรทุก (CBM Guide)', 'footer-helpful-links');
addLink('Sitewide (Footer)', '/guides/condo-no-elevator', 'คู่มือขนย้ายคอนโดไม่มีลิฟต์', 'footer-helpful-links');
addLink('Sitewide (Footer)', '/blog/moving-house-checklist', 'คู่มือเตรียมตัวก่อนย้ายบ้านและหอพัก', 'footer-helpful-links');
addLink('Sitewide (Footer)', '/blog/prepare-motorcycle-transport', 'ขั้นตอนเตรียมรถมอเตอร์ไซค์ก่อนส่ง', 'footer-helpful-links');
addLink('Sitewide (Footer)', '/portfolio', 'ตัวอย่างผลงานการขนย้ายจริง (Portfolio)', 'footer-helpful-links');

// 3. Homepage (/)
addLink('/', '/pricing', 'ตรวจสอบอัตราค่าบริการ', 'hero-cta');
addLink('/', '/service/bkk-thonburi', 'บริการรถรับจ้างฝั่งธนบุรี', 'homepage-servicemap-hubs');
addLink('/', '/areas/bkk-thonburi/bang-khae', 'รถรับจ้างย่านเพชรเกษม–บางแค', 'homepage-servicemap-hubs');
addLink('/', '/service/samutsakhon', 'บริการรถรับจ้างสมุทรสาคร', 'homepage-servicemap-hubs');
addLink('/', '/areas/samutsakhon/maha-chai', 'รถรับจ้างมหาชัย–พระราม 2', 'homepage-servicemap-hubs');
addLink('/', '/areas', 'ดูภาพรวมพื้นที่บริการและจุดจอดรถทั้งหมด', 'homepage-servicemap-header');

// 7 Strategic Zones in ServiceMap on Homepage
getAllZoneHubs().forEach(z => {
  addLink('/', `/areas/${z.slug}`, `โซน ${z.thaiName}`, 'homepage-strategic-zones-grid');
});

// Recent Articles on Homepage (HomeArticleSection)
addLink('/', '/blog/how-to-request-quote-checklist', 'วิธีขอราคาประเมินรถรับจ้างให้แม่นยำ', 'homepage-articles');
addLink('/', '/blog/what-can-box-truck-carry', 'รถกระบะตู้ทึบจุของได้แค่ไหน?', 'homepage-articles');
addLink('/', '/blog/moving-condo-thonburi-elevator-parking', 'คู่มือย้ายคอนโดฝั่งธนบุรี', 'homepage-articles');
addLink('/', '/blog', 'ดูบทความทั้งหมด', 'homepage-articles-cta');

// 4. Areas Directory (/areas)
getAllZoneHubs().forEach(z => {
  addLink('/areas', `/areas/${z.slug}`, `โซน ${z.id}: ${z.thaiName}`, 'areas-directory-zone-hubs');
});
getPublishedLocalPoints().forEach(p => {
  if (p.action === 'new_page' || p.action === 'enrich_existing') {
    addLink('/areas', p.preferredUrl, p.thaiName, 'areas-directory-local-points-disclosure');
  }
});
addLink('/areas', '/service/samutsakhon', 'บริการรถรับจ้างสมุทรสาคร', 'areas-directory-featured-cards');
addLink('/areas', '/service/bkk-thonburi', 'บริการรถรับจ้างกรุงเทพฯ ฝั่งธนบุรี', 'areas-directory-featured-cards');
addLink('/areas', '/service/bangkok', 'บริการรถรับจ้างกรุงเทพมหานคร', 'areas-directory-featured-cards');
addLink('/areas', '/service/bkk-phra-nakhon', 'รถรับจ้างกรุงเทพฯ ฝั่งพระนคร', 'areas-directory-featured-cards');
addLink('/areas', '/service/samut-songkhram', 'บริการรถรับจ้างสมุทรสงคราม', 'areas-directory-featured-cards');
addLink('/areas', '/service/chonburi', 'บริการรถรับจ้างชลบุรีและภาคตะวันออก', 'areas-directory-featured-cards');
addLink('/areas', '/service/phuket', 'บริการรถรับจ้างภูเก็ตและเส้นทางสายใต้', 'areas-directory-featured-cards');
addLink('/areas', '/service/chiang-mai', 'บริการรถรับจ้างเชียงใหม่และภาคเหนือ', 'areas-directory-featured-cards');

// 5. Zone Hubs (/areas/[zone])
getAllZoneHubs().forEach(z => {
  const points = getPublishedLocalPoints().filter(p => p.zoneSlug === z.slug);
  points.forEach(pt => {
    addLink(`/areas/${z.slug}`, pt.preferredUrl, pt.thaiName, 'zone-hub-point-card');
  });
  (z.nearbyZones || []).forEach(nz => {
    addLink(`/areas/${z.slug}`, `/areas/${nz.slug}`, nz.name, 'zone-hub-nearby-zones');
  });
  if (z.transactionalServiceLink) {
    addLink(`/areas/${z.slug}`, z.transactionalServiceLink.href, z.transactionalServiceLink.anchor, 'zone-hub-transactional-callout');
  }
});

// 6. Blog List (/blog)
Object.entries(posts).forEach(([slug, post]) => {
  if (!post.isDraft) {
    addLink('/blog', `/blog/${slug}`, post.title, 'blog-hub-article-card');
  }
});

// 7. Portfolio List (/portfolio)
Object.entries(portfolioCasesData).forEach(([slug, c]) => {
  addLink('/portfolio', `/portfolio/${slug}`, c.title, 'portfolio-case-card');
  // Case study back links
  if (c.relatedServiceLink) addLink(`/portfolio/${slug}`, c.relatedServiceLink, 'บริการที่เกี่ยวข้อง', 'case-study-sidebar');
  if (c.relatedDistrictLink) addLink(`/portfolio/${slug}`, c.relatedDistrictLink, 'พื้นที่บริการย่อย', 'case-study-sidebar');
  if (c.relatedRouteLink) addLink(`/portfolio/${slug}`, c.relatedRouteLink, 'เส้นทางขนส่ง', 'case-study-sidebar');
});

// 8. Service Hubs (/service/[province])
const provinces = ['bangkok', 'samutsakhon', 'chonburi', 'bkk-thonburi', 'bkk-phra-nakhon', 'samut-songkhram', 'phuket', 'chiang-mai'];
provinces.forEach(prov => {
  ['moving', 'motorcycle', 'freight'].forEach(s => {
    addLink(`/service/${prov}`, `/service/${prov}/${s}`, `บริการ ${s} ในจังหวัด ${prov}`, 'province-subservice-triad');
    addLink(`/service/${prov}/${s}`, `/service/${prov}`, `ศูนย์บริการ ${prov}`, 'subservice-breadcrumbs');
  });
});
// Samut Sakhon child areas
addLink('/service/samutsakhon', '/areas/samutsakhon/maha-chai', 'มหาชัย – พระราม 2 (ตัวเมืองสมุทรสาคร)', 'province-child-areas');
addLink('/service/samutsakhon', '/areas/krathumbaen-omnoi/krathum-baen', 'กระทุ่มแบน (พุทธสาคร)', 'province-child-areas');
addLink('/service/samutsakhon', '/areas/maha-chai/ban-phaeo', 'บ้านแพ้ว (เกษตรกรรม)', 'province-child-areas');

// 9. Compare Pages (/compare/...)
const comparePages = [
  '/compare/pickup-vs-box-truck',
  '/compare/moving-alone-vs-helpers',
  '/compare/one-vehicle-vs-multiple-trips'
];
comparePages.forEach(src => {
  comparePages.filter(p => p !== src).forEach(target => {
    addLink(src, target, 'บทความเปรียบเทียบที่เกี่ยวข้อง', 'compare-cross-link-card');
  });
  addLink(src, '/guides/truck-capacity-cbm', 'ตารางคำนวณขนาดตู้และความจุสิ่งของ (CBM)', 'compare-guide-card');
  if (src === '/compare/pickup-vs-box-truck') {
    addLink(src, '/guides/moving-in-rain', 'ข้อแนะนำการขนย้ายสิ่งของช่วงหน้าฝน', 'compare-guide-card');
  }
  if (src === '/compare/moving-alone-vs-helpers') {
    addLink(src, '/guides/condo-no-elevator', 'คู่มือขนย้ายคอนโดและอาคารไม่มีลิฟต์', 'compare-guide-card');
  }
});

// 10. Pricing Pages (/pricing, /pricing/moving, /pricing/motorcycle-transport, /pricing/freight)
addLink('/pricing', '/pricing/moving', 'ราคารถรับจ้างย้ายบ้าน คอนโด', 'pricing-service-card');
addLink('/pricing', '/pricing/motorcycle-transport', 'ราคาขนส่งมอเตอร์ไซค์ บิ๊กไบค์', 'pricing-service-card');
addLink('/pricing', '/pricing/freight', 'ราคาเหมารถกระบะตู้ทึบขนส่งสินค้า', 'pricing-service-card');
addLink('/pricing', '/pricing/motorcycle-2026', 'อัปเดตราคาขนส่งมอเตอร์ไซค์ 2569', 'pricing-callout');

addLink('/pricing/moving', '/guides/condo-no-elevator', 'คู่มือย้ายคอนโดและหอพักที่ไม่มีลิฟต์', 'pricing-moving-guide');
addLink('/pricing/moving', '/guides/one-bedroom-condo-move', 'แนวทางเตรียมตัวขนย้ายคอนโด 1 ห้องนอน', 'pricing-moving-guide');
addLink('/pricing/moving', '/compare/one-vehicle-vs-multiple-trips', 'เปรียบเทียบขนย้ายเที่ยวเดียวจบ VS หลายเที่ยว', 'pricing-moving-compare');
addLink('/pricing/moving', '/compare/moving-alone-vs-helpers', 'ย้ายของเองหรือจ้างคนช่วยยกเพิ่ม', 'pricing-moving-compare');
addLink('/pricing/moving', '/guides/truck-capacity-cbm', 'คำนวณคิวตู้บรรทุก', 'pricing-moving-guide');

addLink('/pricing/motorcycle-transport', '/guides/prep-motorcycle-transport', 'ขั้นตอนและวิธีเตรียมรถมอเตอร์ไซค์ก่อนส่งข้ามจังหวัด', 'pricing-moto-guide');
addLink('/pricing/motorcycle-transport', '/pricing/motorcycle-2026', 'อัปเดตราคาขนส่งมอเตอร์ไซค์ 2569', 'pricing-moto-table');
addLink('/pricing/motorcycle-2026', '/guides/prep-motorcycle-transport', 'ขั้นตอนและวิธีเตรียมรถมอเตอร์ไซค์ก่อนส่งข้ามจังหวัด', 'pricing-moto-guide');

// 11. Approved Route Corridors (InternalLinks on all service/route/pricing pages)
approvedRouteCorridors.forEach(({ from, to }) => {
  addLink('Contextual (InternalLinks)', `/route/${from}/${to}`, `${from} ⇄ ${to}`, 'internal-links-popular-routes');
});

// 12. Local Point Views (/areas/[zone]/[locality])
getPublishedLocalPoints().forEach(p => {
  if (p.action === 'new_page' || p.action === 'enrich_existing') {
    addLink(p.preferredUrl, `/areas/${p.zoneSlug}`, `โซน ${p.zoneSlug}`, 'local-point-breadcrumb-and-parent');
    addLink(p.preferredUrl, '/areas', 'พื้นที่บริการทั้งหมด', 'local-point-breadcrumb');
    (p.nearbyAreas || []).forEach(nb => {
      addLink(p.preferredUrl, nb.url, nb.name, 'local-point-nearby-card');
    });
  }
});

// Output Summary
let orphanCount = 0;
const orphanList = [];
const linkCountDist = {};

for (const [url, links] of Object.entries(graph)) {
  const uniqueSources = new Set(links.map(l => l.source));
  const c = uniqueSources.size;
  linkCountDist[c] = (linkCountDist[c] || 0) + 1;
  if (c === 0) {
    orphanCount++;
    orphanList.push(url);
  }
}

console.log('==============================================');
console.log('📊 COMPLETE INTERNAL CRAWL GRAPH AUDIT');
console.log('==============================================');
console.log('Total Published URLs in Sitemap:', publishedUrls.length);
console.log('Total Orphan Pages (0 inlinks):', orphanCount);
if (orphanCount > 0) {
  orphanList.forEach(o => console.log('  ❌ ORPHAN:', o));
} else {
  console.log('  🎉 ZERO ORPHAN PAGES! All 155 published URLs have crawlable incoming links!');
}
console.log('\nInlink Count Distribution (by unique source pages):', linkCountDist);

fs.writeFileSync('tools/complete-crawl-graph.json', JSON.stringify(graph, null, 2), 'utf8');

