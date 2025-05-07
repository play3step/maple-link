import { useState } from 'react'
import { SearchGuild } from '../../types/guild'
import { searchGuild as searchGuildApi } from '../../apis/Nexon/nexonController'
import { addGuildList } from '../../apis/Guild/guildController'
import { worldNames } from '../../data/worlds'

export const useSearchGuilds = () => {
  const [list, setList] = useState<SearchGuild[]>([])

  // 길드 검색
  const searchGuilds = async (guildName: string) => {
    try {
      const results = await Promise.all(
        worldNames.map(world =>
          searchGuildApi({ worldName: world.name, guildName })
        )
      )
      const validResults = results.filter(
        (res): res is SearchGuild => res !== null
      )
      setList(validResults)
    } catch (error) {
      console.error('길드 검색 에러:', error)
    }
  }

  // 길드 생성
  const createGuild = async (worldName: string, guildName: string) => {
    if (!worldName || !guildName) return
    const response = await addGuildList({
      world_name: worldName,
      guild_name: guildName
    })
    return response
  }

  return { list, searchGuilds, createGuild }
}
