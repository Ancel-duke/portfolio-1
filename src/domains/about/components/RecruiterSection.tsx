import React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { getSectionVariants } from '@/shared/utils/animation-variants'
import { Card, CardContent } from '@/shared/components/ui/card'
import { useAnimationsEnabled } from '@/contexts/AnimationsContext'
import { CheckCircle2, Award, Briefcase, Zap } from 'lucide-react'
import { SITE } from '@/shared/constants/site'

export function RecruiterSection() {
  const animationsEnabled = useAnimationsEnabled()
  const { containerVariants, itemVariants } = getSectionVariants(animationsEnabled)

  const points = [
    {
      title: "Production-Readiness",
      description: "My code isn't just a prototype. It's built with fallback modes, circuit breakers, and comprehensive error handling ready for thousands of concurrent users.",
      icon: Zap
    },
    {
      title: "Fullstack Architecture",
      description: "From defining a robust GraphQL schema to executing pixel-perfect React integrations, I own the entire technology stack end-to-end.",
      icon: Briefcase
    },
    {
      title: "High Performance",
      description: "Fast applications retain users. I specialize in driving P95 latencies below 200ms using caching and query optimization.",
      icon: Award
    }
  ]

  return (
    <LazyMotion features={domAnimation}>
      <section className="section-padding bg-muted/30">
        <div className="container-custom max-w-5xl mx-auto">
          <m.div variants={containerVariants} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <m.div className="text-center mb-10 sm:mb-12" variants={itemVariants}>
              <h2 className="text-3xl sm:text-4xl font-bold mb-4">Why Work With Ancel Ajanga?</h2>
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Stop worrying about system architecture and scalability. I build solutions that just work—and keep working under load.
              </p>
            </m.div>

            <div className="grid md:grid-cols-3 gap-6">
              {points.map((p, i) => {
                const Icon = p.icon
                return (
                  <m.div key={i} variants={itemVariants}>
                    <Card className="h-full surface-base hover:-translate-y-1 transition-transform duration-300">
                      <CardContent className="p-6">
                        <Icon className="h-10 w-10 text-primary mb-4" />
                        <h3 className="font-bold text-xl mb-2">{p.title}</h3>
                        <p className="text-muted-foreground">{p.description}</p>
                      </CardContent>
                    </Card>
                  </m.div>
                )
              })}
            </div>
            
            <m.div className="mt-12 text-center" variants={itemVariants}>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-primary/20 bg-primary/5 text-primary text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" /> {SITE.availability.message}
              </div>
            </m.div>

          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}
