
export default function ColorInfo({ color }) {
  const rgb = hexToRgb(color)
  const hsl = hexToHsl(color)

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow mt-4">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Color Information</h2>
      <div className="grid grid-cols-3 gap-4">
        <div>
          <p className="font-semibold text-gray-700 dark:text-gray-300">HEX</p>
          <p className="text-gray-600 dark:text-gray-400">{color}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700 dark:text-gray-300">RGB</p>
          <p className="text-gray-600 dark:text-gray-400">{`${rgb.r}, ${rgb.g}, ${rgb.b}`}</p>
        </div>
        <div>
          <p className="font-semibold text-gray-700 dark:text-gray-300">HSL</p>
          <p className="text-gray-600 dark:text-gray-400">{`${Math.round(hsl.h)}°, ${Math.round(hsl.s)}%, ${Math.round(hsl.l)}%`}</p>
        </div>
      </div>
    </div>
  )

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  function hexToHsl(hex) {
    const rgb = hexToRgb(hex)
    const r = rgb.r / 255
    const g = rgb.g / 255
    const b = rgb.b / 255
    const max = Math.max(r, g, b), min = Math.min(r, g, b)
    let h, s, l = (max + min) / 2

    if (max === min) {
      h = s = 0
    } else {
      const d = max - min
      s = l > 0.5 ? d / (2 - max - min) : d / (max + min)
      switch (max) {
        case r: h = (g - b) / d + (g < b ? 6 : 0); break
        case g: h = (b - r) / d + 2; break
        case b: h = (r - g) / d + 4; break
      }
      h /= 6
    }

    return { h: h * 360, s: s * 100, l: l * 100 }
  }
}
    