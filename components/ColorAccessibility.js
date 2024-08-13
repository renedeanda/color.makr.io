
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
    