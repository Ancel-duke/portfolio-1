import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { SEOHead } from '@/domains/seo'
import { CaseStudyDetailView } from '@/domains/case-studies'
import {
  generateCaseStudySchema,
  generateTechArticleSchema,
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

  const metaDescription = getCaseStudyMetaDescription(caseStudy)
  const ogTitle = getCaseStudyOgTitle(caseStudy)
  const jsonLd = [
    generateCaseStudySchema(caseStudy),
    generateTechArticleSchema(caseStudy),
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
