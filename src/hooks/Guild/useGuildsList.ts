import { useParams } from 'react-router-dom'
import { useRoomsStore } from '../../store/roomsStore'
import { Guild } from '../../types/guild'
import { useEffect } from 'react'
import { addGuildList, deleteGuildList } from '../../apis/Guild/guildController'

export const useGuildsList = () => {
  const { adminId } = useParams<{ adminId: string }>()
  const { guildList, rooms, setGuildList } = useRoomsStore()

  useEffect(() => {
    if (rooms && rooms.length > 0) {
      const searchRoom = rooms.find(room => room.adminId === Number(adminId))

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
  }, [])

  // 길드 생성
  const createGuild = async (worldName: string, guildName: string) => {
    if (!worldName || !guildName) return
    const response = await addGuildList({
      world_name: worldName,
      guild_name: guildName
    })
    if (response.guildId) {
      setGuildList([
        ...guildList,
        {
          guildId: response.guildId,
          guildName: guildName
        }
      ])
    }
    return response
  }

  // 길드 삭제
  const deleteGuild = async (guildId: number) => {
    if (!guildId) return

    try {
      await deleteGuildList(guildId)
      setGuildList(guildList.filter(guild => guild.guildId !== guildId))
    } catch {
      alert('길드 삭제 중 오류가 발생했습니다.')
    }
  }

  return { guildList, createGuild, deleteGuild }
}
