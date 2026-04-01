import guidesData from '@/data/guides.json'
import type { Guide } from '../types/guide'

const guides = guidesData as Guide[]

export function getGuideBySlug(slug: string | undefined): Guide | undefined {
  if (!slug) return undefined
  return guides.find((g) => g.slug === slug)
}
