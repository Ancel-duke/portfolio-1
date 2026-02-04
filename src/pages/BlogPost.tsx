import React from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Helmet } from 'react-helmet-async';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { formatDate } from '../lib/utils';
import { Breadcrumb } from '../components/ui/breadcrumb';
import { BlogPost as BlogPostType } from '../types/blog';

// Import all blog posts
import blogData from '../data/blog-posts.json';

const posts = blogData.posts as BlogPostType[];

export function BlogPost() {
  const router = useRouter();
  const slug = typeof router.query.slug === 'string' ? router.query.slug : undefined;
  const post = posts.find((p: BlogPostType) => p.slug === slug);

  if (!post) {
    return (
      <div className="container-custom py-16">
        <h1>Post not found</h1>
        <Button asChild>
          <Link href="/developer-journal">Back to Developer Journal</Link>
        </Button>
      </div>
    );
  }

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
      <Helmet>
        <title>{post.title} - Ancel Ajanga</title>
        <meta name="description" content={post.excerpt} />
        <meta name="keywords" content={post.tags.join(', ')} />
  <link rel="canonical" href={`https://ancel.co.ke/developer-journal/${slug}`} />
        
        {/* Open Graph */}
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.excerpt} />
        <meta property="og:image" content={post.image} />
  <meta property="og:url" content={`https://ancel.co.ke/developer-journal/${slug}`} />
        
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={post.title} />
        <meta name="twitter:description" content={post.excerpt} />
        <meta name="twitter:image" content={post.image} />
      </Helmet>

      <article className="py-16">
        <div className="container-custom">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Breadcrumb & Back Button */}
            <motion.div variants={itemVariants} className="mb-8">
              <Breadcrumb 
                items={[
                  { name: 'Home', url: '/' },
                  { name: 'Developer Journal', url: '/developer-journal' },
                  { name: post.title, url: `/developer-journal/${slug}`, current: true }
                ]}
                className="mb-4"
              />
              <Button variant="outline" asChild>
                <Link href="/developer-journal">
                  <ArrowLeft className="mr-2 h-4 w-4" /> Back to Developer Journal
                </Link>
              </Button>
            </motion.div>

            {/* Hero Section */}
            <motion.div variants={itemVariants} className="mb-12">
              <div className="relative aspect-video rounded-lg overflow-hidden mb-8">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Meta & Title */}
              <div className="max-w-4xl mx-auto text-center">
                <div className="flex items-center justify-center text-sm text-muted-foreground mb-4">
                  <time dateTime={post.date}>{formatDate(post.date)}</time>
                  <span className="mx-2">•</span>
                  <span>{post.readTime}</span>
                  <span className="mx-2">•</span>
                  <span>{post.category}</span>
                </div>

                <h1 className="text-4xl md:text-5xl font-bold mb-6">
                  {post.title}
                </h1>

                <p className="text-xl text-muted-foreground">
                  {post.excerpt}
                </p>
              </div>
            </motion.div>

            {/* Content */}
            <motion.div variants={itemVariants}>
              <Card className="max-w-4xl mx-auto p-8 md:p-12">
                <div className="prose prose-lg dark:prose-invert max-w-none">
                  <div dangerouslySetInnerHTML={{ __html: post.content }} />
                </div>

                {/* Tags */}
                <div className="mt-12 pt-6 border-t">
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </article>
    </>
  );
}