import { basicApi } from '..'
import { Room } from '../../types/rooms'

export const getRoomList = async () => {
  try {
    const response = await basicApi.get<Room[]>('/api/group-admin')
    return response.data
  } catch {
    return []
  }
}

export const createRoomList = async (
  groupName: string,
  guildName: string,
  guildWorld: string
) => {
  const response = await basicApi.post(
    '/api/guild-group',
    {
      groupName: groupName
    },
    {
      params: {
        guild_name: guildName,
        world_name: guildWorld
      }
    }
  )

  return response.data
}

export const deleteRoomList = async (groupAdminId: number) => {
  const response = await basicApi.delete(`/api/group-admin/${groupAdminId}`)
  return response.data
}

export const addGuildToRoom = async (groupAdminId: number, guildId: number) => {
  const response = await basicApi.post(
    `/api/group-admin/${groupAdminId}/guilds/${guildId}`
  )
  return response.data
}
