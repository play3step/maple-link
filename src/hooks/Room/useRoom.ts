import { createRoomList } from '../../apis/Guild/roomController'

export const useRoom = () => {
  const createRoom = async (groupName: string) => {
    await createRoomList(groupName)
  }

  return { createRoom }
}
