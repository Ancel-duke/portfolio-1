import * as React from "react"
import { Suspense } from "react"
import { cn } from "../../lib/utils"

interface LazyChartProps {
  children: React.ReactNode
  className?: string
  fallback?: React.ReactNode
}

const ChartFallback = () => (
  <div className="h-80 flex items-center justify-center bg-muted/20 rounded-lg">
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-2" />
      <p className="text-sm text-muted-foreground">Loading chart...</p>
    </div>
  </div>
)

export function LazyChart({ children, className, fallback = <ChartFallback /> }: LazyChartProps) {
  return (
    <div className={cn("w-full", className)}>
      <Suspense fallback={fallback}>
        {children}
      </Suspense>
    </div>
  )
}

