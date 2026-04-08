const fs = require('fs');
const path = require('path');

const generateRobotsTxt = () => {
  return `# https://ancel.co.ke
User-agent: *
Allow: /

User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: PerplexityBot
Allow: /

User-agent: Amazonbot
Allow: /

User-agent: CCBot
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Google-Extended
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
console.log('✅ Robots.txt generated with broad crawler allow rules.');
