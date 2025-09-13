import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from './contexts/ThemeContext'
import { Header } from './components/layout/header'
import { Footer } from './components/layout/footer'
import { Hero } from './components/sections/hero'
import { BlogGrid } from './components/sections/blog-grid'
import { CaseStudiesGrid } from './components/sections/case-studies-grid'
import { Timeline } from './components/sections/timeline'
import { TechStack } from './components/sections/tech-stack'
import { Fun } from './components/sections/fun'
import { CTA } from './components/sections/cta'
import { ContactForm } from './components/forms/contact-form'
import { About } from './components/sections/about'
import { BlogDetailPage } from './pages/BlogDetailPage'
import { CaseStudyDetailPage } from './pages/CaseStudyDetailPage'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './components/ui/card'
import { Button } from './components/ui/button'
import { ArrowRight } from 'lucide-react'
import SEOHead from './components/seo/SEOHead'
import { SkipLink } from './components/ui/skip-link'
import { Breadcrumb } from './components/ui/breadcrumb'
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
      <SEOHead
        title="Ancel Ajanga - Fullstack Software Engineer Portfolio"
        description="Ancel Ajanga is a fullstack software engineer who crafts complete software applications — mobile, web, and desktop — using React, Node.js, Python, and modern web technologies. View portfolio of 8+ applications including finance trackers, e-learning platforms, and mobile apps. Based in Kenya."
        canonical="/"
        jsonLd={[
          generatePersonSchema(),
          generateWebsiteSchema(),
          generatePortfolioSchema(projectsData),
          generateOrganizationSchema()
        ]}
      />
      <SkipLink />
      <Hero />
      <CaseStudiesGrid showViewAll={false} />
      <BlogGrid limit={3} showViewAll={true} />
      <CTA />
    </>
  )
}

// Case Studies Page Component
function CaseStudiesPage() {
  return (
    <>
      <SEOHead
        title="Case Studies - Detailed Project Analysis"
        description="Deep dives into my most challenging and rewarding projects, showcasing the development process, technical challenges, and measurable outcomes. Explore real-world applications including TaskForge, E-Learning Platform, and Attendance System."
        canonical="/case-studies"
        keywords={[
          'case studies',
          'project analysis',
          'software development process',
          'technical challenges',
          'project outcomes',
          'fullstack development',
          'React projects',
          'Node.js applications',
          'Python projects',
          'mobile app development'
        ]}
      />
      <SkipLink />
      <div className="py-16">
        <div className="container-custom">
          <Breadcrumb 
            items={[
              { name: 'Home', url: '/' },
              { name: 'Case Studies', url: '/case-studies', current: true }
            ]}
            className="mb-8"
          />
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Case <span className="text-gradient">Studies</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep dives into my most challenging and rewarding projects, showcasing the process, challenges, and outcomes.
            </p>
          </div>
          <CaseStudiesGrid showViewAll={false} />
        </div>
      </div>
    </>
  )
}

// Blog Page Component
function BlogPage() {
  return (
    <>
      <SEOHead
        title="Blog & Insights - Web Development Articles"
        description="Thoughts on web development, technology trends, and lessons learned from building real-world applications. Explore articles about React, Node.js, Python, and modern web development practices."
        canonical="/blog"
        keywords={[
          'web development blog',
          'technology insights',
          'React tutorials',
          'Node.js development',
          'Python programming',
          'software development',
          'coding best practices',
          'fullstack development',
          'mobile app development',
          'programming tutorials'
        ]}
      />
      <SkipLink />
      <div className="py-16">
        <div className="container-custom">
          <Breadcrumb 
            items={[
              { name: 'Home', url: '/' },
              { name: 'Blog', url: '/blog', current: true }
            ]}
            className="mb-8"
          />
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Blog & <span className="text-gradient">Insights</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Thoughts on web development, technology trends, and lessons learned from building real-world applications.
            </p>
          </div>
          <BlogGrid showViewAll={false} />
        </div>
      </div>
    </>
  )
}

// Timeline Page Component
function TimelinePage() {
  return (
    <>
      <SEOHead
        title="My Journey - Development Timeline"
        description="From learning HTML and CSS in school to building full-stack applications for clients. Explore my development journey, key milestones, and growth as a software engineer."
        canonical="/timeline"
        keywords={[
          'development journey',
          'programming timeline',
          'software engineer career',
          'coding milestones',
          'learning progression',
          'freelance developer',
          'fullstack development',
          'web development journey',
          'programming experience',
          'career growth'
        ]}
      />
      <SkipLink />
      <div className="py-16">
        <div className="container-custom">
          <Breadcrumb 
            items={[
              { name: 'Home', url: '/' },
              { name: 'Timeline', url: '/timeline', current: true }
            ]}
            className="mb-8"
          />
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              My <span className="text-gradient">Journey</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From learning HTML and CSS in school to building full-stack applications for clients.
            </p>
          </div>
          <Timeline />
        </div>
      </div>
    </>
  )
}

