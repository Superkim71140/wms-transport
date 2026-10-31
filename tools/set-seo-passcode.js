/**
 * Secure Passcode Setting Utility for WMS SEO Monitor
 * Allows the owner to set or rotate the dashboard passcode locally in .env.local
 * WITHOUT ever printing the passcode value to standard output, terminal, or logs.
 */

const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

function main() {
  const envPath = path.join(process.cwd(), '.env.local');

  // If user provided argument, use it; otherwise generate a cryptographically strong 32-char hex secret
  const argPasscode = process.argv[2]?.trim();
  const newPasscode = argPasscode && argPasscode.length >= 8
    ? argPasscode
    : crypto.randomBytes(16).toString('hex');

  let envContent = '';
  if (fs.existsSync(envPath)) {
    envContent = fs.readFileSync(envPath, 'utf8');
  }

  const passcodeRegex = /^SEO_DASHBOARD_PASSCODE=.*$/m;
  if (passcodeRegex.test(envContent)) {
    envContent = envContent.replace(passcodeRegex, `SEO_DASHBOARD_PASSCODE=${newPasscode}`);
  } else {
    envContent = (envContent.trim() + `\nSEO_DASHBOARD_PASSCODE=${newPasscode}\n`).trim() + '\n';
  }

  fs.writeFileSync(envPath, envContent, 'utf8');

  console.log('====================================================');
  console.log('🔐 WMS SEO MONITOR — PASSCODE CONFIGURED SECURELY');
  console.log('====================================================');
  console.log('✅ Updated SEO_DASHBOARD_PASSCODE in .env.local');
  console.log(`   Passcode Length: ${newPasscode.length} characters`);
  console.log('   Security Policy: The passcode value is saved in .env.local and was NOT printed here.');
  console.log('\n👉 Next steps for Owner:');
  console.log('   1. Check .env.local directly to see or copy your passcode.');
  console.log('   2. Restart your Next.js development server:');
  console.log('      npm run dev');
  console.log('   3. Log in to http://localhost:3000/seo-monitor');
  console.log('====================================================\n');
}

main();

