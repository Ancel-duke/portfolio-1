import { SEOHead } from '@/domains/seo'
import { generateProjectSchema, generateBreadcrumbSchema } from '@/domains/seo/schemas'
import projectsData from '@/data/projects.json'
import { getProjectBySlug } from '@/domains/projects/services/projects-data'
import { Card, CardTitle, CardContent } from '@/shared/components/ui/card'
import { Button } from '@/shared/components/ui/button'
import Link from 'next/link'
import { ArrowLeft, ExternalLink, FileText } from 'lucide-react'

export async function getStaticPaths() {
  const projects = projectsData as { slug: string }[]
  // Filter out any projects that might be missing a slug
  const paths = projects.filter(p => !!p.slug).map(p => ({ params: { slug: p.slug } }))
  return { paths, fallback: false }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const project = getProjectBySlug(params.slug)
  if (!project) return { notFound: true }
  
  // Try to find if this project has a case study by checking matching slug
  // For simplicity we just pass the URL state since we are just checking if the route exists
  const hasCaseStudy = true; // Actually we would need caseStudiesData, but we can just render the project schema

  return { props: { project } }
}

export default function ProjectDetailRoute({ project }: { project: any }) {
  const breadcrumbItems = [
    { name: 'Home', url: '/' },
    { name: 'Projects', url: '/projects' },
    { name: project.title, url: `/projects/${project.slug}` },
  ]
  const jsonLd = [
    generateProjectSchema(project),
    generateBreadcrumbSchema(breadcrumbItems),
  ]

  return (
    <>
      <SEOHead
        title={project.seo?.title || project.title}
        description={project.seo?.description || project.description}
        canonical={project.seo?.canonicalUrl || `/projects/${project.slug}`}
        jsonLd={jsonLd}
      />
      <div className="container-custom py-16 min-h-[60vh] flex flex-col items-center justify-center">
        <Card className="w-full max-w-2xl text-center p-8 bg-muted/30">
          <CardTitle className="text-4xl font-bold mb-4">{project.title}</CardTitle>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-6">
              {project.description}
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Button asChild variant="outline">
                <Link href="/projects">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Projects
                </Link>
              </Button>
              <Button asChild variant="outline">
                <Link href={`/case-studies/${project.slug}`}>
                  <FileText className="mr-2 h-4 w-4" /> Read Case Study
                </Link>
              </Button>
              {project.liveUrl && (
                <Button asChild>
                  <a href={project.liveUrl} target="_blank" rel="noopener noreferrer">
                    Launch Project <ExternalLink className="ml-2 h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  )
}
