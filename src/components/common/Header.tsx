import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from './Button'

function Header() {
  const { userLogout } = useAuth()
  const nav = useNavigate()
  return (
    <header className="w-full max-w-[1440px] mx-auto px-4 py-5 border-b border-black flex justify-between items-center">
      <div className="flex items-center">
        <Link
          to="/"
          className="md:text-2xl text-lg">
          Maple Link
        </Link>
        <nav className="flex items-center gap-8 ml-10">
          <Button
            scheme="subtle"
            size="small"
            onClick={() => nav('/character')}>
            캐릭터정보
          </Button>
          <Button
            scheme="subtle"
            size="small"
            onClick={() => nav('/guild')}>
            길드관리
          </Button>
          <Button
            scheme="subtle"
            size="small">
            캘린더
          </Button>
          <Button
            scheme="subtle"
            size="small">
            회의
          </Button>
          <Button
            scheme="subtle"
            size="small">
            공지사항
          </Button>
        </nav>
      </div>

      <Button
        size="small"
        scheme="outlined"
        onClick={userLogout}>
        로그아웃
      </Button>
    </header>
  )
}

export default Header
