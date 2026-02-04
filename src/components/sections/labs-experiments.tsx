import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Badge } from "../../components/ui/badge"
import { Switch } from "../../components/ui/switch"
import { NowPlaying } from "../../components/ui/now-playing"
import { useBackgroundAudioState } from "../../contexts/BackgroundAudioContext"
import { getSectionVariants } from "../../lib/animation-variants"
import { useLocalStorageToggle } from "../../hooks/useLocalStorageToggle"
import { LAB_DEFAULTS, LAB_DESCRIPTIONS, LAB_STORAGE_KEYS } from "../../data/lab-toggles"
import { cn } from "../../lib/utils"
import { ExternalLink, Github, Calendar, Clock, ArrowRight, FlaskConical, Music, Lightbulb, Rocket, Map, TestTube, Briefcase, Layers, Code2, Palette, Globe, Server, GitBranch } from "lucide-react"
import caseStudiesData from "../../data/case-studies.json"
import funData from "../../data/fun.json"
import Link from "next/link"
import { OptimizedImage } from "../../components/ui/optimized-image"

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
    live?: string
    github?: string
  }
  images: {
    hero: string
    before: string
    after: string
    gallery: string[]
  }
}

interface LabsExperimentsProps {
  className?: string
  limit?: number
  showViewAll?: boolean
  fullPage?: boolean
}

interface FunFact {
  id: number
  title: string
  description: string
  icon: string
  category: string
}

interface FavoriteTool {
  name: string
  description: string
  icon: string
  category: string
  color: string
}

const iconMap = {
  Rocket,
  Map,
  TestTube,
  Briefcase,
  Users: Layers,
  Layers,
  Code2,
  Palette,
  Globe,
  Server,
  GitBranch
}

