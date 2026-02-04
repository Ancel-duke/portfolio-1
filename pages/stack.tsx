import dynamic from 'next/dynamic'
import SEO from '@/components/seo/SEO'

const TechStack = dynamic(
  () => import('@/components/sections/tech-stack').then((m) => m.TechStack),
  { ssr: false }
)

export default function StackPage() {
  return (
    <>
      <SEO
        title="Tech Stack — React, NestJS, Flutter, PostgreSQL | Ancel Ajanga"
        description="Technology stack of Ancel Ajanga: Fullstack Software Engineer Narok & Nairobi, Kenya. React, NestJS, Flutter, TypeScript, PostgreSQL, Security, AIOps. Full-stack developer East Africa."
        canonicalUrl="https://ancel.co.ke/stack"
        keywords={['Tech stack', 'React', 'NestJS', 'Flutter', 'PostgreSQL', 'Narok software engineer', 'Nairobi software architect', 'Full-stack Kenya']}
      />
      <TechStack fullPage />
    </>
  )
}
