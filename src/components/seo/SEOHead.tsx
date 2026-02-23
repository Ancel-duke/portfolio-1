import React from 'react'
import Head from 'next/head'

interface SEOHeadProps {
  title?: string
  description?: string
  canonical?: string
  ogImage?: string
  ogTitle?: string
  ogType?: string
  twitterCard?: string
  keywords?: string[]
  author?: string
  publishedTime?: string
  modifiedTime?: string
  jsonLd?: object | object[]
  noindex?: boolean
  nofollow?: boolean
}

const defaultSEO = {
  title: 'Ancel Ajanga',
  description: 'Ancel Ajanga: Fullstack Software Engineer and Architect in Narok and Nairobi, Kenya. Full-stack developer East Africa. Security & AIOps. Projects: NestFi, SignFlow, OpsFlow, Aegis, LedgerX, EduChain, EduManage, TaskForge. Resilient systems from UI to database.',
  canonical: 'https://ancel.co.ke',
  ogImage: 'https://ancel.co.ke/assets/profile_photo.jpg',
  ogType: 'website',
  twitterCard: 'summary_large_image' as const,
  keywords: [
    'Narok software engineer', 'Nairobi software architect', 'Full-stack developer Kenya',
    'Full-stack developer East Africa', 'Ancel Ajanga', 'Security and AIOps',
    'NestFi', 'SignFlow', 'OpsFlow', 'Aegis', 'LedgerX', 'EduChain', 'EduManage', 'TaskForge',
    'React Developer', 'Node.js Developer', 'NestJS', 'Flutter', 'TypeScript', 'PostgreSQL',
    'System Resilience', 'Web Developer Kenya', 'emerging talent',
  ],
  author: 'Ancel Ajanga',
}

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
  nofollow = false,
}) => {
  const fullTitle = title === defaultSEO.title ? title : `${title} | Ancel Ajanga — Fullstack Engineer`
  const fullCanonical = canonical.startsWith('http') ? canonical : `${defaultSEO.canonical}${canonical}`
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${defaultSEO.canonical}${ogImage}`
  const displayOgTitle = ogTitle || fullTitle

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
    'max-snippet:-1',
    'max-image-preview:large',
    'max-video-preview:-1',
  ].join(', ')

  const isHomepage = canonical === defaultSEO.canonical || canonical === `${defaultSEO.canonical}/`
  const lcpImage = isHomepage ? '/assets/profile_photo.jpg' : null

  return (
    <Head>
      <title>{fullTitle}</title>
      {lcpImage && (
        <link rel="preload" href={lcpImage} as="image" />
      )}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />
      <meta name="author" content={author} />
      <meta name="robots" content={robotsContent} />

      <link rel="canonical" href={fullCanonical} />

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={displayOgTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Ancel Ajanga Portfolio" />

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={displayOgTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:creator" content="@ancel_ajanga" />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}
      {author && <meta property="article:author" content={author} />}

      <meta name="application-name" content="Ancel Ajanga Portfolio" />
      <meta name="apple-mobile-web-app-title" content="Ancel Ajanga" />
      <meta name="msapplication-TileColor" content="#0ea5a4" />
      <meta name="theme-color" content="#0ea5a4" />

      {jsonLd && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(Array.isArray(jsonLd) ? jsonLd : jsonLd),
          }}
        />
      )}
    </Head>
  )
}

export default SEOHead
