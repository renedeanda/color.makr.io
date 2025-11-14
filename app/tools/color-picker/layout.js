export const metadata = {
  title: 'Color Picker - HEX, RGB, HSL Color Selector',
  description: 'Advanced color picker tool with real-time conversion between HEX, RGB, HSL, and CMYK. Pick colors visually or enter values directly. Free online tool for designers and developers.',
  keywords: [
    'color picker',
    'hex color picker',
    'rgb color picker',
    'hsl color picker',
    'color selector',
    'color chooser',
    'online color picker',
    'color converter',
    'web color picker',
    'design tool'
  ],
  openGraph: {
    title: 'Color Picker - HEX, RGB, HSL Color Selector | Color.makr.io',
    description: 'Advanced color picker with real-time conversion between HEX, RGB, HSL, and CMYK color formats.',
    type: 'website',
    url: 'https://color.makr.io/tools/color-picker',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Color Picker Tool'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color Picker - HEX, RGB, HSL Color Selector',
    description: 'Advanced color picker with real-time conversion between color formats',
    images: ['/og-image.png']
  },
  alternates: {
    canonical: 'https://color.makr.io/tools/color-picker'
  }
}

export default function ColorPickerLayout({ children }) {
  return children
}
