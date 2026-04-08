import blogData from '@/data/blog.json'
import type { BlogPost } from '../types/blog-post'

export function titleToSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

/** Canonical URL slug: explicit `slug` from CMS/JSON when present, else derived from title. */
export function postSlug(post: { slug?: string; title: string }): string {
  const s = post.slug?.trim()
  if (s) return s
  return titleToSlug(post.title)
}

export function getBlogPostBySlug(slug: string | undefined): BlogPost | undefined {
  if (!slug) return undefined
  return (blogData as BlogPost[]).find((p) => postSlug(p) === slug)
}
