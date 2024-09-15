import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from "next-auth/next"

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { feedback } = await request.json()

  if (!feedback) {
    return NextResponse.json({ error: 'Feedback is required' }, { status: 400 })
  }

  try {
    await sql`
      INSERT INTO feedback (user_email, content, user_agent, url)
      VALUES (${session.user.email}, ${feedback}, ${request.headers.get('user-agent')}, ${request.headers.get('referer')})
    `

    return NextResponse.json({ message: 'Feedback submitted successfully' }, { status: 200 })
  } catch (error) {
    console.error('Failed to submit feedback:', error)
    return NextResponse.json({ error: 'Failed to submit feedback' }, { status: 500 })
  }
}