import React, { useMemo } from 'react'
import SEO from '@/domains/seo'
import { StructuredData } from '@/domains/seo'
import { generateProjectSchema, generatePortfolioSchema } from '@/domains/seo/schemas'
import { getSortedProjects } from '@/domains/projects/services/projects-data'
import ProjectsView from '@/domains/projects/components/ProjectsView'

export default function ProjectsWithSeo() {
  const projects = useMemo(() => getSortedProjects(), [])
  const projectSchemas = useMemo(() => projects.map((p) => generateProjectSchema(p)), [projects])
  const itemListSchema = useMemo(() => generatePortfolioSchema(projects), [projects])

  return (
    <>
      <SEO
        title="Projects — NestFi, SignFlow, OpsFlow, Aegis, LedgerX, EduChain, EduManage, TaskForge | Ancel Ajanga"
        description="Software projects by Ancel Ajanga: Fullstack Software Engineer Narok & Nairobi, Kenya. NestFi, SignFlow, OpsFlow, Aegis, LedgerX, EduChain, EduManage, TaskForge, Fits by Aliv. Security, AIOps, full-stack developer East Africa."
        canonicalUrl="https://ancel.co.ke/projects"
        keywords={[
          'NestFi',
          'SignFlow',
          'OpsFlow',
          'Aegis',
          'LedgerX',
          'EduChain',
          'EduManage',
          'TaskForge',
          'Narok software engineer',
          'Nairobi software architect',
          'Full-stack developer Kenya',
          'Projects Ancel Ajanga',
        ]}
      />
      <StructuredData data={[itemListSchema, ...projectSchemas]} />
      <ProjectsView />
    </>
  )
}
