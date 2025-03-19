import { useLocation } from 'react-router-dom'
import { QUERYSTRING } from '../../constants/querystring'
import { useQuery } from '@tanstack/react-query'
import {
  fetchNexonGuildMembers,
  fetchRecordedGuildMembers
} from '../../apis/Guild/guildController'

export const useGuildMember = () => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const view = params.get(QUERYSTRING.VIEW) || '내기록'

  const isRecorded = view === '내기록'
  const isNexon = view === '길드정보'

  const { data: nexonMembers } = useQuery({
    queryKey: ['guildMembers', 'nexon', view],
    queryFn: () => fetchNexonGuildMembers(1),
    staleTime: 60000,
    enabled: isNexon
  })

  const { data: recordedMembers } = useQuery({
    queryKey: ['guildMembers', 'recorded', view],
    queryFn: () => fetchRecordedGuildMembers(1),
    staleTime: 60000,
    enabled: isRecorded
  })

  return { nexonMembers, recordedMembers }
}
