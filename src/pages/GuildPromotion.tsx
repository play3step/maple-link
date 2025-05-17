import { useState } from 'react'
import { CreatePromotionModal } from '../components/modal/promotion/CreatePromotionModal'
import { useModalStore } from '../store/modalStore'

interface Guild {
  id: number
  name: string
  memberCount: number
  description: string
}

export const GuildPromotion = () => {
  const { openModal, activeModal } = useModalStore()

  const [guilds] = useState<Guild[]>([
    {
      id: 1,
      name: '노비맙단',
      memberCount: 25,
      description: '강력한 길드원들과 함께하는 모험'
    },
    {
      id: 2,
      name: '메이플 연합',
      memberCount: 15,
      description: '초보자 환영! 함께 성장하는 길드'
    }
  ])

  return (
    <div className="max-w-7xl h-[100vh] mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">길드 홍보</h1>
        <button
          onClick={() => openModal('createPromotion')}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold transition-colors">
          길드 홍보 등록
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {guilds.map(guild => (
          <div
            key={guild.id}
            className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 hover:-translate-y-1">
            <div className="p-6">
              <h2 className="text-xl font-semibold mb-2">{guild.name}</h2>
              <p className="text-gray-600 mb-4">멤버: {guild.memberCount}명</p>
              <p className="text-gray-800 mb-6">{guild.description}</p>
              <div className="flex gap-2">
                <button className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded text-sm font-semibold transition-colors">
                  자세히 보기
                </button>
                <button className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-1.5 rounded text-sm font-semibold transition-colors">
                  가입 신청
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {activeModal === 'createPromotion' && <CreatePromotionModal />}
    </div>
  )
}
