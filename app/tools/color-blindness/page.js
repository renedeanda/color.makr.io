'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getRandomColor, generateRandomPalette, getTextColor } from '@/lib/colorUtils'
import { simulateColorBlindness, simulatePalette, colorBlindnessTypes } from '@/lib/colorBlindness'
import Link from 'next/link'

export default function ColorBlindnessPage() {
  const [color, setColor] = useState('#3B82F6')
  const [palette, setPalette] = useState(['#3B82F6', '#8B5CF6', '#EC4899', '#F59E0B', '#10B981'])
  const [selectedType, setSelectedType] = useState('deuteranopia')
  const [mode, setMode] = useState('single') // single or palette

  const handleRandomColor = () => {
    setColor(getRandomColor())
  }

  const handleRandomPalette = () => {
    setPalette(generateRandomPalette(5))
  }

  const simulatedColor = selectedType === 'normal' ? color : simulateColorBlindness(color, selectedType)
  const simulatedPalette = selectedType === 'normal' ? palette : simulatePalette(palette, selectedType)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm">
        <Link href="/" className="text-purple-500 hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 dark:text-gray-400">Color Blindness Simulator</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">Color Blindness Simulator</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Simulate how your colors appear with different types of color blindness
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Mode</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button
                onClick={() => setMode('single')}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${
                  mode === 'single'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Single Color
              </button>
              <button
                onClick={() => setMode('palette')}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${
                  mode === 'palette'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Color Palette
              </button>
            </CardContent>
          </Card>

          {mode === 'single' ? (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Color</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div
                  className="w-full h-24 rounded-lg shadow-lg border-4 border-white dark:border-gray-800"
                  style={{ backgroundColor: color }}
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2"
                  />
                  <input
                    type="text"
                    value={color}
                    onChange={(e) => {
                      const val = e.target.value
                      if (/^#[0-9A-F]{0,6}$/i.test(val)) {
                        setColor(val)
                      }
                    }}
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono"
                  />
                </div>
                <Button onClick={handleRandomColor} variant="outline" className="w-full">
                  Random Color
                </Button>
              </CardContent>
            </Card>
          ) : (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Palette</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-5 gap-2">
                  {palette.map((c, idx) => (
                    <div
                      key={idx}
                      className="aspect-square rounded-lg shadow color-swatch cursor-pointer"
                      style={{ backgroundColor: c }}
                      onClick={() => {
                        const newColor = prompt('Enter new color:', c)
                        if (newColor && /^#[0-9A-F]{6}$/i.test(newColor)) {
                          const newPalette = [...palette]
                          newPalette[idx] = newColor
                          setPalette(newPalette)
                        }
                      }}
                    />
                  ))}
                </div>
                <Button onClick={handleRandomPalette} variant="outline" className="w-full">
                  Random Palette
                </Button>
              </CardContent>
            </Card>
          )}

          <Card className="glass">
            <CardHeader>
              <CardTitle>Vision Type</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2 max-h-96 overflow-y-auto">
                {colorBlindnessTypes.map((type) => (
                  <button
                    key={type.id}
                    onClick={() => setSelectedType(type.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
                      selectedType === type.id
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                    }`}
                  >
                    <div className="font-semibold">{type.name}</div>
                    <div className={`text-xs ${selectedType === type.id ? 'text-purple-100' : 'text-gray-500'}`}>
                      {type.description}
                    </div>
                    <div className={`text-xs mt-1 ${selectedType === type.id ? 'text-purple-200' : 'text-gray-400'}`}>
                      {type.prevalence}
                    </div>
                  </button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Comparison */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Original vs Simulated</CardTitle>
            </CardHeader>
            <CardContent>
              {mode === 'single' ? (
                <div className="grid grid-cols-2 gap-6">
                  {/* Original */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-center">Normal Vision</h3>
                    <div
                      className="w-full h-64 rounded-lg shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center"
                      style={{ backgroundColor: color }}
                    >
                      <span
                        className="text-2xl font-bold font-mono"
                        style={{ color: getTextColor(color) }}
                      >
                        {color}
                      </span>
                    </div>
                  </div>

                  {/* Simulated */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold text-center">
                      {colorBlindnessTypes.find(t => t.id === selectedType)?.name}
                    </h3>
                    <div
                      className="w-full h-64 rounded-lg shadow-lg border-4 border-white dark:border-gray-800 flex items-center justify-center"
                      style={{ backgroundColor: simulatedColor }}
                    >
                      <span
                        className="text-2xl font-bold font-mono"
                        style={{ color: getTextColor(simulatedColor) }}
                      >
                        {simulatedColor}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  {/* Original Palette */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">Normal Vision</h3>
                    <div className="grid grid-cols-5 gap-3">
                      {palette.map((c, idx) => (
                        <div key={idx} className="space-y-2">
                          <div
                            className="aspect-square rounded-lg shadow-lg border-4 border-white dark:border-gray-800"
                            style={{ backgroundColor: c }}
                          />
                          <div className="text-xs text-center font-mono">{c}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Simulated Palette */}
                  <div className="space-y-3">
                    <h3 className="text-lg font-semibold">
                      {colorBlindnessTypes.find(t => t.id === selectedType)?.name}
                    </h3>
                    <div className="grid grid-cols-5 gap-3">
                      {simulatedPalette.map((c, idx) => (
                        <div key={idx} className="space-y-2">
                          <div
                            className="aspect-square rounded-lg shadow-lg border-4 border-white dark:border-gray-800"
                            style={{ backgroundColor: c }}
                          />
                          <div className="text-xs text-center font-mono">{c}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* All Types Comparison */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>All Vision Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                {colorBlindnessTypes.map((type) => {
                  const simColor = type.id === 'normal' ? color : simulateColorBlindness(color, type.id)
                  return (
                    <div
                      key={type.id}
                      className="space-y-2 cursor-pointer"
                      onClick={() => setSelectedType(type.id)}
                    >
                      <div
                        className={`h-24 rounded-lg shadow color-swatch flex items-center justify-center ${
                          selectedType === type.id ? 'ring-4 ring-purple-500' : ''
                        }`}
                        style={{ backgroundColor: simColor }}
                      >
                        <span
                          className="text-xs font-mono font-bold"
                          style={{ color: getTextColor(simColor) }}
                        >
                          {simColor}
                        </span>
                      </div>
                      <div className="text-sm font-semibold text-center">{type.name}</div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>

          {/* Information */}
          <Card className="glass">
            <CardHeader>
              <CardTitle>About Color Blindness</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                Color blindness affects approximately 8% of men and 0.5% of women worldwide. It&apos;s
                important to test your designs with color blindness simulation to ensure accessibility.
              </p>
              <h3>Common Types:</h3>
              <ul>
                <li><strong>Deuteranomaly:</strong> Most common, difficulty distinguishing red and green</li>
                <li><strong>Protanopia/Protanomaly:</strong> Red-blindness or red-weakness</li>
                <li><strong>Tritanopia/Tritanomaly:</strong> Rare blue-yellow color blindness</li>
                <li><strong>Achromatopsia:</strong> Very rare complete color blindness</li>
              </ul>
              <h3>Design Tips:</h3>
              <ul>
                <li>Don&apos;t rely solely on color to convey information</li>
                <li>Use patterns, icons, or labels alongside colors</li>
                <li>Ensure sufficient contrast between elements</li>
                <li>Test your palette with simulation tools</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
