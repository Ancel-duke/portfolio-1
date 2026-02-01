const fs = require("fs");
const path = require("path");

const domain = "https://ancel.co.ke";
const publicDir = path.join(__dirname, "../public");
const dataDir = path.join(__dirname, "../src/data");

// BraveBot and other crawlers use <lastmod> to detect changes (ISO 8601 date)
const lastmod = new Date().toISOString().split("T")[0];

// Static routes (always included)
const staticPages = [
  { path: "/", changefreq: "weekly", priority: "0.8" },
  { path: "/about", changefreq: "weekly", priority: "0.8" },
  { path: "/projects", changefreq: "weekly", priority: "0.8" },
  { path: "/case-studies", changefreq: "weekly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/developer-journal", changefreq: "weekly", priority: "0.8" },
  { path: "/timeline", changefreq: "weekly", priority: "0.8" },
  { path: "/stack", changefreq: "weekly", priority: "0.8" },
  { path: "/fun", changefreq: "weekly", priority: "0.8" },
  { path: "/labs-experiments", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "weekly", priority: "0.8" },
];

function loadJson(filePath) {
  try {
    const fullPath = path.join(dataDir, filePath);
    if (fs.existsSync(fullPath)) {
      return JSON.parse(fs.readFileSync(fullPath, "utf8"));
    }
  } catch (e) {
    console.warn("Warning: could not load", filePath, e.message);
  }
  return null;
}

// Dynamic: case-studies from case-studies.json
let caseStudyPaths = [];
const caseStudiesData = loadJson("case-studies.json");
if (Array.isArray(caseStudiesData)) {
  caseStudyPaths = caseStudiesData.map((cs) => ({
    path: `/case-studies/${cs.slug}`,
    changefreq: "weekly",
    priority: "0.8",
  }));
} else if (caseStudiesData && Array.isArray(caseStudiesData.caseStudies)) {
  caseStudyPaths = caseStudiesData.caseStudies.map((cs) => ({
    path: `/case-studies/${cs.slug}`,
    changefreq: "weekly",
    priority: "0.8",
  }));
}

// Dynamic: blog posts — App uses /developer-journal/:slug (slug from title)
function slugFromTitle(title) {
  if (!title) return "";
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

let blogPaths = [];
const blogData = loadJson("blog.json");
if (Array.isArray(blogData)) {
  blogData.forEach((post) => {
    const slug = slugFromTitle(post.title);
    if (slug) {
      blogPaths.push({
        path: `/developer-journal/${slug}`,
        changefreq: "weekly",
        priority: "0.8",
      });
    }
  });
}

// If blog-posts.json exists with slugs, add any missing developer-journal URLs
const blogPostsData = loadJson("blog-posts.json");
if (blogPostsData && Array.isArray(blogPostsData.posts)) {
  blogPostsData.posts.forEach((post) => {
    const slug = post.slug || slugFromTitle(post.title);
    if (slug) {
      const path = `/developer-journal/${slug}`;
      if (!blogPaths.some((p) => p.path === path)) {
        blogPaths.push({ path, changefreq: "weekly", priority: "0.8" });
      }
    }
  });
}

const allUrls = [
  ...staticPages,
  ...caseStudyPaths,
  ...blogPaths,
];

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls
  .map(
    (item) => `
  <url>
    <loc>${domain}${item.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join("")}
</urlset>`;

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
console.log("✅ sitemap.xml generated");
console.log(`   Static: ${staticPages.length}, Case studies: ${caseStudyPaths.length}, Blog: ${blogPaths.length}, Total: ${allUrls.length}`);
