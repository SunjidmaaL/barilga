import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FacebookChat from '@/components/FacebookChat'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'),
  title: {
    default: "МБМҮХолбоо",
    template: "%s | МБМҮХ",
  },
  description: "Монголын барилгын материалын үйлдвэрлэгчдийн холбоо. Барилгын салбарын мэдээ, сургалт, хууль эрх зүй, тусгай зөвшөөрөл, гадаад харилцаа.",
  keywords: [
    'барилга',
    'материал',
    'үйлдвэрлэл',
    'холбоо',
    'сургалт',
    'хууль',
    'тусгай зөвшөөрөл',
    'гадаад харилцаа',
    'мэдээ',
    'төслүүд',
    'гишүүд',
    'экспертийн баг',
    'construction',
    'materials',
    'mongolia',
    'ulaanbaatar',
    'МБМҮХ',
    'МБМҮХолбоо'
  ],
  authors: [{ name: 'МБМҮХолбоо' }],
  creator: 'МБМҮХолбоо',
  publisher: 'МБМҮХолбоо',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "МБМҮХолбоо - Барилгын материалын үйлдвэрлэгчдийн холбоо",
    description: "Монголын барилгын материалын үйлдвэрлэгчдийн холбоо. Барилгын салбарын мэдээ, сургалт, хууль эрх зүй, тусгай зөвшөөрөл, гадаад харилцаа.",
    url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
    siteName: "МБМҮХолбоо",
    locale: 'mn_MN',
    type: 'website',
    images: [
      { 
        url: '/img/logo.jpg',
        width: 1200,
        height: 630,
        alt: 'МБМҮХолбоо лого'
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "МБМҮХолбоо - Барилгын материалын үйлдвэрлэгчдийн холбоо",
    description: "Монголын барилгын материалын үйлдвэрлэгчдийн холбоо. Барилгын салбарын мэдээ, сургалт, хууль эрх зүй, тусгай зөвшөөрөл, гадаад харилцаа.",
    images: ['/img/logo.jpg'],
    creator: '@МБМҮХолбоо',
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
  alternates: {
    canonical: '/',
  },
  category: 'construction',
  classification: 'Business',
  other: {
    'mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'default',
    'apple-mobile-web-app-title': 'МБМҮХолбоо',
    'application-name': 'МБМҮХолбоо',
    'msapplication-TileColor': '#2563eb',
    'theme-color': '#2563eb',
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="mn">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" sizes="16x16" type="image/png" />
        <link rel="icon" href="/favicon-32x32.png" sizes="32x32" type="image/png" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/site.webmanifest" />
        <style dangerouslySetInnerHTML={{
          __html: `
            /* Favicon бөөрөнхий хэлбэрт оруулах */
            link[rel="icon"] {
              border-radius: 50% !important;
            }
            /* Browser tab дээрх favicon-ийг бөөрөнхий болгох */
            .favicon-round {
              border-radius: 50%;
              overflow: hidden;
            }
          `
        }} />
      </head>
      <body className={inter.className}>
        <Header />
        <main className="pt-20">
          {children}
        </main>
        <Footer />
        <FacebookChat />
      </body>
    </html>
  )
}
