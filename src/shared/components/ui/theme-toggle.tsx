import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "@/contexts/ThemeContext"
import { cn } from '@/shared/utils'

const THEMES = [
  { value: 'light'  as const, icon: Sun,     label: 'Light',  aria: 'Switch to light mode' },
  { value: 'system' as const, icon: Monitor, label: 'System', aria: 'Use system preference' },
  { value: 'dark'   as const, icon: Moon,    label: 'Dark',   aria: 'Switch to dark mode'  },
]

export function ThemeToggle({ className }: { className?: string }) {
  const { theme, setTheme } = useTheme()
  const activeIndex = THEMES.findIndex(t => t.value === theme)

  return (
    <div
      className={cn(
        "relative flex items-center rounded-full p-0.5 border",
        "bg-muted/60 border-border backdrop-blur-sm",
        className
      )}
      role="group"
      aria-label="Theme preference"
    >
      {/* Sliding pill indicator */}
      <div
        className="absolute top-0.5 bottom-0.5 rounded-full bg-background shadow-sm border border-border transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)]"
        style={{
          width: `${100 / THEMES.length}%`,
          left: `calc(${activeIndex * (100 / THEMES.length)}% + 2px)`,
        }}
        aria-hidden="true"
      />

      {THEMES.map(({ value, icon: Icon, label, aria }) => (
        <button
          key={value}
          onClick={() => setTheme(value)}
          aria-label={aria}
          aria-pressed={theme === value}
          title={label}
          className={cn(
            "relative z-10 flex items-center justify-center rounded-full transition-colors duration-200",
            "h-7 w-7",
            "focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1",
            theme === value
              ? "text-foreground"
              : "text-muted-foreground hover:text-foreground"
          )}
        >
          <Icon className="h-3.5 w-3.5 flex-shrink-0" aria-hidden="true" />
        </button>
      ))}

      <span className="sr-only" aria-live="polite" aria-atomic="true">
        Theme: {THEMES.find(t => t.value === theme)?.label ?? theme}
      </span>
    </div>
  )
}
