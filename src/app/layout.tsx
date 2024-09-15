import type { Metadata } from 'next'
import './globals.css'
import ClientLayout from '../components/ClientLayout'

export const metadata: Metadata = {
  title: 'Scaffold',
  description: 'Scaffold is a tool for creating and managing examples for your LLM.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="h-full">
      <ClientLayout>{children}</ClientLayout>
    </html>
  );
}