const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '../src/data');

const files = ['projects.json', 'case-studies.json'];

const mappings = {
  'banking-system.webp': 'ledgerx.webp',
  'event-countdown-timer.webp': 'event-countdown.webp'
};

files.forEach(file => {
  const filePath = path.join(dataDir, file);
  if (fs.existsSync(filePath)) {
    let content = fs.readFileSync(filePath, 'utf8');

    for (const [wrong, right] of Object.entries(mappings)) {
      content = content.replace(new RegExp(wrong, 'g'), right);
    }

    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated ${file} with the final broken image patches.`);
  }
});
