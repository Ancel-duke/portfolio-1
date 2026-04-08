import React, { useState, useEffect } from 'react'
import SEO from '@/domains/seo'
import { SITE, WHATSAPP_URL } from '@/shared/constants/site'
import { SkipLink } from '@/shared/components/ui/skip-link'
import { Hero, ProofSection } from '@/domains/hero'
import {
  About,
  RecruiterSection,
  LinkedInInsightsSection,
} from '@/domains/about'
import { TodaysHighlights } from '@/domains/todays-highlights'
import { CaseStudiesGrid } from '@/domains/case-studies'
import { LabsExperiments } from '@/domains/labs'
import { TechStack } from '@/domains/tech-stack'
import { Fun } from '@/domains/fun'
import { CTA, InlineCTA } from '@/domains/contact'
import {
  generateWebsiteSchema,
  generatePortfolioSchema,
  generateOrganizationSchema,
  generateSoftwareDeveloperSchema,
  generateSpeakableWebPageSchema,
  getKnowsAboutAsThings,
  generateSoftwareSourceCodeSchema,
} from '@/domains/seo/schemas'

const initialJsonLd = [
  generateWebsiteSchema(),
  generateOrganizationSchema(),
  generateSoftwareDeveloperSchema(),
  generateSpeakableWebPageSchema(),
]

export default function HomePage() {
  const [jsonLd, setJsonLd] = useState<object[]>(initialJsonLd)

  useEffect(() => {
    const hash = typeof window !== 'undefined' ? window.location.hash : ''
    if (hash) {
      setTimeout(() => {
        const element = document.getElementById(hash.substring(1))
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100)
    }
  }, [])

  useEffect(() => {
    Promise.all([
      import('@/data/projects.json'),
      import('@/data/stack.json'),
      import('@/data/tech-authoritative-sources.json'),
    ]).then(([p, s, t]) => {
      const projectsData = p.default
      const stackData = s.default
      const techAuthoritative = t.default
      const knowsAboutThings = getKnowsAboutAsThings(
        stackData.technologies.map((x: { name: string }) => x.name),
        techAuthoritative.techToAuthoritative
      )
      const softwareSourceCodeSchemas = (projectsData
        .map((proj: { repoUrl?: string; links?: { github?: string } }) =>
          generateSoftwareSourceCodeSchema(proj)
        )
        .filter(Boolean) as object[])
      setJsonLd([
        generateWebsiteSchema(),
        generatePortfolioSchema(projectsData),
        generateOrganizationSchema(),
        generateSoftwareDeveloperSchema(),
        generateSpeakableWebPageSchema(),
        ...softwareSourceCodeSchemas,
      ])
    })
  }, [])

  return (
    <>
      <SEO
        title="Ancel Ajanga"
        description="Ancel Ajanga, Software Engineer at Maxson Programming Limited — fullstack systems in Narok and Nairobi, Kenya. Security & AIOps. Projects: Inkly, NestFi, SignFlow, OpsFlow, Aegis, LedgerX, EduChain, EduManage, TaskForge. Resilient systems from UI to database."
        canonicalUrl="https://ancel.co.ke/"
        ogType="website"
        jsonLd={jsonLd}
        keywords={['Narok software engineer', 'Nairobi software architect', 'Fullstack Engineer', 'Frontend Architecture', 'UI Engineering', 'Interactive Systems', 'Performance Optimization', 'Full-stack developer Kenya', 'East Africa', 'Security AIOps', 'Inkly', 'NestFi', 'SignFlow', 'OpsFlow', 'Aegis', 'LedgerX', 'EduChain', 'EduManage', 'TaskForge']}
      />
      <SkipLink />
      <div className="min-h-screen">
        <Hero />
        <ProofSection />
        <About />
        <RecruiterSection />
        <LinkedInInsightsSection />
        <TodaysHighlights />
        <InlineCTA title="Looking to scale your distributed platforms?" subtitle={SITE.availability.message} buttonText="Start a Project" />
        <CaseStudiesGrid limit={3} showViewAll={true} />
        <LabsExperiments limit={3} showViewAll={true} />
        <InlineCTA
          title="Looking to stabilize a monolithic backend?"
          subtitle={SITE.availability.message}
          buttonText="Chat on WhatsApp"
          buttonHref={WHATSAPP_URL}
          external
        />
        <TechStack />
        <Fun />
        <CTA />
      </div>
    </>
  )
}
