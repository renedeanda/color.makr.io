
    export default function ColorPalette({ palette }) {
      return (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {palette.map((color, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className="w-24 h-24 rounded-md shadow-md"
                style={{ backgroundColor: color }}
              ></div>
              <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">{color}</span>
            </div>
          ))}
        </div>
      )
    }
    