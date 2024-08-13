
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
    