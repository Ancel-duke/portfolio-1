import React, { Suspense, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import SEO from '@/domains/seo'
import { SkipLink } from '@/shared/components/ui/skip-link'
import { Hero } from '@/domains/hero'
import {
  generateWebsiteSchema,
  generatePortfolioSchema,
  generateOrganizationSchema,
  generateSoftwareDeveloperSchema,
  generateSpeakableWebPageSchema,
  getKnowsAboutAsThings,
  generateSoftwareSourceCodeSchema,
} from '@/domains/seo/schemas'

const About = dynamic(
  () => import('@/domains/about').then((m) => m.About),
  { ssr: false }
)
const TodaysHighlights = dynamic(
  () => import('@/domains/todays-highlights').then((m) => m.TodaysHighlights),
  { ssr: false }
)
const CaseStudiesGrid = dynamic(
  () => import('@/domains/case-studies').then((m) => m.CaseStudiesGrid),
  { ssr: false }
)
const LabsExperiments = dynamic(
  () => import('@/domains/labs').then((m) => m.LabsExperiments),
  { ssr: false }
)
const TechStack = dynamic(
  () => import('@/domains/tech-stack').then((m) => m.TechStack),
  { ssr: false }
)
const Fun = dynamic(
  () => import('@/domains/fun').then((m) => m.Fun),
  { ssr: false }
)
const CTA = dynamic(
  () => import('@/domains/contact').then((m) => m.CTA),
  { ssr: false }
)

const BelowFoldPlaceholder = () => <div className="min-h-[1px]" aria-hidden="true" />

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
        description="Ancel Ajanga: Fullstack Software Engineer and Architect in Narok and Nairobi, Kenya. Full-stack developer East Africa. Security & AIOps. Projects: NestFi, SignFlow, OpsFlow, Aegis, LedgerX, EduChain, EduManage, TaskForge. Resilient systems from UI to database."
        canonicalUrl="https://ancel.co.ke/"
        jsonLd={jsonLd}
        keywords={['Narok software engineer', 'Nairobi software architect', 'Full-stack developer Kenya', 'East Africa', 'Security AIOps', 'NestFi', 'SignFlow', 'OpsFlow', 'Aegis', 'LedgerX', 'EduChain', 'EduManage', 'TaskForge']}
      />
      <SkipLink />
      <div className="min-h-screen">
        <Hero />
        <Suspense fallback={<BelowFoldPlaceholder />}>
          <About />
          <TodaysHighlights />
          <CaseStudiesGrid limit={3} showViewAll={true} />
          <LabsExperiments limit={3} showViewAll={true} />
          <TechStack />
          <Fun />
          <CTA />
        </Suspense>
      </div>
    </>
  )
}
