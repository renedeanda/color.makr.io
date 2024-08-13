
export default function ColorHistory({ history, onSelect }) {
  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Color History</h2>
      <div className="flex flex-wrap gap-2">
        {history.map((color, index) => (
          <button
            key={index}
            className="w-8 h-8 rounded-full shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            style={{ backgroundColor: color }}
            onClick={() => onSelect(color)}
            title={color}
          ></button>
        ))}
      </div>
    </div>
  )
}
    