const fs = require('fs');

// Load live sitemap URLs
const liveUrls = new Set(JSON.parse(fs.readFileSync('tools/live-sitemap-urls.json', 'utf8')));

// Load local sitemap URLs
const localSitemap = JSON.parse(fs.readFileSync('tools/local-sitemap-urls.json', 'utf8'));
const localUrls = new Set(localSitemap.map(u => u.url));

console.log('Live Sitemap URL count:', liveUrls.size);
console.log('Local Sitemap URL count:', localUrls.size);

// Missing in live sitemap (in local but not live)
const missingInLive = [...localUrls].filter(u => !liveUrls.has(u));
console.log('\n--- In Local Sitemap but NOT in Live Sitemap (' + missingInLive.length + ') ---');
missingInLive.forEach(u => console.log(' +', u));

// In live sitemap but NOT in local sitemap
const missingInLocal = [...liveUrls].filter(u => !localUrls.has(u));
console.log('\n--- In Live Sitemap but NOT in Local Sitemap (' + missingInLocal.length + ') ---');
missingInLocal.forEach(u => console.log(' -', u));

// Shared
const shared = [...localUrls].filter(u => liveUrls.has(u));
console.log('\nShared between Live and Local:', shared.length);
