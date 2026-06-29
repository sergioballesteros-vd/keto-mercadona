import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const items = await db.shoppingListItem.findMany({
    include: { product: true },
    orderBy: [{ checked: 'asc' }, { createdAt: 'desc' }],
  })
  return NextResponse.json(items)
}

export async function POST(request: Request) {
  const body = await request.json()
  const { name, quantity, productId, reason } = body

  if (!name) {
    return NextResponse.json({ error: 'name required' }, { status: 400 })
  }

  const item = await db.shoppingListItem.create({
    data: {
      name,
      quantity: quantity ?? null,
      productId: productId ?? null,
      reason: reason ?? null,
    },
    include: { product: true },
  })
  return NextResponse.json(item, { status: 201 })
}
