import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const INTERACTIVE_SELECTOR = 'a, button, [role="button"], [data-cursor-text]'
const TEXT_INPUT_SELECTOR = 'input, textarea, select, [contenteditable="true"]'

// Minimal two-part cursor: a dot that tracks exactly, and a larger ring that
// trails slightly behind (spring physics). Grows + tints on interactive
// elements, shows a contextual label from `data-cursor-text` when present,
// and steps aside entirely on touch devices or over text inputs (native
// cursor takes over there for precise editing).
export default function CustomCursor() {
  const [enabled, setEnabled] = useState(false)
  const [mode, setMode] = useState('default') // 'default' | 'hover' | 'hidden'
  const [label, setLabel] = useState(null)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 300, damping: 30, mass: 0.5 })
  const ringY = useSpring(y, { stiffness: 300, damping: 30, mass: 0.5 })

  useEffect(() => {
    const supportsHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    setEnabled(supportsHover)
    if (!supportsHover) return

    document.documentElement.classList.add('custom-cursor-active')

    function handleMove(e) {
      x.set(e.clientX)
      y.set(e.clientY)

      const target = e.target
      if (target.closest?.(TEXT_INPUT_SELECTOR)) {
        setMode('hidden')
        setLabel(null)
        return
      }
      const interactive = target.closest?.(INTERACTIVE_SELECTOR)
      if (interactive) {
        setMode('hover')
        setLabel(interactive.getAttribute('data-cursor-text'))
      } else {
        setMode('default')
        setLabel(null)
      }
    }

    function handleLeave() {
      setMode('hidden')
    }

    window.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseleave', handleLeave)
    return () => {
      window.removeEventListener('mousemove', handleMove)
      document.removeEventListener('mouseleave', handleLeave)
      document.documentElement.classList.remove('custom-cursor-active')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (!enabled) return null

  const hidden = mode === 'hidden'
  const hover = mode === 'hover'

  return (
    <>
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] h-2 w-2 rounded-full bg-accent-primary"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
        animate={{ opacity: hidden ? 0 : 1, scale: hover ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[200] flex items-center justify-center rounded-full border border-accent-primary"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: hidden ? 0 : 1,
          width: hover ? 64 : 28,
          height: hover ? 64 : 28,
          backgroundColor: hover ? 'color-mix(in srgb, var(--accent-primary) 12%, transparent)' : 'transparent',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {label && (
          <span className="whitespace-nowrap font-mono text-[10px] uppercase tracking-wide text-accent-primary">
            {label}
          </span>
        )}
      </motion.div>
    </>
  )
}
