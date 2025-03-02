import basicApi from '..'
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
    const response = await basicApi.post(`/api/user/apikey`, {
      apiKey: apiKey
    })
    console.log(response.data)
    return response.data
  } catch (error) {
    console.error(error)
  }
}
