import { BlogDetailView } from '@/domains/blog'
import { SEOHead } from '@/domains/seo'
import { generateBlogPostSchema, generateBreadcrumbSchema } from '@/domains/seo/schemas'
import blogData from '@/data/blog.json'
import { getBlogPostBySlug, titleToSlug } from '@/domains/blog/services/blog-query'
import type { BlogPost } from '@/domains/blog/types/blog-post'

export async function getStaticPaths() {
  const posts = blogData as { title: string }[]
  const paths = posts.map((p) => ({ params: { slug: titleToSlug(p.title) } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return { notFound: true }
  return { props: { slug: params.slug, post } }
}

export default function BlogDetailRoute({ slug, post }: { slug: string; post: BlogPost }) {
  const canonicalPath = `/developer-journal/${slug}`
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Developer Journal', url: '/developer-journal' },
    { name: post.title, url: canonicalPath },
  ]
  const jsonLd = [
    generateBlogPostSchema({
      ...post,
      slug,
    }),
    generateBreadcrumbSchema(breadcrumbItems),
  ]

  return (
    <>
      <SEOHead
        title={post.title}
        description={post.excerpt}
        canonical={canonicalPath}
        ogImage={post.image}
        ogType="article"
        keywords={['Ancel Ajanga', 'Developer Journal', ...(post.tags || [])]}
        publishedTime={post.date}
        modifiedTime={post.date}
        jsonLd={jsonLd}
      />
      <BlogDetailView post={post} initialSlug={slug} />
    </>
  )
}
