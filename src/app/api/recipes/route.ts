import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

export async function GET() {
  const recipes = await db.recipe.findMany({
    include: { ingredients: true },
    orderBy: { title: 'asc' },
  })
  return NextResponse.json(recipes)
}
