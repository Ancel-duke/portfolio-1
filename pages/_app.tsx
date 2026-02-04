import React from 'react'
import type { AppProps } from 'next/app'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AnimationsProvider } from '@/contexts/AnimationsContext'
import { BackgroundAudioProvider } from '@/contexts/BackgroundAudioContext'
import { CustomCursorGate } from '@/components/ui/custom-cursor-gate'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import WebVitals from '@/components/performance/WebVitals'
import '@/index.css'

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AnimationsProvider>
        <BackgroundAudioProvider>
        <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
          <WebVitals />
          <CustomCursorGate />
          <Header />
          <main id="main-content" role="main" className="pt-14 sm:pt-16 overflow-x-hidden">
            <Component {...pageProps} />
          </main>
          <Footer />
        </div>
        </BackgroundAudioProvider>
        </AnimationsProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
