import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from "next-auth/next"

export async function PUT(request: Request) {
    const session = await getServerSession()
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { id, content } = await request.json()
    if (!id || !content) {
        return NextResponse.json({ error: 'Text ID and content are required' }, { status: 400 })
    }

    try {
        await sql`
            UPDATE texts
            SET content = ${content}
            WHERE id = ${id}
        `
        return NextResponse.json({ message: 'Text updated successfully' }, { status: 200 })
    } catch (error) {
        console.error('Failed to edit text:', error)
        return NextResponse.json({ error: 'Failed to edit text' }, { status: 500 })
    }
}