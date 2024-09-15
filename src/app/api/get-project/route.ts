import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from "next-auth/next"

export async function GET(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get('id')

  if (!projectId) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
  }

  try {
    const { rows: projectRows } = await sql`
      SELECT id, name, created_at, updated_at
      FROM projects
      WHERE id = ${projectId} AND user_email = ${session.user.email}
    `

    if (projectRows.length === 0) {
      return NextResponse.json({ error: 'Project not found or unauthorized' }, { status: 404 })
    }

    const { rows: textRows } = await sql`
      SELECT id, input, output, created_at, updated_at
      FROM texts
      WHERE project_id = ${projectId}
      ORDER BY created_at DESC
    `

    return NextResponse.json({ 
      project: projectRows[0],
      pairs: textRows
    }, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch project details:', error)
    return NextResponse.json({ error: 'Failed to fetch project details' }, { status: 500 })
  }
}