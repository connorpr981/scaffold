import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Header from '../components/Header'
import ErrorBoundary from '../components/ErrorBoundary'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Template App',
  description: 'A template app with NextAuth and Vercel Postgres',
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
          <Header />
          <ErrorBoundary>
            <main>{children}</main>
          </ErrorBoundary>
        </Providers>
      </body>
    </html>
  )
}