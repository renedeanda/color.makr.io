export const metadata = {
  title: 'Brand Colors - Famous Brand Color Palettes',
  description: 'Explore color palettes from 40+ popular brands including Facebook, Google, Apple, Netflix, and more. Get hex codes, copy colors, and find design inspiration from world-famous brands.',
  keywords: [
    'brand colors',
    'brand color palettes',
    'brand identity colors',
    'company colors',
    'corporate colors',
    'logo colors',
    'brand hex codes',
    'famous brand colors',
    'design inspiration',
    'color branding'
  ],
  openGraph: {
    title: 'Brand Colors - Famous Brand Color Palettes | Color.makr.io',
    description: 'Explore color palettes from 40+ popular brands. Get hex codes and design inspiration from world-famous companies.',
    type: 'website',
    url: 'https://color.makr.io/collections/brand-colors',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Brand Colors Collection'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Brand Colors - Famous Brand Color Palettes',
    description: 'Explore color palettes from 40+ popular brands',
    images: ['/og-image.png']
  },
  alternates: {
    canonical: 'https://color.makr.io/collections/brand-colors'
  }
}

export default function BrandColorsLayout({ children }) {
  return children
}
