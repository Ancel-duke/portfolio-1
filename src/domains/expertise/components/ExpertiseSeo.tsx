import React from 'react'
import { SEOHead } from '@/domains/seo'
import { generateBreadcrumbSchema } from '@/domains/seo/schemas'

type ExpertiseSeoProps = {
  title: string
  description: string
  path: `/expertise/${string}`
  keywords?: string[]
}

export function ExpertiseSeo({ title, description, path, keywords = [] }: ExpertiseSeoProps) {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Stack & expertise', url: '/stack' },
    { name: title, url: path },
  ]
  return (
    <SEOHead
      title={title}
      description={description}
      canonical={path}
      keywords={keywords}
      ogType="article"
      jsonLd={generateBreadcrumbSchema(breadcrumbItems)}
    />
  )
}

/** Semantic internal links for topical authority (all expertise pages). */
export function ExpertiseRelatedHub() {
  return (
    <aside
      className="mt-12 p-6 rounded-2xl border border-border bg-muted/30"
      aria-label="Related engineering resources"
    >
      <h2 className="text-lg font-bold mb-3">Explore related work</h2>
      <ul className="space-y-2 text-muted-foreground text-sm sm:text-base list-disc list-inside">
        <li>
          <a href="/case-studies" className="text-primary hover:underline font-medium">
            Technical case studies index
          </a>{' '}
          — NestFi, LedgerX, Inkly, Aegis, and other architecture write-ups with TechArticle JSON-LD.
        </li>
        <li>
          <a href="/projects" className="text-primary hover:underline font-medium">
            Portfolio projects hub
          </a>{' '}
          — SoftwareApplication schema for each build (live demos and repos where public).
        </li>
        <li>
          <a href="/developer-journal" className="text-primary hover:underline font-medium">
            Developer Journal (blog)
          </a>{' '}
          — narrative deep dives that pair with case studies and guides.
        </li>
        <li>
          <a href="/guides" className="text-primary hover:underline font-medium">
            Step-by-step engineering guides
          </a>{' '}
          — comparisons and how-tos linked to real systems in the portfolio.
        </li>
      </ul>
    </aside>
  )
}
