import { searchGuildWithoutLogin } from '../../apis/guild/guildController'
import { useState } from 'react'

import { useQuery } from '@tanstack/react-query'
import { useSearchParams } from 'react-router-dom'

export const useSearchGuild = () => {
  const [guildList, setGuildList] = useState<string[]>([])
  const [selectedServer, setSelectedServer] = useState('')

  const [searchParams, setSearchParams] = useSearchParams()

  const { data: guilds, isLoading } = useQuery({
    queryKey: ['guilds'],
    queryFn: () => searchGuildWithoutLogin(guildList, selectedServer)
  })

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

  return {
    searchGuildHandler,
    guildList,
    setGuildList,
    selectedServer,
    setSelectedServer,

    guilds,
    isLoading
  }
}
