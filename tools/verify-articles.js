const fs = require('fs');
const { execSync } = require('child_process');

// Load live sitemap URLs
const liveUrls = new Set(JSON.parse(fs.readFileSync('tools/live-sitemap-urls.json', 'utf8')));

// Inspect posts from tsx
const tsCode = `
import { posts } from './src/app/(marketing)/blog/posts';

const list = Object.entries(posts).map(([slug, p]) => {
  const sectionsCount = Array.isArray(p.sections) ? p.sections.length : 0;
  const sectionsLength = Array.isArray(p.sections) 
    ? p.sections.reduce((acc, s) => acc + s.title.length + s.content.length + (s.bullets ? s.bullets.join('').length : 0), 0)
    : 0;
  
  return {
    slug,
    title: p.title,
    description: p.description,
    dateISO: p.dateISO,
    isDraft: p.isDraft,
    readTime: p.readTime,
    directAnswerLength: (p.directAnswer || '').length,
    sectionsCount,
    sectionsLength,
    checklistCount: Array.isArray(p.checklist) ? p.checklist.length : 0,
    hasDecisionAid: !!p.decisionAid,
    hasAuthenticExample: !!p.authenticExample,
    relatedLinksCount: Array.isArray(p.relatedLinks) ? p.relatedLinks.length : 0,
    relatedLinks: (p.relatedLinks || []).map(l => ({ title: l.title, href: l.href })),
    author: p.author,
    category: p.category,
    image: p.image
  };
});

console.log(JSON.stringify(list, null, 2));
`;

fs.writeFileSync('temp-inspect-posts.ts', tsCode, 'utf8');
const output = execSync('npx tsx temp-inspect-posts.ts').toString();
fs.unlinkSync('temp-inspect-posts.ts');

const allPosts = JSON.parse(output);
console.log(`Total posts in code: ${allPosts.length}`);

const deployedPosts = allPosts.filter(p => liveUrls.has(`https://wms-transport.com/blog/${p.slug}`) || liveUrls.has(`https://wms-transport.com/blog/${encodeURI(p.slug)}`));
const undeployedPosts = allPosts.filter(p => !liveUrls.has(`https://wms-transport.com/blog/${p.slug}`) && !liveUrls.has(`https://wms-transport.com/blog/${encodeURI(p.slug)}`));

console.log(`Deployed on production: ${deployedPosts.length}`);
console.log(`Undeployed (new in local workspace): ${undeployedPosts.length}`);

console.log('\n--- VERIFICATION OF THE 9 UNDEPLOYED ARTICLES ---');
undeployedPosts.forEach((p, idx) => {
  console.log(`\n[${idx + 1}] Slug: ${p.slug}`);
  console.log(`    Title: ${p.title}`);
  console.log(`    DateISO: ${p.dateISO} | Draft: ${p.isDraft || false}`);
  console.log(`    Direct Answer (${p.directAnswerLength} chars)`);
  console.log(`    Sections (${p.sectionsCount} sections, ~${p.sectionsLength} chars)`);
  console.log(`    Checklist items: ${p.checklistCount} | Decision Aid: ${p.hasDecisionAid} | Authentic Example: ${p.hasAuthenticExample}`);
  console.log(`    Related Links (${p.relatedLinksCount}):`);
  p.relatedLinks.forEach(l => console.log(`      -> ${l.title} (${l.href})`));
});
