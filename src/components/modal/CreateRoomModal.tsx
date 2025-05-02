import ModalLayout from './ModalLayout'
import { useRoom } from '../../hooks/Room/useRoom'
import { useRef } from 'react'

export const CreateRoomModal = () => {
  const roomNameRef = useRef<HTMLInputElement>(null)
  const { createRoom } = useRoom()

  const onSubmit = () => {
    if (!roomNameRef.current?.value) {
      alert('방 이름을 입력해주세요')
      return
    }
    createRoom(roomNameRef.current?.value)
  }

  return (
    <ModalLayout
      size="small"
      onSubmit={onSubmit}>
      <div className="bg-white rounded-lg w-full max-w-md">
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              새 관리방 만들기
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              메인 길드를 선택하여 관리방을 생성하세요
            </p>
          </div>
          <input
            ref={roomNameRef}
            type="text"
            placeholder="방 이름"
            className="w-3/4 px-3 py-2 ml-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>
    </ModalLayout>
  )
}
