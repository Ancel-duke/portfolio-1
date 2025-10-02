const fs = require('fs');
const path = require('path');

const baseUrl = 'https://ancel.co.ke';

const generateRobotsTxt = () => {
  let robots = `# Robots.txt for ${baseUrl}
# Generated automatically - do not edit manually

# Allow all crawlers
User-agent: *
Allow: /

# Allow AI crawlers specifically
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

User-agent: CCBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

User-agent: Google-Extended
Allow: /

User-agent: BingBot
Allow: /

User-agent: Googlebot
Allow: /

# Disallow admin and private areas (if any)
Disallow: /admin/
Disallow: /private/
Disallow: /_/
Disallow: /api/

# Disallow build artifacts
Disallow: /build/
Disallow: /dist/
Disallow: /node_modules/

# Allow important files
Allow: /sitemap.xml
Allow: /robots.txt
Allow: /favicon.ico
Allow: /assets/

# Sitemap location
Sitemap: ${baseUrl}/sitemap.xml

# Crawl delay (optional - be respectful to servers)
Crawl-delay: 1
`;

  return robots;
};

// Write robots.txt to public directory
const robotsContent = generateRobotsTxt();
const publicDir = path.join(__dirname, '../public');
const robotsPath = path.join(publicDir, 'robots.txt');

// Ensure public directory exists
if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(robotsPath, robotsContent);
console.log('✅ Robots.txt generated successfully at:', robotsPath);
console.log('🤖 Configured for AI crawlers: GPTBot, ChatGPT-User, CCBot, Claude-Web, Google-Extended');
console.log('🔍 Allowed search engines: Googlebot, BingBot');
console.log('🚫 Disallowed: admin, private, build directories');

