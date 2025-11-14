export const metadata = {
  title: 'Palette Generator - Create Color Schemes & Harmonies',
  description: 'Generate beautiful color palettes instantly. Create complementary, triadic, and analogous color schemes. Export palettes as CSS, JSON, or SVG. Perfect for web design and branding.',
  keywords: [
    'palette generator',
    'color palette',
    'color scheme generator',
    'color harmony',
    'color combinations',
    'complementary colors',
    'triadic colors',
    'analogous colors',
    'color scheme creator',
    'design palette'
  ],
  openGraph: {
    title: 'Palette Generator - Create Color Schemes | Color.makr.io',
    description: 'Generate beautiful color palettes and harmonies instantly. Export in multiple formats.',
    type: 'website',
    url: 'https://color.makr.io/tools/palette-generator',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Palette Generator Tool'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Palette Generator - Create Color Schemes',
    description: 'Generate beautiful color palettes and harmonies instantly',
    images: ['/og-image.png']
  },
  alternates: {
    canonical: 'https://color.makr.io/tools/palette-generator'
  }
}

export default function PaletteGeneratorLayout({ children }) {
  return children
}
