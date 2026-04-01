import projectsData from '@/data/projects.json'
import { getMasterSortedProjects } from '@/shared/utils/projectSorter'

export function getSortedProjects() {
  return getMasterSortedProjects(projectsData)
}
