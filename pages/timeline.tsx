import dynamic from 'next/dynamic'
import SEO from '@/components/seo/SEO'

const Timeline = dynamic(
  () => import('@/components/sections/timeline').then((m) => m.Timeline),
  { ssr: false }
)

export default function TimelinePage() {
  return (
    <>
      <SEO
        title="Timeline — Career & Projects | Ancel Ajanga, Full-Stack Engineer Kenya"
        description="Career timeline of Ancel Ajanga: Fullstack Software Engineer and Architect in Narok and Nairobi, Kenya. Full-stack developer East Africa. Projects: NestFi, SignFlow, OpsFlow, Aegis, LedgerX, EduChain."
        canonicalUrl="https://ancel.co.ke/timeline"
        keywords={['Timeline', 'Ancel Ajanga', 'Narok software engineer', 'Nairobi software architect', 'Full-stack developer Kenya career']}
      />
      <Timeline fullPage />
    </>
  )
}
