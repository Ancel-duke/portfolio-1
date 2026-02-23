import React from 'react'
import Link from 'next/link'
import { Button } from '../ui/button'
import { MessageCircle } from 'lucide-react'

type CTAVariant = 'need-built' | 'architect' | 'consultation'

const COPY: Record<CTAVariant, { heading: string; body: string; button: string }> = {
  'need-built': {
    heading: 'Need this built?',
    body: 'If you have a similar challenge—real-time sync, collaboration, or scalable backends—I can help design and build it. No pitch, just a short conversation to see if we’re a fit.',
    button: 'Start a conversation',
  },
  architect: {
    heading: "Let's architect this together.",
    body: 'System design and implementation from problem to production. I work with teams in Nairobi and remotely across Africa.',
    button: 'Discuss your project',
  },
  consultation: {
    heading: 'Book a consultation.',
    body: 'One-off architecture review or a longer engagement. Clear scope and outcomes from the first call.',
    button: 'Get in touch',
  },
}

interface BlogCTAProps {
  variant: CTAVariant
  className?: string
}

export function BlogCTA({ variant, className = '' }: BlogCTAProps) {
  const { heading, body, button } = COPY[variant]
  return (
    <aside
      className={`rounded-lg border border-primary/20 bg-primary/5 p-4 sm:p-6 ${className}`}
      aria-label="Contact"
    >
      <h3 className="text-lg font-semibold mb-2">{heading}</h3>
      <p className="text-muted-foreground text-sm mb-4">{body}</p>
      <Button variant="default" size="sm" className="min-h-[44px]" asChild>
        <Link href="/contact">
          <MessageCircle className="mr-2 h-4 w-4" />
          {button}
        </Link>
      </Button>
    </aside>
  )
}
