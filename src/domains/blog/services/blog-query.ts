import blogData from '@/data/blog.json'
import type { BlogPost } from '../types/blog-post'

export function titleToSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export function getBlogPostBySlug(slug: string | undefined): BlogPost | undefined {
  if (!slug) return undefined
  return (blogData as BlogPost[]).find((p) => titleToSlug(p.title) === slug)
}
