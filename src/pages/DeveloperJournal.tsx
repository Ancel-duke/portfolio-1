import React from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Card, CardContent } from '../components/ui/card';
import { OptimizedImage } from '../components/ui/optimized-image';
import { formatDate } from '../lib/utils';

// Import all blog posts
import blogData from '../data/blog.json';

interface Post {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  tags: string[];
  date: string;
  readTime: string;
  image: string;
  category: string;
  author: {
    name: string;
    avatar: string;
    bio: string;
  };
  slug?: string;
}

/** Featured journal posts shown first, in this order (by title match). */
const FEATURED_JOURNAL_ORDER = ['aegis', 'nestfi', 'ledgerx', 'edumanage', 'opsflow'] as const;

function getFeaturedIndex(title: string): number {
  const t = title.toLowerCase();
  const idx = FEATURED_JOURNAL_ORDER.findIndex(
    (name) => t.includes(name) || t.startsWith(name)
  );
  return idx >= 0 ? idx : FEATURED_JOURNAL_ORDER.length;
}

const rawPosts = (blogData as Post[]).map((post) => ({
  ...post,
  slug: post.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}));

const posts = [...rawPosts].sort((a, b) => {
  const orderA = getFeaturedIndex(a.title);
  const orderB = getFeaturedIndex(b.title);
  if (orderA !== orderB) return orderA - orderB;
  return new Date(b.date).getTime() - new Date(a.date).getTime();
});

export function DeveloperJournal() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <>
      <section className="py-16 md:py-24">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-16"
          >
            {/* Header */}
            <motion.div variants={itemVariants} className="text-center mb-16">
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Developer <span className="text-gradient">Journal</span>
              </h1>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Deep dives into web development, architecture patterns, and lessons learned 
                from building production applications.
              </p>
            </motion.div>

            {/* Posts Grid */}
            <motion.div 
              variants={containerVariants}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[clamp(1rem,3vw,2rem)]"
            >
              {posts.map((post, index) => (
                <motion.article
                  key={post.slug}
                  variants={itemVariants}
                  className="group"
                >
                  <Link href={`/developer-journal/${post.slug}`}>
                    <Card className="h-full hover:shadow-xl transition-all duration-300 border-0 bg-card/50 backdrop-blur-sm overflow-hidden">
                      {/* Image */}
                      <div className="relative aspect-video overflow-hidden">
                        <OptimizedImage
                          src={post.image}
                          alt={post.title}
                          width={800}
                          height={450}
                          priority={index < 2}
                          loading={index < 2 ? 'eager' : 'lazy'}
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          className="w-full h-full group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1 bg-primary/90 text-white text-sm rounded-full">
                            {post.category}
                          </span>
                        </div>
                      </div>

                      <CardContent className="p-6">
                        {/* Meta */}
                        <div className="flex items-center text-sm text-muted-foreground mb-3">
                          <time dateTime={post.date}>{formatDate(post.date)}</time>
                          <span className="mx-2">•</span>
                          <span>{post.readTime}</span>
                        </div>

                        {/* Title & Excerpt */}
                        <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                          {post.title}
                        </h2>
                        <p className="text-muted-foreground mb-4">
                          {post.excerpt}
                        </p>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                          {post.tags.map(tag => (
                            <span
                              key={tag}
                              className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded"
                            >
                              #{tag}
                            </span>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </motion.article>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}