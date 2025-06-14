import { basicApi, nexonApi, publicApi } from '..'
import { Guild, SearchGuild, SearchGuildResponse } from '../../types/guild'

//길드 목록 조회
export const fetchGuildList = async () => {
  const response = await basicApi.get('/api/guilds')
  return response.data
}

//길드 목록 추가
export const addGuildList = async (params: SearchGuild) => {
  const response = await basicApi.post('/api/guilds', null, {
    params: {
      guild_name: params.guild_name,
      world_name: params.world_name
    }
  })
  return response.data
}

//길드 목록 삭제
export const deleteGuildList = async (guildId: number) => {
  const response = await basicApi.delete(`/api/guilds/${guildId}`)
  return response.data
}

//길드 유무 조회
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

  if (!oguild_id || !oguild_id.oguild_id) {
    return null
  }

  const { data: guildInfo } = await nexonApi.get<SearchGuild>(
    '/maplestory/v1/guild/basic',
    {
      params: { oguild_id: oguild_id.oguild_id }
    }
  )
  return guildInfo
}

//로그인 없이 길드 조회
export const searchGuildWithoutLogin = async (
  guildNames: string[],
  worldName: string
) => {
  const response = await publicApi.post<SearchGuildResponse>(
    'api/v1/public/guilds',
    {
      guildNames,
      worldName
    }
  )
  return response.data
}
