import * as React from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card"
import { Button } from "../ui/button"
import { Badge } from "../ui/badge"
import { cn, formatDate } from "../../lib/utils"
import { Calendar, Clock, ArrowRight } from "lucide-react"
import blogData from "../../data/blog.json"

// Derive the blog post type directly from the JSON data to avoid drift
type BlogPost = (typeof blogData)[number]

interface BlogGridProps {
  className?: string
  limit?: number
  showViewAll?: boolean
}

export const BlogGrid = React.memo(function BlogGrid({ className, limit, showViewAll = true }: BlogGridProps) {
  const posts: BlogPost[] = limit ? (blogData as BlogPost[]).slice(0, limit) : (blogData as BlogPost[])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  }

  return (
    <section className={cn("py-16", className)}>
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-[clamp(1.875rem,4vw,2.5rem)] font-bold mb-[clamp(1rem,2.5vw,1.5rem)]">
            Latest <span className="text-gradient">Insights</span>
          </h2>
          <p className="text-[clamp(1rem,2vw,1.125rem)] text-muted-foreground max-w-2xl mx-auto">
            Thoughts on web development, technology trends, and lessons learned from building real-world applications.
          </p>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,2.5vw,1.5rem)]"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {posts.map((post: BlogPost) => (
            <motion.article
              key={post.id}
              variants={itemVariants}
              className="group"
            >
              <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                    decoding="async"
                    width="800"
                    height="384"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="flex flex-wrap gap-2">
                      {post.tags.slice(0, 2).map((tag) => (
                        <Badge
                          key={tag}
                          variant="secondary"
                          className="bg-white/20 text-white border-white/30 hover:bg-white/30"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>

                <CardHeader className="pb-3">
                  <CardTitle className="text-xl line-clamp-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-3">
                    {post.excerpt}
                  </CardDescription>
                </CardHeader>

                <CardContent className="pt-0">
                  <div className="flex items-center justify-between text-sm text-muted-foreground mb-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Calendar className="h-4 w-4" />
                        <span>{formatDate(post.date)}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{post.readTime}</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors"
                    asChild
                  >
                    <a href={`/blog/${post.id}`}>
                      Read More
                      <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </Button>
                </CardContent>
              </Card>
            </motion.article>
          ))}
        </motion.div>

        {showViewAll && limit && blogData.length > limit && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" asChild>
              <a href="/blog">
                View All Posts
                <ArrowRight className="ml-2 h-4 w-4" />
              </a>
            </Button>
          </div>
        )}
      </div>
    </section>
  )
})
