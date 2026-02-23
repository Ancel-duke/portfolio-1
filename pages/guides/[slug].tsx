import { GuideDetailPage } from '@/pages/GuideDetailPage'
import guidesData from '@/data/guides.json'

const guides = guidesData as { slug: string }[]

export async function getStaticPaths() {
  const paths = guides.map((g) => ({ params: { slug: g.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return { props: { slug: params.slug } }
}

export default function GuideDetailRoute({ slug }: { slug: string }) {
  return <GuideDetailPage initialSlug={slug} />
}
