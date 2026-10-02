# portfolio

A polished, content-driven developer portfolio template. You edit a few JSON files, and you get an animated, responsive site with light and dark themes. There's no CMS and no backend.

Built with **React 18**, **Vite**, **Tailwind CSS**, **Framer Motion**, **GSAP** and **Three.js**.

## Features

- **Edit JSON, not components.** All text, links and data live in `src/content/`.
- **Light and dark themes** use CSS custom properties. The site follows the visitor's OS setting and remembers their choice.
- **Animated hero** with a Three.js particle field, cursor parallax and a staggered GSAP entrance. The particles are skipped automatically when WebGL isn't available.
- **Motion details:** film-grain backdrop, magnetic nav links, "scramble" text, a draggable skills marquee that skews with scroll speed, 3D-tilt cards, a custom cursor and a scroll-drawn experience timeline.
- **Sections hide themselves.** Set a content file to `[]` and that section disappears from the page and the navbar.
- **Markdown blog** with cover images, image captions and automatic download cards for PDF, DOCX, PPTX and similar files.
- **A detail page for every project** at `/projects/<id>`.
- **Contact form with no backend.** It opens the visitor's own mail app with the message pre-filled.
- **Responsive, accessible and fast.** It respects `prefers-reduced-motion` and lazy-loads the Three.js code.

## Quick start

You need **Node.js 20.19 or newer** (see `.nvmrc`).

```bash
# use this template (or fork/clone it)
git clone https://github.com/<you>/portfolio.git
cd portfolio

npm install
npm run dev        # http://localhost:5173
```

| Command           | What it does                     |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start the dev server             |
| `npm run build`   | Production build into `dist/`    |
| `npm run preview` | Serve the production build       |

## Make it yours

Everything you need to change is in **`src/content/`** and **`public/`**.

### 1. `src/content/site.json`: who you are

| Key | Used for |
| --- | --- |
| `name`, `initials`, `greeting`, `roleTitle`, `heroDescription` | Hero section and navbar |
| `avatar` | Hero photo. A transparent-background PNG looks best. |
| `resumeUrl` | Resume download buttons. Set it to `""` to hide them. |
| `seo.title`, `seo.description`, `seo.blogDescription` | Browser tab title, meta description and link previews |
| `about*` | About section: badge, heading, bio paragraphs, quick facts and the three-word pull quote |
| `sections.<name>` | Eyebrow, title and subtitle for each section heading |
| `sections.contact.availability` / `blurb` | Text in the contact card |
| `footerNote` | The line after `© <year> <name>.` in the footer |

### 2. The other content files

| File | Section | Notes |
| --- | --- | --- |
| `social.json` | Contact and footer | Leave a value as `""` to hide that link. Supported: email, phone, location, GitHub, LinkedIn, LeetCode, Coding Ninjas, YouTube. |
| `skills.json` | Skills | Skills with a known icon go into the marquee. Everything else shows as a pill. Icon codes are in `src/lib/skillIcons.js`. |
| `experience.json` | Experience | Newest first. Consecutive entries at the same `company` are grouped into one card, which works well for promotions. Set `logo` to an image path, or leave it `null` to show initials. Set `current: true` to show a badge. |
| `projects.json` | Projects | `featured: true` puts a project in the carousel. Other projects appear as cards below it. `id` becomes the URL `/projects/<id>`. |
| `publications.json` | Publications | `authors` and `doi` are optional. |
| `achievements.json` | Achievements | Entries whose `result` contains "Winner" count toward the "Hackathon wins" stat. |
| `certifications.json` | Certifications | Issuers listed in `src/lib/issuerIcons.js` get a logo. |
| `volunteering.json` | Volunteering | |

**To hide a section,** set its file to `[]`. It's removed from the page and the navbar. (About and Contact are always shown.)

### 3. `public/`: your files

```
public/
├── favicon.svg               ← your icon
├── images/
│   ├── profile-avatar.svg    ← replace with your photo
│   ├── companies/            ← logos referenced from experience.json
│   ├── projects/             ← screenshots referenced from projects.json
│   └── blog/<post-slug>/     ← images used in a blog post
└── resume/resume.pdf         ← replace with your resume
```

Anything in `public/` is served from the site root, so `public/images/projects/app.png` becomes `/images/projects/app.png`.

### 4. Blog posts

Copy `src/content/blog/_template.md`, rename it (the filename becomes the URL slug), and fill in the frontmatter:

```md
---
title: "My Post"
date: "2026-01-31"
tags: ["React", "Career"]
excerpt: "One or two sentences shown on the blog list."
coverImage: "/images/blog/my-post/cover.png"
---
```

Posts are sorted by date. Delete `hello-world.md` once you've written your own.

### 5. Colors and fonts

The theme tokens are CSS variables in `src/index.css`. There's one block for `[data-theme='dark']` and one for `[data-theme='light']`:

```css
--bg-base, --bg-elevated, --text-primary, --text-muted,
--border-subtle, --accent-primary, --accent-secondary, --accent-glow
```

Tailwind maps them to classes such as `bg-bg-base`, `text-fg-primary`, `text-accent-primary` and `border-line-subtle` (see `tailwind.config.js`). Change the values once and the whole site updates. Fonts load from Google Fonts in `index.html`.

## Project structure

```
src/
├── content/          ← all your data (JSON + Markdown)
├── components/
│   ├── layout/       ← Navbar, Footer, PageWrapper, ThemeToggle
│   ├── sections/     ← one component per home-page section
│   ├── three/        ← Three.js hero canvas
│   ├── graphics/     ← hero avatar
│   └── ui/           ← reusable pieces (Card, Marquee, Magnetic, ScrambleText, …)
├── pages/            ← Home, BlogList, BlogPost, ProjectDetail
├── hooks/            ← useTheme, useScrollReveal
└── lib/              ← animation presets, icon maps, blog loader, section visibility
```

## Deploying

The site is a static single-page app: `npm run build` outputs `dist/`. The app uses client-side routing, so the host has to send every path to `index.html`. Both configs below are already included.

- **Netlify:** import the repo. `netlify.toml` sets the build command and the SPA redirect.
- **Vercel:** import the repo. It detects Vite automatically, and `vercel.json` adds the SPA rewrite.
- **Other static hosts:** serve `dist/` and add a catch-all rewrite to `/index.html`.

> GitHub Pages doesn't support SPA rewrites, so routes like `/blog` will 404 when opened directly. Use Netlify or Vercel, or switch to `HashRouter` in `src/main.jsx`.

## License

[MIT](LICENSE). Use it, change it, ship it. A credit link back is appreciated but not required.
