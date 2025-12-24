import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useAuthStore } from '../../store/authStore'
import { useUserStore } from '../../store/userStore'
import { guest } from '../../data/guest'
import Logo from '../../assets/logo.png'
import GoogleLogo from '../../assets/gogle.svg'
import { useShallow } from 'zustand/react/shallow'

const HeroSection = () => {
  const { userLogin, isLoading } = useAuth()
  const storeLogin = useAuthStore(s => s.storeLogin)
  const [setUserInfo, setCharacterOcid] = useUserStore(
    useShallow(s => [s.setUserInfo, s.setCharacterOcid])
  )
  const nav = useNavigate()

  const handleGuestLogin = async () => {
    try {
      await storeLogin('', '', 'guest')
      setCharacterOcid(guest.ocid)
      nav('/character')
    } catch (error) {
      console.error('게스트 로그인 실패:', error)
      alert('게스트 로그인에 실패했습니다.')
    }
  }

  const handleMemberLogin = async () => {
    const userInfo = await userLogin()
    if (userInfo) {
      setUserInfo(userInfo)
      setCharacterOcid(userInfo.ocid!)
      const redirectPath = userInfo.nexonApiKey ? '/character' : '/signup'
      nav(redirectPath)
    }
  }

  return (
    <div className="text-center mb-8 sm:mb-12">
      <div className="flex flex-col items-center mb-6">
        <img
          src={Logo}
          alt="메이플링크 로고"
          className="w-12 h-12 sm:w-16 sm:h-16 mb-4"
        />
        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-100">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
          <span className="text-xs sm:text-sm text-blue-600 font-medium">
            메이플스토리 통합 관리 플랫폼
          </span>
        </div>
      </div>
      <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 px-4">
        메이플스토리를
        <br className="sm:hidden" /> 더 스마트하게
      </h1>
      <p className="text-base sm:text-lg text-gray-500 px-4 mb-4">
        캐릭터부터 길드까지, 한눈에 관리하세요
      </p>
      <div className="w-full p-8 rounded-3xl bg-slate-50 border border-slate-200 shadow-sm text-center">
        {/* 아이콘이나 작은 라벨 (선택 사항) */}
        <span className="inline-block px-3 py-1 mb-4 text-xs font-semibold tracking-wider text-slate-500 uppercase bg-slate-200 rounded-full">
          Notice
        </span>

        <h3 className="mb-4 text-xl font-bold text-slate-800">
          메이플 링크 서비스 이용 안내
        </h3>

        <div className="space-y-3 text-slate-600 leading-relaxed">
          <p>
            안녕하세요, 메이플 링크입니다. 먼저 저희 서비스를 아껴주신 많은
            유저분들께 진심으로 감사드립니다.
          </p>

          <p>
            다름이 아니라, 개인적인 사정으로 인해 현재 제공 중인{' '}
            <span className="font-semibold text-slate-900">
              회원 기능 및 길드원 관리 서비스
            </span>
            를 더 이상 유지하기 어렵게 되었습니다. <br />
            서비스를 믿고 이용해 주신 분들께 불편을 끼쳐 드려 대단히 죄송합니다.
          </p>

          <p className="pt-2 border-t border-slate-200 mt-4">
            <span className="font-semibold text-slate-900 text-blue-600">
              길드 및 캐릭터 검색 기능
            </span>
            은 정상적으로 이용 가능합니다. 더 나은 모습으로 돌아오아 오겠습니다.
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4">
        <button
          onClick={handleGuestLogin}
          disabled={isLoading}
          className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed">
          체험하기
        </button>
        <button
          onClick={handleMemberLogin}
          disabled={isLoading}
          className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium disabled:opacity-50 disabled:cursor-not-allowed">
          <img
            src={GoogleLogo}
            alt="Google"
            className="w-5 h-5"
          />
          {isLoading ? '로그인 중...' : 'Google로 시작하기'}
        </button>
      </div>
    </div>
  )
}

export default HeroSection
