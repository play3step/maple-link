import Footer from '../common/Footer'
import Header from '../common/Header'

interface LayoutProps {
  children: React.ReactNode
  hide?: boolean
}

const Layout = ({ children, hide }: LayoutProps) => {
  return (
    <div className="w-full max-w-[1440px] min-h-screen mx-auto flex flex-col bg-gradient-to-br from-white via-blue-50 to-indigo-50">
      {!hide && <Header />}
      <main className="flex-1 py-4 sm:py-6 px-4 sm:px-6">
        <div className="w-full max-w-6xl mx-auto backdrop-blur-sm">
          {children}
        </div>
      </main>
      {!hide && <Footer />}
    </div>
  )
}

export default Layout
