import { create } from 'zustand'

interface StoreState {
  isloggedIn: boolean
  storeLogin: (token: string, uid: string) => void
  storeLoggout: () => void
}

export const getToken = () => localStorage.getItem('token')
export const getUid = () => localStorage.getItem('uid')

const setToken = (token: string) => {
  localStorage.setItem('token', token)
}

const setUid = (uid: string) => {
  localStorage.setItem('uid', uid)
}

export const removeToken = () => {
  localStorage.removeItem('token')
}

export const removeUid = () => {
  localStorage.removeItem('uid')
}

export const useAuthStore = create<StoreState>(set => ({
  isloggedIn: getToken() && getUid() ? true : false,
  storeLogin: (token: string, uid: string) => {
    set({ isloggedIn: true })
    setToken(token)
    setUid(uid)
  },
  storeLoggout: () => {
    set({ isloggedIn: false })
    removeToken()
    removeUid()
  }
}))
