import { useLocation } from 'react-router-dom'
import { QUERYSTRING } from '../../constants/querystring'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import {
  fetchNexonGuildMembers,
  fetchRecordedGuildMembers
} from '../../apis/Guild/guildController'
import { Guild } from '../../types/guild'

export const useGuildMember = () => {
  const queryClient = useQueryClient()
  const { search } = useLocation()
  const params = new URLSearchParams(search)

  const view = params.get(QUERYSTRING.VIEW) || '내기록'
  const guildName = params.get(QUERYSTRING.GUILD)

  const guildList = queryClient.getQueryData<Guild[]>(['guilds'])
  const selectedGuild = guildList?.find(guild => guild.guildName === guildName)

  const isRecorded = view === '내기록'
  const isNexon = view === '길드정보'
  const guildId = selectedGuild ? Number(selectedGuild.guildId) : 0

  const { data: nexonMembers } = useQuery({
    queryKey: ['guildMembers', 'nexon', view, guildName],
    queryFn: () => fetchNexonGuildMembers(guildId),
    staleTime: 60000,
    enabled: isNexon
  })

  const { data: recordedMembers } = useQuery({
    queryKey: ['guildMembers', 'recorded', view, guildName],
    queryFn: () => fetchRecordedGuildMembers(guildId),
    staleTime: 60000,
    enabled: isRecorded
  })

  return { nexonMembers, recordedMembers }
}
