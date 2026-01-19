import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { cn } from "../../lib/utils"
import { ExternalLink, Github, Calendar, Clock, ArrowRight } from "lucide-react"
import caseStudiesData from "../../data/case-studies.json"

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

  // If no limit is provided, show all case studies (for full case studies page)
  if (!limit) {
    const displayCaseStudies = caseStudies as CaseStudy[]
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              All <span className="text-gradient">Case Studies</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Deep dives into my most challenging and rewarding projects, showcasing the process, challenges, and outcomes.
            </p>
          </div>

          <motion.div
            className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {displayCaseStudies.map((caseStudy: CaseStudy) => (
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
                      loading="lazy"
                      decoding="async"
                      fetchPriority="low"
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
        </div>
      </section>
    )
  }

  // Select only 4 items: 2 Full-Stack and 2 Frontend based on the role field
  // Ensure EduChain and TaskForge are always featured
  const educhain = caseStudies.find((cs: any) => cs.slug === 'educhain')
  const taskforge = caseStudies.find((cs: any) => cs.slug === 'taskforge')
  
  // Get other Full-Stack projects (excluding EduChain and TaskForge)
  const otherFullstack = caseStudies
    .filter((cs: any) => 
      (cs.role || '').toLowerCase().includes('full') && 
      cs.slug !== 'educhain' && 
      cs.slug !== 'taskforge'
    )
  
  // Prioritize EduChain and TaskForge for Full-Stack picks
  const fullstackPicks = [
    ...(educhain ? [educhain] : []),
    ...(taskforge ? [taskforge] : []),
    ...otherFullstack
  ].slice(0, 2)
  
  const frontendPicks = caseStudies
    .filter((cs: any) => (cs.role || '').toLowerCase().includes('front'))
    .slice(0, 2)
  
  // Ensure Banking System appears if present (but don't replace EduChain or TaskForge)
  const banking = caseStudies.find((cs: any) => cs.slug === 'banking-system')
  let selectedCaseStudies = [...fullstackPicks, ...frontendPicks]
  
  // If banking exists and isn't in the list, and we have space, add it
  if (banking && !selectedCaseStudies.find(cs => cs.slug === 'banking-system') && selectedCaseStudies.length < 4) {
    selectedCaseStudies.push(banking)
  } else if (banking && !selectedCaseStudies.find(cs => cs.slug === 'banking-system')) {
    // Replace a non-priority Full-Stack item if banking needs to be featured
    const replaceableIndex = selectedCaseStudies.findIndex((cs: any) => 
      (cs.role || '').toLowerCase().includes('full') && 
      cs.slug !== 'educhain' && 
      cs.slug !== 'taskforge'
    )
    if (replaceableIndex !== -1) {
      selectedCaseStudies[replaceableIndex] = banking
    }
  }
  
  // Final check: Ensure EduChain is always in the featured list
  if (educhain && !selectedCaseStudies.find(cs => cs.slug === 'educhain')) {
    // Replace the first Full-Stack item that's not TaskForge
    const replaceableIndex = selectedCaseStudies.findIndex((cs: any) => 
      (cs.role || '').toLowerCase().includes('full') && cs.slug !== 'taskforge'
    )
    if (replaceableIndex !== -1) {
      selectedCaseStudies[replaceableIndex] = educhain
    } else {
      // If no replaceable Full-Stack found, replace first item
      selectedCaseStudies[0] = educhain
    }
  }

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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured <span className="text-gradient">Case Studies</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Deep dives into my most challenging and rewarding projects, showcasing the process, challenges, and outcomes.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {(limit ? (selectedCaseStudies as CaseStudy[]).slice(0, limit) : selectedCaseStudies as CaseStudy[]).map((caseStudy: CaseStudy) => (
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
                    loading="lazy"
                    decoding="async"
                    fetchPriority="low"
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

        {showViewAll && limit && selectedCaseStudies.length > limit && (
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

