import { BlogDetailPage } from '@/pages/BlogDetailPage'
import blogData from '@/data/blog.json'

function titleToSlug(title: string): string {
  return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

export async function getStaticPaths() {
  const posts = blogData as { title: string }[]
  const paths = posts.map((p) => ({ params: { slug: titleToSlug(p.title) } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return { props: { slug: params.slug } }
}

export default function BlogDetailRoute({ slug }: { slug: string }) {
  return <BlogDetailPage initialSlug={slug} />
}
