'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getRandomColor } from '@/lib/colorUtils'
import Link from 'next/link'

const directions = [
  { id: 'to bottom', name: 'Top to Bottom', angle: 180 },
  { id: 'to top', name: 'Bottom to Top', angle: 0 },
  { id: 'to right', name: 'Left to Right', angle: 90 },
  { id: 'to left', name: 'Right to Left', angle: 270 },
  { id: 'to bottom right', name: 'Diagonal ↘', angle: 135 },
  { id: 'to bottom left', name: 'Diagonal ↙', angle: 225 },
  { id: 'to top right', name: 'Diagonal ↗', angle: 45 },
  { id: 'to top left', name: 'Diagonal ↖', angle: 315 }
]

export default function GradientGeneratorPage() {
  const [gradientType, setGradientType] = useState('linear')
  const [direction, setDirection] = useState('to bottom')
  const [angle, setAngle] = useState(180)
  const [colorStops, setColorStops] = useState([
    { color: '#3B82F6', position: 0 },
    { color: '#8B5CF6', position: 100 }
  ])
  const [copied, setCopied] = useState(false)

  const generateCSS = () => {
    const stops = colorStops
      .sort((a, b) => a.position - b.position)
      .map(stop => `${stop.color} ${stop.position}%`)
      .join(', ')

    if (gradientType === 'linear') {
      return `linear-gradient(${direction}, ${stops})`
    } else {
      return `radial-gradient(circle, ${stops})`
    }
  }

  const addColorStop = () => {
    const newPosition = 50
    setColorStops([...colorStops, { color: getRandomColor(), position: newPosition }])
  }

  const removeColorStop = (index) => {
    if (colorStops.length > 2) {
      setColorStops(colorStops.filter((_, i) => i !== index))
    }
  }

  const updateColorStop = (index, field, value) => {
    const updated = [...colorStops]
    updated[index][field] = field === 'position' ? parseInt(value) : value
    setColorStops(updated)
  }

  const randomizeGradient = () => {
    setColorStops([
      { color: getRandomColor(), position: 0 },
      { color: getRandomColor(), position: 100 }
    ])
  }

  const copyCSS = () => {
    navigator.clipboard.writeText(`background: ${generateCSS()};`)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm">
        <Link href="/" className="text-purple-500 hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 dark:text-gray-400">Gradient Generator</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">Gradient Generator</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Create beautiful CSS gradients with multiple color stops and directions
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Gradient Type</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <button
                onClick={() => setGradientType('linear')}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${
                  gradientType === 'linear'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Linear Gradient
              </button>
              <button
                onClick={() => setGradientType('radial')}
                className={`w-full px-4 py-3 rounded-lg font-medium transition-all ${
                  gradientType === 'radial'
                    ? 'bg-purple-500 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                Radial Gradient
              </button>
            </CardContent>
          </Card>

          {gradientType === 'linear' && (
            <Card className="glass">
              <CardHeader>
                <CardTitle>Direction</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  {directions.map((dir) => (
                    <button
                      key={dir.id}
                      onClick={() => {
                        setDirection(dir.id)
                        setAngle(dir.angle)
                      }}
                      className={`w-full text-left px-4 py-2 rounded-lg transition-all ${
                        direction === dir.id
                          ? 'bg-purple-500 text-white'
                          : 'bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700'
                      }`}
                    >
                      {dir.name}
                    </button>
                  ))}
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium mb-2">
                    Custom Angle: {angle}°
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="360"
                    value={angle}
                    onChange={(e) => {
                      const newAngle = parseInt(e.target.value)
                      setAngle(newAngle)
                      setDirection(`${newAngle}deg`)
                    }}
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>
          )}

          <Card className="glass">
            <CardHeader>
              <CardTitle>Color Stops</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {colorStops.sort((a, b) => a.position - b.position).map((stop, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={stop.color}
                      onChange={(e) => updateColorStop(index, 'color', e.target.value)}
                      className="w-12 h-12 rounded-lg cursor-pointer border-2"
                    />
                    <input
                      type="text"
                      value={stop.color}
                      onChange={(e) => updateColorStop(index, 'color', e.target.value)}
                      className="flex-1 px-3 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono text-sm"
                    />
                    {colorStops.length > 2 && (
                      <button
                        onClick={() => removeColorStop(index)}
                        className="w-10 h-10 bg-red-500 text-white rounded-lg hover:bg-red-600"
                      >
                        ×
                      </button>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm mb-1">Position: {stop.position}%</label>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={stop.position}
                      onChange={(e) => updateColorStop(index, 'position', e.target.value)}
                      className="w-full"
                    />
                  </div>
                </div>
              ))}
              <Button onClick={addColorStop} variant="outline" className="w-full">
                + Add Color Stop
              </Button>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={randomizeGradient} variant="outline" className="w-full">
                Random Gradient
              </Button>
              <Button onClick={copyCSS} className="w-full">
                {copied ? '✓ Copied CSS!' : 'Copy CSS'}
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Preview & Code */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="w-full h-96 rounded-lg shadow-2xl border-4 border-white dark:border-gray-800"
                style={{ background: generateCSS() }}
              />
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>CSS Code</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                  <div>background: {generateCSS()};</div>
                </div>
                <Button onClick={copyCSS} variant="outline" className="w-full">
                  {copied ? '✓ Copied!' : 'Copy to Clipboard'}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Tips</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <ul>
                <li>Add multiple color stops to create complex gradients</li>
                <li>Drag the position sliders to adjust where colors appear</li>
                <li>Use radial gradients for circular effects</li>
                <li>Experiment with different angles for linear gradients</li>
                <li>Copy the CSS and paste directly into your stylesheets</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

