/**
 * Generates sitemap-for-ai.json for SearchGPT, Brave, and LLM-based crawlers.
 * Each entry: url, title, summary (2–3 sentences from content), tech_stack, key_outcome (quantified), category.
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

function slugFromTitle(title) {
  if (!title || typeof title !== "string") return "";
  return title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

/** Extract 2–3 sentences from text (stops at ~400 chars or 3 sentence ends). */
function toSummary(text, maxSentences = 3) {
  if (!text || typeof text !== "string") return "";
  const trimmed = text.trim();
  if (!trimmed) return "";
  let out = "";
  let count = 0;
  for (let i = 0; i < trimmed.length && count < maxSentences; i++) {
    out += trimmed[i];
    if (/[.!?]/.test(trimmed[i])) {
      count++;
      if (count >= maxSentences) break;
    }
  }
  return out.trim() || trimmed.slice(0, 320).trim();
}

/** One quantified outcome from case study (metrics/impact/outcomes). */
function caseStudyKeyOutcome(cs) {
  if (cs.metrics && cs.metrics.length > 0) {
    const m = cs.metrics[0];
    return `${m.label}: ${m.value}`;
  }
  if (cs.outcomes && Array.isArray(cs.outcomes) && cs.outcomes.length > 0) {
    const first = cs.outcomes[0];
    return typeof first === "string" ? first : first.value || first.label || String(first);
  }
  const impact = (cs.impact || "").trim();
  const firstSentence = impact.match(/^[^.!?]+[.!?]?/);
  return firstSentence ? firstSentence[0].trim() : impact.slice(0, 80) || "Production-ready system.";
}

/** Business outcome for high-ticket / AI discovery: 1–2 sentences from impact or outcomes. */
function caseStudyBusinessOutcome(cs) {
  const impact = (cs.impact || "").trim();
  if (impact) return impact.slice(0, 280).trim();
  const outcomes = cs.outcomes;
  if (Array.isArray(outcomes) && outcomes.length > 0) {
    const first = outcomes[0];
    const str = typeof first === "string" ? first : (first.value || first.label || String(first));
    return str.slice(0, 280).trim();
  }
  return (cs.description || "").trim().slice(0, 280) || null;
}

/** Scale or metric string for high-ticket signal (e.g. "10K+ users", "multi-tenant", "fintech-grade"). */
function caseStudyScaleMetric(cs) {
  if (cs.metrics && cs.metrics.length > 0) {
    return cs.metrics.map((m) => `${m.label}: ${m.value}`).join("; ");
  }
  const impact = (cs.impact || "").trim();
  const scaleMatch = impact.match(/\d+K?\+\s*(users|students|concurrent)|multi-tenant|fintech|sub-[\dms]+|99\.\d+%|10K\+|100\+/i);
  return scaleMatch ? scaleMatch[0] : null;
}

/** One quantified outcome from project. */
function projectKeyOutcome(p) {
  if (p.impactMetric && typeof p.impactMetric === "string") return p.impactMetric.trim();
  if (p.outcomes && typeof p.outcomes === "string") return p.outcomes.slice(0, 120).trim();
  const desc = (p.description || p.longDescription || "").trim();
  const first = desc.match(/^[^.!?]+[.!?]?/);
  return first ? first[0].trim() : desc.slice(0, 80) || "Delivered application.";
}

/** One quantified outcome from article (excerpt or "Results" section). */
function articleKeyOutcome(post) {
  const excerpt = (post.excerpt || "").trim();
  if (excerpt) return excerpt.slice(0, 120).trim();
  const content = (post.content || "").trim();
  const resultsMatch = content.match(/(?:Results?|IV\.\s*Results?|V\.\s*Results?|VI\.\s*Results?)[\s\S]{0,200}/i);
  if (resultsMatch) return resultsMatch[0].replace(/\s+/g, " ").slice(0, 120).trim();
  return content.slice(0, 120).trim() || "Technical article by Ancel Ajanga.";
}

