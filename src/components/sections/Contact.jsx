import { useState } from 'react'
import { motion } from 'framer-motion'
import { GraduationCap, Mail, MapPin, Phone, Send, CheckCircle2, Trophy } from 'lucide-react'
import { GithubIcon, LinkedinIcon, YoutubeIcon } from '../ui/BrandIcons.jsx'
import SectionHeading from '../ui/SectionHeading.jsx'
import site from '../../content/site.json'
import { fadeUp } from '../../lib/animations.js'
import social from '../../content/social.json'

const SOCIAL_LINKS = [
  social.github && { href: social.github, label: 'GitHub', icon: GithubIcon },
  social.linkedin && { href: social.linkedin, label: 'LinkedIn', icon: LinkedinIcon },
  social.leetcode && { href: social.leetcode, label: 'LeetCode', icon: Trophy },
  social.codingNinjas && { href: social.codingNinjas, label: 'Coding Ninjas', icon: GraduationCap },
  social.youtube && { href: social.youtube, label: 'YouTube', icon: YoutubeIcon },
].filter(Boolean)

export default function Contact() {
  const [sent, setSent] = useState(false)
  const [values, setValues] = useState({ name: '', email: '', message: '' })

  function handleChange(e) {
    setValues((v) => ({ ...v, [e.target.name]: e.target.value }))
  }

  // No backend to submit to — instead, build a mailto: link from the form
  // fields and hand off to the visitor's own default mail app (Gmail,
  // Outlook, Apple Mail, whatever they have configured as default). mailto:
  // is a standard protocol every OS/browser routes to the default handler,
  // so this works the same way everywhere without needing an email API.
  function handleSubmit(e) {
    e.preventDefault()

    const subject = `Portfolio contact from ${values.name}`
    const body = `${values.message}\n\n— ${values.name} (${values.email})`
    const mailtoUrl = `mailto:${social.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    window.location.href = mailtoUrl
    setSent(true)
  }

  return (
    <section id="contact" className="section-container relative overflow-hidden py-20 sm:py-28">
      <SectionHeading
        {...site.sections.contact}
      />

      <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 lg:grid-cols-2">
        <motion.form
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 rounded-2xl border border-line-subtle bg-bg-elevated p-6 shadow-card"
        >
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <input
              required
              name="name"
              value={values.name}
              onChange={handleChange}
              placeholder="Name"
              className="rounded-xl border border-line-subtle bg-bg-base px-4 py-2.5 text-sm text-fg-primary outline-none transition focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20"
            />
            <input
              required
              type="email"
              name="email"
              value={values.email}
              onChange={handleChange}
              placeholder="Email"
              className="rounded-xl border border-line-subtle bg-bg-base px-4 py-2.5 text-sm text-fg-primary outline-none transition focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20"
            />
          </div>
          <textarea
            required
            name="message"
            value={values.message}
            onChange={handleChange}
            placeholder="Message"
            rows={9}
            className="flex-1 resize-none rounded-xl border border-line-subtle bg-bg-base px-4 py-2.5 text-sm text-fg-primary outline-none transition focus:border-accent-primary focus:ring-2 focus:ring-accent-primary/20"
          />

          <button
            type="submit"
            className="mt-auto inline-flex items-center justify-center gap-2 rounded-full bg-accent-primary px-5 py-2.5 text-sm font-medium text-white transition hover:-translate-y-0.5 hover:shadow-lg"
          >
            {sent ? <CheckCircle2 className="h-4 w-4" /> : <Send className="h-4 w-4" />}
            {sent ? 'Opened in your mail app' : 'Send message'}
          </button>

          {sent && (
            <p className="text-sm text-success">
              Your default mail app should have opened with this message ready to send. If it
              didn't, email me directly at{' '}
              <a href={`mailto:${social.email}`} className="underline">
                {social.email}
              </a>
              .
            </p>
          )}
        </motion.form>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="flex flex-col gap-6 rounded-2xl border border-line-subtle bg-bg-elevated p-6 shadow-card"
        >
          <div className="flex flex-col gap-2">
            {site.sections.contact.availability && (
              <span className="w-fit rounded-full border border-success/30 bg-success/10 px-3 py-1 font-mono text-xs text-success">
                {site.sections.contact.availability}
              </span>
            )}
            {site.sections.contact.blurb.map((paragraph, i) => (
              <p key={i} className="text-sm text-fg-muted sm:text-base">
                {paragraph}
              </p>
            ))}
          </div>

          <div className="flex flex-col gap-3 border-t border-line-subtle pt-5">
            <a
              href={`mailto:${social.email}`}
              className="group flex items-center gap-3 text-sm text-fg-primary"
            >
              <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary transition group-hover:bg-accent-primary group-hover:text-white">
                <Mail className="h-4 w-4" />
              </span>
              <span className="group-hover:text-accent-primary">{social.email}</span>
            </a>
            {social.phone && (
              <a
                href={`tel:${social.phone.replace(/\s+/g, '')}`}
                className="group flex items-center gap-3 text-sm text-fg-primary"
              >
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary transition group-hover:bg-accent-primary group-hover:text-white">
                  <Phone className="h-4 w-4" />
                </span>
                <span className="group-hover:text-accent-primary">{social.phone}</span>
              </a>
            )}
            {social.location && (
              <div className="flex items-center gap-3 text-sm text-fg-muted">
                <span className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full bg-accent-primary/10 text-accent-primary">
                  <MapPin className="h-4 w-4" />
                </span>
                {social.location}
              </div>
            )}
          </div>

          {SOCIAL_LINKS.length > 0 && (
            <div className="flex flex-wrap items-center gap-3 border-t border-line-subtle pt-5">
              {SOCIAL_LINKS.map(({ href, label, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line-subtle text-fg-muted transition hover:border-accent-primary/50 hover:text-accent-primary"
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
