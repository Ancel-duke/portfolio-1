import { CaseStudyDetailPage } from '@/pages/CaseStudyDetailPage'
import caseStudiesData from '@/data/case-studies.json'

export async function getStaticPaths() {
  const caseStudies = caseStudiesData as { slug: string }[]
  const paths = caseStudies.map((cs) => ({ params: { slug: cs.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return { props: { slug: params.slug } }
}

export default function CaseStudyDetailRoute({ slug }: { slug: string }) {
  return <CaseStudyDetailPage initialSlug={slug} />
}
