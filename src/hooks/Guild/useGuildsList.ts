import { useParams } from 'react-router-dom'
import { useRoomsStore } from '../../store/roomsStore'
import { Guild } from '../../types/guild'
import { useEffect } from 'react'
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

  return { guildList }
}
