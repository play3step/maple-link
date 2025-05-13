import { create } from 'zustand'
import { User } from '../types/auth'

interface UserState {
  userInfo: User | null
  userUid: string | null
  characterUid: string | null
  setUserInfo: (info: User) => void
  setUserUid: (uid: string) => void
  setCharacterUid: (uid: string) => void
  updateUserInfo: (info: Partial<User>) => void

  clearUserInfo: () => void
}

export const useUserStore = create<UserState>(set => ({
  userInfo: null,
  userUid: null,
  characterUid: null,
  setUserInfo: info => set({ userInfo: info }),
  setUserUid: uid => set({ userUid: uid }),
  setCharacterUid: uid => set({ characterUid: uid }),
  updateUserInfo: info =>
    set(state => ({
      userInfo: state.userInfo ? { ...state.userInfo, info } : null
    })),
  clearUserInfo: () => set({ userInfo: null })
}))
