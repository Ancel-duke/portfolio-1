// Note: JSON imports are handled dynamically in the components
// This avoids build-time import issues with JSON files

/** E-A-T: Build knowsAbout as Thing[] with sameAs to authoritative sources (Wikidata/official docs) */
export function getKnowsAboutAsThings(
  techNames: string[],
  techToAuthoritative: Record<string, string>
): Array<{ "@type": "Thing"; name: string; sameAs?: string }> {
  const seen = new Set<string>();
  return techNames
    .filter((name) => {
      const key = name.trim();
      if (!key || seen.has(key)) return false;
      seen.add(key);
      return true;
    })
    .map((name) => {
      const url = techToAuthoritative[name] ?? techToAuthoritative[name.replace(/\s*\d+\.?\d*$/, "").trim()];
      const thing: { "@type": "Thing"; name: string; sameAs?: string } = { "@type": "Thing", name };
      if (url) thing.sameAs = url;
      return thing;
    });
}

/** Top projects for JSON-LD and SEO (NestFi, SignFlow, OpsFlow, Aegis, LedgerX, EduChain, EduManage, TaskForge). */
export const TOP_PROJECT_NAMES = ["NestFi", "SignFlow", "OpsFlow", "Aegis", "LedgerX", "EduChain", "EduManage", "TaskForge"] as const;

/** Person Schema for Homepage. Pass stack tech names + techToAuthoritative for E-A-T knowsAbout as Thing[]. */
export const generatePersonSchema = (opts?: {
  knowsAboutThings?: Array<{ "@type": "Thing"; name: string; sameAs?: string }>;
}) => {
  const systemResilienceThing = { "@type": "Thing" as const, name: "System Resilience" };
  const knowsAbout = opts?.knowsAboutThings?.length
    ? [systemResilienceThing, ...opts.knowsAboutThings]
    : [
        "System Resilience", "Security", "AIOps", "React", "React Native", "Flutter", "Node.js", "Python", "JavaScript",
        "MongoDB", "Express", "NestJS", "PostgreSQL", "Redis", "BullMQ", "Laravel", "Machine Learning", "Angular", "Vue",
        "TypeScript", "Django", "Full Stack Development", "Mobile App Development",
        "Web Development", "UI/UX Design", "API Development", "Database Design"
      ];
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Ancel Ajanga",
    "alternateName": ["Ajanga Ancel", "Duke"],
    "jobTitle": "Fullstack Engineer",
    "description": "Ancel Ajanga (Duke) is a Fullstack Engineer and Software Architect based in Narok and Nairobi, Kenya. Specializes in system resilience, security, and AIOps: hardened backends, fluid frontends, and self-healing infrastructure. Full-stack developer Kenya and East Africa—NestFi, SignFlow, OpsFlow, Aegis, LedgerX, EduChain, EduManage, TaskForge.",
    "url": "https://ancel.co.ke/",
    "image": "https://ancel.co.ke/assets/profile_photo.jpg",
    "email": "ancel.ajanga@yahoo.com",
    "telephone": "+254793558755",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Narok, Nairobi",
      "addressRegion": "Kenya",
      "addressCountry": "KE"
    },
    "sameAs": [
      "https://github.com/Ancel-duke",
      "https://www.linkedin.com/in/ajanga-ancel",
      "https://www.instagram.com/lema.yian._/#"
    ],
    "knowsAbout": knowsAbout,
    "hasOccupation": {
      "@type": "Occupation",
      "name": "Fullstack Engineer",
      "description": "Software engineer and architect—Narok and Nairobi, Kenya. Builds resilient systems with focus on security and AIOps; full request lifecycle from UI to database."
    },
    "alumniOf": {
      "@type": "EducationalOrganization",
      "name": "Moringa School"
    },
    "worksFor": {
      "@type": "Organization",
      "name": "Freelance Developer"
    }
  };
};

