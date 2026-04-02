export interface BlogPost {
  id: number
  title: string
  excerpt: string
  content: string
  tags: string[]
  date: string
  readTime: string
  image?: string
  level?: string
  whoThisIsFor?: string
  problem?: string
  businessOutcome?: string
  metrics?: string[]
  tradeoffs?: string
  challenges?: string
  author?: { name: string; avatar: string; bio: string }
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
