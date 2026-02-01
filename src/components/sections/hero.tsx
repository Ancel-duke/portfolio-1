import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"
import { cn } from "../../lib/utils"
import { ArrowRight, Download, Github, Linkedin, Mail } from "lucide-react"

interface HeroProps {
  className?: string
}

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
        <motion.div
          className="text-center max-w-4xl mx-auto px-4 sm:px-0"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >

          <motion.h1
            className="text-[clamp(1.875rem,5vw,4.5rem)] font-bold mb-2 leading-tight"
            variants={itemVariants}
          >
            Hi, I'm{" "}
            <span className="text-gradient">Ancel Ajanga</span>
          </motion.h1>

          <motion.p
            className="text-[clamp(1.125rem,2.5vw,1.5rem)] font-semibold text-foreground mb-[clamp(1rem,3vw,1.5rem)]"
            variants={itemVariants}
          >
            Fullstack Software Engineer & Systems Architect
          </motion.p>

          <motion.p
            className="text-[clamp(1rem,2.5vw,1.25rem)] text-muted-foreground mb-[clamp(1.5rem,4vw,2rem)] max-w-4xl mx-auto px-4 sm:px-0 leading-relaxed"
            variants={itemVariants}
          >
            I build resilient, scalable systems that handle real-world complexity across fintech, enterprise, and real-time domains. From crafting high-performance Flutter interfaces to architecting hybrid database solutions and self-healing microservices, I deliver end-to-end solutions that scale to thousands of users and transactions.
          </motion.p>

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
    </section>
  )
}

