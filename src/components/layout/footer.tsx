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
  { name: 'Fun', href: '/fun' },
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
    href: 'https://www.linkedin.com/in/ajanga-ancel-42bbb7213',
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

export function Footer({ className }: FooterProps) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const currentYear = new Date().getFullYear()

  return (
    <footer className={cn("border-t bg-background", className)}>
      <div className="container-custom">
        <div className="py-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <nav className="space-y-2">
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
                  href="https://taskfoge.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 4 }}
                >
                  TaskForge
                </motion.a>
                <motion.a
                  href="https://e-learningdash.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 4 }}
                >
                  E-Learning Platform
                </motion.a>
                <motion.a
                  href="https://attendance-syst.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 4 }}
                >
                  Attendance System
                </motion.a>
                <motion.a
                  href="https://tracks-finances.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block text-sm text-muted-foreground hover:text-foreground transition-colors"
                  whileHover={{ x: 4 }}
                >
                  Finance Tracker
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
        <div className="py-6 border-t flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          <div className="text-sm text-muted-foreground">
            © {currentYear} Ancel Ajanga. All rights reserved.
          </div>
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={scrollToTop}
              className="flex items-center space-x-2"
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

