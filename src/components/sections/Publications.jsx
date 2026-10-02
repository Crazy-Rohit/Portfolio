import { motion } from 'framer-motion'
import { ExternalLink, FileText } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import site from '../../content/site.json'
import Badge from '../ui/Badge.jsx'
import Card from '../ui/Card.jsx'
import { fadeUp } from '../../lib/animations.js'
import publications from '../../content/publications.json'

// small per-column delay so a row of cards still cascades in left to right
const withDelay = (variants, delay) => ({
  ...variants,
  show: { ...variants.show, transition: { ...variants.show.transition, delay } },
})

export default function Publications() {
  return (
    <section id="publications" className="section-container relative overflow-hidden py-20 sm:py-28">
      <SectionHeading
        {...site.sections.publications}
      />

      {/* each card observes its own visibility — a single observer on the
          whole grid needed 30% of it on screen at once, which a tall
          single-column stack on mobile can never satisfy, so cards stayed
          invisible forever */}
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {publications.map((pub, i) => (
          <motion.div
            key={pub.title}
            variants={withDelay(fadeUp, (i % 3) * 0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.15 }}
          >
            <Card className="flex h-full flex-col gap-3">
              <div className="flex items-center justify-between gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
                  <FileText className="h-4 w-4" />
                </span>
                <Badge tone="accent">{pub.venue}</Badge>
              </div>

              <h3 className="font-heading text-base font-semibold text-fg-primary sm:text-lg">
                {pub.title}
              </h3>

              <div className="mt-auto flex flex-col gap-1 font-mono text-xs text-fg-muted">
                {pub.authors && <span>{pub.authors}</span>}
                <span>
                  {pub.date}
                  {pub.doi && <span className="ml-1">· DOI: {pub.doi}</span>}
                </span>
              </div>

              <a
                href={pub.url}
                target="_blank"
                rel="noreferrer"
                className="mt-1 inline-flex w-fit items-center gap-2 text-sm text-accent-primary hover:underline"
              >
                Read paper <ExternalLink className="h-3.5 w-3.5" />
              </a>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
