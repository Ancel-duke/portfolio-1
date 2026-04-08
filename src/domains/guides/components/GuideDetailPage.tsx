import React from 'react'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import caseStudiesData from '@/data/case-studies.json'
import topicClustersData from '@/data/topic-clusters.json'
import { Card, CardContent, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { ArrowLeft, BookOpen, Layers, Target, Code, MessageCircle } from 'lucide-react'
import { SkipLink } from '@/shared/components/ui/skip-link'
import { Breadcrumb } from '@/shared/components/ui/breadcrumb'
import type { Guide } from '../types/guide'
import { getGuideBySlug } from '../services/guide-query'
import { buildGuideFaqItems } from '@/shared/utils/metadata'
import { buildGuideAiSummary } from '@/shared/utils/ai-summary'

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

function GuideBody({ text }: { text: string }) {
  const paragraphs = text.split(/\n\n+/).filter(Boolean)
  return (
    <div className="space-y-4">
      {paragraphs.map((para, i) => {
        if (para.startsWith('## ')) {
          return <h2 key={i} className="text-2xl font-bold mt-8 mb-4 text-foreground">{para.replace('## ', '')}</h2>
        }

        const linkMatch = para.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const textBefore = para.slice(0, linkMatch.index);
          const linkText = linkMatch[1];
          const linkUrl = linkMatch[2];
          const textAfter = para.slice(linkMatch.index! + linkMatch[0].length);
          return (
             <p key={i} className="text-muted-foreground leading-relaxed">
               {textBefore}
               <Link href={linkUrl} className="text-primary hover:underline font-semibold">{linkText}</Link>
               {textAfter}
             </p>
          )
        }

        return (
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
        )
      })}
    </div>
  )
}

export interface GuideDetailViewProps {
  guide?: Guide | null
  initialSlug?: string
}

export function GuideDetailView({ guide: guideProp, initialSlug }: GuideDetailViewProps = {}) {
  const slug = initialSlug
  const guide = guideProp ?? getGuideBySlug(slug)

  if (!guide) {
    return (
      <>
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

  const relatedCaseStudies = (guide.related_case_studies || [])
    .map((s) => caseStudies.find((cs) => cs.slug === s))
    .filter(Boolean) as { slug: string; title: string }[]

  return (
    <>
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
              <section
                className="rounded-xl border border-border bg-muted/20 p-4 md:p-5 mb-6"
                aria-label="Guide summary for readers and AI extraction"
                data-ai-summary=""
              >
                <p className="text-base text-foreground leading-relaxed">{buildGuideAiSummary(guide)}</p>
              </section>

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
                  <BookOpen className="h-5 w-5 mr-2 text-primary" /> What problem does this guide address?
                </h2>
                <p className="text-muted-foreground leading-relaxed">{guide.problem}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-3 flex items-center">
                  <Layers className="h-5 w-5 mr-2 text-primary" /> How is the system architected?
                </h2>
                <p className="text-muted-foreground leading-relaxed">{guide.architecture}</p>
              </section>

              <section className="mb-8">
                <h2 className="text-xl font-bold mb-3 flex items-center">
                  <Target className="h-5 w-5 mr-2 text-primary" /> What outcomes can you measure?
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

              {(() => {
                const faqItems = buildGuideFaqItems(guide)
                if (faqItems.length < 2) return null
                return (
                  <section className="mb-8 border-t pt-8" aria-labelledby="guide-faq-heading">
                    <h2 id="guide-faq-heading" className="text-xl font-bold mb-4">
                      Frequently asked questions
                    </h2>
                    <dl className="space-y-4">
                      {faqItems.map((item, i) => (
                        <div key={i}>
                          <dt className="font-semibold text-foreground mb-1">{item.question}</dt>
                          <dd className="text-muted-foreground leading-relaxed">{item.answer}</dd>
                        </div>
                      ))}
                    </dl>
                  </section>
                )
              })()}

              <div className="border-t pt-6 mt-8 space-y-4">
                {relatedCaseStudies.length > 0 && (
                  <div>
                    <h3 className="font-semibold mb-2">Related case studies &amp; projects</h3>
                    <ul className="flex flex-col gap-2">
                      {relatedCaseStudies.map((cs) => (
                        <li key={cs.slug} className="flex flex-wrap items-center gap-2">
                          <Button variant="outline" size="sm" asChild>
                            <Link href={`/case-studies/${cs.slug}`}>{cs.title.split(' - ')[0] || cs.title}</Link>
                          </Button>
                          <Link
                            href={`/projects/${cs.slug}`}
                            className="text-sm text-primary hover:underline font-medium"
                          >
                            Project page
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
                <p className="text-sm text-muted-foreground">
                  <Link href="/developer-journal" className="text-primary hover:underline font-medium mr-2">
                    Developer Journal
                  </Link>
                  for narrative deep dives, or{' '}
                  <Link href="/contact" className="text-primary hover:underline inline-flex items-center">
                    <MessageCircle className="h-4 w-4 mr-1" /> get in touch
                  </Link>
                  {' for project discussions.'}
                </p>
              </div>
            </Card>
          </article>
        </m.div>
      </LazyMotion>
    </>
  )
}

export { GuideDetailView as GuideDetailPage }
