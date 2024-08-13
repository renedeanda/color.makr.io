
import { useState } from 'react'

export default function ColorImageExtractor({ onColorExtract }) {
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
        extractColor(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const extractColor = (imageSrc) => {
    const img = new Image()
    img.crossOrigin = 'Anonymous'
    img.onload = () => {
      const canvas = document.createElement('canvas')
      const ctx = canvas.getContext('2d')
      canvas.width = img.width
      canvas.height = img.height
      ctx.drawImage(img, 0, 0, img.width, img.height)
      
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height)
      const data = imageData.data
      let r = 0, g = 0, b = 0

      for (let i = 0; i < data.length; i += 4) {
        r += data[i]
        g += data[i + 1]
        b += data[i + 2]
      }

      r = Math.floor(r / (data.length / 4))
      g = Math.floor(g / (data.length / 4))
      b = Math.floor(b / (data.length / 4))

      const hex = rgbToHex(r, g, b)
      onColorExtract(hex)
    }
    img.src = imageSrc
  }

  function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Extract Color from Image</h2>
      <input
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        className="mb-4"
      />
      {imagePreview && (
        <img src={imagePreview} alt="Uploaded" className="max-w-full h-auto mb-4 rounded-lg" />
      )}
    </div>
  )
}
    