'use server'

import { db } from '@/db/drizzle'
import { users } from '@/db/schema'
import { eq } from 'drizzle-orm'

export async function getWeeklyGoal(userId: string): Promise<number> {
  const data = await db
    .select({
      weeklyGoal: users.weeklyGoal,
    })
    .from(users)
    .where(eq(users.id, userId))
  return data[0].weeklyGoal
}

export async function updateWeeklyGoal(
  userId: string,
  newGoal: number
): Promise<void> {
  await db
    .update(users)
    .set({ weeklyGoal: newGoal })
    .where(eq(users.id, userId))
}
