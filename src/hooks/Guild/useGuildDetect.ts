import { useQuery } from '@tanstack/react-query'
import { fetchDetectGuildMembers } from '../../apis/Guild/guildController'

export const useGuildDetect = (guildId?: number) => {
  const { data: detectMember } = useQuery({
    queryKey: ['detectMember', guildId],
    queryFn: () => {
      if (guildId !== undefined) {
        return fetchDetectGuildMembers(guildId)
      }
    }
  })
  return { detectMember }
}
