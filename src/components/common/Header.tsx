import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'
import Button from './Button'

function Header() {
  const { userLogout } = useAuth()
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-5 border-b border-black flex justify-between">
      <Link
        to="/"
        className="md:text-2xl text-lg">
        Maple Link
      </Link>
      <Button
        size="small"
        scheme="outlined"
        onClick={userLogout}>
        로그아웃
      </Button>
    </div>
  )
}

export default Header
