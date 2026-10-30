const fs = require('fs');
const code = fs.readFileSync('src/app/(marketing)/page.tsx', 'utf8');
const links = [...code.matchAll(/href=["']([^"']+)["']/g)].map(m => m[1]);
console.log('Homepage hrefs count:', links.length);
console.log('Unique hrefs on homepage:', [...new Set(links)]);

const areaLinks = [...new Set(links)].filter(l => l.includes('area'));
console.log('Area links on homepage:', areaLinks);

