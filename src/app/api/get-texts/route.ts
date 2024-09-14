import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from "next-auth/next"

export async function GET() {
  const session = await getServerSession()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  try {
    const result = await sql`
      SELECT content, created_at
      FROM user_texts
      WHERE user_email = ${session.user.email}
      ORDER BY created_at DESC
    `

    return NextResponse.json({ texts: result.rows }, { status: 200 })
  } catch (error) {
    console.error('Failed to fetch texts:', error)
    return NextResponse.json({ error: 'Failed to fetch texts' }, { status: 500 })
  }
}