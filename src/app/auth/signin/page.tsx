'use client'

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"
import { BackgroundBeams } from "@/components/ui/background-beams"

export default function SignIn() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] w-full relative overflow-hidden">
      <BackgroundBeams className="absolute inset-0" />
      <Card className="w-full max-w-md relative z-10 mx-4">
        <CardHeader>
          <CardTitle className="text-3xl text-center">
            Sign in
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          <p className="mb-6 text-muted-foreground">
            Please select one of the following methods:
          </p>
          <Button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full"
          >
            Sign in with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}