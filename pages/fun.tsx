import dynamic from 'next/dynamic'
import SEO from '@/domains/seo'
import { generateBreadcrumbSchema } from '@/domains/seo/schemas'

const Fun = dynamic(
  () => import('@/domains/fun').then((m) => m.Fun),
  { ssr: false }
)

export default function FunPage() {
  return (
    <>
      <SEO
        title="Fun & Side Projects | Ancel Ajanga — Full-Stack Engineer Kenya"
        description="Side projects and experiments by Ancel Ajanga: Fullstack Software Engineer in Narok and Nairobi, Kenya. Music, labs, emerging talent. Full-stack developer East Africa."
        canonicalUrl="https://ancel.co.ke/fun"
        keywords={['Fun', 'Side projects', 'Ancel Ajanga', 'Narok software engineer', 'Nairobi developer', 'Full-stack Kenya']}
        jsonLd={generateBreadcrumbSchema([
          { name: 'Home', url: '/' },
          { name: 'Fun', url: '/fun' },
        ])}
      />
      <Fun fullPage />
    </>
  )
}
