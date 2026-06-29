import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(request: Request) {
  const body = await request.json()
  const { ids }: { ids: string[] } = body

  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ error: 'ids array required' }, { status: 400 })
  }

  await db.shoppingListItem.updateMany({
    where: { id: { in: ids } },
    data: { checked: true },
  })

  // Add linked products to pantry
  const items = await db.shoppingListItem.findMany({
    where: { id: { in: ids }, productId: { not: null } },
  })

  for (const item of items) {
    if (item.productId) {
      const exists = await db.pantryItem.findFirst({ where: { productId: item.productId } })
      if (!exists) {
        await db.pantryItem.create({ data: { productId: item.productId } })
      }
    }
  }

  return NextResponse.json({ marked: ids.length })
}
