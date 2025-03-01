import { useNavigate } from 'react-router-dom'
import SocialAuthButton from '../components/common/SocialAuthButton'

import { useAuth } from '../hooks/useAuth'
import { useAuthStore } from '../store/authStore'
import { useEffect } from 'react'

const Home = () => {
  const { userLogin } = useAuth()
  const { isloggedIn } = useAuthStore()

  const nav = useNavigate()

  useEffect(() => {
    if (isloggedIn) {
      nav('/character')
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
