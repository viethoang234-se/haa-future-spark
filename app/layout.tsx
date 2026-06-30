import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Geist_Mono, Space_Grotesk, Outfit } from 'next/font/google'
import './globals.css'

const outfit = Outfit({
  variable: '--font-body',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
})
const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})
const spaceGrotesk = Space_Grotesk({
  variable: '--font-display',
  subsets: ['latin'],
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'Future Sparks | HAA 25 Years of Impact – Inspiring the Future',
  description:
    'Celebrate the 25th anniversary of the Ho Chi Minh City Advertising Association (HAA) and join Future Sparks — a digital advertising idea competition empowering the next generation of creative innovators.',
  generator: 'v0.app',
  keywords: [
    'HAA',
    'Future Sparks',
    'advertising competition',
    'Ho Chi Minh City Advertising Association',
    '25th anniversary',
    'Vietnam advertising',
    'creative competition',
  ],
  openGraph: {
    title: 'Future Sparks | HAA 25 Years of Impact',
    description:
      'A digital advertising idea competition celebrating 25 years of HAA and inspiring the future of Vietnamese advertising.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Future Sparks | HAA 25 Years of Impact',
    description:
      'A digital advertising idea competition celebrating 25 years of HAA.',
  },
}

export const viewport: Viewport = {
  colorScheme: 'dark',
  themeColor: '#0B1D3A',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`dark ${outfit.variable} ${geistMono.variable} ${spaceGrotesk.variable}`}
    >
      <body className="bg-background font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
