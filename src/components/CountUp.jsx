import { useEffect, useRef, useState } from 'react'

// 支持数字里带小数点的场景（如 44.2），非数字字符（如逗号）原样保留在前后缀中
export default function CountUp({ value, duration = 1400, className, style }) {
  const ref = useRef(null)
  const [display, setDisplay] = useState('0')
  const started = useRef(false)

  const match = String(value).match(/^([^\d]*)([\d,]*\.?\d+)([^\d]*)$/)
  const prefix = match ? match[1] : ''
  const numStr = match ? match[2].replace(/,/g, '') : '0'
  const suffix = match ? match[3] : ''
  const target = parseFloat(numStr) || 0
  const decimals = numStr.includes('.') ? numStr.split('.')[1].length : 0
  const hasComma = match && match[2].includes(',')

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true
          const start = performance.now()
          const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1)
            const eased = 1 - Math.pow(1 - progress, 3)
            const current = target * eased
            const formatted = hasComma
              ? Math.round(current).toLocaleString('en-US')
              : current.toFixed(decimals)
            setDisplay(formatted)
            if (progress < 1) requestAnimationFrame(tick)
          }
          requestAnimationFrame(tick)
          io.unobserve(entry.target)
        }
      },
      { threshold: 0.3 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [target, duration, decimals, hasComma])

  return (
    <span ref={ref} className={className} style={style}>
      {prefix}
      {display}
      {suffix}
    </span>
  )
}
