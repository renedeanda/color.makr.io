
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
    