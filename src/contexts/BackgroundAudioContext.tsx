import * as React from "react"
import { useBackgroundAudio } from "../hooks/useBackgroundAudio"

interface BackgroundAudioContextValue {
  isPlaying: boolean
  setPlaying: React.Dispatch<React.SetStateAction<boolean>>
  playFailed: boolean
  clearPlayFailed: () => void
}

const BackgroundAudioContext = React.createContext<BackgroundAudioContextValue | undefined>(undefined)

export function useBackgroundAudioState() {
  const ctx = React.useContext(BackgroundAudioContext)
  if (ctx === undefined) {
    throw new Error("useBackgroundAudioState must be used within BackgroundAudioProvider")
  }
  return ctx
}

interface BackgroundAudioProviderProps {
  children: React.ReactNode
}

export function BackgroundAudioProvider({ children }: BackgroundAudioProviderProps) {
  const [isPlaying, setPlaying] = React.useState(false)
  const { playFailed, clearPlayFailed } = useBackgroundAudio(isPlaying)

  const value: BackgroundAudioContextValue = React.useMemo(
    () => ({
      isPlaying,
      setPlaying,
      playFailed,
      clearPlayFailed,
    }),
    [isPlaying, playFailed, clearPlayFailed]
  )

  return (
    <BackgroundAudioContext.Provider value={value}>
      {children}
    </BackgroundAudioContext.Provider>
  )
}
