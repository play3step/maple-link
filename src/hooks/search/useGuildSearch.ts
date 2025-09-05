import { useCallback, useEffect, useState } from 'react'

import { useNavigate, useSearchParams } from 'react-router-dom'
import { useGuildSearchQuery } from './useGuildSearchQuery'

export const useGuildSearch = () => {
  const [guildList, setGuildList] = useState<string[]>([])
  const [selectedServer, setSelectedServer] = useState('')
  const [guildName, setGuildName] = useState('')
  const [searchParams, setSearchParams] = useSearchParams()

  const navigate = useNavigate()
  const params = new URLSearchParams(searchParams)

  const serachGuildList = params.get('guildList')?.split(',') || []
  const serachServer = params.get('server') || ''
  const selectedGuild = params.get('guild') || ''

  const isQueryEnabled = serachGuildList.length > 0 && !!serachServer

  const {
    guildsInfo,
    isLoading,
    isError,
    searchMemberInfo,
    isUpdatingMembers
  } = useGuildSearchQuery({
    guildList: serachGuildList,
    server: serachServer,
    enabled: isQueryEnabled
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

  const resetSearchParams = useCallback(() => {
    setSearchParams(new URLSearchParams())
    navigate('/')
  }, [setSearchParams])

  useEffect(() => {
    if (isError && isQueryEnabled) {
      alert('길드 정보가 존재하지 않습니다.')
      resetSearchParams()
    }
  }, [isError, isQueryEnabled, resetSearchParams])

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
    searchMemberInfo,
    isUpdatingMembers,
    addGuildList,
    removeGuildList,
    handleGuildKeyPress,
    selectedGuildMember,

    resetSearchParams
  }
}
