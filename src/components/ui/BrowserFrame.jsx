export default function BrowserFrame({ children, className = '' }) {
  return (
    <div
      className={`overflow-hidden rounded-2xl border border-line-subtle bg-bg-elevated shadow-card ${className}`}
    >
      <div className="w-full">{children}</div>
    </div>
  )
}
