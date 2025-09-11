import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { cn } from "../../lib/utils"
import { 
  Laptop, 
  Globe, 
  Code, 
  Briefcase, 
  Server, 
  Rocket,
  ExternalLink
} from "lucide-react"
import timelineData from "../../data/timeline.json"

interface TimelineItem {
  year: string
  title: string
  description: string
  icon: string
  projects: Array<{
    title: string
    url: string
    description: string
  }>
  milestones: string[]
}

interface TimelineProps {
  className?: string
}

const iconMap = {
  Laptop,
  Globe,
  Code,
  Briefcase,
  Server,
  Rocket
}

export function Timeline({ className }: TimelineProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.6
      }
    }
  }

  const rightItemVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
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
            My <span className="text-gradient">Journey</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            From learning HTML and CSS in school to building full-stack applications for clients.
          </p>
        </div>

        <motion.div
          className="relative"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Timeline Line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-accent to-primary opacity-20 hidden lg:block" />

          <div className="space-y-12">
            {timelineData.map((item: TimelineItem, index: number) => {
              const IconComponent = iconMap[item.icon as keyof typeof iconMap] || Code
              const isEven = index % 2 === 0

              return (
                <motion.div
                  key={item.year}
                  className={cn(
                    "relative flex items-center",
                    isEven ? "lg:flex-row" : "lg:flex-row-reverse"
                  )}
                  variants={isEven ? itemVariants : rightItemVariants}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-primary rounded-full border-4 border-background shadow-lg z-10 hidden lg:block" />

                  {/* Content */}
                  <div className={cn(
                    "w-full lg:w-5/12",
                    isEven ? "lg:pr-8" : "lg:pl-8"
                  )}>
                    <Card className="hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                      <CardHeader>
                        <div className="flex items-center space-x-3 mb-2">
                          <div className="p-2 bg-primary/10 rounded-lg">
                            <IconComponent className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <Badge variant="outline" className="mb-1">
                              {item.year}
                            </Badge>
                            <CardTitle className="text-xl">{item.title}</CardTitle>
                          </div>
                        </div>
                        <CardDescription className="text-base">
                          {item.description}
                        </CardDescription>
                      </CardHeader>

                      {item.projects.length > 0 && (
                        <CardContent className="pt-0">
                          <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                            Projects Built
                          </h4>
                          <div className="space-y-2">
                            {item.projects.map((project, projectIndex) => (
                              <div
                                key={projectIndex}
                                className="flex items-center justify-between p-3 bg-muted/50 rounded-lg"
                              >
                                <div className="flex-1">
                                  <h5 className="font-medium text-sm">{project.title}</h5>
                                  <p className="text-xs text-muted-foreground">
                                    {project.description}
                                  </p>
                                </div>
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  asChild
                                  className="ml-2"
                                >
                                  <a
                                    href={project.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`View ${project.title}`}
                                  >
                                    <ExternalLink className="h-4 w-4" />
                                  </a>
                                </Button>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      )}

                      {item.milestones.length > 0 && (
                        <CardContent className="pt-0">
                          <h4 className="text-sm font-medium mb-3 text-muted-foreground">
                            Key Milestones
                          </h4>
                          <ul className="space-y-1">
                            {item.milestones.map((milestone, milestoneIndex) => (
                              <li
                                key={milestoneIndex}
                                className="flex items-start space-x-2 text-sm"
                              >
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                                <span>{milestone}</span>
                              </li>
                            ))}
                          </ul>
                        </CardContent>
                      )}
                    </Card>
                  </div>

                  {/* Spacer for mobile */}
                  <div className="w-full lg:w-2/12" />
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}

