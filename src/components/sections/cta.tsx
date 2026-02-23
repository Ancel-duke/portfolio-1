import * as React from "react"
import Link from "next/link"
import { LazyMotion, domAnimation, m } from "framer-motion"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { cn } from "../../lib/utils"
import { useAnimationsEnabled } from "../../contexts/AnimationsContext"
import { getSectionVariants } from "../../lib/animation-variants"
import { ArrowRight, Mail, Github, Linkedin, MessageCircle } from "lucide-react"

interface CTAProps {
  className?: string
}

export function CTA({ className }: CTAProps) {
  const animationsEnabled = useAnimationsEnabled()
  const { containerVariants, itemVariants } = getSectionVariants(animationsEnabled)

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
    <LazyMotion features={domAnimation}>
      <section className={cn("py-16 w-full overflow-x-hidden", className)}>
        <div className="container-custom max-w-full">
          <m.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10 w-full">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <CardContent className="relative p-6 sm:p-8 md:p-12">
              <m.div
                className="text-center max-w-4xl mx-auto px-4 sm:px-0"
                variants={itemVariants}
              >
                <h2 className="text-[clamp(1.75rem,4vw,3rem)] font-bold mb-4 sm:mb-6">
                  Let's build{" "}
                  <span className="text-gradient">resilient, scalable systems</span> together
                </h2>
                <p className="text-[clamp(1rem,2vw,1.25rem)] text-muted-foreground mb-6 sm:mb-8 max-w-2xl mx-auto px-4">
                  Reach out to discuss building resilient, scalable, high-impact systems. 
                  Whether you need enterprise-grade architecture, hybrid database solutions, or real-time platforms, 
                  I design systems that scale with your business.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center mb-6">
                  <Button size="lg" className="group w-full sm:w-auto min-h-[48px] text-base sm:text-lg" asChild>
                    <Link href="/contact">
                      <MessageCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Start a Conversation
                      <ArrowRight className="ml-2 h-4 w-4 sm:h-5 sm:w-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" className="w-full sm:w-auto min-h-[48px] text-base sm:text-lg" asChild>
                    <a href="mailto:ancel.ajanga@yahoo.com">
                      <Mail className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
                      Send Email
                    </a>
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mb-8">
                  Looking to hire a <Link href="/nextjs-developer-kenya" className="text-primary hover:underline font-medium">Next.js developer in Kenya</Link> or full-stack developer in Nairobi? See my dedicated page with case studies and outcomes.
                </p>

                <m.div
                  className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6"
                  variants={itemVariants}
                >
                  {socialLinks.map((link) => {
                    const IconComponent = link.icon
                    return (
                      <m.a
                        key={link.name}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center space-x-2 p-2.5 sm:p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-300 hover:scale-105 min-h-[44px]"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className="h-4 w-4 sm:h-5 sm:w-5 text-primary group-hover:text-accent transition-colors flex-shrink-0" />
                        <div className="text-left">
                          <div className="font-medium text-xs sm:text-sm">{link.name}</div>
                          <div className="text-[10px] sm:text-xs text-muted-foreground hidden sm:block">{link.description}</div>
                        </div>
                      </m.a>
                    )
                  })}
                </m.div>
              </m.div>
            </CardContent>
          </Card>
          </m.div>
        </div>
      </section>
    </LazyMotion>
  )
}

