import { FiCalendar } from 'react-icons/fi'
import { useAuthStore } from '../../store/authStore'
import { useUserStore } from '../../store/userStore'
import { useNavigate } from 'react-router-dom'
import { guest } from '../../data/guest'
import Button from '../common/Button'

const FeatureShowcase = () => {
  const { storeLogin } = useAuthStore()
  const { setCharacterOcid } = useUserStore()
  const nav = useNavigate()

  const handleGuestLogin = async () => {
    await storeLogin('', '', 'guest')
    setCharacterOcid(guest.ocid)
    nav('/character')
  }

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
          <FiCalendar className="text-green-600 text-lg" />
        </div>
        <h2 className="text-base font-semibold">체험하기</h2>
      </div>
      <div className="space-y-3">
        <div className="space-y-1.5 text-sm">
          <p className="font-medium text-gray-900">비로그인 이용 가능한 기능</p>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="w-1 h-1 rounded-full bg-blue-500" />
            <span>캐릭터 정보 조회</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="w-1 h-1 rounded-full bg-blue-500" />
            <span>길드 정보 조회</span>
          </div>
        </div>
        <div className="space-y-1.5 text-sm">
          <p className="font-medium text-gray-900">
            로그인 후 이용 가능한 기능
          </p>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span>캘린더로 일정 관리하기</span>
          </div>
          <div className="flex items-center gap-2 text-gray-600">
            <span className="w-1 h-1 rounded-full bg-gray-400" />
            <span>길드원 관리하기</span>
          </div>
        </div>
        <Button
          size="medium"
          scheme="solid"
          className="w-full text-sm"
          onClick={handleGuestLogin}>
          게스트로 시작하기
        </Button>
      </div>
    </div>
  )
}

export default FeatureShowcase
