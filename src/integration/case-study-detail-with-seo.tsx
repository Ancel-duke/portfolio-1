import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { SEOHead } from '@/domains/seo'
import { CaseStudyDetailView } from '@/domains/case-studies'
import {
  generateCaseStudySchema,
  generateTechArticleSchema,
  generateBreadcrumbSchema,
} from '@/domains/seo/schemas'
import { getCaseStudyBySlug } from '@/domains/case-studies/services/case-study-query'
import { getCaseStudyMetaDescription, getCaseStudyOgTitle } from '@/shared/utils/metadata'

export default function CaseStudyDetailWithSeo() {
  const { slug } = useParams<{ slug: string }>()
  const caseStudy = useMemo(() => getCaseStudyBySlug(slug), [slug])

  if (!caseStudy) {
    return (
      <>
        <SEOHead
          title="404 - Case Study Not Found"
          description="The case study you are looking for does not exist or has been moved. Return to case studies to explore other projects."
          canonical="/case-studies/404"
          noindex={true}
        />
        <CaseStudyDetailView initialSlug={slug} />
      </>
    )
  }

  const role = (caseStudy.role || '').toLowerCase()
  const title = (caseStudy.title || '').toLowerCase()
  const isLabProject =
    role.includes('frontend') ||
    title.includes('tracker') ||
    title.includes('timer') ||
    title.includes('travelogue') ||
    title.includes('scheduler') ||
    title.includes('academy')

  const parentSection = isLabProject ? 'Labs & Experiments' : 'Case Studies'
  const parentUrl = isLabProject ? '/labs-experiments' : '/case-studies'
  const metaDescription = getCaseStudyMetaDescription(caseStudy)
  const ogTitle = getCaseStudyOgTitle(caseStudy)
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: parentSection, url: parentUrl },
    { name: caseStudy.title, url: `/case-studies/${caseStudy.slug}` },
  ]
  const jsonLd = [
    generateCaseStudySchema(caseStudy),
    generateTechArticleSchema(caseStudy),
    generateBreadcrumbSchema(breadcrumbItems),
  ]

  return (
    <>
      <SEOHead
        title={caseStudy.title}
        description={metaDescription}
        canonical={`/case-studies/${caseStudy.slug}`}
        ogImage={caseStudy.images.hero}
        ogTitle={ogTitle}
        ogType="article"
        keywords={caseStudy.technologies.map((tech) => tech.name)}
        publishedTime={caseStudy.year}
        jsonLd={jsonLd}
      />
      <CaseStudyDetailView caseStudy={caseStudy} initialSlug={slug} />
    </>
  )
}
