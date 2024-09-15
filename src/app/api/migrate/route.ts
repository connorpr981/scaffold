import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
  try {
    // Step 1: Add input and output columns
    await sql`
      ALTER TABLE texts
      ADD COLUMN input TEXT,
      ADD COLUMN output TEXT
    `

    // Step 2: Copy content to input (temporary measure)
    await sql`
      UPDATE texts
      SET input = content
    `

    // Step 3: Drop the content column
    await sql`
      ALTER TABLE texts
      DROP COLUMN content
    `

    return NextResponse.json({ message: 'Texts table migration successful' }, { status: 200 })
  } catch (error) {
    console.error('Texts table migration failed:', error)
    return NextResponse.json({ error: 'Texts table migration failed' }, { status: 500 })
  }
}