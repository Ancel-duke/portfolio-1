import * as React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link, useLocation, useNavigate } from "react-router-dom"
import { Button } from "../../components/ui/button"
import { ThemeToggle } from "../../components/ui/theme-toggle"
import { cn } from "../../lib/utils"
import { Menu, X, Home, User, FileText, Briefcase, Code, Calendar, FlaskConical, Mail, BookOpen, Star } from "lucide-react"

interface HeaderProps {
  className?: string
}

const navigation = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: 'Today\'s Highlights', href: '/#highlights', icon: Star },
  { name: 'Case Studies', href: '/case-studies', icon: FileText },
  { name: 'Developer Journal', href: '/developer-journal', icon: BookOpen },
  { name: 'Timeline', href: '/timeline', icon: Calendar },
  { name: 'Stack', href: '/stack', icon: Code },
  { name: 'Labs & Experiments', href: '/labs-experiments', icon: FlaskConical },
  { name: 'Contact', href: '/contact', icon: Mail },
]

export function Header({ className }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  const closeMenu = () => {
    setIsOpen(false)
  }

  const handleHashLink = (href: string, e: React.MouseEvent) => {
    e.preventDefault()
    const hash = href.split('#')[1]
    
    if (location.pathname !== '/') {
      // If not on home page, navigate to home first
      navigate('/')
      // Wait for navigation, then scroll
      setTimeout(() => {
        const element = document.getElementById(hash)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    } else {
      // Already on home page, just scroll
      const element = document.getElementById(hash)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }
    closeMenu()
  }

  return (
    <header className={cn("sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-x-hidden", className)} role="banner">
      <div className="container-custom max-w-full">
        <div className="flex h-16 items-center justify-between overflow-x-auto">
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
              <div className="w-6 h-6 sm:w-7 sm:h-7 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-xs sm:text-sm">A</span>
              </div>
              <span className="font-bold text-sm sm:text-base whitespace-nowrap">Ancel Ajanga</span>
            </a>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-0.5 xl:space-x-1 flex-wrap" role="navigation" aria-label="Main navigation">
            {navigation.map((item) => {
              const IconComponent = item.icon
              const isHashLink = item.href.startsWith('/#') || item.href.startsWith('#')
              
              return (
                <Button
                  key={item.name}
                  variant="ghost"
                  size="sm"
                  asChild
                  className="flex items-center space-x-1.5 xl:space-x-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[44px] px-1.5 xl:px-2 shrink-0"
                >
                  {isHashLink ? (
                    <a 
                      href={item.href}
                      onClick={(e) => handleHashLink(item.href, e)}
                      aria-label={`Navigate to ${item.name}`}
                    >
                      <IconComponent className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      <span className="hidden xl:inline text-xs xl:text-sm">{item.name}</span>
                    </a>
                  ) : (
                    <Link 
                      to={item.href}
                      aria-label={`Navigate to ${item.name}`}
                    >
                      <IconComponent className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
                      <span className="hidden xl:inline text-xs xl:text-sm">{item.name}</span>
                    </Link>
                  )}
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
              className="lg:hidden focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-w-[44px] min-h-[44px]"
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
              className="lg:hidden border-t"
              id="mobile-navigation"
            >
              <nav className="py-2 space-y-1" role="navigation" aria-label="Mobile navigation">
                {navigation.map((item) => {
                  const IconComponent = item.icon
                  const isHashLink = item.href.startsWith('/#') || item.href.startsWith('#')
                  
                  return (
                    <Button
                      key={item.name}
                      variant="ghost"
                      className="w-full justify-start focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 min-h-[48px] text-base"
                      asChild
                    >
                      {isHashLink ? (
                        <a 
                          href={item.href}
                          onClick={(e) => handleHashLink(item.href, e)}
                          className="flex items-center space-x-3 px-4"
                          aria-label={`Navigate to ${item.name}`}
                        >
                          <IconComponent className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                          <span>{item.name}</span>
                        </a>
                      ) : (
                        <Link 
                          to={item.href}
                          onClick={closeMenu}
                          className="flex items-center space-x-3 px-4"
                          aria-label={`Navigate to ${item.name}`}
                        >
                          <IconComponent className="h-5 w-5 flex-shrink-0" aria-hidden="true" />
                          <span>{item.name}</span>
                        </Link>
                      )}
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

