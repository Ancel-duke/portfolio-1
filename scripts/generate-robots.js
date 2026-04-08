const fs = require('fs');
const path = require('path');

/**
 * Explicit Allow rules for major search + AI / answer engines.
 * Static routes (projects, journal, case studies, JSON-LD) stay crawlable — no Disallow of /.
 */
const generateRobotsTxt = () => {
  return `# https://ancel.co.ke
User-agent: *
Allow: /

# Search
User-agent: Googlebot
Allow: /

User-agent: Googlebot-Image
Allow: /

User-agent: Bingbot
Allow: /

User-agent: DuckDuckBot
Allow: /

# OpenAI
User-agent: GPTBot
Allow: /

User-agent: ChatGPT-User
Allow: /

# Google AI (Gemini / AI Overviews)
User-agent: Google-Extended
Allow: /

# Anthropic
User-agent: ClaudeBot
Allow: /

User-agent: anthropic-ai
Allow: /

User-agent: Claude-Web
Allow: /

# Perplexity
User-agent: PerplexityBot
Allow: /

# Amazon
User-agent: Amazonbot
Allow: /

# Open commons / training (Common Crawl)
User-agent: CCBot
Allow: /

# Brave Search
User-agent: Bravebot
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
console.log('✅ Robots.txt generated with search + AI crawler allow rules.');
