import { SEOHead } from '@/domains/seo'
import {
  generateProjectSchema,
  generateSoftwareSourceCodeSchema,
} from '@/domains/seo/schemas'
import projectsData from '@/data/projects.json'
import caseStudiesData from '@/data/case-studies.json'
import blogData from '@/data/blog.json'
import topicClustersData from '@/data/topic-clusters.json'
import { getProjectBySlug } from '@/domains/projects/services/projects-data'
import { postSlug } from '@/domains/blog/services/blog-query'
import { getRelatedArticleSlugsForProject } from '@/shared/utils/metadata'
import { buildProjectAiSummary } from '@/shared/utils/ai-summary'
import { Card, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, FileText, BookOpen } from 'lucide-react'

export async function getStaticPaths() {
  const projects = projectsData as { slug: string }[]
  const paths = projects.filter((p) => !!p.slug).map((p) => ({ params: { slug: p.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) return { notFound: true }
  return { props: { project } }
}

export default function ProjectDetailRoute({ project }: { project: Record<string, unknown> }) {
  const slug = String(project.slug || '')
  const title = String(project.title || '')
  const description = String(project.description || '')
  const longDesc = typeof project.longDescription === 'string' ? project.longDescription : ''
  const seo = project.seo as { title?: string; description?: string; canonicalUrl?: string } | undefined

  const shortTitle = title.split('—')[0].split(':')[0].split(' - ')[0].trim() || title

  const caseStudies = caseStudiesData as Array<{ slug: string }>
  const hasCaseStudy = caseStudies.some((cs) => cs.slug === slug)

  const articleSlugs = getRelatedArticleSlugsForProject(topicClustersData?.clusters || [], slug)
  const journalPosts = (blogData as Array<{ title: string; slug?: string }>)
    .map((p) => ({ post: p, s: postSlug(p) }))
    .filter(({ s }) => articleSlugs.includes(s))
    .slice(0, 5)

  const sourceSchema = generateSoftwareSourceCodeSchema(project)
  const jsonLd = [
    generateProjectSchema(project as Parameters<typeof generateProjectSchema>[0]),
    ...(sourceSchema ? [sourceSchema] : []),
  ]

  const aiSummary = buildProjectAiSummary({
    title,
    slug,
    description,
    longDescription: longDesc,
  })

  return (
    <>
      <SEOHead
        title={seo?.title || title}
        description={seo?.description || description}
        canonical={seo?.canonicalUrl || `/projects/${slug}`}
        ogType="article"
        jsonLd={jsonLd}
      />
      <div className="container-custom py-16 min-h-[60vh] flex flex-col items-center">
        <article className="w-full max-w-2xl" aria-labelledby="project-detail-title">
          <Card className="text-center p-8 bg-muted/30">
            <CardContent className="space-y-6 text-left pt-0">
              <h1
                id="project-detail-title"
                className="text-3xl sm:text-4xl font-bold mb-2 text-foreground tracking-tight"
              >
                {title}
              </h1>
              <section
                className="rounded-xl border border-border bg-background/80 p-4 md:p-5 text-left"
                aria-label="Project summary for readers and AI extraction"
                data-ai-summary=""
              >
                <p className="text-base text-foreground leading-relaxed">{aiSummary}</p>
              </section>
              <p className="text-lg text-muted-foreground">{description}</p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild variant="outline">
                  <Link href="/projects">
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back to all portfolio projects
                  </Link>
                </Button>
                {hasCaseStudy && (
                  <Button asChild variant="outline">
                    <Link href={`/case-studies/${slug}`}>
                      <FileText className="mr-2 h-4 w-4" /> Read the {shortTitle} technical case study
                    </Link>
                  </Button>
                )}
                {typeof project.liveUrl === 'string' && project.liveUrl.trim() !== '' && (
                  <Button asChild>
                    <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                      Launch live demo <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                )}
              </div>
              {journalPosts.length > 0 && (
                <aside className="border-t pt-6 mt-6 text-left" aria-label="Related developer journal">
                  <h2 className="font-semibold mb-3 flex items-center gap-2 text-base">
                    <BookOpen className="h-4 w-4 text-primary" />
                    Related Developer Journal articles
                  </h2>
                  <ul className="space-y-2">
                    {journalPosts.map(({ post, s }) => (
                      <li key={s}>
                        <Link
                          href={`/developer-journal/${s}`}
                          className="text-primary hover:underline font-medium"
                        >
                          {post.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                  <p className="text-sm text-muted-foreground mt-4">
                    <Link href="/guides" className="text-primary hover:underline font-medium">
                      Step-by-step engineering guides
                    </Link>{' '}
                    expand on the same systems as this project.
                  </p>
                </aside>
              )}
            </CardContent>
          </Card>
        </article>
      </div>
    </>
  )
}
