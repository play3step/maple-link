import { basicApi } from '..'
import {
  Detect,
  NexonMembers,
  RecordedMembers,
  SearchGuild
} from '../../types/guild'

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
  return response.data.message
}

//API 멤버
export const fetchNexonGuildMembers = async (guildId: number) => {
  const response = await basicApi.get<NexonMembers>(
    `/api/guilds/${guildId}/members`
  )
  return response.data
}

//직접 기록한 멤버
export const fetchRecordedGuildMembers = async (guildId: number) => {
  const response = await basicApi.get<RecordedMembers>(
    `/api/guild-member/add-list/${guildId}`
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
