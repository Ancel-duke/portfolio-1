import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"
import { cn } from "../../lib/utils"
import { ArrowRight, Download, Github, Linkedin, Mail, Server, Smartphone, Cpu } from "lucide-react"

interface HeroProps {
  className?: string
}

/** Critical: LCP text as plain HTML (no JS animation) so it paints in first frame. */
const HERO_SUBLINE = "Fullstack Engineer — Architecting resilient systems from interface to infrastructure."
const HERO_PARAGRAPH = "I own the full lifecycle of every request, from Flutter user interfaces to M-Pesa STK queries and database transactions. I design and ship scalable systems across fintech, enterprise, and real-time domains—combining high-performance frontends, hardened backends, and self-healing microservices built to scale reliably from day one."

export function Hero({ className }: HeroProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const socialLinks = [
    {
      name: 'GitHub',
      href: 'https://github.com/Ancel-duke',
      icon: Github,
      description: 'View my code and projects'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/ajanga-ancel',
      icon: Linkedin,
      description: 'Connect professionally'
    },
    {
      name: 'Email',
      href: 'mailto:ancel@example.com',
      icon: Mail,
      description: 'Send me a message'
    }
  ]

  return (
    <section className={cn("py-[clamp(4rem,8vw,8rem)] w-full overflow-x-hidden", className)}>
      <div className="container-custom max-w-full">
        <div className="text-center max-w-4xl mx-auto px-4 sm:px-0">
          {/* LCP: Plain HTML so hero text paints immediately without waiting for Framer Motion */}
          <h1 className="text-[clamp(1.875rem,5vw,4.5rem)] font-bold mb-2 leading-tight">
            Hi, I'm{" "}
            <span className="text-gradient">Ancel Ajanga</span>
          </h1>
          <p className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-semibold text-foreground mb-[clamp(1rem,3vw,1.5rem)]">
            {HERO_SUBLINE}
          </p>
          <p className="text-[clamp(1rem,2.5vw,1.25rem)] text-muted-foreground mb-[clamp(1.5rem,4vw,2rem)] max-w-4xl mx-auto px-4 sm:px-0 leading-relaxed">
            {HERO_PARAGRAPH}
          </p>
        <motion.div
          className="contents"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          <motion.div
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-8 sm:mb-12 px-4 sm:px-0"
            variants={itemVariants}
          >
            <Button size="lg" className="group w-full sm:w-auto min-h-[48px] text-base sm:text-lg" asChild>
              <a href="/projects">
                View My Work
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>
            <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[48px] text-base sm:text-lg" asChild>
              <a href="/assets/Resume%20(1).pdf" download>
                <Download className="mr-2 h-5 w-5" />
                Download Resume
              </a>
            </Button>
          </motion.div>

          <motion.div
            className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6"
            variants={itemVariants}
          >
            {socialLinks.map((link) => {
              const IconComponent = link.icon
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center space-x-2 p-2.5 sm:p-3 rounded-lg bg-muted/50 hover:bg-muted/80 transition-all duration-300 min-h-[44px]"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  aria-label={link.description}
                >
                  <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:text-accent transition-colors flex-shrink-0" />
                  <span className="font-medium text-sm sm:text-base">{link.name}</span>
                </motion.a>
              )
            })}
          </motion.div>

          {/* Value proposition: three pillars */}
          <motion.div
            className="mt-10 sm:mt-14 md:mt-18 pt-8 sm:pt-12 border-t border-border"
            variants={itemVariants}
          >
            <h2 className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-bold mb-6 sm:mb-8 text-center">
              Fullstack Developer — Resilience &amp; Scale at Every Layer
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center px-4 sm:px-0">
              <div className="p-5 sm:p-6 rounded-xl bg-muted/50 border border-border">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Server className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold mb-2">Hardened Backends</h3>
                <p className="text-sm text-muted-foreground">NestJS, PostgreSQL, fail-safe logic. Transactional correctness and auditability by default.</p>
              </div>
              <div className="p-5 sm:p-6 rounded-xl bg-muted/50 border border-border">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Smartphone className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold mb-2">Fluid Frontends</h3>
                <p className="text-sm text-muted-foreground">Flutter, React, UX and performance. Responsive, accessible, built for real users.</p>
              </div>
              <div className="p-5 sm:p-6 rounded-xl bg-muted/50 border border-border">
                <div className="w-12 h-12 mx-auto mb-3 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                  <Cpu className="w-6 h-6" />
                </div>
                <h3 className="text-base font-bold mb-2">Self-Healing Infra</h3>
                <p className="text-sm text-muted-foreground">Redis, BullMQ, automated recovery. Graceful degradation and observability when things fail.</p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="mt-8 sm:mt-12 md:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 md:gap-8 text-center px-4 sm:px-0"
            variants={itemVariants}
          >
            <div className="space-y-1 sm:space-y-2">
              <div className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-primary">10K+</div>
              <div className="text-[clamp(0.75rem,1.5vw,0.875rem)] text-muted-foreground px-2">Users Supported</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-primary">50+</div>
              <div className="text-[clamp(0.75rem,1.5vw,0.875rem)] text-muted-foreground px-2">API Endpoints</div>
            </div>
            <div className="space-y-1 sm:space-y-2">
              <div className="text-[clamp(1.5rem,4vw,2.5rem)] font-bold text-primary">Multi-Tenant</div>
              <div className="text-[clamp(0.75rem,1.5vw,0.875rem)] text-muted-foreground px-2">Architectures</div>
            </div>
          </motion.div>
        </motion.div>
        </div>
      </div>
    </section>
  )
}

