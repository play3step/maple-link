import { basicApi } from '..'
import { useUserStore } from '../../store/userStore'

import { User } from '../../types/auth'

export const fetchUserInfo = async (uid: string) => {
  try {
    const { setUserInfo } = useUserStore.getState()
    const response = await basicApi.post<User>(`/api/user`, {
      uid: uid
    })
    setUserInfo(response.data)
  } catch (error) {
    console.error('Error fetching user info:', error)
    throw error
  }
}

export const addUserInfo = async (apiKey: string) => {
  const response = await basicApi.post(`/api/user/apikey`, {
    apiKey: apiKey
  })
  return response.data
}
