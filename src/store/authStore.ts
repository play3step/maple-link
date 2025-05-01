import { create } from 'zustand'

interface StoreState {
  token: string | null
  uid: string | null
  isLoggedIn: boolean
  storeLogin: (token: string, uid: string) => void
  storeLogout: () => void
}

export const useAuthStore = create<StoreState>(set => ({
  token: null,
  uid: null,
  isLoggedIn: false,
  storeLogin: (token: string, uid: string) => {
    set({ token, uid, isLoggedIn: true })
  },
  storeLogout: () => {
    set({ token: null, uid: null, isLoggedIn: false })
  }
}))
