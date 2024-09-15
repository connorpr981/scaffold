'use client'

import { signIn } from "next-auth/react"
import { Button } from "@/components/ui/button"

export default function SignIn() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="p-6 max-w-sm w-full bg-card shadow-md rounded-md">
        <h1 className="text-2xl font-semibold text-center text-foreground mt-8 mb-6">
          Sign in to Scaffold
        </h1>
        <div className="mt-8">
          <Button
            onClick={() => signIn("github", { callbackUrl: "/" })}
            className="w-full"
          >
            Sign in with GitHub
          </Button>
        </div>
      </div>
    </div>
  )
}