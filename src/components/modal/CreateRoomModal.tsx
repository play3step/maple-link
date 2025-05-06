import ModalLayout from './ModalLayout'
import { useRoom } from '../../hooks/Room/useRoom'
import { useRef, useState } from 'react'
import { SelectGuildForm } from './SelectGuildForm'

export const CreateRoomModal = () => {
  const roomNameRef = useRef<HTMLInputElement>(null)
  const { createRoom } = useRoom()
  const [guildName, setGuildName] = useState('')
  const [guildWorld, setGuildWorld] = useState('')

  const onSubmit = async () => {
    if (!roomNameRef.current?.value) {
      alert('방 이름을 입력해주세요')
      return
    }
    if (!guildName || !guildWorld) {
      alert('길드를 선택해주세요')
      return
    }
    await createRoom(roomNameRef.current?.value, guildName, guildWorld)

    alert('관리방이 생성되었습니다')
  }

  return (
    <ModalLayout
      size="small"
      title="새 관리방 만들기"
      description="메인 길드를 선택하여 관리방을 생성하세요"
      onSubmit={onSubmit}>
      <div className="space-y-6">
        <input
          ref={roomNameRef}
          type="text"
          placeholder="방 이름"
          className="w-3/4 px-3 py-2 ml-1 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
        <h2 className="text-lg font-bold text-gray-800">메인 길드</h2>

        <SelectGuildForm
          guildName={guildName}
          setGuildName={setGuildName}
          guildWorld={guildWorld}
          setGuildWorld={setGuildWorld}
        />
      </div>
    </ModalLayout>
  )
}
