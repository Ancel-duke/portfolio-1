import dynamic from 'next/dynamic'
import SEO from '@/domains/seo'

const LabsExperiments = dynamic(
  () => import('@/domains/labs').then((m) => m.LabsExperiments),
  { ssr: false }
)

export default function LabsExperimentsPage() {
  return (
    <>
      <SEO
        title="Labs & Experiments — Full-Stack Engineer | Ancel Ajanga"
        description="Labs and experiments by Ancel Ajanga: Fullstack Software Engineer Narok & Nairobi, Kenya. Frontend experiments, AIOps, Security. Full-stack developer East Africa."
        canonicalUrl="https://ancel.co.ke/labs-experiments"
        keywords={['Labs', 'Experiments', 'Ancel Ajanga', 'Fullstack Engineer', 'Frontend Architecture', 'UI Engineering', 'Interactive Systems', 'Performance Optimization', 'Narok software engineer', 'Nairobi software architect', 'Full-stack Kenya']}
      />
      <LabsExperiments showViewAll={false} fullPage={true} />
    </>
  )
}
