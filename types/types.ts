export type LogFormData = {
  userId: string
  skillId: string
  hours: number
  minutes: number
  note: string
  date: Date
}

export type LogData = {
  id: string
  userId: string
  skillId: string
  skillName: string
  minutes: number
  note: string
  date: Date
  createdAt: Date
}

export type Skill = {
  id: string
  name: string
  userId: string
}
