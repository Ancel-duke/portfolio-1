export interface Technology {
  name: string
  category: string
  icon: string
}

export interface Metric {
  label: string
  value: string
  description: string
}

export interface CaseStudyImages {
  hero?: string
  before?: string
  after?: string
  gallery?: string[]
}

export interface Testimonial {
  text: string
  author: string
  role: string
  company: string
}

export interface CaseStudy {
  id: number
  slug: string
  title: string
  subtitle: string
  role: string
  timeline: string
  year: string
  status: string
  description: string
  problem: string
  solution: string
  impact: string
  technologies: Technology[]
  features: string[]
  challenges: string[]
  outcomes: string[]
  metrics: Metric[]
  links: { live?: string; github?: string }
  images: CaseStudyImages
  testimonial?: Testimonial
  architecture?: string
  scalability?: string
  failureModes?: string
  security?: string
  frontendEngineering?: string
  tradeoffs?: string
  implementationStatus?: string
  potentialExpansion?: string
  problemSolutionBridge?: string
  keyTerms?: { term: string; explanation: string }[]
  keyTakeaways?: string[]
  seo?: {
    title: string
    description: string
    keywords: string[]
    ogTitle: string
    ogDescription: string
    ogImage: string
    twitterCard: string
    canonicalUrl: string
  }
}
