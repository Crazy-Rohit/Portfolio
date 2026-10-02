# Contributing

Thanks for helping improve this template! Bug fixes, accessibility and performance improvements, and new optional sections are all welcome.

1. Fork the repo and create a branch: `git checkout -b fix/short-description`.
2. `npm install`, then `npm run dev` to work locally.
3. Keep changes generic. **Don't commit personal data** (real names, emails, photos, resumes) to `src/content/` or `public/`. Placeholder content only.
4. Follow the existing conventions:
   - Use the theme token classes (`bg-bg-base`, `text-fg-primary`, `text-accent-primary`, …), never hard-coded colors, so light and dark mode both keep working.
   - Any user-facing text belongs in `src/content/`, not in components.
   - Animations should respect `prefers-reduced-motion`.
5. Make sure `npm run build` passes, then open a pull request describing what changed and why. Screenshots help for visual changes.

To report a bug, open an issue with your browser, OS and steps to reproduce.
