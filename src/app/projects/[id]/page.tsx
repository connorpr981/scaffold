'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../../../contexts/UserContext'
import SavedTexts from '../../../components/SavedTexts'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

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
      const response = await fetch(`/api/get-texts?projectId=${params.id}`)
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
  }, [params.id])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchSavedTexts()
    }
  }, [status, router, fetchSavedTexts])

  const handleSaveText = async () => {
    if (isSaving || !text.trim()) return
    setIsSaving(true)
    try {
      const response = await fetch('/api/save-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, project: params.id }),
      })
      if (response.ok) {
        setText('')
        fetchSavedTexts()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save text')
      }
    } catch (error) {
      console.error('Error saving text:', error)
      alert(error instanceof Error ? error.message : 'An unknown error occurred')
    } finally {
      setIsSaving(false)
    }
  }

  if (status === "loading" || isLoading) {
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>
  }

  if (!userData) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Project: {project}</CardTitle>
        </CardHeader>
        <CardContent>
          <Button asChild variant="link" className="mb-4">
            <Link href="/projects">Back to Projects</Link>
          </Button>
          <Textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="mb-4"
            placeholder="Enter your text here"
            rows={4}
          />
          <Button
            onClick={handleSaveText}
            disabled={isSaving || !text.trim()}
            className="mb-4"
          >
            {isSaving ? 'Saving...' : 'Save Text'}
          </Button>
          <SavedTexts texts={savedTexts} />
        </CardContent>
      </Card>
    </div>
  )
}