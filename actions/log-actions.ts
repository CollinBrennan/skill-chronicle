'use server'

import { db } from '@/db/drizzle'
import { log, skill } from '@/db/schema'
import { LogData, LogFormData, LogTimelineData } from '@/types/types'
import { and, asc, desc, eq, gt, gte } from 'drizzle-orm'
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
    .orderBy(desc(log.date))

  return logs.map((log) => ({ ...log.log, skillName: log.skill.name }))
}

export async function getRecentLogs(userId: string): Promise<LogData[]> {
  const logs = await db
    .select()
    .from(log)
    .innerJoin(skill, eq(log.skillId, skill.id))
    .where(eq(log.userId, userId))
    .orderBy(desc(log.date))
    .limit(4)

  return logs.map((log) => ({ ...log.log, skillName: log.skill.name }))
}

export async function getTotalMinutesSinceDate(
  userId: string,
  since: Date
): Promise<number> {
  const logs = await db
    .select({
      minutes: log.minutes,
    })
    .from(log)
    .where(and(eq(log.userId, userId), gte(log.date, since)))
  const totalMinutes = logs.reduce((acc, log) => acc + log.minutes, 0)
  return totalMinutes
}

export async function getLogTimelineDataSinceDate(
  userId: string,
  since: Date
): Promise<LogTimelineData[]> {
  const logs = await db
    .select({ date: log.date, minutes: log.minutes })
    .from(log)
    .where(and(eq(log.userId, userId), gte(log.date, since)))
    .orderBy(asc(log.date))

  return logs
}
