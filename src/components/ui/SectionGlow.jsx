const VARIANTS = {
  primary: 'radial-gradient(circle, var(--accent-secondary) 0%, var(--accent-primary) 45%, transparent 70%)',
  glow: 'radial-gradient(circle, var(--accent-glow) 0%, var(--accent-secondary) 45%, transparent 70%)',
}

// Ambient blurred gradient blob — the same "glazing" effect used behind the
// Hero avatar, reused as a subtle background accent in other sections.
export default function SectionGlow({ variant = 'primary', className = '', delay = 0 }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full blur-[70px] ${className}`}
      style={{
        background: VARIANTS[variant],
        animation: `glow-pulse 7s ease-in-out ${delay}s infinite`,
      }}
    />
  )
}
