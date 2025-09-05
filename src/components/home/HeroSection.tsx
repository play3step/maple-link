import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import { useAuthStore } from '../../store/authStore'
import { useUserStore } from '../../store/userStore'
import { guest } from '../../data/guest'
import Logo from '../../assets/logo.png'
import GoogleLogo from '../../assets/gogle.svg'

const HeroSection = () => {
  const { userLogin } = useAuth()
  const { storeLogin } = useAuthStore()
  const { setUserInfo, setCharacterOcid } = useUserStore()
  const nav = useNavigate()

  const handleGuestLogin = async () => {
    await storeLogin('', '', 'guest')
    setCharacterOcid(guest.ocid)
    nav('/character')
  }

  const handleMemberLogin = async () => {
    try {
      const userInfo = await userLogin()
      if (userInfo) {
        setUserInfo(userInfo)
        setCharacterOcid(userInfo.ocid!)
        if (userInfo?.nexonApiKey) {
          nav('/character')
        } else {
          nav('/signup')
        }
      }
    } catch {
      alert('로그인에 실패했습니다.')
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
      <p className="text-base sm:text-lg text-gray-500 px-4">
        캐릭터부터 길드까지, 한눈에 관리하세요
      </p>
      <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-6 sm:mt-8 px-4">
        <button
          onClick={handleGuestLogin}
          className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors font-medium">
          체험하기
        </button>
        <button
          onClick={handleMemberLogin}
          className="w-full sm:w-auto px-5 py-3 sm:py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 font-medium">
          <img
            src={GoogleLogo}
            alt="Google"
            className="w-5 h-5"
          />
          Google로 시작하기
        </button>
      </div>
    </div>
  )
}

export default HeroSection
