import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  canonical?: string;
  ogImage?: string;
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
  title: 'Ancel Ajanga - Fullstack Software Engineer/Developer & App Developer',
  description: 'Ancel Ajanga (Duke) — Fullstack Software Engineer/Developer & App Developer. Builder of apps, poet, and creative problem solver.',
  canonical: 'https://ancel.co.ke',
  ogImage: 'https://ancel.co.ke/assets/profile_photo.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image',
  keywords: [
    'Ancel Ajanga',
    'Ajanga Ancel',
    'Fullstack Developer',
    'Fullstack Software Engineer',
    'App Developer',
    'Narok Software Developer',
    'Nairobi Software Developer',
    'Nairobi Software Engineer',
    'Ancel Ajanga Portfolio',
    'Ajanga Ancel Portfolio',
    'React Developer',
    'Node.js Developer',
    'Python Developer',
    'Mobile App Developer',
    'Web Developer',
    'Kenya',
    'Portfolio',
    'Software Applications',
    'React Native',
    'Flutter',
    'Django',
    'MongoDB'
  ],
  author: 'Ancel Ajanga'
};

export const SEOHead: React.FC<SEOHeadProps> = ({
  title = defaultSEO.title,
  description = defaultSEO.description,
  canonical = defaultSEO.canonical,
  ogImage = defaultSEO.ogImage,
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
  const fullTitle = title === defaultSEO.title ? title : `${title} | Ancel Ajanga`;
  const fullCanonical = canonical.startsWith('http') ? canonical : `${defaultSEO.canonical}${canonical}`;
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${defaultSEO.canonical}${ogImage}`;
  
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
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Ancel Ajanga Portfolio" />
      
      {/* Twitter */}
      <meta property="twitter:card" content={twitterCard} />
      <meta property="twitter:url" content={fullCanonical} />
      <meta property="twitter:title" content={fullTitle} />
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

