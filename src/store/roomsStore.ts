import { Room } from '../types/Rooms'
import { create } from 'zustand'
interface RoomsStore {
  rooms: Room[]
  setRooms: (rooms: Room[]) => void
}

export const useRoomsStore = create<RoomsStore>(set => ({
  rooms: [],
  setRooms: (rooms: Room[]) => set({ rooms })
}))
