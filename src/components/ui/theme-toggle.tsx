import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "../../contexts/ThemeContext"
import { Button } from "./button"
import { cn } from "../../lib/utils"

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme, resolvedTheme } = useTheme()

  const cycleTheme = () => {
    if (theme === 'light') setTheme('dark')
    else if (theme === 'dark') setTheme('system')
    else setTheme('light')
  }

  const getIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem] transition-transform duration-200" aria-hidden="true" />
      case 'dark':
        return <Moon className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem] transition-transform duration-200" aria-hidden="true" />
      case 'system':
        return <Monitor className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem] transition-transform duration-200" aria-hidden="true" />
      default:
        return <Sun className="h-4 w-4 sm:h-[1.125rem] sm:w-[1.125rem]" aria-hidden="true" />
    }
  }

  const getCycleLabel = () => {
    switch (theme) {
      case 'light':
        return 'Switch to dark mode (cycle)'
      case 'dark':
        return 'Switch to system preference (cycle)'
      case 'system':
        return 'Switch to light mode (cycle)'
      default:
        return 'Cycle theme'
    }
  }

  return (
    <div className={cn("flex items-center gap-0.5", className)} role="group" aria-label="Theme preference">
      <Button
        variant="ghost"
        size="icon"
        onClick={cycleTheme}
        aria-label={getCycleLabel()}
        className="h-9 w-9 sm:h-10 sm:w-10 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background transition-colors duration-200"
        title={getCycleLabel()}
      >
        {getIcon()}
        <span className="sr-only">{getCycleLabel()}</span>
      </Button>
      <span
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        Current mode: {resolvedTheme === 'dark' ? 'dark' : 'light'}
        {theme === 'system' && ' (following system)'}
      </span>
    </div>
  )
}
