import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from "next-auth/next"

export async function GET(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { searchParams } = new URL(request.url)
  const project = searchParams.get('project')

  try {
    let query = `
      SELECT content, project, created_at
      FROM user_texts
      WHERE user_email = $1
    `
    const params = [session.user.email]

    if (project) {
      query += ` AND project = $2`
      params.push(project)
    }

    query += ` ORDER BY created_at DESC`

    const { rows } = await sql.query(query, params)

    return NextResponse.json({ texts: rows }, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch texts:', error)
    return NextResponse.json({ error: 'Failed to fetch texts' }, { status: 500 })
  }
}