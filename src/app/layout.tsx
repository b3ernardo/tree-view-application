import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

export const metadata: Metadata = {
  description: 'Tree View Application that shows companies Assets',
  title: 'tree-view-application'
}

const inter = Inter({ subsets: ['latin'] })

interface IRootLayoutProps {
  children: React.ReactNode
}

export default function RootLayout({ children }: IRootLayoutProps) {
  return (
    <html lang='en'>
      <body
        className={inter.className}
        style={{ margin: 0 }}
      >
        {children}
      </body>
    </html>
  )
}
