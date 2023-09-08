import { Toaster } from '@/components/ui/toaster'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Providers } from './provider';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'PDFILE',
  description: 'Talk to your PDF files like magic.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
      <Providers>
        {children}
        <Toaster />
      </Providers>
      </body>
    </html>
  )
}
