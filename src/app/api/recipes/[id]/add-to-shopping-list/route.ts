import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const recipe = await db.recipe.findUnique({
    where: { id },
    include: { ingredients: true },
  })
  if (!recipe) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const pantryItems = await db.pantryItem.findMany()
  const pantryProductIds = new Set(pantryItems.map(i => i.productId))

  const missingIngredients = recipe.ingredients.filter(
    ing => !ing.optional && (!ing.productId || !pantryProductIds.has(ing.productId))
  )

  const created = await Promise.all(
    missingIngredients.map(ing =>
      db.shoppingListItem.create({
        data: {
          name: ing.name,
          quantity: ing.quantity,
          productId: ing.productId ?? null,
          reason: `Para: ${recipe.title}`,
        },
      })
    )
  )

  return NextResponse.json({ added: created.length, items: created })
}
