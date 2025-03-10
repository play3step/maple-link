import { useEffect, useState } from 'react'
import { Guild } from '../../types/guild'
import { fetchGuildList } from '../../apis/Guild/guildController'

export const useGuildsList = () => {
  const [guildList, setGuildList] = useState<Guild[]>([])

  useEffect(() => {
    fetchGuildList().then(v => setGuildList(v))
  }, [])

  return { guildList }
}
