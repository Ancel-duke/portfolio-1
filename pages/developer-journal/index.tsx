import SEO from '@/domains/seo'
import { DeveloperJournal } from '@/domains/blog'
import { generateBreadcrumbSchema } from '@/domains/seo/schemas'

const journalBreadcrumbLd = generateBreadcrumbSchema([
  { name: 'Home', url: '/' },
  { name: 'Developer Journal', url: '/developer-journal' },
])

export default function DeveloperJournalPage() {
  return (
    <>
      <SEO
        title="Developer Journal — Full-Stack Engineer Narok & Nairobi | Ancel Ajanga"
        description="Technical articles and insights from Ancel Ajanga: Software Engineer at Maxson Programming Limited; Narok and Nairobi, Kenya. Architecture, Security, AIOps, React, NestJS, full-stack developer East Africa."
        canonicalUrl="https://ancel.co.ke/developer-journal"
        keywords={['Developer journal', 'Full-stack blog', 'Narok software engineer', 'Nairobi software architect', 'Web development Kenya', 'Architecture', 'AIOps', 'Security']}
        jsonLd={journalBreadcrumbLd}
      />
      <DeveloperJournal />
    </>
  )
}
