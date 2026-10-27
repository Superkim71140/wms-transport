// Test what sitemap() returns in current workspace
async function test() {
  // Using dynamic import with tsx or transpiled
  const { execSync } = require('child_process');
  const res = execSync('npx tsx -e "import sitemap from \'./src/app/sitemap\'; sitemap().then(urls => console.log(JSON.stringify(urls, null, 2)))"', { maxBuffer: 10 * 1024 * 1024 });
  const urls = JSON.parse(res.toString());
  console.log('Total URLs returned by local sitemap():', urls.length);
  const locs = urls.map(u => u.url);
  console.log('Unique URLs:', new Set(locs).size);
  
  const categorized = {};
  locs.forEach(url => {
    const u = new URL(url);
    const segments = u.pathname.split('/').filter(Boolean);
    const prefix = segments.length > 0 ? segments[0] : 'root';
    categorized[prefix] = (categorized[prefix] || 0) + 1;
  });
  console.log('Local sitemap URLs by section:', categorized);
  
  const fs = require('fs');
  fs.writeFileSync('tools/local-sitemap-urls.json', JSON.stringify(urls, null, 2), 'utf8');
}

test().catch(console.error);
