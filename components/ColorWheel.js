import { useEffect, useRef } from 'react'

export default function ColorWheel({ color, onChange }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    drawColorWheel()
  }, [color])

  const drawColorWheel = () => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 5

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Draw color wheel
    for (let angle = 0; angle < 360; angle++) {
      const startAngle = (angle - 1) * Math.PI / 180
      const endAngle = (angle + 1) * Math.PI / 180

      ctx.beginPath()
      ctx.moveTo(centerX, centerY)
      ctx.arc(centerX, centerY, radius, startAngle, endAngle)
      ctx.closePath()

      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius)
      gradient.addColorStop(0, '#FFFFFF')
      gradient.addColorStop(1, `hsl(${angle}, 100%, 50%)`)
      
      ctx.fillStyle = gradient
      ctx.fill()
    }

    // Draw color indicator
    const hsl = hexToHsl(color)
    const indicatorAngle = hsl.h * Math.PI / 180
    const indicatorRadius = radius * (1 - hsl.s / 100)
    
    ctx.beginPath()
    ctx.arc(
      centerX + indicatorRadius * Math.cos(indicatorAngle),
      centerY - indicatorRadius * Math.sin(indicatorAngle),
      8, 0, 2 * Math.PI
    )
    ctx.fillStyle = color
    ctx.strokeStyle = hsl.l > 50 ? '#000000' : '#FFFFFF'
    ctx.lineWidth = 2
    ctx.fill()
    ctx.stroke()
  }

  const handleCanvasClick = (event) => {
    const canvas = canvasRef.current
    const rect = canvas.getBoundingClientRect()
    const x = event.clientX - rect.left
    const y = event.clientY - rect.top
    
    const centerX = canvas.width / 2
    const centerY = canvas.height / 2
    const radius = Math.min(centerX, centerY) - 5

    const dx = x - centerX
    const dy = y - centerY
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance <= radius) {
      const angle = (Math.atan2(-dy, dx) + Math.PI) * 180 / Math.PI
      const saturation = Math.min(distance / radius * 100, 100)
      
      const hsl = { h: angle, s: saturation, l: 50 }
      const newColor = hslToHex(hsl)
      onChange(newColor)
    }
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

  function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null
  }

  function hslToHex({ h, s, l }) {
    l /= 100
    const a = s * Math.min(l, 1 - l) / 100
    const f = n => {
      const k = (n + h / 30) % 12
      const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1)
      return Math.round(255 * color).toString(16).padStart(2, '0')
    }
    return `#${f(0)}${f(8)}${f(4)}`
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200">Color Wheel</h2>
      <canvas
        ref={canvasRef}
        width={300}
        height={300}
        onClick={handleCanvasClick}
        className="mx-auto cursor-pointer"
      ></canvas>
    </div>
  )
}