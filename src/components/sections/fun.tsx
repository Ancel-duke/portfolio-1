import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Switch } from "../../components/ui/switch"
import { NowPlaying } from "../../components/ui/now-playing"
import { cn, loadFromLocalStorage, saveToLocalStorage } from "../../lib/utils"
import { 
  Music, 
  Lightbulb, 
  Rocket, 
  Map, 
  TestTube, 
  Briefcase,
  Layers,
  Code2,
  Palette,
  Globe,
  Server,
  GitBranch
} from "lucide-react"
import funData from "../../data/fun.json"

interface FunProps {
  className?: string;
  fullPage?: boolean;
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

interface FunProps {
  className?: string
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

export function Fun({ className }: FunProps) {
  const [currentTrackIndex, setCurrentTrackIndex] = React.useState(0)
  const [isPlaying, setIsPlaying] = React.useState(false)
  const [labs, setLabs] = React.useState(() => 
    loadFromLocalStorage('labs', funData.labs)
  )

  const currentTrack = funData.nowPlaying[currentTrackIndex]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % funData.nowPlaying.length)
  }

  const handlePrevious = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + funData.nowPlaying.length) % funData.nowPlaying.length)
  }

  // Ensure per-feature keys are respected on initial load for Labs
  React.useEffect(() => {
    const featureKeys = ['customCursor', 'parallax', 'nowPlaying', 'animations'] as const
    let merged = { ...labs }
    featureKeys.forEach((key) => {
      try {
        const stored = localStorage.getItem(`labs:${key}`)
        if (stored !== null) {
          const parsed = JSON.parse(stored)
          if (typeof parsed === 'boolean') {
            merged = {
              ...merged,
              [key]: {
                ...merged[key as keyof typeof merged],
                enabled: parsed
              }
            }
          }
        }
      } catch {
        // ignore malformed values for robustness
      }
    })
    // Only update state if something changed
    const changed = featureKeys.some((k) => merged[k].enabled !== labs[k].enabled)
    if (changed) {
      setLabs(merged)
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLabToggle = (labKey: string) => {
    const newLabs = {
      ...labs,
      [labKey]: {
        ...labs[labKey as keyof typeof labs],
        enabled: !labs[labKey as keyof typeof labs].enabled
      }
    }
    setLabs(newLabs)
    saveToLocalStorage('labs', newLabs)
    // Also persist individual feature key immediately
    const enabled = newLabs[labKey as keyof typeof newLabs].enabled
    try {
      localStorage.setItem(`labs:${labKey}`, JSON.stringify(!!enabled))
    } catch {
      // non-fatal
    }
  }

  // Reflect lab flags immediately in the UI (classes that CSS/JS can hook into)
  React.useEffect(() => {
    const root = document.documentElement
    const flagClassMap: Record<string, string> = {
      customCursor: 'labs-custom-cursor',
      parallax: 'labs-parallax',
      animations: 'labs-animations'
    }
    Object.entries(flagClassMap).forEach(([key, className]) => {
      const enabled = (labs as any)[key]?.enabled
      if (enabled) {
        root.classList.add(className)
      } else {
        root.classList.remove(className)
      }
    })
  }, [labs])

  const getIcon = (iconName: string) => {
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Code2
    return <IconComponent className="h-5 w-5" />
  }

  return (
    <section className={cn("py-16", className)}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Fun <span className="text-gradient">Stuff</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A peek into my personality, interests, and the tools I love to use.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Now Playing (respects Labs toggle) */}
          {labs.nowPlaying?.enabled && (
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
                      className="flex items-start space-x-3 p-3 bg-muted/50 rounded-lg"
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
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
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

        {/* Stats */}
        <motion.div
          className="mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card>
            <CardHeader>
              <CardTitle>By the Numbers</CardTitle>
              <CardDescription>
                Some stats about my development journey
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
                {Object.entries(funData.stats).map(([key, value]) => (
                  <motion.div
                    key={key}
                    variants={itemVariants}
                    className="text-center"
                  >
                    <div className="text-3xl font-bold text-primary mb-1">
                      {typeof value === 'number' ? value.toLocaleString() : value}
                    </div>
                    <div className="text-sm text-muted-foreground capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Labs Panel */}
        <motion.div
          className="mt-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Labs</CardTitle>
              <CardDescription>
                Experimental features and toggles (saved to localStorage)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(labs).map(([key, lab]) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div>
                      <h4 className="font-medium">{lab.description}</h4>
                      <p className="text-sm text-muted-foreground">
                        {key === 'customCursor' && 'Custom cursor with particle effects'}
                        {key === 'parallax' && 'Parallax scrolling effects on hero sections'}
                        {key === 'nowPlaying' && 'Now playing music widget'}
                        {key === 'animations' && 'Enhanced animations and transitions'}
                      </p>
                    </div>
                    <Switch
                      checked={lab.enabled}
                      onCheckedChange={() => handleLabToggle(key)}
                    />
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
