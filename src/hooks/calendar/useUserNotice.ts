import { useQuery } from '@tanstack/react-query'
import { getCalendar } from '../../apis/calendar/calendarController'
import { CalendarResponse } from '../../types/calendar'

export const useUserNotice = () => {
  const { data, isLoading } = useQuery<CalendarResponse>({
    queryKey: ['calendar'],
    queryFn: getCalendar
  })

  return {
    data: [...(data?.personalSchedules ?? []), ...(data?.groupSchedules ?? [])],
    isLoading
  }
}
