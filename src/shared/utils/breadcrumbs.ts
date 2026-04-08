import { getCaseStudyBySlug, isLabCaseStudy } from '@/domains/case-studies/services/case-study-query'
import { getBlogPostBySlug } from '@/domains/blog/services/blog-query'
import { getGuideBySlug } from '@/domains/guides/services/guide-query'
import { getProjectBySlug } from '@/domains/projects/services/projects-data'
import expertiseData from '@/data/expertise.json'
import { generateBreadcrumbSchema } from '@/domains/seo/schemas'

export type BreadcrumbTrailItem = { name: string; url: string }

const EXPERTISE = expertiseData as Record<string, { title: string }>

/** Single-segment path labels (pathname without leading slash). */
const STATIC_SEGMENT_LABELS: Record<string, string> = {
  about: 'About',
  'ancel-ajanga': 'Ancel Ajanga',
  projects: 'Projects',
  'case-studies': 'Case Studies',
  'developer-journal': 'Developer Journal',
  guides: 'Guides',
  expertise: 'Expertise',
  contact: 'Contact',
  stack: 'Tech stack',
  timeline: 'Timeline',
  fun: 'Fun',
  'labs-experiments': 'Labs & Experiments',
  'work-with-me': 'Work With Me',
  'nextjs-developer-kenya': 'Next.js Developer Kenya',
  blog: 'Developer Journal',
  'ai-index': 'AI Index',
  '404': 'Page not found',
}

export function normalizeSitePath(asPathOrPathname: string): string {
  const noQuery = asPathOrPathname.split('?')[0].split('#')[0]
  let path = noQuery.trim()
  if (path !== '/' && path.endsWith('/')) path = path.slice(0, -1)
  return path || '/'
}

export function shouldShowSiteBreadcrumbs(normalizedPath: string): boolean {
  return normalizedPath !== '/' && normalizedPath !== ''
}

function titleFromSlug(slug: string): string {
  return slug
    .split('-')
    .filter(Boolean)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(' ')
}

function pushSegment(
  acc: BreadcrumbTrailItem[],
  href: string,
  segmentKey: string,
  labelOverride?: string
) {
  const label =
    labelOverride ?? STATIC_SEGMENT_LABELS[segmentKey] ?? titleFromSlug(segmentKey)
  acc.push({ name: label, url: href })
}

/**
 * Build Home → … trail from a normalized path (e.g. `/projects/inkly`).
 * Aligns with existing hub labels (e.g. expertise → Stack & expertise parent).
 */
export function getBreadcrumbItemsForPath(normalizedPath: string): BreadcrumbTrailItem[] {
  if (!shouldShowSiteBreadcrumbs(normalizedPath)) return []

  const segments = normalizedPath.replace(/^\//, '').split('/').filter(Boolean)
  if (segments.length === 0) return []

  const out: BreadcrumbTrailItem[] = [{ name: 'Home', url: '/' }]

  // --- Special full-path shapes ---
  if (segments[0] === 'case-studies' && segments[1]) {
    const slug = segments[1]
    const cs = getCaseStudyBySlug(slug)
    if (cs && isLabCaseStudy(cs)) {
      out.push({ name: 'Labs & Experiments', url: '/labs-experiments' })
    } else {
      out.push({ name: 'Case Studies', url: '/case-studies' })
    }
    out.push({
      name: cs?.title ?? titleFromSlug(slug),
      url: `/case-studies/${slug}`,
    })
    return out
  }

  if (segments[0] === 'expertise' && segments[1]) {
    const slug = segments[1]
    const title = EXPERTISE[slug]?.title ?? titleFromSlug(slug)
    out.push({ name: 'Stack & expertise', url: '/stack' })
    out.push({ name: title, url: `/expertise/${slug}` })
    return out
  }

  if (segments[0] === 'projects' && segments[1]) {
    const slug = segments[1]
    const proj = getProjectBySlug(slug)
    const title =
      (proj?.title && String(proj.title).split('—')[0].split(':')[0].split(' - ')[0].trim()) ||
      titleFromSlug(slug)
    out.push({ name: 'Projects', url: '/projects' })
    out.push({ name: title || titleFromSlug(slug), url: `/projects/${slug}` })
    return out
  }

  if (segments[0] === 'developer-journal' && segments[1]) {
    const slug = segments[1]
    const post = getBlogPostBySlug(slug)
    out.push({ name: 'Developer Journal', url: '/developer-journal' })
    out.push({
      name: post?.title ?? titleFromSlug(slug),
      url: `/developer-journal/${slug}`,
    })
    return out
  }

  if (segments[0] === 'guides' && segments[1]) {
    const slug = segments[1]
    const guide = getGuideBySlug(slug)
    out.push({ name: 'Guides', url: '/guides' })
    out.push({
      name: guide?.title ?? titleFromSlug(slug),
      url: `/guides/${slug}`,
    })
    return out
  }

  // --- Default: walk segments cumulatively ---
  let cumulative = ''
  for (let i = 0; i < segments.length; i++) {
    const seg = segments[i]
    cumulative += `/${seg}`
    const isLast = i === segments.length - 1

    if (i === 0 && seg === 'blog') {
      pushSegment(out, cumulative, 'blog', 'Developer Journal')
      continue
    }

    if (isLast) {
      let label = STATIC_SEGMENT_LABELS[seg] ?? titleFromSlug(seg)
      if (seg === 'ancel-ajanga' && segments[0] === 'about') {
        label = 'Engineering philosophy'
      }
      pushSegment(out, cumulative, seg, label)
    } else {
      pushSegment(out, cumulative, seg)
    }
  }

  return out
}

export function getGlobalBreadcrumbSchema(normalizedPath: string) {
  const items = getBreadcrumbItemsForPath(normalizedPath)
  if (items.length < 2) return null
  return generateBreadcrumbSchema(items)
}
