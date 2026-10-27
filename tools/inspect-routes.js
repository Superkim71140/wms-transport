const { execSync } = require('child_process');
const fs = require('fs');

async function main() {
  const tsCode = `
import { getAllZoneHubs, getPublishedLocalPoints, getDraftLocalPoints, getAllLocalPoints } from './src/data/areaZonesData';
import { districtLandingPages, isDistrictPageIndexable } from './src/data/districtLandingPages';
import { posts } from './src/app/(marketing)/blog/posts';
import { approvedRouteCorridors } from './src/data/approvedRouteCorridors';
import { portfolioCasesData } from './src/data/mediaEvidence';
import { guidesData } from './src/data/guidesData';

const pts = getPublishedLocalPoints();
const mismatches = pts.filter(p => p.preferredUrl !== '/areas/' + p.zoneSlug + '/' + p.slug);

console.log(JSON.stringify({
  zoneHubs: getAllZoneHubs().length,
  localPointsPublished: pts.length,
  localPointsDraft: getDraftLocalPoints().length,
  localPointsTotal: getAllLocalPoints().length,
  preferredUrlMismatches: mismatches.map(m => ({ slug: m.slug, pref: m.preferredUrl, expected: '/areas/' + m.zoneSlug + '/' + m.slug })),
  districtsTotal: Object.keys(districtLandingPages).length,
  districtsPublished: Object.values(districtLandingPages).filter(isDistrictPageIndexable).length,
  districtsDraft: Object.values(districtLandingPages).filter(d => !isDistrictPageIndexable(d)).length,
  postsTotal: Object.keys(posts).length,
  postsDrafts: Object.values(posts).filter(p => p.isDraft).length,
  routes: approvedRouteCorridors.length,
  portfolio: Object.keys(portfolioCasesData).length,
  guides: Object.keys(guidesData).length
}, null, 2));
`;

  fs.writeFileSync('temp-check.ts', tsCode, 'utf8');
  try {
    const res = execSync('npx tsx temp-check.ts');
    console.log(res.toString());
  } finally {
    if (fs.existsSync('temp-check.ts')) fs.unlinkSync('temp-check.ts');
  }
}

main().catch(console.error);
