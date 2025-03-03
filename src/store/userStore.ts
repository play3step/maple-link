import { create } from 'zustand'
import { User } from '../types/auth'

interface UserState {
  userInfo: User | null
  setUserInfo: (info: User) => void
  updateUserInfo: (info: Partial<User>) => void

  clearUserInfo: () => void
}

export const useUserStore = create<UserState>(set => ({
  userInfo: null,
  setUserInfo: info => set({ userInfo: info }),
  updateUserInfo: info =>
    set(state => ({
      userInfo: state.userInfo ? { ...state.userInfo, info } : null
    })),
  clearUserInfo: () => set({ userInfo: null })
}))
