import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createGroupCalendar,
  createPersonalCalendar,
  deleteCalendar,
  getCalendar
} from '../../apis/calendar/calendarController'
import { Calendar, CalendarResponse } from '../../types/calendar'
import { useAuthStore } from '../../store/authStore'

export const useUserNotice = () => {
  const { userType } = useAuthStore()

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery<CalendarResponse>({
    queryKey: ['calendar'],
    queryFn: getCalendar
  })

  const createPersonalCalendarMutation = useMutation({
    mutationFn: (calendar: Calendar) => createPersonalCalendar(calendar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] })
    }
  })

  const createGroupCalendarMutation = useMutation({
    mutationFn: ({
      memberNicknames,
      scheduleId
    }: {
      memberNicknames: string[]
      scheduleId: number
    }) => createGroupCalendar(memberNicknames, scheduleId)
  })

  const deleteCalendarMutation = useMutation({
    mutationFn: (scheduleId: number) => deleteCalendar(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] })
    }
  })

  const createCalendar = (calendar: Calendar) => {
    if (userType !== 'member') {
      alert('게스트는 일정을 생성할 수 없습니다.')
      return
    }
    try {
      createPersonalCalendarMutation.mutate(calendar)
    } catch (error) {
      console.error(error)
    }
  }
  const inviteGroupCalendar = (
    memberNicknames: string[],
    scheduleId: number
  ) => {
    if (userType !== 'member') {
      alert('게스트는 일정을 초대할 수 없습니다.')
      return
    }
    try {
      createGroupCalendarMutation.mutate({ memberNicknames, scheduleId })
    } catch (error) {
      console.error(error)
    }
  }

  const deleteCalendarHandler = (scheduleId: number) => {
    if (userType !== 'member') {
      alert('게스트는 일정을 삭제할 수 없습니다.')
      return
    }
    try {
      deleteCalendarMutation.mutate(scheduleId)
    } catch (error) {
      console.error(error)
    }
  }

  return {
    data: [...(data?.personalSchedules ?? []), ...(data?.groupSchedules ?? [])],
    isLoading,
    createCalendar,
    inviteGroupCalendar,
    deleteCalendarHandler
  }
}
