import { useLocation } from 'react-router-dom'
import { QUERYSTRING } from '../../constants/querystring'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchNexonGuildMembers } from '../../apis/Guild/guildController'
import { Guild, NexonMembers } from '../../types/guild'

export const useGuildMember = () => {
  const queryClient = useQueryClient()
  const { search } = useLocation()
  const params = new URLSearchParams(search)

  const guildName = params.get(QUERYSTRING.GUILD)

  const guildList = queryClient.getQueryData<Guild[]>(['guilds'])

  //nexon 멤버 조회
  const { data: nexonMembers } = useQuery({
    queryKey: ['nexonMembers'],
    queryFn: () =>
      Promise.all(
        guildList?.map(v => fetchNexonGuildMembers(Number(v.guildId))) || []
      ),
    staleTime: 1000 * 60 * 10
  })

  // //내 기록 멤버 조회
  // const { data: recordedMembers } = useQuery({
  //   queryKey: ['recordedMembers', 'recorded', params],
  //   queryFn: () =>
  //     Promise.all(
  //       guildList?.map(v => fetchRecordedGuildMembers(Number(v.guildId))) || []
  //     ),
  //   staleTime: 1000 * 60 * 10,
  //   enabled: isRecorded
  // })

  // 선택된 길드
  const selectMember: NexonMembers | undefined = nexonMembers
    ? nexonMembers?.find(v => v.guildName === guildName)
      ? {
          guildId:
            nexonMembers.find(v => v.guildName === guildName)?.guildId ?? 0,
          guildName:
            nexonMembers.find(v => v.guildName === guildName)?.guildName ?? '',
          memberDetailResponse:
            nexonMembers.find(v => v.guildName === guildName)
              ?.memberDetailResponse ?? [],
          guildMasterName: nexonMembers.find(v => v.guildName === guildName)
            ?.guildMasterName
        }
      : undefined
    : undefined

  return { nexonMembers, selectMember }
}
