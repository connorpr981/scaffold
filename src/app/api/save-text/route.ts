import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from "next-auth/next"

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { text, project } = await request.json()

  if (!project) {
    return NextResponse.json({ error: 'Project name is required' }, { status: 400 })
  }

  try {
    // Ensure the table exists
    await sql`
      CREATE TABLE IF NOT EXISTS user_texts (
        id SERIAL PRIMARY KEY,
        user_email TEXT,
        content TEXT,
        project TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Check if the project already exists
    const { rows } = await sql`
      SELECT 1 FROM user_texts
      WHERE user_email = ${session.user.email} AND project = ${project}
      LIMIT 1
    `

    if (rows.length > 0) {
      return NextResponse.json({ error: 'Project already exists' }, { status: 400 })
    }

    // Insert a new row even if text is empty, to create the project
    await sql`
      INSERT INTO user_texts (user_email, content, project)
      VALUES (${session.user.email}, ${text || ''}, ${project})
    `

    return NextResponse.json({ message: 'Project created successfully' }, { status: 200 })
  } catch (error) {
    console.error('Failed to save text or create project:', error)
    return NextResponse.json({ error: 'Failed to save text or create project' }, { status: 500 })
  }
}