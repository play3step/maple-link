import { create } from 'zustand'
import { User } from '../types/auth'

interface UserState {
  userInfo: User | null
  userUid: string | null
  setUserInfo: (info: User) => void
  setUserUid: (uid: string) => void
  updateUserInfo: (info: Partial<User>) => void

  clearUserInfo: () => void
}

export const useUserStore = create<UserState>(set => ({
  userInfo: null,
  userUid: null,
  setUserInfo: info => set({ userInfo: info }),
  setUserUid: uid => set({ userUid: uid }),
  updateUserInfo: info =>
    set(state => ({
      userInfo: state.userInfo ? { ...state.userInfo, info } : null
    })),
  clearUserInfo: () => set({ userInfo: null })
}))
