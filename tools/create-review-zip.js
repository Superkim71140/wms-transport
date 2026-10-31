const fs = require('fs');
const path = require('path');
const crypto = require('crypto');
const { execSync } = require('child_process');

const ZIP_NAME = 'WMS-SEO-Monitor-Review-20261031.zip';
const STAGING_DIR = path.join(process.cwd(), 'review-staging');
const OUTPUT_ZIP = path.join(process.cwd(), ZIP_NAME);

// Explicit allowlist of directories and files to include
const INCLUDE_PATHS = [
  'src',
  'public',
  'migrations',
  'tools',
  'scripts',
  'data/seo-monitor/seo-snapshot.json',
  'data/quotations/quotations.json',
  'superpowers-main',
  'ponytail-main',
  'package.json',
  'package-lock.json',
  'tsconfig.json',
  'eslint.config.mjs',
  'next.config.ts',
  'next.config.mjs',
  'next.config.js',
  'postcss.config.mjs',
  'postcss.config.js',
  '.env.example',
  'README.md',
  'AGENTS.md',
  'README-REVIEW.md',
  'SEO-MONITOR-STATUS.md',
  'ENVIRONMENT-SETUP.md',
  'DATABASE-MIGRATIONS.md',
  'VALIDATION-RESULTS.md',
  'CHANGED-FILES.md',
  'REVIEW-QUESTIONS.md'
];

// Patterns that MUST NEVER be included
const STRICT_EXCLUDE_PATTERNS = [
  /^\.env(\.local|\.production|\.development|\.test)?$/i,
  /.*service-?account.*\.json$/i,
  /.*wms-seo-monitor.*\.json$/i,
  /.*gserviceaccount.*\.json$/i,
  /.*\.pem$/i,
  /.*\.key$/i,
  /.*\.p12$/i,
  /\.git/i,
  /\.next/i,
  /node_modules/i,
  /review-staging/i,
  /tools\/seo-skills/i,
  /.*\.zip$/i,
  /task-.*\.log/i
];

function shouldExclude(relPath) {
  const norm = relPath.replace(/\\/g, '/');
  for (const pat of STRICT_EXCLUDE_PATTERNS) {
    if (pat.test(norm)) return true;
  }
  return false;
}

function copyRecursive(src, dest, collectedFiles) {
  if (!fs.existsSync(src)) return;

  const stat = fs.statSync(src);
  if (stat.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });
    for (const child of fs.readdirSync(src)) {
      const childSrc = path.join(src, child);
      const childDest = path.join(dest, child);
      const rel = path.relative(process.cwd(), childSrc);
      if (!shouldExclude(rel)) {
        copyRecursive(childSrc, childDest, collectedFiles);
      }
    }
  } else {
    const rel = path.relative(process.cwd(), src);
    if (!shouldExclude(rel)) {
      fs.mkdirSync(path.dirname(dest), { recursive: true });
      fs.copyFileSync(src, dest);
      collectedFiles.push(rel.replace(/\\/g, '/'));
    }
  }
}

