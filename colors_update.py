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

    # Update favicon SVG
    favicon_svg = '''
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <rect x="10" y="10" width="80" height="80" rx="20" ry="20" fill="#F4AA41"/>
  <text x="50" y="50" font-family="Arial, sans-serif" font-size="60" text-anchor="middle" dominant-baseline="central">🎨</text>
</svg>
    '''
    update_file('public/favicon.svg', favicon_svg)

    # Update ColorExplorer component
    color_explorer_js = '''
import { useState, useEffect } from 'react'
import ColorPicker from './ColorPicker'
import ColorPalette from './ColorPalette'
import ColorHarmony from './ColorHarmony'
import ColorInfo from './ColorInfo'
import GradientGenerator from './GradientGenerator'
import ColorAccessibility from './ColorAccessibility'
import ColorSchemeGenerator from './ColorSchemeGenerator'
import ColorHistory from './ColorHistory'
import ExportOptions from './ExportOptions'
import ColorBlindnessSimulator from './ColorBlindnessSimulator'
import ColorNamer from './ColorNamer'
import ColorWheel from './ColorWheel'
import ColorImageExtractor from './ColorImageExtractor'

export default function ColorExplorer() {
  const [baseColor, setBaseColor] = useState('#3B82F6')
  const [palette, setPalette] = useState([])
  const [harmony, setHarmony] = useState('complementary')
  const [gradient, setGradient] = useState({ start: '#3B82F6', end: '#ffffff' })
  const [colorHistory, setColorHistory] = useState([])

  useEffect(() => {
    generatePalette()
    addToHistory(baseColor)
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

  const addToHistory = (color) => {
    setColorHistory(prev => {
      const newHistory = [color, ...prev.filter(c => c !== color)]
      return newHistory.slice(0, 10) // Keep only the last 10 colors
    })
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
    <div className="space-y-8 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <ColorPicker color={baseColor} onChange={setBaseColor} />
          <ColorInfo color={baseColor} />
          <ColorNamer color={baseColor} />
        </div>
        <div>
          <ColorWheel color={baseColor} onChange={setBaseColor} />
          <ColorHarmony harmony={harmony} onChange={setHarmony} />
        </div>
      </div>
      <ColorPalette palette={palette} />
      <ColorSchemeGenerator baseColor={baseColor} />
      <GradientGenerator gradient={gradient} setGradient={setGradient} />
      <ColorAccessibility color1={baseColor} color2={palette[1] || '#ffffff'} />
      <ColorBlindnessSimulator color={baseColor} />
      <ColorImageExtractor onColorExtract={setBaseColor} />
      <ColorHistory history={colorHistory} onSelect={setBaseColor} />
      <ExportOptions palette={palette} gradient={gradient} />
    </div>
  )
}
    '''
    update_file('components/ColorExplorer.js', color_explorer_js)

    # Update ColorPicker component
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
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Color Picker</h2>
      <div className="flex flex-col space-y-4">
        <div className="flex items-center space-x-4">
          <input
            type="color"
            value={color}
            onChange={(e) => {
              onChange(e.target.value)
              setHexInput(e.target.value)
            }}
            className="w-12 h-12 rounded-md cursor-pointer"
          />
          <div className="flex-1">
            <label htmlFor="hexInput" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Hex Code
            </label>
            <input
              id="hexInput"
              type="text"
              value={hexInput}
              onChange={handleHexChange}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="#000000"
            />
          </div>
        </div>
      </div>
    </div>
  )
}
    '''
    update_file('components/ColorPicker.js', color_picker_js)

    # Update ColorInfo component
    color_info_js = '''
