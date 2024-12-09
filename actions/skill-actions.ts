'use server'

import { db } from '@/db/drizzle'
import { skill } from '@/db/schema'
import { Skill } from '@/types/types'
import { eq } from 'drizzle-orm'

export async function getSkills(userId: string): Promise<Skill[]> {
  const skills = await db.select().from(skill).where(eq(skill.userId, userId))
  return skills
}

export async function getSkill(skillId: string): Promise<Skill> {
  const skills = await db.select().from(skill).where(eq(skill.id, skillId))
  return skills[0]
}

export async function insertSkill(name: string, userId: string) {
  await db.insert(skill).values({ name, userId })
}

export async function updateSkillName(newName: string, skillId: string) {
  await db.update(skill).set({ name: newName }).where(eq(skill.id, skillId))
}

export async function deleteSkill(skillId: string) {
  await db.delete(skill).where(eq(skill.id, skillId))
}
