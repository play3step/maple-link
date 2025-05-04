import { createRoomList, getRoomList } from '../../apis/Guild/roomController'
import { Rooms } from '../../types/Rooms'
import { useState, useEffect } from 'react'
export const useRoom = () => {
  const [roomList, setRoomList] = useState<Rooms>()

  const fetchRoomList = async () => {
    const response = await getRoomList()
    if (response) {
      setRoomList(response)
    }
  }

  const createRoom = async (
    groupName: string,
    guildName: string,
    guildWorld: string
  ) => {
    await createRoomList(groupName, guildName, guildWorld)
  }

  useEffect(() => {
    fetchRoomList()
  }, [])

  return { createRoom, roomList }
}
