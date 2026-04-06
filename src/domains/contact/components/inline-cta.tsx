import React from 'react'
import Link from 'next/link'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Button } from '@/shared/components/ui/button'

export function InlineCTA({ 
  title = "Looking for production-grade systems?", 
  subtitle = "Let's build something scalable.",
  buttonText = "Let's Talk",
  buttonHref = '/contact',
  external = false,
}: { 
  title?: string
  subtitle?: string
  buttonText?: string
  buttonHref?: string
  external?: boolean
}) {
  return (
    <LazyMotion features={domAnimation}>
      <m.div 
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-50px" }}
        className="w-full"
      >
        <div className="bg-primary/10 border border-primary/20 rounded-2xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 my-12 mx-4 sm:mx-8">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold mb-2">{title}</h3>
            <p className="text-muted-foreground">{subtitle}</p>
          </div>
          <Button size="lg" asChild className="whitespace-nowrap w-full sm:w-auto min-h-[48px]">
            {external ? (
              <a href={buttonHref} target="_blank" rel="noopener noreferrer">
                {buttonText}
              </a>
            ) : (
              <Link href={buttonHref}>{buttonText}</Link>
            )}
          </Button>
        </div>
      </m.div>
    </LazyMotion>
  )
}
