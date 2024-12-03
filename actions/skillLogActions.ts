'use server'

import { db } from '@/db/drizzle'
import { skillLog } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

type LogValues = {
  userId: string
  name: string
  hours: number
  minutes: number
  note: string
}

export async function insertLog({
  userId,
  name,
  hours,
  minutes,
  note,
}: LogValues) {
  const totalMinutes = hours * 60 + minutes
  await db
    .insert(skillLog)
    .values({ userId, name, minutes: totalMinutes, note })
  revalidatePath('/logs')
  revalidatePath('/dashboard')
}

export async function deleteLog(logId: string) {
  await db.delete(skillLog).where(eq(skillLog.id, logId))
  revalidatePath('/logs')
}

export async function getLogs(userId: string) {
  const logs = await db
    .select()
    .from(skillLog)
    .where(eq(skillLog.userId, userId))
    .orderBy(desc(skillLog.createdAt))
  return logs
}
