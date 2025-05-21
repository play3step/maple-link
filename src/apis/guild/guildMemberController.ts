import { basicApi } from '..'
import { Detect, NexonMembers } from '../../types/guild'

//멤버 조회
export const fetchGuildMembers = async (guildId: number) => {
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

//길드 멤버 기록 새로고침
export const refreshGuildMember = async (guildId: number) => {
  const response = await basicApi.patch(`/api/guilds/${guildId}`)
  return response.data.message
}

//길드 멤버 기록 설명 수정
export const memberDescription = async (
  characterName: string,
  description: string
) => {
  const response = await basicApi.patch(`/api/guild-member/description`, {
    characterName,
    description
  })
  return response.data
}
