import { motion } from 'framer-motion'
import { Award, ExternalLink } from 'lucide-react'
import SectionHeading from '../ui/SectionHeading.jsx'
import site from '../../content/site.json'
import Card from '../ui/Card.jsx'
import { fadeUp, staggerContainer } from '../../lib/animations.js'
import { useTheme } from '../../hooks/useTheme.js'
import { issuerIconUrl } from '../../lib/issuerIcons.js'
import certifications from '../../content/certifications.json'

export default function Certifications() {
  const { theme } = useTheme()

  return (
    <section id="certifications" className="section-container relative overflow-hidden py-20 sm:py-28">
      <SectionHeading
        {...site.sections.certifications}
      />

      <motion.div
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {certifications.map((cert) => {
          const iconUrl = issuerIconUrl(cert.issuer, theme)

          return (
            <motion.div key={cert.title} variants={fadeUp}>
              <Card className="flex h-full flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  {iconUrl ? (
                    <img src={iconUrl} alt={cert.issuer} className="h-8 w-8" loading="lazy" />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
                      <Award className="h-4 w-4" />
                    </span>
                  )}
                  {cert.url && (
                    <a
                      href={cert.url}
                      target="_blank"
                      rel="noreferrer"
                      className="text-fg-muted transition-colors hover:text-accent-primary"
                      aria-label={`View credential: ${cert.title}`}
                    >
                      <ExternalLink className="h-4 w-4" />
                    </a>
                  )}
                </div>
                <h3 className="font-heading text-sm font-semibold text-fg-primary sm:text-base">
                  {cert.title}
                </h3>
                <p className="mt-auto text-sm text-accent-secondary">{cert.issuer}</p>
                {cert.date && <p className="font-mono text-xs text-fg-muted">{cert.date}</p>}
              </Card>
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
