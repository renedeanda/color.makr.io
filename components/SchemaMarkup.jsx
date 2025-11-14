'use client'

export default function SchemaMarkup() {
  const schemaData = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'Color.makr.io',
    applicationCategory: 'DesignApplication',
    operatingSystem: 'Any',
    description: 'Professional color tools suite for designers and developers including color picker, palette generator, gradient creator, contrast checker, and accessibility tools.',
    url: 'https://color.makr.io',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD'
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1'
    },
    author: {
      '@type': 'Person',
      name: 'René DeAnda',
      url: 'https://renedeanda.com'
    },
    publisher: {
      '@type': 'Organization',
      name: 'Makr.io',
      url: 'https://makr.io'
    },
    featureList: [
      'Color Picker & Converter',
      'Palette Generator',
      'Gradient Generator',
      'Contrast Checker',
      'Color Blindness Simulator',
      'Shade & Tint Generator',
      'Color Harmony Tools',
      'Accessibility Testing'
    ],
    browserRequirements: 'Requires JavaScript. Requires HTML5.',
    softwareVersion: '2.0',
    screenshot: 'https://color.makr.io/og-image.png'
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
    />
  )
}