const staticPages = [
  { path: "/", name: "Home", summary: "Portfolio of Ancel Ajanga, Fullstack Engineer. System resilience from UI to database. Nairobi and Narok, Kenya." },
  { path: "/about", name: "About", summary: "About Ancel Ajanga: Fullstack Software Engineer and Architect. Nairobi, Kenya. Resilient systems, security, and AIOps." },
  { path: "/projects", name: "Projects", summary: "Software projects by Ancel Ajanga: NestFi, SignFlow, OpsFlow, Aegis, LedgerX, EduChain, EduManage, TaskForge, and more." },
  { path: "/case-studies", name: "Case Studies", summary: "Technical case studies with architecture, problem, solution, impact, and measurable outcomes. By Ancel Ajanga." },
  { path: "/developer-journal", name: "Developer Journal", summary: "Blog and articles on web development, architecture, and lessons learned. By Fullstack Engineer Ancel Ajanga." },
  { path: "/guides", name: "Guides", summary: "Technical guides: architecture deep dives, stack comparisons, and how-I-built breakdowns. 800+ words each, with measurable outcomes." },
  { path: "/timeline", name: "Timeline", summary: "Career timeline and experience of Ancel Ajanga, Fullstack Engineer." },
  { path: "/stack", name: "Stack", summary: "Technology stack and tools used by Ancel Ajanga: React, Node.js, NestJS, PostgreSQL, MongoDB, and more." },
  { path: "/labs-experiments", name: "Labs & Experiments", summary: "Frontend and side projects: habit tracker, fitness scheduler, event countdown, and experiments." },
  { path: "/contact", name: "Contact", summary: "Contact Ancel Ajanga for collaboration, hiring, or fullstack engineering projects." },
  {
    path: "/nextjs-developer-kenya",
    name: "Next.js Developer Kenya",
    summary: "Hire a Next.js developer in Kenya. Full-Stack Developer Nairobi, React & Node.js Kenya. System design and architect Africa. Case studies, tech stack, measurable outcomes.",
    hub_case_studies: ["ledgerx", "nestfi", "aegis", "fits-by-aliv"],
    business_outcomes_summary: "Scalable financial architecture (LedgerX), resilient financial coordination (NestFi), self-healing infrastructure (Aegis), payment-safe e-commerce (Fits by Aliv). Sub-500ms real-time, 10K+ users, fintech-grade auditability.",
  },
];

const projectsData = loadJson("projects.json");
const caseStudiesData = loadJson("case-studies.json");
const blogData = loadJson("blog.json");
const guidesData = loadJson("guides.json");

const projects = Array.isArray(projectsData)
  ? projectsData.map((p) => {
      const techList = p.technologies
        ? Array.isArray(p.technologies)
          ? p.technologies.slice(0, 14).map((t) => (typeof t === "string" ? t : t.name))
          : []
        : [];
      const summaryParts = [
        (p.description || p.longDescription || "").trim(),
        (p.detailedDescription || "").trim().slice(0, 200),
      ].filter(Boolean);
      const summary = toSummary(summaryParts[0] || summaryParts[1] || p.title, 2);
      return {
        url: `${domain}/projects`,
        title: p.displayTitle || p.title,
        summary: summary || `${p.displayTitle || p.title}. By Ancel Ajanga.`,
        tech_stack: techList,
        key_outcome: projectKeyOutcome(p),
        category: "project",
      };
    })
  : [];

const caseStudies = Array.isArray(caseStudiesData)
  ? caseStudiesData.map((cs) => {
      const techList = (cs.technologies || []).map((t) => (typeof t === "string" ? t : t.name));
      const summary = toSummary(
        [cs.description, cs.problemSolutionBridge, cs.impact].filter(Boolean).join(" "),
        3
      );
      return {
        url: `${domain}/case-studies/${cs.slug}`,
        title: cs.title,
        summary: summary || cs.description || cs.subtitle || "",
        tech_stack: techList,
        key_outcome: caseStudyKeyOutcome(cs),
        business_outcome: caseStudyBusinessOutcome(cs),
        scale_or_metric: caseStudyScaleMetric(cs),
        category: "case-study",
      };
    })
  : [];

