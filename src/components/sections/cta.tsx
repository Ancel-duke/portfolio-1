import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"
import { Card, CardContent } from "../../components/ui/card"
import { cn } from "../../lib/utils"
import { ArrowRight, Mail, Github, Linkedin, MessageCircle } from "lucide-react"

interface CTAProps {
  className?: string
}

export function CTA({ className }: CTAProps) {
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
      href: 'https://linkedin.com/in/ancel-ajanga',
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
    <section className={cn("py-16", className)}>
      <div className="container-custom">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card className="relative overflow-hidden border-0 bg-gradient-to-br from-primary/10 via-accent/10 to-primary/10">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
            <CardContent className="relative p-8 md:p-12">
              <motion.div
                className="text-center max-w-4xl mx-auto"
                variants={itemVariants}
              >
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
                  Let's build something{" "}
                  <span className="text-gradient">amazing</span> together
                </h2>
                <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
                  I'm always excited to work on new projects and collaborate with passionate people. 
                  Whether you have a startup idea, need a full-stack developer, or want to discuss technology, 
                  I'd love to hear from you.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
                  <Button size="lg" className="group">
                    <MessageCircle className="mr-2 h-5 w-5" />
                    Start a Conversation
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                  <Button size="lg" variant="outline" asChild>
                    <a href="mailto:ancel@example.com">
                      <Mail className="mr-2 h-5 w-5" />
                      Send Email
                    </a>
                  </Button>
                </div>

                <motion.div
                  className="flex flex-wrap justify-center gap-6"
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
                        className="group flex items-center space-x-2 p-3 rounded-lg bg-background/50 hover:bg-background/80 transition-all duration-300 hover:scale-105"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <IconComponent className="h-5 w-5 text-primary group-hover:text-accent transition-colors" />
                        <div className="text-left">
                          <div className="font-medium text-sm">{link.name}</div>
                          <div className="text-xs text-muted-foreground">{link.description}</div>
                        </div>
                      </motion.a>
                    )
                  })}
                </motion.div>
              </motion.div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}