/** Software Developer profile JSON-LD: skills, top projects, location Kenya/East Africa, contact. For crawlers and rich results. */
export function generateSoftwareDeveloperSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfilePage",
    "mainEntity": {
      "@type": "Person",
      "name": "Ancel Ajanga",
      "alternateName": ["Ajanga Ancel", "Duke"],
      "jobTitle": "Fullstack Software Engineer",
      "description": "Narok and Nairobi software engineer and architect. Full-stack developer Kenya and East Africa. Security and AIOps. Projects: NestFi, SignFlow, OpsFlow, Aegis, LedgerX, EduChain, EduManage, TaskForge.",
      "url": "https://ancel.co.ke",
      "image": "https://ancel.co.ke/assets/profile_photo.jpg",
      "email": "ancel.ajanga@yahoo.com",
      "telephone": "+254793558755",
      "address": { "@type": "PostalAddress", "addressLocality": "Nairobi", "addressCountry": "Kenya" },
      "knowsAbout": ["Full-stack development", "Security", "AIOps", "System resilience", "NestFi", "SignFlow", "OpsFlow", "Aegis", "LedgerX", "EduChain", "EduManage", "TaskForge", "React", "Node.js", "TypeScript", "NestJS", "Flutter", "PostgreSQL", "MongoDB"],
      "hasCredential": [],
      "sameAs": ["https://github.com/Ancel-duke", "https://www.linkedin.com/in/ajanga-ancel"]
    }
  };
}

// Project Schema for individual projects (SoftwareApplication) — AI-Overview / SGE-friendly; includes contribution and links
export const generateProjectSchema = (project: any) => {
  const techList = Array.isArray(project.technologies)
    ? project.technologies.slice(0, 12).map((t: any) => (typeof t === 'string' ? t : t.name))
    : [];
  const base = "https://ancel.co.ke";
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": project.displayTitle || project.title,
    "description": project.longDescription || project.description,
    "applicationCategory": project.applicationCategory || getApplicationCategory(project.title, project.type),
    "operatingSystem": "Web Browser",
    "url": project.liveUrl ? project.liveUrl : `${base}/projects`,
    "author": {
      "@type": "Person",
      "name": "Ancel Ajanga",
      "jobTitle": "Fullstack Engineer"
    },
    "contributor": {
      "@type": "Person",
      "name": "Ancel Ajanga",
      "jobTitle": "Fullstack Engineer"
    },
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "softwareVersion": "1.0",
    "datePublished": project.year || "2024",
    "programmingLanguage": techList,
    "featureList": project.featureList || project.features || [],
    "image": project.image ? (project.image.startsWith('http') ? project.image : base + (project.image.startsWith('/') ? project.image : '/' + project.image)) : undefined,
    "screenshot": project.image ? (project.image.startsWith('http') ? project.image : base + (project.image.startsWith('/') ? project.image : '/' + project.image)) : undefined,
    "codeRepository": project.repoUrl || project.links?.github || undefined,
    "keywords": [project.displayTitle || project.title, "Ancel Ajanga", "Fullstack Engineer", ...techList].join(", ")
  };
};

/** SoftwareSourceCode schema for projects — links codeRepository to GitHub for E-A-T and crawlability */
export const generateSoftwareSourceCodeSchema = (project: any) => {
  const repoUrl = project.repoUrl || project.links?.github;
  if (!repoUrl) return null;
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareSourceCode",
    "name": project.title,
    "description": project.description,
    "codeRepository": repoUrl,
    "author": {
      "@type": "Person",
      "name": "Ancel Ajanga"
    },
    "programmingLanguage": Array.isArray(project.technologies) ? project.technologies.slice(0, 5) : [],
    "runtimePlatform": "Web Browser",
    "url": project.liveUrl ? `https://ancel.co.ke/projects` : undefined
  };
};

// Blog Post Schema
export const generateBlogPostSchema = (post: any) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": post.title,
  "description": post.excerpt,
  "image": post.image ? (post.image.startsWith("http") ? post.image : `https://ancel.co.ke${post.image.startsWith("/") ? "" : "/"}${post.image}`) : undefined,
  "author": {
    "@type": "Person",
    "name": post.author?.name || "Ancel Ajanga",
    "image": post.author?.avatar ? `https://ancel.co.ke${post.author.avatar}` : undefined,
    "description": post.author?.bio
  },
  "publisher": {
    "@type": "Person",
    "name": "Ancel Ajanga",
    "image": "https://ancel.co.ke/assets/profile_photo.jpg"
  },
  "datePublished": post.date,
  "dateModified": post.date,
  "mainEntityOfPage": {
    "@type": "WebPage",
    "@id": `https://ancel.co.ke/developer-journal/${post.slug || post.id}`
  },
  "url": `https://ancel.co.ke/developer-journal/${post.slug || post.id}`,
  "keywords": Array.isArray(post.tags) ? post.tags.join(", ") : "",
  "articleSection": "Technology",
  "wordCount": typeof post.content === "string" ? post.content.split(/\s+/).filter(Boolean).length : 0,
  "timeRequired": post.readTime
});

