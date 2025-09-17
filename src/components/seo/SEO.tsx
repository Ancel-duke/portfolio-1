import React from 'react'
import SEOHead from './SEOHead'

type SEOProps = {
  title: string
  description: string
  canonicalUrl: string
  jsonLd?: object | object[]
}

export const SEO: React.FC<SEOProps> = ({ title, description, canonicalUrl, jsonLd }) => {
  return (
    <SEOHead
      title={title}
      description={description}
      canonical={canonicalUrl}
      jsonLd={jsonLd}
    />
  )
}

export default SEO


