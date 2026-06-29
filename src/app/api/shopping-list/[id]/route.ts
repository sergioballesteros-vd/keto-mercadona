import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  try {
    await db.shoppingListItem.delete({ where: { id } })
    return NextResponse.json({ success: true })
  } catch {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
}
