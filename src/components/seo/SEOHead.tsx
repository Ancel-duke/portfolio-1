import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
  /** Discover-friendly hook for og:title and twitter:title (e.g. "How I Built a Self-Healing E-commerce Engine"). When set, used instead of fullTitle for OG/Twitter. */
  ogTitle?: string;
  ogType?: string;
  twitterCard?: string;
  keywords?: string[];
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  jsonLd?: object | object[];
  noindex?: boolean;
  nofollow?: boolean;
}

const defaultSEO = {
  title: 'Ancel Ajanga — Fullstack Engineer & Systems Architect | Kenya',
  description: 'Ancel Ajanga: Fullstack Engineer and Systems Architect from Narok, Kenya. Builds resilient systems—Aegis, OpsFlow, SignFlow, LedgerX, Fits by Aliv. Hardened backends, fluid frontends, self-healing infrastructure.',
  canonical: 'https://ancel.co.ke',
  ogImage: 'https://ancel.co.ke/assets/profile_photo.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  keywords: [
    'Ancel Ajanga',
    'Ajanga Ancel',
    'Fullstack Engineer',
    'Fullstack Software Engineer',
    'Software Engineer Narok',
    'Systems Architect',
    'Nairobi Software Engineer',
    'Narok Software Developer',
    'Kenya Developer',
    'Ancel Ajanga Portfolio',
    'Aegis',
    'OpsFlow',
    'SignFlow',
    'LedgerX',
    'EduChain',
    'NestFi',
    'Fits by Aliv',
    'EduManage',
    'React Developer',
    'Node.js Developer',
    'NestJS',
    'Flutter',
    'TypeScript',
    'PostgreSQL',
    'System Resilience',
    'Web Developer Kenya'
  ],
  author: 'Ancel Ajanga'
};

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = defaultSEO.title,
  description = defaultSEO.description,
  canonical = defaultSEO.canonical,
  ogImage = defaultSEO.ogImage,
  ogTitle,
  ogType = defaultSEO.ogType,
  twitterCard = defaultSEO.twitterCard,
  keywords = defaultSEO.keywords,
  author = defaultSEO.author,
  publishedTime,
  modifiedTime,
  jsonLd,
  noindex = false,
  nofollow = false
}) => {
  const fullTitle = title === defaultSEO.title ? title : `${title} | Ancel Ajanga — Fullstack Engineer`;
  const fullCanonical = canonical.startsWith('http') ? canonical : `${defaultSEO.canonical}${canonical}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${defaultSEO.canonical}${ogImage}`;
  const displayOgTitle = ogTitle || fullTitle;
  
  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
    'max-snippet:-1',
    'max-image-preview:large',
    'max-video-preview:-1'
  ].join(', ');

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={fullCanonical} />
      
      {/* Open Graph / Facebook — og:image 1200x630 for Discover */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={displayOgTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Ancel Ajanga Portfolio" />
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={displayOgTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={fullOgImage} />
      <meta property="twitter:creator" content="@ancel_ajanga" />
      
      {/* Article specific meta tags */}
      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}
      
      {/* Additional SEO Meta Tags */}
      <meta name="application-name" content="Ancel Ajanga Portfolio" />
      <meta name="apple-mobile-web-app-title" content="Ancel Ajanga" />
      <meta name="msapplication-TileColor" content="#0ea5a4" />
      <meta name="theme-color" content="#0ea5a4" />
      
      {/* JSON-LD Structured Data */}
      {jsonLd && (
        <script type="application/ld+json">
          {JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;

