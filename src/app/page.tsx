'use client'

import { useUser } from '../contexts/UserContext'
import Link from 'next/link'
import { Button } from "@/components/ui/button"

export default function Home() {
  const { status } = useUser()

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8 text-foreground">Welcome to My App</h1>
      {status === "authenticated" ? (
        <Button asChild>
          <Link href="/projects">View Your Projects</Link>
        </Button>
      ) : (
        <Button asChild>
          <Link href="/auth/signin">Sign In to Get Started</Link>
        </Button>
      )}
    </div>
  )
}