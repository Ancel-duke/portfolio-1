import dynamic from 'next/dynamic'
import SEO from '@/components/seo/SEO'
import caseStudiesData from '@/data/case-studies.json'
import { generateCaseStudySchema } from '@/components/seo/schemas'

const CaseStudiesGrid = dynamic(
  () => import('@/components/sections/case-studies-grid').then((m) => m.CaseStudiesGrid),
  { ssr: false }
)

const caseStudies = (caseStudiesData as Array<{ slug: string; title: string; description: string }>).slice(0, 5)
const jsonLd = caseStudies.map((cs) => generateCaseStudySchema(cs))

export default function CaseStudiesPage() {
  return (
    <>
      <SEO
        title="Case Studies — NestFi, SignFlow, OpsFlow, Aegis, LedgerX | Ancel Ajanga"
        description="Case studies by Ancel Ajanga: Fullstack Software Engineer Narok & Nairobi, Kenya. Deep dives into NestFi, SignFlow, OpsFlow, Aegis, LedgerX, EduChain, EduManage. Security, AIOps, full-stack developer East Africa."
        canonicalUrl="https://ancel.co.ke/case-studies"
        keywords={['Case studies', 'NestFi', 'SignFlow', 'OpsFlow', 'Aegis', 'LedgerX', 'EduChain', 'Narok software engineer', 'Nairobi software architect', 'Full-stack Kenya']}
        jsonLd={jsonLd}
      />
      <CaseStudiesGrid
        showHeader={true}
        showViewAll={false}
        limit={undefined}
      />
    </>
  )
}
