import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import blogData from '@/data/blog.json'
import caseStudiesData from '@/data/case-studies.json'
import { Card, CardContent, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { OptimizedImage } from '@/shared/components/ui/optimized-image'
import { ArrowLeft, Calendar, Tag, Clock, User, Target, BarChart3, AlertCircle } from 'lucide-react'
import { formatDate } from '@/shared/utils'
import { SkipLink } from '@/shared/components/ui/skip-link'
import { Breadcrumb } from '@/shared/components/ui/breadcrumb'
import { BlogCTA } from './BlogCTA'
import { getRelatedCaseStudySlugForPost, getClustersForArticle } from '@/shared/utils/metadata'
import topicClustersData from '@/data/topic-clusters.json'
import type { BlogPost } from '../types/blog-post'
import { getBlogPostBySlug } from '../services/blog-query'

/** Renders content with optional code blocks (```) and injects "architect" CTA after solution paragraph. */
function BlogContentWithCTAs({ content }: { content: string }) {
  const parts = content.split(/(```[\s\S]*?```)/g)
  const paragraphs: string[] = []
  parts.forEach((part) => {
    if (part.startsWith('```')) {
      const code = part.replace(/^```\s*/, '').replace(/\s*```$/, '').trim()
      paragraphs.push(`\0CODE:${code}`)
    } else {
      part.split(/\n\n+/).filter(Boolean).forEach((p) => paragraphs.push(p))
    }
  })
  let solutionInserted = false
  return (
    <>
      {paragraphs.map((block, index) => {
        if (block.startsWith('\0CODE:')) {
          const code = block.slice(7)
          return (
            <pre key={index} className="my-4 p-4 rounded-lg bg-muted overflow-x-auto text-sm">
              <code>{code}</code>
            </pre>
          )
        }
        const isAfterSolution =
          !solutionInserted &&
          (block.includes('Solution') || block.includes('II. The Solution') || block.includes('III. The Solution'))
        if (isAfterSolution) {
          solutionInserted = true
          return (
            <React.Fragment key={index}>
              <p className="mb-4 text-lg leading-relaxed text-muted-foreground">{block}</p>
              <BlogCTA variant="architect" className="my-6" />
            </React.Fragment>
          )
        }
        if (block.startsWith('## ')) {
          return <h2 key={index} className="text-2xl font-bold mt-8 mb-4 text-foreground">{block.replace('## ', '')}</h2>
        }

        const linkMatch = block.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const textBefore = block.slice(0, linkMatch.index);
          const linkText = linkMatch[1];
          const linkUrl = linkMatch[2];
          const textAfter = block.slice(linkMatch.index! + linkMatch[0].length);
          return (
             <p key={index} className="mb-4 text-lg leading-relaxed text-muted-foreground">
               {textBefore}
               <Link href={linkUrl} className="text-primary hover:underline font-semibold">{linkText}</Link>
               {textAfter}
             </p>
          )
        }

        return (
          <p key={index} className="mb-4 text-lg leading-relaxed text-muted-foreground">
            {block}
          </p>
        )
      })}
    </>
  )
}

export interface BlogDetailViewProps {
  /** When set (e.g. SSG), skips client lookup */
  post?: BlogPost | null
  initialSlug?: string
}

