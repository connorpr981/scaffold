'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../../../contexts/UserContext'
import SavedTexts from '../../../components/SavedTexts'
import Link from 'next/link'

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { userData, status } = useUser()
  const [text, setText] = useState('')
  const [savedTexts, setSavedTexts] = useState([])
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const project = decodeURIComponent(params.id)

  const fetchSavedTexts = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/get-texts?project=${encodeURIComponent(project)}`)
      if (response.ok) {
        const data = await response.json()
        setSavedTexts(data.texts)
      } else {
        throw new Error('Failed to fetch texts')
      }
    } catch (error) {
      console.error('Error fetching saved texts:', error)
      alert('Failed to load saved texts. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [project])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchSavedTexts()
    }
  }, [status, router, fetchSavedTexts])

  const handleSaveText = async () => {
    if (isSaving) return
    setIsSaving(true)
    try {
      const response = await fetch('/api/save-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, project }),
      })
      if (response.ok) {
        setText('')
        fetchSavedTexts()
      } else {
        throw new Error('Failed to save text')
      }
    } catch (error) {
      console.error('Error saving text:', error)
      alert('Failed to save text. Please try again.')
    } finally {
      setIsSaving(false)
    }
  }

  if (status === "loading" || isLoading) {
    return <div>Loading...</div>
  }

  if (!userData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">
        Project: {project}
      </h1>
      <Link href="/projects" className="text-blue-500 hover:underline mb-4">
        Back to Projects
      </Link>
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full max-w-lg p-2 mb-4 border rounded"
        placeholder="Enter your text here"
        rows={4}
      />
      <button
        onClick={handleSaveText}
        disabled={isSaving}
        className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 mb-4 ${isSaving ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isSaving ? 'Saving...' : 'Save Text'}
      </button>
      <SavedTexts texts={savedTexts} />
    </div>
  )
}