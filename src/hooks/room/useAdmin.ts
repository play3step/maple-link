import { useAuthStore } from '../../store/authStore'
import { useMutation } from '@tanstack/react-query'
import {
  addAdminToRoom,
  removeAdminFromRoom
} from '../../apis/room/adminController'

export const useAdmin = () => {
  const { userType } = useAuthStore()

  const addMutation = useMutation({
    mutationFn: ({
      groupAdminId,
      characterName
    }: {
      groupAdminId: number
      characterName: string
    }) => addAdminToRoom(groupAdminId, characterName)
  })

  const removeMutation = useMutation({
    mutationFn: ({
      groupAdminId,
      characterName
    }: {
      groupAdminId: number
      characterName: string
    }) => removeAdminFromRoom(groupAdminId, characterName)
  })

  const handleAddAdmin = async (
    groupAdminId: number,
    characterName: string
  ) => {
    if (userType !== 'member') {
      alert('사용할수 없는 기능입니다.')
      return
    }
    return addMutation.mutateAsync({ groupAdminId, characterName })
  }

  const handleRemoveAdmin = async (
    groupAdminId: number,
    characterName: string
  ) => {
    if (userType !== 'member') {
      alert('사용할수 없는 기능입니다.')
      return
    }
    return removeMutation.mutateAsync({ groupAdminId, characterName })
  }

  return { handleAddAdmin, handleRemoveAdmin }
}
