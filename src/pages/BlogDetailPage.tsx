import React from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import blogData from '../data/blog.json'
import { Card, CardContent, CardTitle } from '../components/ui/card'
import { Button } from '../components/ui/button'
import { ArrowLeft, Calendar, Tag, Clock } from 'lucide-react'
import { formatDate } from '../lib/utils'
import { Helmet } from 'react-helmet-async'

export function BlogDetailPage() {
  const { id } = useParams<{ id: string }>()
  const post = blogData.find(p => p.id === parseInt(id || '0'))

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center py-16">
        <Card className="w-full max-w-2xl text-center p-8">
          <CardTitle className="text-4xl font-bold mb-4">404 - Blog Post Not Found</CardTitle>
          <CardContent>
            <p className="text-lg text-muted-foreground mb-6">
              The blog post you are looking for does not exist or has been moved.
            </p>
            <Button asChild>
              <Link to="/blog">
                <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
              </Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className="py-16 container-custom"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <Helmet>
        <title>{post.title} | Ancel Ajanga Blog</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <motion.div variants={itemVariants} className="mb-8">
        <Button variant="outline" asChild>
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Link>
        </Button>
      </motion.div>

      <Card className="p-6 md:p-10">
        <motion.div variants={itemVariants} className="mb-6">
          {post.image && (
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-64 object-cover rounded-lg mb-6"
            />
          )}
          <CardTitle className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            {post.title}
          </CardTitle>
          <div className="flex items-center text-muted-foreground text-sm mb-4 space-x-4">
            <span className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" /> {formatDate(post.date)}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" /> {post.readTime}
            </span>
            <span className="flex items-center">
              <Tag className="h-4 w-4 mr-1" /> {post.tags.join(', ')}
            </span>
          </div>
          <p className="text-lg text-muted-foreground italic">{post.excerpt}</p>
        </motion.div>

        <motion.div variants={itemVariants} className="prose dark:prose-invert max-w-none">
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-4 text-lg leading-relaxed">
              {paragraph}
            </p>
          ))}
        </motion.div>
      </Card>
    </motion.div>
  )
}
