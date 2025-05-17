import { createRoomList, getRoomList } from '../../apis/guild/roomController'
import { useEffect } from 'react'
import { useRoomsStore } from '../../store/roomsStore'
import { addGuildList } from '../../apis/guild/guildController'
import { useAuthStore } from '../../store/authStore'
import { guestRoom } from '../../data/guest'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

export const useRoom = () => {
  const { rooms, setRooms } = useRoomsStore()
  const { userType } = useAuthStore()
  const queryClient = useQueryClient()

  const { data: roomList } = useQuery({
    queryKey: ['roomList', userType],
    queryFn: () => getRoomList(),
    enabled: userType === 'member'
  })

  useEffect(() => {
    if (userType === 'guest') {
      setRooms(guestRoom)
    } else if (roomList) {
      setRooms(roomList)
    }
  }, [roomList, userType, setRooms])

  const createGuildMutation = useMutation({
    mutationFn: ({
      guildName,
      guildWorld
    }: {
      guildName: string
      guildWorld: string
    }) => addGuildList({ guild_name: guildName, world_name: guildWorld })
  })

  const createRoomMutation = useMutation({
    mutationFn: ({
      groupName,
      guildId
    }: {
      groupName: string
      guildId: number
    }) => createRoomList(groupName, guildId)
  })

  const handleCreateGuild = async (guildName: string, guildWorld: string) => {
    if (userType !== 'member') {
      alert('사용할수 없는 기능입니다.')
      return
    }
    const res = await createGuildMutation.mutateAsync({
      guildName,
      guildWorld
    })
    if (res) {
      await createRoomMutation.mutateAsync({
        groupName: res.groupName,
        guildId: res.guildId
      })
      queryClient.invalidateQueries({ queryKey: ['roomList', userType] })
    }
  }

  return { handleCreateGuild, rooms }
}
