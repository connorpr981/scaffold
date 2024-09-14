'use client'

import { useUser } from '../contexts/UserContext'
import Link from 'next/link'

export default function Home() {
  const { status } = useUser()

  if (status === "loading") {
    return <div>Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold mb-8">Welcome to My App</h1>
      {status === "authenticated" ? (
        <Link href="/projects" className="bg-blue-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-blue-600 transition duration-300">
          View Your Projects
        </Link>
      ) : (
        <Link href="/auth/signin" className="bg-green-500 text-white px-6 py-3 rounded-lg text-lg hover:bg-green-600 transition duration-300">
          Sign In to Get Started
        </Link>
      )}
    </div>
  )
}