// Deep secret scanning patterns
const SECRET_SCAN_PATTERNS = [
  { name: 'Google Cloud Private Key', regex: /"private_key":\s*"-----BEGIN/i },
  { name: 'Private Key Header', regex: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----/i },
  { name: 'Service Account Type', regex: /"type":\s*"service_account"/i },
  { name: 'LINE Channel Secret', regex: /LINE_CHANNEL_SECRET\s*=\s*['"][a-f0-9]{32}['"]/i },
  { name: 'LINE Channel Token', regex: /LINE_CHANNEL_ACCESS_TOKEN\s*=\s*['"][a-zA-Z0-9+/=_-]{50,}['"]/i },
  { name: 'Real Postgres Password', regex: /postgres(ql)?:\/\/[a-zA-Z0-9_]+:[^@\s]{5,}@[^/\s]+/i }
];

function scanStagedFiles(dir) {
  const files = [];
  function walk(current) {
    for (const item of fs.readdirSync(current)) {
      const p = path.join(current, item);
      const st = fs.statSync(p);
      if (st.isDirectory()) {
        walk(p);
      } else {
        files.push(p);
      }
    }
  }
  walk(dir);

  console.log(`🔍 Scanning ${files.length} staged files for sensitive data & credentials...`);
  let leaksFound = 0;

  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    if (['.png', '.jpg', '.jpeg', '.webp', '.svg', '.ico', '.pdf', '.woff', '.woff2'].includes(ext)) {
      continue;
    }

    try {
      const content = fs.readFileSync(f, 'utf8');
      for (const rule of SECRET_SCAN_PATTERNS) {
        if (rule.regex.test(content)) {
          console.error(`🚨 SECRET DETECTED in staged file [${rule.name}]: ${path.relative(STAGING_DIR, f)}`);
          leaksFound++;
        }
      }
    } catch {}
  }

  if (leaksFound > 0) {
    throw new Error(`Secret scan failed with ${leaksFound} violations! Aborting packaging.`);
  }

  console.log(`✅ Security Scan Complete: 0 secrets detected across all ${files.length} staged files.`);
  return files.length;
}

function main() {
  console.log('====================================================');
  console.log('📦 CREATING SANITIZED REVIEW ZIP FOR CHATGPT');
  console.log('Target Archive:', ZIP_NAME);
  console.log('====================================================\n');

  // Clean staging
  if (fs.existsSync(STAGING_DIR)) {
    fs.rmSync(STAGING_DIR, { recursive: true, force: true });
  }
  fs.mkdirSync(STAGING_DIR, { recursive: true });

  const collectedFiles = [];

  for (const target of INCLUDE_PATHS) {
    const fullPath = path.join(process.cwd(), target);
    const destPath = path.join(STAGING_DIR, target);
    copyRecursive(fullPath, destPath, collectedFiles);
  }

  // Generate FILE-MANIFEST.txt
  collectedFiles.sort();
  const manifestPath = path.join(STAGING_DIR, 'FILE-MANIFEST.txt');
  fs.writeFileSync(manifestPath, collectedFiles.join('\n') + '\nFILE-MANIFEST.txt', 'utf8');
  fs.writeFileSync('FILE-MANIFEST.txt', collectedFiles.join('\n') + '\nFILE-MANIFEST.txt', 'utf8');

  console.log(`📋 Total files collected: ${collectedFiles.length + 1}`);

  // Deep scan staged directory
  const scannedCount = scanStagedFiles(STAGING_DIR);

  // Remove old zip if exists
  if (fs.existsSync(OUTPUT_ZIP)) {
    fs.unlinkSync(OUTPUT_ZIP);
  }

  // Create ZIP using native tar (supports zip format on Windows 10/11)
  console.log(`\n🗜️ Compressing staging directory into ${ZIP_NAME}...`);
  execSync(`tar.exe -a -c -f "${OUTPUT_ZIP}" -C "${STAGING_DIR}" .`, { stdio: 'inherit' });

  // Clean staging directory
  fs.rmSync(STAGING_DIR, { recursive: true, force: true });

  // Compute file size and SHA-256
  const zipStats = fs.statSync(OUTPUT_ZIP);
  const zipBuffer = fs.readFileSync(OUTPUT_ZIP);
  const sha256 = crypto.createHash('sha256').update(zipBuffer).digest('hex');

  console.log('\n====================================================');
  console.log('🎉 REVIEW ZIP CREATED SUCCESSFULLY!');
  console.log('Archive Path:', OUTPUT_ZIP);
  console.log('File Size:', (zipStats.size / (1024 * 1024)).toFixed(2), 'MB', `(${zipStats.size} bytes)`);
  console.log('SHA-256:', sha256);
  console.log('====================================================');
}

main();
