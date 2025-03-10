import Footer from '../common/Footer'
import Header from '../common/Header'

interface LayoutProps {
  children: React.ReactNode
  hide?: boolean
}

const Layout = ({ children, hide }: LayoutProps) => {
  return (
    <div className="w-full max-w-[1440px] min-h-[832px] mx-auto flex flex-col">
      {!hide && <Header />}
      <main className="flex-grow flex justify-center items-center py-5 px-4">
        {children}
      </main>
      {!hide && <Footer />}
    </div>
  )
}

export default Layout
