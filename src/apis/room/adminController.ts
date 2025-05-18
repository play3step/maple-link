import { basicApi } from '..'

export const addAdminToRoom = async (
  groupAdminId: number,
  characterName: string
) => {
  const response = await basicApi.post(
    `/api/group-admin/groups/${groupAdminId}/${characterName}/admins`
  )
  return response.data
}

export const removeAdminFromRoom = async (
  groupAdminId: number,
  characterName: string
) => {
  const response = await basicApi.delete(
    `/api/group-admin/groups/${groupAdminId}/${characterName}/admins`
  )
  return response.data
}
