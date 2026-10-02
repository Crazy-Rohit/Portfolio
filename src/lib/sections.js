import skills from '../content/skills.json'
import experience from '../content/experience.json'
import volunteering from '../content/volunteering.json'
import projects from '../content/projects.json'
import publications from '../content/publications.json'
import achievements from '../content/achievements.json'
import certifications from '../content/certifications.json'

// A section only renders (and only shows up in the navbar) when its content
// file has something in it — set a JSON file to [] to hide that section.
const hasSkills = Object.values(skills).some((list) => list.length > 0)

export const VISIBLE = {
  about: true,
  skills: hasSkills,
  experience: experience.length > 0,
  volunteering: volunteering.length > 0,
  projects: projects.length > 0,
  publications: publications.length > 0,
  achievements: achievements.length > 0,
  certifications: certifications.length > 0,
  contact: true,
}

export const NAV_SECTIONS = [
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'publications', label: 'Publications' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'contact', label: 'Contact' },
].filter((section) => VISIBLE[section.id])
