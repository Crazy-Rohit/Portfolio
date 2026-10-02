import { useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, ExternalLink } from 'lucide-react'
import { GithubIcon } from '../components/ui/BrandIcons.jsx'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '../components/layout/PageWrapper.jsx'
import Badge from '../components/ui/Badge.jsx'
import BrowserFrame from '../components/ui/BrowserFrame.jsx'
import ProjectThumb from '../components/ui/ProjectThumb.jsx'
import SectionGlow from '../components/ui/SectionGlow.jsx'
import projects from '../content/projects.json'
import site from '../content/site.json'

export default function ProjectDetail() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [id])

  if (!project) {
    return (
      <PageWrapper>
        <div className="section-container flex flex-col items-center gap-4 py-24 text-center">
          <h1 className="font-heading text-2xl font-semibold">Project not found</h1>
          <Link to="/#projects" className="text-accent-primary hover:underline">
            &larr; Back to projects
          </Link>
        </div>
      </PageWrapper>
    )
  }

  return (
    <PageWrapper>
      <Helmet>
        <title>{`${project.title} — ${site.name}`}</title>
        <meta name="description" content={project.description} />
      </Helmet>

      {/* bottom-to-top curtain reveal — keyed per project so it replays on
          every navigation between project detail pages, not just the first */}
      <motion.div
        key={project.id}
        initial={{ scaleY: 1 }}
        animate={{ scaleY: 0 }}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1], delay: 0.1 }}
        style={{ originY: 0, background: 'var(--bg-base)' }}
        className="pointer-events-none fixed inset-0 z-40"
      />

      <article className="section-container relative overflow-hidden flex flex-col gap-8 py-12">
        <SectionGlow variant="primary" className="-right-16 top-0 h-64 w-64" />
        <Link
          to="/#projects"
          className="inline-flex w-fit items-center gap-2 text-sm text-fg-muted hover:text-accent-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to projects
        </Link>

        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap gap-2">
            {project.freelance && <Badge tone="accent">Freelance</Badge>}
            {project.tech.map((t) => (
              <Badge key={t}>{t}</Badge>
            ))}
          </div>
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl">{project.title}</h1>
          <p className="font-mono text-sm text-fg-muted">{project.period}</p>
          <p className="max-w-2xl text-base text-fg-muted sm:text-lg">{project.description}</p>

          <div className="flex flex-wrap items-center gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line-subtle px-4 py-2 text-sm hover:border-accent-primary/50 hover:text-accent-primary"
              >
                <GithubIcon className="h-4 w-4" /> Source
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-accent-primary px-4 py-2 text-sm text-white"
              >
                <ExternalLink className="h-4 w-4" /> Live
              </a>
            )}
          </div>
        </div>

        <BrowserFrame className="max-w-sm">
          <ProjectThumb src={project.image} alt={project.title} className="w-full h-auto" />
        </BrowserFrame>

        {project.highlights?.length > 0 && (
          <div className="max-w-2xl">
            <h2 className="mb-3 font-heading text-lg font-semibold">Highlights</h2>
            <ul className="flex flex-col gap-2">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-2 text-sm text-fg-muted sm:text-base">
                  <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent-primary" />
                  {h}
                </li>
              ))}
            </ul>
          </div>
        )}
      </article>
    </PageWrapper>
  )
}
