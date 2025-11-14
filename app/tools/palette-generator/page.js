'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  getComplementary,
  getAnalogous,
  getTriadic,
  getTetradic,
  getSplitComplementary,
  getMonochromatic,
  getRandomColor,
  getTextColor
} from '@/lib/colorUtils'
import { savePalette, getSavedPalettes } from '@/lib/storage'
import Link from 'next/link'

const harmonyTypes = [
  { id: 'complementary', name: 'Complementary', description: '2 colors opposite on the color wheel' },
  { id: 'analogous', name: 'Analogous', description: '3 colors adjacent on the color wheel' },
  { id: 'triadic', name: 'Triadic', description: '3 colors evenly spaced on the color wheel' },
  { id: 'tetradic', name: 'Tetradic', description: '4 colors forming a rectangle on the color wheel' },
  { id: 'split-complementary', name: 'Split-Complementary', description: 'Base color + 2 adjacent to complement' },
  { id: 'monochromatic', name: 'Monochromatic', description: 'Variations of a single hue' }
]

export default function PaletteGeneratorPage() {
  const [baseColor, setBaseColor] = useState('#3B82F6')
  const [harmonyType, setHarmonyType] = useState('complementary')
  const [palette, setPalette] = useState([])
  const [locked, setLocked] = useState([])
  const [copied, setCopied] = useState(false)
  const [savedPalettes, setSavedPalettes] = useState([])

  useEffect(() => {
    generatePalette()
    setSavedPalettes(getSavedPalettes())
  }, [baseColor, harmonyType])

  const generatePalette = () => {
    let colors = []

    switch (harmonyType) {
      case 'complementary':
        colors = [baseColor, getComplementary(baseColor)]
        break
      case 'analogous':
        colors = getAnalogous(baseColor)
        break
      case 'triadic':
        colors = getTriadic(baseColor)
        break
      case 'tetradic':
        colors = getTetradic(baseColor)
        break
      case 'split-complementary':
        colors = getSplitComplementary(baseColor)
        break
      case 'monochromatic':
        colors = getMonochromatic(baseColor, 5)
        break
      default:
        colors = [baseColor]
    }

    setPalette(colors)
  }

  const regenerateUnlocked = () => {
    const newBaseColor = locked.includes(0) ? baseColor : getRandomColor()
    setBaseColor(newBaseColor)
  }

  const toggleLock = (index) => {
    setLocked(prev =>
      prev.includes(index) ? prev.filter(i => i !== index) : [...prev, index]
    )
  }

  const handleSavePalette = () => {
    const name = prompt('Enter a name for this palette:')
    if (name) {
      savePalette(palette, name)
      setSavedPalettes(getSavedPalettes())
    }
  }

  const copyAllColors = () => {
    const colorsText = palette.join(', ')
    navigator.clipboard.writeText(colorsText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyAsCSS = () => {
    const css = palette.map((color, i) => `  --color-${i + 1}: ${color};`).join('\n')
    const cssText = `:root {\n${css}\n}`
    navigator.clipboard.writeText(cssText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const copyAsArray = () => {
    const arrayText = JSON.stringify(palette, null, 2)
    navigator.clipboard.writeText(arrayText)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm">
        <Link href="/" className="text-purple-500 hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 dark:text-gray-400">Palette Generator</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">Palette Generator</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Generate harmonious color schemes using color theory principles
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
              <CardTitle>Harmony Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {harmonyTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setHarmonyType(type.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      harmonyType === type.id
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-semibold">{type.name}</div>
                    <div className={`text-sm ${harmonyType === type.id ? 'text-purple-100' : 'text-gray-500'}`}>
                      {type.description}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Export</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={copyAllColors} variant="outline" className="w-full">
                {copied ? '✓ Copied!' : 'Copy Colors'}
              </Button>
              <Button onClick={copyAsCSS} variant="outline" className="w-full">
                Copy as CSS
              </Button>
              <Button onClick={copyAsArray} variant="outline" className="w-full">
                Copy as JSON
              </Button>
              <Button onClick={handleSavePalette} variant="default" className="w-full">
                Save Palette
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Palette Display */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass">
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle>Generated Palette</CardTitle>
                <Button onClick={regenerateUnlocked} size="sm">
                  Regenerate
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {palette.map((color, index) => (
                  <div key={index} className="space-y-2">
                    <div
                      className="relative h-32 rounded-lg shadow-lg border-4 border-white dark:border-gray-800 color-swatch group"
                      style={{ backgroundColor: color }}
                    >
                      <button
                        onClick={() => toggleLock(index)}
                        className="absolute top-2 right-2 w-8 h-8 bg-white dark:bg-gray-800 rounded-full shadow-lg flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        {locked.includes(index) ? '🔒' : '🔓'}
                      </button>
                      <div
                        className="absolute bottom-2 left-2 px-2 py-1 rounded text-sm font-mono"
                        style={{
                          backgroundColor: color,
                          color: getTextColor(color)
                        }}
                      >
                        {color}
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(color)
                        setCopied(true)
                        setTimeout(() => setCopied(false), 2000)
                      }}
                      className="w-full text-center text-sm text-purple-500 hover:text-purple-600 font-medium"
                    >
                      Copy
                    </button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Saved Palettes */}
          {savedPalettes.length > 0 && (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Saved Palettes</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {savedPalettes.slice(0, 5).map((saved) => (
                    <div key={saved.id} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{saved.name}</span>
                        <button
                          onClick={() => {
                            if (saved.colors.length > 0) {
                              setBaseColor(saved.colors[0])
                            }
                          }}
                          className="text-sm text-purple-500 hover:text-purple-600"
                        >
                          Load
                        </button>
                      </div>
                      <div className="flex space-x-2">
                        {saved.colors.map((color, idx) => (
                          <div
                            key={idx}
                            className="flex-1 h-12 rounded-lg"
                            style={{ backgroundColor: color }}
                            title={color}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Info */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Color Harmony Guide</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Color harmony creates pleasing combinations by following color theory principles:
              </p>
              <ul>
                <li><strong>Complementary:</strong> Maximum contrast, energetic combinations</li>
                <li><strong>Analogous:</strong> Harmonious, often found in nature</li>
                <li><strong>Triadic:</strong> Vibrant, balanced, high contrast</li>
                <li><strong>Tetradic:</strong> Rich combinations with lots of possibilities</li>
                <li><strong>Split-Complementary:</strong> Similar to complementary but less tension</li>
                <li><strong>Monochromatic:</strong> Elegant, cohesive with subtle variations</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

