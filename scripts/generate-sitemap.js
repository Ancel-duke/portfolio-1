const fs = require("fs");
const path = require("path");

const pages = [
  "/",
  "/case-studies",
  "/case-studies/taskforge",
  "/case-studies/e-learning-platform",
  "/case-studies/attendance-system",
  "/blog",
  "/timeline",
  "/stack",
  "/fun",
  "/contact"
];

const domain = "https://your-domain.com"; // change this to your real domain

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages
  .map(
    (page) => `
  <url>
    <loc>${domain}${page}</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`
  )
  .join("")}
</urlset>`;

fs.writeFileSync(path.join(__dirname, "../public/sitemap.xml"), sitemap);
console.log("✅ sitemap.xml generated");
