export const metadata = {
  title: 'Image Color Extractor - Extract Palette from Images',
  description: 'Extract color palettes from any image. Upload photos and get dominant colors with HEX codes. Perfect for creating color schemes from inspiration images.',
  keywords: [
    'image color extractor',
    'color from image',
    'extract colors',
    'image palette',
    'color picker from image',
    'photo color extractor',
    'dominant colors',
    'image color palette',
    'color from photo',
    'palette from image'
  ],
  openGraph: {
    title: 'Image Color Extractor - Extract Palette from Images | Color.makr.io',
    description: 'Extract color palettes from any image. Get dominant colors with HEX codes instantly.',
    type: 'website',
    url: 'https://color.makr.io/tools/image-extractor',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Image Color Extractor'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Image Color Extractor - Extract Palette from Images',
    description: 'Extract color palettes from images instantly',
    images: ['/og-image.png']
  },
  alternates: {
    canonical: 'https://color.makr.io/tools/image-extractor'
  }
}

export default function ImageExtractorLayout({ children }) {
  return children
}
