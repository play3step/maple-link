import { useState } from 'react'
import ModalLayout from '../ModalLayout'
import { IoAdd } from 'react-icons/io5'
import { useModalStore } from '../../../store/modalStore'
import { SelectGuildForm } from '../SelectGuildForm'

interface Props {
  createGuild: (
    worldName: string,
    guildName: string
  ) => Promise<{
    success: boolean
    message: string
  }>
}

export const CreateGuildModal = ({ createGuild }: Props) => {
  const { closeModal } = useModalStore()
  const [guildName, setGuildName] = useState('')
  const [guildWorld, setGuildWorld] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!guildName.trim() || !guildWorld.trim()) {
      alert('길드 정보를 모두 입력해주세요')
      return
    }

    setIsLoading(true)
    const result = await createGuild(guildWorld, guildName)

    if (result?.success) {
      alert(result?.message)
      closeModal()
    } else {
      alert(result?.message)
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
