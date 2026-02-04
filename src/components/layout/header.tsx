import * as React from "react"
import { useState, useEffect, useCallback } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { useRouter } from "next/router"
import { Helmet } from "react-helmet-async"
import { Button } from "../../components/ui/button"
import { ThemeToggle } from "../../components/ui/theme-toggle"
import { cn } from "../../lib/utils"
import { Menu, X, Home, User, FileText, Briefcase, Code, Calendar, FlaskConical, Mail, BookOpen, Star } from "lucide-react"
import { generateSiteNavigationSchema } from "../../components/seo/schemas"
import { useScrollDirection } from "../../hooks/useScrollDirection"
import { useAnimationsEnabled } from "../../contexts/AnimationsContext"
import { getSectionVariants, getNavItemVariants, getHoverScale, getHoverTransition } from "../../lib/animation-variants"

interface HeaderProps {
  className?: string
}

/** Reference order: Home, About, Projects, Today's Highlights, Case Studies, Developer Journal, Timeline, Stack, Labs & Experiments. Contact is rendered separately on the far right. */
const primaryNav = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: "Today's Highlights", href: '/#highlights', icon: Star },
  { name: 'Case Studies', href: '/case-studies', icon: FileText },
  { name: 'Developer Journal', href: '/developer-journal', icon: BookOpen },
  { name: 'Timeline', href: '/timeline', icon: Calendar },
  { name: 'Stack', href: '/stack', icon: Code },
  { name: 'Labs & Experiments', href: '/labs-experiments', icon: FlaskConical },
]

const contactNav = { name: 'Contact', href: '/contact', icon: Mail }

/** Full list for mobile menu and SEO schema (primary + Contact). */
const navigation = [...primaryNav, contactNav]

function NavLink({
  item,
  pathname,
  currentHash,
  onHashLink,
  closeMenu,
  variant = 'desktop',
}: {
  item: (typeof primaryNav)[0] | typeof contactNav
  pathname: string
  currentHash: string
  onHashLink: (href: string, e: React.MouseEvent) => void
  closeMenu?: () => void
  variant: 'desktop' | 'mobile'
}) {
  const IconComponent = item.icon
  const isHashLink = item.href.startsWith('/#') || item.href.startsWith('#')
  const itemHash = isHashLink && item.href.includes('#') ? item.href.split('#')[1] : ''
  const isActive =
    item.href === '/'
      ? pathname === '/' && !currentHash
      : pathname === item.href || (isHashLink && pathname === '/' && currentHash === itemHash)

  if (variant === 'mobile') {
    return (
      <Button
        variant="ghost"
        className="w-full justify-start focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[48px] sm:min-h-[52px] text-base sm:text-lg px-4 sm:px-5 md:px-6 py-3"
        asChild
      >
        {isHashLink ? (
          <a
            href={item.href}
            onClick={(e) => onHashLink(item.href, e)}
            className={cn(
              "flex items-center space-x-3 sm:space-x-4 w-full rounded-md",
              isActive && "bg-muted/50 font-medium"
            )}
            aria-label={`Navigate to ${item.name}`}
            tabIndex={0}
          >
            <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" aria-hidden="true" />
            <span>{item.name}</span>
          </a>
        ) : (
          <Link
            href={item.href}
            onClick={closeMenu}
            className={cn(
              "flex items-center space-x-3 sm:space-x-4 w-full rounded-md",
              isActive && "bg-muted/50 font-medium"
            )}
            aria-label={`Navigate to ${item.name}`}
            tabIndex={0}
          >
            <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" aria-hidden="true" />
            <span>{item.name}</span>
          </Link>
        )}
      </Button>
    )
  }

  const linkContent = (
    <>
      <IconComponent className="h-4 w-4 flex-shrink-0" aria-hidden="true" />
      <span>{item.name}</span>
    </>
  )

  const buttonClass = cn(
    "flex items-center space-x-1.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-h-[44px] px-1.5 sm:px-2 shrink-0 text-xs sm:text-sm whitespace-nowrap rounded-md transition-colors",
    isActive && "text-foreground font-medium underline decoration-2 underline-offset-4"
  )

  return (
    <Button variant="ghost" size="sm" asChild className={buttonClass}>
      {isHashLink ? (
        <a href={item.href} onClick={(e) => onHashLink(item.href, e)} aria-label={`Navigate to ${item.name}`}>
          {linkContent}
        </a>
      ) : (
        <Link href={item.href} aria-label={`Navigate to ${item.name}`}>
          {linkContent}
        </Link>
      )}
    </Button>
  )
}

