import { BlogDetailView } from '@/domains/blog'
import { SEOHead } from '@/domains/seo'
import {
  generateBlogPostSchema,
  generateFAQPageSchema,
} from '@/domains/seo/schemas'
import { buildBlogFaqItems } from '@/shared/utils/metadata'
import blogData from '@/data/blog.json'
import { getBlogPostBySlug, postSlug } from '@/domains/blog/services/blog-query'
import type { BlogPost } from '@/domains/blog/types/blog-post'

export async function getStaticPaths() {
  const posts = blogData as { title: string }[]
  const paths = posts.map((p) => ({ params: { slug: postSlug(p) } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const post = getBlogPostBySlug(params.slug)
  if (!post) return { notFound: true }
  return { props: { slug: params.slug, post } }
}

export default function BlogDetailRoute({ slug, post }: { slug: string; post: BlogPost }) {
  const canonicalPath = `/developer-journal/${slug}`
  const faqLd = generateFAQPageSchema(buildBlogFaqItems(post))
  const jsonLd = [
    generateBlogPostSchema({ ...post, slug }),
    ...(faqLd ? [faqLd] : []),
  ]

  return (
    <>
      <SEOHead
        title={post.seo?.title || post.title}
        description={post.seo?.description || post.excerpt}
        canonical={post.seo?.canonicalUrl || canonicalPath}
        ogImage={post.seo?.ogImage || post.image}
        ogTitle={post.seo?.ogTitle || post.title}
        twitterCard={post.seo?.twitterCard as any || 'summary_large_image'}
        ogType="article"
        keywords={post.seo?.keywords || ['Ancel Ajanga', 'Developer Journal', ...(post.tags || [])]}
        publishedTime={post.date}
        modifiedTime={post.date}
        jsonLd={jsonLd}
      />
      <BlogDetailView post={post} initialSlug={slug} />
    </>
  )
}
