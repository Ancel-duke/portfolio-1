import * as React from 'react';
import { useState, useEffect, useCallback } from 'react';
import { LazyMotion, domAnimation, m, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Helmet } from 'react-helmet-async';
import { Button } from '@/shared/components/ui/button';
import { ThemeToggle } from '@/shared/components/ui/theme-toggle';
import { cn } from '@/shared/utils';
import {
  Menu,
  X,
  Home,
  User,
  FileText,
  Briefcase,
  Code,
  Calendar,
  FlaskConical,
  Mail,
  BookOpen,
  BookMarked,
  Star,
} from 'lucide-react';
import { generateSiteNavigationSchema } from '@/shared/utils/site-navigation-schema';
import { useScrollDirection } from '@/shared/hooks/useScrollDirection';
import { useAnimationsEnabled } from '@/contexts/AnimationsContext';
import {
  getSectionVariants,
  getNavItemVariants,
  getHoverScale,
  getHoverTransition,
} from '@/shared/utils/animation-variants';

interface NavbarProps {
  className?: string;
}

/** Reference order: Home, About, Projects, Today's Highlights, Case Studies, Developer Journal, Timeline, Stack, Labs & Experiments. Contact is rendered separately on the far right. */
const primaryNav = [
  { name: 'Home', href: '/', icon: Home },
  { name: 'About', href: '/about', icon: User },
  { name: 'Projects', href: '/projects', icon: Briefcase },
  { name: 'Highlights', href: '/#highlights', icon: Star },
  { name: 'Case Studies', href: '/case-studies', icon: FileText },
  { name: 'Journal', href: '/developer-journal', icon: BookOpen },
  { name: 'Guides', href: '/guides', icon: BookMarked },
  { name: 'Timeline', href: '/timeline', icon: Calendar },
  { name: 'Stack', href: '/stack', icon: Code },
  { name: 'Labs', href: '/labs-experiments', icon: FlaskConical },
];

const contactNav = { name: 'Contact', href: '/contact', icon: Mail };

/** Full list for mobile menu and SEO schema (primary + Contact). */
const navigation = [...primaryNav, contactNav];

function NavLink({
  item,
  pathname,
  currentHash,
  onHashLink,
  closeMenu,
  variant = 'desktop',
}: {
  item: (typeof primaryNav)[0] | typeof contactNav;
  pathname: string;
  currentHash: string;
  onHashLink: (href: string, e: React.MouseEvent) => void;
  closeMenu?: () => void;
  variant: 'desktop' | 'mobile';
}) {
  const IconComponent = item.icon;
  const isHashLink = item.href.startsWith('/#') || item.href.startsWith('#');
  const itemHash = isHashLink && item.href.includes('#') ? item.href.split('#')[1] : '';
  const isActive =
    item.href === '/'
      ? pathname === '/' && !currentHash
      : pathname === item.href || (isHashLink && pathname === '/' && currentHash === itemHash);

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
              'flex items-center space-x-3 sm:space-x-4 w-full rounded-md',
              isActive && 'bg-muted/50 font-medium'
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
              'flex items-center space-x-3 sm:space-x-4 w-full rounded-md',
              isActive && 'bg-muted/50 font-medium'
            )}
            aria-label={`Navigate to ${item.name}`}
            tabIndex={0}
          >
            <IconComponent className="h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0" aria-hidden="true" />
            <span>{item.name}</span>
          </Link>
        )}
      </Button>
    );
  }

  const buttonClass = cn(
    'text-[15px] font-medium tracking-wide whitespace-nowrap rounded-md transition-colors',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2',
    'min-h-[38px] px-3.5 shrink-0',
    isActive
      ? 'text-foreground underline decoration-2 underline-offset-4'
      : 'text-muted-foreground hover:text-foreground'
  );

  return (
    <Button variant="ghost" size="sm" asChild className={buttonClass}>
      {isHashLink ? (
        <a href={item.href} onClick={(e) => onHashLink(item.href, e)} aria-label={`Navigate to ${item.name}`}>
          {item.name}
        </a>
      ) : (
        <Link href={item.href} aria-label={`Navigate to ${item.name}`}>
          {item.name}
        </Link>
      )}
    </Button>
  );
}

