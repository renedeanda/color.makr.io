'use client'

import { useState, useEffect } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { hexToRgb, rgbToHsl, rgbToHsv, rgbToHex, hslToRgb, hsvToRgb, getTextColor } from '@/lib/colorUtils'
import { saveColor, addToHistory, getSavedColors, getColorHistory } from '@/lib/storage'
import Link from 'next/link'

export default function ColorPickerPage() {
  const [color, setColor] = useState('#3B82F6')
  const [format, setFormat] = useState('hex')
  const [copied, setCopied] = useState(false)
  const [savedColors, setSavedColors] = useState([])
  const [history, setHistory] = useState([])

  useEffect(() => {
    setSavedColors(getSavedColors())
    setHistory(getColorHistory())
  }, [])

  const handleColorChange = (newColor) => {
    setColor(newColor)
    addToHistory(newColor)
    setHistory(getColorHistory())
  }

  const handleSaveColor = () => {
    saveColor(color)
    setSavedColors(getSavedColors())
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const rgb = hexToRgb(color)
  const hsl = rgb ? rgbToHsl(rgb.r, rgb.g, rgb.b) : null
  const hsv = rgb ? rgbToHsv(rgb.r, rgb.g, rgb.b) : null

  const getFormattedColor = () => {
    if (format === 'hex') return color
    if (format === 'rgb' && rgb) return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`
    if (format === 'hsl' && hsl) return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`
    if (format === 'hsv' && hsv) return `hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`
    return color
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm">
        <Link href="/" className="text-purple-500 hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 dark:text-gray-400">Color Picker & Converter</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">Color Picker & Converter</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Pick colors and convert between HEX, RGB, HSL, and HSV formats instantly
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Main Color Picker */}
        <Card className="glass">
          <CardHeader>
            <CardTitle>Pick a Color</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col space-y-6">
              {/* Color Preview */}
              <div
                className="w-full h-48 rounded-lg shadow-lg border-4 border-white dark:border-gray-800 transition-all"
                style={{ backgroundColor: color }}
              />

              {/* Color Input */}
              <div className="flex items-center space-x-4">
                <input
                  type="color"
                  value={color}
                  onChange={(e) => handleColorChange(e.target.value)}
                  className="w-16 h-16 rounded-lg cursor-pointer border-2 border-gray-300 dark:border-gray-600"
                />
                <div className="flex-1">
                  <label className="block text-sm font-medium mb-2">HEX Code</label>
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => {
                      const val = e.target.value
                      if (/^#[0-9A-F]{0,6}$/i.test(val)) {
                        setColor(val)
                        if (val.length === 7) {
                          handleColorChange(val)
                        }
                      }
                    }}
                    className="w-full px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-purple-500 focus:outline-none"
                    placeholder="#3B82F6"
                  />
                </div>
              </div>

              {/* Format Selector */}
              <div>
                <label className="block text-sm font-medium mb-2">Export Format</label>
                <div className="flex space-x-2">
                  {['hex', 'rgb', 'hsl', 'hsv'].map((fmt) => (
                    <button
                      key={fmt}
                      onClick={() => setFormat(fmt)}
                      className={`px-4 py-2 rounded-lg font-medium transition-all ${
                        format === fmt
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600'
                      }`}
                    >
                      {fmt.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Copy Value */}
              <div className="flex space-x-2">
                <input
                  type="text"
                  value={getFormattedColor()}
                  readOnly
                  className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-gray-100 dark:bg-gray-800 font-mono"
                />
                <Button
                  onClick={() => copyToClipboard(getFormattedColor())}
                  className={copied ? 'copy-success' : ''}
                >
                  {copied ? '✓ Copied!' : 'Copy'}
                </Button>
              </div>

              {/* Actions */}
              <div className="flex space-x-2">
                <Button onClick={handleSaveColor} variant="outline" className="flex-1">
                  Save Color
                </Button>
                <Button
                  onClick={() => {
                    const randomColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0')
                    handleColorChange(randomColor)
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Random
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Color Values */}
        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Color Values</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium">HEX</span>
                  <button
                    onClick={() => copyToClipboard(color)}
                    className="text-purple-500 hover:text-purple-600 text-sm"
                  >
                    Copy
                  </button>
                </div>
                <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded font-mono">
                  {color}
                </div>
              </div>

              {rgb && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">RGB</span>
                    <button
                      onClick={() => copyToClipboard(`rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`)}
                      className="text-purple-500 hover:text-purple-600 text-sm"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded font-mono">
                    rgb({rgb.r}, {rgb.g}, {rgb.b})
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">R</div>
                      <div className="font-bold">{rgb.r}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">G</div>
                      <div className="font-bold">{rgb.g}</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">B</div>
                      <div className="font-bold">{rgb.b}</div>
                    </div>
                  </div>
                </div>
              )}

              {hsl && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">HSL</span>
                    <button
                      onClick={() => copyToClipboard(`hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`)}
                      className="text-purple-500 hover:text-purple-600 text-sm"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded font-mono">
                    hsl({hsl.h}, {hsl.s}%, {hsl.l}%)
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">H</div>
                      <div className="font-bold">{hsl.h}°</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">S</div>
                      <div className="font-bold">{hsl.s}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">L</div>
                      <div className="font-bold">{hsl.l}%</div>
                    </div>
                  </div>
                </div>
              )}

              {hsv && (
                <div>
                  <div className="flex justify-between items-center mb-2">
                    <span className="font-medium">HSV</span>
                    <button
                      onClick={() => copyToClipboard(`hsv(${hsv.h}, ${hsv.s}%, ${hsv.v}%)`)}
                      className="text-purple-500 hover:text-purple-600 text-sm"
                    >
                      Copy
                    </button>
                  </div>
                  <div className="px-4 py-2 bg-gray-100 dark:bg-gray-800 rounded font-mono">
                    hsv({hsv.h}, {hsv.s}%, {hsv.v}%)
                  </div>
                  <div className="grid grid-cols-3 gap-2 mt-2">
                    <div className="text-center">
                      <div className="text-sm text-gray-500">H</div>
                      <div className="font-bold">{hsv.h}°</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">S</div>
                      <div className="font-bold">{hsv.s}%</div>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-gray-500">V</div>
                      <div className="font-bold">{hsv.v}%</div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Saved Colors */}
          {savedColors.length > 0 && (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Saved Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {savedColors.slice(0, 10).map((savedColor, idx) => (
                    <button
                      key={idx}
                      onClick={() => handleColorChange(savedColor)}
                      className="color-swatch w-12 h-12 rounded-lg border-2 border-white dark:border-gray-800 shadow"
                      style={{ backgroundColor: savedColor }}
                      title={savedColor}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Recent Colors */}
          {history.length > 0 && (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Recent Colors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {history.slice(0, 10).map((histColor, idx) => (
                    <button
                      key={idx}
                      onClick={() => setColor(histColor)}
                      className="color-swatch w-12 h-12 rounded-lg border-2 border-white dark:border-gray-800 shadow"
                      style={{ backgroundColor: histColor }}
                      title={histColor}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Instructions */}
      <Card className="mt-8 glass">
        <CardHeader>
          <CardTitle>How to Use</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <ol>
            <li>Click the color picker or enter a HEX code to select your color</li>
            <li>View the color in different formats: HEX, RGB, HSL, and HSV</li>
            <li>Choose your preferred format and click &quot;Copy&quot; to copy the code</li>
            <li>Save colors for quick access later</li>
            <li>Recent colors are automatically tracked for your convenience</li>
          </ol>
        </CardContent>
      </Card>
    </div>
  )
}

