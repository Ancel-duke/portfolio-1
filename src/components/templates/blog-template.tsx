import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Share2, Facebook, Twitter, Linkedin, Link as LinkIcon } from 'lucide-react';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { formatDate } from '@/lib/utils';
import { generateBlogPostSchema } from '@/components/seo/blog-schemas';
import { CodeBlock } from '@/components/ui/code-block';
import { ImageWithLightbox } from '@/components/ui/image-with-lightbox';
import SEO from '@/components/seo/SEO';
import '@/styles/blog-content.css';

interface BlogTemplateProps {
  post: {
    title: string;
    date: string;
    author: string;
    excerpt: string;
    content: string;
    image: string;
    readTime: string;
    category: string;
    tags: string[];
    slug: string;
  };
}

export function BlogTemplate({ post }: BlogTemplateProps) {
  const shareUrls = {
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(window.location.href)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}`
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href);
  };

  return (
    <>
      <SEO
        title={`${post.title} - Ancel Ajanga`}
        description={post.excerpt}
        canonicalUrl={`https://ancel-ajanga.netlify.app/developer-journal/${post.slug}`}
        jsonLd={generateBlogPostSchema(post)}
      />

      <article className="py-16">
        <div className="container-custom">
          <Breadcrumb
            items={[
              { name: 'Home', url: '/' },
              { name: 'Developer Journal', url: '/developer-journal' },
              { name: post.title, url: `/developer-journal/${post.slug}`, current: true }
            ]}
            className="mb-8"
          />

          {/* Hero Section */}
          <div className="relative aspect-video rounded-lg overflow-hidden mb-12">
            <ImageWithLightbox
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Header */}
          <header className="max-w-4xl mx-auto text-center mb-12">
            <div className="flex items-center justify-center space-x-4 text-sm text-muted-foreground mb-4">
              <time dateTime={post.date}>{formatDate(post.date)}</time>
              <span>•</span>
              <span>{post.readTime}</span>
              <span>•</span>
              <span>{post.category}</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              {post.title}
            </h1>

            <p className="text-xl text-muted-foreground mb-8">
              {post.excerpt}
            </p>

            {/* Social Share */}
            <div className="flex items-center justify-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(shareUrls.twitter, '_blank')}
              >
                <Twitter className="h-4 w-4 mr-2" />
                Twitter
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(shareUrls.facebook, '_blank')}
              >
                <Facebook className="h-4 w-4 mr-2" />
                Facebook
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => window.open(shareUrls.linkedin, '_blank')}
              >
                <Linkedin className="h-4 w-4 mr-2" />
                LinkedIn
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={copyToClipboard}
              >
                <LinkIcon className="h-4 w-4 mr-2" />
                Copy Link
              </Button>
            </div>
          </header>

          {/* Content */}
          <div className="max-w-4xl mx-auto">
            <div className="blog-content">
              {post.content.split('\n').map((line, index) => {
                // Skip empty lines
                if (!line.trim()) return null;

                // Check if line starts with Roman numerals
                const isRomanTitle = /^[IVX]+\.\s/.test(line);
                // Check if line starts with numeric title
                const isNumericTitle = /^\d+\.\s/.test(line);
                
                return (
                  <p 
                    key={index}
                    className={`
                      ${isRomanTitle ? 'text-2xl font-bold mt-8 mb-4' : ''}
                      ${isNumericTitle ? 'text-xl font-semibold mt-6 mb-3' : ''}
                      ${!isRomanTitle && !isNumericTitle ? 'text-base mb-4' : ''}
                    `}
                  >
                    {line}
                  </p>
                );
              })}
            </div>

            {/* Tags */}
            <div className="mt-12 pt-6 border-t">
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-muted text-muted-foreground text-sm rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}