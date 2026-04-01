import React from 'react';

export interface StructuredDataProps {
  /** Single JSON-LD object or array of objects (multiple scripts rendered) */
  data: object | object[];
}

/**
 * Renders Schema.org JSON-LD structured data for E-A-T and crawlability.
 * Extends usage from SEOHead: use for additional/alternate schemas (e.g. SoftwareSourceCode).
 * Output is minified by the existing post-build minify-jsonld script.
 */
export const StructuredData: React.FC<StructuredDataProps> = ({ data }) => {
  const items = Array.isArray(data) ? data : [data];
  return (
    <>
      {items.filter(Boolean).map((item, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(item) }}
        />
      ))}
    </>
  );
};

export default StructuredData;
