import { useMemo, useState, useEffect } from 'react'
import caseStudiesData from '../data/case-studies.json'
import { getDailySeed, hashString, seededShuffle } from '../utils/projectSorter'

/**
 * Unified content item interface for case studies and journal entries
 */
export interface FeaturedContentItem {
  id: number
  title: string
  summary: string
  type: 'case-study' | 'journal'
  date: string
  slug: string
  tags?: string[]
  image?: string
  // Case study specific
  subtitle?: string
  role?: string
  // Journal specific
  excerpt?: string
  readTime?: string
}

/**
 * Hook to get daily featured content (4 projects)
 *
 * Rules:
 * - Exactly 4 projects total
 * - 1 frontend case study + 3 fullstack case studies
 * - No duplicates within the same day
 * - Avoid repeating yesterday’s selected projects when possible
 */
export function useDailyFeaturedContent(): FeaturedContentItem[] {
  // Track the current date seed to trigger recalculation when date changes
  const [dateSeed, setDateSeed] = useState(() => getDailySeed())
  
  // Update date seed when it changes (new day)
  useEffect(() => {
    const checkDate = () => {
      const currentSeed = getDailySeed()
      if (currentSeed !== dateSeed) {
        setDateSeed(currentSeed)
      }
    }
    
    // Check immediately
    checkDate()
    
    // Check periodically (every hour) to catch date changes
    const interval = setInterval(checkDate, 60 * 60 * 1000)
    
    return () => clearInterval(interval)
  }, [dateSeed])
  
  return useMemo(() => {
    // Get all case studies
    const caseStudies = caseStudiesData as Array<{
      id: number
      slug: string
      title: string
      subtitle?: string
      description: string
      role?: string
      year?: string
      images?: { hero?: string }
    }>

    // Separate case studies into fullstack and frontend
    const fullstackCaseStudies = caseStudies.filter(cs => {
      const role = (cs.role || '').toLowerCase()
      return role.includes('full') || role.includes('stack')
    })

    const frontendCaseStudies = caseStudies.filter(cs => {
      const role = (cs.role || '').toLowerCase()
      const title = (cs.title || '').toLowerCase()
      return role.includes('frontend') || 
             title.includes('tracker') || 
             title.includes('timer') || 
             title.includes('travelogue') ||
             title.includes('scheduler') ||
             title.includes('academy')
    })

    const getSeedOffset = (seed: string, daysOffset: number) => {
      // seed is YYYY-MM-DD
      const [y, m, d] = seed.split('-').map(Number)
      const dt = new Date(y, (m || 1) - 1, d || 1)
      dt.setDate(dt.getDate() + daysOffset)
      const year = dt.getFullYear()
      const month = String(dt.getMonth() + 1).padStart(2, '0')
      const day = String(dt.getDate()).padStart(2, '0')
      return `${year}-${month}-${day}`
    }

    const buildSelection = (seed: string, excludeIds: Set<number>) => {
      // Shuffle each array independently using date-based seed
      const fullstackSeed = hashString(seed + '-highlights-fullstack')
      const frontendSeed = hashString(seed + '-highlights-frontend')

      const shuffledFullstack = seededShuffle([...fullstackCaseStudies], fullstackSeed).filter(cs => !excludeIds.has(cs.id))
      const shuffledFrontend = seededShuffle([...frontendCaseStudies], frontendSeed).filter(cs => !excludeIds.has(cs.id))

      const selected: Array<typeof caseStudies[number] & { type?: string }> = []
      const used = new Set<number>()

      // Pick exactly 1 frontend (if available)
      for (const cs of shuffledFrontend) {
        if (!used.has(cs.id)) {
          selected.push(cs)
          used.add(cs.id)
          break
        }
      }

      // Pick 3 fullstack
      for (const cs of shuffledFullstack) {
        if (selected.length >= 4) break
        if (!used.has(cs.id)) {
          selected.push(cs)
          used.add(cs.id)
        }
      }

      // If we couldn't reach 4 (edge case), fill from remaining fullstack then frontend
      if (selected.length < 4) {
        for (const cs of shuffledFullstack) {
          if (selected.length >= 4) break
          if (!used.has(cs.id)) {
            selected.push(cs)
            used.add(cs.id)
          }
        }
      }

      if (selected.length < 4) {
        for (const cs of shuffledFrontend) {
          if (selected.length >= 4) break
          if (!used.has(cs.id)) {
            selected.push(cs)
            used.add(cs.id)
          }
        }
      }

      // Ensure we always return at most 4
      return selected.slice(0, 4)
    }

    // Yesterday's selection (used only to avoid repeats today)
    const yesterdaySeed = getSeedOffset(dateSeed, -1)
    const yesterdaySelected = buildSelection(yesterdaySeed, new Set<number>())
    const yesterdayIds = new Set<number>(yesterdaySelected.map(cs => cs.id))

    // Today's selection, avoiding yesterday's IDs when possible
    const selectedCaseStudies = buildSelection(dateSeed, yesterdayIds)

    // Transform case studies to unified format
    const caseStudyItems: FeaturedContentItem[] = selectedCaseStudies.map(cs => ({
      id: cs.id,
      title: cs.title,
      summary: cs.subtitle || cs.description,
      type: 'case-study' as const,
      date: cs.year || '',
      slug: `/case-studies/${cs.slug}`,
      subtitle: cs.subtitle,
      role: cs.role,
      image: cs.images?.hero,
    }))

    // Return only projects (4 items)
    return caseStudyItems
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateSeed]) // Recalculate when date seed changes (daily) - dateSeed is intentionally used
}
