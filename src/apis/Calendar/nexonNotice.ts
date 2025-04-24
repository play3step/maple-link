import { nexonApi } from '..'
import { NoticeEvent } from '../../types/notice'

export const fetchNoticeEvent = async () => {
  const response = await nexonApi.get<NoticeEvent>(
    '/maplestory/v1/notice-event',
    {
      params: {
        ocid: import.meta.env.VITE_ocid
      }
    }
  )
  return response.data
}
