import { useRoomsStore } from '../../store/roomsStore'
import { Guild } from '../../types/guild'
import { useEffect } from 'react'
import { addGuildList, deleteGuildList } from '../../apis/guild/guildController'
import { useAuthStore } from '../../store/authStore'
import { ErrorResponse } from '../../types'
import axios from 'axios'
import { addGuildToRoom } from '../../apis/room/roomController'
import { useQueryClient } from '@tanstack/react-query'
export const useGuildsList = () => {
  const { guildList, rooms, setGuildList, groupId } = useRoomsStore()

  const queryClient = useQueryClient()

  const { userType } = useAuthStore()

  useEffect(() => {
    if (rooms && rooms.length > 0) {
      const searchRoom = rooms.find(room => room.adminId === groupId)

      if (searchRoom) {
        const guilds: Guild[] = []

        guilds.push({
          guildId: searchRoom.mainGuild.guildId,
          guildName: searchRoom.mainGuild.name
        })

        if (searchRoom.subGuild && searchRoom.subGuild.subGuildIds.length > 0) {
          const subGuilds = searchRoom.subGuild.subGuildIds.map(
            (id, index) => ({
              guildId: id,
              guildName: searchRoom.subGuild.names[index]
            })
          )
          guilds.push(...subGuilds)
        }

        setGuildList(guilds)
      }
    }
  }, [groupId])

  // 길드 생성
  const createGuild = async (worldName: string, guildName: string) => {
    if (!worldName || !guildName) return
    if (userType === 'guest') {
      alert('게스트 유저는 길드 생성을 할 수 없습니다.')
      return
    }
    try {
      const res = await addGuildList({
        world_name: worldName,
        guild_name: guildName
      })
      if (res.guildId) {
        await addGuildToRoom(Number(groupId), res.guildId)
        setGuildList([
          ...guildList,
          { guildId: res.guildId, guildName: guildName }
        ])
        queryClient.invalidateQueries({ queryKey: ['roomList', userType] })
        return { success: true, message: '길드 생성 완료' }
      } else {
        return { success: false, message: '길드 ID가 응답에 없습니다.' }
      }
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse
        return {
          success: false,
          message: errorData.data.message ?? '길드 생성 중 오류가 발생했습니다.'
        }
      }
    }
  }

  // 길드 삭제
  const deleteGuild = async (guildId: number) => {
    if (!guildId || userType === 'guest') return

    try {
      await deleteGuildList(guildId)
      setGuildList(guildList.filter(guild => guild.guildId !== guildId))
      queryClient.invalidateQueries({ queryKey: ['roomList', userType] })
    } catch (error) {
      if (axios.isAxiosError(error) && error.response?.data) {
        const errorData = error.response.data as ErrorResponse
        alert(errorData.data.message)
      }
    }
  }

  return { guildList, createGuild, deleteGuild }
}
