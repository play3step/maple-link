import { useQuery } from '@tanstack/react-query'
import { fetchDetectGuildMembers } from '../../apis/Guild/guildController'

export const useGuildDetect = () => {
  const { data: detectMember } = useQuery({
    queryKey: ['detectMember'],
    queryFn: () => fetchDetectGuildMembers(1)
  })
  return { detectMember }
}
