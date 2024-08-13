
export default function ExportOptions({ palette, gradient }) {
  const generateCSS = () => {
    let css = '/* Color Palette */\n'
    palette.forEach((color, index) => {
      css += `--color-${index + 1}: ${color};\n`
    })
    css += '\n/* Gradient */\n'
    css += `background: linear-gradient(90deg, ${gradient.start}, ${gradient.end});`
    return css
  }

  const generateSCSS = () => {
    let scss = '// Color Palette\n'
    palette.forEach((color, index) => {
      scss += `$color-${index + 1}: ${color};\n`
    })
    scss += '\n// Gradient\n'
    scss += `$gradient: linear-gradient(90deg, ${gradient.start}, ${gradient.end});`
    return scss
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text).then(() => {
      alert('Copied to clipboard!')
    }, (err) => {
      console.error('Could not copy text: ', err)
    })
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Export Options</h2>
      <div className="space-y-4">
        <button
          onClick={() => copyToClipboard(generateCSS())}
          className="w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Copy CSS
        </button>
        <button
          onClick={() => copyToClipboard(generateSCSS())}
          className="w-full bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded"
        >
          Copy SCSS
        </button>
      </div>
    </div>
  )
}
    