const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ZIP_NAME = 'WMS-TRANSPORT-SITEWIDE-SEO-FINAL.zip';
const ZIP_PATH = path.join(ROOT, ZIP_NAME);
const STAGE_DIR = path.join(ROOT, 'scripts', '_stage');

// Exclude patterns
const excludePatterns = [
  /^\.git/,
  /^\.next/,
  /^node_modules/,
  /^\.env/,
  /\.zip$/,
  /\.log$/,
  /^tsconfig\.tsbuildinfo$/,
  /^lint-output\.txt$/,
  /^\.vscode/,
  /^scripts[\\\/]_stage/,
  /^public[\\\/]~partytown/
];

function shouldInclude(relPath) {
  for (const pattern of excludePatterns) {
    if (pattern.test(relPath)) return false;
  }
  return true;
}

function getAllFiles(dir, base = '') {
  let results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const relPath = base ? path.join(base, entry.name) : entry.name;
    if (!shouldInclude(relPath)) continue;
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results = results.concat(getAllFiles(fullPath, relPath));
    } else {
      results.push(relPath);
    }
  }
  return results;
}

if (fs.existsSync(STAGE_DIR)) {
  fs.rmSync(STAGE_DIR, { recursive: true, force: true });
}
fs.mkdirSync(STAGE_DIR, { recursive: true });

const filesToZip = getAllFiles(ROOT);
console.log(`Copying ${filesToZip.length} files to staging directory...`);

for (const relFile of filesToZip) {
  const srcPath = path.join(ROOT, relFile);
  const destPath = path.join(STAGE_DIR, relFile);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  fs.copyFileSync(srcPath, destPath);
}

if (fs.existsSync(ZIP_PATH)) {
  fs.unlinkSync(ZIP_PATH);
}

console.log('Compressing staging directory to ZIP...');
const psCmd = `powershell -Command "Compress-Archive -Path '${STAGE_DIR}\\*' -DestinationPath '${ZIP_PATH}' -Force"`;
execSync(psCmd, { stdio: 'inherit' });

// Clean up staging directory
fs.rmSync(STAGE_DIR, { recursive: true, force: true });

const stats = fs.statSync(ZIP_PATH);
console.log(`✅ Successfully created ${ZIP_NAME}`);
console.log(`📦 File Count: ${filesToZip.length}`);
console.log(`📦 Archive Size: ${(stats.size / (1024 * 1024)).toFixed(2)} MB (${stats.size} bytes)`);