export default function ColorInfo({ color }) {
  const rgb = hexToRgb(color)
  const hsl = hexToHsl(color)

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Color Information</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="font-semibold text-gray-700 dark:text-gray-300">HEX</p>
          <p className="text-gray-600 dark:text-gray-400">{color}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700 dark:text-gray-300">RGB</p>
          <p className="text-gray-600 dark:text-gray-400">{`${rgb.r}, ${rgb.g}, ${rgb.b}`}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700 dark:text-gray-300">HSL</p>
          <p className="text-gray-600 dark:text-gray-400">{`${Math.round(hsl.h)}°, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%`}</p>
        </div>
      </div>
    </div>
  )

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  function hexToHsl(hex) {
    const rgb = hexToRgb(hex)
    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255
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
}
    '''
    update_file('components/ColorInfo.js', color_info_js)

    # Update ColorHarmony component
    color_harmony_js = '''
export default function ColorHarmony({ harmony, onChange }) {
  const harmonies = ['complementary', 'analogous', 'triadic', 'tetradic', 'monochromatic', 'split-complementary']

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Color Harmony</h2>
      <div className="flex items-center space-x-4">
        <label htmlFor="harmonySelect" className="text-gray-700 dark:text-gray-300">
          Select Harmony:
        </label>
        <select
          id="harmonySelect"
          value={harmony}
          onChange={(e) => onChange(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        >
          {harmonies.map((h) => (
            <option key={h} value={h}>
              {h.charAt(0).toUpperCase() + h.slice(1).replace('-', ' ')}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
    '''
    update_file('components/ColorHarmony.js', color_harmony_js)

# Continuing the ColorPalette component
    color_palette_js = '''
export default function ColorPalette({ palette }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Color Palette</h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {palette.map((color, index) => (
          <div key={index} className="flex flex-col items-center">
            <div
              className="w-20 h-20 rounded-md shadow-md"
              style={{ backgroundColor: color }}
            ></div>
            <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">{color}</span>
          </div>
        ))}
      </div>
    </div>
  )
}
    '''
    update_file('components/ColorPalette.js', color_palette_js)

    # Update GradientGenerator component
    gradient_generator_js = '''
import { useState } from 'react'

export default function GradientGenerator({ gradient, setGradient }) {
  const [angle, setAngle] = useState(90)

  const handleColorChange = (e, type) => {
    setGradient({ ...gradient, [type]: e.target.value })
  }

  const handleAngleChange = (e) => {
    setAngle(e.target.value)
  }

  const gradientStyle = {
    background: `linear-gradient(${angle}deg, ${gradient.start}, ${gradient.end})`,
    height: '100px',
    borderRadius: '8px'
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Gradient Generator</h2>
      <div style={gradientStyle} className="mb-4"></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Start Color</label>
          <input
            type="color"
            value={gradient.start}
            onChange={(e) => handleColorChange(e, 'start')}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">End Color</label>
          <input
            type="color"
            value={gradient.end}
            onChange={(e) => handleColorChange(e, 'end')}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Angle: {angle}°</label>
          <input
            type="range"
            min="0"
            max="360"
            value={angle}
            onChange={handleAngleChange}
            className="mt-1 block w-full"
          />
        </div>
      </div>
      <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
        CSS: background: linear-gradient({angle}deg, {gradient.start}, {gradient.end});
      </p>
    </div>
  )
}
    '''
    update_file('components/GradientGenerator.js', gradient_generator_js)

    # Update ColorAccessibility component
    color_accessibility_js = '''
import { useState, useEffect } from 'react'

export default function ColorAccessibility({ color1, color2 }) {
  const [contrast, setContrast] = useState(null)
  const [wcagLevel, setWcagLevel] = useState('')

  useEffect(() => {
    const ratio = calculateContrastRatio(color1, color2)
    setContrast(ratio)
    setWcagLevel(getWCAGLevel(ratio))
  }, [color1, color2])

  function calculateContrastRatio(color1, color2) {
    const lum1 = calculateLuminance(color1)
    const lum2 = calculateLuminance(color2)
    const brightest = Math.max(lum1, lum2)
    const darkest = Math.min(lum1, lum2)
    return (brightest + 0.05) / (darkest + 0.05)
  }

  function calculateLuminance(hex) {
    const rgb = hexToRgb(hex)
    const [r, g, b] = [rgb.r, rgb.g, rgb.b].map(val => {
      val /= 255
      return val <= 0.03928 ? val / 12.92 : Math.pow((val + 0.055) / 1.055, 2.4)
    })
    return 0.2126 * r + 0.7152 * g + 0.0722 * b
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  function getWCAGLevel(ratio) {
    if (ratio >= 7) return 'AAA'
    if (ratio >= 4.5) return 'AA'
    if (ratio >= 3) return 'AA Large'
    return 'Fail'
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Color Accessibility</h2>
      <div className="flex space-x-4 mb-4">
        <div style={{backgroundColor: color1, width: '50px', height: '50px'}} className="rounded"></div>
        <div style={{backgroundColor: color2, width: '50px', height: '50px'}} className="rounded"></div>
      </div>
      <p className="text-gray-700 dark:text-gray-300">Contrast Ratio: {contrast ? contrast.toFixed(2) : 'N/A'}</p>
      <p className="text-gray-700 dark:text-gray-300">WCAG Level: {wcagLevel}</p>
    </div>
  )
}
    '''
    update_file('components/ColorAccessibility.js', color_accessibility_js)

    # Update ColorSchemeGenerator component
    color_scheme_generator_js = '''
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
    '''
    update_file('components/ColorSchemeGenerator.js', color_scheme_generator_js)

    # Create ColorHistory component
    color_history_js = '''
export default function ColorHistory({ history, onSelect }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Color History</h2>
      <div className="flex flex-wrap gap-2">
        {history.map((color, index) => (
          <button
            key={index}
            className="w-8 h-8 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            style={{ backgroundColor: color }}
            onClick={() => onSelect(color)}
            title={color}
          ></button>
        ))}
      </div>
    </div>
  )
}
    '''
    update_file('components/ColorHistory.js', color_history_js)

    # Create ExportOptions component
    export_options_js = '''
export default function ExportOptions({ palette, gradient }) {
  const generateCSS = () => {
    let css = '/* Color Palette */\\n'
    palette.forEach((color, index) => {
      css += `--color-${index + 1}: ${color};\\n`
    })
    css += '\\n/* Gradient */\\n'
    css += `background: linear-gradient(90deg, ${gradient.start}, ${gradient.end});`
    return css
  }

  const generateSCSS = () => {
    let scss = '// Color Palette\\n'
    palette.forEach((color, index) => {
      scss += `$color-${index + 1}: ${color};\\n`
    })
    scss += '\\n// Gradient\\n'
    scss += `$gradient: linear-gradient(90deg, ${gradient.start}, ${gradient.end});`
    return scss
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!')
    }, (err) => {
      console.error('Could not copy text: ', err)
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Export Options</h2>
      <div className="space-y-4">
        <button
          onClick={() => copyToClipboard(generateCSS())}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Copy CSS
        </button>
        <button
          onClick={() => copyToClipboard(generateSCSS())}
          className="w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          Copy SCSS
        </button>
      </div>
    </div>
  )
}
    '''
    update_file('components/ExportOptions.js', export_options_js)

    # Continuing the ColorBlindnessSimulator component
    color_blindness_simulator_js = '''
import { useState, useEffect } from 'react'

export default function ColorBlindnessSimulator({ color }) {
  const [simulatedColors, setSimulatedColors] = useState({})

  useEffect(() => {
    setSimulatedColors({
      protanopia: simulateColorBlindness(color, 'protanopia'),
      deuteranopia: simulateColorBlindness(color, 'deuteranopia'),
      tritanopia: simulateColorBlindness(color, 'tritanopia'),
    })
  }, [color])

  function simulateColorBlindness(hex, type) {
    const rgb = hexToRgb(hex)
    let simulated

    switch (type) {
      case 'protanopia':
        simulated = [
          0.567 * rgb.r + 0.433 * rgb.g + 0.0 * rgb.b,
          0.558 * rgb.r + 0.442 * rgb.g + 0.0 * rgb.b,
          0.0 * rgb.r + 0.242 * rgb.g + 0.758 * rgb.b
        ]
        break
      case 'deuteranopia':
        simulated = [
          0.625 * rgb.r + 0.375 * rgb.g + 0.0 * rgb.b,
          0.7 * rgb.r + 0.3 * rgb.g + 0.0 * rgb.b,
          0.0 * rgb.r + 0.3 * rgb.g + 0.7 * rgb.b
        ]
        break
      case 'tritanopia':
        simulated = [
          0.95 * rgb.r + 0.05 * rgb.g + 0.0 * rgb.b,
          0.0 * rgb.r + 0.433 * rgb.g + 0.567 * rgb.b,
          0.0 * rgb.r + 0.475 * rgb.g + 0.525 * rgb.b
        ]
        break
      default:
        simulated = [rgb.r, rgb.g, rgb.b]
    }

    return rgbToHex(Math.round(simulated[0]), Math.round(simulated[1]), Math.round(simulated[2]))
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Color Blindness Simulation</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Original</p>
          <div className="w-full h-20 rounded-md" style={{ backgroundColor: color }}></div>
        </div>
        {Object.entries(simulatedColors).map(([type, simulatedColor]) => (
          <div key={type}>
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">{type}</p>
            <div className="w-full h-20 rounded-md" style={{ backgroundColor: simulatedColor }}></div>
          </div>
        ))}
      </div>
    </div>
  )
}
    '''
    update_file('components/ColorBlindnessSimulator.js', color_blindness_simulator_js)

    # Create ColorNamer component
    color_namer_js = '''
import { useState, useEffect } from 'react'

const colorNames = {
  '#FF0000': 'Red',
  '#00FF00': 'Green',
  '#0000FF': 'Blue',
  '#FFFF00': 'Yellow',
  '#FF00FF': 'Magenta',
  '#00FFFF': 'Cyan',
  '#FFA500': 'Orange',
  '#800080': 'Purple',
  '#FFC0CB': 'Pink',
  '#A52A2A': 'Brown',
  '#808080': 'Gray',
  '#FFFFFF': 'White',
  '#000000': 'Black'
}

export default function ColorNamer({ color }) {
  const [colorName, setColorName] = useState('')

  useEffect(() => {
    setColorName(findNearestColorName(color))
  }, [color])

  function findNearestColorName(hexColor) {
    let nearestColor = Object.keys(colorNames)[0]
    let minDistance = Number.MAX_VALUE

    for (let namedColor in colorNames) {
      const distance = calculateColorDistance(hexColor, namedColor)
      if (distance < minDistance) {
        minDistance = distance
        nearestColor = namedColor
      }
    }

    return colorNames[nearestColor]
  }

  function calculateColorDistance(color1, color2) {
    const rgb1 = hexToRgb(color1)
    const rgb2 = hexToRgb(color2)

    return Math.sqrt(
      Math.pow(rgb1.r - rgb2.r, 2) +
      Math.pow(rgb1.g - rgb2.g, 2) +
      Math.pow(rgb1.b - rgb2.b, 2)
    )
  }

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mt-4">
      <h2 className="text-xl font-bold mb-2 text-gray-800 dark:text-gray-200">Color Name</h2>
      <p className="text-lg text-gray-700 dark:text-gray-300">{colorName}</p>
    </div>
  )
}
    '''
    update_file('components/ColorNamer.js', color_namer_js)

    # Create ColorWheel component
    color_wheel_js = '''
import { useEffect, useRef } from 'react'

export default function ColorWheel({ color, onChange }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 5

    // Draw color wheel
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = (angle - 2) * Math.PI / 180
      const endAngle = (angle + 2) * Math.PI / 180

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, '#FFFFFF')
      gradient.addColorStop(1, `hsl(${angle}, 100%, 50%)`)
      
      ctx.fillStyle = gradient
      ctx.fill()
    }

    // Draw color indicator
    const hsl = hexToHsl(color)
    const indicatorAngle = hsl.h * Math.PI / 180
    const indicatorRadius = radius * (1 - hsl.s / 100)
    
    ctx.beginPath()
    ctx.arc(
      centerX + indicatorRadius * Math.cos(indicatorAngle),
      centerY - indicatorRadius * Math.sin(indicatorAngle),
      8, 0, 2 * Math.PI
    )
    ctx.fillStyle = color
    ctx.strokeStyle = hsl.l > 50 ? '#000000' : '#FFFFFF'
    ctx.lineWidth = 2
    ctx.fill()
    ctx.stroke()
  }, [color])

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 5

    const dx = x - centerX
    const dy = y - centerY
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance <= radius) {
      const angle = (Math.atan2(-dy, dx) + Math.PI) * 180 / Math.PI
      const saturation = Math.min(distance / radius * 100, 100)
      
      const hsl = { h: angle, s: saturation, l: 50 }
      onChange(hslToHex(hsl))
    }
  }

  function hexToHsl(hex) {
    const rgb = hexToRgb(hex)
    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255
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

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
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
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Color Wheel</h2>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        onClick={handleCanvasClick}
        className="mx-auto cursor-pointer"
      ></canvas>
    </div>
  )
}
    '''
    update_file('components/ColorWheel.js', color_wheel_js)

    # Create ColorImageExtractor component
    color_image_extractor_js = '''
