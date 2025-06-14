import { useQuery } from '@tanstack/react-query'
import { searchGuildWithoutLogin } from '../../apis/guild/guildController'

export const useSearchGuild = () => {
  const { data: guilds, isLoading } = useQuery({
    queryKey: ['guilds'],
    queryFn: () => searchGuildWithoutLogin(['리더'], '스카니아')
  })

  return { guilds, isLoading }
}
