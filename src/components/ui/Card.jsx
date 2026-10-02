import { useRef } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'

export default function Card({ children, className = '', hover = true, ...props }) {
  const ref = useRef(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  const rotateX = useSpring(useTransform(my, [0, 1], [7, -7]), { stiffness: 300, damping: 25 })
  const rotateY = useSpring(useTransform(mx, [0, 1], [-7, 7]), { stiffness: 300, damping: 25 })

  function handleMouseMove(e) {
    const rect = ref.current.getBoundingClientRect()
    const px = (e.clientX - rect.left) / rect.width
    const py = (e.clientY - rect.top) / rect.height
    mx.set(px)
    my.set(py)
    ref.current.style.setProperty('--spot-x', `${px * 100}%`)
    ref.current.style.setProperty('--spot-y', `${py * 100}%`)
  }

  function handleMouseLeave() {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={hover ? handleMouseMove : undefined}
      onMouseLeave={hover ? handleMouseLeave : undefined}
      style={hover ? { rotateX, rotateY, transformPerspective: 900, transformStyle: 'preserve-3d' } : undefined}
      className="group relative h-full overflow-hidden rounded-2xl border border-line-subtle bg-transparent shadow-card transition-colors"
      whileHover={hover ? { scale: 1.02 } : undefined}
      transition={{ duration: 0.25, ease: 'easeOut' }}
      {...props}
    >
      {hover && (
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              'radial-gradient(220px circle at var(--spot-x, 50%) var(--spot-y, 50%), color-mix(in srgb, var(--accent-primary) 18%, transparent), transparent 70%)',
          }}
        />
      )}
      {/* the caller's className (layout/grid/flex/padding overrides) applies
          here, on the element that's actually the direct parent of their
          content — not on the outer shell, which only owns the card chrome */}
      <div className={`relative z-10 h-full p-6 ${className}`} style={{ transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  )
}
