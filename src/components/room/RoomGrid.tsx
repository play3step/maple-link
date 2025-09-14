import { Room } from '../../types/rooms'
import { RoomCard } from './RoomCard'

interface Props {
  rooms: Room[]
  onEnterRoom: (room: Room) => void
  onManageRoom: (room: Room) => void
  onDeleteRoom: (adminId: string) => void
}

export const RoomGrid = ({
  rooms,
  onEnterRoom,
  onManageRoom,
  onDeleteRoom
}: Props) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {rooms.map(room => (
        <RoomCard
          key={room.adminId}
          room={room}
          onEnterRoom={onEnterRoom}
          onManageRoom={onManageRoom}
          onDeleteRoom={onDeleteRoom}
        />
      ))}
    </div>
  )
}
