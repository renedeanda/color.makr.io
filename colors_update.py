import os

def update_file(path, content):
    with open(path, 'w') as f:
        f.write(content)
    print(f"Updated file: {path}")

def main():
    # Ensure we're in the project directory
    if not os.path.exists('pages') or not os.path.exists('components'):
        print("Error: Make sure you run this script from the root of your color-explorer project.")
        return

    # Update ColorPicker component (components/ColorPicker.js)
    color_picker_js = '''
import { useState } from 'react'

export default function ColorPicker({ color, onChange }) {
  const [hexInput, setHexInput] = useState(color)

  const handleHexChange = (e) => {
    const value = e.target.value
    setHexInput(value)
    if (/^#[0-9A-F]{6}$/i.test(value)) {
      onChange(value)
    }
  }

  return (
    <div className="flex flex-col space-y-4">
      <div className="flex items-center space-x-4">
        <label htmlFor="colorPicker" className="text-gray-700 dark:text-gray-300">
          Base Color:
        </label>
        <input
          id="colorPicker"
          type="color"
          value={color}
          onChange={(e) => {
            onChange(e.target.value)
            setHexInput(e.target.value)
          }}
          className="w-12 h-12 rounded-md cursor-pointer"
        />
        <span className="text-gray-700 dark:text-gray-300">{color}</span>
      </div>
      <div className="flex items-center space-x-4">
        <label htmlFor="hexInput" className="text-gray-700 dark:text-gray-300">
          Hex Code:
        </label>
        <input
          id="hexInput"
          type="text"
          value={hexInput}
          onChange={handleHexChange}
          className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md px-2 py-1 border border-gray-300 dark:border-gray-700"
          placeholder="#000000"
        />
      </div>
    </div>
  )
}
    '''
    update_file('components/ColorPicker.js', color_picker_js)

    # Update ColorHarmony component (components/ColorHarmony.js)
    color_harmony_js = '''
export default function ColorHarmony({ harmony, onChange }) {
  const harmonies = ['complementary', 'analogous', 'triadic', 'tetradic', 'monochromatic', 'split-complementary']

  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="harmonySelect" className="text-gray-700 dark:text-gray-300">
        Color Harmony:
      </label>
      <select
        id="harmonySelect"
        value={harmony}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md px-2 py-1 border border-gray-300 dark:border-gray-700"
      >
        {harmonies.map((h) => (
          <option key={h} value={h}>
            {h.charAt(0).toUpperCase() + h.slice(1).replace('-', ' ')}
          </option>
        ))}
      </select>
    </div>
  )
}
    '''
    update_file('components/ColorHarmony.js', color_harmony_js)

    # Update ColorExplorer component (components/ColorExplorer.js)
    color_explorer_js = '''
import { useState, useEffect } from 'react'
import ColorPicker from './ColorPicker'
import ColorPalette from './ColorPalette'
import ColorHarmony from './ColorHarmony'

export default function ColorExplorer() {
  const [baseColor, setBaseColor] = useState('#3B82F6')
  const [palette, setPalette] = useState([])
  const [harmony, setHarmony] = useState('complementary')

  useEffect(() => {
    generatePalette()
  }, [baseColor, harmony])

  const generatePalette = () => {
    const newPalette = [baseColor]
    const hsl = hexToHsl(baseColor)

    switch (harmony) {
      case 'complementary':
        newPalette.push(hslToHex(getComplementaryColor(hsl)))
        break
      case 'analogous':
        newPalette.push(hslToHex(getAnalogousColor(hsl, 30)))
        newPalette.push(hslToHex(getAnalogousColor(hsl, -30)))
        break
      case 'triadic':
        newPalette.push(hslToHex(getAnalogousColor(hsl, 120)))
        newPalette.push(hslToHex(getAnalogousColor(hsl, -120)))
        break
      case 'tetradic':
        newPalette.push(hslToHex(getAnalogousColor(hsl, 90)))
        newPalette.push(hslToHex(getComplementaryColor(hsl)))
        newPalette.push(hslToHex(getAnalogousColor(hsl, -90)))
        break
      case 'monochromatic':
        newPalette.push(hslToHex({ ...hsl, l: hsl.l * 0.7 }))
        newPalette.push(hslToHex({ ...hsl, l: hsl.l * 1.3 }))
        break
      case 'split-complementary':
        newPalette.push(hslToHex(getAnalogousColor(getComplementaryColor(hsl), 30)))
        newPalette.push(hslToHex(getAnalogousColor(getComplementaryColor(hsl), -30)))
        break
    }

    setPalette(newPalette)
  }

  const getComplementaryColor = (hsl) => {
    return { ...hsl, h: (hsl.h + 180) % 360 }
  }

  const getAnalogousColor = (hsl, angle) => {
    return { ...hsl, h: (hsl.h + angle + 360) % 360 }
  }

  const hexToHsl = (hex) => {
    let r = 0, g = 0, b = 0
    if (hex.length === 4) {
      r = parseInt(hex[1] + hex[1], 16)
      g = parseInt(hex[2] + hex[2], 16)
      b = parseInt(hex[3] + hex[3], 16)
    } else if (hex.length === 7) {
      r = parseInt(hex.slice(1, 3), 16)
      g = parseInt(hex.slice(3, 5), 16)
      b = parseInt(hex.slice(5, 7), 16)
    }
    r /= 255
    g /= 255
    b /= 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return { h: h * 360, s: s * 100, l: l * 100 }
  }

  const hslToHex = ({ h, s, l }) => {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = n => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  return (
    <div className="space-y-8">
      <ColorPicker color={baseColor} onChange={setBaseColor} />
      <ColorHarmony harmony={harmony} onChange={setHarmony} />
      <ColorPalette palette={palette} />
    </div>
  )
}
    '''
    update_file('components/ColorExplorer.js', color_explorer_js)

    # Update index.js file to include the enhanced header (pages/index.js)
    index_js = '''
import Head from 'next/head'
import ColorExplorer from '@/components/ColorExplorer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>Color Explorer: Palette Generator for Designers & Developers</title>
        <meta name="description" content="Explore, generate, and analyze color palettes with our comprehensive color tool. Perfect for designers and developers seeking inspiration and color harmony." />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
          <span className="mr-2" role="img" aria-label="Color palette">🎨</span>
          Color Explorer
          <span className="ml-2" role="img" aria-label="Rainbow">🌈</span>
        </h1>
        <p className="text-center mb-8 text-gray-600 dark:text-gray-400">
          Discover harmonious color palettes for your next project
        </p>
        <ColorExplorer />
      </main>
    </div>
  )
}
    '''
    update_file('pages/index.js', index_js)

    print("Update complete! The Color Explorer has been enhanced with new features.")
    print("To see the changes, restart your development server if it's running.")

if __name__ == "__main__":
    main()
