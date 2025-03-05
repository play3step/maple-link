import { nexonApi } from '..'
import { Guild } from '../../types/guild'

export const searchGuild = async (params: Guild) => {
  const { data: oguild_id } = await nexonApi.get<{ oguild_id: string }>(
    '/maplestory/v1/guild/id',
    {
      params: {
        guild_name: params.guildName,
        world_name: params.worldName
      }
    }
  )
  const { data: guildInfo } = await nexonApi.get<GuildInfo>(
    '/maplestory/v1/guild/basic',
    {
      params: { oguild_id: oguild_id.oguild_id }
    }
  )
  return guildInfo
}
