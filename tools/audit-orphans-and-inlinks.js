const fs = require('fs');
const path = require('path');

// 1. Load the 155 sitemap URLs
const localSitemap = JSON.parse(fs.readFileSync('tools/local-sitemap-urls.json', 'utf8'));
const targetUrls = localSitemap.map(u => new URL(u.url).pathname);
const targetUrlSet = new Set(targetUrls);

console.log('Auditing inlinks for all', targetUrls.length, 'published URLs...');

// 2. Scan all tsx/ts files in src
const inlinks = {};
targetUrls.forEach(url => { inlinks[url] = []; });

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith('.tsx') || file.endsWith('.ts')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const relPath = path.relative(process.cwd(), fullPath).replace(/\\/g, '/');
      
      // Match hrefs
      const matches = content.matchAll(/href=["'`](\/[^"'`#?]*)["'`]/g);
      for (const m of matches) {
        let dest = m[1];
        if (dest.length > 1 && dest.endsWith('/')) dest = dest.slice(0, -1);
        if (inlinks[dest]) {
          inlinks[dest].push({ sourceFile: relPath, raw: m[0] });
        }
      }
    }
  }
}

scanDir(path.join(__dirname, '../src'));

// Analyze results
const orphanUrls = [];
const lowInlinkUrls = []; // <= 2 inlinks
const wellLinkedUrls = [];

targetUrls.forEach(url => {
  const links = inlinks[url] || [];
  const uniqueSources = [...new Set(links.map(l => l.sourceFile))];
  if (uniqueSources.length === 0) {
    orphanUrls.push({ url, sources: uniqueSources });
  } else if (uniqueSources.length <= 2) {
    lowInlinkUrls.push({ url, count: uniqueSources.length, sources: uniqueSources });
  } else {
    wellLinkedUrls.push({ url, count: uniqueSources.length });
  }
});

console.log('\n--- ORPHAN PAGES (0 inlinks across src) ---');
console.log('Count:', orphanUrls.length);
orphanUrls.forEach(o => console.log('  ORPHAN:', o.url));

console.log('\n--- LOW INLINK PAGES (1-2 source files) ---');
console.log('Count:', lowInlinkUrls.length);
lowInlinkUrls.forEach(l => console.log('  LOW (' + l.count + '):', l.url, 'from:', l.sources));

console.log('\n--- WELL LINKED PAGES ---');
console.log('Count:', wellLinkedUrls.length);

fs.writeFileSync('tools/orphan-audit-results.json', JSON.stringify({
  orphanUrls,
  lowInlinkUrls,
  wellLinkedUrls
}, null, 2), 'utf8');

