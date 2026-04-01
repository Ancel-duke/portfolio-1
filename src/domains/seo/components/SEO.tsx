import React from 'react'
import SEOHead from './SEOHead'

type SEOProps = {
  title: string
  description: string
  canonicalUrl: string
  jsonLd?: object | object[]
  keywords?: string[]
  ogImage?: string
  ogTitle?: string
  noindex?: boolean
  nofollow?: boolean
}

export const SEO: React.FC<SEOProps> = ({
  title,
  description,
  canonicalUrl,
  jsonLd,
  keywords,
  ogImage,
  ogTitle,
  noindex,
  nofollow,
}) => {
  return (
    <SEOHead
      title={title}
      description={description}
      canonical={canonicalUrl}
      jsonLd={jsonLd}
      keywords={keywords}
      ogImage={ogImage}
      ogTitle={ogTitle}
      noindex={noindex}
      nofollow={nofollow}
    />
  )
}

export default SEO


