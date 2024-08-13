
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
        </div>
        <div>
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
    