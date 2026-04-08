import React from 'react'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Linkedin, BookOpen, FileText } from 'lucide-react'
import { Button } from '@/shared/components/ui/button'
import { Card, CardContent } from '@/shared/components/ui/card'
import { SITE } from '@/shared/constants/site'
import { getSectionVariants } from '@/shared/utils/animation-variants'
import { useAnimationsEnabled } from '@/contexts/AnimationsContext'

/**
 * Bridges external professional authority (LinkedIn) to on-domain deep content
 * for AEO / entity reinforcement — no scraped posts; explicit human curation only.
 */
export function LinkedInInsightsSection() {
  const animationsEnabled = useAnimationsEnabled()
  const { containerVariants, itemVariants } = getSectionVariants(animationsEnabled)

  return (
    <LazyMotion features={domAnimation}>
      <section
        className="section-padding bg-background border-t border-border/60"
        aria-labelledby="linkedin-insights-heading"
      >
        <div className="container-custom max-w-5xl mx-auto">
          <m.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <m.div variants={itemVariants} className="text-center mb-10">
              <h2 id="linkedin-insights-heading" className="text-3xl sm:text-4xl font-bold mb-3">
                Insights from <span className="text-gradient">LinkedIn</span>
              </h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Long-form engineering breakdowns live here on the site. Connect on LinkedIn for professional
                updates; use the Developer Journal and guides for architecture narratives you can cite and
                share.
              </p>
            </m.div>
            <m.div variants={itemVariants}>
              <Card className="surface-base border-primary/10">
                <CardContent className="p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/10 p-3 text-primary">
                      <Linkedin className="h-8 w-8" aria-hidden />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{SITE.name}</p>
                      <p className="text-sm text-muted-foreground mt-1">{SITE.role}</p>
                      <p className="text-sm text-muted-foreground mt-2">
                        Same person entity as this portfolio — LinkedIn is listed in Person JSON-LD sameAs for
                        crawlers and answer engines.
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row gap-3 shrink-0">
                    <Button asChild variant="default">
                      <a href={SITE.linkedin} target="_blank" rel="noopener noreferrer">
                        <Linkedin className="h-4 w-4 mr-2" />
                        LinkedIn profile
                      </a>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/developer-journal">
                        <BookOpen className="h-4 w-4 mr-2" />
                        Developer Journal
                      </Link>
                    </Button>
                    <Button asChild variant="outline">
                      <Link href="/guides">
                        <FileText className="h-4 w-4 mr-2" />
                        Technical guides
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </m.div>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