// Stack Page Component
function StackPage() {
  return (
    <>
      <SEOHead
        title="Tech Stack - Technologies & Tools"
        description="Technologies I use to build modern, scalable web applications. From frontend frameworks like React and Vue to backend services with Node.js and Python. Explore my complete technology stack."
        canonical="/stack"
        keywords={[
          'tech stack',
          'programming languages',
          'frontend frameworks',
          'backend technologies',
          'React',
          'Node.js',
          'Python',
          'JavaScript',
          'TypeScript',
          'MongoDB',
          'Django',
          'Express.js',
          'development tools',
          'software technologies'
        ]}
      />
      <SkipLink />
      <div className="py-16">
        <div className="container-custom">
          <Breadcrumb 
            items={[
              { name: 'Home', url: '/' },
              { name: 'Tech Stack', url: '/stack', current: true }
            ]}
            className="mb-8"
          />
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Tech <span className="text-gradient">Stack</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Technologies I use to build modern, scalable web applications. From frontend frameworks to backend services.
            </p>
          </div>
          <TechStack />
        </div>
      </div>
    </>
  )
}

// Fun Page Component
function FunPage() {
  return (
    <>
      <SEOHead
        title="Fun Stuff - Personal Interests & Tools"
        description="A peek into my personality, interests, and the tools I love to use. Discover my hobbies, favorite technologies, and what makes me tick as a developer."
        canonical="/fun"
        keywords={[
          'developer interests',
          'programming hobbies',
          'personal projects',
          'developer tools',
          'coding interests',
          'technology preferences',
          'developer personality',
          'fun coding projects',
          'programming community',
          'developer lifestyle'
        ]}
      />
      <SkipLink />
      <div className="py-16">
        <div className="container-custom">
          <Breadcrumb 
            items={[
              { name: 'Home', url: '/' },
              { name: 'Fun Stuff', url: '/fun', current: true }
            ]}
            className="mb-8"
          />
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Fun <span className="text-gradient">Stuff</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A peek into my personality, interests, and the tools I love to use.
            </p>
          </div>
          <Fun />
        </div>
      </div>
    </>
  )
}

// About Page Component
function AboutPage() {
  return (
    <>
      <SEOHead
        title="About - Ancel Ajanga"
        description="Learn more about Ancel Ajanga, a fullstack software engineer from Kenya. Discover my background, skills, experience, and passion for building innovative software solutions."
        canonical="/about"
        keywords={[
          'about ancel ajanga',
          'software engineer background',
          'fullstack developer',
          'kenya developer',
          'programming experience',
          'developer skills',
          'software development',
          'web development',
          'mobile app development',
          'freelance developer'
        ]}
      />
      <SkipLink />
      <div className="py-16">
        <div className="container-custom">
          <Breadcrumb 
            items={[
              { name: 'Home', url: '/' },
              { name: 'About', url: '/about', current: true }
            ]}
            className="mb-8"
          />
          <About />
        </div>
      </div>
    </>
  )
}

// Contact Page Component
function ContactPage() {
  return (
    <>
      <SEOHead
        title="Contact - Get In Touch"
        description="Have a project in mind? Let's discuss how we can work together to bring your ideas to life. Contact Ancel Ajanga for fullstack development services, web applications, and mobile app development."
        canonical="/contact"
        keywords={[
          'contact ancel ajanga',
          'hire developer',
          'fullstack development services',
          'web development contact',
          'mobile app development',
          'freelance developer',
          'project consultation',
          'software development services',
          'kenya developer',
          'react developer contact'
        ]}
      />
      <SkipLink />
      <div className="py-16">
        <div className="container-custom">
          <Breadcrumb 
            items={[
              { name: 'Home', url: '/' },
              { name: 'Contact', url: '/contact', current: true }
            ]}
            className="mb-8"
          />
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Get In <span className="text-gradient">Touch</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <ContactForm />
          </div>
        </div>
      </div>
    </>
  )
}

// 404 Page Component
function NotFoundPage() {
  return (
    <>
      <SEOHead
        title="404 - Page Not Found"
        description="The page you're looking for doesn't exist. Return to Ancel Ajanga's portfolio homepage to explore my projects and get in touch."
        canonical="/404"
        noindex={true}
      />
      <SkipLink />
      <div className="py-16">
        <div className="container-custom">
          <div className="text-center">
            <Card className="max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-6xl font-bold text-primary">404</CardTitle>
                <CardDescription className="text-lg">
                  Oops! The page you're looking for doesn't exist.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild className="w-full">
                  <a href="/">
                    <ArrowRight className="mr-2 h-4 w-4" />
                    Go Home
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}

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
                <Route path="/case-studies" element={<CaseStudiesPage />} />
                <Route path="/case-studies/:slug" element={<CaseStudyDetailPage />} />
                <Route path="/blog" element={<BlogPage />} />
                <Route path="/blog/:id" element={<BlogDetailPage />} />
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