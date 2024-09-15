import { NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'
import { getServerSession } from "next-auth/next"

export async function DELETE(request: Request) {
    const session = await getServerSession()
    if (!session || !session.user?.email) {
        return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    const { id } = await request.json()
    if (!id) {
        return NextResponse.json({ error: 'Project ID is required' }, { status: 400 })
    }

    try {
        await sql`
            DELETE FROM projects
            WHERE id = ${id} AND user_email = ${session.user.email}
        `
        return NextResponse.json({ message: 'Project deleted successfully' }, { status: 200 })
    } catch (error) {
        console.error('Failed to delete project:', error)
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 })
    }
}