import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '../components/layout/PageWrapper.jsx'
import Hero from '../components/sections/Hero.jsx'
import About from '../components/sections/About.jsx'
import Skills from '../components/sections/Skills.jsx'
import Experience from '../components/sections/Experience.jsx'
import Volunteering from '../components/sections/Volunteering.jsx'
import Projects from '../components/sections/Projects.jsx'
import Publications from '../components/sections/Publications.jsx'
import Achievements from '../components/sections/Achievements.jsx'
import Certifications from '../components/sections/Certifications.jsx'
import Contact from '../components/sections/Contact.jsx'
import { VISIBLE } from '../lib/sections.js'
import site from '../content/site.json'

export default function Home() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) return
    const id = location.hash.replace('#', '')
    const el = document.getElementById(id)
    if (el) {
      // wait a tick for the page to paint before scrolling
      requestAnimationFrame(() => el.scrollIntoView({ behavior: 'smooth' }))
    }
  }, [location.hash])

  return (
    <PageWrapper padded={false}>
      <Helmet>
        <title>{site.seo.title}</title>
        <meta name="description" content={site.seo.description} />
      </Helmet>

      <Hero />
      <About />
      {VISIBLE.skills && <Skills />}
      {VISIBLE.experience && <Experience />}
      {VISIBLE.volunteering && <Volunteering />}
      {VISIBLE.projects && <Projects />}
      {VISIBLE.publications && <Publications />}
      {VISIBLE.achievements && <Achievements />}
      {VISIBLE.certifications && <Certifications />}
      <Contact />
    </PageWrapper>
  )
}
