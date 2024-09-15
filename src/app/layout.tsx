import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Header from '../components/Header'
// Removed unused DynamicErrorBoundary import
// const DynamicErrorBoundary = dynamic(() => import('../components/ErrorBoundary'), { ssr: false })

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Scaffold',
  description: 'A template app with NextAuth and Vercel Postgres',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          <main className="flex-grow container mx-auto px-4 py-8">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  )
}