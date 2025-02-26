import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import SocialAuthButton from '../components/common/SocialAuthButton'
import { authService } from '../firebase'

const Home = () => {
  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(authService, provider)
      const token = await result.user.getIdToken()
      if (result) {
        console.log(token)
        return { user: result.user, token }
      }
    } catch (error) {
      console.error('구글 로그인 중 오류 발생:', error)
      return null
    }
  }

  return (
    <h1>
      <button onClick={handleGoogleLogin}>로그인</button>
      <SocialAuthButton />
    </h1>
  )
}

export default Home