function HeaderComponent({ className }: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [currentHash, setCurrentHash] = useState('')
  const router = useRouter()
  const pathname = router.pathname
  const navVisible = useScrollDirection()
  const animationsEnabled = useAnimationsEnabled()
  const navVariants = React.useMemo(() => getSectionVariants(animationsEnabled), [animationsEnabled])
  const navItemVariants = React.useMemo(() => getNavItemVariants(animationsEnabled), [animationsEnabled])

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? (window.location.hash || '').replace(/^#/, '') : ''
    setCurrentHash(hash)
    const onHashChange = () => setCurrentHash((window.location.hash || '').replace(/^#/, ''))
    window.addEventListener('hashchange', onHashChange)
    return () => window.removeEventListener('hashchange', onHashChange)
  }, [pathname])

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev)
  }, [])

  const closeMenu = useCallback(() => {
    setIsOpen(false)
  }, [])

  const handleHashLink = (href: string, e: React.MouseEvent) => {
    e.preventDefault()
    const hash = href.split('#')[1]
    if (pathname !== '/') {
      router.push('/').then(() => {
        setTimeout(() => {
          const element = document.getElementById(hash)
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }, 100)
      })
    } else {
      const element = document.getElementById(hash)
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    closeMenu()
  }

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu()
    }
    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
      document.body.style.overflow = 'hidden'
    }
    return () => {
      document.removeEventListener('keydown', handleEscape)
      document.body.style.overflow = ''
    }
  }, [isOpen, closeMenu])

  const navSchema = React.useMemo(() => generateSiteNavigationSchema(navigation), [])

  return (
    <>
      <Helmet>
        <script type="application/ld+json">
          {JSON.stringify(navSchema)}
        </script>
      </Helmet>
      <header
        role="banner"
        className={cn(
          "fixed top-0 left-0 right-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 overflow-x-hidden scrollbar-hide",
          "transition-transform duration-300 ease-out",
          navVisible ? "translate-y-0" : "-translate-y-full",
          className
        )}
        aria-label="Site header"
      >
        <div className="container-custom max-w-full scrollbar-hide overflow-x-hidden">
          <div className="flex min-h-14 sm:min-h-16 items-center justify-between gap-2">
            {/* Left: Logo */}
            <div className="flex items-center min-w-0 shrink-0">
              <Link
                href="/"
                className="flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md p-1 min-h-[44px] min-w-[44px] sm:min-w-0"
                aria-label="Ancel Ajanga - Home"
              >
                <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-7 lg:h-7 xl:w-8 xl:h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center shrink-0">
                  <span className="text-white font-bold text-xs sm:text-sm">A</span>
                </div>
                <span className="font-bold text-sm sm:text-base lg:text-sm xl:text-base whitespace-nowrap truncate">Ancel Ajanga</span>
              </Link>
            </div>

            {/* Center: Primary nav (desktop only), cohesive group */}
            <motion.nav
              className="hidden lg:flex items-center justify-center gap-0.5 sm:gap-1 min-w-0 flex-1 overflow-x-hidden scrollbar-hide"
              role="navigation"
              aria-label="Main navigation"
              variants={navVariants.containerVariants}
              initial="hidden"
              animate="visible"
            >
              {primaryNav.map((item) => (
                <motion.div key={item.name} variants={navItemVariants} whileHover={getHoverScale(animationsEnabled)} transition={getHoverTransition(animationsEnabled)}>
                  <NavLink
                    item={item}
                    pathname={pathname}
                    currentHash={currentHash}
                    onHashLink={handleHashLink}
                    variant="desktop"
                  />
                </motion.div>
              ))}
            </motion.nav>

            {/* Right: Contact + Screen (theme) on desktop; Theme + Hamburger on mobile */}
            <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
              <div className="hidden lg:flex items-center">
                <motion.div variants={navItemVariants} whileHover={getHoverScale(animationsEnabled)} transition={getHoverTransition(animationsEnabled)}>
                  <NavLink
                    item={contactNav}
                    pathname={pathname}
                    currentHash={currentHash}
                    onHashLink={handleHashLink}
                    variant="desktop"
                  />
                </motion.div>
              </div>
              <ThemeToggle />
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 min-w-[44px] min-h-[44px] w-11 h-11 sm:w-12 sm:h-12"
                onClick={toggleMenu}
                aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={isOpen}
                aria-controls="mobile-navigation"
                aria-haspopup="true"
              >
                {isOpen ? (
                  <X className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                ) : (
                  <Menu className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile: vertical menu */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="lg:hidden border-t overflow-hidden scrollbar-hide"
                id="mobile-navigation"
                role="dialog"
                aria-label="Mobile navigation menu"
                aria-modal="true"
              >
                <nav
                  className="py-2 sm:py-3 space-y-0.5 sm:space-y-1 max-h-[calc(100vh-4rem)] sm:max-h-[calc(100vh-4.5rem)] overflow-y-auto overscroll-contain scrollbar-hide"
                  role="navigation"
                  aria-label="Mobile navigation"
                >
                  {navigation.map((item) => (
                    <NavLink
                      key={item.name}
                      item={item}
                      pathname={pathname}
                      currentHash={currentHash}
                      onHashLink={handleHashLink}
                      closeMenu={closeMenu}
                      variant="mobile"
                    />
                  ))}
                </nav>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </header>
    </>
  )
}

export const Header = React.memo(HeaderComponent)
