import { useLayoutEffect, useRef, useState } from 'react'
import { registerGsap } from '../../lib/animations.js'
import SectionHeading from '../ui/SectionHeading.jsx'
import site from '../../content/site.json'
import experience from '../../content/experience.json'

function companyInitials(company) {
  const firstWord = company.replace(/[(),.]/g, '').split(' ')[0]
  return firstWord.slice(0, 2).toUpperCase()
}

// LinkedIn-style grouping: consecutive entries at the same company collapse
// into one timeline marker/card, with each role stacked inside it (for
// promotions — same company, different title over time).
function groupByCompany(list) {
  const groups = []
  for (const job of list) {
    const last = groups[groups.length - 1]
    if (last && last.company === job.company) {
      last.roles.push(job)
    } else {
      groups.push({ company: job.company, roles: [job] })
    }
  }
  return groups
}

const groups = groupByCompany(experience)

export default function Experience() {
  const containerRef = useRef(null)
  const cardRefs = useRef([])
  const badgeRefs = useRef([])
  const nodeRefs = useRef([])
  const scrollGlowRefs = useRef([])
  const segmentFillRefs = useRef([])
  const fractionsRef = useRef([])
  const [segmentGeom, setSegmentGeom] = useState([])

  // Measure every badge's true center position along the timeline, plus
  // each connector segment's exact top/height (from one badge's center to
  // the next one's) — so connectors run circle-to-circle instead of an
  // approximate index-based guess, and each "connect" moment lines up with
  // where the segment actually finishes drawing.
  //
  // This must use offsetTop (pure document-flow layout), NOT
  // getBoundingClientRect(). The scroll-scrubbed GSAP timeline applies
  // transform/opacity directly to these same card elements, and rect-based
  // measurement while that's mid-animation reads the animated (distorted)
  // position instead of the true layout position — corrupting every
  // segment and the whole reveal. offsetTop is unaffected by transform or
  // scroll position, so it stays correct regardless of animation state.
  useLayoutEffect(() => {
    function measure() {
      if (!containerRef.current) return

      const centers = cardRefs.current.map((el) => (el ? el.offsetTop + 28 : 0))
      const total = centers[centers.length - 1] || 1
      fractionsRef.current = centers.map((c) => c / total)

      const geom = groups.map((_, gi) => {
        if (gi === 0) return null
        const group = cardRefs.current[gi]
        if (!group) return null
        return {
          top: centers[gi - 1] - group.offsetTop,
          height: centers[gi] - centers[gi - 1],
        }
      })
      setSegmentGeom(geom)
    }
    measure()
    window.addEventListener('resize', measure)
    window.addEventListener('load', measure)

    // re-measure whenever the timeline's own layout shifts (web fonts
    // finishing load, images loading, content reflow) — a plain resize
    // listener misses these, which was leaving segments measured too short
    const ro = new ResizeObserver(measure)
    if (containerRef.current) ro.observe(containerRef.current)

    return () => {
      window.removeEventListener('resize', measure)
      window.removeEventListener('load', measure)
      ro.disconnect()
    }
  }, [])

  useLayoutEffect(() => {
    const gsap = registerGsap()
    const ctx = gsap.context(() => {
      const cards = cardRefs.current.filter(Boolean)

      // One scrubbed timeline: each connector segment draws from the badge
      // above it to the badge below it, and the destination badge only
      // pops + glows once its segment has actually finished drawing —
      // a real circle-to-circle "connect" instead of one line extending.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 75%',
          end: 'bottom 70%',
          scrub: 0.5,
        },
      })

      cards.forEach((card, i) => {
        const fraction = fractionsRef.current[i] ?? (cards.length > 1 ? i / cards.length : 0)
        const nextFraction = fractionsRef.current[i + 1] ?? 1
        const segmentDuration = Math.max(nextFraction - fraction, 0.02)

        // Each card fades in on its own scroll range, keyed to where *it* is
        // on screen, so it's fully visible by the time it nears the middle of
        // the viewport. Tying it to the connector timeline above made a card
        // wait for the *next* card to arrive, so it stayed faded until it had
        // almost scrolled off the top.
        gsap.fromTo(
          card,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            ease: 'none',
            scrollTrigger: { trigger: card, start: 'top 85%', end: 'top 60%', scrub: 0.5 },
          },
        )

        const segment = segmentFillRefs.current[i]
        if (segment) {
          tl.fromTo(segment, { scaleY: 0 }, { scaleY: 1, ease: 'none', duration: segmentDuration }, fraction)
        }

        // this node's own incoming segment finishes drawing exactly at its
        // own fraction — that's the moment it "connects", so pop + glow here
        const glow = scrollGlowRefs.current[i]
        const node = nodeRefs.current[i]
        const popDuration = Math.min(0.08, segmentDuration / 2)
        if (glow) {
          tl.fromTo(glow, { opacity: 0 }, { opacity: 0.2, ease: 'power1.out', duration: popDuration }, fraction)
        }
        if (node) {
          tl.fromTo(
            node,
            { scale: 1 },
            { scale: 1.15, ease: 'power1.out', duration: popDuration, yoyo: true, repeat: 1 },
            fraction,
          )
        }
      })
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="experience" className="section-container relative overflow-hidden py-20 sm:py-28">
      <SectionHeading
        {...site.sections.experience}
      />

      <div ref={containerRef} className="relative mx-auto max-w-3xl pl-16 sm:pl-20">
        <div className="flex flex-col gap-10">
          {groups.map((group, gi) => {
            const logo = group.roles.find((job) => job.logo)?.logo
            const themeColor = gi % 2 === 0 ? 'var(--accent-primary)' : 'var(--accent-secondary)'
            const geom = segmentGeom[gi]

            return (
              <div
                key={group.company}
                ref={(el) => (cardRefs.current[gi] = el)}
                className="group relative opacity-0"
                style={{ '--node-color': themeColor }}
              >
                {geom && (
                  <>
                    {/* static track, always visible: the full circle-to-circle path.
                        left offset must land exactly under the badge center — the
                        badge itself sits at -left-16 (sm:-left-20) within this same
                        group div, so this uses that offset + half the badge width,
                        NOT the old sibling-of-container math from before this was
                        nested here. */}
                    <div
                      className="absolute -left-9 w-0 border-l-2 border-dashed sm:-left-[52px]"
                      style={{ top: `${geom.top}px`, height: `${geom.height}px`, borderColor: 'var(--border-subtle)' }}
                    />
                    {/* scroll-driven fill: draws from the badge above down into this one */}
                    <div
                      ref={(el) => (segmentFillRefs.current[gi - 1] = el)}
                      className="absolute -left-9 w-0 origin-top border-l-2 border-dashed sm:-left-[52px]"
                      style={{ top: `${geom.top}px`, height: `${geom.height}px`, borderColor: themeColor }}
                    />
                    {/* hover-only overlay: hovering this entry lights its incoming connector too */}
                    <div
                      className="absolute -left-9 w-0 origin-top border-l-2 border-dashed opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:-left-[52px]"
                      style={{ top: `${geom.top}px`, height: `${geom.height}px`, borderColor: themeColor }}
                    />
                  </>
                )}

                <div
                  ref={(el) => (badgeRefs.current[gi] = el)}
                  className="absolute -left-16 top-0 h-14 w-14 sm:-left-20"
                >
                  {/* scroll-driven glow: lights up once the connector reaches this node */}
                  <span
                    aria-hidden="true"
                    ref={(el) => (scrollGlowRefs.current[gi] = el)}
                    className="pointer-events-none absolute -inset-2 rounded-full opacity-0 blur-md"
                    style={{ background: themeColor }}
                  />
                  {/* hover-only shine: subtle, low-opacity highlight — independent of scroll state */}
                  <span
                    aria-hidden="true"
                    className="pointer-events-none absolute -inset-3 rounded-full opacity-0 blur-lg transition-opacity duration-300 group-hover:opacity-20"
                    style={{ background: `radial-gradient(circle, ${themeColor} 0%, transparent 70%)` }}
                  />

                  <span className="relative block h-14 w-14 transition-transform duration-300 group-hover:scale-125">
                    <span
                      ref={(el) => (nodeRefs.current[gi] = el)}
                      className="relative z-10 flex h-14 w-14 items-center justify-center overflow-hidden rounded-full border-2 shadow-card"
                      style={{
                        borderColor: themeColor,
                        background: 'var(--bg-elevated)',
                        color: themeColor,
                      }}
                    >
                      {logo ? (
                        <img
                          src={logo}
                          alt={`${group.company} logo`}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="font-heading text-sm font-bold">{companyInitials(group.company)}</span>
                      )}
                    </span>
                  </span>
                </div>

                <div className="rounded-2xl border border-line-subtle bg-bg-elevated p-5 shadow-card transition duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--node-color)] group-hover:shadow-lg sm:p-6">
                  <p className="font-heading text-base font-semibold" style={{ color: themeColor }}>
                    {group.company}
                  </p>

                  <div className="mt-3 flex flex-col">
                    {group.roles.map((job, ri) => (
                      <div
                        key={`${job.role}-${job.period}`}
                        className={ri > 0 ? 'mt-4 border-t border-line-subtle pt-4' : ''}
                      >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                          <h3 className="font-heading text-lg font-semibold text-fg-primary">
                            {job.role}
                          </h3>
                          <div className="flex flex-col items-end gap-1">
                            <span className="rounded-full border border-line-subtle bg-bg-base px-2.5 py-1 font-mono text-xs text-fg-muted">
                              {job.period}
                            </span>
                            {job.current && (
                              <span className="rounded-full bg-success/10 px-2.5 py-0.5 font-mono text-xs text-success">
                                Current
                              </span>
                            )}
                          </div>
                        </div>
                        <p className="mt-1 text-xs text-fg-muted">{job.location}</p>
                        <ul className="mt-4 flex flex-col gap-2">
                          {job.bullets.map((bullet, bi) => (
                            <li key={bi} className="flex gap-2 text-sm text-fg-muted sm:text-base">
                              <span className="mt-2 h-1 w-1 flex-shrink-0 rounded-full bg-accent-primary" />
                              {bullet}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
