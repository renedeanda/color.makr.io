
import { useState, useEffect } from 'react'

export default function ColorSchemeGenerator({ baseColor }) {
  const [scheme, setScheme] = useState([])

  useEffect(() => {
    generateScheme(baseColor)
  }, [baseColor])

  function generateScheme(color) {
    const hsl = hexToHsl(color)
    const newScheme = [
      hslToHex({ ...hsl, l: 90 }), // Lightest
      hslToHex({ ...hsl, l: 70 }),
      hslToHex({ ...hsl, l: 50 }), // Base color
      hslToHex({ ...hsl, l: 30 }),
      hslToHex({ ...hsl, l: 10 }), // Darkest
    ]
    setScheme(newScheme)
  }

  function hexToHsl(hex) {
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

  function hslToHex({ h, s, l }) {
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
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Color Scheme</h2>
      <div className="flex space-x-2">
        {scheme.map((color, index) => (
          <div key={index} className="flex flex-col items-center">
            <div style={{backgroundColor: color, width: '50px', height: '50px'}} className="rounded"></div>
            <span className="text-xs mt-1 text-gray-600 dark:text-gray-400">{color}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
    