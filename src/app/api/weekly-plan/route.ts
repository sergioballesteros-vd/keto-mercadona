import { NextResponse } from 'next/server'
import { db } from '@/lib/db'

function getMonday(date: Date): Date {
  const d = new Date(date)
  const day = d.getDay()
  const diff = d.getDate() - day + (day === 0 ? -6 : 1)
  d.setDate(diff)
  d.setHours(0, 0, 0, 0)
  return d
}

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
