'use client'

import type { Metadata } from 'next'
import './globals.css'
import { Inter } from 'next/font/google'
import { Providers } from './providers'
import Header from '../components/Header'
import MobileWarning from '../components/MobileWarning'
import { useIsMobile } from '../hooks/useIsMobile'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Scaffold',
  description: 'Scaffold is a tool for creating and managing examples for your LLM.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileWarning />;
  }

  return (
    <html lang="en" className="h-full">
      <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
        <Providers>
          <Header />
          <main className="flex-grow flex flex-col">
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}