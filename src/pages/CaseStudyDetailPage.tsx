import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import caseStudiesData from '../data/case-studies.json'
import { Card, CardContent, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { ArrowLeft, ExternalLink, Github, Calendar, User, Zap, Lightbulb, CheckCircle, Code } from 'lucide-react'
import SEOHead from '../components/seo/SEOHead'
import { SkipLink } from '../components/ui/skip-link'
import { Breadcrumb } from '../components/ui/breadcrumb'
import { generateCaseStudySchema } from '../components/seo/schemas'

interface Technology {
  name: string
  category: string
  icon: string
}

interface Metric {
  label: string
  value: string
  description: string
}

interface Images {
  hero?: string
  before?: string
  after?: string
  gallery?: string[]
}

interface Testimonial {
  text: string
  author: string
  role: string
  company: string
}

interface CaseStudy {
  id: number
  slug: string
  title: string
  subtitle: string
  role: string
  timeline: string
  year: string
  status: string
  description: string
  problem: string
  solution: string
  impact: string
  technologies: Technology[]
  features: string[]
  challenges: string[]
  outcomes: string[]
  metrics: Metric[]
  links: { live?: string; github?: string }
  images: Images
  testimonial?: Testimonial
}

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const caseStudy = (caseStudiesData as CaseStudy[]).find((cs: CaseStudy) => cs.slug === slug)

  if (!caseStudy) {
    return (
      <>
        <SEOHead
          title="404 - Case Study Not Found"
          description="The case study you are looking for does not exist or has been moved. Return to case studies to explore other projects."
          canonical="/case-studies/404"
          noindex={true}
        />
        <SkipLink />
        <div className="min-h-[60vh] flex items-center justify-center py-16">
          <Card className="w-full max-w-2xl text-center p-8">
            <CardTitle className="text-4xl font-bold mb-4">404 - Case Study Not Found</CardTitle>
            <CardContent>
              <p className="text-lg text-muted-foreground mb-6">
                The case study you are looking for does not exist or has been moved.
              </p>
              <Button asChild>
                <Link to="/case-studies">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Case Studies
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <>
      <SEOHead
        title={caseStudy.title}
        description={caseStudy.subtitle}
        canonical={`/case-studies/${caseStudy.slug}`}
        ogImage={caseStudy.images.hero}
        ogType="article"
        keywords={caseStudy.technologies.map(tech => tech.name)}
        publishedTime={caseStudy.year}
        jsonLd={generateCaseStudySchema(caseStudy)}
      />
      <SkipLink />
      <motion.div
        className="py-16 container-custom"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Breadcrumb 
          items={[
            { name: 'Home', url: '/' },
            { name: 'Case Studies', url: '/case-studies' },
            { name: caseStudy.title, url: `/case-studies/${caseStudy.slug}`, current: true }
          ]}
          className="mb-8"
        />

        <motion.div variants={itemVariants} className="mb-8">
          <Button variant="outline" asChild>
            <Link to="/case-studies">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
            </Link>
          </Button>
        </motion.div>

      <Card className="p-6 md:p-10">
        <motion.div variants={itemVariants} className="mb-8">
          {caseStudy.images.hero && (
            <img
              src={caseStudy.images.hero}
              alt={`${caseStudy.title} Hero`}
              className="w-full h-64 md:h-96 object-cover rounded-lg mb-6"
            />
          )}
          <CardTitle className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {caseStudy.title}
          </CardTitle>
          <p className="text-xl text-muted-foreground mb-6">{caseStudy.subtitle}</p>

          <div className="flex flex-wrap gap-3 mb-6">
            <Badge variant="secondary" className="flex items-center">
              <User className="h-3 w-3 mr-1" /> {caseStudy.role}
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <Calendar className="h-3 w-3 mr-1" /> {caseStudy.timeline} ({caseStudy.year})
            </Badge>
            <Badge variant="secondary" className="flex items-center">
              <Zap className="h-3 w-3 mr-1" /> {caseStudy.status}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2 mb-6">
            {caseStudy.technologies.map((tech, index) => (
              <Badge key={index} variant="outline">
                {tech.name}
              </Badge>
            ))}
          </div>

          <p className="text-lg leading-relaxed mb-8">{caseStudy.description}</p>

          <div className="flex flex-wrap gap-4">
            {caseStudy.links.live && (
              <Button asChild>
                <a href={caseStudy.links.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </a>
              </Button>
            )}
            {caseStudy.links.github && (
              <Button variant="outline" asChild>
                <a href={caseStudy.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub Repo
                </a>
              </Button>
            )}
          </div>
        </motion.div>

        {/* Problem Section */}
        <motion.div variants={itemVariants} className="mb-10">
          <h2 className="text-3xl font-bold mb-4 flex items-center">
            <Lightbulb className="h-6 w-6 mr-2 text-primary" /> The Problem
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">{caseStudy.problem}</p>
        </motion.div>

        {/* Solution Section */}
        <motion.div variants={itemVariants} className="mb-10">
          <h2 className="text-3xl font-bold mb-4 flex items-center">
            <Code className="h-6 w-6 mr-2 text-primary" /> The Solution
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground">{caseStudy.solution}</p>
        </motion.div>

        {/* Impact Section */}
        <motion.div variants={itemVariants} className="mb-10">
          <h2 className="text-3xl font-bold mb-4 flex items-center">
            <CheckCircle className="h-6 w-6 mr-2 text-primary" /> The Impact
          </h2>
          <p className="text-lg leading-relaxed text-muted-foreground mb-6">{caseStudy.impact}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {caseStudy.metrics.map((metric, index) => (
              <Card key={index} className="p-4">
                <CardTitle className="text-2xl font-bold text-primary">{metric.value}</CardTitle>
                <CardContent className="p-0 text-muted-foreground">{metric.description}</CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Gallery (if images exist) */}
        {caseStudy.images.gallery && caseStudy.images.gallery.length > 0 && (
          <motion.div variants={itemVariants} className="mb-10">
            <h2 className="text-3xl font-bold mb-4">Project Gallery</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {caseStudy.images.gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${caseStudy.title} Gallery ${index + 1}`}
                  className="w-full h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <motion.div variants={itemVariants} className="mt-10">
            <Card className="p-6 bg-muted/50">
              <blockquote className="text-lg italic mb-4">
                "{caseStudy.testimonial.text}"
              </blockquote>
              <div className="flex items-center">
                <div>
                  <p className="font-semibold">{caseStudy.testimonial.author}</p>
                  <p className="text-sm text-muted-foreground">
                    {caseStudy.testimonial.role}, {caseStudy.testimonial.company}
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}
      </Card>
      </motion.div>
    </>
  )
}
