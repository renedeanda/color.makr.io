'use client'

import { useState, useRef } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { rgbToHex, getTextColor } from '@/lib/colorUtils'
import Link from 'next/link'

export default function ImageExtractorPage() {
  const [image, setImage] = useState(null)
  const [colors, setColors] = useState([])
  const [copied, setCopied] = useState('')
  const [colorCount, setColorCount] = useState(5)
  const canvasRef = useRef(null)
  const fileInputRef = useRef(null)

  const extractColors = (img, count = 5) => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    canvas.width = img.width
    canvas.height = img.height
    ctx.drawImage(img, 0, 0)

    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
    const pixels = imageData.data

    // Color quantization using median cut algorithm (simplified)
    const colorMap = {}
    for (let i = 0; i < pixels.length; i += 4) {
      const r = pixels[i]
      const g = pixels[i + 1]
      const b = pixels[i + 2]
      const alpha = pixels[i + 3]

      // Skip transparent pixels
      if (alpha < 128) continue

      // Quantize colors to reduce variations
      const qr = Math.round(r / 10) * 10
      const qg = Math.round(g / 10) * 10
      const qb = Math.round(b / 10) * 10

      const key = `${qr},${qg},${qb}`
      colorMap[key] = (colorMap[key] || 0) + 1
    }

    // Sort by frequency and get top colors
    const sortedColors = Object.entries(colorMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, count)
      .map(([color, frequency]) => {
        const [r, g, b] = color.split(',').map(Number)
        return {
          hex: rgbToHex(r, g, b),
          rgb: { r, g, b },
          frequency,
          percentage: ((frequency / (pixels.length / 4)) * 100).toFixed(2)
        }
      })

    setColors(sortedColors)
  }

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    const reader = new FileReader()
    reader.onload = (event) => {
      const img = new Image()
      img.onload = () => {
        setImage(event.target?.result)
        extractColors(img, colorCount)
      }
      img.src = event.target?.result
    }
    reader.readAsDataURL(file)
  }

  const handlePaste = async () => {
    try {
      const clipboardItems = await navigator.clipboard.read()
      for (const item of clipboardItems) {
        for (const type of item.types) {
          if (type.startsWith('image/')) {
            const blob = await item.getType(type)
            const reader = new FileReader()
            reader.onload = (event) => {
              const img = new Image()
              img.onload = () => {
                setImage(event.target?.result)
                extractColors(img, colorCount)
              }
              img.src = event.target?.result
            }
            reader.readAsDataURL(blob)
            return
          }
        }
      }
    } catch (err) {
      alert('Failed to paste image. Please upload a file instead.')
    }
  }

  const copyColor = (hex) => {
    navigator.clipboard.writeText(hex)
    setCopied(hex)
    setTimeout(() => setCopied(''), 2000)
  }

  const copyAllColors = () => {
    const colorList = colors.map(c => c.hex).join(', ')
    navigator.clipboard.writeText(colorList)
    setCopied('all')
    setTimeout(() => setCopied(''), 2000)
  }

  const handleReextract = () => {
    if (image) {
      const img = new Image()
      img.onload = () => {
        extractColors(img, colorCount)
      }
      img.src = image
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm">
        <Link href="/" className="text-purple-500 hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 dark:text-gray-400">Image Color Extractor</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">Image Color Extractor</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Upload an image and extract its dominant colors
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upload & Controls */}
        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Upload Image</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="w-full"
              >
                Choose Image
              </Button>
              <Button
                onClick={handlePaste}
                variant="outline"
                className="w-full"
              >
                Paste from Clipboard
              </Button>
              <div className="text-xs text-gray-500 text-center">
                Supports JPG, PNG, GIF, WebP
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Number of Colors: {colorCount}
                </label>
                <input
                  type="range"
                  min="3"
                  max="12"
                  value={colorCount}
                  onChange={(e) => setColorCount(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              {image && (
                <Button
                  onClick={handleReextract}
                  variant="outline"
                  className="w-full"
                >
                  Re-extract Colors
                </Button>
              )}
            </CardContent>
          </Card>

          {colors.length > 0 && (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Export</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  onClick={copyAllColors}
                  variant="outline"
                  className="w-full"
                >
                  {copied === 'all' ? '✓ Copied!' : 'Copy All Colors'}
                </Button>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Preview & Results */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image Preview */}
          {image ? (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Image Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <img
                  src={image}
                  alt="Uploaded preview"
                  className="w-full h-auto max-h-96 object-contain rounded-lg"
                />
              </CardContent>
            </Card>
          ) : (
            <Card className="glass">
              <CardContent className="py-24">
                <div className="text-center text-gray-500">
                  <div className="text-6xl mb-4">🖼️</div>
                  <div className="text-xl font-semibold mb-2">No Image Uploaded</div>
                  <div className="text-sm">
                    Upload an image or paste from clipboard to extract colors
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Extracted Colors */}
          {colors.length > 0 && (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Extracted Colors</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {colors.map((colorData, idx) => (
                  <div
                    key={idx}
                    className="flex items-center space-x-4 cursor-pointer color-swatch p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800"
                    onClick={() => copyColor(colorData.hex)}
                  >
                    <div
                      className="w-20 h-20 rounded-lg shadow-lg border-4 border-white dark:border-gray-800 flex-shrink-0"
                      style={{ backgroundColor: colorData.hex }}
                    />
                    <div className="flex-1">
                      <div className="font-mono text-lg font-bold">{colorData.hex}</div>
                      <div className="text-sm text-gray-500">
                        RGB({colorData.rgb.r}, {colorData.rgb.g}, {colorData.rgb.b})
                      </div>
                      <div className="text-sm text-gray-400">
                        {colorData.percentage}% of image
                      </div>
                    </div>
                    <div className="text-sm text-purple-500 font-medium">
                      {copied === colorData.hex ? '✓ Copied!' : 'Click to copy'}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Color Palette Display */}
          {colors.length > 0 && (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Palette Preview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex h-32 rounded-lg overflow-hidden shadow-lg">
                  {colors.map((colorData, idx) => (
                    <div
                      key={idx}
                      className="flex-1 flex items-end justify-center pb-2 cursor-pointer hover:opacity-80 transition-opacity"
                      style={{ backgroundColor: colorData.hex }}
                      onClick={() => copyColor(colorData.hex)}
                      title={`${colorData.hex} - ${colorData.percentage}%`}
                    >
                      <span
                        className="text-xs font-mono font-bold"
                        style={{ color: getTextColor(colorData.hex) }}
                      >
                        {colorData.percentage}%
                      </span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tips */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <ul>
                <li>Upload images with clear, distinct colors for best results</li>
                <li>Adjust the number of colors to extract more or fewer dominant colors</li>
                <li>Click on any color to copy its hex code</li>
                <li>Use the palette preview to see color distribution</li>
                <li>Photos with fewer colors will produce more accurate results</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Hidden canvas for color extraction */}
      <canvas ref={canvasRef} className="hidden" />
    </div>
  )
}
