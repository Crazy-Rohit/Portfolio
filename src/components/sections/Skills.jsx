import { motion } from 'framer-motion'
import SectionHeading from '../ui/SectionHeading.jsx'
import site from '../../content/site.json'
import Marquee from '../ui/Marquee.jsx'
import { useTheme } from '../../hooks/useTheme.js'
import { SKILL_ICON_CODES, singleSkillIconUrl } from '../../lib/skillIcons.js'
import { fadeUp, staggerContainer } from '../../lib/animations.js'
import skills from '../../content/skills.json'

const ALL_TECH_SKILLS = [...skills.languagesAndFrameworks, ...skills.toolsAndPlatforms]
const ICONABLE_SKILLS = ALL_TECH_SKILLS.filter((s) => SKILL_ICON_CODES[s])
// tech skills without a confident icon (e.g. SQL, Canva) still need to show
// up somewhere — fall back to a plain pill instead of silently vanishing
const NON_ICONABLE_TECH_SKILLS = ALL_TECH_SKILLS.filter((s) => !SKILL_ICON_CODES[s])

export default function Skills() {
  const { theme } = useTheme()

  return (
    <section id="skills" className="section-container relative overflow-hidden py-20 sm:py-28">
      <div aria-hidden="true" className="bg-dot-grid pointer-events-none absolute inset-0 opacity-70 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,black,transparent)]" />
      <SectionHeading
        {...site.sections.skills}
      />

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Marquee>
          {ICONABLE_SKILLS.map((skill) => (
            <div
              key={skill}
              className="flex w-32 flex-shrink-0 flex-col items-center justify-center gap-2 rounded-2xl border border-line-subtle bg-bg-base px-4 py-4 text-center shadow-card"
            >
              <img src={singleSkillIconUrl(skill, theme)} alt={skill} className="h-10 w-10" loading="lazy" />
              <span className="font-mono text-xs leading-tight text-fg-muted">{skill}</span>
            </div>
          ))}
        </Marquee>
      </motion.div>

      <motion.div
        className="mt-10 flex flex-wrap items-center justify-center gap-3"
        variants={staggerContainer(0.04)}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
      >
        {[...NON_ICONABLE_TECH_SKILLS, ...skills.professionalCompetencies].map((skill) => (
          <motion.span
            key={skill}
            variants={fadeUp}
            className="rounded-full border border-line-subtle bg-bg-base px-3 py-1.5 font-mono text-xs text-fg-muted shadow-card sm:text-sm"
          >
            {skill}
          </motion.span>
        ))}
      </motion.div>
    </section>
  )
}
