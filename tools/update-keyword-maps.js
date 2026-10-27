const fs = require('fs');
const path = require('path');
const ts = require('typescript');

const areaFile = path.join(__dirname, '../src/data/areaZonesData.ts');
const code = fs.readFileSync(areaFile, 'utf8');
const js = ts.transpileModule(code, { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2022 } }).outputText;
const mod = { exports: {} };
new Function('module', 'exports', 'require', js)(mod, mod.exports, require);
const { getAllLocalPoints } = mod.exports;

const points = getAllLocalPoints();

const headers = [
  'Point ID',
  'Zone',
  'Locality',
  'Preferred URL',
  'Primary Keyword',
  'Supporting Keywords',
  'Search Intent',
  'Action',
  'Publication Status',
  'Draft Reason / Operational Notes'
];

function escapeCsv(val) {
  if (val === undefined || val === null) return '""';
  const str = String(val).replace(/"/g, '""');
  return `"${str}"`;
}

const rows = [headers.join(',')];

for (const p of points) {
  const supKw = Array.isArray(p.supportingKeywords) ? p.supportingKeywords.join('; ') : '';
  const note = p.status === 'draft' ? (p.draftReason || 'Draft') : (p.action === 'enrich_existing' ? 'Enriched existing corridor' : (p.action === 'existing_reused' ? 'Reused established district' : 'Verified local page'));
  rows.push([
    p.pointId,
    escapeCsv(p.zoneSlug),
    escapeCsv(`${p.thaiName} (${p.disambiguation})`),
    escapeCsv(p.preferredUrl),
    escapeCsv(p.primaryKeyword),
    escapeCsv(supKw),
    escapeCsv(p.searchIntent),
    escapeCsv(p.action),
    escapeCsv(p.status),
    escapeCsv(note)
  ].join(','));
}

const csvContent = rows.join('\n');

fs.writeFileSync(path.join(__dirname, '../keyword-map.csv'), csvContent, 'utf8');

const docsDir = path.join(__dirname, '../docs');
if (!fs.existsSync(docsDir)) {
  fs.mkdirSync(docsDir, { recursive: true });
}
fs.writeFileSync(path.join(docsDir, 'keyword-map.csv'), csvContent, 'utf8');

console.log(`✅ keyword-map.csv and docs/keyword-map.csv updated with ${points.length} entries.`);
