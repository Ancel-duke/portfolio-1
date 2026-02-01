const fs = require('fs');
const path = require('path');

const baseUrl = 'https://ancel.co.ke';

const generateRobotsTxt = () => {
  let robots = `# Robots.txt for ${baseUrl}
# Generated automatically - do not edit manually

# Allow all crawlers by default
User-agent: *
Allow: /

# Explicitly allow all major search engines
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Googlebot-Video
Allow: /

User-agent: BingBot
Allow: /

User-agent: Slurp
Allow: /

User-agent: DuckDuckBot
Allow: /

User-agent: Baiduspider
Allow: /

User-agent: YandexBot
Allow: /

User-agent: Sogou
Allow: /

User-agent: Exabot
Allow: /

User-agent: facebot
Allow: /

User-agent: ia_archiver
Allow: /

# High-priority crawlers (Brave Search, Google AI Overviews / Gemini)
User-agent: BraveBot
Allow: /

User-agent: Google-Extended
Allow: /

# Explicitly allow all AI crawlers
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

User-agent: PerplexityBot
Allow: /

User-agent: Applebot-Extended
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
console.log('🤖 High-priority: BraveBot (Brave Search), Google-Extended (Google AI Overviews/Gemini)');
console.log('🤖 AI crawlers: GPTBot, ChatGPT-User, CCBot, Claude-Web, PerplexityBot, Applebot-Extended');
console.log('🔍 Allowed search engines: All major search engines (Google, Bing, Yahoo, DuckDuckGo, Baidu, Yandex, Sogou, and more)');
console.log('🌐 Universal access: User-agent: * allows all crawlers by default');
console.log('🚫 Disallowed: admin, private, build directories');

