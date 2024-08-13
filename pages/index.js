
import Head from 'next/head'
import ColorExplorer from '../components/ColorExplorer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>Color Explorer: Advanced Palette Generator for Designers & Developers</title>
        <meta name="description" content="Explore, generate, and analyze color palettes with our comprehensive color tool. Features include color wheel, accessibility checker, color blindness simulator, and more. Perfect for designers and developers seeking inspiration and color harmony." />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
          <span className="mr-2" role="img" aria-label="Color palette">🎨</span>
          Color Explorer
          <span className="ml-2" role="img" aria-label="Rainbow">🌈</span>
        </h1>
        <p className="text-center mb-8 text-gray-600 dark:text-gray-400">
          Discover and analyze harmonious color palettes for your next project
        </p>
        <ColorExplorer />
      </main>
    </div>
  )
}
    