// Case Study Schema (CreativeWork)
export const generateCaseStudySchema = (caseStudy: any) => ({
  "@context": "https://schema.org",
  "@type": "CreativeWork",
  "name": caseStudy.title,
  "description": caseStudy.description,
  "author": {
    "@type": "Person",
    "name": "Ancel Ajanga"
  },
  "datePublished": caseStudy.year,
  "url": `https://ancel.co.ke/case-studies/${caseStudy.slug}`,
  "image": caseStudy.images?.hero ? `https://ancel.co.ke${caseStudy.images.hero}` : undefined,
  "keywords": (caseStudy.technologies || []).map((tech: any) => (typeof tech === 'string' ? tech : tech.name)).join(', '),
  "about": {
    "@type": "Thing",
    "name": "Software Development",
    "description": "Full-stack software development and project management"
  },
  "mentions": (caseStudy.technologies || []).map((tech: any) => ({
    "@type": "Thing",
    "name": typeof tech === 'string' ? tech : tech.name
  }))
});

// TechArticle schema for case study pages (AI-first). Maps Architecture, Resilience, Trade-offs, Problem, Solution, Impact.
export function generateTechArticleSchema(caseStudy: any) {
  const baseUrl = 'https://ancel.co.ke';
  const slug = caseStudy.slug;
  const url = `${baseUrl}/case-studies/${slug}`;
  const sections: Array<{ "@type": string; name: string; articleSection: string; articleBody?: string }> = [
    { "@type": "Article", name: caseStudy.title, articleSection: "The Problem", articleBody: caseStudy.problem },
    { "@type": "Article", name: caseStudy.title, articleSection: "The Solution", articleBody: caseStudy.solution },
    { "@type": "Article", name: caseStudy.title, articleSection: "The Impact", articleBody: caseStudy.impact }
  ];
  if (caseStudy.architecture) {
    sections.push({ "@type": "Article", name: caseStudy.title, articleSection: "Architecture", articleBody: caseStudy.architecture });
  }
  if (caseStudy.failureModes) {
    sections.push({ "@type": "Article", name: caseStudy.title, articleSection: "Resilience", articleBody: caseStudy.failureModes });
  }
  if (caseStudy.tradeoffs) {
    sections.push({ "@type": "Article", name: caseStudy.title, articleSection: "Trade-offs", articleBody: caseStudy.tradeoffs });
  }
  const articleSectionStr = sections.map((s) => s.articleSection).join('; ');
  return {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    "name": caseStudy.title,
    "description": caseStudy.description,
    "author": { "@type": "Person", "name": "Ancel Ajanga", "jobTitle": "Fullstack Engineer" },
    "datePublished": caseStudy.year,
    "url": url,
    "image": caseStudy.images?.hero ? `${baseUrl}${caseStudy.images.hero}` : undefined,
    "mainEntityOfPage": { "@type": "WebPage", "@id": url },
    "articleSection": articleSectionStr,
    "hasPart": sections.map((s) => ({
      "@type": "Article",
      "name": s.name,
      "articleSection": s.articleSection,
      "articleBody": s.articleBody
    }))
  };
}

// Website Schema
export const generateWebsiteSchema = () => ({
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Ancel Ajanga Portfolio",
  "alternateName": "Ajanga Ancel Portfolio",
  "description": "Fullstack Software Engineer/Developer & App Developer Portfolio showcasing modern web applications and mobile apps",
  "url": "https://ancel.co.ke",
  "author": {
    "@type": "Person",
    "name": "Ancel Ajanga"
  },
  "potentialAction": {
    "@type": "SearchAction",
  "target": "https://ancel.co.ke/search?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
});

// SiteNavigationElement schema for Nav (AI/crawler discovery)
const BASE_URL = 'https://ancel.co.ke';

export function generateSiteNavigationSchema(navItems: Array<{ name: string; href: string }>): object {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "name": "Main site navigation",
    "description": "Navigation for Ancel Ajanga portfolio — Fullstack Engineer, system resilience.",
    "itemListElement": navItems.map((item, index) => ({
      "@type": "SiteNavigationElement",
      "position": index + 1,
      "name": item.name,
      "url": item.href === '/' ? BASE_URL + '/' : BASE_URL + item.href
    }))
  };
}

