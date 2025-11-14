import './globals.css'
import Footer from '@/components/Footer'

export const metadata = {
  metadataBase: new URL('https://color.makr.io'),
  title: {
    default: 'Color.makr.io - Free Color Tools for Designers & Developers',
    template: '%s | Color.makr.io'
  },
  description: 'Free online color tools including color picker, palette generator, gradient creator, contrast checker, and more. Perfect for designers and developers seeking color inspiration and accessibility.',
  keywords: [
    'color picker',
    'color converter',
    'palette generator',
    'gradient generator',
    'hex to rgb',
    'color tools',
    'design tools',
    'color harmony',
    'contrast checker',
    'wcag contrast',
    'color blindness simulator',
    'shade generator',
    'tint generator',
    'color accessibility',
    'color theory',
    'web design tools',
    'color scheme generator'
  ],
  authors: [{ name: 'René DeAnda', url: 'https://renedeanda.com' }],
  creator: 'René DeAnda',
  publisher: 'Makr.io',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://color.makr.io',
    siteName: 'Color.makr.io',
    title: 'Color.makr.io - Free Color Tools for Designers & Developers',
    description: 'Professional color tools for designers and developers. Generate palettes, check contrast, simulate color blindness, and more.',
    images: [{
      url: '/og-image.png',
      width: 1200,
      height: 630,
      alt: 'Color.makr.io - Professional Color Tools'
    }]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Color.makr.io - Free Color Tools',
    description: 'Professional color tools for designers and developers',
    images: ['/og-image.png'],
    creator: '@renedeanda'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.svg',
    apple: '/icon-192.png',
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' }
  ],
  category: 'technology',
  alternates: {
    canonical: 'https://color.makr.io',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head />
      <body className="min-h-screen mesh-gradient font-sans">
        <div className="min-h-screen backdrop-blur-3xl flex flex-col">
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
