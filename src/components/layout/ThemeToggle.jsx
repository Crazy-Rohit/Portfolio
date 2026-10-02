import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme.js'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button
      onClick={toggleTheme}
      data-testid="theme-toggle"
      aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}
      className="flex h-9 w-9 items-center justify-center rounded-full border border-line-subtle bg-bg-base text-fg-muted transition-colors hover:text-fg-primary"
    >
      {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  )
}
