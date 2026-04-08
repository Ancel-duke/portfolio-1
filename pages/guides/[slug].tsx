import { GuideDetailView } from '@/domains/guides'
import { SEOHead } from '@/domains/seo'
import {
  generateArticleSchema,
  generateTechArticleSchema,
  generateBreadcrumbSchema,
  generateFAQPageSchema,
} from '@/domains/seo/schemas'
import { buildGuideFaqItems } from '@/shared/utils/metadata'
import { getGuideBySlug } from '@/domains/guides/services/guide-query'
import type { Guide } from '@/domains/guides/types/guide'
import guidesData from '@/data/guides.json'
import { SITE } from '@/shared/constants/site'

const guides = guidesData as Guide[]
const INKLY_SLUG = 'secure-real-time-messaging-architecture-inkly'
const INKLY_CANONICAL = `${SITE.url}/guides/${INKLY_SLUG}`
const INKLY_METADATA = {
  title: 'Secure Real-Time Messaging Architecture (Inkly) | Ancel Ajanga',
  description:
    'Secure real-time messaging architecture: privacy-first design, horizontal WebSocket scaling, and failure-safe sync. Lessons from building Inkly in production.',
  canonical: INKLY_CANONICAL,
}

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
  const isInklyGuide = guide.slug === INKLY_SLUG
  const seoTitle = isInklyGuide ? INKLY_METADATA.title : guide.title
  const seoDescription = isInklyGuide ? INKLY_METADATA.description : guide.summary
  const seoCanonical = isInklyGuide ? INKLY_METADATA.canonical : `/guides/${guide.slug}`

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

  const baseArticleJsonLd =
    isTechDeepDive ? generateTechArticleSchema(syntheticCaseStudy) : generateArticleSchema(guide)

  const explicitInklyArticleJsonLd = isInklyGuide
    ? {
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: INKLY_METADATA.title,
        description: INKLY_METADATA.description,
        author: {
          '@type': 'Person',
          name: SITE.name,
          url: SITE.url,
        },
        datePublished: guide.date,
        dateModified: guide.date,
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': INKLY_CANONICAL,
        },
        url: INKLY_CANONICAL,
      }
    : null

  const guideFaqLd = generateFAQPageSchema(buildGuideFaqItems(guide))
  const jsonLd = [
    explicitInklyArticleJsonLd ?? baseArticleJsonLd,
    generateBreadcrumbSchema(breadcrumbItems),
    ...(guideFaqLd ? [guideFaqLd] : []),
  ]

  return (
    <>
      <SEOHead
        title={seoTitle}
        description={seoDescription}
        canonical={seoCanonical}
        ogType="article"
        keywords={guide.tech_stack}
        publishedTime={guide.date}
        modifiedTime={guide.date}
        twitterCard="summary_large_image"
        noindex={false}
        nofollow={false}
        jsonLd={jsonLd}
      />
      <GuideDetailView guide={guide} initialSlug={slug} />
    </>
  )
}
