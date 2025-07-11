'use client';

import Script from 'next/script';

interface StructuredDataProps {
  type: 'organization' | 'article' | 'website';
  data: any;
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': type === 'organization' ? 'Organization' : type === 'article' ? 'Article' : 'WebSite',
    ...data,
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  );
} 