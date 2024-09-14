'use client'

import { useState, useEffect, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../contexts/UserContext'
import SavedTexts from '../components/SavedTexts'

export default function Home() {
  const { userData, status } = useUser()
  const [text, setText] = useState('')
  const [project, setProject] = useState('')
  const [savedTexts, setSavedTexts] = useState([])
  const [projects, setProjects] = useState<string[]>([])
  const router = useRouter()

  const fetchProjects = useCallback(async () => {
    const response = await fetch('/api/get-projects')
    if (response.ok) {
      const data = await response.json()
      setProjects(data.projects)
    }
  }, [])

  const fetchSavedTexts = useCallback(async () => {
    const response = await fetch(`/api/get-texts${project ? `?project=${project}` : ''}`)
    if (response.ok) {
      const data = await response.json()
      setSavedTexts(data.texts)
    }
  }, [project])

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/signin')
    } else if (status === 'authenticated') {
      fetchProjects()
      fetchSavedTexts()
    }
  }, [status, router, fetchProjects, fetchSavedTexts])

  useEffect(() => {
    if (status === 'authenticated') {
      fetchSavedTexts()
    }
  }, [status, fetchSavedTexts])

  const handleSaveText = async () => {
    const response = await fetch('/api/save-text', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, project }),
    })
    if (response.ok) {
      alert('Text saved successfully!')
      setText('')
      fetchSavedTexts()
      fetchProjects()
    } else {
      alert('Failed to save text')
    }
  }

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value
    setProject(value)
    if (value === 'new') {
      const newProject = prompt('Enter new project name:')
      if (newProject) {
        setProject(newProject)
        setProjects([...projects, newProject])
      } else {
        setProject('')
      }
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
      <select
        value={project}
        onChange={handleProjectChange}
        className="w-full max-w-lg p-2 mb-4 border rounded"
      >
        <option value="">All Projects</option>
        {projects.map((p) => (
          <option key={p} value={p}>{p}</option>
        ))}
        <option value="new">+ New Project</option>
      </select>
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