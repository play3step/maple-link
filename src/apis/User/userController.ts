import { basicApi } from '..'
import { useUserStore } from '../../store/userStore'

import { User } from '../../types/auth'

export const fetchUserInfo = async (uid: string) => {
  try {
    const { setUserInfo, setUserUid, setCharacterUid } = useUserStore.getState()
    const response = await basicApi.post<User>(`/api/user`, {
      uid: uid
    })
    setUserInfo(response.data)
    setUserUid(uid)
    if (response.data.characterUid) {
      setCharacterUid(response.data.characterUid)
    }
  } catch (error) {
    console.error('Error fetching user info:', error)
    throw error
  }
}

export const addUserInfo = async (apiKey: string) => {
  try {
    const { userUid } = useUserStore.getState()
    const response = await basicApi.post(`/api/user/apikey`, {
      apiKey: apiKey
    })

    if (response.data && userUid) {
      await fetchUserInfo(userUid)
    }

    return response.data
  } catch (error) {
    console.error('API 키 등록 실패:', error)
  }
}
