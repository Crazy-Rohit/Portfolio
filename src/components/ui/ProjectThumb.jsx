import { Code2 } from 'lucide-react'
import ImageWithFallback from './ImageWithFallback.jsx'

export default function ProjectThumb({ src, alt, className = '' }) {
  return <ImageWithFallback src={src} alt={alt} className={className} icon={Code2} />
}
