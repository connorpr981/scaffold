import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
  try {
    // Create projects table
    await sql`
      CREATE TABLE IF NOT EXISTS projects (
        id SERIAL PRIMARY KEY,
        user_email TEXT NOT NULL,
        name TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        UNIQUE(user_email, name)
      )
    `

    // Create texts table
    await sql`
      CREATE TABLE IF NOT EXISTS texts (
        id SERIAL PRIMARY KEY,
        project_id INTEGER NOT NULL,
        content TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
      )
    `

    // Remove migration of user_texts
    // await sql`
    //   INSERT INTO projects (user_email, name)
    //   SELECT DISTINCT user_email, project
    //   FROM user_texts
    //   WHERE project IS NOT NULL
    // `
    // await sql`
    //   INSERT INTO texts (project_id, content, created_at)
    //   SELECT p.id, ut.content, ut.created_at
    //   FROM user_texts ut
    //   JOIN projects p ON ut.user_email = p.user_email AND ut.project = p.name
    // `

    // Drop the old table
    await sql`DROP TABLE IF EXISTS user_texts`

    return NextResponse.json({ message: 'Migration successful' }, { status: 200 })
  } catch (error) {
    console.error('Migration failed:', error)
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 })
  }
}