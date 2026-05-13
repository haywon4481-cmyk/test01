import type { Metadata } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Toaster } from '@/components/ui/sonner'
import { ScrollToTop } from '@/components/scroll-to-top'
import { NinjaCursorTrail } from '@/components/ninja-cursor-trail'
import './globals.css'

export const metadata: Metadata = {
  title: 'Portfolio | Webtoon Artist',
  description: 'Webtoon and illustration portfolio showcasing BL, romance, and short webtoons along with work processes and other creative works.',
  generator: 'v0.app',
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="ko">
      <body className="font-sans antialiased cursor-ninja">
        {children}
        <Toaster />
        <ScrollToTop />
        <NinjaCursorTrail />
        <Analytics />
      </body>
    </html>
  )
}
