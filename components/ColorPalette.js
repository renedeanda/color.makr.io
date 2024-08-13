
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
    