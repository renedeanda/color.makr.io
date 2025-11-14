export const metadata = {
  title: 'Contrast Checker - WCAG Accessibility Tool',
  description: 'Check color contrast ratios for WCAG AA and AAA compliance. Ensure your designs are accessible with our contrast checker. Real-time accessibility testing for text and backgrounds.',
  keywords: [
    'contrast checker',
    'wcag contrast',
    'color contrast',
    'accessibility checker',
    'wcag compliance',
    'contrast ratio',
    'accessibility tool',
    'wcag aa',
    'wcag aaa',
    'color accessibility'
  ],
  openGraph: {
    title: 'Contrast Checker - WCAG Accessibility Tool | Color.makr.io',
    description: 'Check color contrast ratios for WCAG AA and AAA compliance. Ensure accessible designs.',
    type: 'website',
    url: 'https://color.makr.io/tools/contrast-checker',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Contrast Checker Tool'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Contrast Checker - WCAG Accessibility Tool',
    description: 'Check color contrast ratios for WCAG compliance',
    images: ['/og-image.png']
  },
  alternates: {
    canonical: 'https://color.makr.io/tools/contrast-checker'
  }
}

export default function ContrastCheckerLayout({ children }) {
  return children
}
