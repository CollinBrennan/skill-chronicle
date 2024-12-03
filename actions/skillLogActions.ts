'use server'

import { db } from '@/db/drizzle'
import { log } from '@/db/schema'
import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

type LogValues = {
  userId: string
  name: string
  hours: number
  minutes: number
  note: string
  date: Date
}

export async function insertLog({
  userId,
  name,
  hours,
  minutes,
  note,
  date,
}: LogValues) {
  const totalMinutes = hours * 60 + minutes
  await db
    .insert(log)
    .values({ userId, name, minutes: totalMinutes, note, date })
  revalidatePath('/logs')
  revalidatePath('/dashboard')
}

export async function deleteLog(logId: string) {
  await db.delete(log).where(eq(log.id, logId))
  revalidatePath('/logs')
}

export async function getLogs(userId: string) {
  const logs = await db
    .select()
    .from(log)
    .where(eq(log.userId, userId))
    .orderBy(desc(log.createdAt))
  return logs
}
