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
import axios from 'axios'
import { ErrorResponse } from '../../types'

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

  const createRoomMutation = useMutation({
    mutationFn: ({
      groupName,
      guildName,
      guildWorld
    }: {
      groupName: string
      guildName: string
      guildWorld: string
    }) => createRoomList(groupName, guildName, guildWorld),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roomList'] })
    },
    onError: error => {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse
        alert(errorData.data.message)
      }
    }
  })

  const deleteRoomMutation = useMutation({
    mutationFn: (groupAdminId: number) => deleteRoomList(groupAdminId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roomList'] })
    },
    onError: error => {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse
        alert(errorData.data.message)
      }
    }
  })

  const createRoomHandler = async (
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

      return {
        guildId: res.id
      }
    } catch {
      return {
        success: false
      }
    }
  }

  const deleteRoomHandler = async (groupAdminId: number) => {
    if (userType !== 'member') {
      alert('게스트는 관리방을 삭제할 수 없습니다.')
      return
    }
    try {
      if (confirm('관리방을 삭제하시겠습니까?')) {
        await deleteRoomMutation.mutateAsync(groupAdminId)
        return
      }
    } catch {
      return
    }
  }

  return { createRoomHandler, deleteRoomHandler, rooms }
}
