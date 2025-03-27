import { useLocation } from 'react-router-dom'
import { QUERYSTRING } from '../../constants/querystring'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchNexonGuildMembers,
  fetchRecordedGuildMembers
} from '../../apis/Guild/guildController'
import { Guild, MemberData } from '../../types/guild'

export const useGuildMember = () => {
  const queryClient = useQueryClient()
  const { search } = useLocation()
  const params = new URLSearchParams(search)

  const view = params.get(QUERYSTRING.VIEW) || '내기록'
  const guildName = params.get(QUERYSTRING.GUILD)

  const guildList = queryClient.getQueryData<Guild[]>(['guilds'])

  const isRecorded = view === '내기록'
  const isNexon = view === '길드정보'

  const { data: nexonMembers } = useQuery({
    queryKey: ['nexonMembers', 'nexon', params],
    queryFn: () =>
      Promise.all(
        guildList?.map(v => fetchNexonGuildMembers(Number(v.guildId))) || []
      ),
    staleTime: 60000,
    enabled: isNexon
  })

  const { data: recordedMembers } = useQuery({
    queryKey: ['recordedMembers', 'recorded', params],
    queryFn: () =>
      Promise.all(
        guildList?.map(v => fetchRecordedGuildMembers(Number(v.guildId))) || []
      ),
    staleTime: 60000,
    enabled: isRecorded
  })
  const selectMember: MemberData | undefined = isRecorded
    ? recordedMembers?.[0]
      ? { members: recordedMembers[0].addMembers }
      : undefined
    : nexonMembers?.find(v => v.guildName === guildName)
      ? {
          members:
            nexonMembers.find(v => v.guildName === guildName)
              ?.memberDetailResponse ?? [],
          masterName: nexonMembers.find(v => v.guildName === guildName)
            ?.guildMasterName
        }
      : undefined

  return { nexonMembers, recordedMembers, selectMember }
}
