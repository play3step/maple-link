import { useQuery } from '@tanstack/react-query'
import { fetchDetectGuildMembers } from '../../apis/Guild/guildController'
import {
  addGuildMember,
  deleteGuildMember
} from '../../apis/Guild/guildController'
export const useGuildDetect = (guildId?: number) => {
  const { data: detectMember } = useQuery({
    queryKey: ['detectMember', guildId],
    queryFn: () => {
      if (guildId !== undefined) {
        return fetchDetectGuildMembers(guildId)
      }
    }
  })

  const reflectDetectMember = () => {
    if (detectMember?.toAdd && guildId !== undefined) {
      detectMember.toAdd.forEach(member => {
        addGuildMember(member, guildId)
      })
    }
    if (detectMember?.toRemove && guildId !== undefined) {
      detectMember.toRemove.forEach(member => {
        deleteGuildMember(member, guildId)
      })
    }
  }

  return { detectMember, reflectDetectMember }
}
