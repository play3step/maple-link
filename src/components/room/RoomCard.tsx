import { IoTrashOutline, IoPersonAddOutline } from 'react-icons/io5'
import { Room } from '../../types/rooms'

interface Props {
  room: Room
  onEnterRoom: (room: Room) => void
  onManageRoom: (room: Room) => void
  onDeleteRoom: (adminId: string) => void
}

export const RoomCard = ({
  room,
  onEnterRoom,
  onManageRoom,
  onDeleteRoom
}: Props) => {
  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
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
            onClick={() => onEnterRoom(room)}
            className="flex-1 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2.5 rounded-lg font-medium transition-colors text-sm">
            관리방 입장
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-lg transition-colors"
            title="관리자 추가"
            onClick={() => onManageRoom(room)}>
            <IoPersonAddOutline className="text-xl" />
          </button>
          <button
            className="flex items-center justify-center w-10 h-10 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-colors"
            title="삭제"
            onClick={() => onDeleteRoom(room.adminId.toString())}>
            <IoTrashOutline className="text-xl" />
          </button>
        </div>
      </div>
    </div>
  )
}
