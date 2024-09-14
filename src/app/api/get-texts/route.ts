import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from "next-auth/next"

export async function GET(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const projectId = searchParams.get('projectId')

  if (!projectId) {
    return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
  }

  try {
    const { rows } = await sql`
      SELECT t.id, t.content, t.created_at
      FROM texts t
      JOIN projects p ON t.project_id = p.id
      WHERE p.user_email = ${session.user.email} AND p.id = ${projectId}
      ORDER BY t.created_at DESC
    `

    return NextResponse.json({ texts: rows }, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch texts:', error)
    return NextResponse.json({ error: 'Failed to fetch texts' }, { status: 500 })
  }
}