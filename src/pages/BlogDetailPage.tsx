import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { motion } from 'framer-motion'
import blogData from '../data/blog.json'
import { Card, CardContent, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { OptimizedImage } from '../components/ui/optimized-image'
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react'
import { formatDate } from '../lib/utils'
import SEOHead from '../components/seo/SEOHead'
import { SkipLink } from '../components/ui/skip-link'
import { Breadcrumb } from '../components/ui/breadcrumb'
import { generateBlogPostSchema } from '../components/seo/schemas'

export function BlogDetailPage() {
  const router = useRouter()
  const slug = typeof router.query.slug === 'string' ? router.query.slug : undefined
  const post = blogData.find(p => {
    // Convert title to slug format for comparison
    const postSlug = p.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    return postSlug === slug
  })

  if (!post) {
    return (
      <>
        <SEOHead
          title="404 - Blog Post Not Found"
          description="The blog post you are looking for does not exist or has been moved. Return to the blog to explore other articles."
          canonical="/blog/404"
          noindex={true}
        />
        <SkipLink />
        <div className="min-h-[60vh] flex items-center justify-center py-16">
          <Card className="w-full max-w-2xl text-center p-8">
            <CardTitle className="text-4xl font-bold mb-4">404 - Blog Post Not Found</CardTitle>
            <CardContent>
              <p className="text-lg text-muted-foreground mb-6">
                The blog post you are looking for does not exist or has been moved.
              </p>
              <Button asChild>
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  const canonicalPath = slug ? `/developer-journal/${slug}` : `/developer-journal`

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
        jsonLd={generateBlogPostSchema(post)}
      />
      <SkipLink />
      <motion.div
        className="py-16 container-custom"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Breadcrumb 
          items={[
            { name: 'Home', url: '/' },
            { name: 'Blog', url: '/blog' },
            { name: post.title, url: `/blog/${post.id}`, current: true }
          ]}
          className="mb-8"
        />

        <motion.div variants={itemVariants} className="mb-8">
          <Button variant="outline" asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Developer Journal
            </Link>
          </Button>
        </motion.div>

      <article aria-labelledby="blog-post-title">
      <Card className="p-6 md:p-10">
        <motion.div variants={itemVariants} className="mb-6">
          {post.image && (
            <OptimizedImage
              src={post.image}
              alt={post.title}
              width={800}
              height={450}
              priority
              loading="eager"
              sizes="(max-width: 768px) 100vw, 800px"
              className="w-full h-64 rounded-lg mb-6"
            />
          )}
          <CardTitle id="blog-post-title" className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </CardTitle>
          <div className="flex items-center text-muted-foreground text-sm mb-4 space-x-4">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" /> {formatDate(post.date)}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" /> {post.readTime}
            </span>
            <span className="flex items-center">
              <Tag className="h-4 w-4 mr-1" /> {post.tags.join(', ')}
            </span>
          </div>
          <p className="text-lg text-muted-foreground italic">{post.excerpt}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="prose dark:prose-invert max-w-none">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </motion.div>

        {/* Related posts (same tags/category) — internal linking for crawlability */}
        {(() => {
          const postTags = new Set((post.tags || []).map((t) => t.toLowerCase()))
          const slugFromTitle = (title: string) => title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ''
          const currentSlug = slugFromTitle(post.title)
          const related = blogData
            .filter((p) => slugFromTitle(p.title) !== currentSlug)
            .map((p) => ({
              ...p,
              slug: slugFromTitle(p.title),
              score: (p.tags || []).filter((t) => postTags.has(t.toLowerCase())).length
            }))
            .filter((p) => p.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
          if (related.length === 0) return null
          return (
            <aside className="mt-8" aria-label="Related posts">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Related</h2>
              <ul className="space-y-2">
                {related.map((p) => (
                  <li key={p.slug}>
                    <Link
                      href={`/developer-journal/${p.slug}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {p.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )
        })()}
      </Card>
      </article>
      </motion.div>
    </>
  )
}
