import { Link } from 'react-router-dom'
import Logo from '../../assets/logo.png'
import KakaoOpenChatButton from '../common/KakaoOpenChatButton'

const KAKAO_CHAT_LINK = 'https://open.kakao.com/o/s4tfG2Ah'

const HomeNavigation = () => {
  return (
    <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-2">
            <img
              src={Logo}
              className="w-8 h-8"
              alt="MapleLink Logo"
            />
            <span className="font-bold text-xl text-gray-900">MapleLink</span>
          </div>
          <div className="flex items-center gap-4">
            <KakaoOpenChatButton
              chatLink={KAKAO_CHAT_LINK}
              className="!py-1.5 !px-3 text-sm"
            />
            <Link
              to="/apiGuide"
              className="text-gray-600 hover:text-blue-600 font-medium text-sm">
              API 가이드
            </Link>
            <Link
              to="/faq"
              className="text-gray-600 hover:text-blue-600 font-medium text-sm">
              FAQ
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default HomeNavigation
