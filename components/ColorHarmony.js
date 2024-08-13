
export default function ColorHarmony({ harmony, onChange }) {
  const harmonies = ['complementary', 'analogous', 'triadic', 'tetradic', 'monochromatic', 'split-complementary']

  return (
    <div className="flex items-center space-x-4">
      <label htmlFor="harmonySelect" className="text-gray-700 dark:text-gray-300">
        Color Harmony:
      </label>
      <select
        id="harmonySelect"
        value={harmony}
        onChange={(e) => onChange(e.target.value)}
        className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 rounded-md px-2 py-1 border border-gray-300 dark:border-gray-700"
      >
        {harmonies.map((h) => (
          <option key={h} value={h}>
            {h.charAt(0).toUpperCase() + h.slice(1).replace('-', ' ')}
          </option>
        ))}
      </select>
    </div>
  )
}
    