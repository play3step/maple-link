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
    return response.data
  } catch (error) {
    console.error('Error fetching user info:', error)
    throw error
  }
}

export const addUserInfo = async (apiKey: string) => {
  try {
    const { setUserInfo } = useUserStore.getState()
    const response = await basicApi.post(`/api/user/apikey`, {
      apiKey: apiKey
    })

    if (response.data) {
      setUserInfo({
        ...response.data,
        nexonApiKey: response.data.generatedApiKey
      })
    }

    return response.data
  } catch (error) {
    console.error('API 키 등록 실패:', error)
  }
}
