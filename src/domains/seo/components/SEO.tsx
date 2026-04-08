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
  /** Default `website`. Use `article` for long-form / detail URLs only. */
  ogType?: string
  publishedTime?: string
  modifiedTime?: string
  author?: string
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
  ogType,
  publishedTime,
  modifiedTime,
  author,
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
      ogType={ogType}
      publishedTime={publishedTime}
      modifiedTime={modifiedTime}
      author={author}
      noindex={noindex}
      nofollow={nofollow}
    />
  )
}

export default SEO


