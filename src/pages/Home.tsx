import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAuthStore } from '../store/authStore'
import KakaoOpenChatButton from '../components/common/KakaoOpenChatButton'
import {
  FiClock,
  FiChevronRight,
  FiSearch,
  FiCalendar,
  FiUsers
} from 'react-icons/fi'
import Logo from '../assets/logo.png'
import GoogleLogo from '../assets/gogle.svg'
import { useUserStore } from '../store/userStore'
import { guest } from '../data/guest'
import { useState } from 'react'
import Button from '../components/common/Button'

const Home = () => {
  const { userLogin } = useAuth()
  const { storeLogin } = useAuthStore()
  const { setUserInfo } = useUserStore()
  const nav = useNavigate()
  const KAKAO_CHAT_LINK = 'https://open.kakao.com/o/s4tfG2Ah'

  const [characterName, setCharacterName] = useState('')
  const [guildName, setGuildName] = useState('')

  const handleGuestLogin = async () => {
    await storeLogin('', '', 'guest')
    setUserInfo({
      id: 0,
      firebaseId: '1',
      name: 'guest',
      email: 'play3step@gmail.com',
      ocid: guest.ocid
    })
    nav('/character')
  }

  const handleMemberLogin = async () => {
    try {
      const userInfo = await userLogin()
      if (userInfo) {
        setUserInfo(userInfo)
        if (userInfo?.nexonApiKey) {
          nav('/character')
        } else {
          nav('/signup')
        }
      }
    } catch (error) {
      console.error(error)
      alert('로그인에 실패했습니다.')
    }
  }

  const searchCharacterHandler = async () => {
    if (characterName.trim() === '') {
      alert('캐릭터 이름을 입력해주세요.')
      return
    }
    await storeLogin('', '', 'search')

    setUserInfo({
      id: 0,
      firebaseId: '1',
      name: characterName.trim(),
      email: 'play3step@gmail.com',
      ocid: '1'
    })
    nav(`/searchCharacter`)
  }

  const recentNotices = [
    {
      id: 1,
      title: '서비스 이용 안내',
      date: '2025.05.23'
    },
    {
      id: 2,
      title: '메이플스토리 캘린더 업데이트 안내',
      date: '2025.06.11'
    },
    {
      id: 3,
      title: '다음 업데이트 예정 기능',
      date: '2025.06'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* 상단 네비게이션 */}
      <nav className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-2">
              <img
                src={Logo}
                className="w-8 h-8"
                alt="MapleLink Logo"
              />
              <span className="font-bold text-xl text-gray-900">MapleLink</span>
            </div>
            <div className="flex items-center gap-4">
              <KakaoOpenChatButton
                chatLink={KAKAO_CHAT_LINK}
                className="!py-1.5 !px-3 text-sm"
              />
              <Link
                to="/apiGuide"
                className="text-gray-600 hover:text-blue-600 font-medium text-sm">
                API 가이드
              </Link>
              <Link
                to="/faq"
                className="text-gray-600 hover:text-blue-600 font-medium text-sm">
                FAQ
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* 히어로 섹션 */}
        <div className="text-center mb-12">
          <div className="flex flex-col items-center mb-6">
            <img
              src={Logo}
              alt="메이플링크 로고"
              className="w-16 h-16 mb-4"
            />
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full border border-blue-100">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              <span className="text-sm text-blue-600 font-medium">
                메이플스토리 통합 관리 플랫폼
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            메이플스토리를 더 스마트하게
          </h1>
          <p className="text-lg text-gray-500">
            캐릭터부터 길드까지, 한눈에 관리하세요
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={handleGuestLogin}
              className="px-5 py-2.5 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              체험하기
            </button>
            <button
              onClick={handleMemberLogin}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <img
                src={GoogleLogo}
                alt="Google"
                className="w-5 h-5"
              />
              Google로 시작하기
            </button>
          </div>
        </div>

        {/* 주요 기능 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2  gap-6 mb-12">
          {/* 길드 검색 */}
          <div className="md:col-span-2 md:w-2/3 md:mx-auto bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden">
            <div className="absolute inset-0 bg-black/5 backdrop-blur-[1px] flex flex-col items-center justify-center z-10 gap-2">
              <div className="bg-amber-500/90 px-4 py-1.5 rounded-full">
                <span className="text-white font-medium text-sm">
                  서비스 준비중
                </span>
              </div>
            </div>
            <div className="opacity-50">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <FiUsers className="text-purple-600 text-lg" />
                </div>
                <h2 className="text-base font-semibold">길드 검색</h2>
              </div>
              <div className="space-y-3">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="길드 이름을 입력하세요"
                    value={guildName}
                    onChange={e => setGuildName(e.target.value)}
                    className="flex-1 px-3 py-2 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    disabled
                  />
                  <Button
                    size="medium"
                    scheme="solid"
                    className="px-3 py-2 !bg-purple-500 hover:!bg-purple-600 text-sm"
                    disabled>
                    추가
                  </Button>
                </div>

                <div className="space-y-1.5">
                  <p className="text-xs text-gray-500">검색할 길드 목록</p>
                  <div className="flex flex-wrap gap-1.5">
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-50 border border-purple-200 rounded-md">
                      <span className="text-base text-purple-700">
                        아르카나
                      </span>
                    </div>
                    <div className="flex items-center gap-1 px-2 py-0.5 bg-purple-50 border border-purple-200 rounded-md">
                      <span className="text-base text-purple-700">
                        노비맙단
                      </span>
                    </div>
                  </div>
                </div>

                <Button
                  size="medium"
                  scheme="solid"
                  className="w-full !bg-purple-500 hover:!bg-purple-600 text-sm"
                  disabled>
                  길드 검색
                </Button>
              </div>
            </div>
          </div>

          {/* 캐릭터 검색 */}
          <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden h-fit self-start">
            <div className="opacity-50 flex flex-col justify-between">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <FiSearch className="text-blue-600 text-lg" />
                </div>
                <h2 className="text-base font-semibold">캐릭터 검색</h2>
              </div>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="캐릭터 이름을 입력하세요"
                  value={characterName}
                  onChange={e => setCharacterName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                />
                <Button
                  size="medium"
                  scheme="solid"
                  className="w-full text-sm"
                  onClick={searchCharacterHandler}>
                  캐릭터 검색
                </Button>
              </div>
            </div>
          </div>

          {/* 체험하기 */}
          <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                <FiCalendar className="text-green-600 text-lg" />
              </div>
              <h2 className="text-base font-semibold">체험하기</h2>
            </div>
            <div className="space-y-3">
              <div className="space-y-1.5 text-sm">
                <p className="font-medium text-gray-900">
                  비로그인 이용 가능한 기능
                </p>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-1 h-1 rounded-full bg-blue-500" />
                  <span>캐릭터 정보 조회</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-1 h-1 rounded-full bg-blue-500" />
                  <span>길드 정보 조회</span>
                </div>
              </div>
              <div className="space-y-1.5 text-sm">
                <p className="font-medium text-gray-900">
                  로그인 후 이용 가능한 기능
                </p>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  <span>캘린더로 일정 관리하기</span>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <span className="w-1 h-1 rounded-full bg-gray-400" />
                  <span>길드원 관리하기</span>
                </div>
              </div>
              <Button
                size="medium"
                scheme="solid"
                className="w-full text-sm"
                onClick={handleGuestLogin}>
                게스트로 시작하기
              </Button>
            </div>
          </div>
        </div>

        {/* 공지사항 섹션 */}
        <div className="bg-white rounded-xl shadow-sm">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">최근 소식</h2>
              <Link
                to="/notice"
                className="text-blue-600 hover:text-blue-700 flex items-center gap-1 text-sm font-medium">
                더보기
                <FiChevronRight />
              </Link>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {recentNotices.map(notice => (
              <Link
                key={notice.id}
                to="/notice"
                className="flex items-center justify-between p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FiClock className="text-gray-400" />
                  <span className="text-gray-900">{notice.title}</span>
                </div>
                <span className="text-sm text-gray-500">{notice.date}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
