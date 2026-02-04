import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card"
import { Switch } from "../../components/ui/switch"
import { NowPlaying } from "../../components/ui/now-playing"
import { useBackgroundAudioState } from "../../contexts/BackgroundAudioContext"
import { useAnimationsEnabled } from "../../contexts/AnimationsContext"
import { getSectionVariants } from "../../lib/animation-variants"
import { useLocalStorageToggle } from "../../hooks/useLocalStorageToggle"
import { LAB_DEFAULTS, LAB_DESCRIPTIONS, LAB_STORAGE_KEYS } from "../../data/lab-toggles"
import { cn } from "../../lib/utils"
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

  const animationsEnabledFromContext = useAnimationsEnabled()
  const { containerVariants, itemVariants } = getSectionVariants(animationsEnabledFromContext)

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

  return (
    <section className={cn("py-16 w-full overflow-x-hidden", className)}>
      <div className="container-custom max-w-full">
        <div className="text-center mb-8 sm:mb-12 px-4 sm:px-0">
          <h2 className="text-[clamp(1.875rem,4vw,2.5rem)] font-bold mb-3 sm:mb-4">
            Fun <span className="text-gradient">Stuff</span>
          </h2>
          <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground max-w-2xl mx-auto">
            A peek into my personality, interests, and the tools I love to use.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {/* Now Playing (respects Labs toggle) */}
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
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 sm:gap-6">
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
                {labEntries.map(({ key, enabled, setEnabled, description }) => (
                  <div key={key} className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
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
    </section>
  )
}
