import React from 'react'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import guidesData from '../data/guides.json'
import caseStudiesData from '../data/case-studies.json'
import topicClustersData from '../data/topic-clusters.json'
import { Card, CardContent, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { ArrowLeft, BookOpen, Layers, Target, Code, MessageCircle } from 'lucide-react'
import SEOHead from '../components/seo/SEOHead'
import { SkipLink } from '../components/ui/skip-link'
import { Breadcrumb } from '../components/ui/breadcrumb'
import {
  generateArticleSchema,
  generateTechArticleSchema,
  generateBreadcrumbSchema,
} from '../components/seo/schemas'

interface Guide {
  title: string
  slug: string
  summary: string
  tech_stack: string[]
  problem: string
  architecture: string
  measurable_outcome: string
  related_topics: string[]
  related_case_studies: string[]
  template_type: 'technology_deep_dive' | 'case_study_breakdown' | 'comparison'
  body: string
  date?: string
  readTime?: string
}

const guides = guidesData as Guide[]
const caseStudies = caseStudiesData as Array<{ slug: string; title: string }>
const clusters = topicClustersData?.clusters || []

function getPillarPathForTopic(topicId: string): string {
  const cluster = clusters.find((c: { id: string }) => c.id === topicId)
  return cluster?.pillarPath || '/stack'
}

function getTopicName(topicId: string): string {
  const cluster = clusters.find((c: { id: string }) => c.id === topicId)
  return cluster?.name || topicId
}

/** Render body as paragraphs; support **bold** and \n\n. */
function GuideBody({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/).filter(Boolean)
  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => (
        <p key={i} className="text-muted-foreground leading-relaxed">
          {para.split(/(\*\*[^*]+\*\*)/g).map((part, j) =>
            part.startsWith('**') && part.endsWith('**') ? (
              <strong key={j} className="text-foreground font-medium">
                {part.slice(2, -2)}
              </strong>
            ) : (
              <span key={j}>{part}</span>
            )
          )}
        </p>
      ))}
    </div>
  )
}

export function GuideDetailPage({ initialSlug }: { initialSlug?: string } = {}) {
  const slug = initialSlug
  const guide = guides.find((g) => g.slug === slug)

  if (!guide) {
    return (
      <>
        <SEOHead
          title="404 - Guide Not Found"
          description="The guide you are looking for does not exist."
          canonical="/guides"
          noindex={true}
        />
        <SkipLink />
        <div className="min-h-[60vh] flex items-center justify-center py-16">
          <Card className="w-full max-w-2xl text-center p-8">
            <CardTitle className="text-2xl font-bold mb-4">404 - Guide Not Found</CardTitle>
            <CardContent>
              <Button asChild>
                <Link href="/guides">Back to Guides</Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Guides', url: '/guides' },
    { name: guide.title, url: `/guides/${guide.slug}` },
  ]

  const isTechDeepDive = guide.template_type === 'technology_deep_dive'
  const syntheticCaseStudy = {
    slug: guide.slug,
    title: guide.title,
    description: guide.summary,
    year: guide.date?.slice(0, 4) || '2025',
    problem: guide.problem,
    solution: guide.architecture,
    impact: guide.measurable_outcome,
    architecture: guide.architecture,
    technologies: (guide.tech_stack || []).map((name) => ({ name })),
    images: {},
  }

  const jsonLd = [
    isTechDeepDive ? generateTechArticleSchema(syntheticCaseStudy) : generateArticleSchema(guide),
    generateBreadcrumbSchema(breadcrumbItems),
  ]

  const relatedCaseStudies = (guide.related_case_studies || [])
    .map((s) => caseStudies.find((cs) => cs.slug === s))
    .filter(Boolean) as { slug: string; title: string }[]

  return (
    <>
      <SEOHead
        title={guide.title}
        description={guide.summary}
        canonical={`/guides/${guide.slug}`}
        ogType="article"
        keywords={guide.tech_stack}
        publishedTime={guide.date}
        jsonLd={jsonLd}
      />
      <SkipLink />
      <LazyMotion features={domAnimation}>
        <m.div
          className="py-8 sm:py-12 md:py-16 container-custom max-w-full w-full"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <Breadcrumb
            items={[
              { name: 'Home', url: '/' },
              { name: 'Guides', url: '/guides' },
              { name: guide.title, url: `/guides/${guide.slug}`, current: true },
            ]}
            className="mb-4 sm:mb-6"
          />

          <Button variant="outline" size="sm" className="mb-6" asChild>
            <Link href="/guides">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Guides
            </Link>
          </Button>

          <article>
            <Card className="p-4 sm:p-6 md:p-8 lg:p-10">
              <CardTitle className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3">
                {guide.title}
              </CardTitle>
              {(guide.date || guide.readTime) && (
                <div className="flex flex-wrap gap-2 text-sm text-muted-foreground mb-4">
                  {guide.date && <span>{guide.date}</span>}
                  {guide.readTime && <span>{guide.readTime}</span>}
                </div>
              )}
              <p className="text-muted-foreground mb-6">{guide.summary}</p>

              {/* Internal links: related topics (pillar) */}
              {guide.related_topics?.length > 0 && (
                <p className="text-sm text-muted-foreground mb-4">
                  Part of topic:{' '}
                  {guide.related_topics.map((id) => (
                    <Link
                      key={id}
                      href={getPillarPathForTopic(id)}
                      className="text-primary hover:underline ml-1"
                    >
                      {getTopicName(id)}
                    </Link>
                  )).reduce((acc: React.ReactNode[], el, i) => (i === 0 ? [el] : [...acc, ', ', el]), [])}
                </p>
              )}

              {/* Tech stack + link to /stack */}
              {guide.tech_stack?.length > 0 && (
                <div className="flex flex-wrap items-center gap-2 mb-6">
                  {guide.tech_stack.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/stack">View full tech stack</Link>
                  </Button>
                </div>
              )}

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-3 flex items-center">
                  <BookOpen className="h-5 w-5 mr-2 text-primary" /> The Problem
                </h2>
                <p className="text-muted-foreground leading-relaxed">{guide.problem}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-3 flex items-center">
                  <Layers className="h-5 w-5 mr-2 text-primary" /> Architecture
                </h2>
                <p className="text-muted-foreground leading-relaxed">{guide.architecture}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" /> Measurable outcome
                </h2>
                <p className="text-muted-foreground leading-relaxed">{guide.measurable_outcome}</p>
              </section>

              {guide.body && (
                <section className="mb-8">
                  <h2 className="text-xl font-bold mb-3 flex items-center">
                    <Code className="h-5 w-5 mr-2 text-primary" /> Deep dive
                  </h2>
                  <GuideBody text={guide.body} />
                </section>
              )}

              {/* Internal linking: related case studies, contact */}
              <div className="border-t pt-6 mt-8 space-y-4">
                {relatedCaseStudies.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Related case studies</h3>
                    <ul className="flex flex-wrap gap-2">
                      {relatedCaseStudies.map((cs) => (
                        <li key={cs.slug}>
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/case-studies/${cs.slug}`}>{cs.title.split(' - ')[0] || cs.title}</Link>
                          </Button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  <Link href="/contact" className="text-primary hover:underline inline-flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" /> Get in touch
                  </Link>
                  {' for project discussions or technical questions.'}
                </p>
              </div>
            </Card>
          </article>
        </m.div>
      </LazyMotion>
    </>
  )
}
