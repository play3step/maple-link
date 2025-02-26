import basicApi from '..'

export const UserInfo = (uid: string) => {
  try {
    const response = basicApi.post(`/api/user`, {
      firebaseId: uid
    })
    console.log(response)
  } catch (error) {
    console.error('Error fetching user info:', error)
    throw error
  }
}
