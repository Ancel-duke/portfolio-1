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

/** Project metadata from projects.json entry (for project list page or modal context) */
export function getProjectMetadata(project: {
  title: string
  description: string
  id: number
  displayTitle?: string
  technologies?: Array<{ name: string }>
  image?: string
}): PageMetadata {
  const name = (project.displayTitle || project.title).split(/[:|-]/)[0].trim()
  const techKeywords = (project.technologies || []).slice(0, 8).map((t) => (typeof t === 'string' ? t : t.name))
  return {
    title: `${name} — Project by Ancel Ajanga`,
    description: project.description,
    canonical: `${BASE_URL}/projects`,
    ogImage: project.image ? `${BASE_URL}${project.image}` : undefined,
    keywords: [name, 'Ancel Ajanga', 'Fullstack Engineer', ...techKeywords],
  }
}

/** Case study metadata from case-studies.json entry */
export function getCaseStudyMetadata(caseStudy: {
  title: string
  subtitle: string
  slug: string
  images?: { hero?: string }
  technologies?: Array<{ name: string }>
}): PageMetadata {
  const projectName = caseStudy.title.split(' - ')[0]?.trim() || caseStudy.title
  const techNames = (caseStudy.technologies || []).map((t) => (typeof t === 'string' ? t : t.name))
  return {
    title: caseStudy.title,
    description: caseStudy.subtitle,
    canonical: `${BASE_URL}/case-studies/${caseStudy.slug}`,
    ogImage: caseStudy.images?.hero ? `${BASE_URL}${caseStudy.images.hero}` : undefined,
    keywords: [projectName, 'Ancel Ajanga', 'Fullstack Engineer', 'Case Study', ...techNames],
  }
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
  title: string
  excerpt: string
  id: number
  slug?: string
  image?: string
  tags?: string[]
}): PageMetadata {
  const path = post.slug ? `/developer-journal/${post.slug}` : `/developer-journal/${post.id}`
  return {
    title: post.title,
    description: post.excerpt,
    canonical: `${BASE_URL}${path}`,
    ogImage: post.image ? `${BASE_URL}${post.image}` : undefined,
    keywords: ['Ancel Ajanga', 'Developer Journal', ...(post.tags ?? [])],
  }
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

/** Normalize for slug/title matching. */
function normalizeForMatch(s: string): string {
  return (s || '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

/**
 * Returns case study slug for a project when a matching case study exists (for internal linking).
 * Matches by project.slug === caseStudy.slug or normalized title overlap.
 */
export function getCaseStudySlugForProject(
  caseStudies: Array<{ slug: string; title?: string }>,
  project: { slug?: string; title?: string; displayTitle?: string }
): string | null {
  if (!caseStudies?.length || !project) return null;
  const pSlug = (project.slug || '').toLowerCase().trim();
  const pTitle = normalizeForMatch(project.displayTitle || project.title || '');
  for (const cs of caseStudies) {
    const csSlug = (cs.slug || '').toLowerCase();
    if (pSlug && csSlug && pSlug === csSlug) return cs.slug;
    const csTitle = normalizeForMatch(cs.title || '');
    if (pTitle && csTitle && (csTitle.startsWith(pTitle) || pTitle.startsWith(csTitle))) return cs.slug;
  }
  return null;
}

/**
 * Returns related case study slug or project path for a blog post (title/tags mention known projects).
 */
export function getRelatedCaseStudySlugForPost(
  caseStudies: Array<{ slug: string; title?: string }>,
  post: { title?: string; tags?: string[] }
): string | null {
  if (!caseStudies?.length || !post) return null;
  const text = [(post.title || ''), ...(post.tags || [])].join(' ').toLowerCase();
  const knownSlugs = ['taskforge', 'nestfi', 'signflow', 'opsflow', 'aegis', 'ledgerx', 'educhain', 'edumanage', 'fits-by-aliv', 'elearning-platform', 'habit-tracker', 'travelogue', 'attendance-system', 'finance-tracker', 'fitness-class-scheduler', 'event-countdown-timer', 'rasoha-academy', 'banking-system'];
  for (const slug of knownSlugs) {
    if (text.includes(slug.replace(/-/g, ' ')) || text.includes(slug)) {
      const found = caseStudies.find((cs) => (cs.slug || '').toLowerCase() === slug);
      if (found) return found.slug;
    }
  }
  return null;
}

export interface TopicCluster { id: string; name: string; pillarPath: string }

/**
 * Returns topic clusters that include this case study slug (for pillar linking).
 */
export function getClustersForCaseStudy(
  clusters: Array<{ id: string; name: string; pillarPath: string; caseStudySlugs?: string[] }>,
  caseStudySlug: string
): TopicCluster[] {
  if (!clusters?.length || !caseStudySlug) return [];
  const slug = caseStudySlug.toLowerCase().trim();
  return clusters.filter((c) => c.caseStudySlugs?.some((s) => (s || '').toLowerCase() === slug)).map((c) => ({ id: c.id, name: c.name, pillarPath: c.pillarPath }));
}

/**
 * Returns topic clusters that include this article slug (for pillar linking).
 */
export function getClustersForArticle(
  clusters: Array<{ id: string; name: string; pillarPath: string; articleSlugs?: string[] }>,
  articleSlug: string
): TopicCluster[] {
  if (!clusters?.length || !articleSlug) return [];
  const slug = articleSlug.toLowerCase().trim();
  return clusters.filter((c) => c.articleSlugs?.some((s) => (s || '').toLowerCase() === slug)).map((c) => ({ id: c.id, name: c.name, pillarPath: c.pillarPath }));
}
