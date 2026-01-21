import { useMemo, useState, useEffect } from 'react'
import caseStudiesData from '../data/case-studies.json'
import blogData from '../data/blog.json'
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
 * Hook to get daily featured content (2 case studies + 2 journal entries)
 * Uses date-based seeded randomization to ensure consistent selection throughout the day
 * 
 * @returns Array of 4 featured content items (2 case studies, 2 journal entries)
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
    // Get all case studies and journal entries
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

    const journalEntries = blogData as Array<{
      id: number
      title: string
      excerpt: string
      date: string
      tags?: string[]
      image?: string
      readTime?: string
    }>

    // Shuffle each array independently using date-based seed
    // Use different seed modifiers to ensure different randomization for case studies vs journals
    // Create different seeds for case studies and journals to ensure independent shuffling
    const caseStudiesSeed = hashString(dateSeed + '-case-studies')
    const journalsSeed = hashString(dateSeed + '-journals')
    
    const shuffledCaseStudies = seededShuffle([...caseStudies], caseStudiesSeed)
    const shuffledJournals = seededShuffle([...journalEntries], journalsSeed)

    // Select first 2 from each (or all if fewer than 2 available)
    // Ensure we only take exactly 2 items (or fewer if not enough available)
    const selectedCaseStudies = shuffledCaseStudies.slice(0, 2)
    const selectedJournals = shuffledJournals.slice(0, 2)

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

    // Transform journal entries to unified format
    // Generate slug from title (matching the pattern used in DeveloperJournal.tsx)
    const journalItems: FeaturedContentItem[] = selectedJournals.map(journal => ({
      id: journal.id,
      title: journal.title,
      summary: journal.excerpt,
      type: 'journal' as const,
      date: journal.date,
      slug: `/developer-journal/${journal.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`,
      tags: journal.tags,
      excerpt: journal.excerpt,
      readTime: journal.readTime,
      image: journal.image,
    }))

    // Combine and return (case studies first, then journals)
    // The order can be shuffled if desired, but keeping it simple for now
    return [...caseStudyItems, ...journalItems]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dateSeed]) // Recalculate when date seed changes (daily) - dateSeed is intentionally used
}
