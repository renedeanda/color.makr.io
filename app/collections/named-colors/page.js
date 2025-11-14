'use client'

import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { namedColors, getCategories, getColorsByCategory, searchColors } from '@/lib/namedColors'
import { getTextColor } from '@/lib/colorUtils'
import Link from 'next/link'

export default function NamedColorsPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')

  const categories = getCategories()

  const filteredColors = searchQuery
    ? searchColors(searchQuery)
    : selectedCategory === 'all'
    ? namedColors
    : getColorsByCategory(selectedCategory)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <div className="mb-6 text-sm">
        <Link href="/" className="text-purple-500 hover:underline">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-600 dark:text-gray-400">Named Colors</span>
      </div>

      <h1 className="text-4xl md:text-5xl font-bold mb-4">Named Colors</h1>
      <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
        Browse {namedColors.length}+ CSS named colors with hex codes
      </p>

      {/* Search and Filter */}
      <Card className="glass mb-8">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Search colors..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-purple-500 focus:outline-none"
            />
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 focus:border-purple-500 focus:outline-none capitalize"
            >
              <option value="all">All Categories</option>
              {categories.map(cat => (
                <option key={cat} value={cat} className="capitalize">{cat}</option>
              ))}
            </select>
          </div>
        </CardContent>
      </Card>

      {/* Color Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
        {filteredColors.map((color) => (
          <Link key={color.name} href={`/colors/${color.name}`}>
            <Card className="glass hover:shadow-2xl transition-all cursor-pointer color-swatch">
              <CardContent className="p-0">
                <div
                  className="h-32 rounded-t-lg flex items-center justify-center"
                  style={{ backgroundColor: color.hex }}
                >
                  <span
                    className="font-mono text-sm font-bold"
                    style={{ color: getTextColor(color.hex) }}
                  >
                    {color.hex}
                  </span>
                </div>
                <div className="p-3">
                  <div className="font-semibold capitalize text-sm truncate">
                    {color.name}
                  </div>
                  <div className="text-xs text-gray-500 capitalize">
                    {color.category}
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      {filteredColors.length === 0 && (
        <Card className="glass">
          <CardContent className="py-16 text-center">
            <div className="text-gray-500">
              <div className="text-4xl mb-4">🔍</div>
              <div className="text-xl font-semibold mb-2">No colors found</div>
              <div className="text-sm">Try a different search term or category</div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Info */}
      <Card className="mt-8 glass">
        <CardHeader>
          <CardTitle>About Named Colors</CardTitle>
        </CardHeader>
        <CardContent className="prose dark:prose-invert max-w-none">
          <p>
            CSS named colors are predefined color keywords that can be used in HTML and CSS.
            These colors are recognized by all modern browsers and provide an easy way to
            reference common colors without memorizing hex codes.
          </p>
          <p>
            Click on any color to view detailed information including color values, harmonies,
            variations, and usage examples.
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
