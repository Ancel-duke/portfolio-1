import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './contexts/ThemeContext'
import { Header } from './components/layout/header'
import { Footer } from './components/layout/footer'
import { Hero } from './components/sections/hero'
import { Button } from './components/ui/button'
import SEO from './components/seo/SEO'
import { SkipLink } from './components/ui/skip-link'
import { 
  generatePersonSchema, 
  generateWebsiteSchema, 
  generatePortfolioSchema,
  generateOrganizationSchema,
  getKnowsAboutAsThings,
  generateSoftwareSourceCodeSchema
} from './components/seo/schemas'
import WebVitals from './components/performance/WebVitals'

// Lazy load pages for code splitting (only load chunk when route is visited)
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage').then(module => ({ default: module.BlogDetailPage })))
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage').then(module => ({ default: module.CaseStudyDetailPage })))
const Projects = lazy(() => import('./pages/Projects'))
const DeveloperJournal = lazy(() => import('./pages/DeveloperJournal').then(module => ({ default: module.DeveloperJournal })))
const AboutSection = lazy(() => import('./components/sections/about').then(m => ({ default: () => <m.About fullPage /> })))
const ContactFormLazy = lazy(() => import('./components/forms/contact-form').then(m => ({ default: m.ContactForm })))

// Below-the-fold: lazy so Hero (LCP) is in main bundle and paints first
const CaseStudiesGrid = lazy(() => import('./components/sections/case-studies-grid').then(m => ({ default: m.CaseStudiesGrid })))
const LabsExperiments = lazy(() => import('./components/sections/labs-experiments').then(m => ({ default: m.LabsExperiments })))
const Timeline = lazy(() => import('./components/sections/timeline').then(m => ({ default: m.Timeline })))
const TechStack = lazy(() => import('./components/sections/tech-stack').then(m => ({ default: m.TechStack })))
const Fun = lazy(() => import('./components/sections/fun').then(m => ({ default: m.Fun })))
const CTA = lazy(() => import('./components/sections/cta').then(m => ({ default: m.CTA })))
const TodaysHighlights = lazy(() => import('./components/sections/todays-highlights').then(m => ({ default: m.TodaysHighlights })))
const About = lazy(() => import('./components/sections/about').then(m => ({ default: m.About })))

// Loading fallback for route-level Suspense
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
)

// Minimal placeholder for below-fold sections (no spinner — avoids layout shift, lets LCP complete)
const BelowFoldPlaceholder = () => <div className="min-h-[1px]" aria-hidden="true" />

// Minimal JSON-LD for first paint (no heavy data). Full schemas injected after async data load.
const initialJsonLd = [
  generatePersonSchema(),
  generateWebsiteSchema(),
  generateOrganizationSchema()
]

// Home Page Component
function HomePage() {
  const [jsonLd, setJsonLd] = React.useState<object[]>(initialJsonLd)

  React.useEffect(() => {
    // Handle hash links on page load
    const hash = window.location.hash
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [])

  // Defer heavy JSON and full schema so main bundle stays light; schemas load in a separate chunk.
  React.useEffect(() => {
    Promise.all([
      import('./data/projects.json'),
      import('./data/stack.json'),
      import('./data/tech-authoritative-sources.json')
    ]).then(([p, s, t]) => {
      const projectsData = p.default
      const stackData = s.default
      const techAuthoritative = t.default
      const knowsAboutThings = getKnowsAboutAsThings(
        stackData.technologies.map((x: { name: string }) => x.name),
        techAuthoritative.techToAuthoritative
      )
      const softwareSourceCodeSchemas = (projectsData
        .map((proj: { repoUrl?: string; links?: { github?: string } }) => generateSoftwareSourceCodeSchema(proj))
        .filter(Boolean) as object[])
      setJsonLd([
        generatePersonSchema({ knowsAboutThings }),
        generateWebsiteSchema(),
        generatePortfolioSchema(projectsData),
        generateOrganizationSchema(),
        ...softwareSourceCodeSchemas
      ])
    })
  }, [])

  return (
    <>
      <SEO
        title="Ancel Ajanga - Fullstack Engineer | System Resilience & Scale"
        description="Ancel Ajanga is a Fullstack Engineer and Software Engineer specializing in system resilience: hardened backends, fluid frontends, and self-healing infrastructure. Scale and resilience from UI to database. Based in Kenya."
        canonicalUrl="https://ancel.co.ke/"
        jsonLd={jsonLd}
      />
      <SkipLink />
      <div className="min-h-screen">
        <Hero />
        <Suspense fallback={<BelowFoldPlaceholder />}>
          <About />
          <TodaysHighlights />
          <CaseStudiesGrid limit={3} showViewAll={true} />
          <LabsExperiments limit={3} showViewAll={true} />
          <TechStack />
          <Fun />
          <CTA />
        </Suspense>
      </div>
    </>
  )
}

// About page: lazy-loaded section
function AboutPage() {
  return <AboutSection />
}

// Stack Page Component
function StackPage() {
  return (
    <>
      <TechStack fullPage />
    </>
  )
}

// Fun Page Component
function FunPage() {
  return (
    <>
      <Fun fullPage />
    </>
  )
}

// Timeline Page Component
function TimelinePage() {
  return (
    <>
      <Timeline fullPage />
    </>
  )
}

// Contact page: lazy-loaded form
function ContactPage() {
  return <ContactFormLazy />
}

// Case Studies Page Component - Uses same layout as Featured section
function CaseStudiesPage() {
  return (
    <>
      {/* 
        SAME PROFESSIONAL LAYOUT AS FEATURED:
        - Uses CaseStudiesGrid with showHeader={true}
        - No limit = shows all case studies
        - showViewAll={false} = no "View All" button
        - Identical spacing, typography, and card design
      */}
      <CaseStudiesGrid 
        showHeader={true}
        showViewAll={false}
        limit={undefined}
      />
    </>
  )
}

// Labs & Experiments Page Component
function LabsExperimentsPage() {
  return (
    <>
      <LabsExperiments showViewAll={false} fullPage={true} />
    </>
  )
}

// 404 Page Component
function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] py-16">
      <div className="container-custom text-center">
        <h1 className="text-7xl font-bold mb-4">404</h1>
        <p className="text-xl text-muted-foreground mb-8">
          Oops! The page you're looking for doesn't exist.
        </p>
        <Button asChild>
          <a href="/">Go Home</a>
        </Button>
      </div>
    </div>
  )
}

// Main App Component
function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <Router>
          <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
            <WebVitals />
            <Header />
            <main id="main-content" role="main" className="overflow-x-hidden">
              <Suspense fallback={<PageLoader />}>
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/case-studies" element={<CaseStudiesPage />} />
                  <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
                  <Route path="/labs-experiments" element={<LabsExperimentsPage />} />
                  <Route path="/developer-journal" element={<DeveloperJournal />} />
                  <Route path="/developer-journal/:slug" element={<BlogDetailPage />} />
                  <Route path="/blog" element={<DeveloperJournal />} />
                  <Route path="/timeline" element={<TimelinePage />} />
                  <Route path="/stack" element={<StackPage />} />
                  <Route path="/fun" element={<FunPage />} />
                  <Route path="/contact" element={<ContactPage />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </Suspense>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App