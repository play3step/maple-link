import basicApi from '..'
import { useUserStore } from '../../store/userStore'

import { User } from '../../types/auth'

const { setUserInfo, updateUserInfo } = useUserStore.getState()

export const fetchUserInfo = async (uid: string) => {
  try {
    const response = await basicApi.post<User>(`/api/user`, {
      uid: uid
    })
    setUserInfo(response.data)
    return response.data
  } catch (error) {
    console.error('Error fetching user info:', error)
    throw error
  }
}

export const addUserInfo = async (apiKey: string) => {
  try {
    const { data: result } = await basicApi.post(`/api/user/apikey`, {
      apiKey: apiKey
    })

    updateUserInfo({ nexonApiKey: result.generatedApiKey })
  } catch (error) {
    console.error(error)
  }
}
