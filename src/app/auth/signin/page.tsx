'use client'

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card"

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-[50vh]">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center">
            Sign in to Scaffold
          </CardTitle>
        </CardHeader>
        <CardContent>
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