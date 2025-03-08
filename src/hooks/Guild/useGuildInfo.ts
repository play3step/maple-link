import { useEffect, useState } from 'react'
import { GuildInfo } from '../../types/guild'
import { fetchGuildMember } from '../../apis/Guild/guildController'

export const useGuildInfo = () => {
  const [guildInfo, setGuildInfo] = useState<GuildInfo>()
  useEffect(() => {
    fetchGuildMember(1).then(v => {
      setGuildInfo(v)
    })
  }, [])

  return { guildInfo }
}
