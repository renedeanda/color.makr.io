export const metadata = {
  title: 'Named Colors - CSS Color Names & Hex Codes',
  description: 'Browse 140+ CSS named colors with hex codes, RGB values, and color categories. Click any color for detailed information, harmonies, and variations.',
  keywords: [
    'css named colors',
    'css color names',
    'html color names',
    'web colors',
    'color names',
    'css colors',
    'color keywords',
    'named color codes',
    'web safe colors',
    'css color reference'
  ],
  openGraph: {
    title: 'Named Colors - CSS Color Names & Hex Codes | Color.makr.io',
    description: 'Browse 140+ CSS named colors with hex codes and RGB values. Complete reference for web designers and developers.',
    type: 'website',
    url: 'https://color.makr.io/collections/named-colors',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Named Colors Collection'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Named Colors - CSS Color Names & Hex Codes',
    description: 'Browse 140+ CSS named colors with hex codes and RGB values',
    images: ['/og-image.png']
  },
  alternates: {
    canonical: 'https://color.makr.io/collections/named-colors'
  }
}

export default function NamedColorsLayout({ children }) {
  return children
}
