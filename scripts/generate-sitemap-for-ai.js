/**
 * Generates sitemap-for-ai.json for SearchGPT, Brave, and AI crawlers.
 * Links all 30+ entities (Projects, Case Studies, main pages) with primary technical keywords.
 * Fullstack Engineer Ancel Ajanga — System Resilience.
 */

const fs = require("fs");
const path = require("path");

const domain = "https://ancel.co.ke";
const publicDir = path.join(__dirname, "../public");
const dataDir = path.join(__dirname, "../src/data");

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

const staticPages = [
  { path: "/", name: "Home", keywords: ["Fullstack Engineer", "Ancel Ajanga", "system resilience", "portfolio"] },
  { path: "/about", name: "About", keywords: ["Fullstack Engineer", "Ancel Ajanga", "system resilience", "Nairobi"] },
  { path: "/projects", name: "Projects", keywords: ["software projects", "Fullstack Engineer", "15 projects", "resilient systems"] },
  { path: "/case-studies", name: "Case Studies", keywords: ["technical case studies", "architecture", "resilience", "trade-offs"] },
  { path: "/developer-journal", name: "Developer Journal", keywords: ["blog", "web development", "software engineering"] },
  { path: "/timeline", name: "Timeline", keywords: ["experience", "education", "career"] },
  { path: "/stack", name: "Stack", keywords: ["tech stack", "technologies", "Fullstack"] },
  { path: "/labs-experiments", name: "Labs & Experiments", keywords: ["frontend", "experiments", "side projects"] },
  { path: "/contact", name: "Contact", keywords: ["hire", "collaboration", "Ancel Ajanga"] },
];

const projectsData = loadJson("projects.json");
const caseStudiesData = loadJson("case-studies.json");

const projects = Array.isArray(projectsData)
  ? projectsData.map((p) => ({
      url: `${domain}/projects`,
      slug: p.slug || p.title?.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""),
      name: p.displayTitle || p.title,
      type: "project",
      keywords: [
        ...(p.technologies ? (Array.isArray(p.technologies) ? p.technologies.slice(0, 8).map((t) => (typeof t === "string" ? t : t.name)) : []) : []),
        p.applicationCategory || "WebApplication",
        "Ancel Ajanga",
        "Fullstack Engineer",
      ].filter(Boolean),
    }))
  : [];

const caseStudies = Array.isArray(caseStudiesData)
  ? caseStudiesData.map((cs) => ({
      url: `${domain}/case-studies/${cs.slug}`,
      slug: cs.slug,
      name: cs.title,
      type: "case-study",
      keywords: [
        ...(cs.technologies ? cs.technologies.map((t) => (typeof t === "string" ? t : t.name)) : []),
        "architecture",
        "resilience",
        "trade-offs",
        "Ancel Ajanga",
        "Fullstack Engineer",
      ].filter(Boolean),
    }))
  : [];

const sitemapForAi = {
  "@context": "https://ancel.co.ke",
  name: "Ancel Ajanga Portfolio — AI Sitemap",
  description: "Fullstack Engineer Ancel Ajanga. System resilience from UI to database. 15 projects, 15 case studies, and main pages with technical keywords for AI and search.",
  author: "Ancel Ajanga",
  jobTitle: "Fullstack Engineer",
  niche: "System Resilience",
  baseUrl: domain,
  generated: new Date().toISOString(),
  entities: {
    pages: staticPages.map((p) => ({
      url: domain + p.path,
      name: p.name,
      keywords: p.keywords,
    })),
    projects: projects.map((p) => ({
      url: p.url,
      slug: p.slug,
      name: p.name,
      keywords: p.keywords,
    })),
    caseStudies: caseStudies.map((c) => ({
      url: c.url,
      slug: c.slug,
      name: c.name,
      keywords: c.keywords,
    })),
  },
  totalProjects: projects.length,
  totalCaseStudies: caseStudies.length,
  totalPages: staticPages.length,
};

const outPath = path.join(publicDir, "sitemap-for-ai.json");
fs.writeFileSync(outPath, JSON.stringify(sitemapForAi, null, 2), "utf8");
console.log("Wrote", outPath, "—", projects.length, "projects,", caseStudies.length, "case studies,", staticPages.length, "pages.");
