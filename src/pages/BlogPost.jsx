import { Children, isValidElement, useEffect } from 'react'
import { useParams, Link, Navigate } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'framer-motion'
import ReactMarkdown from 'react-markdown'
import { ArrowLeft, ExternalLink, ImageIcon, Newspaper } from 'lucide-react'
import { Helmet } from 'react-helmet-async'
import PageWrapper from '../components/layout/PageWrapper.jsx'
import Badge from '../components/ui/Badge.jsx'
import ImageWithFallback from '../components/ui/ImageWithFallback.jsx'
import AttachmentCard from '../components/ui/AttachmentCard.jsx'
import SectionGlow from '../components/ui/SectionGlow.jsx'
import { getAttachmentInfo } from '../lib/attachments.js'
import site from '../content/site.json'
import { getPostBySlug } from '../lib/loadBlogPosts.js'

// Standalone images/attachment links come wrapped in a <p> by markdown, but
// the block-level <figure>/<AttachmentCard> they render can't legally live
// inside a <p> — unwrap those specific cases to avoid invalid DOM nesting.
// Note: at this point the child is still an *unrendered* element referencing
// our custom `img`/`a` component functions, not the DOM tag it'll produce.
function ParagraphOrFragment({ children }) {
  const meaningfulChildren = Children.toArray(children).filter(
    (child) => !(typeof child === 'string' && child.trim() === ''),
  )

  const isBlockOnly =
    meaningfulChildren.length === 1 &&
    isValidElement(meaningfulChildren[0]) &&
    (meaningfulChildren[0].type === markdownComponents.img ||
      (meaningfulChildren[0].type === markdownComponents.a &&
        getAttachmentInfo(meaningfulChildren[0].props.href)))

  if (isBlockOnly) return <>{children}</>
  return <p>{children}</p>
}

const markdownComponents = {
  p: ParagraphOrFragment,
  // Wikipedia-style "thumb" box: small, floated to the side, body text
  // wraps around it — only for images embedded in the post body (the cover
  // image is rendered separately and untouched by this).
  img({ src, alt }) {
    return (
      <figure className="float-right ml-5 mb-3 mt-1 w-2/5 max-w-[220px] sm:max-w-[260px]">
        <ImageWithFallback
          src={src}
          alt={alt}
          icon={ImageIcon}
          className="w-full rounded-lg border border-line-subtle bg-bg-elevated p-1 shadow-card"
        />
      </figure>
    )
  },
  a({ href, children }) {
    const attachment = getAttachmentInfo(href)
    if (attachment) {
      const label = Array.isArray(children) ? children.join('') : children
      return (
        <AttachmentCard
          href={href}
          label={typeof label === 'string' && label ? label : attachment.filename}
          icon={attachment.icon}
          ext={attachment.ext}
        />
      )
    }

    const isExternal = /^https?:\/\//.test(href)
    return (
      <a href={href} target={isExternal ? '_blank' : undefined} rel={isExternal ? 'noreferrer' : undefined}>
        {children}
        {isExternal && <ExternalLink className="ml-1 inline h-3 w-3" />}
      </a>
    )
  },
}

export default function BlogPost() {
  const { slug } = useParams()
  const post = getPostBySlug(slug)
  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    window.scrollTo({ top: 0 })
  }, [slug])

  if (!post) return <Navigate to="/blog" replace />

  return (
    <PageWrapper>
      <Helmet>
        <title>{`${post.title} — ${site.name}`}</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[60] h-1 origin-left bg-accent-primary"
      />

      <article className="section-container relative overflow-hidden flex flex-col gap-6 py-12">
        <SectionGlow variant="glow" className="-right-16 top-0 h-64 w-64" />
        <Link
          to="/blog"
          className="inline-flex w-fit items-center gap-2 text-sm text-fg-muted hover:text-accent-primary"
        >
          <ArrowLeft className="h-4 w-4" /> Back to blog
        </Link>

        <div className="mx-auto flex w-full max-w-5xl flex-col gap-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-fg-muted">
            {post.date && (
              <time dateTime={post.date} className="font-mono">
                {new Date(post.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
            )}
          </div>
          <h1 className="font-heading text-3xl font-semibold sm:text-4xl">{post.title}</h1>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag}>{tag}</Badge>
            ))}
          </div>

          <ImageWithFallback
            src={post.coverImage}
            alt={post.title}
            icon={Newspaper}
            className="mt-2 aspect-video w-full rounded-2xl border border-line-subtle object-cover shadow-card"
          />

          <div className="prose-custom mt-6 w-full text-justify">
            <ReactMarkdown components={markdownComponents}>{post.content}</ReactMarkdown>
          </div>
        </div>
      </article>
    </PageWrapper>
  )
}
