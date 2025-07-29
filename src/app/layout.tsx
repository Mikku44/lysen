import type { Metadata } from 'next'
import { Geist, Geist_Mono, Sarabun, Noto_Sans_Thai } from 'next/font/google'
import './globals.css'
import { Toaster } from 'sonner'
import Announcement from '@/components/announcement'
import MouseTracker from '@/components/MouseTracker'
import Footer from '@/components/footer'
import ReduxProvider from '@/components/home/ReduxProvider'
import Template from '@/components/Template'
import Navbar from '@/components/Navbar'

const noto_Sans_Thai = Noto_Sans_Thai({
  variable: '--font-Noto-Sans-Thai',
  weight: ['100', '200', '400', '500', '600', '700'],
  subsets: ['latin']
})

const sarabun = Sarabun({
  variable: '--font-sarabun',
  weight: ['100', '200', '400', '500', '600', '700'],
  subsets: ['latin']
})

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
})

export const metadata: Metadata = {
  title: 'Lysen - Make Quotation & Receipt Easily | Free quotation Generator',
  description:
    'Create professional quotations and receipts effortlessly with Lysen. No login required, AI-optimized, 100% free quotation generator with customizable templates.',
  keywords: [
    'quotation generator',
    'receipt maker',
    'free quotation',
    'quotation template',
    'receipt generator',
    'business quotation',
    'quotation creator',
    'receipt template',
    'online quotation',
    'quotation tool'
  ],
  authors: [{ name: 'Lysen' }],
  creator: 'Lysen',
  publisher: 'Lysen',
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  metadataBase: new URL('https://lysen.khain.app'),
  alternates: {
    canonical: '/'
  },
  openGraph: {
    title: 'Lysen - Make quotation & Receipt Easily',
    description:
      'Create professional quotations and receipts effortlessly. No login required, AI-optimized, 100% free with customizable templates.',
    url: 'https://lysen.khain.app',
    siteName: 'Lysen',
    locale: 'en_US',
    type: 'website',

  },
  twitter: {
    card: 'summary_large_image',
    title: 'Lysen - Make quotation & Receipt Easily',
    description:
      'Create professional quotations and receipts effortlessly. No login required, AI-optimized, 100% free.',
    creator: '@lysen'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  category: 'business tools'
}

export default function RootLayout ({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang='th'>
      <body
        className={`${noto_Sans_Thai.className} ${sarabun.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="hidden">
          <ReduxProvider>
            <Template></Template>
          </ReduxProvider>
        </div>
        <MouseTracker />
        <Announcement />
        <Navbar />
        <Toaster closeButton position='top-center' />
        {children}
        <Footer />
      </body>
    </html>
  )
}
