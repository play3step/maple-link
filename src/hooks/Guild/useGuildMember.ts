import { useLocation, useSearchParams } from 'react-router-dom'
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

  const isRecorded = view === '내기록'
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

  //내 기록 멤버 조회
  const { data: recordedMembers } = useQuery({
    queryKey: ['recordedMembers', 'recorded', params],
    queryFn: () =>
      Promise.all(
        guildList?.map(v => fetchRecordedGuildMembers(Number(v.guildId))) || []
      ),
    staleTime: 1000 * 60 * 10,
    enabled: isRecorded
  })

  //선택된 멤버 조회
  const selectMember: MemberData | undefined = isRecorded
    ? recordedMembers?.find(v => v.guildName === guildName)
      ? {
          guildId: recordedMembers
            .find(v => v.guildName === guildName)
            ?.guildId?.toString(),
          members:
            recordedMembers.find(v => v.guildName === guildName)?.addMembers ??
            [],
          guildName:
            recordedMembers.find(v => v.guildName === guildName)?.guildName ??
            ''
        }
      : undefined
    : nexonMembers?.find(v => v.guildName === guildName)
      ? {
          guildId: nexonMembers
            .find(v => v.guildName === guildName)
            ?.guildId?.toString(),
          guildName:
            nexonMembers.find(v => v.guildName === guildName)?.guildName ?? '',
          members:
            nexonMembers.find(v => v.guildName === guildName)
              ?.memberDetailResponse ?? [],
          masterName: nexonMembers.find(v => v.guildName === guildName)
            ?.guildMasterName
        }
      : undefined

  return { nexonMembers, recordedMembers, selectMember, view, setView }
}
