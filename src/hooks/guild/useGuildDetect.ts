import { DetectResult, Guild } from '../../types/guild'
import { useState } from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '../../store/authStore'
import { guestDetect } from '../../data/guest'
import {
  addGuildMember,
  deleteGuildMember,
  fetchDetectGuildMembers
} from '../../apis/guild/memberController'

type MutationParams = {
  member: string
  guildId: number
}

export const useGuildDetect = (guildList: Guild[]) => {
  const { userType } = useAuthStore()
  const [detectMembers, setDetectMembers] = useState<DetectResult[]>([])
  const queryClient = useQueryClient()

  const handleDetect = async () => {
    if (userType === 'guest') {
      setDetectMembers(guestDetect)
      return
    }

    const guildIds = guildList
      .filter(guild => guild.guildId && guild.guildName)
      .map(guild => ({
        id: guild.guildId!,
        name: guild.guildName!
      }))

    const results = await Promise.all(
      guildIds.map(async ({ id, name }) => {
        const detect = await fetchDetectGuildMembers(id)
        return {
          guildId: id,
          guildName: name,
          toAdd: detect?.toAdd ?? [],
          toRemove: detect?.toRemove ?? []
        }
      })
    )

    setDetectMembers(results)
  }

  const addMutation = useMutation<void, Error, MutationParams>({
    mutationFn: ({ member, guildId }) => addGuildMember(member, guildId)
  })

  const removeMutation = useMutation<void, Error, MutationParams>({
    mutationFn: ({ member, guildId }) => deleteGuildMember(member, guildId)
  })

  const reflectDetectMember = async (targetGuildId: number) => {
    const guildDetect = detectMembers.find(
      guild => guild.guildId === targetGuildId
    )
    if (!guildDetect) return

    if (userType === 'guest') return

    const addPromises = guildDetect.toAdd.map(member =>
      addMutation.mutateAsync({ member, guildId: guildDetect.guildId })
    )

    const removePromises = guildDetect.toRemove.map(member =>
      removeMutation.mutateAsync({ member, guildId: guildDetect.guildId })
    )

    await Promise.all([...addPromises, ...removePromises])

    // 멤버 데이터 최신화
    queryClient.invalidateQueries({ queryKey: ['nexonMembers'] })
  }

  return { detectMembers, reflectDetectMember, handleDetect }
}
