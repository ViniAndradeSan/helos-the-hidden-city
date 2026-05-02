import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import '@fontsource/crimson-text/400.css'
import '@fontsource/crimson-text/600.css'
import '@fontsource/crimson-text/700.css'
import './globals.css'
import { Cinzel, Cormorant_Garamond } from 'next/font/google'

export const cinzel = Cinzel({
  subsets: ['latin'],
  variable: '--font-cinzel',
})

export const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  variable: '--font-cormorant',
})

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
})

export const metadata: Metadata = {
  title: 'Cidade de Helos - Atlas Interativo',
  description: 'Explore a cidade medieval de Helos. Descubra distritos, lojas, NPCs e segredos ocultos neste atlas interativo de RPG.',
  generator: 'v0.app',
  keywords: ['RPG', 'medieval', 'fantasia', 'mapa', 'cidade', 'Helos', 'atlas'],
  authors: [{ name: 'Helos' }],
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

export const viewport: Viewport = {
  themeColor: '#1a1814',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR" className="dark bg-background" data-scroll-behavior="smooth">
      <body className={`${cinzel.variable} ${cormorant.variable}`}>
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
