import React, { createContext, useContext, useEffect, useState } from 'react'
import { getSystemTheme, loadFromLocalStorage, saveToLocalStorage } from '../lib/utils'

type Theme = 'light' | 'dark' | 'system'

interface ThemeContextType {
  theme: Theme
  setTheme: (theme: Theme) => void
  resolvedTheme: 'light' | 'dark'
  /** Toggle between light and dark only (convenience for manual override). */
  toggleResolved: () => void
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)

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
    setThemeState(saved)
    if (saved === 'system') {
      const system = getSystemTheme()
      setResolvedTheme(system)
    } else {
      setResolvedTheme(saved)
    }
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
