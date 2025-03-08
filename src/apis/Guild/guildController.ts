import { basicApi } from '..'
import { SearchGuild } from '../../types/guild'

export const addGuildList = async (params: SearchGuild) => {
  const response = await basicApi.post('/api/guilds', null, {
    params: {
      guild_name: params.guild_name,
      world_name: params.world_name
    }
  })
  return response.data.message
}

export const fetchGuildMember = async (guildId: number) => {
  const response = await basicApi.get(`/api/guilds/${guildId}/members`)
  return response.data
}
