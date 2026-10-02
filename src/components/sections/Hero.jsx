import { lazy, Suspense, useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Download, FolderGit2, Mail } from 'lucide-react'

// three.js/@react-three/fiber are heavy — split them out of the main bundle
const HeroCanvas = lazy(() => import('../three/HeroCanvas.jsx'))
import ProfileAvatar from '../graphics/ProfileAvatar.jsx'
import site from '../../content/site.json'
import skills from '../../content/skills.json'
import experience from '../../content/experience.json'
import { skillIconUrl } from '../../lib/skillIcons.js'
import { useTheme } from '../../hooks/useTheme.js'
import ScrambleText from '../ui/ScrambleText.jsx'

const currentRole = experience.find((job) => job.current) ?? experience[0]
const heroTechStack = skills.languagesAndFrameworks

export default function Hero() {
  const rootRef = useRef(null)
  const { theme } = useTheme()
  const stackIconUrl = skillIconUrl(heroTechStack, theme)

  // parallax: as you scroll past the Hero, the particle field + avatar lag
  // behind and fade slightly, separate from the canvas's own GSAP entrance
  // fade (a different DOM node, so the two never fight over the same style)
  const { scrollYProgress: heroScroll } = useScroll({
    target: rootRef,
    offset: ['start start', 'end start'],
  })
  const parallaxY = useTransform(heroScroll, [0, 1], [0, 140])
  const parallaxOpacity = useTransform(heroScroll, [0, 1], [1, 0.25])

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      // canvas + avatar start immediately, in parallel with the text —
      // previously they were queued at the very end of the chain and didn't
      // appear until ~3.5-4s in; now they're visible within ~1.2s
      tl.from('[data-hero="canvas"]', { opacity: 0, duration: 1.1 }, 0)
        .from('[data-hero="avatar"]', { opacity: 0, scale: 0.92, duration: 0.9 }, 0.1)
        .from('[data-hero="greeting"]', { opacity: 0, y: 16, duration: 0.5 }, 0)
        .from(
          '[data-hero="headline"] .hero-word',
          { opacity: 0, y: 28, stagger: 0.08, duration: 0.6 },
          0.2,
        )
        .from('[data-hero="description"]', { opacity: 0, y: 16, duration: 0.5 }, '-=0.25')
        .from('[data-hero="role"]', { opacity: 0, y: 12, duration: 0.4 }, '-=0.3')
        .from(
          '[data-hero="cta"]',
          { opacity: 0, y: 12, scale: 0.94, stagger: 0.1, duration: 0.4 },
          '-=0.2',
        )
        .from('[data-hero="stack"]', { opacity: 0, y: 10, duration: 0.4 }, '-=0.2')
        .from('[data-hero="watermark"]', { opacity: 0, duration: 1.4 }, 0)
    }, rootRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="hero"
      ref={rootRef}
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-mesh [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
        style={{ opacity: 'var(--gradient-mesh-opacity)' }}
      />

      {/* Mobile: name -> photo -> details. Desktop: text column on the left
          (intro on top, details below), photo spanning both rows on the right. */}
      <div className="section-container relative grid w-full grid-cols-1 items-center gap-8 pb-28 pt-12 sm:pb-36 lg:grid-cols-2 lg:grid-rows-[auto_auto] lg:gap-x-8 lg:gap-y-6">
        <div className="relative flex flex-col gap-6 text-center lg:col-start-1 lg:row-start-1 lg:self-end lg:text-left">
          <span
            data-hero="watermark"
            aria-hidden="true"
            className="pointer-events-none absolute -top-6 left-1/2 hidden -translate-x-1/2 whitespace-nowrap font-heading text-[5.5rem] font-bold uppercase leading-none text-transparent sm:block lg:left-0 lg:translate-x-0 lg:text-[7rem]"
            style={{ WebkitTextStroke: '1px var(--border-subtle)' }}
          >
            {site.name}
          </span>

          <p data-hero="greeting" className="relative text-sm">
            <ScrambleText text={site.greeting} className="text-accent-primary" />
          </p>

          <h1
            data-hero="headline"
            className="font-heading text-4xl font-semibold leading-tight sm:text-5xl lg:text-6xl"
          >
            {site.name.split(' ').map((word, i) => (
              <span key={i} className="hero-word mr-3 inline-block last:mr-0">
                {word}
              </span>
            ))}
            <span className="hero-word mt-2 block text-2xl font-medium text-fg-muted sm:text-3xl">
              {site.roleTitle}
            </span>
          </h1>
        </div>

        <motion.div
          style={{ y: parallaxY, opacity: parallaxOpacity }}
          className="relative h-[340px] sm:h-[480px] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:h-[640px]"
        >
          <div data-hero="canvas" className="absolute inset-0">
            <Suspense fallback={null}>
              <HeroCanvas />
            </Suspense>
            <div data-hero="avatar" className="absolute inset-0">
              <ProfileAvatar />
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-6 text-center lg:col-start-1 lg:row-start-2 lg:self-start lg:text-left">
          <p
            data-hero="description"
            className="mx-auto max-w-xl text-base text-fg-muted sm:text-lg lg:mx-0"
          >
            {site.heroDescription}
          </p>

          {currentRole && (
            <p data-hero="role" className="font-mono text-sm text-fg-muted">
              Currently building at{' '}
              <span className="text-accent-secondary">{currentRole.company}</span> as{' '}
              {currentRole.role}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center gap-3 lg:justify-start">
            {site.resumeUrl && (
              <a
                data-hero="cta"
                href={site.resumeUrl}
                download
                className="inline-flex items-center gap-2 rounded-full bg-accent-primary px-5 py-2.5 text-sm font-medium text-white shadow-card transition hover:-translate-y-0.5 hover:shadow-lg"
              >
                <Download className="h-4 w-4" /> Download Resume
              </a>
            )}
            <a
              data-hero="cta"
              href="#projects"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 rounded-full border border-line-subtle px-5 py-2.5 text-sm font-medium text-fg-primary transition hover:border-accent-primary/50 hover:text-accent-primary"
            >
              <FolderGit2 className="h-4 w-4" /> View Projects
            </a>
            <a
              data-hero="cta"
              href="#contact"
              onClick={(e) => {
                e.preventDefault()
                document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="inline-flex items-center gap-2 rounded-full border border-line-subtle px-5 py-2.5 text-sm font-medium text-fg-primary transition hover:border-accent-primary/50 hover:text-accent-primary"
            >
              <Mail className="h-4 w-4" /> Contact
            </a>
          </div>

          {stackIconUrl && (
            <div data-hero="stack" className="flex justify-center lg:justify-start">
              <img
                src={stackIconUrl}
                alt={`Core tech stack: ${heroTechStack.join(', ')}`}
                className="h-8"
                loading="lazy"
              />
            </div>
          )}
        </div>
      </div>

      {/* soft fade into the next section so the hero never ends on a hard
          edge — the parallax avatar and gradient mesh dissolve instead of
          being sliced off by overflow-hidden */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 z-10 h-32 bg-gradient-to-b from-transparent to-bg-base sm:h-40"
      />
    </section>
  )
}
