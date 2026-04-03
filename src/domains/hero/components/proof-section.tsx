import React from 'react'
import { LazyMotion, domAnimation, m } from 'framer-motion'
import { Card } from '@/shared/components/ui/card'

export function ProofSection() {
  return (
    <LazyMotion features={domAnimation}>
      <div className="container-custom mx-auto px-4 w-full -mt-8 relative z-10">
        <m.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <Card className="p-6 md:p-8 surface-raised border-primary/10 bg-background/80 backdrop-blur-md dark:bg-slate-900/50">
            <div className="grid grid-cols-1 divide-y md:divide-y-0 md:divide-x divide-border gap-6 md:gap-0">
              <div className="text-center px-4">
                <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">~97%</h3>
                <p className="text-sm text-muted-foreground mt-2 font-medium uppercase tracking-wider">Uptime Maintained</p>
              </div>
              <div className="text-center px-4 pt-6 md:pt-0">
                <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">100–200ms</h3>
                <p className="text-sm text-muted-foreground mt-2 font-medium uppercase tracking-wider">P95 Latency</p>
              </div>
              <div className="text-center px-4 pt-6 md:pt-0">
                <h3 className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-primary to-accent bg-clip-text text-transparent">200–1000</h3>
                <p className="text-sm text-muted-foreground mt-2 font-medium uppercase tracking-wider">Concurrent Users</p>
              </div>
            </div>
          </Card>
        </m.div>
      </div>
    </LazyMotion>
  )
}
