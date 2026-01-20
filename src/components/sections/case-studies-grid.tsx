import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { cn } from "../../lib/utils"
import { ExternalLink, Github, Calendar, Clock, ArrowRight } from "lucide-react"
import caseStudiesData from "../../data/case-studies.json"
import { getDailySelection, getMasterSortedProjects } from "../../utils/projectSorter"

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
  technologies: Array<{
    name: string
    category: string
    icon: string
  }>
  links: {
    live: string
    github: string
  }
  images: {
    hero: string
    before: string
    after: string
    gallery: string[]
  }
}

interface CaseStudiesGridProps {
  className?: string
  limit?: number
  showViewAll?: boolean
}

export const CaseStudiesGrid = React.memo(function CaseStudiesGrid({ className, limit, showViewAll = true }: CaseStudiesGridProps) {
  const caseStudies = caseStudiesData
  
  // Map case studies to project-like format for sorting
  // Determine type from role field
  const caseStudiesWithType = (caseStudies as CaseStudy[]).map(cs => ({
    ...cs,
    type: (cs.role || '').toLowerCase().includes('full') ? 'fullstack' : 'frontend'
  }))
  
  // Use useMemo to prevent flicker on reload - seeded shuffle remains stable for the day
  const selectedCaseStudies = React.useMemo(() => {
    // If no limit, show all case studies sorted by master sort
    if (!limit) {
      return getMasterSortedProjects(caseStudiesWithType) as CaseStudy[]
    }
    
    // If limit is provided, use daily selection to pick 4 projects
    return getDailySelection(caseStudiesWithType, 4) as CaseStudy[]
  }, [limit, caseStudiesWithType])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  return (
    <section className={cn("py-16", className)}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(1.875rem,4vw,2.5rem)] font-bold mb-[clamp(1rem,2.5vw,1.5rem)]">
            {limit ? "Featured" : "All"} <span className="text-gradient">Case Studies</span>
          </h2>
          <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground max-w-2xl mx-auto">
            Deep dives into my most challenging and rewarding projects, showcasing the process, challenges, and outcomes.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,3vw,2rem)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {selectedCaseStudies.map((caseStudy: CaseStudy, index: number) => (
            <motion.article
              key={caseStudy.id}
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
                <div className="relative overflow-hidden">
                  <img
                    src={caseStudy.images.hero}
                    alt={caseStudy.title}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    fetchPriority={index < 2 ? "high" : "low"}
                    width="800"
                    height="384"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {caseStudy.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {caseStudy.title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {caseStudy.subtitle}
                    </p>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{caseStudy.year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{caseStudy.timeline}</span>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-3">
                    {caseStudy.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {caseStudy.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech.name} variant="outline" className="text-xs">
                          {tech.name}
                        </Badge>
                      ))}
                      {caseStudy.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{caseStudy.technologies.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {caseStudy.links.live && (
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <a href={caseStudy.links.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {caseStudy.links.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <a href={caseStudy.links.github} target="_blank" rel="noopener noreferrer">
                          <Github className="h-4 w-4 mr-2" />
                          Code
                        </a>
                      </Button>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full mt-3 group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <a href={`/case-studies/${caseStudy.slug}`}>
                      Read Case Study
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>

        {showViewAll && limit && selectedCaseStudies.length >= limit && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <a href="/case-studies">
                View All Case Studies
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
})
