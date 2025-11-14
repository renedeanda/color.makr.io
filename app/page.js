import Link from 'next/link'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import SchemaMarkup from '@/components/SchemaMarkup'

const tools = [
  {
    name: 'Color Picker & Converter',
    description: 'Pick colors and convert between HEX, RGB, HSL, and HSV formats instantly',
    href: '/tools/color-picker',
    icon: '🎨',
    gradient: 'from-pink-500 to-rose-500'
  },
  {
    name: 'Palette Generator',
    description: 'Generate harmonious color schemes with complementary, analogous, and triadic options',
    href: '/tools/palette-generator',
    icon: '🌈',
    gradient: 'from-purple-500 to-indigo-500'
  },
  {
    name: 'Gradient Generator',
    description: 'Create beautiful CSS gradients with multiple color stops and directions',
    href: '/tools/gradient-generator',
    icon: '🎭',
    gradient: 'from-blue-500 to-cyan-500'
  },
  {
    name: 'Contrast Checker',
    description: 'Check WCAG contrast ratios for accessibility compliance (AA & AAA standards)',
    href: '/tools/contrast-checker',
    icon: '♿',
    gradient: 'from-green-500 to-emerald-500'
  },
  {
    name: 'Color Blindness Simulator',
    description: 'Simulate how your colors appear with different types of color blindness',
    href: '/tools/color-blindness',
    icon: '👁️',
    gradient: 'from-yellow-500 to-orange-500'
  },
  {
    name: 'Shade & Tint Generator',
    description: 'Generate lighter and darker variations of any color with precision control',
    href: '/tools/shade-generator',
    icon: '🎨',
    gradient: 'from-red-500 to-pink-500'
  }
]

const features = [
  {
    title: 'Free Forever',
    description: 'All tools are completely free with no limitations or sign-up required',
    icon: '💝'
  },
  {
    title: 'Offline Support',
    description: 'Install as a PWA and use all tools without an internet connection',
    icon: '📱'
  },
  {
    title: 'Privacy First',
    description: 'Everything runs in your browser. No data is sent to our servers',
    icon: '🔒'
  },
  {
    title: 'Accessibility',
    description: 'Built with WCAG guidelines in mind to ensure everyone can use our tools',
    icon: '♿'
  }
]

export default function Home() {
  return (
    <>
      <SchemaMarkup />
      <div className="container mx-auto px-4 py-8 md:py-16">
        {/* Hero Section */}
        <section className="text-center mb-16 md:mb-24">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 bg-clip-text text-transparent">
            Color Tools Suite
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
            Professional color tools for designers and developers. Generate palettes, check contrast,
            simulate color blindness, and more — all free and offline-capable.
          </p>
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            <Link
              href="/tools/color-picker"
              className="px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white rounded-lg font-semibold hover:shadow-lg transition-all hover:scale-105"
            >
              Get Started
            </Link>
            <a
              href="#tools"
              className="px-8 py-3 glass text-gray-900 dark:text-white rounded-lg font-semibold hover:shadow-lg transition-all"
            >
              Explore Tools
            </a>
          </div>
        </section>

        {/* Tools Grid */}
        <section id="tools" className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            All Tools
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tools.map((tool) => (
              <Link key={tool.href} href={tool.href}>
                <Card className="tool-card h-full glass hover:shadow-2xl border-2">
                  <CardHeader>
                    <div className={`text-5xl mb-4 bg-gradient-to-br ${tool.gradient} p-4 rounded-lg inline-block`}>
                      {tool.icon}
                    </div>
                    <CardTitle className="text-2xl mb-2">{tool.name}</CardTitle>
                    <CardDescription className="text-base">
                      {tool.description}
                    </CardDescription>
                  </CardHeader>
                </Card>
              </Link>
            ))}
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-16 md:mb-24">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Why Choose Color.makr.io?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} className="glass text-center">
                <CardHeader>
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl mb-2">{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </section>

        {/* About Section */}
        <section className="text-center max-w-4xl mx-auto mb-16">
          <h2 className="text-3xl font-bold mb-6">About Color.makr.io</h2>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Color.makr.io is a comprehensive suite of color tools designed for designers, developers,
            and anyone working with colors. All tools are free, work offline, and respect your privacy
            by running entirely in your browser.
          </p>
          <p className="text-lg text-gray-700 dark:text-gray-300 mb-6">
            Whether you&apos;re creating a brand identity, building a website, or checking accessibility
            compliance, we&apos;ve got you covered with professional-grade tools that are simple to use.
          </p>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Crafted with ❤️ by{' '}
            <a
              href="https://renedeanda.com/?utm_source=color.makr.io"
              className="text-purple-500 hover:text-purple-600 font-semibold hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              René DeAnda
            </a>
          </p>
        </section>

        {/* SEO Content */}
        <section className="max-w-4xl mx-auto prose dark:prose-invert">
          <h2>Understanding Color Tools</h2>
          <p>
            Color is fundamental to design and user experience. Our suite of tools helps you work with
            colors effectively, whether you&apos;re choosing a palette, ensuring accessibility, or
            converting between color formats.
          </p>

          <h3>Color Picker & Converter</h3>
          <p>
            Convert seamlessly between HEX, RGB, HSL, and HSV color formats. Our color picker makes
            it easy to select the perfect color and get the code you need in any format.
          </p>

          <h3>Palette Generation</h3>
          <p>
            Create harmonious color schemes using color theory principles. Generate complementary,
            analogous, triadic, tetradic, and split-complementary palettes automatically.
          </p>

          <h3>Accessibility & WCAG Compliance</h3>
          <p>
            Ensure your color choices meet WCAG 2.1 accessibility standards with our contrast checker.
            Test color combinations for AA and AAA compliance to make your designs accessible to everyone.
          </p>

          <h3>Color Blindness Awareness</h3>
          <p>
            Simulate different types of color blindness to ensure your designs are visible to all users.
            Test your palettes against protanopia, deuteranopia, tritanopia, and other conditions.
          </p>
        </section>
      </div>
    </>
  )
}
