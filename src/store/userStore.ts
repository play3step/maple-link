import { create } from 'zustand'
import { User } from '../types/auth'
import { guest } from '../data/guest'

interface UserState {
  userInfo: User | null
  userName: string | null
  characterOcid: string

  setUserInfo: (info: User) => void
  setUserName: (name: string) => void
  setCharacterOcid: (ocid: string) => void
  updateUserInfo: (info: Partial<User>) => void
  clearUserInfo: () => void
}

export const useUserStore = create<UserState>(set => ({
  userInfo: {
    id: 0,
    firebaseId: '1',
    name: 'search',
    email: 'play3step@gmail.com',
    ocid: guest.ocid
  },
  userName: null,
  characterOcid: guest.ocid,
  setUserInfo: info => set({ userInfo: info }),
  setUserName: name => set({ userName: name }),
  setCharacterOcid: ocid => set({ characterOcid: ocid }),
  updateUserInfo: info =>
    set(state => ({
      userInfo: state.userInfo ? { ...state.userInfo, ...info } : null
    })),
  clearUserInfo: () =>
    set({ userInfo: null, userName: null, characterOcid: guest.ocid })
}))
