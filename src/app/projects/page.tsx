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
      const response = await fetch('/api/create-project', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: newProject }),
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
    return <div className="flex justify-center items-center min-h-screen">Loading...</div>; // Consider using a spinner here
  }

  if (!userData) {
    return null
  }

  return (
    <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center mb-4">
            Your Projects
          </CardTitle>
        </CardHeader>
        <CardContent>
          {projects.length > 0 ? (
            <>
              <h2 className="text-xl font-semibold mb-2">
                Existing Projects
              </h2> {/* Added section heading */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-4">
                {projects.map((project) => (
                  <Card key={project.id} className="w-full shadow-md hover:shadow-lg transition-shadow duration-200">
                    <CardContent className="p-4">
                      <Link href={`/projects/${project.id}`} className="text-primary hover:underline">
                        <h4 className="font-semibold text-lg">{project.name}</h4>
                      </Link>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </>
          ) : (
            <p className="mb-4 text-muted-foreground">
              You don't have any projects yet. Create one below!
            </p>
          )}
          <h2 className="text-xl font-semibold mt-6 mb-2">
            Create a New Project
          </h2> {/* Added section heading */}
          <div className="flex space-x-2 mt-4">
            <Input
              type="text"
              value={newProject}
              onChange={(e) => setNewProject(e.target.value)}
              placeholder="New project name"
              className="flex-grow"
            />
            <Button onClick={handleCreateProject}>Create Project</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}