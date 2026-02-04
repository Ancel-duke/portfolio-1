import * as React from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card'
import { Badge } from '../ui/badge'
import { Button } from '../ui/button'
import { cn } from '../../lib/utils'
import { ArrowRight, FileText, BookOpen } from 'lucide-react'
import { useDailyFeaturedContent } from '../../hooks/useDailyFeaturedContent'
import { useAnimationsEnabled } from '../../contexts/AnimationsContext'
import { getSectionVariants } from '../../lib/animation-variants'
import { OptimizedImage } from '../ui/optimized-image'

interface TodaysHighlightsProps {
  className?: string
}

/**
 * Component to display today's featured projects (1 frontend + 3 fullstack)
 * Content rotates daily using date-based seeded randomization, avoiding yesterday’s picks when possible
 */
export function TodaysHighlights({ className }: TodaysHighlightsProps) {
  const featuredItems = useDailyFeaturedContent()
  const animationsEnabled = useAnimationsEnabled()
  const { containerVariants, itemVariants } = getSectionVariants(animationsEnabled)

  if (featuredItems.length === 0) {
    return null
  }

  return (
    <section id="highlights" className={cn('py-16 bg-muted/30 w-full overflow-x-hidden', className)}>
      <div className="container-custom max-w-full">
        <div className="text-center mb-12 px-4 sm:px-0">
          <h2 className="text-[clamp(1.875rem,4vw,2.5rem)] font-bold mb-[clamp(1rem,2.5vw,1.5rem)]">
            Today's <span className="text-gradient">Highlights</span>
          </h2>
          <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground max-w-2xl mx-auto">
            Curated selection of case studies and insights.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-[clamp(1rem,3vw,1.5rem)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
        >
          {featuredItems.map((item, index) => (
            <motion.article
              key={`${item.type}-${item.id}`}
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                {/* Image: priority for first 2 (hero/first project); rest lazy and optimized */}
                {item.image && (
                  <div className="relative overflow-hidden rounded-t-lg h-48">
                    <OptimizedImage
                      src={item.image}
                      alt={item.title}
                      width={800}
                      height={384}
                      priority={index < 2}
                      loading={index < 2 ? 'eager' : 'lazy'}
                      sizes="(max-width: 768px) 100vw, 50vw"
                      className="w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                    <div className="absolute top-4 left-4">
                      <Badge
                        variant="secondary"
                        className={cn(
                          'bg-white/20 text-white border-white/30 hover:bg-white/30',
                          item.type === 'case-study'
                            ? 'bg-blue-500/20 text-blue-100 border-blue-400/30'
                            : 'bg-purple-500/20 text-purple-100 border-purple-400/30'
                        )}
                      >
                        {item.type === 'case-study' ? (
                          <>
                            <FileText className="mr-1.5 h-3.5 w-3.5" />
                            Case Study
                          </>
                        ) : (
                          <>
                            <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                            Developer Journal
                          </>
                        )}
                      </Badge>
                    </div>
                  </div>
                )}

                {/* Content */}
                <CardHeader className={cn('pb-3', !item.image && 'pt-6')}>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors flex-1">
                      {item.title}
                    </CardTitle>
                    {!item.image && (
                      <Badge
                        variant="secondary"
                        className={cn(
                          'shrink-0',
                          item.type === 'case-study'
                            ? 'bg-blue-500/10 text-blue-700 dark:text-blue-300 border-blue-200 dark:border-blue-800'
                            : 'bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-200 dark:border-purple-800'
                        )}
                      >
                        {item.type === 'case-study' ? (
                          <>
                            <FileText className="mr-1.5 h-3.5 w-3.5" />
                            Case Study
                          </>
                        ) : (
                          <>
                            <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                            Journal
                          </>
                        )}
                      </Badge>
                    )}
                  </div>
                  {item.subtitle && (
                    <p className="text-sm text-muted-foreground mb-2">{item.subtitle}</p>
                  )}
                  <CardDescription className="line-clamp-3">
                    {item.summary}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  {/* Tags for journal entries */}
                  {item.type === 'journal' && item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {item.tags.slice(0, 3).map((tag) => (
                        <Badge
                          key={tag}
                          variant="outline"
                          className="text-xs"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}

                  {/* Role for case studies */}
                  {item.type === 'case-study' && item.role && (
                    <p className="text-sm text-muted-foreground mb-4">
                      Role: {item.role}
                    </p>
                  )}

                  {/* Read time for journal entries */}
                  {item.type === 'journal' && item.readTime && (
                    <p className="text-sm text-muted-foreground mb-4">
                      {item.readTime}
                    </p>
                  )}

                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <Link href={item.slug}>
                      {item.type === 'case-study' ? 'View Case Study' : 'Read Article'}
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
