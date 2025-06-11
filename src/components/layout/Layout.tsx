import { useEffect, useState } from 'react'
import { API_KEY } from '../../config/api'
import Footer from '../common/Footer'
import Header from '../common/Header'
import MaintenancePage from '../maintenance/MaintenancePage'

interface LayoutProps {
  children: React.ReactNode
  hide?: boolean
}

const Layout = ({ children, hide }: LayoutProps) => {
  const [isDown, setIsDown] = useState(false)

  useEffect(() => {
    const checkHealth = async () => {
      try {
        const res = await fetch(`${API_KEY}/health`)
        const data = await res.json()
        if (data.status !== 'UP') {
          setIsDown(true)
        } else {
          setIsDown(false)
        }
      } catch {
        setIsDown(true)
      }
    }

    checkHealth()

    const interval = setInterval(checkHealth, 100000) //100초 서버 검사
    return () => clearInterval(interval)
  }, [])

  if (isDown) {
    return <MaintenancePage />
  }

  return (
    <div className="w-full max-w-[1440px] min-h-screen mx-auto flex flex-col bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      {!hide && <Header />}
      <main className="flex flex-1 h-full items-center justify-center py-4 sm:py-6 px-4 sm:px-6">
        <div className="w-full mx-auto ">{children}</div>
      </main>
      {!hide && <Footer />}
    </div>
  )
}

export default Layout
