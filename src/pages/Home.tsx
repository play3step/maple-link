import { useNavigate } from 'react-router-dom'
import SocialAuthButton from '../components/common/SocialAuthButton'

import { useAuth } from '../hooks/useAuth'
import { useAuthStore } from '../store/authStore'
import { useEffect } from 'react'

const Home = () => {
  const { userLogin, loadUserInfo } = useAuth()
  const { isloggedIn } = useAuthStore()

  const nav = useNavigate()

  useEffect(() => {
    if (isloggedIn) {
      loadUserInfo().then(v =>
        v?.nexonApiKey ? nav('/character') : nav('/signup')
      )
    }
  }, [isloggedIn, nav])

  const onSubmit = () => {
    userLogin()
  }

  return (
    <h1>
      <SocialAuthButton onClick={onSubmit}>Google</SocialAuthButton>
    </h1>
  )
}

export default Home
