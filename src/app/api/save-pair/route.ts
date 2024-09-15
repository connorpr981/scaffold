import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from "next-auth/next"

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { input, output, projectId } = await request.json()

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
      INSERT INTO texts (project_id, input, output)
      VALUES (${projectId}, ${input}, ${output})
    `

    return NextResponse.json({ message: 'Pair saved successfully' }, { status: 200 })
  } catch (error) {
    console.error('Failed to save pair:', error)
    return NextResponse.json({ error: 'Failed to save pair' }, { status: 500 })
  }
}