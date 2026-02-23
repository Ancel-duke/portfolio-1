import * as React from "react"
import { LazyMotion, domAnimation, m, useScroll, useTransform } from "framer-motion"
import { Button } from "../../components/ui/button"
import { cn } from "../../lib/utils"
import { useAnimationsEnabled } from "../../contexts/AnimationsContext"
import { getSectionVariants } from "../../lib/animation-variants"
import { ArrowRight, Download, Github, Linkedin, Mail, Server, Smartphone, Cpu } from "lucide-react"
import { useParallaxEnabled } from "../../hooks/useParallaxEnabled"

interface HeroProps {
  className?: string
}

/** Critical: LCP text as plain HTML (no JS animation) so it paints in first frame. */
const HERO_SUBLINE = "Fullstack Engineer — Architecting resilient systems from interface to infrastructure."
const HERO_PARAGRAPH = "I own the full lifecycle of every request, from Flutter user interfaces to M-Pesa STK queries and database transactions. I design and ship scalable systems across fintech, enterprise, and real-time domains—combining high-performance frontends, hardened backends, and self-healing microservices built to scale reliably from day one."

const socialLinks = [
  { name: "GitHub", href: "https://github.com/Ancel-duke", icon: Github, description: "View my code and projects" },
  { name: "LinkedIn", href: "https://www.linkedin.com/in/ajanga-ancel", icon: Linkedin, description: "Connect professionally" },
  { name: "Email", href: "mailto:ancel@example.com", icon: Mail, description: "Send me a message" },
]

const sectionClassName = "w-full overflow-x-hidden py-12 sm:py-16 md:py-20 lg:py-24 xl:py-28 2xl:py-32"

/**
 * Parallax hero: useScroll + useTransform for heading (slower Y) and decorative layer (faster Y).
 * Only mounted when parallax is enabled; unmounting resets transforms and detaches scroll.
 */
function HeroParallax({ className }: HeroProps) {
  const sectionRef = React.useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  })
  const headingY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -12, -28])
  const decorY = useTransform(scrollYProgress, [0, 0.5, 1], [0, -30, -70])

  return (
    <LazyMotion features={domAnimation}>
      <section ref={sectionRef} className={cn(sectionClassName, className)}>
        <div className="container-custom max-w-full relative">
          <m.div
            aria-hidden
            className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden"
            style={{ y: decorY, willChange: "transform" }}
          >
            <div className="w-[min(80vw,600px)] h-[min(60vw,400px)] rounded-full bg-primary/10 blur-3xl" />
          </m.div>

          <div className="relative text-center mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
            <m.div style={{ y: headingY, willChange: "transform" }}>
              <h1 className="text-[clamp(1.75rem,4.5vw,4rem)] sm:text-[clamp(2rem,5vw,4.5rem)] font-bold leading-tight mb-3 sm:mb-4">
                Hi, I'm <span className="text-foreground">Ancel</span>{" "}
                <span className="text-muted-foreground">Ajanga</span>
              </h1>
              <p className="text-[clamp(1rem,2.25vw,1.375rem)] sm:text-[clamp(1.125rem,2.5vw,1.5rem)] font-semibold text-foreground mb-4 sm:mb-6 max-w-3xl mx-auto">
                {HERO_SUBLINE}
              </p>
              <p className="text-[clamp(0.9375rem,2vw,1.125rem)] sm:text-[clamp(1rem,2.25vw,1.25rem)] text-muted-foreground mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
                {HERO_PARAGRAPH}
              </p>
            </m.div>

            <HeroContent />
          </div>
        </div>
      </section>
    </LazyMotion>
  )
}

/**
 * Static hero: identical structure, no scroll listeners or transforms.
 * Used when parallax is off or on mobile.
 */
function HeroStatic({ className }: HeroProps) {
  return (
    <section className={cn(sectionClassName, className)}>
      <div className="container-custom max-w-full relative">
        <div className="relative text-center mx-auto max-w-4xl px-4 sm:px-6 md:px-8">
          <h1 className="text-[clamp(1.75rem,4.5vw,4rem)] sm:text-[clamp(2rem,5vw,4.5rem)] font-bold leading-tight mb-3 sm:mb-4">
            Hi, I'm <span className="text-foreground">Ancel</span>{" "}
            <span className="text-muted-foreground">Ajanga</span>
          </h1>
          <p className="text-[clamp(1rem,2.25vw,1.375rem)] sm:text-[clamp(1.125rem,2.5vw,1.5rem)] font-semibold text-foreground mb-4 sm:mb-6 max-w-3xl mx-auto">
            {HERO_SUBLINE}
          </p>
          <p className="text-[clamp(0.9375rem,2vw,1.125rem)] sm:text-[clamp(1rem,2.25vw,1.25rem)] text-muted-foreground mb-6 sm:mb-8 md:mb-10 max-w-3xl mx-auto leading-relaxed">
            {HERO_PARAGRAPH}
          </p>

          <HeroContent />
        </div>
      </div>
    </section>
  )
}

