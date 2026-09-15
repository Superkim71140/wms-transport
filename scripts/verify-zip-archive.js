const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const ROOT = path.resolve(__dirname, '..');
const ZIP_PATH = path.join(ROOT, 'WMS-TRANSPORT-SITEWIDE-SEO-FINAL.zip');
const SCRATCH_VERIFY_DIR = path.join('C:', 'Users', 'PC', '.gemini', 'antigravity-ide', 'scratch', 'wms-zip-verify');

console.log('🔍 Verifying WMS-TRANSPORT-SITEWIDE-SEO-FINAL.zip...\n');

// 1. Check ZIP existence & size
if (!fs.existsSync(ZIP_PATH)) {
  console.error('❌ ZIP file not found:', ZIP_PATH);
  process.exit(1);
}

const zipStats = fs.statSync(ZIP_PATH);
console.log(`📦 ZIP Size: ${(zipStats.size / (1024 * 1024)).toFixed(2)} MB (${zipStats.size} bytes)`);

// 2. Extract outside project
if (fs.existsSync(SCRATCH_VERIFY_DIR)) {
  fs.rmSync(SCRATCH_VERIFY_DIR, { recursive: true, force: true });
}
fs.mkdirSync(SCRATCH_VERIFY_DIR, { recursive: true });

console.log(`📂 Extracting ZIP to external scratch dir: ${SCRATCH_VERIFY_DIR}`);
const psExtract = `powershell -Command "Expand-Archive -Path '${ZIP_PATH}' -DestinationPath '${SCRATCH_VERIFY_DIR}' -Force"`;
execSync(psExtract, { stdio: 'inherit' });

// 3. Scan extracted directory for prohibited / excluded files
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

const extractedFiles = walkAll(SCRATCH_VERIFY_DIR);
console.log(`📊 Extracted File Count: ${extractedFiles.length}`);

let forbiddenFound = [];
extractedFiles.forEach(file => {
  const rel = path.relative(SCRATCH_VERIFY_DIR, file).replace(/\\/g, '/');
  if (rel.startsWith('.git') || rel.startsWith('.next') || rel.startsWith('node_modules') || rel.startsWith('.env') || rel.endsWith('.zip')) {
    forbiddenFound.push(rel);
  }
});

if (forbiddenFound.length > 0) {
  console.error('❌ Forbidden files found in ZIP archive:', forbiddenFound);
  process.exit(1);
} else {
  console.log('✅ ZERO forbidden files (.git, .next, node_modules, .env, .zip) found in archive.');
}

// 4. Run validator inside extracted copy
console.log('\n🔍 Running SEO data validator inside extracted copy...');
try {
  const validatorOutput = execSync(`node tools/verify-seo-data.js`, {
    cwd: SCRATCH_VERIFY_DIR,
    env: { ...process.env, NODE_PATH: path.join(ROOT, 'node_modules') },
    encoding: 'utf8'
  });
  console.log(validatorOutput);
  console.log('✅ Extracted copy passed SEO validator cleanly.');
} catch (e) {
  console.error('❌ Validator failed in extracted copy:', e.message);
  process.exit(1);
}

// Cleanup scratch directory
fs.rmSync(SCRATCH_VERIFY_DIR, { recursive: true, force: true });
console.log('🧹 Cleaned up temporary verification directory.');
console.log('\n🎉 ZIP DELIVERABLE PACKAGE IS 100% VERIFIED & AUTHORITATIVE!');
