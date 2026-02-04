import * as React from "react"
import { useLocalStorageToggle } from "../hooks/useLocalStorageToggle"
import { LAB_DEFAULTS, LAB_STORAGE_KEYS } from "../data/lab-toggles"

interface AnimationsContextValue {
  animationsEnabled: boolean
}

const AnimationsContext = React.createContext<AnimationsContextValue | undefined>(undefined)

export function useAnimationsEnabled(): boolean {
  const ctx = React.useContext(AnimationsContext)
  if (ctx === undefined) return false
  return ctx.animationsEnabled
}

interface AnimationsProviderProps {
  children: React.ReactNode
}

export function AnimationsProvider({ children }: AnimationsProviderProps) {
  const [animationsEnabled] = useLocalStorageToggle(LAB_STORAGE_KEYS.animations, LAB_DEFAULTS.animations)

  const value = React.useMemo(
    () => ({ animationsEnabled }),
    [animationsEnabled]
  )

  return (
    <AnimationsContext.Provider value={value}>
      {children}
    </AnimationsContext.Provider>
  )
}
