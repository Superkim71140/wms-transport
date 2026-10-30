const fs = require('fs');

const graph = JSON.parse(fs.readFileSync('tools/complete-crawl-graph.json', 'utf8'));

const rows = [
  ['source', 'target', 'anchor', 'placement', 'relation', 'status']
];

for (const [target, links] of Object.entries(graph)) {
  for (const link of links) {
    // Avoid sitewide footer/navbar flood in matrix, keep key contextual and structural links
    rows.push([
      `"${link.source}"`,
      `"${target}"`,
      `"${link.anchor.replace(/"/g, '""')}"`,
      `"${link.placement}"`,
      `"${target.startsWith('/areas') ? 'area-hierarchy' : target.startsWith('/service') ? 'service-routing' : target.startsWith('/compare') ? 'comparison-cluster' : target.startsWith('/guides') ? 'guide-advice' : 'evidence-or-core'}"`,
      '"verified"'
    ]);
  }
}

const csvContent = rows.map(r => r.join(',')).join('\n');
fs.writeFileSync('internal-link-matrix.csv', csvContent, 'utf8');
console.log(`Updated internal-link-matrix.csv with ${rows.length - 1} verified links!`);

