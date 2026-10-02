import { useEffect, useRef } from 'react'
import {
  motion,
  useMotionValue,
  animate,
  useScroll,
  useVelocity,
  useSpring,
  useTransform,
  useReducedMotion,
} from 'framer-motion'

const MAX_SKEW = 8

// Continuously auto-scrolls, but the user can grab and drag it manually at
// any time — dragging pauses the auto-scroll, and it resumes smoothly from
// wherever it was released.
//
// It also leans with scroll speed: fast scrolling skews the row (up to
// MAX_SKEW degrees), and a spring eases it back to 0 once scrolling stops.
// The skew lives on its own wrapper — never on the dragged track — so it
// can't fight the drag/auto-scroll `x` value, and it only reads window
// scroll (no ScrollTrigger), so GSAP timelines are untouched.
export default function Marquee({ children, duration = 28 }) {
  const trackRef = useRef(null)
  const x = useMotionValue(0)

  const reduceMotion = useReducedMotion()
  const { scrollY } = useScroll()
  const scrollVelocity = useVelocity(scrollY)
  const smoothVelocity = useSpring(scrollVelocity, { stiffness: 400, damping: 50 })
  const skewX = useTransform(smoothVelocity, [-2000, 0, 2000], [MAX_SKEW, 0, -MAX_SKEW], {
    clamp: true,
  })
  const animationRef = useRef(null)
  const widthRef = useRef(0)

  useEffect(() => {
    widthRef.current = trackRef.current.scrollWidth / 2
    play()
    return () => animationRef.current?.stop()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function play() {
    const width = widthRef.current
    if (!width) return
    const current = x.get()
    const normalized = ((current % width) + width) % width
    x.set(-normalized)
    animationRef.current = animate(x, -width, {
      duration: duration * (1 - normalized / width),
      ease: 'linear',
      onComplete: () => {
        x.set(0)
        play()
      },
    })
  }

  return (
    <div className="relative overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
      <motion.div style={reduceMotion ? undefined : { skewX }}>
        <motion.div
          ref={trackRef}
          data-cursor-text="Drag"
          className="flex w-max items-center gap-8"
          style={{ x }}
          drag="x"
          dragConstraints={{ left: -widthRef.current * 3, right: widthRef.current }}
          dragElastic={0.08}
          onDragStart={() => animationRef.current?.stop()}
          onDragEnd={play}
        >
          <div className="flex items-center gap-8">{children}</div>
          <div className="flex items-center gap-8" aria-hidden="true">
            {children}
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
