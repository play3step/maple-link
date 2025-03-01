import basicApi from '..'

export const fetchUserInfo = (uid: string) => {
  try {
    const response = basicApi.post(`/api/user`, {
      uid: uid
    })
    return response
  } catch (error) {
    console.error('Error fetching user info:', error)
    throw error
  }
}
