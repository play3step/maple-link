import { create } from 'zustand'

type UserType = 'member' | 'guest' | 'search'

interface StoreState {
  token: string | null
  uid: string | null
  isLoggedIn: boolean
  userType: UserType
  storeLogin: (token: string, uid: string, userType: UserType) => void
  storeLogout: () => void
}

export const useAuthStore = create<StoreState>(set => ({
  token: null,
  uid: null,
  isLoggedIn: false,
  userType: 'search',
  storeLogin: (token: string, uid: string, userType: UserType) => {
    set({ token, uid, isLoggedIn: true, userType })
  },
  storeLogout: () => {
    set({ token: null, uid: null, isLoggedIn: false, userType: 'search' })
  }
}))
