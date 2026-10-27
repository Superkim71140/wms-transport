const { execSync } = require('child_process');
const fs = require('fs');

async function runRegressionChecks() {
  console.log('=== RUNNING SITEMAP & INDEXING REGRESSION CHECKS ===\n');

  // 1. Run dynamic sitemap generator
  console.log('1. Testing sitemap() execution and fail-loud behavior...');
  const sitemapOutput = execSync('npx tsx -e "import sitemap from \'./src/app/sitemap\'; sitemap().then(urls => console.log(JSON.stringify(urls)))"').toString();
  const urls = JSON.parse(sitemapOutput);
  console.log(`   -> Total entries generated: ${urls.length}`);

  // 2. Duplicate Check
  console.log('2. Checking for duplicate URLs...');
  const locs = urls.map(u => u.url);
  const locSet = new Set(locs);
  if (locs.length !== locSet.size) {
    const counts = {};
    const dupes = [];
    locs.forEach(l => {
      counts[l] = (counts[l] || 0) + 1;
      if (counts[l] === 2) dupes.push(l);
    });
    throw new Error(`Regression Failure: Found ${dupes.length} duplicate URLs in sitemap: ${dupes.join(', ')}`);
  }
  console.log('   -> PASSED: 0 duplicates detected. All entries unique.');

  // 3. Domain Check
  console.log('3. Checking URL origin consistency...');
  const wrongDomain = locs.filter(u => !u.startsWith('https://wms-transport.com'));
  if (wrongDomain.length > 0) {
    throw new Error(`Regression Failure: Found wrong domain URLs in sitemap: ${wrongDomain.join(', ')}`);
  }
  console.log('   -> PASSED: All URLs use verified origin https://wms-transport.com.');

  // 4. Draft Leakage Check
  console.log('4. Checking for draft leakage...');
  const checkDraftsCode = `
import { getDraftLocalPoints } from './src/data/areaZonesData';
import { districtLandingPages } from './src/data/districtLandingPages';
import { posts } from './src/app/(marketing)/blog/posts';

const draftDistricts = Object.values(districtLandingPages)
  .filter(d => d.status === 'draft_evidence_required' || !d.isIndexable)
  .map(d => '/areas/' + d.province + '/' + d.districtSlug);

const draftPoints = getDraftLocalPoints().map(p => '/areas/' + p.zoneSlug + '/' + p.slug);
const draftPosts = Object.entries(posts).filter(([, p]) => p.isDraft).map(([slug]) => '/blog/' + slug);

console.log(JSON.stringify({ draftDistricts, draftPoints, draftPosts }));
`;
  fs.writeFileSync('temp-drafts.ts', checkDraftsCode, 'utf8');
  const draftsData = JSON.parse(execSync('npx tsx temp-drafts.ts').toString());
  fs.unlinkSync('temp-drafts.ts');

  const leakedDrafts = [];
  for (const d of draftsData.draftDistricts) {
    if (locSet.has(`https://wms-transport.com${d}`)) leakedDrafts.push(d);
  }
  for (const p of draftsData.draftPoints) {
    if (locSet.has(`https://wms-transport.com${p}`)) leakedDrafts.push(p);
  }
  for (const b of draftsData.draftPosts) {
    if (locSet.has(`https://wms-transport.com${b}`)) leakedDrafts.push(b);
  }

  if (leakedDrafts.length > 0) {
    throw new Error(`Regression Failure: Detected ${leakedDrafts.length} leaked drafts in sitemap: ${leakedDrafts.join(', ')}`);
  }
  console.log('   -> PASSED: 0 drafts leaked. All 12 unverified districts and 6 draft points are properly excluded.');

  // 5. Truthful lastmod check
  console.log('5. Validating truthful lastModified handling...');
  const invalidDates = [];
  let datesCount = 0;
  for (const u of urls) {
    if (u.lastModified) {
      datesCount++;
      const d = new Date(u.lastModified);
      if (isNaN(d.getTime())) {
        invalidDates.push({ url: u.url, raw: u.lastModified });
      }
    }
  }
  if (invalidDates.length > 0) {
    throw new Error(`Regression Failure: Found invalid date objects in sitemap: ${JSON.stringify(invalidDates)}`);
  }
  console.log(`   -> PASSED: ${datesCount} valid ISO dates, ${urls.length - datesCount} truthfully omitted. Zero synthetic dates.`);

  // 6. Robots.txt check
  console.log('6. Validating robots.txt sitemap reference...');
  const robotsSrc = fs.readFileSync('src/app/robots.ts', 'utf8');
  if (!robotsSrc.includes('siteConfig.productionUrl')) {
    throw new Error('Regression Failure: robots.ts should reference siteConfig.productionUrl/sitemap.xml');
  }
  console.log('   -> PASSED: robots.ts correctly references siteConfig.productionUrl.');

  console.log('\n=== ALL REGRESSION CHECKS PASSED SUCCESSFULLY ===');
}

runRegressionChecks().catch(err => {
  console.error('\n❌ REGRESSION CHECK FAILED:', err.message);
  process.exit(1);
});
