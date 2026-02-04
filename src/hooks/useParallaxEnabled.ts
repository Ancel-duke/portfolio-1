import * as React from "react"
import { useLocalStorageToggle } from "./useLocalStorageToggle"
import { LAB_DEFAULTS, LAB_STORAGE_KEYS } from "../data/lab-toggles"

function useIsTouchDevice(): boolean {
  const [isTouch, setIsTouch] = React.useState(true)
  React.useEffect(() => {
    if (typeof window === "undefined") return
    const mq = window.matchMedia("(pointer: coarse)")
    const check = () => setIsTouch(mq.matches)
    check()
    mq.addEventListener("change", check)
    return () => mq.removeEventListener("change", check)
  }, [])
  return isTouch
}

/**
 * True only when labs.parallax is enabled and the device is not touch.
 * SSR-safe: returns false until client hydration.
 */
export function useParallaxEnabled(): boolean {
  const [enabled] = useLocalStorageToggle(LAB_STORAGE_KEYS.parallax, LAB_DEFAULTS.parallax)
  const isTouch = useIsTouchDevice()
  return enabled && !isTouch
}
