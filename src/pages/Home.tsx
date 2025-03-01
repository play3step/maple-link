import SocialAuthButton from '../components/common/SocialAuthButton'

import { useAuth } from '../hooks/useAuth'

const Home = () => {
  const { userLogin } = useAuth()

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
