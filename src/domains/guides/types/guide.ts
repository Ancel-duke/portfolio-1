export interface Guide {
  title: string
  slug: string
  summary: string
  tech_stack: string[]
  problem: string
  architecture: string
  measurable_outcome: string
  related_topics: string[]
  related_case_studies: string[]
  template_type: 'technology_deep_dive' | 'case_study_breakdown' | 'comparison'
  body: string
  date?: string
  readTime?: string
}
