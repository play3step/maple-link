import { createRoomList, getRoomList } from '../../apis/Guild/roomController'
import { useEffect } from 'react'
import { useRoomsStore } from '../../store/roomsStore'
import { addGuildList } from '../../apis/Guild/guildController'

export const useRoom = () => {
  const { rooms, setRooms } = useRoomsStore()

  const fetchRoomList = async () => {
    const response = await getRoomList()
    if (response) {
      setRooms(response)
    }
  }

  const createRoom = async (
    groupName: string,
    guildName: string,
    guildWorld: string
  ) => {
    const response = await addGuildList({
      guild_name: guildName,
      world_name: guildWorld
    })

    if (response.guildId) {
      await createRoomList(groupName, response.guildId)
      fetchRoomList()
    }

    return response
  }

  useEffect(() => {
    fetchRoomList()
  }, [])

  return { createRoom, rooms }
}
