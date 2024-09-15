import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Header from '../components/Header'
import dynamic from 'next/dynamic'

const DynamicErrorBoundary = dynamic(() => import('../components/ErrorBoundary'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Template',
  description: 'A template app with NextAuth and Vercel Postgres',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} antialiased h-full`}>
        <Providers>
          <div className="flex flex-col min-h-full">
            <Header />
            <main className="flex-grow">{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}