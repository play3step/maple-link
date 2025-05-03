import { useState } from 'react'
import ModalLayout from './ModalLayout'
import { IoAdd } from 'react-icons/io5'
import { useModalStore } from '../../store/modalStore'
import { useSearchGuilds } from '../../hooks/Guild/useSearchGuilds'
import { SelectGuildForm } from './SelectGuildForm'
export const CreateGuildModal = () => {
  const { closeModal } = useModalStore()
  const [guildName, setGuildName] = useState('')
  const [guildWorld, setGuildWorld] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const { createGuild } = useSearchGuilds()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    const res = await createGuild(guildWorld, guildName)
    if (res) {
      alert(res)
      setIsLoading(false)
      closeModal()
    } else {
      setIsLoading(false)
    }
  }

  return (
    <ModalLayout size="small">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">길드 생성</h2>
            <p className="text-sm text-gray-600 mt-1">
              새로운 길드를 생성하고 관리를 시작하세요
            </p>
          </div>
        </div>
        <SelectGuildForm
          guildName={guildName}
          setGuildName={setGuildName}
          guildWorld={guildWorld}
          setGuildWorld={setGuildWorld}
          onSubmit={handleSubmit}
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
            form="guildForm"
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
      </div>
    </ModalLayout>
  )
}
