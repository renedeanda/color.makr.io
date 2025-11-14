'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { getRandomColor, getTextColor } from '@/lib/colorUtils'
import {
  getContrastRatio,
  getWCAGRating,
  getContrastDescription,
  getContrastScore
} from '@/lib/contrastUtils'
import Link from 'next/link'

export default function ContrastCheckerPage() {
  const [bgColor, setBgColor] = useState('#FFFFFF')
  const [fgColor, setFgColor] = useState('#000000')
  const [fontSize, setFontSize] = useState(16)
  const [fontWeight, setFontWeight] = useState('normal')

  const contrastRatio = getContrastRatio(bgColor, fgColor)
  const ratings = getWCAGRating(contrastRatio)
  const description = getContrastDescription(contrastRatio)
  const score = getContrastScore(contrastRatio)

  // Large text is 18pt+ (24px) or 14pt+ (18.5px) bold
  const isLargeText = fontSize >= 24 || (fontSize >= 18.5 && fontWeight === 'bold')

  const swapColors = () => {
    const temp = bgColor
    setBgColor(fgColor)
    setFgColor(temp)
  }

  const randomizeColors = () => {
    setBgColor(getRandomColor())
    setFgColor(getRandomColor())
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm">
        <Link href="/" className="text-purple-500 hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 dark:text-gray-400">Contrast Checker</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">Contrast Checker</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Check WCAG contrast ratios for accessibility compliance (AA & AAA standards)
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Background Color</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="w-full h-24 rounded-lg shadow-lg border-4 border-white dark:border-gray-800"
                  style={{ backgroundColor: bgColor }}
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={bgColor}
                    onChange={(e) => setBgColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2"
                  />
                  <input
                    type="text"
                    value={bgColor}
                    onChange={(e) => {
                      const val = e.target.value
                      if (/^#[0-9A-F]{0,6}$/i.test(val)) {
                        setBgColor(val)
                      }
                    }}
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Foreground (Text) Color</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div
                  className="w-full h-24 rounded-lg shadow-lg border-4 border-white dark:border-gray-800"
                  style={{ backgroundColor: fgColor }}
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="color"
                    value={fgColor}
                    onChange={(e) => setFgColor(e.target.value)}
                    className="w-12 h-12 rounded-lg cursor-pointer border-2"
                  />
                  <input
                    type="text"
                    value={fgColor}
                    onChange={(e) => {
                      const val = e.target.value
                      if (/^#[0-9A-F]{0,6}$/i.test(val)) {
                        setFgColor(val)
                      }
                    }}
                    className="flex-1 px-4 py-2 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 font-mono"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Text Size & Weight</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Font Size: {fontSize}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="48"
                  value={fontSize}
                  onChange={(e) => setFontSize(parseInt(e.target.value))}
                  className="w-full"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Font Weight</label>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setFontWeight('normal')}
                    className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                      fontWeight === 'normal'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    Normal
                  </button>
                  <button
                    onClick={() => setFontWeight('bold')}
                    className={`flex-1 px-4 py-2 rounded-lg transition-all ${
                      fontWeight === 'bold'
                        ? 'bg-purple-500 text-white'
                        : 'bg-gray-100 dark:bg-gray-800'
                    }`}
                  >
                    Bold
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {isLargeText ? 'This is considered large text' : 'This is considered normal text'}
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button onClick={swapColors} variant="outline" className="w-full">
                Swap Colors
              </Button>
              <Button onClick={randomizeColors} variant="outline" className="w-full">
                Random Colors
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        <div className="space-y-6">
          <Card className="glass">
            <CardHeader>
              <CardTitle>Preview</CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="p-8 rounded-lg"
                style={{ backgroundColor: bgColor, color: fgColor }}
              >
                <h2
                  style={{
                    fontSize: `${fontSize}px`,
                    fontWeight: fontWeight,
                    marginBottom: '1rem'
                  }}
                >
                  The quick brown fox jumps over the lazy dog
                </h2>
                <p style={{ fontSize: `${fontSize}px`, fontWeight: fontWeight }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
                  tempor incididunt ut labore et dolore magna aliqua.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>Contrast Ratio</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center">
                <div className="text-6xl font-bold mb-2">{contrastRatio.toFixed(2)}:1</div>
                <div className="text-xl mb-4">{description}</div>
                <div className="mb-4">
                  <div className="text-sm text-gray-500 mb-2">Accessibility Score</div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                    <div
                      className={`h-4 rounded-full transition-all ${
                        score >= 70 ? 'bg-green-500' :
                        score >= 40 ? 'bg-yellow-500' :
                        'bg-red-500'
                      }`}
                      style={{ width: `${score}%` }}
                    />
                  </div>
                  <div className="text-sm text-gray-500 mt-1">{score}/100</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>WCAG Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* AA Normal */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <div>
                    <div className="font-semibold">WCAG AA (Normal Text)</div>
                    <div className="text-sm text-gray-500">Minimum 4.5:1</div>
                  </div>
                  <div className={`text-2xl ${
                    ratings.find(r => r.level === 'AA' && r.size === 'normal')?.passes
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}>
                    {ratings.find(r => r.level === 'AA' && r.size === 'normal')?.passes ? '✓' : '✗'}
                  </div>
                </div>

                {/* AA Large */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <div>
                    <div className="font-semibold">WCAG AA (Large Text)</div>
                    <div className="text-sm text-gray-500">Minimum 3:1</div>
                  </div>
                  <div className={`text-2xl ${
                    ratings.find(r => r.level === 'AA' && r.size === 'large')?.passes
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}>
                    {ratings.find(r => r.level === 'AA' && r.size === 'large')?.passes ? '✓' : '✗'}
                  </div>
                </div>

                {/* AAA Normal */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <div>
                    <div className="font-semibold">WCAG AAA (Normal Text)</div>
                    <div className="text-sm text-gray-500">Minimum 7:1</div>
                  </div>
                  <div className={`text-2xl ${
                    ratings.find(r => r.level === 'AAA' && r.size === 'normal')?.passes
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}>
                    {ratings.find(r => r.level === 'AAA' && r.size === 'normal')?.passes ? '✓' : '✗'}
                  </div>
                </div>

                {/* AAA Large */}
                <div className="flex items-center justify-between p-4 rounded-lg bg-gray-100 dark:bg-gray-800">
                  <div>
                    <div className="font-semibold">WCAG AAA (Large Text)</div>
                    <div className="text-sm text-gray-500">Minimum 4.5:1</div>
                  </div>
                  <div className={`text-2xl ${
                    ratings.find(r => r.level === 'AAA' && r.size === 'large')?.passes
                      ? 'text-green-500'
                      : 'text-red-500'
                  }`}>
                    {ratings.find(r => r.level === 'AAA' && r.size === 'large')?.passes ? '✓' : '✗'}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="glass">
            <CardHeader>
              <CardTitle>About WCAG Standards</CardTitle>
            </CardHeader>
            <CardContent className="prose dark:prose-invert max-w-none">
              <p>
                <strong>WCAG (Web Content Accessibility Guidelines)</strong> defines contrast ratios
                to ensure text is readable for people with visual impairments.
              </p>
              <ul>
                <li><strong>AA:</strong> Minimum level for most websites</li>
                <li><strong>AAA:</strong> Enhanced level for better accessibility</li>
                <li><strong>Large text:</strong> 18pt+ regular or 14pt+ bold (24px+/18.5px+)</li>
                <li><strong>Normal text:</strong> Below large text thresholds</li>
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

