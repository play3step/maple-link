import { Room } from '../types/rooms'
import { create } from 'zustand'
import { Guild } from '../types/guild'
interface RoomsStore {
  rooms: Room[]
  groupId: number | null
  guildList: Guild[]
  setRooms: (rooms: Room[]) => void
  setGuildList: (guildList: Guild[]) => void
  setGroupId: (groupId: number) => void
}

export const useRoomsStore = create<RoomsStore>(set => ({
  rooms: [],
  guildList: [],
  groupId: null,
  setRooms: (rooms: Room[]) => set({ rooms }),
  setGuildList: (guildList: Guild[]) => set({ guildList }),
  setGroupId: (groupId: number) => set({ groupId })
}))
