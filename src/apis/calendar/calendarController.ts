import { basicApi } from '..'
import { Calendar, CalendarResponse } from '../../types/calendar'

export const getCalendar = async (): Promise<CalendarResponse> => {
  const response = await basicApi.get('/api/calendar')
  return response.data
}

export const createPersonalCalendar = async (calendar: Calendar) => {
  const response = await basicApi.post('/api/calendar/personal', calendar)
  return response.data
}

export const createGroupCalendar = async (
  memberNicknames: string[],
  scheduleId: number
) => {
  const response = await basicApi.post('/api/calendar/group', {
    memberNicknames,
    scheduleId
  })
  return response.data
}

export const deleteCalendar = async (scheduleId: number) => {
  const response = await basicApi.delete(`/api/calendar/${scheduleId}`)
  return response.data
}
