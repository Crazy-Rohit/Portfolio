import { motion } from 'framer-motion'
import { Braces, Cpu, Sparkles } from 'lucide-react'
import site from '../../content/site.json'

const FLOATERS = [
  { Icon: Braces, className: 'left-2 top-8 sm:left-4', delay: 0 },
  { Icon: Cpu, className: 'right-2 top-16 sm:right-4', delay: 0.6 },
  { Icon: Sparkles, className: 'bottom-10 left-6', delay: 1.2 },
]

// Real profile photo (background removed) placed directly over the ambient
// glow, no card/backdrop around it.
export default function ProfileAvatar() {
  return (
    <div className="relative flex h-full w-full items-center justify-center">
      <motion.div
        aria-hidden="true"
        className="absolute z-0 h-2/3 w-2/3 rounded-full"
        style={{
          background:
            'radial-gradient(circle, var(--accent-secondary) 0%, var(--accent-primary) 45%, transparent 70%)',
          filter: 'blur(48px)',
        }}
        animate={{ opacity: [0.35, 0.55, 0.35], scale: [1, 1.05, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
      />

      {FLOATERS.map(({ Icon, className, delay }, i) => (
        <motion.span
          key={i}
          className={`absolute z-10 flex h-9 w-9 items-center justify-center rounded-xl border border-line-subtle bg-bg-elevated/80 text-accent-primary shadow-card backdrop-blur ${className}`}
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay }}
        >
          <Icon className="h-4 w-4" />
        </motion.span>
      ))}

      <motion.img
        src={site.avatar}
        alt={site.name}
        className="relative z-20 h-full w-auto object-contain"
        style={{ filter: 'drop-shadow(0 12px 24px rgba(0,0,0,0.35))' }}
        initial={{ clipPath: 'circle(0% at 50% 35%)', scale: 1.08 }}
        animate={{ clipPath: 'circle(75% at 50% 35%)', scale: 1 }}
        transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
      />
    </div>
  )
}
