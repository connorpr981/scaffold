'use client'

import { useUser } from '../contexts/UserContext'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Home() {
  const { status } = useUser()

  if (status === "loading") {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Welcome to Scaffold
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-muted-foreground">
            Create and manage your examples with ease.
          </p>
          {status === "authenticated" ? (
            <Button asChild>
              <Link href="/projects">View Your Projects</Link>
            </Button>
          ) : (
            <Button asChild>
              <Link href="/auth/signin">Sign In to Get Started</Link>
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}