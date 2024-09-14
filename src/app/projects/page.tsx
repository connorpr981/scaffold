'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../../contexts/UserContext'
import Link from 'next/link'

export default function Projects() {
  const { userData, status } = useUser()
  const [projects, setProjects] = useState<string[]>([])
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
    return <div>Loading...</div>
  }

  if (!userData) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Your Projects</h1>
      {projects.length > 0 ? (
        <ul className="space-y-2 mb-4">
          {projects.map((project) => (
            <li key={project}>
              <Link href={`/projects/${encodeURIComponent(project)}`} className="text-blue-500 hover:underline">
                {project}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <p className="mb-4">You don&apos;t have any projects yet. Create one below!</p>
      )}
      <div className="flex space-x-2">
        <input
          type="text"
          value={newProject}
          onChange={(e) => setNewProject(e.target.value)}
          placeholder="New project name"
          className="p-2 border rounded"
        />
        <button
          onClick={handleCreateProject}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Create Project
        </button>
      </div>
    </div>
  )
}