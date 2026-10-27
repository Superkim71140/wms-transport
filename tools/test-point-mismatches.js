const { execSync } = require('child_process');
const fs = require('fs');

async function main() {
  const tsCode = `
import { getPublishedLocalPoints } from './src/data/areaZonesData';

const pts = getPublishedLocalPoints().filter(p => p.action === 'new_page' || p.action === 'enrich_existing');
const mismatches = pts.filter(p => p.preferredUrl !== '/areas/' + p.zoneSlug + '/' + p.slug);
console.log('Action new_page or enrich_existing count:', pts.length);
console.log('Mismatches:', mismatches.length);
`;

  fs.writeFileSync('temp-check2.ts', tsCode, 'utf8');
  try {
    const res = execSync('npx tsx temp-check2.ts');
    console.log(res.toString());
  } finally {
    if (fs.existsSync('temp-check2.ts')) fs.unlinkSync('temp-check2.ts');
  }
}

main().catch(console.error);
