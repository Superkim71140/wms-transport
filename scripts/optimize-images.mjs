import fs from 'fs/promises';
import path from 'path';
import sharp from 'sharp';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const IMAGES_DIR = path.join(__dirname, '../public/images');

async function optimizeImages() {
  try {
    const files = await fs.readdir(IMAGES_DIR);
    
    for (const file of files) {
      const ext = path.extname(file).toLowerCase();
      if (!['.jpg', '.jpeg', '.png'].includes(ext)) continue;

      const inputPath = path.join(IMAGES_DIR, file);
      const basename = path.basename(file, ext);
      const outputPath = path.join(IMAGES_DIR, `${basename}.webp`);

      try {
        // Check if webp already exists and is newer
        const inputStats = await fs.stat(inputPath);
        let skip = false;
        try {
          const outputStats = await fs.stat(outputPath);
          if (outputStats.mtime > inputStats.mtime) {
            skip = true;
          }
        } catch (err) {
          // Output file doesn't exist, proceed
        }

        if (skip) {
          console.log(`Skipping ${file} (webp already exists and is newer)`);
          continue;
        }

        // Check image metadata
        const metadata = await sharp(inputPath).metadata();
        let pipeline = sharp(inputPath);

        // Resize logic
        if (metadata.width > 1600) {
          pipeline = pipeline.resize(1600, null, { withoutEnlargement: true });
        }

        // Quality setting: If file is large or gallery image, use 82, else 78
        const quality = inputStats.size > 200000 ? 82 : 78;

        await pipeline.webp({ quality }).toFile(outputPath);
        
        const newStats = await fs.stat(outputPath);
        console.log(`Optimized: ${file} -> ${basename}.webp | Original: ${(inputStats.size / 1024).toFixed(1)} KB | New: ${(newStats.size / 1024).toFixed(1)} KB`);
      } catch (error) {
        console.error(`Error processing ${file}:`, error);
      }
    }
  } catch (error) {
    console.error(`Error reading directory:`, error);
  }
}

optimizeImages();
