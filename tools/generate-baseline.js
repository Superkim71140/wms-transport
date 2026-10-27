const fs = require('fs');
const path = require('path');
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
    if (p === './site-config' || p === '@/lib/seo/site-config') return loadTs('src/lib/seo/site-config.ts');
    if (p === './schema' || p === '@/lib/seo/schema') return loadTs('src/lib/seo/schema.ts');
    if (p === './breadcrumbs' || p === '@/lib/seo/breadcrumbs') return loadTs('src/lib/seo/breadcrumbs.ts');
    if (p === '@/data/searchIntentMap' || p === './searchIntentMap') return loadTs('src/data/searchIntentMap.ts');
    if (p === '@/data/districtLandingPages' || p === './districtLandingPages') return loadTs('src/data/districtLandingPages.ts');
    if (p === '@/data/guidesData' || p === './guidesData') return loadTs('src/data/guidesData.ts');
    if (p === '@/data/mediaEvidence' || p === './mediaEvidence') return loadTs('src/data/mediaEvidence.ts');
    if (p === '@/data/approvedRouteCorridors' || p === './approvedRouteCorridors') return loadTs('src/data/approvedRouteCorridors.ts');
    if (p === '@/data/areaZonesData' || p === './areaZonesData') return loadTs('src/data/areaZonesData.ts');
    throw new Error('Not supported: ' + p);
  }, path.dirname(fullPath), fullPath);
  return mod.exports;
}

const { siteConfig } = loadTs('src/lib/seo/site-config.ts');
const { searchIntentMap } = loadTs('src/data/searchIntentMap.ts');
const { districtLandingPages, isDistrictPageIndexable } = loadTs('src/data/districtLandingPages.ts');
const { ZONE_HUBS, LOCAL_POINTS } = loadTs('src/data/areaZonesData.ts');
const { guidesData } = loadTs('src/data/guidesData.ts');
const { portfolioCasesData } = loadTs('src/data/mediaEvidence.ts');
const { approvedRouteCorridors } = loadTs('src/data/approvedRouteCorridors.ts');

let md = '# WMS TRANSPORT Existing URL and Content Baseline\n\n';
md += 'Generated: ' + new Date().toISOString() + '\n\n';
md += 'This document records the exact baseline of all existing public URLs, canonical paths, publication statuses, search intents, keyword ownership, geographic scopes, and evidence references before modifications.\n\n';

md += '## 1. Summary Overview\n\n';
md += '| Category | Total Records | Published / Indexable | Draft / Non-Indexable |\n';
md += '| :--- | :--- | :--- | :--- |\n';

const coreCount = Object.keys(searchIntentMap).length;
const zoneCount = Object.keys(ZONE_HUBS).length;
const distCount = Object.keys(districtLandingPages).length;
const distPub = Object.values(districtLandingPages).filter(isDistrictPageIndexable).length;
const pointCount = Object.keys(LOCAL_POINTS).length;
const pointPub = Object.values(LOCAL_POINTS).filter(p => p.status === 'published').length;
const provCount = 7; // bkk-thonburi, samutsakhon, bangkok, chonburi, chiang-mai, phuket, samut-songkhram
const provSubCount = provCount * 3;
const routeCount = approvedRouteCorridors.length;
const blogCount = 3;
const guideCount = Object.keys(guidesData).length;
const portfolioCount = Object.keys(portfolioCasesData).length;

md += `| Core Pages & Intent Guides | ${coreCount} | ${coreCount} | 0 |\n`;
md += `| Regional & Provincial Service Hubs | ${provCount} | ${provCount} | 0 |\n`;
md += `| Provincial Service Subpages | ${provSubCount} | ${provSubCount} | 0 |\n`;
md += `| Approved Inter-provincial Routes | ${routeCount} | ${routeCount} | 0 |\n`;
md += `| Blog Articles | ${blogCount} | ${blogCount} | 0 |\n`;
md += `| Guides | ${guideCount} | ${guideCount} | 0 |\n`;
md += `| Portfolio Case Studies | ${portfolioCount} | ${portfolioCount} | 0 |\n`;
md += `| Strategic Commercial Zone Hubs (/areas/{zone}) | ${zoneCount} | ${zoneCount} | 0 |\n`;
md += `| District Landing Pages (districtLandingPages.ts) | ${distCount} | ${distPub} | ${distCount - distPub} |\n`;
md += `| Locality Points Inventory (keyword-map.csv / LOCAL_POINTS) | ${pointCount} | ${pointPub} | ${pointCount - pointPub} |\n\n`;

md += '## 2. Strategic Commercial Zone Hubs (/areas/[zone])\n\n';
md += '| Zone Hub URL | Zone Name | Primary Intent | Geographic Scope | Role & Ownership | Publication Status |\n';
md += '| :--- | :--- | :--- | :--- | :--- | :--- |\n';
for (const hub of Object.values(ZONE_HUBS)) {
  md += `| \`/areas/${hub.slug}\` | ${hub.thaiName} | ${hub.title} | Commercial Zone ${hub.zoneNumber} | Zone Directory & Locality Gateway | Published |\n`;
}

md += '\n## 3. District Landing Pages Inventory (src/data/districtLandingPages.ts)\n\n';
md += '| URL | Province | District Thai Name | Primary Search Intent | Publication Status | Proof Score | Evidence IDs |\n';
md += '| :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n';
for (const d of Object.values(districtLandingPages)) {
  const pub = isDistrictPageIndexable(d) ? 'Published (Indexable)' : 'Draft (Evidence Required)';
  md += `| \`/areas/${d.province}/${d.districtSlug}\` | ${d.province} | ${d.districtThaiName} | ${d.primaryIntent} | ${pub} | ${d.proofScore} | ${d.projectEvidenceIds.join(', ') || 'None'} |\n`;
}

md += '\n## 4. Complete Locality Points Inventory (keyword-map.csv / LOCAL_POINTS)\n\n';
md += '| ID | Preferred URL | Locality | Zone | Primary Keyword | Search Intent | Action | Status | Notes / Draft Reason |\n';
md += '| :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- | :--- |\n';
for (const p of Object.values(LOCAL_POINTS)) {
  const note = p.status === 'draft' ? (p.draftReason || '-') : (p.action === 'existing_reused' ? 'Reused established district' : 'Verified local page');
  md += `| ${p.pointId} | \`${p.preferredUrl}\` | ${p.thaiName} | ${p.zoneSlug} | ${p.primaryKeyword} | ${p.searchIntent} | ${p.action} | ${p.status} | ${note} |\n`;
}

fs.writeFileSync(path.join(ROOT, 'docs/existing-url-baseline.md'), md, 'utf8');
console.log('Successfully wrote docs/existing-url-baseline.md');
