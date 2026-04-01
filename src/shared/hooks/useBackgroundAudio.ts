import { useEffect, useRef, useState, useCallback } from "react"

const AUDIO_SRC = "/audio/keep.mp3"

/**
 * Client-only hook: controls looping background audio with lazy initialization.
 * Audio is created only on the first time `shouldPlay` becomes true (user gesture).
 * SSR-safe: no Audio or window access during server render.
 */
export function useBackgroundAudio(shouldPlay: boolean): {
  playFailed: boolean
  clearPlayFailed: () => void
} {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playFailed, setPlayFailed] = useState(false)

  const clearPlayFailed = useCallback(() => {
    setPlayFailed(false)
  }, [])

  useEffect(() => {
    if (typeof window === "undefined") return

    if (shouldPlay) {
      if (!audioRef.current) {
        audioRef.current = new Audio(AUDIO_SRC)
        audioRef.current.loop = true
      }
      const audio = audioRef.current
      const p = audio.play()
      if (p && typeof p.catch === "function") {
        p.catch(() => {
          setPlayFailed(true)
        })
      }
    } else {
      if (audioRef.current) {
        audioRef.current.pause()
        audioRef.current.currentTime = 0
      }
    }
  }, [shouldPlay])

  return { playFailed, clearPlayFailed }
}
