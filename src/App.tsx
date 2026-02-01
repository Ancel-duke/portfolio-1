import React, { Suspense, lazy } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './contexts/ThemeContext'
import { Header } from './components/layout/header'
import { Footer } from './components/layout/footer'
import { Hero } from './components/sections/hero'
import { CaseStudiesGrid } from './components/sections/case-studies-grid'
import { LabsExperiments } from './components/sections/labs-experiments'
import { Timeline } from './components/sections/timeline'
import { TechStack } from './components/sections/tech-stack'
import { Fun } from './components/sections/fun'
import { CTA } from './components/sections/cta'
import { TodaysHighlights } from './components/sections/todays-highlights'
import { About } from './components/sections/about'
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
import projectsData from './data/projects.json'
import stackData from './data/stack.json'
import techAuthoritative from './data/tech-authoritative-sources.json'

// Lazy load pages for code splitting (only load chunk when route is visited)
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage').then(module => ({ default: module.BlogDetailPage })))
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage').then(module => ({ default: module.CaseStudyDetailPage })))
const Projects = lazy(() => import('./pages/Projects'))
const DeveloperJournal = lazy(() => import('./pages/DeveloperJournal').then(module => ({ default: module.DeveloperJournal })))
const AboutSection = lazy(() => import('./components/sections/about').then(m => ({ default: () => <m.About fullPage /> })))
const ContactFormLazy = lazy(() => import('./components/forms/contact-form').then(m => ({ default: m.ContactForm })))

// Loading fallback component
const PageLoader = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
  </div>
)

// Home Page Component
function HomePage() {
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

  const knowsAboutThings = getKnowsAboutAsThings(
    stackData.technologies.map((t: { name: string }) => t.name),
    techAuthoritative.techToAuthoritative
  )
  const softwareSourceCodeSchemas = projectsData
    .map((p: { repoUrl?: string; links?: { github?: string } }) => generateSoftwareSourceCodeSchema(p))
    .filter(Boolean)

  return (
    <>
      <SEO
        title="Ancel Ajanga - Fullstack Software Engineer/Developer & App Developer"
        description="Ancel Ajanga (Duke) — Fullstack Software Engineer/Developer & App Developer. Builder of apps, poet, and creative problem solver."
        canonicalUrl="https://ancel.co.ke/"
        jsonLd={[
          generatePersonSchema({ knowsAboutThings }),
          generateWebsiteSchema(),
          generatePortfolioSchema(projectsData),
          generateOrganizationSchema(),
          ...softwareSourceCodeSchemas
        ]}
      />
      <SkipLink />
      <div className="min-h-screen">
        <Hero />
        <About />
        <TodaysHighlights />
        <CaseStudiesGrid limit={3} showViewAll={true} />
        <LabsExperiments limit={3} showViewAll={true} />
        <TechStack />
        <Fun />
        <CTA />
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