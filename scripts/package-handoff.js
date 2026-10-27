const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ZIP_NAME = 'GOOGLE-SEO-CODE-HANDOFF.zip';
const ZIP_PATH = path.join(ROOT, ZIP_NAME);
const MANIFEST_PATH = path.join(ROOT, 'FILE-MANIFEST.txt');
const STAGE_DIR = path.join('C:', 'Users', 'PC', '.gemini', 'antigravity-ide', 'scratch', 'stage-handoff');
const VERIFY_DIR = path.join('C:', 'Users', 'PC', '.gemini', 'antigravity-ide', 'scratch', 'verify-handoff');

console.log('📦 Starting packaging process for GOOGLE-SEO-CODE-HANDOFF.zip...\n');

// Exclusion rules
const excludeRegexes = [
  /^\.git([\\\/]|$)/i,
  /^\.next([\\\/]|$)/i,
  /^node_modules([\\\/]|$)/i,
  /^\.vscode([\\\/]|$)/i,
  /\.zip$/i,
  /\.log$/i,
  /^tsconfig\.tsbuildinfo$/i,
  /^lint-output\.txt$/i,
  /^\.env(\.local|\.production|\.development)?$/i, // Real env files (keeps .env.example)
  /^scripts[\\\/]_stage([\\\/]|$)/i,
  /^public[\\\/]~partytown([\\\/]|$)/i, // regenerable partytown library
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

// 1. Gather all files except FILE-MANIFEST.txt itself initially
let fileList = getAllFiles(ROOT).map(f => f.replace(/\\/g, '/'));
// Ensure FILE-MANIFEST.txt is in the manifest list
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

console.log(`Staging ${fileList.length} files to ${STAGE_DIR}...`);
for (const relFile of fileList) {
  const src = path.join(ROOT, relFile);
  const dest = path.join(STAGE_DIR, relFile);
  fs.mkdirSync(path.dirname(dest), { recursive: true });
  fs.copyFileSync(src, dest);
}

// 4. Compress to ZIP
if (fs.existsSync(ZIP_PATH)) {
  fs.unlinkSync(ZIP_PATH);
}

console.log(`Compressing staged archive to ${ZIP_PATH}...`);
const psCmd = `powershell -Command "Compress-Archive -Path '${STAGE_DIR}\\*' -DestinationPath '${ZIP_PATH}' -Force"`;
execSync(psCmd, { stdio: 'inherit' });

const stats = fs.statSync(ZIP_PATH);
console.log(`\n✅ Created ${ZIP_NAME} successfully!`);
console.log(`📁 File count in archive: ${fileList.length}`);
console.log(`📏 Archive size: ${(stats.size / 1024 / 1024).toFixed(2)} MB (${stats.size} bytes)`);

// 5. Verification: Extract and inspect
console.log(`\n🔍 Verifying generated ZIP by extracting to ${VERIFY_DIR}...`);
if (fs.existsSync(VERIFY_DIR)) {
  fs.rmSync(VERIFY_DIR, { recursive: true, force: true });
}
fs.mkdirSync(VERIFY_DIR, { recursive: true });

const psExtract = `powershell -Command "Expand-Archive -Path '${ZIP_PATH}' -DestinationPath '${VERIFY_DIR}' -Force"`;
execSync(psExtract, { stdio: 'inherit' });

function walkAll(dir) {
  let files = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files = files.concat(walkAll(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

const extracted = walkAll(VERIFY_DIR);
console.log(`📊 Extracted files count: ${extracted.length}`);

let forbidden = [];
extracted.forEach(f => {
  const rel = path.relative(VERIFY_DIR, f).replace(/\\/g, '/');
  if (
    rel === '.git' ||
    rel.startsWith('.git/') ||
    rel === '.next' ||
    rel.startsWith('.next/') ||
    rel === 'node_modules' ||
    rel.startsWith('node_modules/') ||
    rel.endsWith('.zip') ||
    (rel.startsWith('.env') && rel !== '.env.example')
  ) {
    forbidden.push(rel);
  }
});

if (forbidden.length > 0) {
  console.error('❌ FORBIDDEN files found in archive:', forbidden);
  process.exit(1);
} else {
  console.log('✅ ZERO forbidden files (.git, .next, node_modules, .env, .zip) found.');
}

// 6. Test extracted package with SEO validator
console.log('🔍 Testing extracted package with tools/verify-seo-data.js...');
const valOut = execSync('node tools/verify-seo-data.js', {
  cwd: VERIFY_DIR,
  env: { ...process.env, NODE_PATH: path.join(ROOT, 'node_modules') },
  encoding: 'utf8'
});
console.log(valOut.trim());

// 7. Cleanup scratch dirs
fs.rmSync(STAGE_DIR, { recursive: true, force: true });
fs.rmSync(VERIFY_DIR, { recursive: true, force: true });
console.log('🧹 Cleaned up temporary staging and verification directories.');
console.log('\n🎉 PACKAGING & VERIFICATION COMPLETE!');
