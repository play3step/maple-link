import { useQuery } from '@tanstack/react-query'
import { fetchNoticeEvent } from '../../apis/calendar/nexonNotice'
import { CalendarType, NoticeEvent } from '../../types/notice'

import { formatDateYMD } from '../../utils/format'
import { useMemo } from 'react'

export const useNexonNotice = () => {
  const { data: noticeEvent, isLoading: noticeEventLoading } =
    useQuery<NoticeEvent>({
      queryKey: ['noticeEvent'],
      queryFn: fetchNoticeEvent,
      staleTime: 5 * 60 * 1000
    })

  const events = useMemo<CalendarType[]>(() => {
    return (
      noticeEvent?.event_notice.flatMap(v => [
        {
          title: `[시작] ${v.title}`,
          start: formatDateYMD(v.date_event_start),
          color: '#4caf50',
          nexonUrl: v.url,
          type: 'nexon'
        },
        {
          title: `[종료] ${v.title}`,
          start: formatDateYMD(v.date_event_end),
          color: '#ff6f61',
          nexonUrl: v.url,
          type: 'nexon'
        }
      ]) ?? []
    )
  }, [noticeEvent])

  return { events, noticeEventLoading }
}
