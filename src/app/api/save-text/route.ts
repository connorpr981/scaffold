import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from "next-auth/next"

export async function POST(request: Request) {
  const session = await getServerSession()
  if (!session || !session.user?.email) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
  }

  const { text, project } = await request.json()

  try {
    // Update the CREATE TABLE statement to include the project column
    await sql`
      CREATE TABLE IF NOT EXISTS user_texts (
        id SERIAL PRIMARY KEY,
        user_email TEXT,
        content TEXT,
        project TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `

    // Add a migration to add the project column if it doesn't exist
    await sql`
      DO $$ 
      BEGIN 
        IF NOT EXISTS (
          SELECT FROM information_schema.columns 
          WHERE table_name = 'user_texts' AND column_name = 'project'
        ) THEN
          ALTER TABLE user_texts ADD COLUMN project TEXT;
        END IF;
      END $$;
    `

    await sql`
      INSERT INTO user_texts (user_email, content, project)
      VALUES (${session.user.email}, ${text}, ${project})
    `

    return NextResponse.json({ message: 'Text saved successfully' }, { status: 200 })
  } catch (error) {
    console.error('Failed to save text:', error)
    return NextResponse.json({ error: 'Failed to save text' }, { status: 500 })
  }
}