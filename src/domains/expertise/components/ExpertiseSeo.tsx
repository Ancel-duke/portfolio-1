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
            Case studies
          </a>{' '}
          — production architecture write-ups (NestFi, LedgerX, Aegis, Inkly, and more).
        </li>
        <li>
          <a href="/projects" className="text-primary hover:underline font-medium">
            Projects
          </a>{' '}
          — portfolio apps with SoftwareApplication metadata.
        </li>
        <li>
          <a href="/developer-journal" className="text-primary hover:underline font-medium">
            Developer Journal
          </a>{' '}
          — deeper articles tied to the same systems.
        </li>
        <li>
          <a href="/guides" className="text-primary hover:underline font-medium">
            Guides
          </a>{' '}
          — how-to breakdowns and comparisons.
        </li>
      </ul>
    </aside>
  )
}
