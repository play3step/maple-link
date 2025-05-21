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
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(authService, provider)
      const token = await result.user.getIdToken()
      console.log(token)
      if (token && result.user.uid) {
        storeLogin(token, result.user.uid, 'member')
        fetchUserInfo(result.user.uid)
      }
    } catch (error) {
      console.log(error)
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
