import { motion } from 'framer-motion'
import { Trophy } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import site from '../../content/site.json'
import Card from '../ui/Card.jsx'
import { fadeUp, staggerContainer } from '../../lib/animations.js'
import achievements from '../../content/achievements.json'

export default function Achievements() {
  return (
    <section id="achievements" className="section-container relative overflow-hidden py-20 sm:py-28">
      <SectionHeading
        {...site.sections.achievements}
      />

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {achievements.map((achievement) => (
          <motion.div key={achievement.title} variants={fadeUp}>
            <Card className="flex h-full flex-col gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
                <Trophy className="h-4 w-4" />
              </span>
              <h3 className="font-heading text-sm font-semibold text-fg-primary sm:text-base">
                {achievement.title}
              </h3>
              <p className="text-sm text-accent-secondary">{achievement.result}</p>
              <p className="mt-auto font-mono text-xs text-fg-muted">{achievement.year}</p>
            </Card>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
