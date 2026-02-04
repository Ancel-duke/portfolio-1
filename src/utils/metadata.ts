/**
 * Data-driven metadata for SEO (SPA equivalent of Next.js generateMetadata).
 * Pulls title, description, and canonical from JSON so pages and react-helmet-async stay in sync.
 * Use getCaseStudyMetadata / getBlogPostMetadata with SEOHead for consistent meta from data.
 */

const BASE_URL = 'https://ancel.co.ke';

export interface PageMetadata {
  title: string;
  description: string;
  canonical: string;
  ogImage?: string;
  keywords?: string[];
}

/** Project metadata from projects.json entry */
export function getProjectMetadata(project: { title: string; description: string; id: number }): PageMetadata {
  return {
    title: project.title,
    description: project.description,
    canonical: `${BASE_URL}/projects`,
    ogImage: project.description ? undefined : undefined,
    keywords: [],
  };
}

/** Case study metadata from case-studies.json entry */
export function getCaseStudyMetadata(caseStudy: {
  title: string;
  subtitle: string;
  slug: string;
  images?: { hero?: string };
  technologies?: Array<{ name: string }>;
}): PageMetadata {
  return {
    title: caseStudy.title,
    description: caseStudy.subtitle,
    canonical: `${BASE_URL}/case-studies/${caseStudy.slug}`,
    ogImage: caseStudy.images?.hero,
    keywords: caseStudy.technologies?.map((t) => t.name) ?? [],
  };
}

/** Max length for meta description (AI Overviews / Discover). */
const META_DESCRIPTION_MAX_LENGTH = 155;

/**
 * Definitive "is-a" statement for AI Overviews and Discover (first 155 chars).
 * Format: "[Project Name] is a [type] case study by Fullstack Engineer Ancel Ajanga, covering [architecture/resilience/trade-offs]."
 */
export function getCaseStudyMetaDescription(caseStudy: {
  title: string;
  architecture?: string;
  features?: string[];
  subtitle?: string;
  description?: string;
}): string {
  const projectName = (caseStudy.title?.split(' - ')[0]?.trim() || caseStudy.title?.trim() || 'Project');
  const isA = `${projectName} is a technical case study by Fullstack Engineer Ancel Ajanga, covering architecture, resilience, and trade-offs.`;
  const trimmed = isA.slice(0, META_DESCRIPTION_MAX_LENGTH);
  return trimmed.slice(-1) === '.' ? trimmed : trimmed.slice(0, trimmed.lastIndexOf(' ') + 1) + '.';
}

/**
 * Alt text for case study images (AI-first pattern).
 * Format: "[Project Name] Architecture Diagram - [Component Name] by Ancel Ajanga."
 */
export function getCaseStudyImageAlt(projectName: string, componentName: string): string {
  const name = projectName?.trim() || 'Project';
  const component = componentName?.trim() || 'Screenshot';
  return `${name} Architecture Diagram - ${component} by Ancel Ajanga.`;
}

/** Discover-friendly og:title hook (e.g. "How I Built a Self-Healing E-commerce Engine"). */
const OG_TITLE_HOOKS: Record<string, string> = {
  taskforge: 'How I Built Real-Time Collaboration Without the Conflicts',
  'elearning-platform': 'How I Built an LMS for 10K+ Students With Sub-2s Loads',
  'attendance-system': 'How I Cut Admin Overhead 70% With Resilient Attendance',
  'personal-finance-tracker': 'How I Built a Finance Tracker That Makes Every Penny Visible',
  'fitness-class-scheduler': 'How I Built a Fitness Scheduler That Never Double-Books',
  'habit-tracker': 'How I Built a Habit Tracker That Turns Streaks Into Momentum',
  'event-countdown-timer': 'How I Built a Countdown App That Never Misses a Milestone',
  travelogue: 'How I Built a Travel Platform With Maps and Stories',
  'rasoha-academy': 'How I Built One Site for an Entire School Community',
  'banking-system': 'How I Modeled Banking Logic With Clean OOP',
  educhain: 'How I Put Tamper-Proof Certificates on the Blockchain',
  ledgerx: 'How I Built Double-Entry Ledgers That Audit Themselves',
  opsflow: 'How I Built an Incident Platform That Knows When Things Break',
  signflow: 'How I Built Real-Time Sign Language With Zero Latency',
  nestfi: 'How I Solved 2AM Financial Race Conditions',
  edumanage: 'How I Built One Platform for Many Schools With Zero Leaks',
  aegis: 'How I Built a Self-Healing Infrastructure Engine',
  'fits-by-aliv': 'How I Built an E-Commerce Engine That Never Oversells'
};

export function getCaseStudyOgTitle(caseStudy: { slug: string; title?: string }): string {
  const hook = OG_TITLE_HOOKS[caseStudy.slug?.toLowerCase()];
  if (hook) return hook;
  const name = caseStudy.title?.split(' - ')[0]?.trim() || 'This System';
  return `How I Built ${name}`;
}

/** Blog post metadata from blog.json entry */
export function getBlogPostMetadata(post: {
  title: string;
  excerpt: string;
  id: number;
  image?: string;
  tags?: string[];
}): PageMetadata {
  return {
    title: post.title,
    description: post.excerpt,
    canonical: `${BASE_URL}/blog/${post.id}`,
    ogImage: post.image,
    keywords: post.tags ?? [],
  };
}

/** Static page metadata (about, contact, etc.) */
export function getStaticPageMetadata(slug: string, meta: { title: string; description: string }): PageMetadata {
  const path = slug === 'home' ? '' : `/${slug}`;
  return {
    title: meta.title,
    description: meta.description,
    canonical: `${BASE_URL}${path}`,
  };
}
