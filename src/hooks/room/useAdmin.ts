import { useAuthStore } from '../../store/authStore'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import {
  addAdminToRoom,
  removeAdminFromRoom
} from '../../apis/room/adminController'
import axios from 'axios'

interface ErrorResponse {
  errorCode: string
  message: string
  guildId: null
  guildName: null
  worldName: null
}

export const useAdmin = () => {
  const { userType } = useAuthStore()
  const queryClient = useQueryClient()

  const addMutation = useMutation({
    mutationFn: ({
      groupAdminId,
      characterName
    }: {
      groupAdminId: number
      characterName: string
    }) => addAdminToRoom(groupAdminId, characterName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roomList'] })
    }
  })

  const removeMutation = useMutation({
    mutationFn: ({
      groupAdminId,
      characterName
    }: {
      groupAdminId: number
      characterName: string
    }) => removeAdminFromRoom(groupAdminId, characterName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['roomList'] })
    }
  })

  const handleAddAdmin = async (
    groupAdminId: number,
    characterName: string
  ) => {
    if (userType !== 'member') {
      alert('사용할수 없는 기능입니다.')
      return { success: false, message: '사용할수 없는 기능입니다.' }
    }

    if (!characterName.trim()) {
      return { success: false, message: '캐릭터 이름을 입력해주세요.' }
    }

    try {
      await addMutation.mutateAsync({ groupAdminId, characterName })
      return { success: true, message: '관리자가 추가되었습니다.' }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse
        return { success: false, message: errorData.message }
      }
      return { success: false, message: '관리자 추가 중 오류가 발생했습니다.' }
    }
  }

  const handleRemoveAdmin = async (
    groupAdminId: number,
    characterName: string
  ) => {
    if (userType !== 'member') {
      alert('사용할수 없는 기능입니다.')
      return { success: false, message: '사용할수 없는 기능입니다.' }
    }

    try {
      await removeMutation.mutateAsync({ groupAdminId, characterName })
      return { success: true, message: '관리자가 제거되었습니다.' }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse
        return { success: false, message: errorData.message }
      }
      return { success: false, message: '관리자 제거 중 오류가 발생했습니다.' }
    }
  }

  return {
    handleAddAdmin,
    handleRemoveAdmin,
    isAddingAdmin: addMutation.isPending,
    isRemovingAdmin: removeMutation.isPending
  }
}
