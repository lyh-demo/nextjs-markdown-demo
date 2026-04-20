import './globals.css'

import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'LiuYuhe',
  description: 'LiuYuhe Blog',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="zh-CN">
      <body className="text-(--foreground)">{children}</body>
    </html>
  )
}
