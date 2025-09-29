import { BlogPost } from '../../types/blog';

export function generateBlogPostSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.image,
    "datePublished": post.date,
    "articleBody": post.content,
    "author": {
      "@type": "Person",
      "name": "Ancel Ajanga",
      "url": "https://ancel-ajanga.netlify.app"
    },
    "publisher": {
      "@type": "Person",
      "name": "Ancel Ajanga",
      "url": "https://ancel-ajanga.netlify.app"
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://ancel-ajanga.netlify.app/developer-journal/${post.slug}`
    },
    "keywords": post.tags.join(", ")
  };
}

export function generateBlogSchema(posts: BlogPost[]) {
  return {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Developer Journal - Ancel Ajanga",
    "description": "Deep dives into web development, architecture patterns, and lessons learned from building production applications.",
    "url": "https://ancel-ajanga.netlify.app/developer-journal",
    "blogPost": posts.map((post: BlogPost) => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "url": `https://ancel-ajanga.netlify.app/developer-journal/${post.slug}`
    }))
  };
}