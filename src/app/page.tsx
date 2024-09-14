'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../contexts/UserContext'
import SavedTexts from '../components/SavedTexts'

export default function Home() {
  const { userData, status } = useUser()
  const [text, setText] = useState('')
  const [savedTexts, setSavedTexts] = useState([])
  const router = useRouter()

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchSavedTexts()
    }
  }, [status, router])

  const fetchSavedTexts = async () => {
    const response = await fetch('/api/get-texts')
    if (response.ok) {
      const data = await response.json()
      setSavedTexts(data.texts)
    }
  }

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
      fetchSavedTexts()
    } else {
      alert('Failed to save text')
    }
  }

  if (status === "loading") {
    return <div>Loading...</div>
  }

  if (!userData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {userData.name ?? 'User'}
      </h1>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full max-w-lg p-2 mb-4 border rounded"
        placeholder="Enter your text here"
        rows={4}
      />
      <button
        onClick={handleSaveText}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4"
      >
        Save Text
      </button>
      <SavedTexts texts={savedTexts} />
    </div>
  )
}