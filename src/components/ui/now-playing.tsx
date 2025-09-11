import * as React from "react"
import { Play, Pause, SkipForward, SkipBack } from "lucide-react"
import { Button } from "./button"
import { cn } from "../../lib/utils"

interface Track {
  id: number
  title: string
  artist: string
  album: string
  cover: string
  duration: number
  currentTime: number
  isPlaying: boolean
}

interface NowPlayingProps {
  track: Track
  onPlayPause: () => void
  onNext: () => void
  onPrevious: () => void
  className?: string
}

export function NowPlaying({
  track,
  onPlayPause,
  onNext,
  onPrevious,
  className
}: NowPlayingProps) {
  const [currentTime, setCurrentTime] = React.useState(track.currentTime)
  const [isPlaying, setIsPlaying] = React.useState(track.isPlaying)

  React.useEffect(() => {
    setCurrentTime(track.currentTime)
    setIsPlaying(track.isPlaying)
  }, [track])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, '0')}`
  }

  const progressPercentage = (currentTime / track.duration) * 100

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
    onPlayPause()
  }

  return (
    <div className={cn(
      "bg-card border rounded-lg p-4 space-y-3",
      className
    )}>
      <div className="flex items-center space-x-3">
        <div className="relative">
          <img
            src={track.cover}
            alt={`${track.album} cover`}
            className="w-12 h-12 rounded-lg object-cover"
          />
          {isPlaying && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
            </div>
          )}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate">{track.title}</p>
          <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
        </div>
      </div>

      <div className="space-y-2">
        <div className="relative">
          <div className="w-full h-1 bg-muted rounded-full">
            <div
              className="h-1 bg-primary rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(track.duration)}</span>
        </div>
      </div>

      <div className="flex items-center justify-center space-x-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={onPrevious}
          className="h-8 w-8"
          aria-label="Previous track"
        >
          <SkipBack className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={handlePlayPause}
          className="h-10 w-10"
          aria-label={isPlaying ? "Pause" : "Play"}
        >
          {isPlaying ? (
            <Pause className="h-5 w-5" />
          ) : (
            <Play className="h-5 w-5" />
          )}
        </Button>
        <Button
          variant="ghost"
          size="icon"
          onClick={onNext}
          className="h-8 w-8"
          aria-label="Next track"
        >
          <SkipForward className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

