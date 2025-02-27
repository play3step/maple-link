import Footer from '../common/Footer'
import Header from '../common/Header'

interface LayoutProps {
  children: React.ReactNode
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="w-full max-w-[1440px] min-h-[832px] mx-auto flex flex-col">
      <Header />
      <main className="flex-grow flex justify-center items-center">
        {children}
      </main>
      <Footer />
    </div>
  )
}

export default Layout