import { useState } from 'react'

export default function ColorImageExtractor({ onColorExtract }) {
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        extractColor(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const extractColor = (imageSrc) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0, img.width, img.height)
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      let r = 0, g = 0, b = 0

      for (let i = 0; i < data.length; i += 4) {
        r += data[i]
        g += data[i + 1]
        b += data[i + 2]
      }

      r = Math.floor(r / (data.length / 4))
      g = Math.floor(g / (data.length / 4))
      b = Math.floor(b / (data.length / 4))

      const hex = rgbToHex(r, g, b)
      onColorExtract(hex)
    }
    img.src = imageSrc
  }

  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Extract Color from Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      {imagePreview && (
        <img src={imagePreview} alt="Uploaded" className="max-w-full h-auto mb-4 rounded-lg" />
      )}
    </div>
  )
}
    '''
    update_file('components/ColorImageExtractor.js', color_image_extractor_js)
# Continuing the index.js file
    index_js = '''
import Head from 'next/head'
import ColorExplorer from '@/components/ColorExplorer'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <Head>
        <title>Color Explorer: Advanced Palette Generator for Designers & Developers</title>
        <meta name="description" content="Explore, generate, and analyze color palettes with our comprehensive color tool. Features include color wheel, accessibility checker, color blindness simulator, and more. Perfect for designers and developers seeking inspiration and color harmony." />
        <link rel="icon" href="/favicon.svg" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800 dark:text-gray-200">
          <span className="mr-2" role="img" aria-label="Color palette">🎨</span>
          Color Explorer
          <span className="ml-2" role="img" aria-label="Rainbow">🌈</span>
        </h1>
        <p className="text-center mb-8 text-gray-600 dark:text-gray-400">
          Discover and analyze harmonious color palettes for your next project
        </p>
        <ColorExplorer />
      </main>
    </div>
  )
}
    '''
    update_file('pages/index.js', index_js)

    print("Update complete! The Color Explorer has been enhanced with new features and improved styling.")
    print("New components added: ColorBlindnessSimulator, ColorNamer, ColorWheel, and ColorImageExtractor.")
    print("To see the changes, restart your development server if it's running.")

if __name__ == "__main__":
    main()