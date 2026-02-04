import SEO from '@/components/seo/SEO'
import { DeveloperJournal } from '@/pages/DeveloperJournal'

export default function DeveloperJournalPage() {
  return (
    <>
      <SEO
        title="Developer Journal — Full-Stack Engineer Narok & Nairobi | Ancel Ajanga"
        description="Technical articles and insights from Ancel Ajanga: Fullstack Software Engineer and Architect in Narok and Nairobi, Kenya. Web development, architecture, Security, AIOps, React, NestJS, full-stack developer East Africa."
        canonicalUrl="https://ancel.co.ke/developer-journal"
        keywords={['Developer journal', 'Full-stack blog', 'Narok software engineer', 'Nairobi software architect', 'Web development Kenya', 'Architecture', 'AIOps', 'Security']}
      />
      <DeveloperJournal />
    </>
  )
}
