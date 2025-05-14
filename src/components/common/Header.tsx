import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from './Button'
import Logo from '../../assets/logo.png'
import { useState } from 'react'
import { useAuthStore } from '../../store/authStore'

function Header() {
  const { userLogout } = useAuth()
  const nav = useNavigate()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const { userType } = useAuthStore()

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen)
  }

  return (
    <header className="w-full max-w-[1440px] mx-auto px-6 py-4 border-b border-blue-100 backdrop-blur-sm bg-white/80 flex justify-between items-center sticky top-0 z-50 shadow-sm">
      <div className="flex items-center">
        <Link
          to="/"
          className="flex items-center gap-2 hover:opacity-80 transition-all">
          <img
            src={Logo}
            alt="Maple Link"
            className="w-8 h-8"
          />
          <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
            Maple Link
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-5 ml-10">
          <Button
            scheme="subtle"
            size="small"
            onClick={() => nav('/character')}
            className="hover:text-blue-600 font-medium transition-all">
            캐릭터정보
          </Button>
          <Button
            scheme="subtle"
            size="small"
            onClick={() => nav('/rooms')}
            className="hover:text-blue-600 font-medium transition-all">
            길드관리
          </Button>
          <Button
            scheme="subtle"
            size="small"
            onClick={() => nav('/calendar')}
            className="hover:text-blue-600 font-medium transition-all">
            캘린더
          </Button>
          <Button
            scheme="subtle"
            size="small"
            onClick={() => nav('/promotion')}
            className="hover:text-blue-600 font-medium transition-all">
            길드 홍보
          </Button>
          {/* <Button
            scheme="subtle"
            size="small"
            className="hover:text-blue-600 font-medium transition-all">
            회의
          </Button>

          <Button
            scheme="subtle"
            size="small"
            className="hover:text-blue-600 font-medium transition-all">
            공지사항
          </Button> */}
        </nav>
      </div>

      {/* Mobile menu button */}
      <button
        className="md:hidden text-gray-700 hover:text-blue-600 transition-all"
        onClick={toggleMobileMenu}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={
              mobileMenuOpen
                ? 'M6 18L18 6M6 6l12 12'
                : 'M4 6h16M4 12h16M4 18h16'
            }
          />
        </svg>
      </button>

      {/* Logout button (desktop) */}
      <Button
        size="small"
        scheme="outlined"
        onClick={userLogout}
        className="hidden md:block border-blue-500 text-blue-600 hover:bg-blue-50 transition-all">
        {userType === 'guest' ? '체험 종료' : '로그아웃'}
      </Button>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white shadow-lg border-b border-blue-100 py-4 px-6 md:hidden flex flex-col gap-3">
          <Button
            scheme="subtle"
            size="small"
            onClick={() => {
              nav('/character')
              setMobileMenuOpen(false)
            }}
            className="w-full text-left py-2 hover:bg-blue-50 rounded-lg">
            캐릭터정보
          </Button>
          <Button
            scheme="subtle"
            size="small"
            onClick={() => {
              nav('/rooms')
              setMobileMenuOpen(false)
            }}
            className="w-full text-left py-2 hover:bg-blue-50 rounded-lg">
            길드관리
          </Button>
          <Button
            scheme="subtle"
            size="small"
            onClick={() => {
              nav('/calendar')
              setMobileMenuOpen(false)
            }}
            className="w-full text-left py-2 hover:bg-blue-50 rounded-lg">
            캘린더
          </Button>
          <Button
            scheme="subtle"
            size="small"
            onClick={() => {
              nav('/promotion')
              setMobileMenuOpen(false)
            }}
            className="w-full text-left py-2 hover:bg-blue-50 rounded-lg">
            길드 홍보
          </Button>

          {/* <Button
            scheme="subtle"
            size="small"
            className="w-full text-left py-2 hover:bg-blue-50 rounded-lg">
            회의
          </Button>
          <Button
            scheme="subtle"
            size="small"
            className="w-full text-left py-2 hover:bg-blue-50 rounded-lg">
            공지사항
          </Button> */}
          <hr className="my-2 border-blue-100" />
          <Button
            size="small"
            scheme="outlined"
            onClick={userLogout}
            className="w-full text-center py-2 border-blue-500 text-blue-600">
            {userType === 'guest' ? '체험 종료' : '로그아웃'}
          </Button>
        </div>
      )}
    </header>
  )
}

export default Header
