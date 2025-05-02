import { useState } from 'react'
import { useModalStore } from '../store/modalStore'
import { CreateRoomModal } from '../components/modal/CreateRoomModal'
interface Guild {
  id: number
  name: string
  guildCount: number
}

export const RoomList = () => {
  const { openModal, activeModal } = useModalStore()

  const [guilds] = useState<Guild[]>([
    {
      id: 1,
      name: '노비맙단',
      guildCount: 1
    },
    {
      id: 2,
      name: '뒤에서',
      guildCount: 3
    }
  ])

  return (
    <div className="max-w-7xl h-[100vh] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">길드 관리 홈</h1>
        <button
          onClick={() => openModal('createRoom')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
          새 관리방
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guilds.map(guild => (
          <div
            key={guild.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{guild.name}</h2>
              <p className="text-gray-600 mb-4">
                길드 수: {guild.guildCount}개
              </p>

              <div className="flex gap-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-semibold transition-colors">
                  관리자 추가
                </button>
                <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded text-sm font-semibold transition-colors">
                  삭제
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
