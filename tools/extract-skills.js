const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const zips = [
  'skills-seo-google.zip',
  'skills-seo-images.zip',
  'skills-seo-keyword-cluster.zip',
  'skills-seo-local.zip',
  'skills-seo-page.zip',
  'skills-seo-schema.zip'
];

const destBase = path.join(__dirname, 'seo-skills');
if (!fs.existsSync(destBase)) {
  fs.mkdirSync(destBase, { recursive: true });
}

for (const zip of zips) {
  const zipPath = path.join(__dirname, '..', zip);
  const targetDir = path.join(destBase, path.basename(zip, '.zip'));
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  console.log(`Extracting ${zip} to ${targetDir}...`);
  // Use tar which is built-in on modern Windows
  try {
    execSync(`tar -xf "${zipPath}" -C "${targetDir}"`, { stdio: 'inherit' });
    console.log(`Extracted ${zip}`);
  } catch (err) {
    console.error(`Failed to extract ${zip}:`, err.message);
  }
}
console.log('Extraction complete.');
