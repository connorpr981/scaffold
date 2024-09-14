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
      SELECT id, name
      FROM projects
      WHERE user_email = ${session.user.email}
      ORDER BY name
    `

    return NextResponse.json({ projects: rows }, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch projects:', error)
    return NextResponse.json({ error: 'Failed to fetch projects' }, { status: 500 })
  }
}