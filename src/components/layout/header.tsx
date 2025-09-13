import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "../../components/ui/button"
import { ThemeToggle } from "../../components/ui/theme-toggle"
import { cn } from "../../lib/utils"
import { Menu, X, Home, User, FileText, Briefcase, Code, Calendar, Smile, Mail } from "lucide-react"

interface HeaderProps {
  className?: string
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Case Studies', href: '/case-studies', icon: Briefcase },
  { name: 'Blog', href: '/blog', icon: FileText },
  { name: 'Timeline', href: '/timeline', icon: Calendar },
  { name: 'Stack', href: '/stack', icon: Code },
  { name: 'Fun', href: '/fun', icon: Smile },
  { name: 'Contact', href: '/contact', icon: Mail },
]

export function Header({ className }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60", className)} role="banner">
      <div className="container-custom">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <motion.div
            className="flex items-center space-x-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a 
              href="/" 
              className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 rounded-md p-1"
              aria-label="Ancel Ajanga - Home"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">A</span>
              </div>
              <span className="font-bold text-lg">Ancel Ajanga</span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => {
              const IconComponent = item.icon
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="flex items-center space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                >
                  <a 
                    href={item.href}
                    aria-label={`Navigate to ${item.name}`}
                  >
                    <IconComponent className="h-4 w-4" aria-hidden="true" />
                    <span>{item.name}</span>
                  </a>
                </Button>
              )
            })}
          </nav>

          {/* Theme Toggle & Mobile Menu Button */}
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
              onClick={toggleMenu}
              aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
            >
              {isOpen ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="md:hidden border-t"
              id="mobile-navigation"
            >
              <nav className="py-4 space-y-1" role="navigation" aria-label="Mobile navigation">
                {navigation.map((item) => {
                  const IconComponent = item.icon
                  return (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="w-full justify-start focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                      asChild
                      onClick={closeMenu}
                    >
                      <a 
                        href={item.href} 
                        className="flex items-center space-x-3"
                        aria-label={`Navigate to ${item.name}`}
                      >
                        <IconComponent className="h-4 w-4" aria-hidden="true" />
                        <span>{item.name}</span>
                      </a>
                    </Button>
                  )
                })}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}

