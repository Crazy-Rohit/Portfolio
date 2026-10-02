import { motion } from 'framer-motion'
import { fadeUp } from '../../lib/animations.js'
import ScrambleText from './ScrambleText.jsx'

const titleContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
}

const wordReveal = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.6, ease: [0.33, 1, 0.68, 1] } },
}

export default function SectionHeading({ eyebrow, title, subtitle, align = 'center' }) {
  const alignment = align === 'left' ? 'items-start text-left' : 'items-center text-center'
  const words = title.split(' ')

  return (
    <motion.div
      className={`mb-12 flex flex-col gap-3 ${alignment}`}
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.4 }}
    >
      {eyebrow && (
        <span className="text-xs uppercase tracking-[0.2em]">
          <ScrambleText text={eyebrow} className="text-accent-primary" />
        </span>
      )}

      <motion.h2
        className="font-heading text-3xl font-semibold sm:text-4xl"
        variants={titleContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {words.map((word, i) => (
          <span key={i} className="mr-[0.25em] inline-block overflow-hidden pb-1 -mb-1 align-bottom last:mr-0">
            <motion.span variants={wordReveal} className="inline-block">
              {word}
            </motion.span>
          </span>
        ))}
      </motion.h2>

      {subtitle && <p className="max-w-2xl text-base text-fg-muted sm:text-lg">{subtitle}</p>}
    </motion.div>
  )
}
