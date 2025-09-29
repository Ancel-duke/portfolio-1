import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './contexts/ThemeContext'
import { Header } from './components/layout/header'
import { Footer } from './components/layout/footer'
import { Hero } from './components/sections/hero'
import { CaseStudiesGrid } from './components/sections/case-studies-grid'
import { Timeline } from './components/sections/timeline'
import { TechStack } from './components/sections/tech-stack'
import { Fun } from './components/sections/fun'
import { CTA } from './components/sections/cta'
import { ContactForm } from './components/forms/contact-form'
import { About } from './components/sections/about'
import { BlogDetailPage } from './pages/BlogDetailPage'
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage'
import Projects from './pages/Projects'
import { DeveloperJournal } from './pages/DeveloperJournal'
import { Button } from './components/ui/button'
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

// Home Page Component
function HomePage() {
  return (
    <>
      <SEO
        title="Ancel Ajanga - Fullstack Software Engineer/Developer & App Developer"
        description="Ancel Ajanga (Duke) — Fullstack Software Engineer/Developer & App Developer. Builder of apps, poet, and creative problem solver."
        canonicalUrl="https://ancel-ajanga.netlify.app/"
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
        <CaseStudiesGrid limit={3} showViewAll={true} />
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
  return (
    <>
      <CaseStudiesGrid showViewAll={false} />
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
          <div className="min-h-screen bg-background text-foreground">
            <WebVitals />
            <Header />
            <main id="main-content" role="main">
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/about" element={<AboutPage />} />
                <Route path="/projects" element={<Projects />} />
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
                <Route path="/developer-journal" element={<DeveloperJournal />} />
                <Route path="/developer-journal/:slug" element={<BlogDetailPage />} />
                <Route path="/blog" element={<DeveloperJournal />} />
                <Route path="/timeline" element={<TimelinePage />} />
                <Route path="/stack" element={<StackPage />} />
                <Route path="/fun" element={<FunPage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </ThemeProvider>
    </HelmetProvider>
  )
}

export default App