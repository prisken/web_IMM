import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  display: 'swap',
  variable: '--font-inter'
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#3B82F6',
}

export const metadata: Metadata = {
  title: 'IMM Media - Creative Media Production House',
  description: 'Professional media production services in Hong Kong',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'IMM Media',
  },
  formatDetection: {
    telephone: false,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh" className={inter.variable}>
      <body className={inter.className} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  )
} 