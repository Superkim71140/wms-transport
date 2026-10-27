const fs = require('fs');
const path = require('path');

// 1. Check districtLandingPages
const dlpContent = fs.readFileSync('src/data/districtLandingPages.ts', 'utf8');
const dlpMatches = [...dlpContent.matchAll(/"([a-z0-9-]+)":\s*\{/g)].map(m => m[1]);
console.log('districtLandingPages keys:', dlpMatches);

// Check which are published
const published = [];
const lines = dlpContent.split('\n');
let currentKey = '';
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  const m = line.match(/^\s*"([a-z0-9-]+)":\s*\{/);
  if (m) currentKey = m[1];
  if (line.includes("status: 'published'")) {
    published.push(currentKey);
  }
}
console.log('Published districts in districtLandingPages:', published);

// Check routes in src/app/(marketing)/areas
function listFiles(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    const full = path.join(dir, file);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      results = results.concat(listFiles(full));
    } else {
      results.push(full);
    }
  }
  return results;
}

console.log('\nFiles under src/app/(marketing)/areas:');
console.log(listFiles('src/app/(marketing)/areas'));

console.log('\nFiles under src/app/(marketing)/service:');
console.log(listFiles('src/app/(marketing)/service'));
