const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ZIP_NAME = 'WMS-GOOGLE-SEO-IMPROVED.zip';
const ZIP_PATH = path.join(ROOT, ZIP_NAME);
const MANIFEST_PATH = path.join(ROOT, 'FILE-MANIFEST.txt');
const STAGE_DIR = path.join(ROOT, '.stage_improved');

console.log(`📦 Starting packaging process for ${ZIP_NAME}...\n`);

// Exclusion rules
const excludeRegexes = [
  /^\.git([\\\/]|$)/i,
  /^\.next([\\\/]|$)/i,
  /^node_modules([\\\/]|$)/i,
  /^\.vscode([\\\/]|$)/i,
  /^\.stage_improved([\\\/]|$)/i,
  /^skills-seo-google([\\\/]|$)/i, // external skill archive/dir
  /\.zip$/i, // all zip archives
  /\.log$/i,
  /^tsconfig\.tsbuildinfo$/i,
  /^lint-output\.txt$/i,
  /^\.env(\.local|\.production|\.development)?$/i, // Real env files (keeps .env.example)
  /^scripts[\\\/]_stage([\\\/]|$)/i,
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
if (!fileList.includes('FILE-MANIFEST.txt')) {
  fileList.push('FILE-MANIFEST.txt');
}
fileList.sort();

// 2. Write FILE-MANIFEST.txt
console.log(`Writing FILE-MANIFEST.txt containing ${fileList.length} files...`);
fs.writeFileSync(MANIFEST_PATH, fileList.join('\n') + '\n', 'utf8');

// 3. Stage files
if (fs.existsSync(STAGE_DIR)) {
  fs.rmSync(STAGE_DIR, { recursive: true, force: true });
}
fs.mkdirSync(STAGE_DIR, { recursive: true });

console.log(`Copying ${fileList.length} files to temporary staging directory...`);
for (const rel of fileList) {
  const src = path.join(ROOT, rel);
  const dest = path.join(STAGE_DIR, rel);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

// 4. Remove old zip if present
if (fs.existsSync(ZIP_PATH)) {
  fs.unlinkSync(ZIP_PATH);
}

// 5. Create zip archive using PowerShell Compress-Archive
console.log(`Creating ZIP archive at ${ZIP_PATH}...`);
const psCmd = `powershell -NoProfile -Command "Compress-Archive -Path '${STAGE_DIR}\\*' -DestinationPath '${ZIP_PATH}' -Force"`;
execSync(psCmd, { stdio: 'inherit' });

// 6. Clean up staging directory
if (fs.existsSync(STAGE_DIR)) {
  fs.rmSync(STAGE_DIR, { recursive: true, force: true });
}

// 7. Verify generated zip
if (fs.existsSync(ZIP_PATH)) {
  const stats = fs.statSync(ZIP_PATH);
  console.log(`\n🎉 Packaging complete!`);
  console.log(`   File: ${ZIP_PATH}`);
  console.log(`   Size: ${(stats.size / 1024 / 1024).toFixed(2)} MB (${stats.size} bytes)`);
} else {
  console.error(`❌ Error: ZIP file not created at ${ZIP_PATH}`);
  process.exit(1);
}
