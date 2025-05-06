import { useLocation } from 'react-router-dom'
import { QUERYSTRING } from '../../constants/querystring'
import { useQuery } from '@tanstack/react-query'
import { fetchNexonGuildMembers } from '../../apis/Guild/guildController'
import { NexonMembers } from '../../types/guild'
import { useRoomsStore } from '../../store/roomsStore'
export const useGuildMember = () => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const { guildList } = useRoomsStore()

  const guildName = params.get(QUERYSTRING.GUILD)

  //nexon 멤버 조회
  const { data: nexonMembers } = useQuery({
    queryKey: ['nexonMembers', guildList],
    queryFn: () =>
      Promise.all(
        guildList?.map(v => fetchNexonGuildMembers(v.guildId ?? 0)) || []
      ),
    staleTime: 1000 * 60 * 10
  })

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
