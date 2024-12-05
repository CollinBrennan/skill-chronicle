'use server'

import { db } from '@/db/drizzle'
import { log, skill } from '@/db/schema'
import { LogData, LogFormData } from '@/types/types'
import { desc, eq } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'

export async function insertLog({
  userId,
  skillId,
  hours,
  minutes,
  note,
  date,
}: LogFormData) {
  const totalMinutes = hours * 60 + minutes
  await db
    .insert(log)
    .values({ userId, skillId, minutes: totalMinutes, note, date })
  revalidatePath('/logs')
  revalidatePath('/dashboard')
}

export async function deleteLog(logId: string) {
  await db.delete(log).where(eq(log.id, logId))
  revalidatePath('/logs')
}

export async function getLogs(userId: string): Promise<LogData[]> {
  const logs = await db
    .select()
    .from(log)
    .innerJoin(skill, eq(log.skillId, skill.id))
    .where(eq(log.userId, userId))
    .orderBy(desc(log.createdAt))

  return logs.map((log) => ({ ...log.log, skillName: log.skill.name }))
}

export async function getRecentLogs(userId: string): Promise<LogData[]> {
  const logs = await db
    .select()
    .from(log)
    .innerJoin(skill, eq(log.skillId, skill.id))
    .where(eq(log.userId, userId))
    .orderBy(desc(log.createdAt))
    .limit(4)

  return logs.map((log) => ({ ...log.log, skillName: log.skill.name }))
}
