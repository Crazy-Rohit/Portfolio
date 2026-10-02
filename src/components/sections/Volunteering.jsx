import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading.jsx'
import site from '../../content/site.json'
import Card from '../ui/Card.jsx'
import { fadeUp, staggerContainer } from '../../lib/animations.js'
import volunteering from '../../content/volunteering.json'

export default function Volunteering() {
  return (
    <section id="volunteering" className="section-container relative overflow-hidden py-20 sm:py-28">
      <SectionHeading
        {...site.sections.volunteering}
      />

      <motion.div
        className="grid grid-cols-1 gap-5 sm:grid-cols-2"
        variants={staggerContainer(0.1)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {volunteering.map((role) => (
          <Card key={`${role.org}-${role.role}`} variants={fadeUp}>
            <h3 className="font-heading text-base font-semibold text-fg-primary">{role.role}</h3>
            <p className="mt-1 font-mono text-sm text-accent-secondary">{role.org}</p>
            <p className="mt-1 text-xs text-fg-muted">{role.period}</p>
            <p className="mt-3 text-sm text-fg-muted">{role.description}</p>
          </Card>
        ))}
      </motion.div>
    </section>
  )
}
