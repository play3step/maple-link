import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useAuthStore } from '../store/authStore'
import KakaoOpenChatButton from '../components/common/KakaoOpenChatButton'
import {
  FiClock,
  FiChevronRight,
  FiSearch,
  FiCalendar,
  FiUsers,
  FiX
} from 'react-icons/fi'
import Logo from '../assets/logo.png'
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
  const [guildList, setGuildList] = useState<string[]>([])

  const addGuildToList = () => {
    if (guildName.trim() && !guildList.includes(guildName.trim())) {
      setGuildList([...guildList, guildName.trim()])
      setGuildName('')
    }
  }

  const removeGuildFromList = (name: string) => {
    setGuildList(guildList.filter(guild => guild !== name))
  }

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
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            메이플스토리를 더 스마트하게
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            길드 관리, 캐릭터 관리, 일정 관리까지 한 번에 해결하세요.
            <br />※ 로그인 시, 캘린더와 길드 관리 기능을 사용할 수 있어요.
            (로그인 없이도 캐릭터 및 길드 정보는 자유롭게 조회할 수 있습니다)
          </p>

          <div className="flex justify-center gap-4">
            <button
              onClick={handleGuestLogin}
              className="px-5 py-2.5 bg-white text-blue-600 border border-blue-200 rounded-lg hover:bg-blue-50 transition-colors">
              체험하기
            </button>
            <button
              onClick={handleMemberLogin}
              className="px-5 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2">
              <img
                src={Logo}
                alt="Google"
                className="w-5 h-5"
              />
              Google로 시작하기
            </button>
          </div>
        </div>

        {/* 주요 기능 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {/* 길드 검색 */}
          <div className="md:col-span-2 md:w-2/3 md:mx-auto bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow">
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
                />
                <Button
                  size="medium"
                  scheme="solid"
                  className="px-3 py-2 !bg-purple-500 hover:!bg-purple-600 text-sm"
                  onClick={addGuildToList}>
                  추가
                </Button>
              </div>

              <div className="space-y-1.5">
                <p className="text-xs text-gray-500">검색할 길드 목록</p>
                <div className="flex flex-wrap gap-1.5">
                  {guildList.map((guild, idx) => (
                    <div
                      key={idx}
                      className="flex items-center gap-1 px-2 py-0.5 bg-purple-50 border border-purple-200 rounded-md">
                      <span className="text-base text-purple-700">{guild}</span>
                      <button
                        onClick={() => removeGuildFromList(guild)}
                        className="text-purple-400 hover:text-purple-600">
                        <FiX size={12} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <Button
                size="medium"
                scheme="solid"
                className="w-full !bg-purple-500 hover:!bg-purple-600 text-sm"
                onClick={() => {}}
                disabled={guildList.length === 0}>
                길드 검색
              </Button>
            </div>
          </div>

          {/* 캐릭터 검색 */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                <FiSearch className="text-blue-600 text-xl" />
              </div>
              <h2 className="text-lg font-semibold">캐릭터 검색</h2>
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
                onClick={() => {}}>
                캐릭터 검색
              </Button>
            </div>
          </div>

          {/* 체험하기 */}
          <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                <FiCalendar className="text-green-600 text-xl" />
              </div>
              <h2 className="text-lg font-semibold">체험하기</h2>
            </div>
            <p className="text-gray-600 mb-4">
              게스트로 로그인하여 메이플링크의 다양한 기능을 체험해보세요
            </p>
            <Button
              size="medium"
              scheme="solid"
              className="w-full text-sm"
              onClick={handleGuestLogin}>
              게스트로 시작하기
            </Button>
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
