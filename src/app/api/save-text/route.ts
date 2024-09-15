import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from "next-auth/next"

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { text, projectId } = await request.json()

  if (!projectId) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
  }

  try {
    const { rows: projectRows } = await sql`
      SELECT id FROM projects
      WHERE id = ${projectId} AND user_email = ${session.user.email}
    `

    if (projectRows.length === 0) {
      return NextResponse.json({ error: 'Project not found or unauthorized' }, { status: 404 })
    }

    await sql`
      INSERT INTO texts (project_id, content)
      VALUES (${projectId}, ${text})
    `

    return NextResponse.json({ message: 'Text saved successfully' }, { status: 200 })
  } catch (error) {
    console.error('Failed to save text:', error)
    return NextResponse.json({ error: 'Failed to save text' }, { status: 500 })
  }
}