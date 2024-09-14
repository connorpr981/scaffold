import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function GET() {
  try {
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
    return NextResponse.json({ message: 'Migration successful' }, { status: 200 })
  } catch (error) {
    console.error('Migration failed:', error)
    return NextResponse.json({ error: 'Migration failed' }, { status: 500 })
  }
}