import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Sharing Ideas',
  description: 'A platform to learn new technologies and share ideas',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
