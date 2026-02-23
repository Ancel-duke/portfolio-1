import SEO from '@/components/seo/SEO'
import Link from 'next/link'
import { generatePersonWithAreaServedSchema, generateBreadcrumbSchema } from '@/components/seo/schemas'
import { SkipLink } from '@/components/ui/skip-link'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, Mail, FileText, Code, MapPin, MessageCircle, CheckCircle, Zap } from 'lucide-react'

const breadcrumbItems = [
  { name: 'Home', url: '/' },
  { name: 'Next.js Developer Kenya', url: '/nextjs-developer-kenya' },
]
const jsonLd = [
  ...generatePersonWithAreaServedSchema({ jobTitle: 'Next.js Developer' }),
  generateBreadcrumbSchema(breadcrumbItems),
]

export default function NextJsDeveloperKenyaPage() {
  return (
    <>
      <SEO
        title="Next.js Developer Kenya | Full-Stack Developer Nairobi — Ancel Ajanga"
        description="Hire a Next.js developer in Kenya. Ancel Ajanga: Full-Stack Developer Nairobi, React & Node.js Kenya. System design and architecture for startups across Africa. Real-time apps, fintech, and scalable SaaS. Contact for projects."
        canonicalUrl="https://ancel.co.ke/nextjs-developer-kenya"
        keywords={[
          'Next.js Developer Kenya',
          'Full-Stack Developer Nairobi',
          'React Developer Kenya',
          'Node.js Kenya',
          'Nest.js developer Kenya',
          'Flutter developer Kenya',
          'database designer Kenya',
          'system design and architect Africa',
          'Hire Next.js Developer Africa',
        ]}
        jsonLd={jsonLd}
      />
      <SkipLink />
      <div className="py-8 sm:py-12 md:py-16 container-custom max-w-4xl">
        <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
          <Link href="/" className="hover:text-foreground">Home</Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">Next.js Developer Kenya</span>
        </nav>

        <article>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 tracking-tight">
            Next.js Developer Kenya — Full-Stack & System Design
          </h1>
          <p className="text-lg text-muted-foreground mb-8">
            I'm Ancel Ajanga, a Next.js and full-stack developer based in Nairobi and Narok, Kenya. I build production web and mobile applications for startups and teams across Kenya and Africa, with a focus on system resilience, real-time systems, and scalable architecture.
          </p>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4">Why Next.js and full-stack in Kenya</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Next.js has become the default choice for serious React applications: SSR and static export, API routes, and a single codebase from UI to backend. In Nairobi and across Kenya, demand for full-stack developers who can ship and maintain Next.js applications is growing. Startups and enterprises need someone who can own the full request lifecycle—from the database to the UI—without spreading work across multiple vendors. I use Next.js with Node.js (and NestJS where appropriate), TypeScript, PostgreSQL, MongoDB, and Redis depending on the problem. The goal is always to deliver measurable outcomes: sub-500ms latency where it matters, platforms that scale to 10K+ users, and systems that fail gracefully.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              As a full-stack developer in Nairobi, I work with teams that are building for the African market and for global remote clients. The Nairobi tech ecosystem has matured: there are strong design and product communities, and engineering talent that can compete internationally. My work spans real-time collaboration tools, fintech-style platforms with audit trails, e-learning systems, and e-commerce—all with an emphasis on clean architecture and maintainability. I also do system design and architecture for teams that need a clear technical direction before or during build.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Remote collaboration is standard. I've delivered projects for clients who are fully distributed across Africa and beyond. Communication, clear milestones, and documented decisions are part of how I work. If you're looking to hire a Next.js developer in Kenya or a full-stack developer in Nairobi who can own the stack end-to-end, the sections below outline my tech stack, case studies with measurable results, and how to get in touch.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Code className="h-6 w-6 mr-2 text-primary" />
              Tech stack
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I use Next.js (SSR and static export), React, TypeScript, Node.js, NestJS, Express, PostgreSQL, MongoDB, Redis, and Flutter for cross-platform mobile where needed. For system design, I focus on separation of concerns, fault isolation, and measurable performance (latency, throughput, error rates). Database design—schema, indexing, and when to use SQL vs document stores—is part of every project. You can see the full stack, with links to official docs and topic clusters, on the <Link href="/stack" className="text-primary hover:underline font-medium">tech stack page</Link>.
            </p>
            <div className="flex flex-wrap gap-2 mb-4">
              {['Next.js', 'React', 'Node.js', 'NestJS', 'TypeScript', 'PostgreSQL', 'MongoDB', 'Redis', 'Flutter'].map((tech) => (
                <Badge key={tech} variant="secondary">{tech}</Badge>
              ))}
            </div>
            <Button variant="outline" asChild>
              <Link href="/stack">View full tech stack</Link>
            </Button>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <FileText className="h-6 w-6 mr-2 text-primary" />
              Case studies and production systems
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              The following are real projects I've built or led, with documented architecture, trade-offs, and outcomes. Each case study includes problem, solution, resilience considerations, and measurable results.
            </p>

            {/* Entity hub: top 4 most complex case studies with descriptive anchor text for semantic connectivity */}
            <h3 className="text-lg font-semibold mb-3">High-impact production systems</h3>
            <p className="text-muted-foreground text-sm mb-4">
              These four represent the most complex, production-grade work—scalable financial architecture, multi-tenant systems, and resilience-first design.
            </p>
            <ul className="space-y-3 mb-8">
              <li>
                <Link href="/case-studies/ledgerx" className="font-medium text-primary hover:underline">Scalable financial architecture and multi-tenant fintech</Link>
                {' — LedgerX: double-entry semantics, audit trails, and secure multi-tenant isolation.'}
              </li>
              <li>
                <Link href="/case-studies/nestfi" className="font-medium text-primary hover:underline">Resilient financial coordination and correctness under failure</Link>
                {' — NestFi: ledger-backed wallets, M-Pesa B2C, and fail-closed distributed locks.'}
              </li>
              <li>
                <Link href="/case-studies/aegis" className="font-medium text-primary hover:underline">Self-healing infrastructure and assume-failure design</Link>
                {' — Aegis: policy-backed automation, no unaudited actions, and evidence trails.'}
              </li>
              <li>
                <Link href="/case-studies/fits-by-aliv" className="font-medium text-primary hover:underline">Payment-safe e-commerce and Kenya-first M-Pesa workflows</Link>
                {' — Fits by Aliv: soft reservations, idempotent orders, and bounded self-healing.'}
              </li>
            </ul>

            <h3 className="text-lg font-semibold mb-3">More case studies</h3>
            <ul className="space-y-4">
              <li>
                <Link href="/case-studies/taskforge" className="font-medium text-primary hover:underline">Real-time collaborative project management with Next.js and Socket.io</Link>
                {' — TaskForge: sub-500ms sync, 100+ concurrent users per project.'}
              </li>
              <li>
                <Link href="/case-studies/opsflow" className="font-medium text-primary hover:underline">Production-ready incident management platform</Link>
                {' — OpsFlow: Next.js, Node.js, dual-database design, and team-based multi-tenancy.'}
              </li>
            </ul>
            <Button variant="outline" className="mt-4" asChild>
              <Link href="/case-studies">All case studies</Link>
            </Button>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <Zap className="h-6 w-6 mr-2 text-primary" />
              Measurable outcomes
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I track and deliver concrete results so that projects are judged on impact, not just delivery.
            </p>
            <ul className="space-y-2 text-muted-foreground">
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Real-time systems with sub-500ms latency (TaskForge, SignFlow).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Platforms scaled to 10K+ users (E-Learning, NestFi-style coordination).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Fintech-grade auditability and double-entry semantics (LedgerX, NestFi).</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>Lighthouse performance 95+ and mobile-responsive design across projects.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                <span>System design and architecture for startups and product teams in Africa.</span>
              </li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-2xl font-bold mb-4 flex items-center">
              <MapPin className="h-6 w-6 mr-2 text-primary" />
              Nairobi, Kenya, and remote across Africa
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              I'm based in Nairobi and Narok, Kenya. The Nairobi tech scene has grown into a hub for startups and innovation: from fintech and agritech to ed-tech and e-commerce. Many of my projects serve Kenyan and East African users, but I also work with distributed teams and clients elsewhere in Africa and internationally. Time zones and async communication are part of the workflow—clear docs, structured updates, and defined milestones keep projects on track when we're not in the same room.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-4">
              The African startup landscape is diverse. Some products are hyper-local; others target the continent or go global from day one. I've worked on systems that need to handle local payment flows, multi-tenant isolation, and regulatory-minded audit trails—all while keeping the architecture simple enough to iterate quickly. If you're building in Kenya or elsewhere in Africa and need a full-stack or Next.js developer who understands both the stack and the context, I can help. I'm also available for system design and architecture reviews: helping teams choose the right stack, data models, and failure boundaries before or during build.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Remote collaboration is the default. Whether you're in Nairobi, Lagos, Cape Town, or elsewhere, we can work together via video calls, async updates, and a shared codebase. The important thing is a clear scope, agreed success metrics, and a communication rhythm that fits your team.
            </p>
          </section>

          <section className="mb-10">
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="p-6 sm:p-8">
                <h2 className="text-2xl font-bold mb-3">Hire a Next.js developer in Kenya</h2>
                <p className="text-muted-foreground mb-6">
                  If you're looking to hire a Next.js developer in Kenya or a full-stack developer in Nairobi—for a greenfield project, an existing codebase, or system design and architecture—get in touch. I work with startups, product teams, and enterprises that care about clean code, measurable outcomes, and systems that scale. No fluff: we can start with a short call to align on scope and outcomes, then move to a proposal or sprint plan.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button size="lg" className="min-h-[48px]" asChild>
                    <Link href="/contact">
                      <MessageCircle className="mr-2 h-4 w-4" />
                      Contact — Start a project
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="min-h-[48px]" asChild>
                    <a href="mailto:ancel.ajanga@yahoo.com">
                      <Mail className="mr-2 h-4 w-4" />
                      Email directly
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-4">
                  Phone / WhatsApp: +254 793 558 755. I typically respond within 24 hours.
                </p>
              </CardContent>
            </Card>
          </section>

          <section className="text-sm text-muted-foreground">
            <p className="mb-2">
              <strong className="text-foreground">Trust and proof:</strong> All case studies above are real projects with documented architecture and outcomes. GitHub and LinkedIn are linked in the footer. For more about my background and approach, see the <Link href="/about" className="text-primary hover:underline">about page</Link> and the <Link href="/timeline" className="text-primary hover:underline">timeline</Link>. For technical deep dives and stack comparisons, see the <Link href="/guides" className="text-primary hover:underline">guides</Link>.
            </p>
          </section>
        </article>
      </div>
    </>
  )
}