function NavbarComponent({ className }: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentHash, setCurrentHash] = useState('');
  const [visible, setVisible] = useState(true);
  const router = useRouter();
  const pathname = router.pathname;
  const { direction } = useScrollDirection();
  const animationsEnabled = useAnimationsEnabled();
  const navVariants = React.useMemo(() => getSectionVariants(animationsEnabled), [animationsEnabled]);
  const navItemVariants = React.useMemo(() => getNavItemVariants(animationsEnabled), [animationsEnabled]);

  useEffect(() => {
    if (direction === 'down') {
      setVisible(false);
    } else if (direction === 'up') {
      setVisible(true);
    }
  }, [direction]);

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? (window.location.hash || '').replace(/^#/, '') : '';
    setCurrentHash(hash);
    const onHashChange = () => setCurrentHash((window.location.hash || '').replace(/^#/, ''));
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, [pathname]);

  const toggleMenu = useCallback(() => {
    setIsOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleHashLink = (href: string, e: React.MouseEvent) => {
    e.preventDefault();
    const hash = href.split('#')[1];
    if (pathname !== '/') {
      router.push('/').then(() => {
        setTimeout(() => {
          const element = document.getElementById(hash);
          if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      });
    } else {
      const element = document.getElementById(hash);
      if (element) element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    closeMenu();
  };

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeMenu();
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = '';
    };
  }, [isOpen, closeMenu]);

  const navSchema = React.useMemo(() => generateSiteNavigationSchema(navigation), []);

  const showNav = isOpen || visible;

  return (
    <>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(navSchema)}</script>
      </Helmet>
      {/* Reserves bar height so fixed positioning does not shift page layout */}
      <div className="h-12 w-full shrink-0" aria-hidden="true" />
      <LazyMotion features={domAnimation}>
        <header
          role="banner"
          className={cn(
            'fixed top-0 left-0 right-0 z-[1000] w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
            'transition-transform duration-[250ms] ease-out',
            showNav ? 'translate-y-0' : '-translate-y-full pointer-events-none',
            className
          )}
          aria-label="Site header"
        >
          <div className="container-custom max-w-full">
            <div className="flex h-12 items-center justify-between gap-2">
              <div className="flex items-center shrink-0">
                <Link
                  href="/"
                  className="flex items-center space-x-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 rounded-md p-1 min-h-[36px]"
                  aria-label="Ancel Ajanga - Home"
                >
                  <div className="w-7 h-7 bg-gradient-to-br from-primary to-accent rounded-md flex items-center justify-center shrink-0">
                    <span className="text-white font-bold text-xs">A</span>
                  </div>
                  <span className="font-bold text-base whitespace-nowrap hidden sm:inline">Ancel Ajanga</span>
                </Link>
              </div>

              <m.nav
                className="hidden xl:flex items-center justify-center gap-1 flex-1 min-w-0"
                role="navigation"
                aria-label="Main navigation"
                variants={navVariants.containerVariants}
                initial="hidden"
                animate="visible"
              >
                {primaryNav.map((item) => (
                  <m.div
                    key={item.name}
                    variants={navItemVariants}
                    whileHover={getHoverScale(animationsEnabled)}
                    transition={getHoverTransition(animationsEnabled)}
                  >
                    <NavLink
                      item={item}
                      pathname={pathname}
                      currentHash={currentHash}
                      onHashLink={handleHashLink}
                      variant="desktop"
                    />
                  </m.div>
                ))}
              </m.nav>

              <div className="flex items-center gap-1.5 shrink-0">
                <div className="hidden xl:flex items-center">
                  <m.div
                    variants={navItemVariants}
                    whileHover={getHoverScale(animationsEnabled)}
                    transition={getHoverTransition(animationsEnabled)}
                  >
                    <NavLink
                      item={contactNav}
                      pathname={pathname}
                      currentHash={currentHash}
                      onHashLink={handleHashLink}
                      variant="desktop"
                    />
                  </m.div>
                </div>
                <ThemeToggle />
                <Button
                  variant="ghost"
                  size="icon"
                  className="xl:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 w-10 h-10 shrink-0"
                  onClick={toggleMenu}
                  aria-label={isOpen ? 'Close navigation menu' : 'Open navigation menu'}
                  aria-expanded={isOpen}
                  aria-controls="mobile-navigation"
                  aria-haspopup="true"
                >
                  {isOpen ? (
                    <X className="h-5 w-5" aria-hidden="true" />
                  ) : (
                    <Menu className="h-5 w-5" aria-hidden="true" />
                  )}
                </Button>
              </div>
            </div>

            <AnimatePresence>
              {isOpen && (
                <m.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2, ease: 'easeOut' }}
                  className="xl:hidden border-t overflow-hidden"
                  id="mobile-navigation"
                  role="dialog"
                  aria-label="Mobile navigation menu"
                  aria-modal="true"
                >
                  <nav
                    className="py-2 sm:py-3 space-y-0.5 sm:space-y-1 max-h-[calc(100vh-4rem)] overflow-y-auto overscroll-contain"
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
                </m.div>
              )}
            </AnimatePresence>
          </div>
        </header>
      </LazyMotion>
    </>
  );
}

export const Navbar = React.memo(NavbarComponent);
