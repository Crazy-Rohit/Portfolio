// Maps skill names (as they appear in content/skills.json) to skillicons.dev
// icon codes. Only skills with a confident, known-good code are listed —
// anything missing here just renders as a plain text pill instead of an icon.
export const SKILL_ICON_CODES = {
  Python: 'py',
  JavaScript: 'js',
  HTML: 'html',
  'React.js': 'react',
  'Node.js': 'nodejs',
  FastAPI: 'fastapi',
  Flask: 'flask',
  TensorFlow: 'tensorflow',
  'Scikit-learn': 'sklearn',
  'Tailwind CSS': 'tailwind',
  Git: 'git',
  GitHub: 'github',
  Azure: 'azure',
  AWS: 'aws',
  MongoDB: 'mongodb',
  Firebase: 'firebase',
  Docker: 'docker',
  // SQL and Canva don't have confident skillicons.dev codes — left
  // unmapped on purpose so they fall back to plain pills instead of a
  // guessed/possibly-broken icon.
}

export function skillIconUrl(names, theme = 'dark') {
  const codes = names.map((n) => SKILL_ICON_CODES[n]).filter(Boolean)
  if (codes.length === 0) return null
  return `https://skillicons.dev/icons?i=${codes.join(',')}&theme=${theme === 'dark' ? 'dark' : 'light'}`
}

export function singleSkillIconUrl(name, theme = 'dark') {
  const code = SKILL_ICON_CODES[name]
  if (!code) return null
  return `https://skillicons.dev/icons?i=${code}&theme=${theme === 'dark' ? 'dark' : 'light'}`
}
