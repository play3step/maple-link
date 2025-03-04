import { GoogleAuthProvider, signInWithPopup, signOut } from 'firebase/auth'
import { useAuthStore } from '../store/authStore'
import { authService } from '../firebase'
import { fetchUserInfo } from '../apis/User/userController'
import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const { storeLogin, storeLoggout } = useAuthStore()
  const nav = useNavigate()

  const userLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(authService, provider)
      const token = await result.user.getIdToken()
      if (token) {
        storeLogin(token, result.user.uid)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const userLogout = () => {
    signOut(authService)
      .then(() => {
        storeLoggout()
        nav('/')
      })
      .catch(error => console.error(error))
  }

  const loadUserInfo = async () => {
    const uid = localStorage.getItem('uid')
    if (uid) {
      try {
        const userInfo = await fetchUserInfo(uid)
        return userInfo
      } catch (error) {
        console.error('Fetch user info error:', error)
      }
    }
  }

  return { userLogin, userLogout, loadUserInfo }
}
