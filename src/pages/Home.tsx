import { useNavigate } from 'react-router-dom'
import SocialAuthButton from '../components/common/SocialAuthButton'
// import { useAuth } from '../hooks/useAuth'
import { useAuthStore } from '../store/authStore'

import Logo from '../assets/logo.png'
import { useUserStore } from '../store/userStore'
import { guest } from '../data/guest'

const Home = () => {
  // const { userLogin } = useAuth()
  const { storeLogin } = useAuthStore()
  const { setUserInfo } = useUserStore()
  const nav = useNavigate()

  const handleGuestLogin = async () => {
    await storeLogin('', '', 'guest')
    setUserInfo({
      id: 0,
      firebaseId: '1',
      name: 'guest',
      email: 'danbi5190@gmail.com',
      ocid: guest.ocid
    })
    nav('/character')
  }

  // const handleMemberLogin = async () => {
  //   try {
  //     const userInfo = await userLogin()
  //     if (userInfo) {
  //       setUserInfo(userInfo)
  //       if (userInfo?.nexonApiKey) {
  //         nav('/character')
  //       } else {
  //         nav('/signup')
  //       }
  //     }
  //   } catch (error) {
  //     console.error(error)
  //     alert('로그인에 실패했습니다.')
  //   }
  // }

  return (
    <div className="h-full bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 text-slate-800 relative overflow-hidden flex flex-col">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-10 animate-blob animation-delay-4000"></div>
      </div>

      <div className="container mx-auto px-4 flex flex-col h-full relative z-10">
        {/* Navigation */}
        <nav className="flex justify-end py-4">
          <button
            onClick={() => nav('/apiGuide')}
            className="text-slate-600 hover:text-blue-600 mr-8 transition-colors font-medium cursor-pointer">
            API 가이드
          </button>
          <button
            onClick={() => nav('/faq')}
            className="text-slate-600 hover:text-blue-600 transition-colors font-medium cursor-pointer">
            FAQ
          </button>
        </nav>

        {/* Hero Section */}
        <div className="lg:flex-1 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
          <div className="flex-1 text-center lg:text-left max-w-xl">
            <div className="flex items-center justify-center lg:justify-start mb-6 gap-4">
              <img
                src={Logo}
                className="w-12 h-12 lg:w-14 lg:h-14 object-contain animate-float"
                alt="MapleLink Logo"
              />
              <h1 className="text-3xl lg:text-5xl font-black bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                MapleLink
              </h1>
            </div>

            <h2 className="text-xl lg:text-2xl font-bold mb-4 text-slate-700">
              메이플스토리를 더 스마트하게
            </h2>

            <p className="text-base lg:text-lg text-slate-600 mb-6">
              길드 관리, 캐릭터 관리, 일정 관리까지
              <br />
              <span className="font-semibold">MapleLink</span>로 한 번에
              해결하세요
            </p>

            <div className="flex flex-col gap-2">
              <button
                className="h-12 bg-gradient-to-r flex justify-center items-center from-blue-500 to-indigo-500 text-white px-4  rounded-full hover:from-blue-400 hover:to-indigo-400 transform hover:translate-y-[-2px] transition-all duration-300 group"
                onClick={handleGuestLogin}
                type="button">
                체험하기
              </button>

              <SocialAuthButton
                // onClick={handleMemberLogin}
                className="inline-flex items-center px-6 py-2.5 text-base font-medium text-white bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl shadow-lg hover:shadow-blue-500/25 hover:from-blue-400 hover:to-indigo-400 transform hover:translate-y-[-2px] transition-all duration-300 group">
                Google로 시작하기
              </SocialAuthButton>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="flex-1 grid grid-cols-1 gap-4 max-w-lg w-full">
            <div className="group">
              <div className="bg-white/80 backdrop-blur-lg p-5 rounded-2xl border border-slate-200 hover:border-blue-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/10">
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-blue-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">🎯</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-1.5 text-slate-800">
                      길드 & 캐릭터 관리
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      모든 캐릭터 정보를 한눈에 확인하고,
                      <br />
                      길드원들과 실시간으로 공유하세요.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="bg-white/80 backdrop-blur-lg p-5 rounded-2xl border border-slate-200 hover:border-indigo-400/50 transition-all duration-300 hover:shadow-2xl hover:shadow-indigo-500/10">
                <div className="flex items-start space-x-4">
                  <div className="p-2.5 bg-indigo-100 rounded-xl group-hover:scale-110 transition-transform duration-300">
                    <span className="text-xl">📅</span>
                  </div>
                  <div>
                    <h3 className="text-base font-bold mb-1.5 text-slate-800">
                      일정 & 이벤트
                    </h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      보스 레이드, 이벤트 일정을
                      <br />
                      놓치지 않도록 관리해드립니다.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom animation keyframes in a style tag */}
      <style>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
          100% { transform: translateY(0px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
      `}</style>
    </div>
  )
}

export default Home
