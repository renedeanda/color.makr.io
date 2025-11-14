'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  generateTints,
  generateShades,
  generateShadeScale,
  getRandomColor,
  getTextColor
} from '@/lib/colorUtils'
import Link from 'next/link'

export default function ShadeGeneratorPage() {
  const [baseColor, setBaseColor] = useState('#3B82F6')
  const [steps, setSteps] = useState(5)
  const [mode, setMode] = useState('both') // both, tints, shades, scale
  const [copied, setCopied] = useState('')

  const tints = generateTints(baseColor, steps)
  const shades = generateShades(baseColor, steps)
  const scale = generateShadeScale(baseColor)

  const copyColor = (color) => {
    navigator.clipboard.writeText(color)
    setCopied(color)
    setTimeout(() => setCopied(''), 2000)
  }

  const copyAllAsCSS = () => {
    let css = ':root {\n'
    if (mode === 'scale') {
      scale.forEach(s => {
        css += `  --color-${s.scale}: ${s.color};\n`
      })
    } else {
      if (mode === 'both' || mode === 'tints') {
        tints.forEach((color, i) => {
          css += `  --tint-${i + 1}: ${color};\n`
        })
      }
      css += `  --base: ${baseColor};\n`
      if (mode === 'both' || mode === 'shades') {
        shades.forEach((color, i) => {
          css += `  --shade-${i + 1}: ${color};\n`
        })
      }
    }
    css += '}'
    navigator.clipboard.writeText(css)
    setCopied('CSS')
    setTimeout(() => setCopied(''), 2000)
  }

  const copyAllAsArray = () => {
    let colors = []
    if (mode === 'scale') {
      colors = scale.map(s => s.color)
    } else {
      if (mode === 'both' || mode === 'tints') {
        colors = [...tints.reverse()]
      }
      colors.push(baseColor)
      if (mode === 'both' || mode === 'shades') {
        colors = [...colors, ...shades]
      }
    }
    navigator.clipboard.writeText(JSON.stringify(colors, null, 2))
    setCopied('Array')
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm">
        <Link href="/" className="text-purple-500 hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 dark:text-gray-400">Shade & Tint Generator</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">Shade & Tint Generator</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Generate lighter tints and darker shades of any color with precision control
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Base Color</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="w-full h-24 rounded-lg shadow-lg border-4 border-white dark:border-gray-800"
                  style={{ backgroundColor: baseColor }}
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={baseColor}
                    onChange={(e) => setBaseColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2"
                  />
                  <input
                    type="text"
                    value={baseColor}
                    onChange={(e) => {
                      const val = e.target.value
                      if (/^#[0-9A-F]{0,6}$/i.test(val)) {
                        setBaseColor(val)
                      }
                    }}
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono"
                  />
                </div>
                <Button
                  onClick={() => setBaseColor(getRandomColor())}
                  variant="outline"
                  className="w-full"
                >
                  Random Color
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {[
                { id: 'both', name: 'Tints & Shades' },
                { id: 'tints', name: 'Tints Only' },
                { id: 'shades', name: 'Shades Only' },
                { id: 'scale', name: 'Tailwind Scale (50-950)' }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${
                    mode === m.id
                      ? 'bg-purple-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                >
                  {m.name}
                </button>
              ))}
            </CardContent>
          </Card>

          {mode !== 'scale' && (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Steps</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Number of variations: {steps}
                  </label>
                  <input
                    type="range"
                    min="3"
                    max="10"
                    value={steps}
                    onChange={(e) => setSteps(parseInt(e.target.value))}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="glass">
            <CardHeader>
              <CardTitle>Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={copyAllAsCSS} variant="outline" className="w-full">
                {copied === 'CSS' ? '✓ Copied!' : 'Copy as CSS'}
              </Button>
              <Button onClick={copyAllAsArray} variant="outline" className="w-full">
                {copied === 'Array' ? '✓ Copied!' : 'Copy as JSON'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Color Swatches */}
        <div className="lg:col-span-2 space-y-6">
          {mode === 'scale' ? (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Tailwind-Style Color Scale</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {scale.map((item) => (
                    <div key={item.scale} className="flex items-center space-x-2">
                      <div className="w-20 text-center font-bold text-sm">
                        {item.scale}
                      </div>
                      <div
                        className="flex-1 h-16 rounded-lg shadow color-swatch flex items-center justify-between px-4 cursor-pointer"
                        style={{ backgroundColor: item.color }}
                        onClick={() => copyColor(item.color)}
                      >
                        <span
                          className="font-mono text-sm font-bold"
                          style={{ color: getTextColor(item.color) }}
                        >
                          {item.color}
                        </span>
                        {copied === item.color && (
                          <span
                            className="text-sm font-semibold"
                            style={{ color: getTextColor(item.color) }}
                          >
                            ✓ Copied!
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ) : (
            <>
              {(mode === 'both' || mode === 'tints') && (
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Tints (Lighter)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {tints.map((color, index) => (
                        <div
                          key={index}
                          className="h-16 rounded-lg shadow color-swatch flex items-center justify-between px-4 cursor-pointer"
                          style={{ backgroundColor: color }}
                          onClick={() => copyColor(color)}
                        >
                          <span
                            className="font-mono text-sm font-bold"
                            style={{ color: getTextColor(color) }}
                          >
                            {color}
                          </span>
                          {copied === color && (
                            <span
                              className="text-sm font-semibold"
                              style={{ color: getTextColor(color) }}
                            >
                              ✓ Copied!
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}

              <Card className="glass">
                <CardHeader>
                  <CardTitle>Base Color</CardTitle>
                </CardHeader>
                <CardContent>
                  <div
                    className="h-20 rounded-lg shadow-lg color-swatch flex items-center justify-between px-4 cursor-pointer border-4 border-purple-500"
                    style={{ backgroundColor: baseColor }}
                    onClick={() => copyColor(baseColor)}
                  >
                    <span
                      className="font-mono text-lg font-bold"
                      style={{ color: getTextColor(baseColor) }}
                    >
                      {baseColor}
                    </span>
                    {copied === baseColor && (
                      <span
                        className="text-sm font-semibold"
                        style={{ color: getTextColor(baseColor) }}
                      >
                        ✓ Copied!
                      </span>
                    )}
                  </div>
                </CardContent>
              </Card>

              {(mode === 'both' || mode === 'shades') && (
                <Card className="glass">
                  <CardHeader>
                    <CardTitle>Shades (Darker)</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {shades.map((color, index) => (
                        <div
                          key={index}
                          className="h-16 rounded-lg shadow color-swatch flex items-center justify-between px-4 cursor-pointer"
                          style={{ backgroundColor: color }}
                          onClick={() => copyColor(color)}
                        >
                          <span
                            className="font-mono text-sm font-bold"
                            style={{ color: getTextColor(color) }}
                          >
                            {color}
                          </span>
                          {copied === color && (
                            <span
                              className="text-sm font-semibold"
                              style={{ color: getTextColor(color) }}
                            >
                              ✓ Copied!
                            </span>
                          )}
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
            </>
          )}

          <Card className="glass">
            <CardHeader>
              <CardTitle>Usage Tips</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <ul>
                <li><strong>Tints:</strong> Add white to create lighter variations</li>
                <li><strong>Shades:</strong> Add black to create darker variations</li>
                <li><strong>Tailwind Scale:</strong> Generate a complete color scale like Tailwind CSS</li>
                <li>Click any color to copy its hex code</li>
                <li>Use the export buttons to copy all colors as CSS or JSON</li>
                <li>Perfect for creating consistent color systems</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