// Breadcrumb Schema
export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
  "item": `https://ancel.co.ke${item.url}`
  }))
});

// Portfolio Collection Schema (ItemList of SoftwareApplications)
export const generatePortfolioSchema = (projects: any[] = []) => ({
  "@context": "https://schema.org",
  "@type": "ItemList",
  "name": "Ancel Ajanga's Software Projects",
  "description": "Portfolio of software applications built by Ancel Ajanga",
  "itemListElement": projects.map((project, index) => ({
    "@type": "SoftwareApplication",
    "position": index + 1,
    "name": project.title,
    "description": project.description,
    "applicationCategory": project.applicationCategory || getApplicationCategory(project.title, project.type),
    "operatingSystem": "Web Browser",
    "url": project.liveUrl || undefined,
    "author": { "@type": "Person", "name": "Ancel Ajanga" },
    "offers": { "@type": "Offer", "price": "0", "priceCurrency": "USD" },
    "softwareVersion": "1.0",
    "datePublished": project.year || "2024",
    "programmingLanguage": Array.isArray(project.technologies) ? project.technologies.slice(0, 12) : [],
    "featureList": project.featureList || project.features || [],
    "image": project.image ? `https://ancel.co.ke${project.image}` : undefined
  }))
});

// Helper: application category for SoftwareApplication schema (SGE/AI-Overview)
function getApplicationCategory(title: string, type?: string): string {
  const t = title.toLowerCase();
  if (t.includes('ledgerx') || t.includes('nestfi') || t.includes('finance') || t.includes('banking') || t.includes('money')) return 'FinanceApplication';
  if (t.includes('fitness') || t.includes('health')) return 'HealthApplication';
  if (t.includes('habit') || t.includes('taskforge') || t.includes('productivity')) return 'ProductivityApplication';
  if (t.includes('travel')) return 'TravelApplication';
  if (t.includes('rasoha') || t.includes('edumanage') || t.includes('educhain') || t.includes('e-learning') || t.includes('attendance') || t.includes('school') || t.includes('education') || t.includes('learning')) return 'EducationApplication';
  if (t.includes('opsflow') || t.includes('incident') || t.includes('operations')) return 'BusinessApplication';
  if (t.includes('signflow') || t.includes('sign language') || t.includes('accessibility')) return 'AccessibilityApplication';
  if (t.includes('aegis') || t.includes('infrastructure') || t.includes('security')) return 'UtilitiesApplication';
  if (t.includes('fits by aliv') || t.includes('e-commerce') || t.includes('marketplace')) return 'ShoppingApplication';
  if (t.includes('event') && t.includes('countdown')) return 'UtilitiesApplication';
  return 'WebApplication';
}

// Organization Schema for the portfolio
export const generateOrganizationSchema = () => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Ancel Ajanga - Freelance Developer",
  "alternateName": "Ajanga Ancel - Freelance Developer",
  "description": "Fullstack Software Engineer/Developer & App Developer services specializing in React, Node.js, Python, and modern web technologies",
  "url": "https://ancel.co.ke",
  "logo": "https://ancel.co.ke/assets/profile_photo.jpg",
  "founder": {
    "@type": "Person",
    "name": "Ancel Ajanga"
  },
  "address": {
    "@type": "PostalAddress",
    "addressCountry": "Kenya"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+254793558755",
    "contactType": "customer service",
    "email": "ancel.ajanga@yahoo.com"
  },
  "sameAs": [
    "https://github.com/Ancel-duke",
    "https://www.instagram.com/lema.yian._/#"
  ],
  "knowsAbout": [
    "React", "Node.js", "Python", "JavaScript", "TypeScript", 
    "MongoDB", "Express", "Django", "Full Stack Development", 
    "Mobile App Development", "Web Development", "UI/UX Design"
  ]
});
