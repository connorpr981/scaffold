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
    // Check if the project exists or create it
    const { rows: [projectRow] } = await sql`
      INSERT INTO projects (user_email, name)
      VALUES (${session.user.email}, ${project})
      ON CONFLICT (user_email, name) DO UPDATE SET updated_at = CURRENT_TIMESTAMP
      RETURNING id
    `

    // Insert the text
    await sql`
      INSERT INTO texts (project_id, content)
      VALUES (${projectRow.id}, ${text})
    `

    return NextResponse.json({ message: 'Text saved successfully' }, { status: 200 })
  } catch (error) {
    console.error('Failed to save text:', error)
    return NextResponse.json({ error: 'Failed to save text' }, { status: 500 })
  }
}