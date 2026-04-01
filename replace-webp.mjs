import fs from 'fs';
import path from 'path';

function replaceInFiles(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      replaceInFiles(fullPath);
    } else if (file.match(/\.(ts|tsx|json|md)$/)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      if (content.includes('.webp')) {
        content = content.replace(/\.webp/g, '.png');
        fs.writeFileSync(fullPath, content);
        console.log(`Updated ${fullPath}`);
      }
    }
  }
}

replaceInFiles(path.join(process.cwd(), 'src'));
console.log('Done replacing .webp strings with .png in src/');
