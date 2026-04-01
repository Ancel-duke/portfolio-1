import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'
import { SEOHead } from '@/domains/seo'
import { BlogDetailView } from '@/domains/blog'
import { generateBlogPostSchema, generateBreadcrumbSchema } from '@/domains/seo/schemas'
import { getBlogPostBySlug } from '@/domains/blog/services/blog-query'

export default function BlogDetailWithSeo() {
  const { slug } = useParams<{ slug: string }>()
  const post = useMemo(() => getBlogPostBySlug(slug), [slug])

  if (!post) {
    return (
      <>
        <SEOHead
          title="404 - Blog Post Not Found"
          description="The blog post you are looking for does not exist or has been moved. Return to the blog to explore other articles."
          canonical="/developer-journal"
          noindex={true}
        />
        <BlogDetailView initialSlug={slug} />
      </>
    )
  }

  const canonicalPath = `/developer-journal/${slug}`
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Developer Journal', url: '/developer-journal' },
    { name: post.title, url: canonicalPath },
  ]
  const jsonLd = [
    generateBlogPostSchema({
      ...post,
      slug: slug || '',
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
