import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { BookOpen, Hammer, Rocket } from 'lucide-react'
import Badge from '../ui/Badge.jsx'
import ScrambleText from '../ui/ScrambleText.jsx'
import { fadeUp, staggerContainer } from '../../lib/animations.js'
import site from '../../content/site.json'

const PULL_QUOTE = [
  { word: site.aboutPullQuote[0], icon: BookOpen },
  { word: site.aboutPullQuote[1], icon: Hammer },
  { word: site.aboutPullQuote[2], icon: Rocket },
]

export default function About() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const y = useTransform(scrollYProgress, [0, 1], [24, -24])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="section-container relative overflow-hidden py-20 sm:py-28"
    >
      <motion.div
        className="grid grid-cols-1 items-center gap-12 lg:grid-cols-[1.3fr_1fr]"
        variants={staggerContainer(0.15)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
      >
        <div className="flex flex-col gap-5">
          <motion.div variants={fadeUp}>
            <Badge tone="accent">{site.availabilityBadge}</Badge>
          </motion.div>

          <motion.span
            variants={fadeUp}
            className="font-mono text-xs uppercase tracking-[0.2em] text-accent-primary"
          >
            {site.aboutEyebrow}
          </motion.span>

          <motion.h2 variants={fadeUp} className="font-heading text-3xl font-semibold sm:text-4xl">
            {site.aboutHeading}
          </motion.h2>

          <div className="flex max-w-xl flex-col gap-4">
            {site.aboutBio.map((paragraph, i) => (
              <motion.p key={i} variants={fadeUp} className="text-base text-fg-muted sm:text-lg">
                {paragraph}
              </motion.p>
            ))}
          </div>

          <motion.div
            variants={fadeUp}
            className="grid max-w-xl grid-cols-2 gap-4 border-t border-line-subtle pt-5 sm:grid-cols-4"
          >
            {site.aboutFacts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-1">
                <span className="text-[11px] uppercase tracking-wide">
                  <ScrambleText text={fact.label} />
                </span>
                <span className="text-sm font-medium text-fg-primary">{fact.value}</span>
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div style={{ y }} variants={fadeUp} className="flex justify-center lg:justify-end">
          <div className="flex flex-col gap-4 rounded-2xl border border-line-subtle bg-bg-elevated p-6 shadow-card">
            {PULL_QUOTE.map(({ word, icon: Icon }, i) => (
              <div key={word} className="flex items-center gap-3">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
                  <Icon className="h-4 w-4" />
                </span>
                <span className="font-heading text-xl font-semibold text-fg-primary">{word}</span>
                {i < PULL_QUOTE.length - 1 && (
                  <span className="ml-auto text-fg-muted">&darr;</span>
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
