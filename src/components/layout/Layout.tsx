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
      <main className="flex flex-1 h-full items-center justify-center py-4 sm:py-6 px-4 sm:px-6">
        <div className="w-full mx-auto ">{children}</div>
      </main>
      {!hide && <Footer />}
    </div>
  )
}

export default Layout
