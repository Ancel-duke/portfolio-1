import SEO from '@/components/seo/SEO'
import Link from 'next/link'
import guidesData from '@/data/guides.json'
import { Card, CardContent, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ArrowRight, BookOpen } from 'lucide-react'

const guides = guidesData as Array<{
  slug: string
  title: string
  summary: string
  tech_stack: string[]
  template_type: string
  date?: string
  readTime?: string
}>

export default function GuidesIndexPage() {
  return (
    <>
      <SEO
        title="Guides — Architecture, Next.js, SaaS Stack | Ancel Ajanga"
        description="Technical guides by Ancel Ajanga: building with Next.js, real-time systems, and stack comparisons. Fullstack Engineer Narok & Nairobi, Kenya."
        canonicalUrl="https://ancel.co.ke/guides"
        keywords={['Guides', 'Next.js', 'Django', 'SaaS', 'Architecture', 'Ancel Ajanga', 'Fullstack Engineer Kenya']}
      />
      <div className="py-8 sm:py-12 md:py-16 container-custom max-w-4xl">
        <h1 className="text-3xl font-bold mb-2">Guides</h1>
        <p className="text-muted-foreground mb-8">
          Technical deep dives and comparisons from production projects. Each guide meets a high bar: 800+ words, measurable outcomes, and internal links to case studies and the tech stack.
        </p>
        <div className="space-y-6">
          {guides.map((guide) => (
            <Card key={guide.slug} className="p-4 sm:p-6">
              <CardTitle className="text-xl mb-2">
                <Link href={`/guides/${guide.slug}`} className="hover:underline">
                  {guide.title}
                </Link>
              </CardTitle>
              <CardContent className="p-0">
                <p className="text-muted-foreground mb-4">{guide.summary}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {guide.tech_stack?.slice(0, 6).map((tech) => (
                    <Badge key={tech} variant="secondary">
                      {tech}
                    </Badge>
                  ))}
                  {(guide.date || guide.readTime) && (
                    <span className="text-sm text-muted-foreground">
                      {guide.date} {guide.readTime}
                    </span>
                  )}
                </div>
                <Button asChild size="sm">
                  <Link href={`/guides/${guide.slug}`}>
                    Read guide <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button variant="outline" asChild>
            <Link href="/stack">
              <BookOpen className="mr-2 h-4 w-4" /> Tech stack
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/case-studies">Case studies</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
        </div>
      </div>
    </>
  )
}
