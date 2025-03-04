import { useNavigate } from 'react-router-dom'
import SocialAuthButton from '../components/common/SocialAuthButton'

import { useAuth } from '../hooks/useAuth'
import { useAuthStore } from '../store/authStore'
import { useEffect } from 'react'
import Title from '../components/common/Title'

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
    <h1 className="flex flex-col gap-4 items-center">
      <Title size="large">Maple Link</Title>
      <p>메이플스토리의 길드관리와 다양한 정보를 기록하고 관리합니다.</p>
      <SocialAuthButton onClick={onSubmit}>Google</SocialAuthButton>
      <p>주요 기능 소개</p>
      <p>API 키 발급 안내</p>
      <p>자주 묻는 질문 (FAQ)</p>
    </h1>
  )
}

export default Home
