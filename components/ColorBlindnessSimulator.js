
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
    