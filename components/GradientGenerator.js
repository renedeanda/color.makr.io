
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
    