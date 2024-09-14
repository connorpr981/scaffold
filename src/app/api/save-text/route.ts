import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from "next-auth/next"

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { text } = await request.json()

  try {
    await sql`
      CREATE TABLE IF NOT EXISTS user_texts (
        id SERIAL PRIMARY KEY,
        user_email TEXT,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    await sql`
      INSERT INTO user_texts (user_email, content)
      VALUES (${session.user.email}, ${text})
    `

    return NextResponse.json({ message: 'Text saved successfully' }, { status: 200 })
  } catch (error) {
    console.error('Failed to save text:', error)
    return NextResponse.json({ error: 'Failed to save text' }, { status: 500 })
  }
}