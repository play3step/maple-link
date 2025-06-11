import { useState } from 'react'
import {
  FiClock,
  FiChevronRight,
  FiHome,
  FiBell,
  FiRefreshCw
} from 'react-icons/fi'
import { Link } from 'react-router-dom'

interface NoticeItem {
  id: number
  type: 'notice' | 'update'
  title: string
  content: string
  date: string
}

export default function Notice() {
  const [activeTab, setActiveTab] = useState<'notice' | 'update'>('notice')
  const [notices] = useState<NoticeItem[]>([
    {
      id: 1,
      type: 'notice',
      title: '서비스 이용 안내',
      content:
        '메이플링크를 이용해 주셔서 감사합니다. 더 나은 서비스를 위해 노력하겠습니다.',
      date: '2025.05.23'
    },
    {
      id: 2,
      type: 'update',
      title: '메이플스토리 캘린더 업데이트 안내',
      content:
        "1. 개인 스케줄 추가\n→ 캘린더에서 원하는 날짜를 클릭하여 스케줄을 등록할 수 있습니다.\n\n2. 스케줄 초대 기능 추가\n→ 초대하고 싶은 스케줄에서 '초대' 버튼을 누른 후, 캐릭터 닉네임을 입력해 초대할 수 있습니다.\n※ 단, 본캐릭터 닉네임만 입력 가능합니다.\n\n3. 스케줄 수정 기능 추가\n→ 등록된 스케줄의 '수정' 버튼을 눌러 내용을 수정할 수 있습니다.",
      date: '2025.06.11'
    },
    {
      id: 3,
      type: 'update',
      title: '다음 업데이트 예정 기능',
      content:
        '1. 캐릭터 정보 조회\n→ 로그인하지 않아도 캐릭터 닉네임만 입력하면 정보를 조회할 수 있습니다.\n\n2. 로그인 없이 길드 조회 및 본캐/부캐 확인\n→ 누구나 길드 이름을 검색하여 길드에 등록된 본캐와 부캐 정보를 확인할 수 있습니다.\n\n',
      date: '2025.06'
    }
  ])

  const filteredItems = notices.filter(item => item.type === activeTab)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 상단 헤더 */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h1 className="text-xl font-bold text-gray-800">
              공지사항 & 업데이트
            </h1>
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors">
              <FiHome className="text-lg" />
              <span>홈으로</span>
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* 설명 섹션 */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
          <div className="flex items-start gap-6">
            <div className="flex-1">
              <div className="flex items-center gap-2 text-blue-600 font-medium mb-2">
                <FiBell className="text-lg" />
                <h2>공지사항</h2>
              </div>
              <p className="text-gray-600">
                메이플링크의 중요한 소식과 안내사항을 확인하실 수 있습니다.
              </p>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 text-green-600 font-medium mb-2">
                <FiRefreshCw className="text-lg" />
                <h2>업데이트</h2>
              </div>
              <p className="text-gray-600">
                새로운 기능과 개선사항에 대한 업데이트 내역을 확인하실 수
                있습니다.
              </p>
            </div>
          </div>
        </div>

        {/* 탭 메뉴 */}
        <div className="bg-white rounded-lg shadow-sm mb-6">
          <div className="flex gap-4 px-6">
            <button
              onClick={() => setActiveTab('notice')}
              className={`py-4 px-4 font-medium transition-colors relative ${
                activeTab === 'notice'
                  ? 'text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}>
              공지사항
              {activeTab === 'notice' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600" />
              )}
            </button>
            <button
              onClick={() => setActiveTab('update')}
              className={`py-4 px-4 font-medium transition-colors relative ${
                activeTab === 'update'
                  ? 'text-green-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}>
              업데이트
              {activeTab === 'update' && (
                <div className="absolute bottom-0 left-0 w-full h-0.5 bg-green-600" />
              )}
            </button>
          </div>
        </div>

        {/* 공지/업데이트 목록 */}
        <div className="space-y-4">
          {filteredItems.map(item => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-sm hover:shadow transition-shadow">
              <div className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      {item.type === 'notice' ? (
                        <span className="px-2 py-1 bg-blue-50 text-blue-600 text-xs font-medium rounded">
                          공지
                        </span>
                      ) : (
                        <span className="px-2 py-1 bg-green-50 text-green-600 text-xs font-medium rounded">
                          업데이트
                        </span>
                      )}
                      <div className="flex items-center text-sm text-gray-500">
                        <FiClock className="mr-1" />
                        {item.date}
                      </div>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-800 mb-3">
                      {item.title}
                    </h3>
                    {item.type === 'update' ? (
                      <div className="pl-4 border-l-2 border-green-200">
                        {item.content.split('\n').map((line, index) => (
                          <p
                            key={index}
                            className="text-gray-600 mb-2">
                            {line}
                          </p>
                        ))}
                      </div>
                    ) : (
                      <p className="text-gray-600">{item.content}</p>
                    )}
                  </div>
                  <FiChevronRight className="text-gray-400 text-xl flex-shrink-0 ml-4" />
                </div>
              </div>
            </div>
          ))}

          {filteredItems.length === 0 && (
            <div className="bg-white rounded-lg shadow-sm p-12 text-center text-gray-500">
              등록된 {activeTab === 'notice' ? '공지사항' : '업데이트'}이
              없습니다.
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
