import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function findAndConvertImagesToPng(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await findAndConvertImagesToPng(fullPath);
    } else if (file.match(/\.webp$/i)) {
      const pngPath = fullPath.replace(/\.webp$/i, '.png');
      
      try {
        await sharp(fullPath).png().toFile(pngPath);
        console.log(`Converted: ${fullPath} -> ${pngPath}`);
        fs.unlinkSync(fullPath);
      } catch (err) {
        console.error(`Error converting ${fullPath}:`, err);
      }
    }
  }
}

const publicDir = path.join(process.cwd(), 'public');
findAndConvertImagesToPng(publicDir)
  .then(() => console.log('Done converting images back to PNG.'))
  .catch(console.error);
