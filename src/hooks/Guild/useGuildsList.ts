import { useQuery } from '@tanstack/react-query'
import { Guild } from '../../types/guild'
import { fetchGuildList } from '../../apis/Guild/guildController'

export const useGuildsList = () => {
  const { data: guildList } = useQuery<Guild[]>({
    queryKey: ['guilds'],
    queryFn: fetchGuildList
  })
  return { guildList }
}
