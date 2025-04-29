import { useNavigate } from 'react-router-dom'
import SocialAuthButton from '../components/common/SocialAuthButton'

import { useAuth } from '../hooks/useAuth'
import { useAuthStore } from '../store/authStore'
import { useEffect } from 'react'
import Title from '../components/common/Title'
import Logo from '../assets/logo.png'

const Home = () => {
  const { userLogin, loadUserInfo } = useAuth()
  const { isloggedIn } = useAuthStore()

  const nav = useNavigate()

  useEffect(() => {
    if (isloggedIn) {
      loadUserInfo().then(v => (v?.nexonApiKey ? nav('/character') : nav('/')))
    }
  }, [isloggedIn, nav])

  const onSubmit = () => {
    userLogin()
  }

  return (
    <div className="flex flex-col items-center justify-center bg-gradient-to-b from-white to-sky-100 px-4 py-8 gap-10 rounded-lg">
      <div className="flex items-center gap-3">
        <img
          src={Logo}
          className="w-12 h-12"
          alt="MapleLink Logo"
        />
        <Title size="large">메이플 링크</Title>
      </div>

      <p className="text-center text-gray-600 max-w-md">
        메이플스토리의 길드 관리와 일정 관리를 한 곳에서!
        <br />
        부캐 정리, 이벤트 추적까지 MapleLink에서 간편하게.
      </p>

      <div className="w-full max-w-xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl shadow-md p-6  space-y-2">
          <p className="text-lg font-semibold mb-2">🎯 길드 & 길드원 관리</p>
          <p className="text-gray-700 text-sm">누구의 부캐인지 헷갈리셨나요?</p>
          <p className="text-gray-700 text-sm">
            MapleLink에서 캐릭터 정보를 체계적으로 관리하세요!
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 space-y-2">
          <p className="text-lg font-semibold mb-2">📅 이벤트 & 일정 관리</p>
          <p className="text-gray-700 text-sm">
            파티보스 스케줄과 이벤트 기간 놓치지 마세요.
          </p>
          <p className="text-gray-700 text-sm">
            MapleLink에서 기록하고 확인할 수 있어요!
          </p>
        </div>
      </div>

      <div className="w-full max-w-sm bg-white shadow-md rounded-xl px-6 py-8 flex flex-col items-center gap-4">
        <p className="text-lg font-semibold text-center">
          Google 계정으로 시작하기
        </p>
        <p className="text-sm text-gray-500 text-center">
          메이플 링크를 사용하려면 로그인이 필요해요.
        </p>
        <SocialAuthButton onClick={onSubmit}>Google 로그인</SocialAuthButton>
      </div>

      <div className="flex flex-col items-center gap-2">
        <button
          onClick={() => nav('/apiGuide')}
          className="text-sm text-blue-600 hover:underline">
          🔑 API 키 발급 안내
        </button>
        <button
          className="text-sm text-gray-500 hover:text-black hover:underline transition"
          onClick={() => nav('faq')}>
          자주 묻는 질문 (FAQ)
        </button>
      </div>
    </div>
  )
}

export default Home
