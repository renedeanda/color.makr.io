'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { brandColors, getCategories, getBrandsByCategory, searchBrands } from '@/lib/brandColors'
import { getTextColor } from '@/lib/colorUtils'
import Link from 'next/link'

export default function BrandColorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [copied, setCopied] = useState('')

  const categories = getCategories()

  const filteredBrands = searchQuery
    ? searchBrands(searchQuery)
    : selectedCategory === 'all'
    ? brandColors
    : getBrandsByCategory(selectedCategory)

  const copyColor = (color) => {
    navigator.clipboard.writeText(color)
    setCopied(color)
    setTimeout(() => setCopied(''), 2000)
  }

  const copyPalette = (colors) => {
    navigator.clipboard.writeText(colors.join(', '))
    setCopied('palette')
    setTimeout(() => setCopied(''), 2000)
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm">
        <Link href="/" className="text-purple-500 hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 dark:text-gray-400">Brand Colors</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">Brand Colors</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Explore color palettes from {brandColors.length}+ popular brands
      </p>

      {/* Search and Filter */}
      <Card className="glass mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-purple-500 focus:outline-none"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-purple-500 focus:outline-none"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Brand Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBrands.map((brand, idx) => (
          <Card key={idx} className="glass hover:shadow-2xl transition-all">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{brand.brand}</CardTitle>
                <button
                  onClick={() => copyPalette(brand.colors)}
                  className="text-sm text-purple-500 hover:text-purple-600"
                >
                  {copied === 'palette' ? '✓' : 'Copy All'}
                </button>
              </div>
              <p className="text-sm text-gray-500">{brand.category}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Color Swatches */}
              <div className="flex h-24 rounded-lg overflow-hidden shadow-lg">
                {brand.colors.map((color, colorIdx) => (
                  <div
                    key={colorIdx}
                    className="flex-1 cursor-pointer hover:opacity-80 transition-opacity"
                    style={{ backgroundColor: color }}
                    onClick={() => copyColor(color)}
                    title={`${color} - Click to copy`}
                  />
                ))}
              </div>

              {/* Color Codes */}
              <div className="space-y-2">
                {brand.colors.map((color, colorIdx) => (
                  <div
                    key={colorIdx}
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded transition-colors"
                    onClick={() => copyColor(color)}
                  >
                    <div
                      className="w-10 h-10 rounded-lg shadow border-2 border-white dark:border-gray-800 flex-shrink-0"
                      style={{ backgroundColor: color }}
                    />
                    <div className="flex-1">
                      <div className="font-mono text-sm font-bold">{color}</div>
                    </div>
                    <div className="text-xs text-purple-500 font-medium">
                      {copied === color ? '✓ Copied!' : 'Copy'}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBrands.length === 0 && (
        <Card className="glass">
          <CardContent className="py-16 text-center">
            <div className="text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <div className="text-xl font-semibold mb-2">No brands found</div>
              <div className="text-sm">Try a different search term or category</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <Card className="mt-8 glass">
        <CardHeader>
          <CardTitle>About Brand Colors</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            Brand colors are carefully chosen to represent a company&apos;s identity and values.
            These colors are consistently used across all brand materials to create recognition
            and trust.
          </p>
          <p>
            Click on any color to copy its hex code. Use these palettes as inspiration for
            your own projects, but remember that brand colors are often trademarked and should
            not be used to misrepresent brands.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
