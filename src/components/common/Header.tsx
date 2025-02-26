import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="w-[1440px] px-4 py-5 border-b border-black flex justify-between">
      <Link
        to="/"
        className="text-2xl">
        Maple Nexus
      </Link>
    </div>
  )
}

export default Header
