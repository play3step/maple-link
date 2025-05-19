import { basicApi } from '..'
import { Detect, NexonMembers, SearchGuild } from '../../types/guild'

export const fetchGuildList = async () => {
  const response = await basicApi.get('/api/guilds')
  return response.data
}

export const addGuildList = async (params: SearchGuild) => {
  const response = await basicApi.post('/api/guilds', null, {
    params: {
      guild_name: params.guild_name,
      world_name: params.world_name
    }
  })
  return response.data
}

export const deleteGuildList = async (guildId: number) => {
  const response = await basicApi.delete(`/api/guilds/${guildId}`)
  return response.data
}

//멤버 조회
export const fetchNexonGuildMembers = async (guildId: number) => {
  const response = await basicApi.get<NexonMembers>(
    `/api/guilds/${guildId}/members`
  )

  return response.data
}

//멤버 비교
export const fetchDetectGuildMembers = async (guildId: number) => {
  const response = await basicApi.get<Detect>(
    `/api/guild-member/detect/${guildId}`
  )
  return response.data
}

//길드 멤버 기록 추가
export const addGuildMember = async (
  characterName: string,
  guildId: number
) => {
  const response = await basicApi.post(`/api/guild-member/${guildId}`, {
    characterName
  })
  return response.data.message
}

//길드 멤버 기록 삭제
export const deleteGuildMember = async (
  characterName: string,
  guildId: number
) => {
  const response = await basicApi.delete(`/api/guild-member/${guildId}`, {
    params: {
      characterName: characterName
    }
  })
  return response.data.message
}

export const refreshGuildMember = async (guildId: number) => {
  const response = await basicApi.patch(`/api/guilds/${guildId}`)
  return response.data.message
}
