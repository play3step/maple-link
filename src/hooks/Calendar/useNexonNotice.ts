import { useQuery } from '@tanstack/react-query'
import { fetchNoticeEvent } from '../../apis/Calendar/nexonNotice'
import { NoticeEvent } from '../../types/notice'

import { formatDateYMD } from '../../utils/format'
import { useMemo } from 'react'

export const useNexonNotice = () => {
  const { data: noticeEvent, isLoading: noticeEventLoading } =
    useQuery<NoticeEvent>({
      queryKey: ['noticeEvent'],
      queryFn: fetchNoticeEvent,
      staleTime: 5 * 60 * 1000
    })

  const events = useMemo(() => {
    return (
      noticeEvent?.event_notice.flatMap(v => [
        {
          title: `[시작] ${v.title}`,
          start: formatDateYMD(v.date_event_start),
          color: '#ff6f61'
        },
        {
          title: `[종료] ${v.title}`,
          start: formatDateYMD(v.date_event_end),
          color: '#4caf50'
        }
      ]) ?? []
    )
  }, [noticeEvent])

  return { events, noticeEventLoading }
}
