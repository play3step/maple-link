export interface CalendarResponse {
  personalSchedules: Calendar[]
  groupSchedules: Calendar[]
}

export interface Calendar {
  id?: number
  title: string
  start: string
  description: string
  type: 'USER' | 'GROUP'
}
