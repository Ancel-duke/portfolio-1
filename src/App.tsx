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
import { ContactForm } from './components/forms/contact-form'
import { TodaysHighlights } from './components/sections/todays-highlights'
import { About } from './components/sections/about'
import { Button } from './components/ui/button'
import { ArrowRight } from 'lucide-react'
import SEO from './components/seo/SEO'
import { SkipLink } from './components/ui/skip-link'
import { 
  generatePersonSchema, 
  generateWebsiteSchema, 
  generatePortfolioSchema,
  generateOrganizationSchema 
} from './components/seo/schemas'
import WebVitals from './components/performance/WebVitals'
import projectsData from './data/projects.json'

// Lazy load pages for code splitting
const BlogDetailPage = lazy(() => import('./pages/BlogDetailPage').then(module => ({ default: module.BlogDetailPage })))
const CaseStudyDetailPage = lazy(() => import('./pages/CaseStudyDetailPage').then(module => ({ default: module.CaseStudyDetailPage })))
const Projects = lazy(() => import('./pages/Projects'))
const DeveloperJournal = lazy(() => import('./pages/DeveloperJournal').then(module => ({ default: module.DeveloperJournal })))

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

  return (
    <>
      <SEO
        title="Ancel Ajanga - Fullstack Software Engineer/Developer & App Developer"
        description="Ancel Ajanga (Duke) — Fullstack Software Engineer/Developer & App Developer. Builder of apps, poet, and creative problem solver."
  canonicalUrl="https://ancel.co.ke/"
        jsonLd={[
          generatePersonSchema(),
          generateWebsiteSchema(),
          generatePortfolioSchema(projectsData),
          generateOrganizationSchema()
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

// About Page Component
function AboutPage() {
  return (
    <>
      <About fullPage />
    </>
  )
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

// Contact Page Component
function ContactPage() {
  return (
    <>
      <ContactForm />
    </>
  )
}

// Case Studies Page Component
function CaseStudiesPage() {
  const [showAll, setShowAll] = React.useState(false)
  
  return (
    <>
      <div className="py-16 w-full overflow-x-hidden">
        <div className="container-custom max-w-full">
          <div className="text-center mb-12 px-4 sm:px-0">
            <h1 className="text-[clamp(2rem,5vw,3.5rem)] font-bold mb-4">
              {showAll ? "All" : "Featured"} <span className="text-gradient">Case Studies</span>
            </h1>
            <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground max-w-2xl mx-auto">
              {showAll 
                ? "Deep dives into my most challenging and rewarding projects, showcasing the process, challenges, and outcomes."
                : "Enterprise-grade systems showcasing resilient architecture, hybrid databases, and scalable solutions."}
            </p>
          </div>
        </div>
        <CaseStudiesGrid limit={showAll ? undefined : 6} showViewAll={false} />
        {!showAll && (
          <div className="text-center mt-12 px-4">
            <Button size="lg" variant="outline" onClick={() => setShowAll(true)}>
              Show All Case Studies
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
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