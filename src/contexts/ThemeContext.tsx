import React, { createContext, useContext, useEffect, useState } from 'react'
import { getSystemTheme, loadFromLocalStorage, saveToLocalStorage } from '@/shared/utils'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
  /** Toggle between light and dark only (convenience for manual override). */
  toggleResolved: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

/** Temporarily add .theme-switching to <html> to enable global CSS transitions, then remove it. */
function triggerThemeTransition() {
  const root = document.documentElement
  root.classList.add('theme-switching')
  const timer = window.setTimeout(() => root.classList.remove('theme-switching'), 400)
  return timer
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

interface ThemeProviderProps {
  children: React.ReactNode
}

/** Use fixed initial state so server and first client render match (avoids hydration error). Sync from localStorage/DOM in useEffect. */
export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>('system')
  const [resolvedTheme, setResolvedTheme] = useState<'light' | 'dark'>('light')

  const setTheme = (next: Theme) => {
    triggerThemeTransition()
    setThemeState(next)
    const root = window.document.documentElement
    root.classList.remove('light', 'dark')
    if (next === 'system') {
      const system = getSystemTheme()
      root.classList.add(system)
      setResolvedTheme(system)
    } else {
      root.classList.add(next)
      setResolvedTheme(next)
    }
    saveToLocalStorage('theme', next)
  }

  const toggleResolved = () => {
    const next = resolvedTheme === 'light' ? 'dark' : 'light'
    setTheme(next)
  }

  useEffect(() => {
    const saved = loadFromLocalStorage('theme', 'system') as Theme
    const root = window.document.documentElement
    let resolved: 'light' | 'dark'
    if (saved === 'system') {
      resolved = getSystemTheme()
    } else {
      resolved = saved as 'light' | 'dark'
    }
    setThemeState(saved)
    setResolvedTheme(resolved)
    // Sync class in case the inline script and React state diverge
    root.classList.remove('light', 'dark')
    root.classList.add(resolved)
  }, [])

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = () => {
      if (theme === 'system') {
        const system = getSystemTheme()
        setResolvedTheme(system)
        document.documentElement.classList.remove('light', 'dark')
        document.documentElement.classList.add(system)
      }
    }
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])

  const value: ThemeContextType = {
    theme,
    setTheme,
    resolvedTheme,
    toggleResolved,
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}
