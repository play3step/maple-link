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
    <div className="flex flex-col items-center justify-start gap-10 py-6 sm:py-10">
      <div className="flex flex-col items-center gap-4">
        <div className="flex items-center gap-3 animate-pulse">
          <img
            src={Logo}
            className="w-14 h-14 drop-shadow-md"
            alt="MapleLink Logo"
          />
          <Title
            size="large"
            className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600 font-bold">
            메이플 링크
          </Title>
        </div>
        <p className="text-center text-gray-700 max-w-lg leading-relaxed font-medium">
          메이플스토리의 길드 관리와 일정 관리를 한 곳에서!
          <br />
          부캐 정리, 이벤트 추적까지{' '}
          <span className="text-blue-600 font-semibold">MapleLink</span>에서
          간편하게.
        </p>
      </div>

      <div className="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 space-y-3 border border-blue-100 transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl">
          <div className="text-blue-600 text-2xl mb-2">🎯</div>
          <p className="text-xl font-bold mb-2 text-gray-800">
            길드 & 길드원 관리
          </p>
          <p className="text-gray-700">누구의 부캐인지 헷갈리셨나요?</p>
          <p className="text-gray-700">
            MapleLink에서 캐릭터 정보를 체계적으로 관리하세요!
          </p>
        </div>

        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg p-6 space-y-3 border border-blue-100 transition-all duration-300 hover:translate-y-[-8px] hover:shadow-xl">
          <div className="text-blue-600 text-2xl mb-2">📅</div>
          <p className="text-xl font-bold mb-2 text-gray-800">
            이벤트 & 일정 관리
          </p>
          <p className="text-gray-700">
            파티보스 스케줄과 이벤트 기간 놓치지 마세요.
          </p>
          <p className="text-gray-700">
            MapleLink에서 기록하고 확인할 수 있어요!
          </p>
        </div>
      </div>

      <div className="w-full max-w-sm bg-white/90 backdrop-blur-sm shadow-xl rounded-2xl px-8 py-8 flex flex-col items-center gap-4 border border-blue-100 hover:shadow-2xl transition-all">
        <p className="text-xl font-bold text-center text-gray-800">
          Google 계정으로 시작하기
        </p>
        <p className="text-gray-600 text-center">
          메이플 링크를 사용하려면 로그인이 필요해요.
        </p>
        <SocialAuthButton
          onClick={onSubmit}
          className="w-full py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium shadow-md hover:shadow-lg transition-all duration-300">
          Google 로그인
        </SocialAuthButton>
      </div>

      <div className="flex flex-col items-center gap-3">
        <button
          onClick={() => nav('/apiGuide')}
          className="text-blue-600 hover:text-blue-800 hover:underline font-medium flex items-center gap-1 transition-all">
          <span className="text-lg">🔑</span> API 키 발급 안내
        </button>
        <button
          className="text-gray-500 hover:text-gray-800 hover:underline transition-all font-medium"
          onClick={() => nav('faq')}>
          자주 묻는 질문 (FAQ)
        </button>
      </div>
    </div>
  )
}

export default Home
