
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
    