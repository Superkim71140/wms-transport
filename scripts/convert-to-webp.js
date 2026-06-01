const fs = require('fs');
const path = require('path');

let sharp;
try {
  sharp = require('sharp');
} catch (err) {
  console.log("Please install 'sharp' first by running: npm install sharp");
  process.exit(1);
}

const imagesDir = path.join(__dirname, '../public/images');

if (!fs.existsSync(imagesDir)) {
  console.error(`Directory not found: ${imagesDir}`);
  process.exit(1);
}

const files = fs.readdirSync(imagesDir);
console.log(`Found ${files.length} items in ${imagesDir}. Starting conversion to WebP...`);

let count = 0;
files.forEach((file) => {
  const ext = path.extname(file).toLowerCase();
  if (['.png', '.jpg', '.jpeg'].includes(ext)) {
    const inputPath = path.join(imagesDir, file);
    const outputPath = path.join(imagesDir, `${path.basename(file, ext)}.webp`);

    sharp(inputPath)
      .webp({ quality: 85 })
      .toFile(outputPath)
      .then(() => {
        count++;
        console.log(`[${count}] Converted: ${file} -> ${path.basename(file, ext)}.webp`);
      })
      .catch((err) => {
        console.error(`Failed to convert ${file}:`, err);
      });
  }
});
