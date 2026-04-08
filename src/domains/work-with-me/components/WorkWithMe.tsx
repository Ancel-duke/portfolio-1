import React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { SEOHead } from '@/domains/seo'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import Link from 'next/link'
import { CheckCircle2, Server, Zap, Shield, ArrowRight, Layers, FileText } from 'lucide-react'

export function WorkWithMe() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  }
  
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

  return (
    <>
      <SEOHead
        title="Work With Me — Senior Fullstack & Systems Engineer"
        description="Available for senior fullstack and systems engineering roles. Specializing in high-performance architecture, scalable backends, and resilient infrastructure."
        canonical="/work-with-me"
        ogType="website"
      />
      
      <LazyMotion features={domAnimation}>
        <div className="pt-24 pb-16 w-full overflow-x-hidden min-h-screen bg-background">
          <div className="container-custom max-w-4xl mx-auto">
            <m.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-12">
              
              {/* Header */}
              <m.div variants={itemVariants} className="text-center space-y-4">
                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight">
                  Let's Build <span className="text-gradient">Production-Grade Systems</span>
                </h1>
                <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                  I specialize in architecting resilient backends, scaling real-time distributed systems, and shipping polished fullstack experiences.
                </p>
                <div className="pt-4 flex flex-wrap justify-center gap-4">
                  <Button size="lg" asChild className="min-w-[160px]">
                    <a href="https://calendly.com/ajanga-ancel/30min" target="_blank" rel="noopener noreferrer">
                      Book a Technical Call
                    </a>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="min-w-[160px]">
                    <Link href="/contact">Message Me</Link>
                  </Button>
                </div>
              </m.div>

              {/* What I Build */}
              <m.section variants={itemVariants}>
                <h2 className="text-2xl font-bold border-b pb-2 mb-6">What I Build</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  <Card className="surface-base">
                    <CardContent className="p-6">
                      <Server className="h-8 w-8 text-primary mb-4" />
                      <h3 className="font-bold text-lg mb-2">High-Throughput Backends</h3>
                      <p className="text-muted-foreground text-sm">
                        Event-driven architectures using Kafka/RabbitMQ, robust REST/GraphQL APIs in Node.js & Go, and resilient microservices.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="surface-base">
                    <CardContent className="p-6">
                      <Layers className="h-8 w-8 text-primary mb-4" />
                      <h3 className="font-bold text-lg mb-2">Modern Fullstack Apps</h3>
                      <p className="text-muted-foreground text-sm">
                        Performant and accessible UIs using Next.js/React, integrated natively with secure authentication and complex state management.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </m.section>

              {/* Performance Focus */}
              <m.section variants={itemVariants} className="bg-primary/5 rounded-2xl p-6 sm:p-8 border border-primary/10">
                <h2 className="text-2xl font-bold mb-6 flex items-center gap-2">
                  <Zap className="h-6 w-6 text-primary" /> Engineering Standards
                </h2>
                <div className="grid sm:grid-cols-3 gap-6">
                  <div>
                    <h4 className="text-3xl font-bold mb-1">99.9%</h4>
                    <p className="text-sm font-medium text-foreground/80">Target Uptime</p>
                    <p className="text-xs text-muted-foreground mt-1">Built with circuit breakers and fallback strategies.</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold mb-1">&lt;200ms</h4>
                    <p className="text-sm font-medium text-foreground/80">P95 Latency</p>
                    <p className="text-xs text-muted-foreground mt-1">Through efficient caching (Redis) and query optimization.</p>
                  </div>
                  <div>
                    <h4 className="text-3xl font-bold mb-1">Zero</h4>
                    <p className="text-sm font-medium text-foreground/80">Data Loss</p>
                    <p className="text-xs text-muted-foreground mt-1">ACID compliant transactions and idempotent operations.</p>
                  </div>
                </div>
              </m.section>

              {/* Systems Expertise */}
              <m.section variants={itemVariants}>
                <h2 className="text-2xl font-bold border-b pb-2 mb-6">Core Competencies</h2>
                <div className="space-y-3">
                  {[
                    "Distributed Systems & Event-Driven Architecture (Kafka, RabbitMQ, Redis)",
                    "Backend Engineering (Node.js, TypeScript, Go, Python)",
                    "Database Optimization (PostgreSQL, MongoDB, ElasticSearch)",
                    "Frontend & UI Engineering (React, Next.js, TailwindCSS)",
                    "Infrastructure & CI/CD (Docker, AWS, GitHub Actions)"
                  ].map((skill, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{skill}</span>
                    </div>
                  ))}
                </div>
              </m.section>

              {/* Engagement Models */}
              <m.section variants={itemVariants}>
                <h2 className="text-2xl font-bold border-b pb-2 mb-6">Engagement Models</h2>
                <div className="grid sm:grid-cols-3 gap-4">
                  <Card className="surface-raised">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">Full-Time Roles</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Available for Senior Fullstack or Systems Engineer roles in fast-paced product teams.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="surface-raised">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">Contract Work</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Staff augmentation for critical projects requiring deep backend or architectural expertise.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="surface-raised">
                    <CardContent className="p-6">
                      <h3 className="font-bold mb-2">Consulting</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        System audits, architecture design, and performance optimization for existing platforms.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </m.section>

            </m.div>
          </div>
        </div>
      </LazyMotion>
    </>
  )
}
