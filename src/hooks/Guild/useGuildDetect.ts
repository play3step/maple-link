import { fetchDetectGuildMembers } from '../../apis/Guild/guildController'
import {
  addGuildMember,
  deleteGuildMember
} from '../../apis/Guild/guildController'
import { DetectResult, Guild } from '../../types/guild'
import { useState } from 'react'

export const useGuildDetect = (guildList: Guild[]) => {
  const [detectMembers, setDetectMembers] = useState<DetectResult[]>([])

  const handleDetect = async () => {
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

  const reflectDetectMember = async (targetGuildId: number) => {
    const guildDetect = detectMembers?.find(
      guild => guild.guildId === targetGuildId
    )
    if (!guildDetect) return

    const promises: Promise<void>[] = []

    if (guildDetect.toAdd) {
      promises.push(
        ...guildDetect.toAdd.map(member =>
          addGuildMember(member, guildDetect.guildId)
        )
      )
    }

    if (guildDetect.toRemove) {
      promises.push(
        ...guildDetect.toRemove.map(member =>
          deleteGuildMember(member, guildDetect.guildId)
        )
      )
    }

    await Promise.all(promises)
  }

  return { detectMembers, reflectDetectMember, handleDetect }
}
