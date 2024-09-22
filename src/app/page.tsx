'use client'

import { useUser } from '../contexts/UserContext'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { BackgroundBeams } from "@/components/ui/background-beams"

export default function Home() {
  const { status } = useUser()

  if (status === "loading") {
    return <div className="flex justify-center items-center h-[calc(100vh-4rem)]">Loading...</div>
  }

  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] w-full relative overflow-hidden">
      <BackgroundBeams className="absolute inset-0" />
      <Card className="w-full max-w-md relative z-10 mx-4">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Welcome to Scaffold
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-muted-foreground">
            Let&apos;s get started.
          </p>
          {status === "authenticated" ? (
            <Button asChild>
              <Link href="/projects">View Your Projects</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}