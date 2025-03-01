import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import { useAuthStore } from '../store/authStore'
import { authService } from '../firebase'

export const useAuth = () => {
  const { storeLogin } = useAuthStore()

  const userLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(authService, provider)
      const token = await result.user.getIdToken()
      if (token) {
        storeLogin(token)
      }
    } catch (error) {
      console.log(error)
    }
  }

  return { userLogin }
}
