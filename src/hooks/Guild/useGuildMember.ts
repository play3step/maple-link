import { useLocation, useSearchParams } from 'react-router-dom'
import { QUERYSTRING } from '../../constants/querystring'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import { fetchNexonGuildMembers } from '../../apis/Guild/guildController'
import { Guild, NexonMembers } from '../../types/guild'

export const useGuildMember = () => {
  const queryClient = useQueryClient()
  const { search } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()
  const params = new URLSearchParams(search)

  const view = params.get(QUERYSTRING.VIEW) || '내기록'
  const guildName = params.get(QUERYSTRING.GUILD)

  const setView = (newView: string) => {
    const newParams = new URLSearchParams(searchParams)
    newParams.set(QUERYSTRING.VIEW, newView)
    setSearchParams(newParams)
  }

  const guildList = queryClient.getQueryData<Guild[]>(['guilds'])

  const isNexon = view === '길드정보'

  //nexon 멤버 조회
  const { data: nexonMembers } = useQuery({
    queryKey: ['nexonMembers', 'nexon', params],
    queryFn: () =>
      Promise.all(
        guildList?.map(v => fetchNexonGuildMembers(Number(v.guildId))) || []
      ),
    staleTime: 1000 * 60 * 10,
    enabled: isNexon
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
  const selectMember: NexonMembers | undefined = isNexon
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

  return { nexonMembers, selectMember, view, setView }
}
