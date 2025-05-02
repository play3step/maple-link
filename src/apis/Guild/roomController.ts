import { basicApi } from '..'
export const createRoomList = async (groupName: string) => {
  const response = await basicApi.post('/api/group-admin', {
    groupName: groupName
  })

  return response.data
}
