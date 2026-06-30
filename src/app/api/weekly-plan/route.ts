import { NextResponse } from 'next/server'
import { db } from '@/lib/db'
import { getMonday } from '@/lib/dateUtils'

export async function GET() {
  const monday = getMonday(new Date())

  let plan = await db.weeklyPlan.findFirst({
    where: { weekStart: monday },
    include: {
      meals: {
        include: { recipe: true },
        orderBy: [{ dayOfWeek: 'asc' }, { mealType: 'asc' }],
      },
    },
  })

  if (!plan) {
    plan = await db.weeklyPlan.create({
      data: { weekStart: monday },
      include: { meals: { include: { recipe: true } } },
    })
  }

  return NextResponse.json(plan)
}
