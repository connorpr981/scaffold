'use client'

import React from 'react'
import { Inter } from 'next/font/google'
import { Providers } from '../app/providers'
import Header from './Header'
import MobileWarning from './MobileWarning'
import { useIsMobile } from '../hooks/useIsMobile'

const inter = Inter({ subsets: ['latin'] })

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return <MobileWarning />;
  }

  return (
    <body className={`${inter.className} antialiased flex flex-col min-h-screen`}>
      <Providers>
        <Header />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
      </Providers>
    </body>
  );
}