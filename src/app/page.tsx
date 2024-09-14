'use client'

import { useSession } from "next-auth/react"
import { useState } from 'react'

export default function Home() {
  const { data: session } = useSession()
  const [text, setText] = useState('')

  const handleSaveText = async () => {
    const response = await fetch('/api/save-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text }),
    })
    if (response.ok) {
      alert('Text saved successfully!')
      setText('')
    } else {
      alert('Failed to save text')
    }
  }

  if (!session) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <p className="text-xl">Please sign in to access this page.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Welcome, {session.user.name}</h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full max-w-lg p-2 mb-4 border rounded"
        placeholder="Enter your text here"
        rows={4}
      />
      <button
        onClick={handleSaveText}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Save Text
      </button>
    </div>
  )
}