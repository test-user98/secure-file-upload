import { Providers } from '@/components/providers'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Header from '@/components/Header'
import QueryProvider from '@/providers/query.provider'
import StoreProvider from '@/providers/store.provider'
import {Toaster} from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Secure File Share',
  description: 'A secure file sharing application',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <StoreProvider>
          <QueryProvider>
            <Providers>
              <Header />
              <main className="container mx-auto px-4 py-8">
                {children}
                <Toaster/>
              </main>
            </Providers>
          </QueryProvider>
        </StoreProvider>
      </body>
    </html>
  )
}

