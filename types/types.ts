export type LogFormData = {
  userId: string
  name: string
  hours: number
  minutes: number
  note: string
  date: Date
}

export type LogData = {
  id: string
  userId: string
  name: string
  minutes: number
  note: string
  date: Date
  createdAt: Date
}
