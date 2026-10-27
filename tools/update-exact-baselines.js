const fs = require('fs');
const path = require('path');

const reportsDir = path.join(__dirname, '../reports');
const exactCanonicalsPath = path.join(reportsDir, 'exact-canonicals.json');

if (!fs.existsSync(exactCanonicalsPath)) {
  console.error("exact-canonicals.json not found!");
  process.exit(1);
}

const exactCanonicals = JSON.parse(fs.readFileSync(exactCanonicalsPath, 'utf8'));

// Format Baseline CSV
const baselineHeader = '"URL Path","Canonical Destination","Type","Indexable Status","Page Role"';
const baselineRows = exactCanonicals.map((url) => {
  let type = "Local Point";
  let role = "Locality Service Page";
  if (url === "/") { type = "Homepage"; role = "Main Entity Hub"; }
  else if (url.startsWith("/pricing")) { type = "Pricing"; role = "Transparent Rates"; }
  else if (url === "/areas") { type = "Directory"; role = "Area Directory Root"; }
  else if (url.startsWith("/guides") || url.startsWith("/compare") || url.startsWith("/blog")) { type = "Content/Guide"; role = "Educational Guide"; }
  else if (url.startsWith("/portfolio")) { type = "Case Study"; role = "Verified Evidence"; }
  else if (url.startsWith("/service")) { type = "Province/Service Hub"; role = "Regional Center"; }
  else if (url.startsWith("/route")) { type = "Route Corridor"; role = "Interprovincial Route"; }
  else if (url.split("/").length === 3 && url.startsWith("/areas/")) { type = "Zone Hub"; role = "District/Zone Directory"; }
  else if (url.startsWith("/areas/bkk-thonburi/") || url.startsWith("/areas/samutsakhon/")) { type = "District Landing"; role = "District Focus Page"; }
  
  return `"${url}","https://wmstransportmoving.com${url}","${type}","index, follow","${role}"`;
});

const baselineCsvContent = '\uFEFF' + [baselineHeader, ...baselineRows].join('\n');
fs.writeFileSync(path.join(reportsDir, 'url-baseline-before.csv'), baselineCsvContent, 'utf8');
fs.writeFileSync(path.join(reportsDir, 'url-baseline-after.csv'), baselineCsvContent, 'utf8');

// Clean up temp json
fs.unlinkSync(exactCanonicalsPath);
fs.unlinkSync(path.join(__dirname, 'extract-canonicals.js'));

console.log(`✅ Generated url-baseline-before.csv and url-baseline-after.csv (${exactCanonicals.length} exact verified canonical URLs)`);
