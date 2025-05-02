import { useState } from 'react'
import { useModalStore } from '../store/modalStore'
import { CreateRoomModal } from '../components/modal/CreateRoomModal'
import { useNavigate } from 'react-router-dom'
import {
  IoAdd,
  IoTrashOutline,
  IoPersonAddOutline,
  IoStatsChartOutline
} from 'react-icons/io5'

interface Guild {
  id: number
  name: string
  guildCount: number
  isActive?: boolean
}

export const RoomList = () => {
  const { openModal, activeModal } = useModalStore()
  const navigate = useNavigate()
  const [guilds] = useState<Guild[]>([
    {
      id: 1,
      name: '노비맙단',
      guildCount: 1,
      isActive: true
    },
    {
      id: 2,
      name: '뒤에서',
      guildCount: 3,
      isActive: false
    }
  ])

  return (
    <div className="max-w-7xl min-h-screen mx-auto px-4 py-8 bg-gray-50">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">길드 관리 홈</h1>
          <p className="text-gray-600 mt-2">관리중인 길드방 목록입니다</p>
        </div>
        <button
          onClick={() => openModal('createRoom')}
          className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg">
          <IoAdd className="text-xl" />새 관리방
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {guilds.map(guild => (
          <div
            key={guild.id}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {guild.name}
                  </h2>
                  <div className="flex items-center gap-2">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        guild.isActive
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                      {guild.isActive ? '활성' : '비활성'}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                    title="통계 보기">
                    <IoStatsChartOutline className="text-xl" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">소속 길드</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {guild.guildCount}개
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/room/${guild.id}`)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm">
                  관리방 입장
                </button>
                <button
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
                  title="관리자 추가">
                  <IoPersonAddOutline className="text-xl" />
                </button>
                <button
                  className="flex items-center justify-center w-10 h-10 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
                  title="삭제">
                  <IoTrashOutline className="text-xl" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activeModal === 'createRoom' && <CreateRoomModal />}
    </div>
  )
}
