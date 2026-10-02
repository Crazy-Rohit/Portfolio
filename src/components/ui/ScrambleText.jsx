import { useCallback, useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

const GLYPHS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$%^&*'
const TICK_MS = 30
// how many ticks each character spends scrambling before it locks in
const TICKS_PER_CHAR = 1.5

function randomGlyph() {
  return GLYPHS[Math.floor(Math.random() * GLYPHS.length)]
}

// Cycles random glyphs, then resolves the real text left to right. Runs once
// when it first scrolls into view, and again on every hover. Monospace keeps
// the width stable while the characters churn, so nothing around it shifts.
export default function ScrambleText({ text, className = 'text-fg-muted' }) {
  const ref = useRef(null)
  const intervalRef = useRef(null)
  const [display, setDisplay] = useState(text)
  const inView = useInView(ref, { once: true, amount: 0.6 })

  const scramble = useCallback(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    clearInterval(intervalRef.current)

    let tick = 0
    intervalRef.current = setInterval(() => {
      const revealed = Math.floor(tick / TICKS_PER_CHAR)
      setDisplay(
        text
          .split('')
          .map((char, i) => (i < revealed || char === ' ' ? char : randomGlyph()))
          .join(''),
      )
      if (revealed >= text.length) clearInterval(intervalRef.current)
      tick++
    }, TICK_MS)
  }, [text])

  useEffect(() => {
    if (inView) scramble()
  }, [inView, scramble])

  useEffect(() => () => clearInterval(intervalRef.current), [])

  return (
    <span
      ref={ref}
      onMouseEnter={scramble}
      className={`font-mono transition-colors duration-300 hover:text-accent-glow ${className}`}
    >
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span>
    </span>
  )
}
