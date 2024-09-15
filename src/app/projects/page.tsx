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

  const handleDeleteProject = async (projectId: number) => {
    if (confirm("Are you sure you want to delete this project?")) {
      try {
        const response = await fetch(`/api/delete-project`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id: projectId }),
        });
        if (response.ok) {
          fetchProjects(); // Refresh the project list
        } else {
          const errorData = await response.json();
          throw new Error(errorData.error || 'Failed to delete project');
        }
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Failed to delete project. Please try again.');
      }
    }
  }

  if (status === "loading" || isLoading) {
    return <div className="flex justify-center items-center h-full">Loading...</div>;
  }

  if (!userData) {
    return null
  }

  return (
    <div className="container mx-auto px-4 py-8 h-full">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Projects</h1>
      <div className="space-y-8">
        {projects.length > 0 ? (
          <section>
            <h2 className="text-2xl font-semibold mb-4">Existing Projects</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <Card key={project.id} className="flex flex-col justify-between">
                  <CardHeader>
                    <CardTitle>
                      <Link href={`/projects/${project.id}`} className="text-primary hover:underline">
                        {project.name}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Button onClick={() => handleDeleteProject(project.id)} variant="destructive" className="w-full">
                      Delete Project
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        ) : (
          <p className="text-center text-muted-foreground">
            You don&apos;t have any projects yet. Create one below!
          </p>
        )}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Create a New Project</h2>
          <Card>
            <CardContent className="pt-6">
              <div className="flex space-x-2">
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
        </section>
      </div>
    </div>
  )
}