export function BlogDetailView({ post: postProp, initialSlug }: BlogDetailViewProps = {}) {
  const router = useRouter()
  const slug =
    (typeof router.query.slug === 'string' ? router.query.slug : undefined) ?? initialSlug
  const post = postProp ?? getBlogPostBySlug(slug)

  if (!post) {
    return (
      <>
        <SkipLink />
        <div className="min-h-[60vh] flex items-center justify-center py-16">
          <Card className="w-full max-w-2xl text-center p-8">
            <CardTitle className="text-4xl font-bold mb-4">404 - Blog Post Not Found</CardTitle>
            <CardContent>
              <p className="text-lg text-muted-foreground mb-6">
                The blog post you are looking for does not exist or has been moved.
              </p>
              <Button asChild>
                <Link href="/developer-journal">
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

  return (
    <>
      <SkipLink />
      <LazyMotion features={domAnimation}>
        <m.div className="py-16 container-custom" variants={containerVariants} initial="hidden" animate="visible">
          <Breadcrumb
            items={[
              { name: 'Home', url: '/' },
              { name: 'Developer Journal', url: '/developer-journal' },
              { name: post.title, url: `/developer-journal/${slug}`, current: true },
            ]}
            className="mb-8"
          />
          {(() => {
            const clusters = getClustersForArticle(topicClustersData?.clusters || [], slug || '')
            if (clusters.length === 0) return null
            return (
              <p className="text-sm text-muted-foreground mb-6">
                Part of topic:{' '}
                {clusters.map((c) => (
                  <Link key={c.id} href={c.pillarPath} className="text-primary hover:underline ml-1">
                    {c.name}
                  </Link>
                )).reduce((acc: React.ReactNode[], el, i) => (i === 0 ? [el] : [...acc, ', ', el]), [])}
              </p>
            )
          })()}

          <m.div variants={itemVariants} className="mb-8 flex flex-wrap gap-3">
            <Button variant="outline" asChild>
              <Link href="/developer-journal">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Developer Journal
              </Link>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <Link href="/contact">Contact</Link>
            </Button>
          </m.div>

          <article aria-labelledby="blog-post-title">
            <Card className="p-6 md:p-10">
              <m.div variants={itemVariants} className="mb-6">
                {post.image && (
                  <OptimizedImage
                    src={post.image}
                    alt={post.title}
                    width={1200}
                    height={630}
                    priority={false}
                    loading="eager"
                    sizes="(max-width: 768px) 100vw, 1200px"
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
              </m.div>

              {(post.whoThisIsFor || post.problem || post.businessOutcome || (post.metrics && post.metrics.length > 0)) && (
                <m.div variants={itemVariants} className="space-y-6 mb-8">
                  {post.whoThisIsFor && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <User className="h-5 w-5 mr-2 text-primary" />
                        Who this is for
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{post.whoThisIsFor}</p>
                    </div>
                  )}
                  {post.problem && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <AlertCircle className="h-5 w-5 mr-2 text-primary" />
                        Problem
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{post.problem}</p>
                    </div>
                  )}
                  {post.businessOutcome && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <Target className="h-5 w-5 mr-2 text-primary" />
                        Business outcome
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">{post.businessOutcome}</p>
                    </div>
                  )}
                  {post.metrics && post.metrics.length > 0 && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2 flex items-center">
                        <BarChart3 className="h-5 w-5 mr-2 text-primary" />
                        Metrics
                      </h3>
                      <ul className="list-disc list-inside text-muted-foreground space-y-1">
                        {post.metrics.map((m, i) => (
                          <li key={i}>{m}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  <BlogCTA variant="need-built" className="mt-6" />
                </m.div>
              )}

              <m.div variants={itemVariants} className="prose dark:prose-invert max-w-none">
                <BlogContentWithCTAs content={post.content} />
              </m.div>

              <m.div variants={itemVariants} className="mt-8">
                <BlogCTA variant="consultation" />
              </m.div>

              {(post.tradeoffs || post.challenges) && (
                <m.div variants={itemVariants} className="mt-8 space-y-6 border-t pt-6">
                  {post.tradeoffs && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Trade-offs</h3>
                      <p className="text-muted-foreground leading-relaxed">{post.tradeoffs}</p>
                    </div>
                  )}
                  {post.challenges && (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Challenges faced</h3>
                      <p className="text-muted-foreground leading-relaxed">{post.challenges}</p>
                    </div>
                  )}
                </m.div>
              )}

              {(() => {
                const relatedSlug = getRelatedCaseStudySlugForPost(caseStudiesData || [], post)
                if (!relatedSlug) return null
                const caseStudy = (caseStudiesData as Array<{ slug: string; title: string }>).find(
                  (cs) => cs.slug === relatedSlug
                )
                return (
                  <aside className="mt-8" aria-label="Related case study">
                    <h2 className="text-xl sm:text-2xl font-bold mb-4">Related case study</h2>
                    <p className="text-muted-foreground mb-2">This article relates to a detailed technical case study.</p>
                    <Link
                      href={`/case-studies/${relatedSlug}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {caseStudy?.title || relatedSlug}
                    </Link>
                  </aside>
                )
              })()}

              {(() => {
                const postTags = new Set((post.tags || []).map((t) => t.toLowerCase()))
                const slugFromTitle = (title: string) =>
                  title?.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || ''
                const currentSlug = slugFromTitle(post.title)
                const related = blogData
                  .filter((p) => slugFromTitle(p.title) !== currentSlug)
                  .map((p) => ({
                    ...p,
                    slug: slugFromTitle(p.title),
                    score: (p.tags || []).filter((t) => postTags.has(t.toLowerCase())).length,
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
        </m.div>
      </LazyMotion>
    </>
  )
}

export { BlogDetailView as BlogDetailPage }
