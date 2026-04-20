'use client'

import { useState } from 'react'

const STORAGE_KEY = 'liuyuhe-theme'
const THEMES = ['system', 'light', 'dark'] as const

type ThemeMode = (typeof THEMES)[number]

const themeMeta: Record<ThemeMode, { icon: string, label: string }> = {
  system: { icon: '◐', label: '跟随系统' },
  light: { icon: '☼', label: '浅色模式' },
  dark: { icon: '☾', label: '深色模式' },
}

function getNextTheme(theme: ThemeMode): ThemeMode {
  const currentIndex = THEMES.indexOf(theme)
  return THEMES[(currentIndex + 1) % THEMES.length]
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme

  if (theme === 'system') {
    window.localStorage.removeItem(STORAGE_KEY)
    return
  }

  window.localStorage.setItem(STORAGE_KEY, theme)
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode>(() => {
    if (typeof document === 'undefined') {
      return 'system'
    }

    const currentTheme = document.documentElement.dataset.theme
    return currentTheme === 'light' || currentTheme === 'dark' ? currentTheme : 'system'
  })

  const nextTheme = getNextTheme(theme)
  const meta = themeMeta[theme]

  return (
    <button
      type="button"
      className="fixed top-4 right-4 z-20 inline-flex items-center gap-2 rounded-full border border-(--accent-border) bg-(--card) px-3.5 py-2 text-sm text-(--foreground) shadow-(--shadow) backdrop-blur-[12px] transition hover:-translate-y-0.5 hover:border-(--accent-border-strong) hover:text-(--accent) sm:top-6 sm:right-6"
      aria-label={`切换主题，当前为${meta.label}`}
      title={`切换主题，当前为${meta.label}`}
      suppressHydrationWarning
      onClick={() => {
        const updatedTheme = getNextTheme(theme)
        applyTheme(updatedTheme)
        setTheme(updatedTheme)
      }}
    >
      <span aria-hidden>{meta.icon}</span>
      <span>{meta.label}</span>
      <span className="text-(--foreground-muted)">
        {'→ '}
        {themeMeta[nextTheme].label}
      </span>
    </button>
  )
}
