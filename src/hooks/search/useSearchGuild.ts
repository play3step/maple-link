import { searchGuildWithoutLogin } from '../../apis/guild/guildController'
import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

export const useSearchGuild = () => {
  const [guildList, setGuildList] = useState<string[]>([])
  const [selectedServer, setSelectedServer] = useState('')
  const [guildName, setGuildName] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const params = new URLSearchParams(searchParams)

  const serachGuildList = params.get('guildList')?.split(',') || []
  const serachServer = params.get('server') || ''
  const selectedGuild = params.get('guild') || ''

  const { data: guildsInfo, isLoading } = useQuery({
    queryKey: ['guildsInfo', serachGuildList, serachServer],
    queryFn: () => searchGuildWithoutLogin(serachGuildList, serachServer)
  })

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
    addGuildList,
    removeGuildList,
    handleGuildKeyPress,
    selectedGuildMember
  }
}
