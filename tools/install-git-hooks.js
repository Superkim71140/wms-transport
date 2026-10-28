const fs = require('fs');
const path = require('path');

const hooksDir = path.resolve('.git/hooks');
if (!fs.existsSync(hooksDir)) {
  console.log('No .git/hooks directory found.');
  process.exit(1);
}

const preCommitHook = `#!/bin/sh
# WMS TRANSPORT Pre-Commit Secret Scanner Hook
node tools/check-secrets.js
if [ $? -ne 0 ]; then
  echo "Commit aborted due to potential secret leakage."
  exit 1
fi
`;

const prePushHook = `#!/bin/sh
# WMS TRANSPORT Pre-Push Secret Scanner Hook
node tools/check-secrets.js
if [ $? -ne 0 ]; then
  echo "Push aborted due to potential secret leakage."
  exit 1
fi
`;

const preCommitPath = path.join(hooksDir, 'pre-commit');
const prePushPath = path.join(hooksDir, 'pre-push');

fs.writeFileSync(preCommitPath, preCommitHook, { mode: 0o755 });
fs.writeFileSync(prePushPath, prePushHook, { mode: 0o755 });

console.log('✅ Git Hooks installed successfully:');
console.log(`  - ${preCommitPath}`);
console.log(`  - ${prePushPath}`);
