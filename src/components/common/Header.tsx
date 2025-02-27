import { Link } from 'react-router-dom'

function Header() {
  return (
    <div className="w-full max-w-[1440px] mx-auto px-4 py-5 border-b border-black flex justify-between">
      <Link
        to="/"
        className="md:text-2xl text-lg">
        Maple Nexus
      </Link>
    </div>
  )
}

export default Header
