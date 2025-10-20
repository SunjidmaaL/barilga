import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import FacebookChat from '@/components/FacebookChat'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Монголын Барилгын Материал Үйлдвэрлэгчдийн Холбоо',
  description: 'Барилгын салбарын хөгжлийг дэмжих, чанартай материал үйлдвэрлэгчдийн нэгдсэн холбоо',
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
