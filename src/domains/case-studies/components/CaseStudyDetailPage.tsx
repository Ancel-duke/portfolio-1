import React from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import caseStudiesData from '@/data/case-studies.json'
import type { CaseStudy, Technology } from '../types/case-study'
import { getCaseStudyBySlug } from '../services/case-study-query'
import { Card, CardContent, CardTitle } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import { Badge } from '@/shared/components/ui/badge'
import { OptimizedImage } from '@/shared/components/ui/optimized-image'
import { ArrowLeft, ExternalLink, Github, FileText, Calendar, User, Zap, Lightbulb, CheckCircle, Code, Layers, Shield, TrendingUp, Rocket, Settings, AlertTriangle, BookOpen, Smartphone } from 'lucide-react'
import { SkipLink } from '@/shared/components/ui/skip-link'
import { Breadcrumb } from '@/shared/components/ui/breadcrumb'
import { TechSummaryTable } from './TechSummaryTable'
import { getCaseStudyImageAlt, getClustersForCaseStudy } from '@/shared/utils/metadata'
import topicClustersData from '@/data/topic-clusters.json'

export interface CaseStudyDetailViewProps {
  caseStudy?: CaseStudy | null
  initialSlug?: string
}

export function CaseStudyDetailView({ caseStudy: caseStudyProp, initialSlug }: CaseStudyDetailViewProps = {}) {
  const router = useRouter()
  const slug = (typeof router.query.slug === 'string' ? router.query.slug : undefined) ?? initialSlug
  const caseStudy = caseStudyProp ?? getCaseStudyBySlug(slug)

  // Determine if this is a lab/experiment project (frontend project)
  const isLabProject = React.useMemo(() => {
    if (!caseStudy) return false
    const role = (caseStudy.role || '').toLowerCase()
    const title = (caseStudy.title || '').toLowerCase()
    // Include frontend projects and creative experiments
    return role.includes('frontend') || 
           title.includes('tracker') || 
           title.includes('timer') || 
           title.includes('travelogue') ||
           title.includes('scheduler') ||
           title.includes('academy')
  }, [caseStudy])

  if (!caseStudy) {
    return (
      <>
        <SkipLink />
        <div className="min-h-[60vh] flex items-center justify-center py-16">
          <Card className="w-full max-w-2xl text-center p-8">
            <CardTitle className="text-4xl font-bold mb-4">404 - Case Study Not Found</CardTitle>
            <CardContent>
              <p className="text-lg text-muted-foreground mb-6">
                The case study you are looking for does not exist or has been moved.
              </p>
              <Button asChild>
                <Link href="/case-studies">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
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

  // Determine breadcrumb and back button based on project type
  const parentSection = isLabProject ? 'Labs & Experiments' : 'Case Studies'
  const parentUrl = isLabProject ? '/labs-experiments' : '/case-studies'
  const backButtonText = isLabProject ? 'Back to Labs & Experiments' : 'Back to Case Studies'

  return (
    <>
      <SkipLink />
      <LazyMotion features={domAnimation}>
        <m.div
          className="py-8 sm:py-12 md:py-16 container-custom max-w-full w-full overflow-x-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Breadcrumb 
          items={[
            { name: 'Home', url: '/' },
            { name: parentSection, url: parentUrl },
            { name: caseStudy.title, url: `/case-studies/${caseStudy.slug}`, current: true }
          ]}
          className="mb-4 sm:mb-6 md:mb-8"
        />
        {(() => {
          const clusters = getClustersForCaseStudy(topicClustersData?.clusters || [], caseStudy.slug)
          if (clusters.length === 0) return null
          return (
            <p className="text-sm text-muted-foreground mb-4">
              Part of topic: {clusters.map((c) => (
                <Link key={c.id} href={c.pillarPath} className="text-primary hover:underline ml-1">
                  {c.name}
                </Link>
              )).reduce((acc: React.ReactNode[], el, i) => (i === 0 ? [el] : [...acc, ', ', el]), [])}
            </p>
          )
        })()}

        <m.div variants={itemVariants} className="mb-4 sm:mb-6 md:mb-8">
          <Button variant="outline" size="sm" className="min-h-[44px] text-sm sm:text-base" asChild>
            <Link href={parentUrl}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {backButtonText}
            </Link>
          </Button>
        </m.div>

      <article aria-labelledby="case-study-title">
      <Card className="p-4 sm:p-6 md:p-8 lg:p-10">
        {/* AI-first: Tech summary table at top */}
        <m.div variants={itemVariants} className="mb-6 sm:mb-8">
          <TechSummaryTable
            stack={(caseStudy.technologies || []).map((t: any) => typeof t === 'string' ? t : t.name)}
            role={caseStudy.role}
            year={caseStudy.year}
            status={caseStudy.status}
          />
        </m.div>

        <m.div variants={itemVariants} className="mb-8">
          <div className="grid grid-cols-1 md:grid-cols-[260px,1fr] gap-4 sm:gap-6 items-start">
            {caseStudy.images.hero && (
              <OptimizedImage
                src={caseStudy.images.hero}
                alt={getCaseStudyImageAlt(caseStudy.title, 'Hero Preview')}
                width={520}
                height={293}
                priority={false}
                loading="eager"
                skipNetlifyCDN
                sizes="(max-width: 768px) 100vw, 260px"
                className="w-full h-40 sm:h-48 md:h-40 rounded-lg bg-muted/30"
                imgClassName="object-contain"
              />
            )}

            <div className="space-y-4">
              <div>
                <CardTitle id="case-study-title" className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                  {caseStudy.title}
                </CardTitle>
                <p className="text-base sm:text-lg md:text-xl text-muted-foreground">
                  {caseStudy.subtitle}
                </p>
              </div>

              {/* Author section: E-E-A-T signals */}
              <div className="flex items-center text-sm md:text-base text-muted-foreground font-medium border-l-2 border-primary pl-3 py-1 my-2">
                Written by Ancel — Software Engineer
              </div>

              <div className="flex flex-wrap gap-2 sm:gap-3">
                <Badge variant="secondary" className="flex items-center text-xs sm:text-sm">
                  <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="truncate max-w-[150px] sm:max-w-none">{caseStudy.role}</span>
                </Badge>
                <Badge variant="secondary" className="flex items-center text-xs sm:text-sm">
                  <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" />
                  <span className="truncate">{caseStudy.timeline} ({caseStudy.year})</span>
                </Badge>
                <Badge variant="secondary" className="flex items-center text-xs sm:text-sm">
                  <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> {caseStudy.status}
                </Badge>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                {(caseStudy.technologies || []).map((tech: any, index) => (
                  <Badge key={index} variant="outline" className="text-xs sm:text-sm">
                    {typeof tech === 'string' ? tech : tech.name}
                  </Badge>
                ))}
                <Button variant="ghost" size="sm" className="text-xs sm:text-sm h-8" asChild>
                  <Link href="/stack">View full tech stack</Link>
                </Button>
              </div>

              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">
                {caseStudy.description}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                {caseStudy.links.live && (
                  <Button className="w-full sm:w-auto min-h-[44px] text-sm sm:text-base" asChild>
                    <a href={caseStudy.links.live} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                    </a>
                  </Button>
                )}
                {caseStudy.links.github && (
                  <Button variant="outline" className="w-full sm:w-auto min-h-[44px] text-sm sm:text-base" asChild>
                    <a href={caseStudy.links.github} target="_blank" rel="noopener noreferrer">
                      <Github className="mr-2 h-4 w-4" /> GitHub Repo
                    </a>
                  </Button>
                )}
                {(caseStudy.links as any).docs && (
                  <Button variant="outline" className="w-full sm:w-auto min-h-[44px] text-sm sm:text-base" asChild>
                    <a href={(caseStudy.links as any).docs} target="_blank" rel="noopener noreferrer">
                      <FileText className="mr-2 h-4 w-4" /> Docs
                    </a>
                  </Button>
                )}
              </div>
            </div>
          </div>
        </m.div>

        {/* Problem Section */}
        <m.div variants={itemVariants} className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary flex-shrink-0" /> 
            <span>The Problem</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">{caseStudy.problem}</p>
        </m.div>

        {/* Bridge: Problem → Solution (AI summary snippet) */}
        {caseStudy.problemSolutionBridge && (
          <m.div variants={itemVariants} className="mb-6 sm:mb-8">
            <p className="text-base sm:text-lg font-medium text-foreground border-l-4 border-primary pl-4 py-2 bg-muted/30 rounded-r">
              {caseStudy.problemSolutionBridge}
            </p>
          </m.div>
        )}

        {/* Solution Section */}
        <m.div variants={itemVariants} className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 flex items-center">
            <Code className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary flex-shrink-0" /> 
            <span>The Solution</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">{caseStudy.solution}</p>
        </m.div>

        {/* Key Terms (entity linking — 3 complex terms explained for project goal) */}
        {caseStudy.keyTerms && caseStudy.keyTerms.length > 0 && (
          <m.div variants={itemVariants} className="mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 flex items-center">
              <BookOpen className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary flex-shrink-0" /> 
              <span>Key Technical Terms</span>
            </h2>
            <ul className="space-y-3 sm:space-y-4">
              {caseStudy.keyTerms.map((item, index) => (
                <li key={index} className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-3">
                  <span className="font-semibold text-foreground shrink-0">{item.term}:</span>
                  <span className="text-sm sm:text-base text-muted-foreground">{item.explanation}</span>
                </li>
              ))}
            </ul>
          </m.div>
        )}

        {/* Impact Section */}
        <m.div variants={itemVariants} className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary flex-shrink-0" /> 
            <span>The Impact</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground mb-4 sm:mb-6">{caseStudy.impact}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {caseStudy.metrics.map((metric, index) => (
              <Card key={index} className="p-3 sm:p-4">
                <CardTitle className="text-xl sm:text-2xl font-bold text-primary">{metric.value}</CardTitle>
                <CardContent className="p-0 text-sm sm:text-base text-muted-foreground">{metric.description}</CardContent>
              </Card>
            ))}
          </div>
        </m.div>

        {/* Outcomes Section — measurable results for AI/crawlers */}
        {caseStudy.outcomes && caseStudy.outcomes.length > 0 && (
          <m.div variants={itemVariants} className="mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 flex items-center">
              <TrendingUp className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary flex-shrink-0" />
              <span>Outcomes</span>
            </h2>
            <ul className="list-disc list-inside space-y-2 text-sm sm:text-base text-muted-foreground">
              {caseStudy.outcomes.map((outcome: string, index: number) => (
                <li key={index}>{outcome}</li>
              ))}
            </ul>
          </m.div>
        )}

        {/* 3. System Architecture */}
        {caseStudy.architecture && (
          <m.div variants={itemVariants} className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center tracking-tight">
              <Layers className="h-6 w-6 mr-3 text-primary shrink-0" /> Architecture Deep-Dive
            </h2>
            <Card className="p-6 bg-muted/30 border-primary/5">
              <p className="text-sm sm:text-lg leading-relaxed text-muted-foreground whitespace-pre-line font-medium">{caseStudy.architecture}</p>
            </Card>
          </m.div>
        )}

        {/* 4. Key Engineering Decisions (Trade-offs) */}
        {caseStudy.tradeoffs && (
          <m.div variants={itemVariants} className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center tracking-tight">
              <Settings className="h-6 w-6 mr-3 text-primary shrink-0" /> Key Engineering Decisions
            </h2>
            <Card className="p-6 bg-muted/30 border-primary/5">
              <p className="text-sm sm:text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{caseStudy.tradeoffs}</p>
            </Card>
          </m.div>
        )}

        {/* 5. Performance & Scalability */}
        {caseStudy.scalability && (
          <m.div variants={itemVariants} className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center tracking-tight">
              <TrendingUp className="h-6 w-6 mr-3 text-primary shrink-0" /> Performance & Scalability
            </h2>
            <Card className="p-6 bg-muted/30 border-primary/5">
              <p className="text-sm sm:text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{caseStudy.scalability}</p>
            </Card>
          </m.div>
        )}

        {/* 6. Failure Handling */}
        {caseStudy.failureModes && (
          <m.div variants={itemVariants} className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center tracking-tight text-destructive/90">
              <AlertTriangle className="h-6 w-6 mr-3 text-destructive/80 shrink-0" /> Failure Modes & Resilience
            </h2>
            <Card className="p-6 bg-muted/30 border-destructive/10">
              <p className="text-sm sm:text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{caseStudy.failureModes}</p>
            </Card>
          </m.div>
        )}

        {/* 7. Security Considerations */}
        {caseStudy.security && (
          <m.div variants={itemVariants} className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center tracking-tight">
              <Shield className="h-6 w-6 mr-3 text-primary shrink-0" /> Security & Trust Boundaries
            </h2>
            <Card className="p-6 bg-muted/30 border-primary/5">
              <p className="text-sm sm:text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{caseStudy.security}</p>
            </Card>
          </m.div>
        )}

        {/* 8. Frontend Engineering */}
        {caseStudy.frontendEngineering && (
          <m.div variants={itemVariants} className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center tracking-tight">
              <Smartphone className="h-6 w-6 mr-3 text-primary shrink-0" /> Frontend Engineering & UX
            </h2>
            <Card className="p-6 bg-muted/30 border-primary/5">
              <p className="text-sm sm:text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{caseStudy.frontendEngineering}</p>
            </Card>
          </m.div>
        )}

        {/* 9. Outcome & Potential */}
        <m.div variants={itemVariants} className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center tracking-tight">
            <Rocket className="h-6 w-6 mr-3 text-primary shrink-0" /> Outcome & Future Potential
          </h2>
          <Card className="p-6 bg-muted/30 border-primary/5 mb-6">
            <p className="text-sm sm:text-lg leading-relaxed text-muted-foreground whitespace-pre-line mb-6">
              {caseStudy.impact}
            </p>
            {caseStudy.potentialExpansion && (
              <div className="pt-6 border-t border-border/50">
                <h3 className="text-lg font-bold mb-3 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-primary" /> Roadmap & Expansion
                </h3>
                <p className="text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
                  {caseStudy.potentialExpansion}
                </p>
              </div>
            )}
          </Card>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            {caseStudy.metrics.map((metric, index) => (
              <Card key={index} className="p-4 bg-muted/20 border-primary/10">
                <CardTitle className="text-xl sm:text-2xl font-bold text-primary mb-1">{metric.value}</CardTitle>
                <CardContent className="p-0 text-xs sm:text-sm text-muted-foreground font-medium uppercase tracking-wider">{metric.label}</CardContent>
                <p className="mt-2 text-xs text-muted-foreground/80 leading-snug">{metric.description}</p>
              </Card>
            ))}
          </div>
        </m.div>

        {/* 10. Key Takeaways */}
        {caseStudy.keyTakeaways && caseStudy.keyTakeaways.length > 0 && (
          <m.div variants={itemVariants} className="mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4 flex items-center tracking-tight">
              <Zap className="h-6 w-6 mr-3 text-primary shrink-0" /> Key Engineering Takeaways
            </h2>
            <Card className="p-6 bg-primary/5 border-primary/20">
              <ul className="space-y-4">
                {caseStudy.keyTakeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle className="h-5 w-5 text-primary mt-1 shrink-0" />
                    <p className="text-sm sm:text-lg text-foreground font-medium leading-relaxed">{takeaway}</p>
                  </li>
                ))}
              </ul>
            </Card>
          </m.div>
        )}

        {/* Gallery (if images exist) — alt pattern: [Project Name] Architecture Diagram - [Component Name] by Ancel Ajanga */}
        {caseStudy.images.gallery && caseStudy.images.gallery.length > 0 && (
          <m.div variants={itemVariants} className="mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Project Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {caseStudy.images.gallery.map((img, index) => (
                <OptimizedImage
                  key={index}
                  src={img}
                  alt={getCaseStudyImageAlt(caseStudy.title, `Gallery Image ${index + 1}`)}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg"
                  placeholder="blur"
                  skipNetlifyCDN
                  blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='10' height='10'%3E%3Crect fill='%23e5e7eb' width='10' height='10'/%3E%3C/svg%3E"
                />
              ))}
            </div>
          </m.div>
        )}

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <m.div variants={itemVariants} className="mt-6 sm:mt-8 md:mt-10">
            <Card className="p-4 sm:p-5 md:p-6 bg-muted/50">
              <blockquote className="text-sm sm:text-base md:text-lg italic mb-3 sm:mb-4">
                "{caseStudy.testimonial.text}"
              </blockquote>
              <div className="flex items-center">
                <div>
                  <p className="font-semibold text-sm sm:text-base">{caseStudy.testimonial.author}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
                    {caseStudy.testimonial.role}, {caseStudy.testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          </m.div>
        )}

        {/* Related case studies (same tech / category) — internal linking for crawlability */}
        {(() => {
          const techNames = new Set((caseStudy.technologies || []).map((t: any) => (typeof t === 'string' ? t : t.name).toLowerCase()))
          const related = (caseStudiesData as CaseStudy[])
            .filter((cs) => cs.slug !== caseStudy.slug)
            .map((cs) => ({
              ...cs,
              score: (cs.technologies || []).filter((t: any) => techNames.has((typeof t === 'string' ? t : t.name).toLowerCase())).length
            }))
            .filter((cs) => cs.score > 0)
            .sort((a, b) => b.score - a.score)
            .slice(0, 3)
          if (related.length === 0) return null
          return (
            <m.aside variants={itemVariants} className="mt-8 sm:mt-10" aria-label="Related case studies">
              <h2 className="text-xl sm:text-2xl font-bold mb-4">Related</h2>
              <ul className="space-y-2">
                {related.map((cs) => (
                  <li key={cs.slug}>
                    <Link
                      href={`/case-studies/${cs.slug}`}
                      className="text-primary hover:underline font-medium"
                    >
                      {cs.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </m.aside>
          )
        })()}
      </Card>
      </article>
        </m.div>
      </LazyMotion>
    </>
  )
}

export { CaseStudyDetailView as CaseStudyDetailPage }
