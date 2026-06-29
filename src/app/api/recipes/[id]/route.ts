import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const recipe = await db.recipe.findUnique({
    where: { id },
    include: { ingredients: { include: { product: true } } },
  })
  if (!recipe) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }
  return NextResponse.json(recipe)
}
