import {
  searchGuildMemberWithoutLogin,
  searchGuildWithoutLogin
} from '../../apis/guild/guildController'
import { useState } from 'react'

import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'
import { SearchGuildResponse } from '../../types/guild'

export const useSearchGuild = () => {
  const [guildList, setGuildList] = useState<string[]>([])
  const [selectedServer, setSelectedServer] = useState('')
  const [guildName, setGuildName] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()
  const [isUpdating, setIsUpdating] = useState(false)

  const params = new URLSearchParams(searchParams)

  const serachGuildList = params.get('guildList')?.split(',') || []
  const serachServer = params.get('server') || ''
  const selectedGuild = params.get('guild') || ''

  const queryClient = useQueryClient()

  const {
    data: guildsInfo,
    isLoading,
    isError
  } = useQuery({
    queryKey: ['guildsInfo', serachGuildList, serachServer],
    queryFn: () => searchGuildWithoutLogin(serachGuildList, serachServer),
    retry: false,
    staleTime: 1000 * 60 * 10
  })

  const mainCharacterInfoSearchMutation = useMutation({
    mutationFn: (members: string[]) => searchGuildMemberWithoutLogin(members)
  })

  const mainCharacterInfoSearchHandler = async () => {
    if (!guildsInfo) return
    setIsUpdating(true)

    try {
      const allMemberNames = guildsInfo
        .map(guild => guild.guildMember.map(member => member.name))
        .flat()

      const response =
        await mainCharacterInfoSearchMutation.mutateAsync(allMemberNames)

      queryClient.setQueryData(
        ['guildsInfo', serachGuildList, serachServer],
        (oldData: SearchGuildResponse[]) => {
          if (!oldData) return oldData

          return oldData.map(guild => ({
            ...guild,
            guildMember: guild.guildMember.map(member => {
              const match = response.find(res => res.memberName === member.name)
              const matchedMember = match?.mainCharacterInfo

              return {
                ...member,
                type: match?.type ?? member.type,
                mainCharacterInfo: matchedMember ?? member.mainCharacterInfo
              }
            })
          }))
        }
      )
    } catch (error) {
      console.error('메인 캐릭터 정보 조회 중 오류 발생:', error)
      alert('메인 캐릭터 정보 조회 중 오류가 발생했습니다.')
    } finally {
      setIsUpdating(false)
    }
  }

  const addGuildList = (guildName: string) => {
    if (!selectedServer) {
      alert('서버를 선택해주세요.')
      return
    }
    if (guildList.includes(guildName)) {
      alert('이미 추가된 길드입니다.')
      return
    }
    if (guildName.trim() === '') {
      alert('길드 이름을 입력해주세요.')
      return
    }
    if (guildList.length >= 4) {
      alert('최대 4개의 길드를 검색할 수 있습니다.')
      return
    }
    setGuildList(prev => [...prev, guildName])
    setGuildName('')
  }

  const removeGuildList = (guildToRemove: string) => {
    setGuildList(prev => prev.filter(guild => guild !== guildToRemove))
  }

  const handleGuildKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      addGuildList(guildName)
    }
  }
  const searchGuildHandler = async () => {
    if (guildList.length === 0) {
      alert('검색할 길드를 추가해주세요.')
      return
    }

    if (!selectedServer) {
      alert('서버를 선택해주세요.')
      return
    }

    const newSearchParams = new URLSearchParams(searchParams)
    newSearchParams.set('guildList', guildList.join(','))
    newSearchParams.set('server', selectedServer)
    setSearchParams(newSearchParams)
  }

  const selectedGuildMember = guildsInfo?.find(
    guild => guild.guildName === selectedGuild
  )

  const resetSearchParams = () => {
    setSearchParams(new URLSearchParams())
  }

  if (isError) {
    alert('길드 정보가 존재하지 않습니다.')
    resetSearchParams()
  }

  return {
    searchGuildHandler,
    guildList,
    setGuildList,
    selectedServer,
    setSelectedServer,
    guildName,
    setGuildName,
    guildsInfo,
    isLoading,
    isUpdating,
    addGuildList,
    removeGuildList,
    handleGuildKeyPress,
    selectedGuildMember,
    mainCharacterInfoSearchHandler,
    resetSearchParams
  }
}
