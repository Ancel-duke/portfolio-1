import { CaseStudyDetailView } from '@/domains/case-studies'
import { SEOHead } from '@/domains/seo'
import {
  generateCaseStudySchema,
  generateTechArticleSchema,
  generateBreadcrumbSchema,
} from '@/domains/seo/schemas'
import { getCaseStudyBySlug } from '@/domains/case-studies/services/case-study-query'
import { getCaseStudyMetaDescription, getCaseStudyOgTitle } from '@/shared/utils/metadata'
import type { CaseStudy } from '@/domains/case-studies/types/case-study'
import caseStudiesData from '@/data/case-studies.json'

export async function getStaticPaths() {
  const caseStudies = caseStudiesData as { slug: string }[]
  const paths = caseStudies.map((cs) => ({ params: { slug: cs.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const caseStudy = getCaseStudyBySlug(params.slug)
  if (!caseStudy) return { notFound: true }
  return { props: { slug: params.slug, caseStudy } }
}

export default function CaseStudyDetailRoute({ slug, caseStudy }: { slug: string; caseStudy: CaseStudy }) {
  const metaDescription = getCaseStudyMetaDescription(caseStudy)
  const ogTitle = getCaseStudyOgTitle(caseStudy)
  const parentSection = (() => {
    const role = (caseStudy.role || '').toLowerCase()
    const title = (caseStudy.title || '').toLowerCase()
    const isLab =
      role.includes('frontend') ||
      title.includes('tracker') ||
      title.includes('timer') ||
      title.includes('travelogue') ||
      title.includes('scheduler') ||
      title.includes('academy')
    return isLab ? 'Labs & Experiments' : 'Case Studies'
  })()
  const parentUrl = parentSection === 'Labs & Experiments' ? '/labs-experiments' : '/case-studies'
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
