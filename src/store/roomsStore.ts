import { Room } from '../types/rooms'
import { create } from 'zustand'
import { Guild } from '../types/guild'
interface RoomsStore {
  rooms: Room[]
  guildList: Guild[]
  setRooms: (rooms: Room[]) => void
  setGuildList: (guildList: Guild[]) => void
}

export const useRoomsStore = create<RoomsStore>(set => ({
  rooms: [],
  guildList: [],
  setRooms: (rooms: Room[]) => set({ rooms }),
  setGuildList: (guildList: Guild[]) => set({ guildList })
}))
