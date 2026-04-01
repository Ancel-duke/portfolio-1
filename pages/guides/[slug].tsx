import { GuideDetailView } from '@/domains/guides'
import { SEOHead } from '@/domains/seo'
import {
  generateArticleSchema,
  generateTechArticleSchema,
  generateBreadcrumbSchema,
} from '@/domains/seo/schemas'
import { getGuideBySlug } from '@/domains/guides/services/guide-query'
import type { Guide } from '@/domains/guides/types/guide'
import guidesData from '@/data/guides.json'

const guides = guidesData as Guide[]

export async function getStaticPaths() {
  const paths = guides.map((g) => ({ params: { slug: g.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const guide = getGuideBySlug(params.slug)
  if (!guide) return { notFound: true }
  return { props: { slug: params.slug, guide } }
}

export default function GuideDetailRoute({ slug, guide }: { slug: string; guide: Guide }) {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: guide.title, url: `/guides/${guide.slug}` },
  ]

  const isTechDeepDive = guide.template_type === 'technology_deep_dive'
  const syntheticCaseStudy = {
    slug: guide.slug,
    title: guide.title,
    description: guide.summary,
    year: guide.date?.slice(0, 4) || '2025',
    problem: guide.problem,
    solution: guide.architecture,
    impact: guide.measurable_outcome,
    architecture: guide.architecture,
    technologies: (guide.tech_stack || []).map((name) => ({ name })),
    images: {},
  }

  const jsonLd = [
    isTechDeepDive ? generateTechArticleSchema(syntheticCaseStudy) : generateArticleSchema(guide),
    generateBreadcrumbSchema(breadcrumbItems),
  ]

  return (
    <>
      <SEOHead
        title={guide.title}
        description={guide.summary}
        canonical={`/guides/${guide.slug}`}
        ogType="article"
        keywords={guide.tech_stack}
        publishedTime={guide.date}
        jsonLd={jsonLd}
      />
      <GuideDetailView guide={guide} initialSlug={slug} />
    </>
  )
}
