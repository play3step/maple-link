import { useModalStore } from '../store/modalStore'
import { CreateRoomModal } from '../components/modal/Room/CreateRoomModal'
import { useNavigate } from 'react-router-dom'
import { IoAdd, IoTrashOutline, IoPersonAddOutline } from 'react-icons/io5'
import { useRoom } from '../hooks/Room/useRoom'
import { Loading } from '../components/common/Loading'
import { GuildManageModal } from '../components/modal/Room/RoomManageModal'
import { useState } from 'react'
import { Room } from '../types/Rooms'

export const RoomList = () => {
  const { openModal, activeModal } = useModalStore()
  const { rooms } = useRoom()
  const navigate = useNavigate()

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  if (!rooms) {
    return (
      <div className="w-full h-screen flex items-center justify-center bg-gray-50">
        <Loading
          size="large"
          text="관리방 목록을 불러오는 중입니다..."
        />
      </div>
    )
  }

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
        {rooms.map(room => (
          <div
            key={room.adminId}
            className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-xl font-bold text-gray-900 mb-1">
                    {room.groupName}
                  </h2>
                </div>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 bg-gray-50 rounded-lg p-4">
                  <p className="text-sm text-gray-600">메인 길드</p>
                  <p className="text-lg font-bold text-gray-900">
                    {room.mainGuild.name}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => navigate(`/room/${room.adminId}`)}
                  className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm">
                  관리방 입장
                </button>
                <button
                  className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
                  title="관리자 추가"
                  onClick={() => {
                    setSelectedRoom(room)
                    openModal('guildManage')
                  }}>
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
      {activeModal === 'guildManage' && (
        <GuildManageModal room={selectedRoom as Room} />
      )}
    </div>
  )
}
