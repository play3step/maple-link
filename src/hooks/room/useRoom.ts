import {
  createRoomList,
  deleteRoomList,
  getRoomList
} from '../../apis/room/roomController'
import { useEffect } from 'react'
import { useRoomsStore } from '../../store/roomsStore'

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

  // const createGuildMutation = useMutation({
  //   mutationFn: ({
  //     guildName,
  //     guildWorld
  //   }: {
  //     guildName: string
  //     guildWorld: string
  //   }) => addGuildList({ guild_name: guildName, world_name: guildWorld })
  // })

  const createRoomMutation = useMutation({
    mutationFn: ({
      groupName,
      guildName,
      guildWorld
    }: {
      groupName: string
      guildName: string
      guildWorld: string
    }) => createRoomList(groupName, guildName, guildWorld)
  })

  const handleCreateRoom = async (
    groupName: string,
    guildName: string,
    guildWorld: string
  ) => {
    if (userType !== 'member') {
      return {
        guildId: null,
        message: '게스트는 관리방을 생성할 수 없습니다.'
      }
    }

    try {
      const res = await createRoomMutation.mutateAsync({
        groupName,
        guildName,
        guildWorld
      })

      queryClient.invalidateQueries({ queryKey: ['roomList', userType] })

      return {
        guildId: res.id,
        message: '관리방 생성 성공'
      }
    } catch (error) {
      console.error('관리방 생성 실패:', error)
      return {
        guildId: null,
        message: '생성할수 없는 길드 입니다.'
      }
    }
  }

  const deleteRoomMutation = useMutation({
    mutationFn: (groupAdminId: number) => deleteRoomList(groupAdminId)
  })

  const handleDeleteRoom = async (groupAdminId: number) => {
    if (userType !== 'member') {
      alert('게스트는 관리방을 삭제할 수 없습니다.')
      return
    }
    try {
      if (confirm('관리방을 삭제하시겠습니까?')) {
        await deleteRoomMutation.mutateAsync(groupAdminId)
        queryClient.invalidateQueries({ queryKey: ['roomList', userType] })

        alert('관리방 삭제 성공')
        return
      }
    } catch (error) {
      console.error('관리방 삭제 실패:', error)
      alert('관리방 삭제 실패')
      return
    }
  }

  return { handleCreateRoom, handleDeleteRoom, rooms }
}
