import { useLocation } from 'react-router-dom'
import { QUERYSTRING } from '../../constants/querystring'
import { useQuery, useQueryClient } from '@tanstack/react-query'

import { NexonMembers } from '../../types/guild'
import { useRoomsStore } from '../../store/roomsStore'
import { guestGuilds } from '../../data/guest'
import { useAuthStore } from '../../store/authStore'
import {
  fetchGuildMembers,
  memberDescription,
  refreshGuildMember
} from '../../apis/guild/memberController'

export const useGuildMember = () => {
  const { search } = useLocation()
  const params = new URLSearchParams(search)
  const { guildList } = useRoomsStore()
  const { userType } = useAuthStore()

  const guildName = params.get(QUERYSTRING.GUILD)

  const queryClient = useQueryClient()

  //nexon 멤버 조회
  const { data: nexonMembers } = useQuery({
    queryKey: ['nexonMembers', guildList],
    queryFn: () =>
      Promise.all(guildList?.map(v => fetchGuildMembers(v.guildId ?? 0)) || []),
    staleTime: 1000 * 60 * 10,
    enabled: userType !== 'guest'
  })

  if (userType === 'guest') {
    return {
      nexonMembers: guestGuilds,
      selectMember: guestGuilds.find(v => v.guildName === guildName)
    }
  }
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

  const refreshMember = async (guildId: number) => {
    if (userType !== 'member') {
      alert('멤버만 사용할 수 있는 기능입니다.')
      return
    }
    if (guildId) {
      try {
        const res = await refreshGuildMember(guildId)
        alert(res.message)
        await queryClient.invalidateQueries({
          queryKey: ['nexonMembers', guildList]
        })
      } catch (error) {
        alert('본/부캐 정보 새로고침 중 오류가 발생했습니다.')
        throw error
      }
    }
  }

  const descriptionMember = async (
    characterName: string,
    description: string
  ) => {
    if (userType !== 'member') return
    if (description === '') return
    try {
      await memberDescription(characterName, description)
      await queryClient.invalidateQueries({
        queryKey: ['nexonMembers', guildList]
      })
    } catch (error) {
      alert('설명 수정 중 오류가 발생했습니다.')
      throw error
    }
  }

  return { nexonMembers, selectMember, refreshMember, descriptionMember }
}
