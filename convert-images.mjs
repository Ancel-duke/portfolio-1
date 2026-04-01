import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

async function findAndConvertImages(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await findAndConvertImages(fullPath);
    } else if (file.match(/\.(png|jpg|jpeg)$/i)) {
      const ext = path.extname(file);
      const webpPath = fullPath.replace(new RegExp(`${ext}$`), '.webp');
      
      try {
        await sharp(fullPath).webp().toFile(webpPath);
        console.log(`Converted: ${fullPath} -> ${webpPath}`);
        // Remove the original to keep it clean, or keep it depending on requirements
        fs.unlinkSync(fullPath);
      } catch (err) {
        console.error(`Error converting ${fullPath}:`, err);
      }
    }
  }
}

const publicDir = path.join(process.cwd(), 'public');
findAndConvertImages(publicDir)
  .then(() => console.log('Done converting images.'))
  .catch(console.error);
