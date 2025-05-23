import Logo from '../../assets/logo.png'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="w-full max-w-[1440px] mx-auto px-6 py-6 border-t border-blue-100 bg-white/80 backdrop-blur-sm flex flex-col sm:flex-row justify-between items-center gap-4">
      <div className="flex items-center gap-2">
        <img
          src={Logo}
          alt="Maple Link"
          className="w-6 h-6"
        />
        <p className="text-sm font-medium text-gray-700">© 2025 Maple Link</p>
      </div>
      <p className="text-xs text-gray-400 sm:ml-2">
        ※ 이 서비스는 NEXON Open API를 이용하여 제작되었습니다.
      </p>
      <div className="flex flex-col sm:flex-row items-center gap-4">
        <a
          href="mailto:danbi5190@gmail.com"
          className="text-sm text-gray-600 hover:text-blue-600 transition-all">
          문의하기 : danbi5190@gmail.com
        </a>
        <Link
          to="/privacy"
          className="text-sm text-gray-600 hover:text-blue-600 transition-all">
          개인정보처리방침
        </Link>
        <p className="text-sm text-gray-500">by 루나@단뱅</p>
      </div>
    </footer>
  )
}

export default Footer
