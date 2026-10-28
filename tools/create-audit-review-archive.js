const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const workspaceRoot = path.resolve(__dirname, '..');
const scratchDir = path.resolve('C:/Users/PC/.gemini/antigravity-ide/brain/d5e3e165-9650-49ee-adef-724b54107ee2/scratch');
const stagingDir = path.join(scratchDir, 'wms_audit_staging');
const zipName = 'WMS-TRANSPORT-Sitemap-Indexing-Audit-Review.zip';
const zipDestWorkspace = path.join(workspaceRoot, zipName);
const zipDestArtifact = path.resolve('C:/Users/PC/.gemini/antigravity-ide/brain/d5e3e165-9650-49ee-adef-724b54107ee2', zipName);

console.log('--- Cleaning Staging Directory ---');
if (fs.existsSync(stagingDir)) {
  fs.rmSync(stagingDir, { recursive: true, force: true });
}
fs.mkdirSync(stagingDir, { recursive: true });

const IGNORED_NAMES = new Set([
  'node_modules',
  '.next',
  '.git',
  '.gemini',
  '.agent',
  'dist',
  'build',
  '.tempmediaStorage',
  'coverage',
  '.DS_Store',
  'Thumbs.db',
  'cache',
  '.cache',
  'credentials',
  'secrets',
  '.secrets',
  '.credentials'
]);

function shouldCopy(relPath, isDirectory) {
  const parts = relPath.split(path.sep);
  for (const part of parts) {
    if (IGNORED_NAMES.has(part)) return false;
  }
  const basename = path.basename(relPath).toLowerCase();
  if (basename.endsWith('.zip')) return false;
  if (basename.startsWith('.env') && basename !== '.env.example') return false;
  if (basename.endsWith('.log')) return false;
  if (basename.includes('serviceaccount') || basename.includes('gserviceaccount') || basename.includes('gsc-') || basename.endsWith('.key') || basename.endsWith('.p12')) return false;
  return true;
}

function copyRecursive(src, dest, relPath = '') {
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const entryRel = relPath ? path.join(relPath, entry.name) : entry.name;
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (!shouldCopy(entryRel, entry.isDirectory())) {
      continue;
    }

    if (entry.isDirectory()) {
      fs.mkdirSync(destPath, { recursive: true });
      copyRecursive(srcPath, destPath, entryRel);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

console.log('--- Copying clean files to Staging ---');
copyRecursive(workspaceRoot, stagingDir);

console.log('--- Creating ZIP Archive ---');
if (fs.existsSync(zipDestWorkspace)) {
  fs.unlinkSync(zipDestWorkspace);
}
if (fs.existsSync(zipDestArtifact)) {
  fs.unlinkSync(zipDestArtifact);
}

// Compress using .NET ZipFile
const psCommand = `powershell -NoProfile -Command "Add-Type -AssemblyName System.IO.Compression.FileSystem; [System.IO.Compression.ZipFile]::CreateFromDirectory('${stagingDir.replace(/\\/g, '/')}', '${zipDestWorkspace.replace(/\\/g, '/')}', [System.IO.Compression.CompressionLevel]::Optimal, $false)"`;
execSync(psCommand, { stdio: 'inherit' });

if (fs.existsSync(zipDestWorkspace)) {
  const stats = fs.statSync(zipDestWorkspace);
  console.log(`Successfully created: ${zipDestWorkspace} (${(stats.size / (1024 * 1024)).toFixed(2)} MB)`);
  fs.copyFileSync(zipDestWorkspace, zipDestArtifact);
  console.log(`Copied to artifact dir: ${zipDestArtifact}`);
} else {
  console.error('Failed to create zip file.');
  process.exit(1);
}

fs.rmSync(stagingDir, { recursive: true, force: true });
console.log('Staging directory cleaned up.');
