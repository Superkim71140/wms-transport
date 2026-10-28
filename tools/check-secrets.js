const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// Patterns that must NEVER be committed
const DANGEROUS_FILE_PATTERNS = [
  /wms-seo-monitor.*\.json$/i,
  /.*service-?account.*\.json$/i,
  /.*gserviceaccount.*\.json$/i,
  /\.env(\.local|\.production|\.development)?$/i,
  /.*_rsa$/i,
  /.*\.pem$/i,
  /.*\.p12$/i,
  /.*\.key$/i
];

// Patterns for content within files
const SECRET_REGEX_RULES = [
  { name: 'Google Cloud Private Key', regex: /"private_key":\s*"-----BEGIN (RSA )?PRIVATE KEY-----\\n[a-zA-Z0-9+/]{20,}/i },
  { name: 'Generic Private Key', regex: /-----BEGIN (RSA |EC |OPENSSH )?PRIVATE KEY-----\s*([a-zA-Z0-9+/]{20,})/i },
  { name: 'LINE Channel Secret', regex: /LINE_CHANNEL_SECRET\s*=\s*['"][a-f0-9]{32}['"]/i },
  { name: 'LINE Channel Access Token', regex: /LINE_CHANNEL_ACCESS_TOKEN\s*=\s*['"][a-zA-Z0-9+/=_-]{50,}['"]/i },
  { name: 'Postgres Connection String with Password', regex: /postgres(ql)?:\/\/[a-zA-Z0-9_]+:[^@\s]{4,}@[^/\s]+/i },
  { name: 'Hardcoded Bearer Token', regex: /bearer\s+[a-zA-Z0-9_\-\.]{30,}/i }
];

function checkFileForSecrets(filePath) {
  const norm = filePath.replace(/\\/g, '/');
  // Skip binary/images/archives
  const ext = path.extname(norm).toLowerCase();
  const skipExts = ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.avif', '.ico', '.zip', '.pdf', '.woff', '.woff2', '.ttf'];
  if (skipExts.includes(ext)) return null;

  // Skip node_modules, .next, and tools cached JSON/reports
  if (norm.includes('node_modules/') || norm.includes('.next/') || norm.includes('scratch/') || norm.includes('tools/sanitized-secret-scan-summary.json')) {
    return null;
  }

  // Check filename
  const base = path.basename(norm);
  if (base !== '.env.example') {
    for (const pat of DANGEROUS_FILE_PATTERNS) {
      if (pat.test(base)) {
        return { file: norm, rule: `Dangerous File Pattern: ${base}` };
      }
    }
  }

  // Check content if file exists
  if (fs.existsSync(filePath)) {
    try {
      const stat = fs.statSync(filePath);
      if (stat.size > 2 * 1024 * 1024) return null; // skip large files (>2MB)
      const content = fs.readFileSync(filePath, 'utf8');
      for (const rule of SECRET_REGEX_RULES) {
        if (rule.regex.test(content)) {
          return { file: norm, rule: rule.name };
        }
      }
    } catch {}
  }
  return null;
}

function runCheck() {
  console.log('🔒 Running pre-commit / local secret leak check...');
  
  // 1. Get list of staged files
  let stagedFiles = [];
  try {
    const stdout = execSync('git diff --cached --name-only', { encoding: 'utf8' });
    stagedFiles = stdout.split('\n').map(s => s.trim()).filter(Boolean);
  } catch {}

  // 2. Get list of tracked and modified files
  let trackedFiles = [];
  try {
    const stdout = execSync('git ls-files', { encoding: 'utf8' });
    trackedFiles = stdout.split('\n').map(s => s.trim()).filter(Boolean);
  } catch {}

  const filesToCheck = Array.from(new Set([...stagedFiles, ...trackedFiles]));
  const violations = [];

  for (const f of filesToCheck) {
    const res = checkFileForSecrets(f);
    if (res) {
      violations.push(res);
    }
  }

  if (violations.length > 0) {
    console.error('\n❌ SECRET CHECK FAILED! Potential credentials detected:');
    violations.forEach(v => {
      console.error(`  - File: ${v.file}`);
      console.error(`    Category: ${v.rule} (Secret values REDACTED)`);
    });
    console.error('\nPlease remove these secrets or add them to .gitignore before committing/pushing.');
    process.exit(1);
  } else {
    console.log('✅ Secret check passed: 0 exposed credentials detected in tracked/staged files.');
  }
}

runCheck();
