/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['selector', '[data-theme="dark"]'],
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          base: 'var(--bg-base)',
          elevated: 'var(--bg-elevated)',
        },
        accent: {
          primary: 'var(--accent-primary)',
          secondary: 'var(--accent-secondary)',
          glow: 'var(--accent-glow)',
        },
        fg: {
          primary: 'var(--text-primary)',
          muted: 'var(--text-muted)',
        },
        line: {
          subtle: 'var(--border-subtle)',
        },
        success: 'var(--success)',
      },
      fontFamily: {
        heading: ['"Space Grotesk"', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card: 'var(--card-shadow)',
      },
      maxWidth: {
        content: '1280px',
      },
      backgroundImage: {
        'gradient-mesh':
          'radial-gradient(circle at 20% 20%, var(--accent-secondary) 0%, transparent 50%), radial-gradient(circle at 80% 60%, var(--accent-primary) 0%, transparent 50%)',
      },
    },
  },
  plugins: [],
}
