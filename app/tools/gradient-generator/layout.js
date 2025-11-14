export const metadata = {
  title: 'Gradient Generator - CSS Gradient Maker',
  description: 'Create stunning linear and radial gradients with our visual gradient generator. Customize colors, angles, and positions. Copy CSS code instantly. Free gradient maker tool.',
  keywords: [
    'gradient generator',
    'css gradient',
    'gradient maker',
    'linear gradient',
    'radial gradient',
    'gradient tool',
    'css gradient generator',
    'gradient creator',
    'color gradient',
    'web gradient'
  ],
  openGraph: {
    title: 'Gradient Generator - CSS Gradient Maker | Color.makr.io',
    description: 'Create stunning linear and radial gradients. Copy CSS code instantly.',
    type: 'website',
    url: 'https://color.makr.io/tools/gradient-generator',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Gradient Generator Tool'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gradient Generator - CSS Gradient Maker',
    description: 'Create stunning linear and radial gradients with CSS',
    images: ['/og-image.png']
  },
  alternates: {
    canonical: 'https://color.makr.io/tools/gradient-generator'
  }
}

export default function GradientGeneratorLayout({ children }) {
  return children
}
