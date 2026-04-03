import React, { useState } from 'react'
import Link from 'next/link'
import { X, FileText, MessageSquare, Phone } from 'lucide-react'
import { cn } from '@/shared/utils'

export function Banner() {
  const [dismissed, setDismissed] = useState(false)

  if (dismissed) return null

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50",
        "bg-background/95 backdrop-blur-sm border-t border-border/60",
        "shadow-[0_-4px_24px_rgba(0,0,0,0.08)]",
      )}
      role="status"
      aria-label="Availability notice"
    >
      <div className="container-custom mx-auto px-4 py-2.5 max-w-full">
        <div className="flex items-center justify-between gap-3 flex-wrap sm:flex-nowrap">
          {/* Status */}
          <p className="font-medium text-xs sm:text-sm tracking-wide text-foreground flex items-center gap-2 shrink-0">
            <span className="inline-block animate-pulse rounded-full bg-emerald-400 h-2 w-2 shrink-0" />
            Available for senior fullstack &amp; systems engineering roles
          </p>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            <a
              href="/assets/Resume%20(1).pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-muted h-7 px-2.5 border border-border/60 text-foreground"
            >
              <FileText className="mr-1.5 h-3 w-3" />
              Resume
            </a>
            <Link
              href="/contact"
              className="inline-flex items-center justify-center rounded-md text-xs font-medium transition-colors hover:bg-muted h-7 px-2.5 border border-border/60 text-foreground"
            >
              <MessageSquare className="mr-1.5 h-3 w-3" />
              Contact
            </Link>
            <a
              href="https://calendly.com/ajanga-ancel/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-md text-xs font-bold transition-colors bg-primary text-primary-foreground hover:bg-primary/90 h-7 px-3"
            >
              <Phone className="mr-1.5 h-3 w-3" />
              Book a Call
            </a>

            {/* Dismiss */}
            <button
              onClick={() => setDismissed(true)}
              aria-label="Dismiss availability banner"
              className="flex items-center justify-center w-6 h-6 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted transition-colors ml-1"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
