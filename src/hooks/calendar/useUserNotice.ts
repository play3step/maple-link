import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  createGroupCalendar,
  createPersonalCalendar,
  deleteCalendar,
  getCalendar,
  updateCalendar
} from '../../apis/calendar/calendarController'
import { Calendar, CalendarResponse } from '../../types/calendar'
import { useAuthStore } from '../../store/authStore'
import { guestCalendar } from '../../data/guest'
import axios from 'axios'
import { ErrorResponse } from '../../types'

export const useUserNotice = () => {
  const { userType } = useAuthStore()

  const queryClient = useQueryClient()

  const { data, isLoading } = useQuery<CalendarResponse>({
    queryKey: ['calendar'],
    queryFn: getCalendar,
    enabled: userType === 'member'
  })

  const createPersonalCalendarMutation = useMutation({
    mutationFn: (calendar: Calendar) => createPersonalCalendar(calendar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] })
    },
    onError: error => {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse
        alert(errorData.data.message)
        return
      }
      alert('일정 생성 중 오류가 발생했습니다.')
    }
  })

  const createGroupCalendarMutation = useMutation({
    mutationFn: ({
      memberNicknames,
      scheduleId
    }: {
      memberNicknames: string[]
      scheduleId: number
    }) => createGroupCalendar(memberNicknames, scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] })
    },
    onError: error => {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse
        alert(errorData.data.message)
        return
      }
      alert('일정 초대 중 오류가 발생했습니다.')
    }
  })

  const deleteCalendarMutation = useMutation({
    mutationFn: (scheduleId: number) => deleteCalendar(scheduleId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] })
    },
    onError: error => {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse
        alert(errorData.data.message)
        return
      }
      alert('일정 삭제 중 오류가 발생했습니다.')
    }
  })

  const updateCalendarMutation = useMutation({
    mutationFn: (calendar: Calendar) => updateCalendar(calendar),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['calendar'] })
    },
    onError: error => {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse
        alert(errorData.data.message)
        return
      }
      alert('일정 수정 중 오류가 발생했습니다.')
    }
  })

  const createCalendar = (calendar: Calendar) => {
    if (userType !== 'member') {
      alert('게스트는 일정을 생성할 수 없습니다.')
      return
    }
    createPersonalCalendarMutation.mutate(calendar)
  }

  const inviteGroupCalendar = (
    memberNicknames: string[],
    scheduleId: number
  ) => {
    if (userType !== 'member') {
      alert('게스트는 일정을 초대할 수 없습니다.')
      return
    }
    createGroupCalendarMutation.mutate({ memberNicknames, scheduleId })
  }

  const deleteCalendarHandler = (scheduleId: number) => {
    if (userType !== 'member') {
      alert('게스트는 일정을 삭제할 수 없습니다.')
      return
    }
    if (confirm('정말 삭제하시겠습니까?')) {
      deleteCalendarMutation.mutate(scheduleId)
    }
  }

  const updateCalendarHandler = (calendar: Calendar) => {
    if (userType !== 'member') {
      alert('사용할수 없는 기능입니다.')
      return
    }
    if (confirm('정말 수정하시겠습니까?')) {
      updateCalendarMutation.mutate(calendar)
    }
  }

  if (userType === 'guest') {
    return {
      data: guestCalendar,
      isLoading: false,
      createCalendar: () => {},
      inviteGroupCalendar: () => {},
      deleteCalendarHandler: () => {},
      updateCalendarHandler: () => {}
    }
  }

  return {
    data: [...(data?.personalSchedules ?? []), ...(data?.groupSchedules ?? [])],
    isLoading,
    createCalendar,
    inviteGroupCalendar,
    deleteCalendarHandler,
    updateCalendarHandler
  }
}
