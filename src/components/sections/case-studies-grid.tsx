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
  
  // Filter to only show fullstack/enterprise projects (exclude frontend experiments)
  const enterpriseCaseStudies = React.useMemo(() => {
    return caseStudiesWithType.filter(cs => {
      const role = (cs.role || '').toLowerCase()
      // Only include fullstack projects (exclude frontend experiments)
      return role.includes('full') || role.includes('stack')
    })
  }, [caseStudiesWithType])

  // Use useMemo to prevent flicker on reload - seeded shuffle remains stable for the day
  const selectedCaseStudies = React.useMemo(() => {
    // If no limit, show all enterprise case studies sorted by master sort
    if (!limit) {
      return getMasterSortedProjects(enterpriseCaseStudies) as CaseStudy[]
    }
    
    // If limit is provided, use daily selection to pick that many projects
    return getDailySelection(enterpriseCaseStudies, limit) as CaseStudy[]
  }, [limit, enterpriseCaseStudies])

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
    <section className={cn("py-16 w-full overflow-x-hidden", className)}>
      <div className="container-custom max-w-full">
        <div className="text-center mb-12 px-4 sm:px-0">
          <h2 className="text-[clamp(1.875rem,4vw,2.5rem)] font-bold mb-[clamp(1rem,2.5vw,1.5rem)]">
            {limit ? "Featured" : "All"} <span className="text-gradient">Case Studies</span>
          </h2>
          <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground max-w-2xl mx-auto">
            {limit ? "Enterprise-grade systems showcasing resilient architecture, hybrid databases, and scalable solutions." : "Deep dives into my most challenging and rewarding projects, showcasing the process, challenges, and outcomes."}
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-[clamp(1rem,3vw,2rem)] w-full"
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
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm overflow-hidden w-full">
                <div className="relative overflow-hidden w-full">
                  <img
                    src={caseStudy.images.hero}
                    alt={caseStudy.title}
                    className="w-full h-36 sm:h-40 md:h-48 object-cover group-hover:scale-105 transition-transform duration-500"
                    loading={index < 2 ? "eager" : "lazy"}
                    decoding="async"
                    width="800"
                    height="384"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      {caseStudy.status}
                    </Badge>
                  </div>
                  <div className="absolute bottom-3 sm:bottom-4 left-3 sm:left-4 right-3 sm:right-4">
                    <h3 className="text-white font-semibold text-base sm:text-lg mb-1 line-clamp-1">
                      {caseStudy.title}
                    </h3>
                    <p className="text-white/90 text-xs sm:text-sm line-clamp-2">
                      {caseStudy.subtitle}
                    </p>
                  </div>
                </div>

                <CardHeader className="pb-3 px-4 sm:px-6">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{caseStudy.year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4 flex-shrink-0" />
                      <span className="text-xs sm:text-sm">{caseStudy.timeline}</span>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-3 text-sm sm:text-base">
                    {caseStudy.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0 px-4 sm:px-6 pb-4 sm:pb-6">
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

                  <div className="flex flex-col sm:flex-row gap-2 w-full">
                    {caseStudy.links.live && (
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1 min-h-[44px] text-xs sm:text-sm"
                        asChild
                      >
                        <a href={caseStudy.links.live} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                          <span className="truncate">Live Demo</span>
                        </a>
                      </Button>
                    )}
                    {caseStudy.links.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 min-h-[44px] text-xs sm:text-sm"
                        asChild
                      >
                        <a href={caseStudy.links.github} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center">
                          <Github className="h-3 w-3 sm:h-4 sm:w-4 mr-1.5 sm:mr-2 flex-shrink-0" />
                          <span className="truncate">Code</span>
                        </a>
                      </Button>
                    )}
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full mt-3 min-h-[44px] text-xs sm:text-sm group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <a href={`/case-studies/${caseStudy.slug}`} className="flex items-center justify-center">
                      <span>Read Case Study</span>
                      <ArrowRight className="ml-2 h-3 w-3 sm:h-4 sm:w-4 group-hover:translate-x-1 transition-transform flex-shrink-0" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>

        {showViewAll && limit && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <a href="/case-studies">
                {selectedCaseStudies.length >= limit ? "Show All Case Studies" : "View All Case Studies"}
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
})
