import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useAuthStore } from '../store/authStore'
import { authService } from '../firebase'
import { fetchUserInfo } from '../apis/user/userController'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const { storeLogin, storeLogout } = useAuthStore()
  const nav = useNavigate()

  const userLogin = async () => {
    try {
      const provider = await new GoogleAuthProvider()
      const result = await signInWithPopup(authService, provider)
      const token = await result.user.getIdToken()

      if (!token || !result.user.uid) {
        throw new Error('로그인에 필요한 정보를 가져올 수 없습니다.')
      }

      storeLogin(token, result.user.uid, 'member')
      const userInfo = await fetchUserInfo(result.user.uid)

      if (!userInfo) {
        throw new Error('사용자 정보를 가져올 수 없습니다.')
      }
      return userInfo
    } catch {
      return null
    }
  }

  const userLogout = () => {
    signOut(authService)
      .then(() => {
        storeLogout()
        nav('/')
      })
      .catch(error => console.error(error))
  }

  return { userLogin, userLogout }
}
