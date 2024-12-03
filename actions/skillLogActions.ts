'use server'

import { db } from '@/db/drizzle'
import { skillLog } from '@/db/schema'

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
}
