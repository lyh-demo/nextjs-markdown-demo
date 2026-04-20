import './globals.css'

import type { Metadata } from 'next'

import { ThemeToggle } from '@/components/theme-toggle'

export const metadata: Metadata = {
  title: 'LiuYuhe',
  description: 'LiuYuhe Blog',
}

const themeInitializer = `
  (() => {
    const storageKey = 'liuyuhe-theme';
    const storedTheme = window.localStorage.getItem(storageKey);

    if (storedTheme === 'light' || storedTheme === 'dark') {
      document.documentElement.dataset.theme = storedTheme;
      return;
    }

    document.documentElement.dataset.theme = 'system';
  })();
`

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className="text-(--foreground)">
        <script dangerouslySetInnerHTML={{ __html: themeInitializer }} />
        <ThemeToggle />
        {children}
      </body>
    </html>
  )
}
