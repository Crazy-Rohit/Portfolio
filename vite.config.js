import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'

// Fills the %SITE_*% placeholders in index.html from src/content/site.json,
// so the browser-tab title and meta description (what search engines and
// link previews see before JS runs) stay in sync with your content.
function siteMetaPlugin() {
  const escape = (value) => String(value).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;')
  return {
    name: 'site-meta',
    transformIndexHtml(html) {
      const site = JSON.parse(readFileSync(new URL('./src/content/site.json', import.meta.url), 'utf8'))
      return html
        .replaceAll('%SITE_TITLE%', escape(site.seo.title))
        .replaceAll('%SITE_DESCRIPTION%', escape(site.seo.description))
    },
  }
}

export default defineConfig({
  plugins: [react(), siteMetaPlugin()],
  build: {
    // vendor-three is inherently large (three.js) but lazy-loaded async via
    // React.lazy, so it never blocks initial paint — safe to raise the limit
    // rather than fight the warning.
    chunkSizeWarningLimit: 900,
    rolldownOptions: {
      output: {
        codeSplitting: true,
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (id.includes('three') || id.includes('@react-three')) return 'vendor-three'
            if (id.includes('gsap')) return 'vendor-gsap'
            if (id.includes('framer-motion')) return 'vendor-motion'
          }
        },
      },
    },
  },
})
