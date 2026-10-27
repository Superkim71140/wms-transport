const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const outputZip = path.resolve(rootDir, '..', 'WMS-TRANSPORT-Update-portfolio-and-headings.zip');
const sourceZip = path.resolve(rootDir, '..', 'WMS-TRANSPORT-Update-source.zip');

const tempDir = path.resolve(require('os').tmpdir(), 'wms_clean_export_' + Date.now());

const excludeDirs = new Set(['node_modules', '.next', '.git']);
const excludeExts = new Set(['.zip', '.log']);

function copyClean(src, dest) {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      if (excludeDirs.has(entry.name)) {
        continue;
      }
      copyClean(srcPath, destPath);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (excludeExts.has(ext)) {
        continue;
      }
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('Copying clean files to temporary folder:', tempDir);
copyClean(rootDir, tempDir);

console.log('Creating ZIP archive at:', outputZip);
if (fs.existsSync(outputZip)) {
  fs.unlinkSync(outputZip);
}

// Compress using PowerShell Compress-Archive
const cmd = `powershell -Command "Compress-Archive -Path '${tempDir}\\*' -DestinationPath '${outputZip}' -CompressionLevel Optimal"`;
execSync(cmd, { stdio: 'inherit' });

// Also update WMS-TRANSPORT-Update-source.zip
if (fs.existsSync(sourceZip)) {
  fs.unlinkSync(sourceZip);
}
fs.copyFileSync(outputZip, sourceZip);

// Cleanup
fs.rmSync(tempDir, { recursive: true, force: true });

const stats = fs.statSync(outputZip);
console.log(`✅ Success! Created:`);
console.log(`- ${outputZip} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
console.log(`- ${sourceZip} (${(stats.size / 1024 / 1024).toFixed(2)} MB)`);
