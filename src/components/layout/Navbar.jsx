import { useEffect, useRef, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Download, Menu, X } from 'lucide-react'
import ThemeToggle from './ThemeToggle.jsx'
import Magnetic from '../ui/Magnetic.jsx'
import { fadeUp, staggerContainer } from '../../lib/animations.js'
import site from '../../content/site.json'
import { NAV_SECTIONS } from '../../lib/sections.js'

const SECTIONS = NAV_SECTIONS

export default function Navbar() {
  const [active, setActive] = useState('')
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/'
  const observerRef = useRef(null)

  useEffect(() => {
    if (!isHome) {
      setActive('')
      return
    }

    const elements = SECTIONS.map((s) => document.getElementById(s.id)).filter(Boolean)
    if (elements.length === 0) return

    observerRef.current?.disconnect()
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 },
    )
    elements.forEach((el) => observer.observe(el))
    observerRef.current = observer

    return () => observer.disconnect()
  }, [isHome, location.pathname])

  function handleSectionClick(e, id) {
    e.preventDefault()
    setOpen(false)
    if (isHome) {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    } else {
      navigate(`/#${id}`)
    }
  }

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="fixed inset-x-0 top-4 z-50 flex justify-center px-4"
    >
      <nav className="flex w-full max-w-content items-center justify-between gap-4 rounded-full border border-line-subtle bg-bg-elevated/80 px-4 py-2 shadow-card backdrop-blur-md sm:px-6">
        <Link
          to="/"
          className="font-heading text-sm font-semibold tracking-tight text-fg-primary sm:text-base"
        >
          {site.name}
        </Link>

        <motion.div
          className="hidden items-center gap-0.5 xl:flex"
          variants={staggerContainer(0.05, 0.15)}
          initial="hidden"
          animate="show"
        >
          {SECTIONS.map((section) => (
            <Magnetic key={section.id}>
              <motion.a
                variants={fadeUp}
                href={`/#${section.id}`}
                onClick={(e) => handleSectionClick(e, section.id)}
                className={`block rounded-full px-2.5 py-1.5 text-[13px] transition-colors ${
                  active === section.id
                    ? 'bg-accent-primary/10 text-accent-primary'
                    : 'text-fg-muted hover:text-fg-primary'
                }`}
              >
                {section.label}
              </motion.a>
            </Magnetic>
          ))}
          <Magnetic>
            <motion.div variants={fadeUp}>
              <Link
                to="/blog"
                className={`block rounded-full px-2.5 py-1.5 text-[13px] transition-colors ${
                  location.pathname.startsWith('/blog')
                    ? 'bg-accent-primary/10 text-accent-primary'
                    : 'text-fg-muted hover:text-fg-primary'
                }`}
              >
                Blog
              </Link>
            </motion.div>
          </Magnetic>
        </motion.div>

        <div className="flex items-center gap-2">
          {site.resumeUrl && (
            <>
              <a
                href={site.resumeUrl}
                download
                aria-label="Download resume"
                className="hidden h-9 items-center gap-1.5 rounded-full border border-line-subtle px-3 text-sm text-fg-muted transition-colors hover:text-accent-primary sm:flex"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
              <a
                href={site.resumeUrl}
                download
                aria-label="Download resume"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line-subtle text-fg-muted transition-colors hover:text-accent-primary sm:hidden"
              >
                <Download className="h-4 w-4" />
              </a>
            </>
          )}
          <ThemeToggle />
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-line-subtle text-fg-muted xl:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute left-4 right-4 top-[72px] rounded-2xl border border-line-subtle bg-bg-elevated p-4 shadow-card xl:hidden">
          <div className="flex flex-col gap-1">
            {SECTIONS.map((section) => (
              <a
                key={section.id}
                href={`/#${section.id}`}
                onClick={(e) => handleSectionClick(e, section.id)}
                className={`rounded-lg px-3 py-2 text-sm transition-colors ${
                  active === section.id
                    ? 'bg-accent-primary/10 text-accent-primary'
                    : 'text-fg-muted hover:text-fg-primary'
                }`}
              >
                {section.label}
              </a>
            ))}
            <Link
              to="/blog"
              onClick={() => setOpen(false)}
              className="rounded-lg px-3 py-2 text-sm text-fg-muted hover:text-fg-primary"
            >
              Blog
            </Link>
          </div>
        </div>
      )}
    </motion.header>
  )
}
