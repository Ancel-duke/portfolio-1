/**
 * Transforms full portfolio datasets into minimal records for /ai-index.
 * Used only from getStaticProps so large JSON is not serialized as page props.
 */

const EXCERPT_MAX = 150;
const TECH_SUMMARY_MAX = 120;
const TAGS_SUMMARY_MAX = 80;

export function clipExcerpt(text: string | undefined | null, max = EXCERPT_MAX): string {
  if (text == null || text === '') return '';
  const t = String(text).trim().replace(/\s+/g, ' ');
  if (t.length <= max) return t;
  return `${t.slice(0, max - 1).trimEnd()}…`;
}

export interface AiIndexProject {
  slug: string;
  title: string;
  excerpt: string;
  techSummary: string;
  liveUrl?: string;
}

export interface AiIndexCaseStudy {
  slug: string;
  title: string;
  year: string;
  excerpt: string;
  role: string;
}

export interface AiIndexBlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  level?: string;
  tagsSummary?: string;
}

export interface AiIndexGuide {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  techSummary: string;
}

function techArrayToSummary(technologies: unknown): string {
  if (!Array.isArray(technologies)) return '';
  const names = technologies
    .map((t) => (typeof t === 'string' ? t : (t as { name?: string })?.name ?? ''))
    .filter(Boolean)
    .slice(0, 8);
  return clipExcerpt(names.join(', '), TECH_SUMMARY_MAX);
}

export function selectProjectsForAiIndex(data: unknown): AiIndexProject[] {
  if (!Array.isArray(data)) return [];
  return data.map((raw) => {
    const p = raw as Record<string, unknown>;
    const desc = (p.description ?? p.excerpt ?? '') as string;
    const out: AiIndexProject = {
      slug: String(p.slug ?? ''),
      title: String(p.title ?? ''),
      excerpt: clipExcerpt(desc),
      techSummary: techArrayToSummary(p.technologies),
    };
    if (typeof p.liveUrl === 'string' && p.liveUrl) out.liveUrl = p.liveUrl;
    return out;
  });
}

export function selectCaseStudiesForAiIndex(data: unknown): AiIndexCaseStudy[] {
  if (!Array.isArray(data)) return [];
  return data.map((raw) => {
    const c = raw as Record<string, unknown>;
    return {
      slug: String(c.slug ?? ''),
      title: String(c.title ?? ''),
      year: String(c.year ?? ''),
      excerpt: clipExcerpt((c.description ?? '') as string),
      role: String(c.role ?? ''),
    };
  });
}

export function selectBlogPostsForAiIndex(data: unknown): AiIndexBlogPost[] {
  if (!Array.isArray(data)) return [];
  return data.map((raw) => {
    const b = raw as Record<string, unknown>;
    const tags = b.tags;
    let tagsSummary: string | undefined;
    if (Array.isArray(tags) && tags.length > 0) {
      const s = clipExcerpt(
        tags.slice(0, 5).map(String).join(', '),
        TAGS_SUMMARY_MAX
      );
      if (s) tagsSummary = s;
    }
    const out: AiIndexBlogPost = {
      slug: String(b.slug ?? ''),
      title: String(b.title ?? ''),
      date: String(b.date ?? ''),
      excerpt: clipExcerpt((b.excerpt ?? '') as string),
    };
    if (typeof b.level === 'string' && b.level) out.level = b.level;
    if (tagsSummary) out.tagsSummary = tagsSummary;
    return out;
  });
}

export function selectGuidesForAiIndex(data: unknown): AiIndexGuide[] {
  if (!Array.isArray(data)) return [];
  return data.map((raw) => {
    const g = raw as Record<string, unknown>;
    const ts = g.tech_stack;
    const techSummary =
      Array.isArray(ts) && ts.length > 0
        ? clipExcerpt(ts.slice(0, 6).map(String).join(', '), TECH_SUMMARY_MAX)
        : '';
    return {
      slug: String(g.slug ?? ''),
      title: String(g.title ?? ''),
      date: String(g.date ?? ''),
      excerpt: clipExcerpt((g.summary ?? '') as string),
      techSummary,
    };
  });
}

/** Build-time only: dynamic imports keep heavy JSON out of the page module graph. */
export async function loadAiIndexPageProps(): Promise<{
  projects: AiIndexProject[];
  caseStudies: AiIndexCaseStudy[];
  blogPosts: AiIndexBlogPost[];
  guides: AiIndexGuide[];
}> {
  const [projectsMod, caseStudiesMod, blogMod, guidesMod] = await Promise.all([
    import('@/data/projects.json'),
    import('@/data/case-studies.json'),
    import('@/data/blog.json'),
    import('@/data/guides.json'),
  ]);

  return {
    projects: selectProjectsForAiIndex(projectsMod.default),
    caseStudies: selectCaseStudiesForAiIndex(caseStudiesMod.default),
    blogPosts: selectBlogPostsForAiIndex(blogMod.default),
    guides: selectGuidesForAiIndex(guidesMod.default),
  };
}
