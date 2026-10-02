import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Newspaper } from 'lucide-react'
import PageWrapper from '../components/layout/PageWrapper.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Card from '../components/ui/Card.jsx'
import Badge from '../components/ui/Badge.jsx'
import ImageWithFallback from '../components/ui/ImageWithFallback.jsx'
import SectionGlow from '../components/ui/SectionGlow.jsx'
import { fadeUp, staggerContainer } from '../lib/animations.js'
import { posts } from '../lib/loadBlogPosts.js'
import site from '../content/site.json'

function formatDate(date) {
  if (!date) return null
  return new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default function BlogList() {
  const [latest, ...rest] = posts

  return (
    <PageWrapper>
      <Helmet>
        <title>{`Blog — ${site.name}`}</title>
        <meta name="description" content={site.seo.blogDescription} />
      </Helmet>

      <div className="section-container relative overflow-hidden py-16">
        <SectionGlow variant="primary" className="-right-20 top-0 h-72 w-72" />
        <SectionHeading eyebrow="Writing" title="Blog" subtitle="Notes on what I'm building and learning." />

        {!latest ? (
          <p className="text-center text-fg-muted">No posts yet — check back soon.</p>
        ) : (
          <div className="mx-auto flex max-w-5xl flex-col gap-12">
            {/* Latest post — large featured card */}
            <motion.div variants={fadeUp} initial="hidden" animate="show">
              <Link to={`/blog/${latest.slug}`}>
                <Card className="grid grid-cols-1 gap-0 overflow-hidden !p-0 md:grid-cols-2">
                  <ImageWithFallback
                    src={latest.coverImage}
                    alt={latest.title}
                    icon={Newspaper}
                    className="aspect-video w-full object-cover md:aspect-auto md:h-full"
                  />
                  <div className="flex flex-col justify-center gap-3 p-6 sm:p-8">
                    <Badge tone="accent" className="w-fit">
                      Latest
                    </Badge>
                    {latest.date && (
                      <time dateTime={latest.date} className="font-mono text-xs text-fg-muted">
                        {formatDate(latest.date)}
                      </time>
                    )}
                    <h2 className="font-heading text-2xl font-semibold text-fg-primary sm:text-3xl">
                      {latest.title}
                    </h2>
                    <p className="text-sm text-fg-muted sm:text-base">{latest.excerpt}</p>
                    <div className="flex flex-wrap gap-2">
                      {latest.tags.map((tag) => (
                        <Badge key={tag}>{tag}</Badge>
                      ))}
                    </div>
                  </div>
                </Card>
              </Link>
            </motion.div>

            {/* Remaining posts — responsive grid */}
            {rest.length > 0 && (
              <motion.div
                className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={staggerContainer(0.1)}
                initial="hidden"
                animate="show"
              >
                {rest.map((post) => (
                  <motion.div key={post.slug} variants={fadeUp}>
                    <Link to={`/blog/${post.slug}`}>
                      <Card className="flex h-full flex-col gap-3 overflow-hidden !p-0">
                        <ImageWithFallback
                          src={post.coverImage}
                          alt={post.title}
                          icon={Newspaper}
                          className="aspect-video w-full object-cover"
                        />
                        <div className="flex flex-1 flex-col gap-2 p-5">
                          {post.date && (
                            <time dateTime={post.date} className="font-mono text-xs text-fg-muted">
                              {formatDate(post.date)}
                            </time>
                          )}
                          <h3 className="font-heading text-base font-semibold text-fg-primary sm:text-lg">
                            {post.title}
                          </h3>
                          <p className="line-clamp-2 text-sm text-fg-muted">{post.excerpt}</p>
                          <div className="mt-auto flex flex-wrap gap-2 pt-2">
                            {post.tags.map((tag) => (
                              <Badge key={tag}>{tag}</Badge>
                            ))}
                          </div>
                        </div>
                      </Card>
                    </Link>
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        )}
      </div>
    </PageWrapper>
  )
}
