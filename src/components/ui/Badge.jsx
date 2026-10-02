export default function Badge({ children, tone = 'default', className = '' }) {
  const tones = {
    default: 'border-line-subtle bg-bg-elevated text-fg-muted',
    accent: 'border-accent-primary/30 bg-accent-primary/10 text-accent-primary',
    success: 'border-success/30 bg-success/10 text-success',
  }

  return (
    <span
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 font-mono text-xs ${tones[tone]} ${className}`}
    >
      {children}
    </span>
  )
}
