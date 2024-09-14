import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'password'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const password = searchParams.get('password')

  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    // Drop existing tables
    await sql`DROP TABLE IF EXISTS texts CASCADE`
    await sql`DROP TABLE IF EXISTS projects CASCADE`
    await sql`DROP TABLE IF EXISTS user_texts CASCADE`

    // Recreate projects table
    await sql`
      CREATE TABLE projects (
        id SERIAL PRIMARY KEY,
        user_email TEXT NOT NULL,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_email, name)
      )
    `

    // Recreate texts table
    await sql`
      CREATE TABLE texts (
        id SERIAL PRIMARY KEY,
        project_id INTEGER NOT NULL,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      )
    `

    return NextResponse.json({ message: 'Database reset successful' }, { status: 200 })
  } catch (error) {
    console.error('Database reset failed:', error)
    return NextResponse.json({ error: 'Database reset failed' }, { status: 500 })
  }
}