import { basicApi } from '..'

import { User } from '../../types/auth'

export const fetchUserInfo = async (uid: string) => {
  try {
    const response = await basicApi.post<User>(`/api/user`, {
      uid: uid
    })
    return response.data
  } catch (error) {
    console.error('Error fetching user info:', error)
    throw error
  }
}

export const addUserInfo = async (apiKey: string) => {
  try {
    if (!apiKey || apiKey.trim().length < 10) {
      throw new Error('유효하지 않은 API 키입니다.')
    }

    const response = await basicApi.post(`/api/user/apikey`, {
      apiKey: apiKey.trim()
    })

    return response.data
  } catch (error) {
    console.error('API 키 등록 실패:', error)
    throw error
  }
}
