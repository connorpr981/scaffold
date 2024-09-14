'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../../contexts/UserContext'
import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"

export default function Projects() {
  const { userData, status } = useUser()
  const [projects, setProjects] = useState<Array<{ id: number, name: string }>>([])
  const [newProject, setNewProject] = useState('')
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchProjects()
    }
  }, [status, router])

  const fetchProjects = async () => {
    setIsLoading(true)
    try {
      const response = await fetch('/api/get-projects')
      if (response.ok) {
        const data = await response.json()
        setProjects(data.projects)
      } else {
        throw new Error('Failed to fetch projects')
      }
    } catch (error) {
      console.error('Error fetching projects:', error)
      alert('Failed to load projects. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreateProject = async () => {
    if (!newProject.trim()) return
    try {
      const response = await fetch('/api/save-text', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: '', project: newProject }),
      })
      if (response.ok) {
        setNewProject('')
        fetchProjects()
      } else {
        const errorData = await response.json()
        throw new Error(errorData.error || response.statusText || 'Unknown error occurred')
      }
    } catch (error) {
      console.error('Error creating project:', error)
      const errorMessage = error instanceof Error ? error.message : 'An unknown error occurred'
      alert(`Failed to create project. ${errorMessage}`)
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
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Your Projects</CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <ul className="space-y-2 mb-4">
              {projects.map((project) => (
                <li key={project.id}>
                  <Link href={`/projects/${project.id}`} className="text-primary hover:underline">
                    {project.name}
                  </Link>
                </li>
              ))}
            </ul>
          ) : (
            <p className="mb-4 text-muted-foreground">You don&apos;t have any projects yet. Create one below!</p>
          )}
          <div className="flex space-x-2">
            <Input
              type="text"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              placeholder="New project name"
            />
            <Button onClick={handleCreateProject}>Create Project</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}