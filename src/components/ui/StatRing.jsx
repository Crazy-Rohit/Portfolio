import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const SIZE = 96
const STROKE = 6
const RADIUS = (SIZE - STROKE) / 2
const CIRCUMFERENCE = 2 * Math.PI * RADIUS

export default function StatRing({ value, label, suffix = '', color = 'var(--accent-primary)' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.6 })
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!inView) return
    const duration = 1200
    const start = performance.now()

    let frame
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.round(progress * value))
      if (progress < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [inView, value])

  const ratio = value === 0 ? 0 : count / value
  const offset = CIRCUMFERENCE * (1 - ratio)

  return (
    <div ref={ref} className="flex flex-col items-center gap-3">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg width={SIZE} height={SIZE} className="-rotate-90">
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="var(--border-subtle)"
            strokeWidth={STROKE}
          />
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke={color}
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRCUMFERENCE}
            strokeDashoffset={offset}
            style={{ transition: 'stroke-dashoffset 0.1s linear' }}
          />
        </svg>
        <span className="absolute inset-0 flex items-center justify-center font-heading text-2xl font-semibold">
          {count}
          {suffix}
        </span>
      </div>
      <p className="text-sm text-fg-muted">{label}</p>
    </div>
  )
}
