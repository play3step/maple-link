import { createRoomList, getRoomList } from '../../apis/Guild/roomController'
import { useEffect } from 'react'
import { useRoomsStore } from '../../store/roomsStore'
import { addGuildList } from '../../apis/Guild/guildController'
import { useAuthStore } from '../../store/authStore'
import { guestRoom } from '../../data/guest'
export const useRoom = () => {
  const { rooms, setRooms } = useRoomsStore()
  const { userType } = useAuthStore()

  const fetchRoomList = async () => {
    if (userType === 'member') {
      const response = await getRoomList()
      if (response) {
        setRooms(response)
      }
    } else {
      setRooms(guestRoom)
    }
  }

  const createRoom = async (
    groupName: string,
    guildName: string,
    guildWorld: string
  ) => {
    if (userType === 'member') {
      const response = await addGuildList({
        guild_name: guildName,
        world_name: guildWorld
      })

      if (response.guildId) {
        await createRoomList(groupName, response.guildId)
        fetchRoomList()
      }

      return response
    } else {
      return null
    }
  }

  useEffect(() => {
    fetchRoomList()
  }, [])

  return { createRoom, rooms }
}
