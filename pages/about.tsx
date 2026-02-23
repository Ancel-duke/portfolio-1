import dynamic from 'next/dynamic'
import SEO from '@/components/seo/SEO'
import { generateOrganizationSchema } from '@/components/seo/schemas'

const AboutSection = dynamic(
  () => import('@/components/sections/about').then((m) => () => <m.About fullPage />),
  { ssr: false }
)

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Ancel Ajanga — Full-Stack Software Engineer Narok & Nairobi, Kenya"
        description="About Ancel Ajanga: Fullstack Software Engineer and Architect based in Narok and Nairobi, Kenya. Full-stack developer East Africa. Security, AIOps, system resilience. Skills: React, NestJS, Flutter, PostgreSQL. Emerging talent."
        canonicalUrl="https://ancel.co.ke/about"
        keywords={['Narok software engineer', 'Nairobi software architect', 'Full-stack developer Kenya', 'About Ancel Ajanga', 'Software Engineer East Africa']}
        jsonLd={generateOrganizationSchema()}
      />
      <AboutSection />
    </>
  )
}
