import { useState } from 'react'
import ModalLayout from './ModalLayout'
import { IoAdd } from 'react-icons/io5'
import { useModalStore } from '../../store/modalStore'
import { useSearchGuilds } from '../../hooks/Guild/useSearchGuilds'
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

        <form
          onSubmit={handleSubmit}
          className="space-y-6">
          <div className="space-y-4">
            <div>
              <label
                htmlFor="guildName"
                className="block text-sm font-medium text-gray-700 mb-1">
                길드 이름
              </label>
              <input
                type="text"
                id="guildName"
                value={guildName}
                onChange={e => setGuildName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                placeholder="길드 이름을 입력하세요"
                required
              />
            </div>

            <div>
              <label
                htmlFor="guildWorld"
                className="block text-sm font-medium text-gray-700 mb-1">
                월드
              </label>
              <select
                id="guildWorld"
                value={guildWorld}
                onChange={e => setGuildWorld(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                required>
                <option value="">월드를 선택하세요</option>
                <option value="리부트">리부트</option>
                <option value="리부트2">리부트2</option>
                <option value="스카니아">스카니아</option>
                <option value="베라">베라</option>
                <option value="루나">루나</option>
                <option value="제니스">제니스</option>
                <option value="크로아">크로아</option>
                <option value="유니온">유니온</option>
                <option value="엘리시움">엘리시움</option>
                <option value="이노시스">이노시스</option>
                <option value="레드">레드</option>
                <option value="오로라">오로라</option>
                <option value="아케인">아케인</option>
                <option value="노바">노바</option>
              </select>
            </div>
          </div>

          <div className="flex gap-3">
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
      </div>
    </ModalLayout>
  )
}
