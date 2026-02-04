import * as React from "react"
import { motion } from "framer-motion"
import { Button } from "../../components/ui/button"
import { cn } from "../../lib/utils"
import { Github, Linkedin, Mail, ArrowUp } from "lucide-react"

interface FooterProps {
  className?: string
}

const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Case Studies', href: '/case-studies' },
  { name: 'Blog', href: '/blog' },
  { name: 'Timeline', href: '/timeline' },
  { name: 'Stack', href: '/stack' },
  { name: 'Labs & Experiments', href: '/labs-experiments' },
  { name: 'Contact', href: '/contact' },
]

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

function FooterComponent({ className }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn("border-t bg-background w-full overflow-x-hidden", className)}>
      <div className="container-custom max-w-full">
        <div className="py-8 sm:py-10 md:py-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 w-full">
            {/* Brand */}
            <div className="space-y-4">
              <motion.div
                className="flex items-center space-x-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">A</span>
                </div>
                <span className="font-bold text-lg">Ancel Ajanga</span>
              </motion.div>
              <p className="text-sm text-muted-foreground">
                Full-stack developer passionate about building scalable web applications 
                and creating amazing user experiences.
              </p>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Quick Links</h3>
              <nav className="space-y-2" aria-label="Footer quick links">
                {navigation.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                    whileHover={{ x: 4 }}
                  >
                    {item.name}
                  </motion.a>
                ))}
              </nav>
            </div>

            {/* Projects */}
            <div className="space-y-4">
              <h3 className="font-semibold">Featured Projects</h3>
              <nav className="space-y-2">
                <motion.a
                  href="/case-studies/opsflow"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 4 }}
                >
                  OpsFlow
                </motion.a>
                <motion.a
                  href="/case-studies/signflow"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 4 }}
                >
                  SignFlow
                </motion.a>
                <motion.a
                  href="/case-studies/ledgerx"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 4 }}
                >
                  LedgerX
                </motion.a>
                <motion.a
                  href="/case-studies/educhain"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 4 }}
                >
                  EduChain
                </motion.a>
              </nav>
            </div>

            {/* Social Links */}
            <div className="space-y-4">
              <h3 className="font-semibold">Connect</h3>
              <div className="flex space-x-2">
                {socialLinks.map((link) => {
                  const IconComponent = link.icon
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg bg-muted hover:bg-muted/80 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      aria-label={link.description}
                    >
                      <IconComponent className="h-4 w-4" />
                    </motion.a>
                  )
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-4 sm:py-6 border-t flex flex-col sm:flex-row items-center justify-between space-y-3 sm:space-y-0 gap-3">
          <div className="text-xs sm:text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Ancel Ajanga. All rights reserved.
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/sitemap-for-ai.json"
              className="sr-only focus:not-sr-only focus:outline-none text-xs text-muted-foreground"
              aria-label="AI sitemap — Fullstack Engineer Ancel Ajanga projects and case studies"
            >
              sitemap-for-ai.json
            </a>
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="flex items-center space-x-2 min-h-[44px] text-xs sm:text-sm"
            >
              <ArrowUp className="h-4 w-4" />
              <span>Back to top</span>
            </Button>
          </div>
        </div>
      </div>
    </footer>
  )
}

export const Footer = React.memo(FooterComponent)
