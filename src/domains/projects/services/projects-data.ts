import projectsData from '@/data/projects.json'
import { getMasterSortedProjects } from '@/shared/utils/projectSorter'

export function getSortedProjects() {
  return getMasterSortedProjects(projectsData)
}

export function getProjectBySlug(slug: string) {
  return projectsData.find(p => p.slug === slug) || null;
}
