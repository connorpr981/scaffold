import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from "next-auth/next"

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { name } = await request.json()

  if (!name) {
    return NextResponse.json({ error: 'Project name is required' }, { status: 400 })
  }

  try {
    const { rows } = await sql`
      INSERT INTO projects (user_email, name)
      VALUES (${session.user.email}, ${name})
      RETURNING id, name
    `

    return NextResponse.json({ project: rows[0] }, { status: 200 })
  } catch (error) {
    console.error('Failed to create project:', error)
    return NextResponse.json({ error: 'Failed to create project' }, { status: 500 })
  }
}