export const metadata = {
  title: 'Shade Generator - Tints, Shades & Tones Creator',
  description: 'Generate tints, shades, and tones from any color. Create complete color variations for design systems. Get lighter and darker variations instantly with HEX codes.',
  keywords: [
    'shade generator',
    'tint generator',
    'color shades',
    'color tints',
    'color tones',
    'color variations',
    'lighter colors',
    'darker colors',
    'color lightness',
    'design system colors'
  ],
  openGraph: {
    title: 'Shade Generator - Tints, Shades & Tones | Color.makr.io',
    description: 'Generate tints, shades, and tones from any color. Perfect for design systems.',
    type: 'website',
    url: 'https://color.makr.io/tools/shade-generator',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Shade Generator Tool'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Shade Generator - Tints, Shades & Tones',
    description: 'Generate color variations for design systems',
    images: ['/og-image.png']
  },
  alternates: {
    canonical: 'https://color.makr.io/tools/shade-generator'
  }
}

export default function ShadeGeneratorLayout({ children }) {
  return children
}
