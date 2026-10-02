import { useState } from 'react'

// Renders the real image if it loads; falls back to a gradient placeholder
// with an icon otherwise (several `image`/`coverImage` paths in content
// don't have real files yet).
export default function ImageWithFallback({ src, alt, className = '', icon: Icon }) {
  const [failed, setFailed] = useState(!src)

  if (failed) {
    // min-h ensures a reasonable placeholder box even when the caller's
    // className doesn't set an aspect ratio (e.g. free-form content images)
    return (
      <div className={`flex min-h-[160px] items-center justify-center bg-gradient-mesh bg-bg-base ${className}`}>
        <Icon className="h-10 w-10 text-fg-muted" strokeWidth={1.5} />
      </div>
    )
  }

  return (
    <img src={src} alt={alt} loading="lazy" className={className} onError={() => setFailed(true)} />
  )
}
