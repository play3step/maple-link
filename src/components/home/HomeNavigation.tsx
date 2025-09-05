import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FiMenu, FiX } from 'react-icons/fi'
import Logo from '../../assets/logo.png'
import KakaoOpenChatButton from '../common/KakaoOpenChatButton'

const KAKAO_CHAT_LINK = 'https://open.kakao.com/o/s4tfG2Ah'

const HomeNavigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
            <span className="font-bold text-lg sm:text-xl text-gray-900">
              MapleLink
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-4">
            <KakaoOpenChatButton
              chatLink={KAKAO_CHAT_LINK}
              className="!py-1.5 !px-3 text-sm"
            />
            <Link
              to="/apiGuide"
              className="text-gray-600 hover:text-blue-600 font-medium text-sm whitespace-nowrap">
              API 가이드
            </Link>
            <Link
              to="/faq"
              className="text-gray-600 hover:text-blue-600 font-medium text-sm">
              FAQ
            </Link>
          </div>

          <button
            className="sm:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="sm:hidden border-t border-gray-200 py-4 bg-white/95 backdrop-blur-sm">
            <div className="flex flex-col space-y-3">
              <KakaoOpenChatButton
                chatLink={KAKAO_CHAT_LINK}
                className="!py-2 !px-4 text-sm mx-auto"
              />
              <Link
                to="/apiGuide"
                className="text-gray-600 hover:text-blue-600 font-medium text-sm text-center py-2"
                onClick={() => setIsMenuOpen(false)}>
                API 가이드
              </Link>
              <Link
                to="/faq"
                className="text-gray-600 hover:text-blue-600 font-medium text-sm text-center py-2"
                onClick={() => setIsMenuOpen(false)}>
                FAQ
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default HomeNavigation
