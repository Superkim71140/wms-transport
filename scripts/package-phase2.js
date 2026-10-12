const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ZIP_NAME = 'WMS-GOOGLE-SEO-PHASE2.zip';
const ZIP_PATH = path.join(ROOT, ZIP_NAME);
const STAGE_DIR = path.join(ROOT, '.stage_phase2');

console.log(`📦 Starting packaging process for ${ZIP_NAME}...\n`);

// Clean previous zip if present
if (fs.existsSync(ZIP_PATH)) {
  fs.unlinkSync(ZIP_PATH);
}
if (fs.existsSync(STAGE_DIR)) {
  fs.rmSync(STAGE_DIR, { recursive: true, force: true });
}

// Exclusion rules
const excludeRegexes = [
  /^\.git([\\\/]|$)/i,
  /^\.next([\\\/]|$)/i,
  /^node_modules([\\\/]|$)/i,
  /^\.vscode([\\\/]|$)/i,
  /^\.stage.*([\\\/]|$)/i,
  /^skills-seo-google([\\\/]|$)/i, // external skill archive/dir
  /\.zip$/i, // all zip archives
  /\.log$/i,
  /^tsconfig\.tsbuildinfo$/i,
  /^\.env(\.local|\.production|\.development)?$/i, // Real env files (keeps .env.example)
  /^public[\\\/]~partytown([\\\/]|$)/i, // regenerable partytown library
  /client_secrets\.json$/i,
  /service_account\.json$/i,
];

function shouldInclude(relPath) {
  const norm = relPath.replace(/\\/g, '/');
  for (const re of excludeRegexes) {
    if (re.test(norm)) return false;
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

// 1. Gather all files
let fileList = getAllFiles(ROOT).map(f => f.replace(/\\/g, '/'));
fileList.sort();

console.log(`📋 Total files to package: ${fileList.length}`);

// Ensure required Phase 2 deliverables exist in the list
const requiredDeliverables = [
  'PHASE2-CHANGES.patch',
  'SEO-PHASE2-REPORT.md',
  'OWNER-CONFIRMATIONS.md',
  'SEO-MEASUREMENT-PLAN.md',
  '.env.example'
];

for (const req of requiredDeliverables) {
  if (!fileList.includes(req)) {
    throw new Error(`Missing required deliverable in file list: ${req}`);
  }
  console.log(`  ✓ Confirmed deliverable included: ${req}`);
}

// 2. Stage files
console.log(`\n🚚 Staging files into .stage_phase2...`);
fs.mkdirSync(STAGE_DIR, { recursive: true });

for (const relFile of fileList) {
  const src = path.join(ROOT, relFile);
  const dest = path.join(STAGE_DIR, relFile);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

// 3. Compress using PowerShell Compress-Archive
console.log(`\n🗜️ Creating ZIP archive ${ZIP_NAME}...`);
const psCmd = `powershell -Command "Compress-Archive -Path '${STAGE_DIR}\\*' -DestinationPath '${ZIP_PATH}' -Force"`;
execSync(psCmd, { stdio: 'inherit' });

// 4. Verify ZIP creation
if (!fs.existsSync(ZIP_PATH)) {
  throw new Error(`Failed to create ${ZIP_PATH}`);
}

const stats = fs.statSync(ZIP_PATH);
const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
console.log(`\n🎉 Packaging complete!`);
console.log(`   Output: ${ZIP_PATH}`);
console.log(`   Size:   ${sizeMB} MB (${stats.size.toLocaleString()} bytes)`);

// 5. Cleanup stage dir
fs.rmSync(STAGE_DIR, { recursive: true, force: true });
console.log(`🧹 Staging directory cleaned.`);
