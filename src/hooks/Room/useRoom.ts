import { createRoomList, getRoomList } from '../../apis/Guild/roomController'
import { Room } from '../../types/Rooms'
import { useState, useEffect } from 'react'

export const useRoom = () => {
  const [roomList, setRoomList] = useState<Room[]>([])

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
    fetchRoomList()
  }

  useEffect(() => {
    fetchRoomList()
  }, [])

  return { createRoom, roomList }
}
