export const metadata = {
  title: 'Color Blindness Simulator - Accessibility Testing',
  description: 'Simulate color blindness (protanopia, deuteranopia, tritanopia) to test design accessibility. See how your colors appear to users with color vision deficiency.',
  keywords: [
    'color blindness simulator',
    'color blind test',
    'protanopia',
    'deuteranopia',
    'tritanopia',
    'color vision deficiency',
    'accessibility testing',
    'colorblind simulator',
    'accessible design',
    'color accessibility'
  ],
  openGraph: {
    title: 'Color Blindness Simulator - Accessibility Testing | Color.makr.io',
    description: 'Test your designs for color blindness accessibility. Simulate protanopia, deuteranopia, and tritanopia.',
    type: 'website',
    url: 'https://color.makr.io/tools/color-blindness',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Color Blindness Simulator'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Blindness Simulator - Accessibility Testing',
    description: 'Test designs for color blindness accessibility',
    images: ['/og-image.png']
  },
  alternates: {
    canonical: 'https://color.makr.io/tools/color-blindness'
  }
}

export default function ColorBlindnessLayout({ children }) {
  return children
}
