const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');
const publicImagesDir = path.join(__dirname, '../public/images');

const files = ['projects.json', 'case-studies.json', 'blog.json'];

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  if (fs.existsSync(filePath)) {
    const data = JSON.parse(fs.readFileSync(filePath, 'utf8'));
    data.forEach((item, index) => {
      // Check standard image
      if (item.image && typeof item.image === 'string') {
        const fullPath = path.join(__dirname, '..', 'public', item.image);
        if (!fs.existsSync(fullPath)) {
          console.log(`BROKEN in ${file} [item ${index}]: ${item.image}`);
        }
      }
      // Check ogImage
      if (item.seo && item.seo.ogImage) {
        const fullPath = path.join(__dirname, '..', 'public', item.seo.ogImage);
        if (!fs.existsSync(fullPath)) {
          console.log(`BROKEN (ogImage) in ${file} [item ${index}]: ${item.seo.ogImage}`);
        }
      }
    });
  }
});
