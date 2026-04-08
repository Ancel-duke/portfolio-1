import dynamic from 'next/dynamic'
import SEO from '@/domains/seo'
import { generateOrganizationSchema } from '@/domains/seo/schemas'

const AboutSection = dynamic(
  () => import('@/domains/about').then((m) => () => <m.About fullPage />),
  { ssr: false }
)

export default function AboutPage() {
  return (
    <>
      <SEO
        title="About Ancel Ajanga — Full-Stack Software Engineer Narok & Nairobi, Kenya"
        description="Software Engineer at Maxson Programming Limited. Fullstack engineer specializing in scalable backend systems and high-performance frontend experiences — Narok & Nairobi, Kenya."
        canonicalUrl="https://ancel.co.ke/about"
        keywords={['Narok software engineer', 'Nairobi software architect', 'Fullstack Engineer', 'Frontend Architecture', 'UI Engineering', 'Interactive Systems', 'Performance Optimization', 'Full-stack developer Kenya', 'About Ancel Ajanga', 'Software Engineer East Africa']}
        jsonLd={[generateOrganizationSchema()]}
      />
      <AboutSection />
    </>
  )
}
