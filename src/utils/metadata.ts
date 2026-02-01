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
