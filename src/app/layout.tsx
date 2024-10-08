import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

export const metadata: Metadata = {
  description: 'Tree View Application that shows companies Assets',
  title: 'Tree Assets'
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
        style={{ backgroundColor: '#E3EAEF', margin: 0 }}
      >
        {children}
      </body>
    </html>
  )
}
