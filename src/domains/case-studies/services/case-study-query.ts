import caseStudiesData from '@/data/case-studies.json'
import type { CaseStudy } from '../types/case-study'

export function getCaseStudyBySlug(slug: string | undefined): CaseStudy | undefined {
  if (!slug) return undefined
  return (caseStudiesData as CaseStudy[]).find((cs) => cs.slug === slug)
}

/** Matches CaseStudyDetailPage: lab-style studies list under Labs & Experiments. */
export function isLabCaseStudy(caseStudy: Pick<CaseStudy, 'role' | 'title'>): boolean {
  const role = (caseStudy.role || '').toLowerCase()
  const title = (caseStudy.title || '').toLowerCase()
  return (
    role.includes('frontend') ||
    title.includes('tracker') ||
    title.includes('timer') ||
    title.includes('travelogue') ||
    title.includes('scheduler') ||
    title.includes('academy')
  )
}
