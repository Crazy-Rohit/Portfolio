import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react'
import { GithubIcon } from '../ui/BrandIcons.jsx'
import { Link } from 'react-router-dom'
import SectionHeading from '../ui/SectionHeading.jsx'
import site from '../../content/site.json'
import Card from '../ui/Card.jsx'
import Badge from '../ui/Badge.jsx'
import StatRing from '../ui/StatRing.jsx'
import BrowserFrame from '../ui/BrowserFrame.jsx'
import ProjectThumb from '../ui/ProjectThumb.jsx'
import { fadeUp, staggerContainer } from '../../lib/animations.js'
import projects from '../../content/projects.json'
import publications from '../../content/publications.json'
import certifications from '../../content/certifications.json'
import achievements from '../../content/achievements.json'

const featured = projects.filter((p) => p.featured)
const secondary = projects.filter((p) => !p.featured)

const hackathonWins = achievements.filter((a) =>
  a.category === 'awards' && /winner/i.test(a.result),
).length

const STATS = [
  { value: projects.length, label: 'Projects shipped', color: 'var(--accent-primary)' },
  { value: publications.length, label: 'Publications', color: 'var(--accent-secondary)' },
  { value: certifications.length, label: 'Certifications', color: 'var(--success)' },
  { value: hackathonWins, label: 'Hackathon wins', color: 'var(--accent-glow)' },
].filter((stat) => stat.value > 0)

export default function Projects() {
  const [index, setIndex] = useState(0)

  const current = featured[index]
  const goPrev = () => setIndex((i) => (i - 1 + featured.length) % featured.length)
  const goNext = () => setIndex((i) => (i + 1) % featured.length)

  // arrow-key navigation for the carousel, in addition to click/tap arrows
  useEffect(() => {
    function onKeyDown(e) {
      if (e.key === 'ArrowLeft') goPrev()
      if (e.key === 'ArrowRight') goNext()
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <section id="projects" className="section-container relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-80 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,black,transparent)]" />
      <SectionHeading {...site.sections.projects} />

      <motion.div
        className="mb-14 grid grid-cols-2 gap-4 sm:grid-cols-4"
        variants={staggerContainer(0.08)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
      >
        {STATS.map((stat) => (
          <motion.div key={stat.label} variants={fadeUp}>
            <StatRing {...stat} />
          </motion.div>
        ))}
      </motion.div>

      {current && (
        <motion.div
          className="mb-14"
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
        >
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2 lg:items-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={current.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.3 }}
                className="order-2 flex flex-col gap-4 lg:order-1"
              >
                <div className="flex flex-wrap gap-2">
                  {current.freelance && <Badge tone="accent">Freelance</Badge>}
                  {current.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                <h3 className="font-heading text-2xl font-semibold text-fg-primary sm:text-3xl">
                  {current.title}
                </h3>
                <p className="text-sm text-fg-muted sm:text-base">{current.description}</p>
                <ul className="flex flex-col gap-2">
                  {current.highlights.map((h, i) => (
                    <li key={i} className="flex gap-2 text-sm text-fg-muted">
                      <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent-primary" />
                      {h}
                    </li>
                  ))}
                </ul>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  {current.githubUrl && (
                    <a
                      href={current.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-line-subtle px-4 py-2 text-sm text-fg-primary transition hover:border-accent-primary/50 hover:text-accent-primary"
                    >
                      <GithubIcon className="h-4 w-4" /> Source
                    </a>
                  )}
                  {current.liveUrl && (
                    <a
                      href={current.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-accent-primary px-4 py-2 text-sm text-white"
                    >
                      <ExternalLink className="h-4 w-4" /> Live
                    </a>
                  )}
                  <Link
                    to={`/projects/${current.id}`}
                    className="text-sm text-accent-primary hover:underline"
                  >
                    View details &rarr;
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="relative order-1 mx-auto w-full max-w-sm lg:order-2">
              <Link to={`/projects/${current.id}`} data-cursor-text="View" className="block">
                <BrowserFrame>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={current.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <ProjectThumb src={current.image} alt={current.title} className="w-full h-auto" />
                    </motion.div>
                  </AnimatePresence>
                </BrowserFrame>
              </Link>

              {featured.length > 1 && (
                <>
                  <button
                    onClick={goPrev}
                    aria-label="Previous project"
                    className="absolute left-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line-subtle bg-bg-elevated/90 text-fg-primary shadow-card backdrop-blur transition hover:text-accent-primary active:scale-95"
                  >
                    <ChevronLeft className="h-5 w-5" />
                  </button>
                  <button
                    onClick={goNext}
                    aria-label="Next project"
                    className="absolute right-2 top-1/2 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-line-subtle bg-bg-elevated/90 text-fg-primary shadow-card backdrop-blur transition hover:text-accent-primary active:scale-95"
                  >
                    <ChevronRight className="h-5 w-5" />
                  </button>
                </>
              )}
            </div>
          </div>

          {featured.length > 1 && (
            <div className="mt-6 flex justify-center gap-2">
              {featured.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to ${p.title}`}
                  className={`h-2 rounded-full transition-all ${
                    i === index ? 'w-6 bg-accent-primary' : 'w-2 bg-line-subtle'
                  }`}
                />
              ))}
            </div>
          )}
        </motion.div>
      )}

      {secondary.length > 0 && (
        <div className="flex flex-col gap-5">
          <h3 className="text-center font-heading text-lg font-semibold text-fg-muted">
            More Projects
          </h3>
          <motion.div
            className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
            variants={staggerContainer(0.08)}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
          >
            {secondary.map((p) => (
              <Card key={p.id} variants={fadeUp} className="flex flex-col gap-3">
                <h4 className="font-heading text-base font-semibold text-fg-primary">{p.title}</h4>
                <p className="text-sm text-fg-muted">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <Badge key={t}>{t}</Badge>
                  ))}
                </div>
                {p.githubUrl && (
                  <a
                    href={p.githubUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex items-center gap-2 text-sm text-accent-primary hover:underline"
                  >
                    <GithubIcon className="h-4 w-4" /> View on GitHub
                  </a>
                )}
              </Card>
            ))}
          </motion.div>
        </div>
      )}
    </section>
  )
}
