const fs = require('fs');
const path = require('path');

const generateRobotsTxt = () => {
  return `User-agent: *
Allow: /

Sitemap: https://ancel.co.ke/sitemap.xml
`;
};

const publicDir = path.join(__dirname, '../public');
const robotsPath = path.join(publicDir, 'robots.txt');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(robotsPath, generateRobotsTxt());
console.log('✅ Robots.txt generated exactly as requested.');
