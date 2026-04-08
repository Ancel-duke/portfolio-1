import React from 'react'
import Head from 'next/head'
import { SITE } from '@/shared/constants/site'

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
  title: SITE.name,
  description:
    'Ancel Ajanga: Software Engineer at Maxson Programming Limited. Fullstack systems in Narok and Nairobi, Kenya. Projects: Inkly, NestFi, LedgerX, Aegis, SignFlow, OpsFlow, EduManage. Resilient systems from UI to database.',
  canonical: SITE.url,
  ogImage: `${SITE.url}${SITE.profileImage}`,
  ogType: 'website',
  twitterCard: 'summary_large_image' as const,
  keywords: [
    'Narok software engineer',
    'Nairobi software architect',
    'Full-stack developer Kenya',
    'Full-stack developer East Africa',
    'Ancel Ajanga',
    'Security and AIOps',
    'Fullstack Engineer',
    'Frontend Architecture',
    'UI Engineering',
    'Interactive Systems',
    'Performance Optimization',
    'NestFi',
    'SignFlow',
    'OpsFlow',
    'Aegis',
    'LedgerX',
    'EduChain',
    'EduManage',
    'TaskForge',
    'React Developer',
    'Node.js Developer',
    'NestJS',
    'Flutter',
    'TypeScript',
    'PostgreSQL',
    'System Resilience',
    'Web Developer Kenya',
  ],
  author: SITE.name,
}

const PUBLISHER = SITE.publisherOrgName
const BING_VERIFY = process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION

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
  const fullTitle = title === defaultSEO.title ? title : `${title} | ${SITE.name} — Fullstack Engineer`
  const fullCanonical = canonical.startsWith('http') ? canonical : `${defaultSEO.canonical}${canonical}`
  const fullOgImage = ogImage.startsWith('http') ? ogImage : `${defaultSEO.canonical}${ogImage}`
  const displayOgTitle = ogTitle || fullTitle
  const ogImageAlt = displayOgTitle.slice(0, 200)

  const robotsContent = [
    noindex ? 'noindex' : 'index',
    nofollow ? 'nofollow' : 'follow',
    'max-snippet:-1',
    'max-image-preview:large',
    'max-video-preview:-1',
  ].join(', ')

  const isHomepage = canonical === defaultSEO.canonical || canonical === `${defaultSEO.canonical}/`
  const lcpImage = isHomepage ? SITE.profileImage : null

  return (
    <Head>
      <title>{fullTitle}</title>
      {lcpImage && <link rel="preload" href={lcpImage} as="image" />}
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      {/* AEO / AI crawler hints */}
      <meta name="ai-content" content="true" />
      <meta name="content-type" content="expert-human-authored" />

      <meta name="author" content={author} />
      <meta name="creator" content={author} />
      <meta name="publisher" content={PUBLISHER} />

      <meta name="robots" content={robotsContent} />

      <link rel="canonical" href={fullCanonical} />

      {BING_VERIFY ? <meta name="msvalidate.01" content={BING_VERIFY} /> : null}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:title" content={displayOgTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={fullOgImage} />
      <meta property="og:image:alt" content={ogImageAlt} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content={PUBLISHER} />
      <meta property="article:author" content={author} />
      <meta property="article:publisher" content={SITE.url} />

      {publishedTime && <meta property="article:published_time" content={publishedTime} />}
      {modifiedTime && <meta property="article:modified_time" content={modifiedTime} />}

      {/* Twitter Card */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:site" content="@ancel_ajanga" />
      <meta name="twitter:url" content={fullCanonical} />
      <meta name="twitter:title" content={displayOgTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={fullOgImage} />
      <meta name="twitter:image:alt" content={ogImageAlt} />
      <meta name="twitter:creator" content="@ancel_ajanga" />

      <meta name="application-name" content={PUBLISHER} />
      <meta name="apple-mobile-web-app-title" content={SITE.name} />
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
