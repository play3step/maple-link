import { basicApi } from '..'
import { Rooms } from '../../types/Rooms'
export const createRoomList = async (
  groupName: string,
  guildName: string,
  guildWorld: string
) => {
  const response = await basicApi.post('/api/group-admin', {
    groupName: groupName,
    guildName: guildName,
    guildWorld: guildWorld
  })

  return response.data
}

export const getRoomList = async () => {
  const response = await basicApi.get<Rooms>('/api/group-admin')
  return response.data
}
