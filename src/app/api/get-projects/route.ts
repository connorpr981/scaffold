import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from "next-auth/next"

export async function GET() {
  const session = await getServerSession()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const { rows } = await sql`
      SELECT DISTINCT project
      FROM user_texts
      WHERE user_email = ${session.user.email}
      ORDER BY project
    `

    const projects = rows.map(row => row.project).filter(Boolean)

    return NextResponse.json({ projects }, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}