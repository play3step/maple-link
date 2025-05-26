import ModalLayout from '../ModalLayout'
import { useRoom } from '../../../hooks/room/useRoom'
import { useRef, useState } from 'react'
import { SelectGuildForm } from '../SelectGuildForm'
import { useModalStore } from '../../../store/modalStore'
import { IoAdd } from 'react-icons/io5'

export const CreateRoomModal = () => {
  const roomNameRef = useRef<HTMLInputElement>(null)
  const { handleCreateRoom } = useRoom()
  const [guildName, setGuildName] = useState('')
  const [guildWorld, setGuildWorld] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { closeModal } = useModalStore()

  const onSubmit = async () => {
    if (!roomNameRef.current?.value) {
      alert('방 이름을 입력해주세요')
      return
    }
    if (!guildName || !guildWorld) {
      alert('길드를 선택해주세요')
      return
    }

    setIsLoading(true)

    const result = await handleCreateRoom(
      roomNameRef.current.value,
      guildName,
      guildWorld
    )

    if (result?.guildId) {
      alert(result.message || '관리방이 성공적으로 생성되었습니다.')
      closeModal()
    } else {
      alert(result.message || '관리방 생성에 실패했습니다.')
    }

    setIsLoading(false)
  }

  return (
    <ModalLayout
      size="small"
      title="새 관리방 만들기"
      description="메인 길드를 선택하여 관리방을 생성하세요"
      showFooterButtons={false}>
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
      <div className="flex gap-3 mt-6">
        <button
          type="button"
          onClick={closeModal}
          className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
          취소
        </button>
        <button
          type="submit"
          onClick={onSubmit}
          disabled={isLoading || !guildName || !guildWorld}
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600">
          {isLoading ? (
            <div className="w-5 h-5 border-t-2 border-white rounded-full animate-spin" />
          ) : (
            <>
              <IoAdd className="text-lg" />
              생성하기
            </>
          )}
        </button>
      </div>
    </ModalLayout>
  )
}
