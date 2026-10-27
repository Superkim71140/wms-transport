const https = require('https');
const fs = require('fs');

https.get('https://wms-transport.com/sitemap.xml', (res) => {
  let xml = '';
  res.on('data', chunk => xml += chunk);
  res.on('end', () => {
    fs.writeFileSync('tools/live-sitemap.xml', xml, 'utf8');
    
    // Extract loc tags
    const locMatches = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => m[1]);
    const lastmodMatches = [...xml.matchAll(/<lastmod>([^<]+)<\/lastmod>/g)].map(m => m[1]);
    
    console.log('Total URLs in live sitemap:', locMatches.length);
    console.log('Unique URLs in live sitemap:', new Set(locMatches).size);
    
    // Group by category/prefix
    const categorized = {};
    locMatches.forEach(url => {
      const u = new URL(url);
      const segments = u.pathname.split('/').filter(Boolean);
      const prefix = segments.length > 0 ? segments[0] : 'root';
      categorized[prefix] = (categorized[prefix] || 0) + 1;
    });
    
    console.log('URLs by section:', categorized);
    
    fs.writeFileSync('tools/live-sitemap-urls.json', JSON.stringify(locMatches, null, 2), 'utf8');
    console.log('Saved to tools/live-sitemap-urls.json and tools/live-sitemap.xml');
  });
});
