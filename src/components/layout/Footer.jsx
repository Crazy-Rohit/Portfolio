import { GraduationCap, Mail, Trophy } from 'lucide-react'
import { GithubIcon, LinkedinIcon, YoutubeIcon } from '../ui/BrandIcons.jsx'
import social from '../../content/social.json'
import site from '../../content/site.json'

export default function Footer() {
  const year = new Date().getFullYear()

  const links = [
    social.github && { href: social.github, label: 'GitHub', icon: GithubIcon },
    social.linkedin && { href: social.linkedin, label: 'LinkedIn', icon: LinkedinIcon },
    social.leetcode && { href: social.leetcode, label: 'LeetCode', icon: Trophy },
    social.codingNinjas && { href: social.codingNinjas, label: 'Coding Ninjas', icon: GraduationCap },
    social.youtube && { href: social.youtube, label: 'YouTube', icon: YoutubeIcon },
    social.email && { href: `mailto:${social.email}`, label: 'Email', icon: Mail },
  ].filter(Boolean)

  return (
    <footer className="border-t border-line-subtle bg-bg-base py-10">
      <div className="section-container flex flex-col items-center gap-4 text-center">
        <div className="flex items-center gap-4">
          {links.map(({ href, label, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel="noreferrer"
              aria-label={label}
              className="flex h-9 w-9 items-center justify-center rounded-full border border-line-subtle text-fg-muted transition-colors hover:text-accent-primary"
            >
              <Icon className="h-4 w-4" />
            </a>
          ))}
        </div>
        <p className="font-mono text-xs text-fg-muted">
          &copy; {year} {site.name}. {site.footerNote}
        </p>
      </div>
    </footer>
  )
}