function HeroContent() {
  const animationsEnabled = useAnimationsEnabled()
  const { containerVariants, itemVariants } = getSectionVariants(animationsEnabled)
  return (
    <LazyMotion features={domAnimation}>
      <m.div
        className="contents"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <m.div
          className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-stretch sm:items-center mb-8 sm:mb-10 md:mb-12 max-w-xl sm:max-w-none mx-auto sm:mx-0"
          variants={itemVariants}
        >
        <Button size="lg" className="group w-full sm:w-auto min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8 rounded-lg" asChild>
          <a href="/projects">
            View My Work
            <ArrowRight className="ml-2 h-5 w-5 flex-shrink-0 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
          </a>
        </Button>
        <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-6 sm:px-8 rounded-lg border-2" asChild>
          <a href="/assets/Resume%20(1).pdf" download>
            <Download className="mr-2 h-5 w-5 flex-shrink-0" aria-hidden="true" />
            Download Resume
          </a>
        </Button>
      </m.div>

        <m.div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-5" variants={itemVariants}>
          {socialLinks.map((link) => {
            const IconComponent = link.icon
            return (
              <m.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-center space-x-2 p-3 sm:p-3.5 rounded-lg bg-muted hover:bg-muted/80 border border-border/50 transition-all duration-200 min-h-[44px] min-w-[44px] focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              aria-label={link.description}
            >
              <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-foreground group-hover:text-primary transition-colors flex-shrink-0" aria-hidden="true" />
              <span className="font-medium text-sm sm:text-base">{link.name}</span>
            </m.a>
            )
          })}
        </m.div>

        <m.div
          className="mt-12 sm:mt-14 md:mt-16 lg:mt-20 pt-8 sm:pt-10 md:pt-12 border-t border-border"
          variants={itemVariants}
        >
        <h2 className="text-[clamp(1.125rem,2.25vw,1.5rem)] font-bold mb-6 sm:mb-8 text-center text-foreground">
          Fullstack Developer — Resilience &amp; Scale at Every Layer
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 text-center">
          <div className="p-5 sm:p-6 lg:p-6 rounded-xl bg-muted/40 dark:bg-muted/30 border border-border text-left sm:text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
              <Server className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Hardened Backends</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">NestJS, PostgreSQL, fail-safe logic. Transactional correctness and auditability by default.</p>
          </div>
          <div className="p-5 sm:p-6 lg:p-6 rounded-xl bg-muted/40 dark:bg-muted/30 border border-border text-left sm:text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
              <Smartphone className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Fluid Frontends</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Flutter, React, UX and performance. Responsive, accessible, built for real users.</p>
          </div>
          <div className="p-5 sm:p-6 lg:p-6 rounded-xl bg-muted/40 dark:bg-muted/30 border border-border text-left sm:text-center">
            <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center text-primary shrink-0">
              <Cpu className="w-6 h-6" aria-hidden="true" />
            </div>
            <h3 className="text-base sm:text-lg font-bold mb-2">Self-Healing Infra</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">Redis, BullMQ, automated recovery. Graceful degradation and observability when things fail.</p>
          </div>
        </div>
        </m.div>

        <m.div
          className="mt-8 sm:mt-10 md:mt-12 lg:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center"
          variants={itemVariants}
        >
        <div className="space-y-1">
          <div className="text-[clamp(1.5rem,3.5vw,2.25rem)] sm:text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-primary">10K+</div>
          <div className="text-xs sm:text-sm text-muted-foreground">Users Supported</div>
        </div>
        <div className="space-y-1">
          <div className="text-[clamp(1.5rem,3.5vw,2.25rem)] sm:text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-primary">50+</div>
          <div className="text-xs sm:text-sm text-muted-foreground">API Endpoints</div>
        </div>
        <div className="space-y-1">
          <div className="text-[clamp(1.5rem,3.5vw,2.25rem)] sm:text-[clamp(1.75rem,4vw,2.5rem)] font-bold text-primary">Multi-Tenant</div>
          <div className="text-xs sm:text-sm text-muted-foreground">Architectures</div>
        </div>
        </m.div>
      </m.div>
    </LazyMotion>
  )
}

export function Hero(props: HeroProps) {
  const parallaxEnabled = useParallaxEnabled()
  return parallaxEnabled ? <HeroParallax {...props} /> : <HeroStatic {...props} />
}