export function LabsExperiments({ className, limit, showViewAll = true, fullPage = false }: LabsExperimentsProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0)
  const [animationsEnabled, setAnimationsEnabled] = useLocalStorageToggle(LAB_STORAGE_KEYS.animations, LAB_DEFAULTS.animations)
  const [parallaxEnabled, setParallaxEnabled] = useLocalStorageToggle(LAB_STORAGE_KEYS.parallax, LAB_DEFAULTS.parallax)
  const [customCursorEnabled, setCustomCursorEnabled] = useLocalStorageToggle(LAB_STORAGE_KEYS.customCursor, LAB_DEFAULTS.customCursor)
  const [nowPlayingEnabled, setNowPlayingEnabled] = useLocalStorageToggle(LAB_STORAGE_KEYS.nowPlaying, LAB_DEFAULTS.nowPlaying)
  const { isPlaying, setPlaying, playFailed, clearPlayFailed } = useBackgroundAudioState()

  const currentTrackFromData = funData.nowPlaying[currentTrackIndex]
  const currentTrack = React.useMemo(
    () => ({ ...currentTrackFromData, isPlaying }),
    [currentTrackFromData, isPlaying]
  )

  const labEntries: Array<{ key: keyof typeof LAB_STORAGE_KEYS; enabled: boolean; setEnabled: (v: boolean) => void; description: string }> = React.useMemo(
    () => [
      { key: "customCursor", enabled: customCursorEnabled, setEnabled: setCustomCursorEnabled, description: LAB_DESCRIPTIONS.customCursor },
      { key: "parallax", enabled: parallaxEnabled, setEnabled: setParallaxEnabled, description: LAB_DESCRIPTIONS.parallax },
      { key: "nowPlaying", enabled: nowPlayingEnabled, setEnabled: setNowPlayingEnabled, description: LAB_DESCRIPTIONS.nowPlaying },
      { key: "animations", enabled: animationsEnabled, setEnabled: setAnimationsEnabled, description: LAB_DESCRIPTIONS.animations },
    ],
    [animationsEnabled, parallaxEnabled, customCursorEnabled, nowPlayingEnabled, setAnimationsEnabled, setParallaxEnabled, setCustomCursorEnabled, setNowPlayingEnabled]
  )

  React.useEffect(() => {
    const root = document.documentElement
    if (customCursorEnabled) root.classList.add("labs-custom-cursor")
    else root.classList.remove("labs-custom-cursor")
    if (parallaxEnabled) root.classList.add("labs-parallax")
    else root.classList.remove("labs-parallax")
    if (animationsEnabled) root.classList.add("labs-animations")
    else root.classList.remove("labs-animations")
  }, [customCursorEnabled, parallaxEnabled, animationsEnabled])

  const handlePlayPause = React.useCallback(() => {
    setPlaying((prev) => !prev)
    clearPlayFailed()
  }, [setPlaying, clearPlayFailed])

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % funData.nowPlaying.length)
  }

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + funData.nowPlaying.length) % funData.nowPlaying.length)
  }

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Code2
    return <IconComponent className="h-5 w-5" />
  }
  // Filter for frontend/experimental projects (role contains "Frontend" or specific project types)
  const labsProjects = React.useMemo(() => {
    const allCaseStudies = caseStudiesData as CaseStudy[]
    return allCaseStudies.filter(cs => {
      const role = (cs.role || '').toLowerCase()
      const title = (cs.title || '').toLowerCase()
      // Include frontend projects and creative experiments
      return role.includes('frontend') || 
             title.includes('tracker') || 
             title.includes('timer') || 
             title.includes('travelogue') ||
             title.includes('scheduler') ||
             title.includes('academy')
    })
  }, [])

  const displayedProjects = limit ? labsProjects.slice(0, limit) : labsProjects
  const { containerVariants, itemVariants } = React.useMemo(
    () => getSectionVariants(animationsEnabled),
    [animationsEnabled]
  )

  if (displayedProjects.length === 0) {
    return null
  }

  return (
    <section className={cn("py-16 bg-muted/30 w-full overflow-x-hidden", className)}>
      <div className="container-custom max-w-full">
        <div className="text-center mb-12 px-4 sm:px-0">
          <h2 className="text-[clamp(1.875rem,4vw,2.5rem)] font-bold mb-[clamp(1rem,2.5vw,1.5rem)] flex items-center justify-center gap-3">
            <FlaskConical className="h-8 w-8 text-primary" />
            <span>
              Labs & <span className="text-gradient">Experiments</span>
            </span>
          </h2>
          <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground max-w-2xl mx-auto">
            I explore modern UI patterns and creative interactions to complement my system design work. 
            These experiments showcase frontend innovation, user experience design, and creative problem-solving.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-[clamp(1rem,3vw,2rem)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {displayedProjects.map((project: CaseStudy, index: number) => (
            <motion.article
              key={project.id}
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
                <div className="relative overflow-hidden h-40 sm:h-48">
                  <OptimizedImage
                    src={project.images.hero}
                    alt={project.title}
                    width={800}
                    height={384}
                    priority={false}
                    loading="lazy"
                    skipNetlifyCDN
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4">
                    <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                      <FlaskConical className="h-3 w-3 mr-1" />
                      Experiment
                    </Badge>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-white font-semibold text-lg mb-1">
                      {project.title}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {project.subtitle}
                    </p>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                    <div className="flex items-center space-x-1">
                      <Calendar className="h-4 w-4" />
                      <span>{project.year}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{project.timeline}</span>
                    </div>
                  </div>
                  <CardDescription className="line-clamp-3">
                    {project.description}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="mb-4">
                    <h4 className="text-sm font-medium mb-2">Technologies Used</h4>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <Badge key={tech.name} variant="outline" className="text-xs">
                          {tech.name}
                        </Badge>
                      ))}
                      {project.technologies.length > 4 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.technologies.length - 4} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex space-x-2">
                    {project.links.live && (
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <a href={project.links.live} target="_blank" rel="noopener noreferrer">
                          <ExternalLink className="h-4 w-4 mr-2" />
                          Live Demo
                        </a>
                      </Button>
                    )}
                    {project.links.github && (
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1"
                        asChild
                      >
                        <a href={project.links.github} target="_blank" rel="noopener noreferrer">
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
                    <Link href={`/case-studies/${project.slug}`}>
                      View Details
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>

        {showViewAll && limit && displayedProjects.length >= limit && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <Link href="/labs-experiments">
                View All Experiments
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        )}

        {/* Experimental Features Section - Only show on full page */}
        {fullPage && (
          <>
            <div className="mt-16 pt-16 border-t">
              <div className="text-center mb-12">
                <h2 className="text-[clamp(1.875rem,4vw,2.5rem)] font-bold mb-[clamp(1rem,2.5vw,1.5rem)]">
                  Experimental <span className="text-gradient">Features</span>
                </h2>
                <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground max-w-2xl mx-auto">
                  Interactive experiments and creative tools I've built to explore new UI patterns and enhance user experiences.
                </p>
              </div>

              <motion.div
                className="grid grid-cols-1 lg:grid-cols-2 gap-8"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                {/* Now Playing */}
                {nowPlayingEnabled && (
                  <motion.div variants={itemVariants}>
                    <Card className="h-full">
                      <CardHeader>
                        <CardTitle className="flex items-center space-x-2">
                          <Music className="h-5 w-5" />
                          <span>Now Playing</span>
                        </CardTitle>
                        <CardDescription>
                          What I'm listening to while coding
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        {playFailed && (
                          <p className="text-xs text-muted-foreground mb-2">
                            Autoplay was blocked. Click Play to start.
                          </p>
                        )}
                        <NowPlaying
                          track={currentTrack}
                          onPlayPause={handlePlayPause}
                          onNext={handleNext}
                          onPrevious={handlePrevious}
                        />
                      </CardContent>
                    </Card>
                  </motion.div>
                )}

                {/* Fun Facts */}
                <motion.div variants={itemVariants}>
                  <Card className="h-full">
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <Lightbulb className="h-5 w-5" />
                        <span>Fun Facts</span>
                      </CardTitle>
                      <CardDescription>
                        Interesting tidbits about my journey
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {funData.funFacts.map((fact: FunFact) => (
                          <div
                            key={fact.id}
                            className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors"
                          >
                            <div className="p-2 bg-primary/10 rounded-lg flex-shrink-0">
                              {getIcon(fact.icon)}
                            </div>
                            <div>
                              <h4 className="font-medium text-sm mb-1">{fact.title}</h4>
                              <p className="text-xs text-muted-foreground">{fact.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>

              {/* Favorite Tools */}
              <motion.div
                className="mt-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Favorite Tools</CardTitle>
                    <CardDescription>
                      The tools and platforms I use daily to build amazing things
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4">
                      {funData.favoriteTools.map((tool: FavoriteTool) => (
                        <motion.div
                          key={tool.name}
                          variants={itemVariants}
                          className="group"
                        >
                          <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                            <CardContent className="p-4 text-center">
                              <div className="mb-3">
                                <div 
                                  className="w-12 h-12 mx-auto rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform"
                                  style={{ backgroundColor: `${tool.color}20` }}
                                >
                                  {getIcon(tool.icon)}
                                </div>
                              </div>
                              <h3 className="font-medium text-sm mb-1">{tool.name}</h3>
                              <p className="text-xs text-muted-foreground">{tool.description}</p>
                            </CardContent>
                          </Card>
                        </motion.div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Labs Toggles */}
              <motion.div
                className="mt-12"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle>Experimental Toggles</CardTitle>
                    <CardDescription>
                      Enable experimental features and UI enhancements (saved to localStorage)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {labEntries.map(({ key, enabled, setEnabled, description }) => (
                        <div key={key} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg hover:bg-muted/80 transition-colors">
                          <div>
                            <h4 className="font-medium">{description}</h4>
                            <p className="text-sm text-muted-foreground">{description}</p>
                          </div>
                          <Switch
                            checked={enabled}
                            onCheckedChange={(next) => {
                              setEnabled(next)
                              if (key === "nowPlaying") setPlaying(next)
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </>
        )}
      </div>
    </section>
  )
}