const articles = Array.isArray(blogData)
  ? blogData.map((post) => {
      const slug = slugFromTitle(post.title);
      const summary = toSummary((post.excerpt || "").trim() + " " + (post.content || "").trim().slice(0, 400), 3);
      const techStack = Array.isArray(post.tags) ? post.tags : [];
      return {
        url: `${domain}/developer-journal/${slug}`,
        title: post.title,
        summary: summary || post.excerpt || "",
        tech_stack: techStack,
        key_outcome: articleKeyOutcome(post),
        category: "article",
      };
    })
  : [];

const guides = Array.isArray(guidesData)
  ? guidesData.map((g) => ({
      url: `${domain}/guides/${g.slug}`,
      title: g.title,
      summary: toSummary((g.summary || "").trim() + " " + (g.measurable_outcome || "").trim(), 3),
      tech_stack: Array.isArray(g.tech_stack) ? g.tech_stack : [],
      key_outcome: (g.measurable_outcome || "").trim().slice(0, 120) || null,
      category: "guide",
    }))
  : [];

const pageEntries = staticPages.map((p) => ({
  url: domain + p.path,
  title: p.name,
  summary: p.summary,
  tech_stack: [],
  key_outcome: null,
  category: "page",
  ...(p.hub_case_studies && { hub_case_studies: p.hub_case_studies }),
  ...(p.business_outcomes_summary && { business_outcomes_summary: p.business_outcomes_summary }),
}));

const allEntries = [
  ...pageEntries,
  ...projects.map((p) => ({ ...p, url: p.url })),
  ...caseStudies,
  ...articles,
  ...guides,
];

const sitemapForAi = {
  "@context": "https://ancel.co.ke",
  name: "Ancel Ajanga Portfolio — AI Sitemap",
  description: "Fullstack Engineer Ancel Ajanga. System resilience from UI to database. Projects, case studies, and articles with technical summaries for LLM and search crawlers.",
  author: "Ancel Ajanga",
  jobTitle: "Fullstack Engineer",
  niche: "System Resilience",
  baseUrl: domain,
  generated: new Date().toISOString(),
  entries: allEntries,
  entities: {
    pages: pageEntries,
    projects: projects.map((p) => ({
      url: p.url,
      title: p.title,
      summary: p.summary,
      tech_stack: p.tech_stack,
      key_outcome: p.key_outcome,
      category: p.category,
    })),
    caseStudies: caseStudies.map((c) => ({
      url: c.url,
      title: c.title,
      summary: c.summary,
      tech_stack: c.tech_stack,
      key_outcome: c.key_outcome,
      business_outcome: c.business_outcome,
      scale_or_metric: c.scale_or_metric,
      category: c.category,
    })),
    articles: articles.map((a) => ({
      url: a.url,
      title: a.title,
      summary: a.summary,
      tech_stack: a.tech_stack,
      key_outcome: a.key_outcome,
      category: a.category,
    })),
    guides: guides.map((g) => ({
      url: g.url,
      title: g.title,
      summary: g.summary,
      tech_stack: g.tech_stack,
      key_outcome: g.key_outcome,
      category: g.category,
    })),
  },
  totalProjects: projects.length,
  totalCaseStudies: caseStudies.length,
  totalArticles: articles.length,
  totalGuides: guides.length,
  totalPages: staticPages.length,
};

const outPath = path.join(publicDir, "sitemap-for-ai.json");
fs.writeFileSync(outPath, JSON.stringify(sitemapForAi, null, 2), "utf8");
console.log(
  "Wrote",
  outPath,
  "—",
  projects.length,
  "projects,",
  caseStudies.length,
  "case studies,",
  articles.length,
  "articles,",
  guides.length,
  "guides,",
  staticPages.length,
  "pages."
);
