import { useState } from 'react'
import { Guild } from '../types/guild'

export const useGuilds = () => {
  const [existenceGuild, setExistenceGuild] = useState<Guild[]>([])

  const searchGuild = () => {}

  return { existenceGuild, searchGuild }
}
