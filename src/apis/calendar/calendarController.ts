import { basicApi } from '..'
import { CalendarResponse } from '../../types/calendar'

export const getCalendar = async (): Promise<CalendarResponse> => {
  const response = await basicApi.get('/api/calendar')
  return response.data
}
