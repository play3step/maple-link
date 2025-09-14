import { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import {
  searchGuildWithoutLogin,
  searchGuildMemberWithoutLogin
} from '../../apis/guild/guildController'
import { SearchGuildResponse } from '../../types/guild'

interface UseGuildSearchApiProps {
  guildList: string[]
  server: string
  enabled?: boolean
}

export const useGuildSearchQuery = ({
  guildList,
  server,
  enabled = true
}: UseGuildSearchApiProps) => {
  const queryClient = useQueryClient()
  const [isUpdatingMembers, setIsUpdatingMembers] = useState(false)

  // 길드 정보 조회
  const guildsQuery = useQuery({
    queryKey: ['guildsInfo', guildList, server],
    queryFn: () => searchGuildWithoutLogin(guildList, server),
    enabled: enabled && guildList.length > 0 && !!server,
    retry: false,
    staleTime: 1000 * 60 * 10,
    refetchOnWindowFocus: false
  })

  // 멤버 정보 검색
  const memberSearchMutation = useMutation({
    mutationFn: (members: string[]) => searchGuildMemberWithoutLogin(members),
    onSuccess: response => {
      queryClient.setQueryData(
        ['guildsInfo', guildList, server],
        (oldData: SearchGuildResponse[]) => {
          if (!oldData) return oldData
          return oldData.map(guild => ({
            ...guild,
            guildMember: guild.guildMember.map(member => {
              const match = response.find(res => res.memberName === member.name)
              return {
                ...member,
                type: match?.type ?? member.type,
                mainCharacterInfo:
                  match?.mainCharacterInfo ?? member.mainCharacterInfo
              }
            })
          }))
        }
      )
    }
  })

  // 멤버 정보 검색
  const searchMemberInfo = async () => {
    if (!guildsQuery.data) {
      throw new Error('길드 정보가 없습니다.')
    }

    setIsUpdatingMembers(true)
    try {
      const allMemberNames = guildsQuery.data.flatMap(guild =>
        guild.guildMember.map(member => member.name)
      )

      await memberSearchMutation.mutateAsync(allMemberNames)
    } catch (error) {
      console.error('메인 캐릭터 정보 조회 실패:', error)
      throw error
    } finally {
      setIsUpdatingMembers(false)
    }
  }

  return {
    guildsInfo: guildsQuery.data,

    isLoading: guildsQuery.isLoading,
    isError: guildsQuery.isError,
    isUpdatingMembers,

    searchMemberInfo,
    refetch: guildsQuery.refetch
  }
}
