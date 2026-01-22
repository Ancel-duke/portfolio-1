import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import caseStudiesData from '../data/case-studies.json'
import { Card, CardContent, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { Badge } from '../components/ui/badge'
import { ArrowLeft, ExternalLink, Github, Calendar, User, Zap, Lightbulb, CheckCircle, Code, Layers, Shield, TrendingUp, Rocket, Settings } from 'lucide-react'
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
  architecture?: string
  isolation?: string
  tradeoffs?: string
  implementationStatus?: string
  potentialExpansion?: string
}

export function CaseStudyDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const caseStudy = (caseStudiesData as CaseStudy[]).find((cs: CaseStudy) => cs.slug === slug)

  // Determine if this is a lab/experiment project (frontend project)
  const isLabProject = React.useMemo(() => {
    if (!caseStudy) return false
    const role = (caseStudy.role || '').toLowerCase()
    const title = (caseStudy.title || '').toLowerCase()
    // Include frontend projects and creative experiments
    return role.includes('frontend') || 
           title.includes('tracker') || 
           title.includes('timer') || 
           title.includes('travelogue') ||
           title.includes('scheduler') ||
           title.includes('academy')
  }, [caseStudy])

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

  // Determine breadcrumb and back button based on project type
  const parentSection = isLabProject ? 'Labs & Experiments' : 'Case Studies'
  const parentUrl = isLabProject ? '/labs-experiments' : '/case-studies'
  const backButtonText = isLabProject ? 'Back to Labs & Experiments' : 'Back to Case Studies'

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
        className="py-8 sm:py-12 md:py-16 container-custom max-w-full w-full overflow-x-hidden"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <Breadcrumb 
          items={[
            { name: 'Home', url: '/' },
            { name: parentSection, url: parentUrl },
            { name: caseStudy.title, url: `/case-studies/${caseStudy.slug}`, current: true }
          ]}
          className="mb-4 sm:mb-6 md:mb-8"
        />

        <motion.div variants={itemVariants} className="mb-4 sm:mb-6 md:mb-8">
          <Button variant="outline" size="sm" className="min-h-[44px] text-sm sm:text-base" asChild>
            <Link to={parentUrl}>
              <ArrowLeft className="mr-2 h-4 w-4" /> {backButtonText}
            </Link>
          </Button>
        </motion.div>

      <Card className="p-4 sm:p-6 md:p-8 lg:p-10">
        <motion.div variants={itemVariants} className="mb-8">
          {caseStudy.images.hero && (
            <img
              src={caseStudy.images.hero}
              alt={`${caseStudy.title} Hero`}
              className="w-full h-48 sm:h-64 md:h-80 lg:h-96 object-cover rounded-lg mb-4 sm:mb-6"
            />
          )}
          <CardTitle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
            {caseStudy.title}
          </CardTitle>
          <p className="text-base sm:text-lg md:text-xl text-muted-foreground mb-4 sm:mb-6">{caseStudy.subtitle}</p>

          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
            <Badge variant="secondary" className="flex items-center text-xs sm:text-sm">
              <User className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> 
              <span className="truncate max-w-[150px] sm:max-w-none">{caseStudy.role}</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center text-xs sm:text-sm">
              <Calendar className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> 
              <span className="truncate">{caseStudy.timeline} ({caseStudy.year})</span>
            </Badge>
            <Badge variant="secondary" className="flex items-center text-xs sm:text-sm">
              <Zap className="h-3 w-3 sm:h-4 sm:w-4 mr-1" /> {caseStudy.status}
            </Badge>
          </div>

          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {caseStudy.technologies.map((tech, index) => (
              <Badge key={index} variant="outline" className="text-xs sm:text-sm">
                {tech.name}
              </Badge>
            ))}
          </div>

          <p className="text-sm sm:text-base md:text-lg leading-relaxed mb-6 sm:mb-8">{caseStudy.description}</p>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            {caseStudy.links.live && (
              <Button className="w-full sm:w-auto min-h-[44px] text-sm sm:text-base" asChild>
                <a href={caseStudy.links.live} target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="mr-2 h-4 w-4" /> Live Demo
                </a>
              </Button>
            )}
            {caseStudy.links.github && (
              <Button variant="outline" className="w-full sm:w-auto min-h-[44px] text-sm sm:text-base" asChild>
                <a href={caseStudy.links.github} target="_blank" rel="noopener noreferrer">
                  <Github className="mr-2 h-4 w-4" /> GitHub Repo
                </a>
              </Button>
            )}
          </div>
        </motion.div>

        {/* Problem Section */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 flex items-center">
            <Lightbulb className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary flex-shrink-0" /> 
            <span>The Problem</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">{caseStudy.problem}</p>
        </motion.div>

        {/* Solution Section */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 flex items-center">
            <Code className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary flex-shrink-0" /> 
            <span>The Solution</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground">{caseStudy.solution}</p>
        </motion.div>

        {/* Impact Section */}
        <motion.div variants={itemVariants} className="mb-6 sm:mb-8 md:mb-10">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 flex items-center">
            <CheckCircle className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary flex-shrink-0" /> 
            <span>The Impact</span>
          </h2>
          <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground mb-4 sm:mb-6">{caseStudy.impact}</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
            {caseStudy.metrics.map((metric, index) => (
              <Card key={index} className="p-3 sm:p-4">
                <CardTitle className="text-xl sm:text-2xl font-bold text-primary">{metric.value}</CardTitle>
                <CardContent className="p-0 text-sm sm:text-base text-muted-foreground">{metric.description}</CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Architecture Section */}
        {caseStudy.architecture && (
          <motion.div variants={itemVariants} className="mb-10">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Layers className="h-6 w-6 mr-2 text-primary" /> System Architecture
            </h2>
            <Card className="p-6 bg-muted/30">
              <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{caseStudy.architecture}</p>
            </Card>
          </motion.div>
        )}

        {/* Isolation & Resilience Section */}
        {caseStudy.isolation && (
          <motion.div variants={itemVariants} className="mb-10">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Shield className="h-6 w-6 mr-2 text-primary" /> Isolation & Resilience
            </h2>
            <Card className="p-6 bg-muted/30">
              <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{caseStudy.isolation}</p>
            </Card>
          </motion.div>
        )}

        {/* Trade-offs & Design Decisions Section */}
        {caseStudy.tradeoffs && (
          <motion.div variants={itemVariants} className="mb-10">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <TrendingUp className="h-6 w-6 mr-2 text-primary" /> Trade-offs & Design Decisions
            </h2>
            <Card className="p-6 bg-muted/30">
              <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{caseStudy.tradeoffs}</p>
            </Card>
          </motion.div>
        )}

        {/* Implementation Status Section */}
        {caseStudy.implementationStatus && (
          <motion.div variants={itemVariants} className="mb-10">
            <h2 className="text-3xl font-bold mb-4 flex items-center">
              <Settings className="h-6 w-6 mr-2 text-primary" /> Implementation Status
            </h2>
            <Card className="p-6 bg-muted/30">
              <p className="text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{caseStudy.implementationStatus}</p>
            </Card>
          </motion.div>
        )}

        {/* Potential Expansion Section */}
        {caseStudy.potentialExpansion && (
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4 flex items-center">
              <Rocket className="h-5 w-5 sm:h-6 sm:w-6 mr-2 text-primary flex-shrink-0" /> 
              <span>Potential Expansion</span>
            </h2>
            <Card className="p-4 sm:p-5 md:p-6 bg-muted/30">
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-muted-foreground whitespace-pre-line">{caseStudy.potentialExpansion}</p>
            </Card>
          </motion.div>
        )}

        {/* Gallery (if images exist) */}
        {caseStudy.images.gallery && caseStudy.images.gallery.length > 0 && (
          <motion.div variants={itemVariants} className="mb-6 sm:mb-8 md:mb-10">
            <h2 className="text-xl sm:text-2xl md:text-3xl font-bold mb-3 sm:mb-4">Project Gallery</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {caseStudy.images.gallery.map((img, index) => (
                <img
                  key={index}
                  src={img}
                  alt={`${caseStudy.title} Gallery ${index + 1}`}
                  className="w-full h-40 sm:h-48 object-cover rounded-lg"
                />
              ))}
            </div>
          </motion.div>
        )}

        {/* Testimonial */}
        {caseStudy.testimonial && (
          <motion.div variants={itemVariants} className="mt-6 sm:mt-8 md:mt-10">
            <Card className="p-4 sm:p-5 md:p-6 bg-muted/50">
              <blockquote className="text-sm sm:text-base md:text-lg italic mb-3 sm:mb-4">
                "{caseStudy.testimonial.text}"
              </blockquote>
              <div className="flex items-center">
                <div>
                  <p className="font-semibold text-sm sm:text-base">{caseStudy.testimonial.author}</p>
                  <p className="text-xs sm:text-sm text-muted-foreground">
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
