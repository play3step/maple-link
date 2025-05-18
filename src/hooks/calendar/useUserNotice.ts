import { useState } from 'react'
import { CalendarType } from '../../types/notice'

export const useUserNotice = () => {
  const [data, setData] = useState<CalendarType[]>([
    {
      title: '22시 검은마법사',
      start: '2025-04-16',
      color: '#90CAF9',
      type: 'user'
    },
    {
      title: '22시 검은마법사',
      start: '2025-04-17',
      color: '#90CAF9',
      type: 'user'
    }
  ])

  const createUserNotice = ({ title, start, color, type }: CalendarType) => {
    setData(prev => [
      ...prev,
      {
        title,
        start,
        color,
        type
      }
    ])
  }

  return { data, createUserNotice }
}
