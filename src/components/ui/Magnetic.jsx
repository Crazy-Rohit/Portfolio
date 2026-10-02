import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

const SPRING = { stiffness: 150, damping: 15, mass: 0.1 }

// Gently pulls its child toward the cursor while hovered, then springs back
// to rest on leave. Motion values only — no React re-renders per mousemove.
export default function Magnetic({ children, strength = 0.2, className = '', ...props }) {
  const ref = useRef(null)
  const x = useSpring(useMotionValue(0), SPRING)
  const y = useSpring(useMotionValue(0), SPRING)

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    x.set((e.clientX - (rect.left + rect.width / 2)) * strength)
    y.set((e.clientY - (rect.top + rect.height / 2)) * strength)
  }

  function handleMouseLeave() {
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x, y }}
      className={`inline-block ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  )
}
