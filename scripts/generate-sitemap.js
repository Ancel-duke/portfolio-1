const fs = require("fs");
const path = require("path");

const domain = "https://ancel.co.ke";
const publicDir = path.join(__dirname, "../public");
const dataDir = path.join(__dirname, "../src/data");

// ISO 8601 date
const lastmod = new Date().toISOString().split("T")[0];

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

// Static routes
const staticPages = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/projects", changefreq: "weekly", priority: "0.9" },
  { path: "/case-studies", changefreq: "weekly", priority: "0.9" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/developer-journal", changefreq: "weekly", priority: "0.8" },
  { path: "/about", changefreq: "weekly", priority: "0.8" },
  { path: "/guides", changefreq: "weekly", priority: "0.8" },
  { path: "/timeline", changefreq: "weekly", priority: "0.8" },
  { path: "/stack", changefreq: "weekly", priority: "0.8" },
  { path: "/fun", changefreq: "weekly", priority: "0.8" },
  { path: "/labs-experiments", changefreq: "weekly", priority: "0.8" },
  { path: "/contact", changefreq: "weekly", priority: "0.8" },
  { path: "/nextjs-developer-kenya", changefreq: "weekly", priority: "0.8" },
  { path: "/ai-index", changefreq: "weekly", priority: "0.9" },  // AI crawler hub
];

let urls = [...staticPages];

// Dynamic: projects from projects.json
const projectsData = loadJson("projects.json");
if (Array.isArray(projectsData)) {
  projectsData.forEach((project) => {
    if (project.slug) {
      urls.push({
        path: `/projects/${project.slug}`,
        changefreq: "weekly",
        priority: "0.9",
      });
    }
  });
}

// Dynamic: case-studies from case-studies.json
const caseStudiesData = loadJson("case-studies.json");
function addCaseStudies(dataList) {
  dataList.forEach((cs) => {
    if (cs.slug) {
      urls.push({
        path: `/case-studies/${cs.slug}`,
        changefreq: "weekly",
        priority: "0.9",
      });
    }
  });
}
if (Array.isArray(caseStudiesData)) {
  addCaseStudies(caseStudiesData);
} else if (caseStudiesData && Array.isArray(caseStudiesData.caseStudies)) {
  addCaseStudies(caseStudiesData.caseStudies);
}

// Dynamic: blog posts from blog.json
function slugFromTitle(title) {
  if (!title) return "";
  return title.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
}

const blogData = loadJson("blog.json");
if (Array.isArray(blogData)) {
  blogData.forEach((post) => {
    const slug = post.slug || slugFromTitle(post.title);
    if (slug) {
      urls.push({
        path: `/developer-journal/${slug}`,
        changefreq: "weekly",
        priority: "0.8",
      });
    }
  });
}

// Dynamic: guides from guides.json
const guidesData = loadJson("guides.json");
if (Array.isArray(guidesData)) {
  guidesData.forEach((g) => {
    if (g.slug) {
      urls.push({
        path: `/guides/${g.slug}`,
        changefreq: "weekly",
        priority: "0.8",
      });
    }
  });
}

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls
  .map(
    (item) => `  <url>
    <loc>${domain}${item.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${item.changefreq}</changefreq>
    <priority>${item.priority}</priority>
  </url>`
  )
  .join("\n")}
</urlset>`;

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

fs.writeFileSync(path.join(publicDir, "sitemap.xml"), sitemap);
console.log("✅ sitemap.xml generated with exact SGE specifications");
