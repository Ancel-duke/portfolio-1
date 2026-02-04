import * as React from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { useAnimationsEnabled } from "../../contexts/AnimationsContext"
import { getSectionVariants } from "../../lib/animation-variants"
import { Card } from "../../components/ui/card"
import { OptimizedImage } from "../../components/ui/optimized-image"
import { cn } from "../../lib/utils"
import caseStudiesData from "../../data/case-studies.json"
import { getDailySelection, getMasterSortedProjects } from "../../utils/projectSorter"

interface CaseStudy {
  id: number
  slug: string
  title: string
  subtitle: string
  role: string
  timeline: string
  year: string
  status: string
  description: string
  technologies: Array<{
    name: string
    category: string
    icon: string
  }>
  links: {
    live: string
    github: string
  }
  images: {
    hero: string
    before: string
    after: string
    gallery: string[]
  }
}

interface CaseStudiesGridProps {
  className?: string
  limit?: number
  showViewAll?: boolean
  showHeader?: boolean
}

export const CaseStudiesGrid = React.memo(function CaseStudiesGrid({ 
  className, 
  limit, 
  showViewAll = true, 
  showHeader = true 
}: CaseStudiesGridProps) {
  const caseStudies = caseStudiesData
  
  const caseStudiesWithType = (caseStudies as CaseStudy[]).map(cs => ({
    ...cs,
    type: (cs.role || '').toLowerCase().includes('full') ? 'fullstack' : 'frontend'
  }))
  
  const enterpriseCaseStudies = React.useMemo(() => {
    return caseStudiesWithType.filter(cs => {
      const role = (cs.role || '').toLowerCase()
      return role.includes('full') || role.includes('stack')
    })
  }, [caseStudiesWithType])

  const selectedCaseStudies = React.useMemo(() => {
    if (!limit) {
      return getMasterSortedProjects(enterpriseCaseStudies) as CaseStudy[]
    }
    return getDailySelection(enterpriseCaseStudies, limit) as CaseStudy[]
  }, [limit, enterpriseCaseStudies])

  const animationsEnabled = useAnimationsEnabled()
  const { containerVariants, itemVariants } = React.useMemo(
    () => getSectionVariants(animationsEnabled),
    [animationsEnabled]
  )

  return (
    /* 
      PROFESSIONAL LAYOUT SYSTEM:
      - Consistent spacing scale (16px base unit)
      - Clear visual hierarchy
      - Production-ready grid system
    */
    <section className={cn(
      showHeader ? "py-16 md:py-20" : "", 
      "w-full",
      className
    )}>
      {showHeader ? (
        // STANDALONE SECTION (Homepage)
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Hero: Professional spacing */}
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              {limit ? "Featured" : "All"} <span className="text-gradient">Case Studies</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              {limit 
                ? "Enterprise-grade systems showcasing resilient architecture, hybrid databases, and scalable solutions." 
                : "Deep dives into my most challenging and rewarding projects, showcasing the process, challenges, and outcomes."}
            </p>
          </div>

          {/* 
            GRID SYSTEM:
            - 2-column on tablet (md:grid-cols-2)
            - 3-column on desktop (lg:grid-cols-3)
            - Consistent 32px gap (gap-8)
            - Equal height cards (items-stretch implied by h-full on cards)
          */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {selectedCaseStudies.map((caseStudy: CaseStudy, index: number) => (
              <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} index={index} itemVariants={itemVariants} />
            ))}
          </motion.div>

          {/* CTA: Professional spacing (mt-16 = 64px) */}
          {showViewAll && limit && selectedCaseStudies.length > 0 && (
            <div className="text-center mt-16">
              <Link 
                href="/case-studies"
                className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-lg border-2 border-primary/20 bg-background hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 text-base font-semibold"
              >
                View All Case Studies
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>
          )}
        </div>
      ) : (
        // EMBEDDED MODE (/case-studies page)
        // Parent provides container, this renders grid only
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {selectedCaseStudies.map((caseStudy: CaseStudy, index: number) => (
            <CaseStudyCard key={caseStudy.id} caseStudy={caseStudy} index={index} itemVariants={itemVariants} />
          ))}
        </motion.div>
      )}
    </section>
  )
})

/* 
  PROFESSIONAL CARD COMPONENT:
  - Self-contained, production-ready design
  - Strict composition order: image → title → description
  - Equal heights via h-full
  - Consistent internal spacing
*/
function CaseStudyCard({ caseStudy, index, itemVariants }: { caseStudy: CaseStudy; index: number; itemVariants: { hidden: object; visible: object } }) {
  return (
    <motion.article variants={itemVariants} className="h-full">
      <Link 
        href={`/case-studies/${caseStudy.slug}`}
        className="block h-full group"
      >
        {/* 
          CARD STRUCTURE:
          - h-full for equal grid heights
          - Subtle border and backdrop
          - Professional hover effects
        */}
        <Card className="h-full flex flex-col overflow-hidden border-2 border-border/50 bg-card/80 backdrop-blur-sm hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-300 hover:-translate-y-2">
          
          {/* 
            IMAGE CONTAINER:
            - aspect-[3/2] for professional ratio (600x400)
            - object-cover prevents distortion
            - Gradient overlay for depth
          */}
          <div className="relative overflow-hidden bg-muted aspect-[3/2] w-full">
            <OptimizedImage
              src={caseStudy.images.hero}
              alt={caseStudy.title}
              className="w-full h-full group-hover:scale-110 transition-transform duration-700 ease-out"
              priority={index < 2}
              loading={index < 2 ? "eager" : "lazy"}
              skipNetlifyCDN
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              width={600}
              height={400}
            />
            {/* Gradient overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />
          </div>

          {/* 
            CONTENT AREA:
            - flex-1 to push content to fill available space
            - p-6 (24px) for comfortable reading
            - space-y-4 (16px) for clear hierarchy
          */}
          <div className="flex-1 flex flex-col p-6 space-y-4">
            {/* Title: Bold, prominent, 2-line clamp */}
            <h3 className="font-bold text-2xl group-hover:text-primary transition-colors duration-300 line-clamp-2 leading-tight">
              {caseStudy.title}
            </h3>
            
            {/* Description: Muted, readable, 3-line clamp */}
            <p className="text-base text-muted-foreground line-clamp-3 leading-relaxed flex-1">
              {caseStudy.description}
            </p>

            {/* 
              READ MORE INDICATOR:
              - Subtle visual cue
              - Appears on hover
              - Professional touch
            */}
            <div className="flex items-center gap-2 text-sm font-medium text-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span>Read Case Study</span>
              <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </div>
          </div>
        </Card>
      </Link>
    </motion.article>
  )
}
