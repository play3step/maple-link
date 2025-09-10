import { useModalStore } from '../store/modalStore'
import { CreateRoomModal } from '../components/modal/room/CreateRoomModal'
import { useNavigate } from 'react-router-dom'
import { useRoom } from '../hooks/room/useRoom'
import { Loading } from '../components/common/Loading'
import { GuildManageModal } from '../components/modal/room/RoomManageModal'
import { useState } from 'react'
import { Room } from '../types/rooms'
import { useRoomsStore } from '../store/roomsStore'
import { useUserStore } from '../store/userStore'
import { RoomListHeader } from '../components/room/RoomListHeader'
import { RoomGrid } from '../components/room/RoomGrid'
import { EmptyRoomState } from '../components/room/EmptyRoomState'

export const RoomList = () => {
  const { openModal, activeModal } = useModalStore()
  const { rooms, deleteRoomHandler } = useRoom()
  const { setGroupId } = useRoomsStore()
  const { userName } = useUserStore()
  const navigate = useNavigate()

  const [selectedRoom, setSelectedRoom] = useState<Room | null>(null)

  const handleCreateRoom = () => {
    openModal('createRoom')
  }

  const handleEnterRoom = (room: Room) => {
    navigate(`/room/${room.groupName}`)
    setGroupId(room.adminId)
  }

  const handleManageRoom = (room: Room) => {
    setSelectedRoom(room)
    openModal('guildManage')
  }

  const handleDeleteRoom = (adminId: string) => {
    deleteRoomHandler(Number(adminId))
  }

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
      <RoomListHeader onCreateRoom={handleCreateRoom} />

      {rooms.length === 0 ? (
        <EmptyRoomState />
      ) : (
        <RoomGrid
          rooms={rooms}
          onEnterRoom={handleEnterRoom}
          onManageRoom={handleManageRoom}
          onDeleteRoom={handleDeleteRoom}
        />
      )}

      {activeModal === 'createRoom' && <CreateRoomModal />}
      {activeModal === 'guildManage' && userName && (
        <GuildManageModal
          room={selectedRoom as Room}
          userName={userName}
        />
      )}
    </div>
  )
}
