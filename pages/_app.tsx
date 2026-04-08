import React from 'react'
import type { AppProps } from 'next/app'
import { Inter } from 'next/font/google'
import { HelmetProvider } from 'react-helmet-async'
import { ThemeProvider } from '@/contexts/ThemeContext'
import { AnimationsProvider } from '@/contexts/AnimationsContext'
import { BackgroundAudioProvider } from '@/contexts/BackgroundAudioContext'
import { CustomCursorGate } from '@/shared/components/ui/custom-cursor-gate'
import { Header, Footer, Banner, GlobalSiteBreadcrumbs } from '@/domains/layout'
import WebVitals from '@/domains/performance'
import '@/index.css'
import '@/styles/blog-content.css'

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter',
})

export default function App({ Component, pageProps }: AppProps) {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AnimationsProvider>
        <BackgroundAudioProvider>
        <div className={`${inter.className} min-h-screen bg-background text-foreground overflow-x-hidden flex flex-col`}>
          <WebVitals />
          <CustomCursorGate />
          <Header />
          <GlobalSiteBreadcrumbs />
          <main id="main-content" role="main" className="pt-12 pb-14 overflow-x-hidden">
            <Component {...pageProps} />
          </main>
          <Footer />
          <Banner />
        </div>
        </BackgroundAudioProvider>
        </AnimationsProvider>
      </ThemeProvider>
    </HelmetProvider>
  )
}
