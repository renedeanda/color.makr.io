
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
    