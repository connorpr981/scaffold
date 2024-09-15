'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../../../contexts/UserContext'
import SavedTexts from '../../../components/SavedTexts'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { handleError } from '../../../utils/errorHandler'; // Import the error handler

export default function ProjectPage({ params }: { params: { id: string } }) {
  const { userData, status } = useUser()
  const [input, setInput] = useState('') // New state for input
  const [output, setOutput] = useState('') // New state for output
  const [savedPairs, setSavedPairs] = useState([]) // Updated state for input-output pairs
  const [isSaving, setIsSaving] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [projectName, setProjectName] = useState('')
  const router = useRouter()

  const fetchProjectDetails = useCallback(async () => {
    setIsLoading(true)
    try {
      const response = await fetch(`/api/get-project?id=${params.id}`)
      if (response.ok) {
        const data = await response.json()
        setProjectName(data.project.name)
        setSavedPairs(data.pairs)
      } else {
        throw new Error('Failed to fetch project details')
      }
    } catch (error) { 
      console.error('Error fetching project details:', error)
      alert('Failed to load project details. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }, [params.id])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchProjectDetails()
    }
  }, [status, router, fetchProjectDetails])

  const handleSaveText = async () => {
    if (isSaving || !input.trim() || !output.trim()) return // Check both input and output
    setIsSaving(true)
    try {
      const response = await fetch('/api/save-pair', { // Updated endpoint for pairs
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ input, output, projectId: params.id }), // Save both input and output
      })
      if (response.ok) {
        setInput('') // Clear input
        setOutput('') // Clear output
        fetchProjectDetails()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Failed to save pair')
      }
    } catch (error) {
      handleError(error as Error); // Use the centralized error handler
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
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Project: {projectName}</CardTitle>
        </CardHeader>
        <CardContent>
          <Button asChild variant="link" className="mb-4">
            <Link href="/projects">Back to Projects</Link>
          </Button>
          <div className="space-y-4">
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Enter your input here"
              rows={2}
            />
            <Textarea
              value={output}
              onChange={(e) => setOutput(e.target.value)}
              placeholder="Enter your output here"
              rows={2}
            />
            <Button
              onClick={handleSaveText}
              disabled={isSaving || !input.trim() || !output.trim()}
            >
              {isSaving ? 'Saving...' : 'Save Pair'}
            </Button>
          </div>
        </CardContent>
      </Card>
      <SavedTexts pairs={savedPairs} fetchProjectDetails={fetchProjectDetails} />
    </div>
  )
}