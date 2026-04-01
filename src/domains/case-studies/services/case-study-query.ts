import caseStudiesData from '@/data/case-studies.json'
import type { CaseStudy } from '../types/case-study'

export function getCaseStudyBySlug(slug: string | undefined): CaseStudy | undefined {
  if (!slug) return undefined
  return (caseStudiesData as CaseStudy[]).find((cs) => cs.slug === slug)
}
