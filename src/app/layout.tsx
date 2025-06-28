import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'IMM Media - Creative Media Production House',
  description: 'Professional media production services in Hong Kong',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
} 