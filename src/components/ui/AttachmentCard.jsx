import { Download } from 'lucide-react'

export default function AttachmentCard({ href, label, icon: Icon, ext }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      download
      className="my-4 flex items-center gap-3 rounded-xl border border-line-subtle bg-bg-elevated p-4 !no-underline shadow-card transition hover:border-accent-primary/50"
    >
      <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-accent-primary/10 text-accent-primary">
        <Icon className="h-5 w-5" />
      </span>
      <span className="flex min-w-0 flex-col">
        <span className="truncate text-sm font-medium text-fg-primary">{label}</span>
        <span className="font-mono text-xs uppercase text-fg-muted">{ext} · Download</span>
      </span>
      <Download className="ml-auto h-4 w-4 flex-shrink-0 text-fg-muted" />
    </a>
  )
}
