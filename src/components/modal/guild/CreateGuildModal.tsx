import { useState } from 'react'
import ModalLayout from '../ModalLayout'
import { IoAdd } from 'react-icons/io5'
import { useModalStore } from '../../../store/modalStore'
import { SelectGuildForm } from '../SelectGuildForm'

import { addGuildToRoom } from '../../../apis/room/roomController'
import { useGuildsList } from '../../../hooks/guild/useGuildsList'
import { useRoomsStore } from '../../../store/roomsStore'

export const CreateGuildModal = () => {
  const { closeModal } = useModalStore()
  const [guildName, setGuildName] = useState('')
  const [guildWorld, setGuildWorld] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const { createGuild } = useGuildsList()
  const { groupId } = useRoomsStore()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!guildName.trim() || !guildWorld.trim()) {
      alert('길드 정보를 모두 입력해주세요')
      return
    }

    setIsLoading(true)
    try {
      const res = await createGuild(guildWorld, guildName)

      if (res.status === 500) {
        alert('존재하지 않는 길드입니다.')
        return
      }

      if (res.guildId && groupId) {
        try {
          await addGuildToRoom(Number(groupId), res.guildId)
          alert('길드가 성공적으로 추가되었습니다.')
          closeModal()
        } catch {
          alert('길드 추가 중 오류가 발생했습니다.')
        }
      } else if (res.message) {
        alert(res.message)
      }
    } catch {
      alert('길드 생성 중 오류가 발생했습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <ModalLayout
      size="small"
      title="길드 생성"
      description="새로운 길드를 생성하고 관리를 시작하세요"
      showFooterButtons={false}>
      <form
        id="guildForm"
        onSubmit={handleSubmit}>
        <SelectGuildForm
          guildName={guildName}
          setGuildName={setGuildName}
          guildWorld={guildWorld}
          setGuildWorld={setGuildWorld}
        />
        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={closeModal}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
            취소
          </button>
          <button
            type="submit"
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
      </form>
    </ModalLayout>
  )
}
