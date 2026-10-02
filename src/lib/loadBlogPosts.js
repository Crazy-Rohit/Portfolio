const rawPosts = import.meta.glob(['../content/blog/*.md', '!../content/blog/_template.md'], {
  eager: true,
  query: '?raw',
  import: 'default',
})

function slugFromPath(path) {
  return path.split('/').pop().replace(/\.md$/, '')
}

// gray-matter relies on Node's `Buffer` global, which doesn't exist in the
// browser and throws at runtime — this is a tiny hand-rolled parser instead,
// sufficient for the simple `key: "value"` / `key: ["a", "b"]` frontmatter
// used in these posts.
function parseFrontmatter(raw) {
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/)
  if (!match) return { data: {}, content: raw }

  const [, frontmatterBlock, content] = match
  const data = {}

  for (const line of frontmatterBlock.split(/\r?\n/)) {
    const lineMatch = line.match(/^([A-Za-z0-9_]+):\s*(.*)$/)
    if (!lineMatch) continue
    const [, key, rawValue] = lineMatch
    const trimmed = rawValue.trim()
    try {
      data[key] = JSON.parse(trimmed)
    } catch {
      data[key] = trimmed.replace(/^"|"$/g, '')
    }
  }

  return { data, content: content.trim() }
}

export const posts = Object.entries(rawPosts)
  .map(([path, raw]) => {
    const { data, content } = parseFrontmatter(raw)
    return {
      slug: slugFromPath(path),
      title: data.title ?? slugFromPath(path),
      date: data.date ?? null,
      tags: data.tags ?? [],
      excerpt: data.excerpt ?? '',
      coverImage: data.coverImage ?? null,
      content,
    }
  })
  .sort((a, b) => new Date(b.date ?? 0) - new Date(a.date ?? 0))

export function getPostBySlug(slug) {
  return posts.find((p) => p.slug === slug) ?? null
}
