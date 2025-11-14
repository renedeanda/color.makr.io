import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { getColorByName, getSimilarColors, namedColors } from '@/lib/namedColors'
import {
  hexToRgb,
  hexToHsl,
  rgbToHsv,
  getTextColor,
  getComplementary,
  getAnalogous,
  getTriadic,
  generateTints,
  generateShades
} from '@/lib/colorUtils'
import { getContrastRatio } from '@/lib/contrastUtils'
import Link from 'next/link'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  return namedColors.map((color) => ({
    name: color.name,
  }))
}

export async function generateMetadata({ params }) {
  const colorData = getColorByName(params.name)

  if (!colorData) {
    return {
      title: 'Color Not Found'
    }
  }

  return {
    title: `${colorData.name.charAt(0).toUpperCase() + colorData.name.slice(1)} (${colorData.hex}) - Color Information`,
    description: `Complete information about ${colorData.name} color: HEX ${colorData.hex}, RGB, HSL, HSV values, complementary colors, and more.`,
  }
}

export default function ColorPage({ params }) {
  const colorData = getColorByName(params.name)

  if (!colorData) {
    notFound()
  }

  const { name, hex, category } = colorData
  const rgb = hexToRgb(hex)
  const hsl = hexToHsl(hex)
  const hsv = rgb ? rgbToHsv(rgb.r, rgb.g, rgb.b) : null

  const complementary = getComplementary(hex)
  const analogous = getAnalogous(hex)
  const triadic = getTriadic(hex)
  const tints = generateTints(hex, 5)
  const shades = generateShades(hex, 5)
  const similar = getSimilarColors(hex, 6).slice(1) // Exclude the color itself

  const contrastWhite = getContrastRatio(hex, '#FFFFFF')
  const contrastBlack = getContrastRatio(hex, '#000000')

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm">
        <Link href="/" className="text-purple-500 hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <Link href="/collections/named-colors" className="text-purple-500 hover:underline">Named Colors</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 dark:text-gray-400 capitalize">{name}</span>
      </div>

      {/* Hero Section */}
      <div className="mb-8">
        <div
          className="w-full h-64 rounded-2xl shadow-2xl border-8 border-white dark:border-gray-800 mb-6 flex items-center justify-center"
          style={{ backgroundColor: hex }}
        >
          <div className="text-center">
            <h1
              className="text-6xl font-bold capitalize mb-2"
              style={{ color: getTextColor(hex) }}
            >
              {name}
            </h1>
            <p
              className="text-3xl font-mono font-bold"
              style={{ color: getTextColor(hex) }}
            >
              {hex}
            </p>
          </div>
        </div>
        <div className="flex items-center justify-center space-x-4 text-sm">
          <span className="px-4 py-2 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 rounded-full capitalize">
            {category}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Color Values */}
        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Color Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="text-sm font-medium text-gray-500 mb-1">HEX</div>
                <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded font-mono font-bold">
                  {hex}
                </div>
              </div>

              {rgb && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">RGB</div>
                  <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded font-mono">
                    rgb({rgb.r}, {rgb.g}, {rgb.b})
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="text-center text-sm">
                      <div className="text-gray-500">R</div>
                      <div className="font-bold">{rgb.r}</div>
                    </div>
                    <div className="text-center text-sm">
                      <div className="text-gray-500">G</div>
                      <div className="font-bold">{rgb.g}</div>
                    </div>
                    <div className="text-center text-sm">
                      <div className="text-gray-500">B</div>
                      <div className="font-bold">{rgb.b}</div>
                    </div>
                  </div>
                </div>
              )}

              {hsl && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">HSL</div>
                  <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded font-mono">
                    hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                  </div>
                </div>
              )}

              {hsv && (
                <div>
                  <div className="text-sm font-medium text-gray-500 mb-1">HSV</div>
                  <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded font-mono">
                    hsv({hsv.h}, {hsv.s}%, {hsv.v}%)
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Contrast Ratios</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center justify-between">
                <span>vs White</span>
                <span className="font-bold">{contrastWhite.toFixed(2)}:1</span>
              </div>
              <div className="flex items-center justify-between">
                <span>vs Black</span>
                <span className="font-bold">{contrastBlack.toFixed(2)}:1</span>
              </div>
              <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded">
                <div className="text-sm">
                  <strong>Best text color:</strong>{' '}
                  {contrastWhite > contrastBlack ? 'White' : 'Black'}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Color Harmonies & Variations */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Complementary</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                <div className="flex-1 space-y-2">
                  <div
                    className="h-24 rounded-lg shadow"
                    style={{ backgroundColor: hex }}
                  />
                  <div className="text-center font-mono text-sm">{hex}</div>
                </div>
                <div className="flex-1 space-y-2">
                  <div
                    className="h-24 rounded-lg shadow"
                    style={{ backgroundColor: complementary }}
                  />
                  <div className="text-center font-mono text-sm">{complementary}</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Analogous</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                {analogous.map((color, idx) => (
                  <div key={idx} className="flex-1 space-y-2">
                    <div
                      className="h-24 rounded-lg shadow"
                      style={{ backgroundColor: color }}
                    />
                    <div className="text-center font-mono text-sm">{color}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Triadic</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex space-x-4">
                {triadic.map((color, idx) => (
                  <div key={idx} className="flex-1 space-y-2">
                    <div
                      className="h-24 rounded-lg shadow"
                      style={{ backgroundColor: color }}
                    />
                    <div className="text-center font-mono text-sm">{color}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Tints & Shades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <h4 className="text-sm font-semibold mb-3">Tints (Lighter)</h4>
                <div className="flex space-x-2">
                  {tints.map((color, idx) => (
                    <div
                      key={idx}
                      className="flex-1 h-16 rounded shadow"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>

              <div className="flex justify-center">
                <div
                  className="w-32 h-16 rounded shadow border-4 border-purple-500"
                  style={{ backgroundColor: hex }}
                  title={hex}
                />
              </div>

              <div>
                <h4 className="text-sm font-semibold mb-3">Shades (Darker)</h4>
                <div className="flex space-x-2">
                  {shades.map((color, idx) => (
                    <div
                      key={idx}
                      className="flex-1 h-16 rounded shadow"
                      style={{ backgroundColor: color }}
                      title={color}
                    />
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {similar.length > 0 && (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Similar Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
                  {similar.map((colorData, idx) => (
                    <Link key={idx} href={`/colors/${colorData.name}`}>
                      <div className="space-y-2 cursor-pointer color-swatch">
                        <div
                          className="aspect-square rounded-lg shadow"
                          style={{ backgroundColor: colorData.hex }}
                        />
                        <div className="text-xs text-center capitalize">{colorData.name}</div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Usage Examples */}
      <Card className="mt-8 glass">
        <CardHeader>
          <CardTitle>Usage Examples</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h4 className="font-semibold mb-2">CSS</h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`color: ${name};
color: ${hex};`}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">RGB</h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`color: rgb(${rgb?.r}, ${rgb?.g}, ${rgb?.b});`}
              </pre>
            </div>
            <div>
              <h4 className="font-semibold mb-2">HSL</h4>
              <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-sm overflow-x-auto">
{`color: hsl(${hsl?.h}, ${hsl?.s}%, ${hsl?.l}%);`}
              </pre>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
