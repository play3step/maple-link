import { useState } from 'react'
import ModalLayout from './ModalLayout'
import { useModalStore } from '../../store/modalStore'
import { IoSearch, IoClose } from 'react-icons/io5'
import { Loading } from '../common/Loading'
import { searchCharacter } from '../../apis/Character/characterController'
import { CharacterSearch } from '../../types/character'

export const AddCharacterModal = () => {
  const { closeModal } = useModalStore()
  const [searchName, setSearchName] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [results, setResults] = useState<CharacterSearch>()
  const [selectedCharacter, setSelectedCharacter] =
    useState<CharacterSearch | null>(null)

  const handleSearch = async () => {
    if (!searchName.trim()) return
    setIsLoading(true)
    try {
      const res = await searchCharacter(searchName)
      if (res && res.character_name) {
        setResults({
          character_name: res.character_name,
          world_name: res.world_name,
          character_class: res.character_class,
          character_level: res.character_level,
          character_image: res.character_image
        })
      } else {
        setResults(undefined)
      }
    } catch {
      setResults(undefined)
      alert('캐릭터를 찾을 수 없습니다.')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    handleSearch()
  }

  return (
    <ModalLayout size="medium">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">캐릭터 추가</h2>
            <p className="text-sm text-gray-600 mt-1">
              캐릭터 닉네임으로 검색해주세요
            </p>
          </div>
          <button
            onClick={closeModal}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            title="닫기">
            <IoClose className="text-xl text-gray-500" />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchName}
              onChange={e => setSearchName(e.target.value)}
              placeholder="캐릭터 닉네임 입력"
              className="w-full px-4 py-2 pr-12 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
            />
            <button
              type="submit"
              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-blue-500 transition-colors"
              disabled={isLoading}>
              <IoSearch className="text-xl" />
            </button>
          </div>
        </form>

        <div className="min-h-[300px]">
          {isLoading ? (
            <div className="flex items-center justify-center h-[300px]">
              <Loading
                size="medium"
                text="캐릭터를 검색중입니다..."
              />
            </div>
          ) : results ? (
            <div className="space-y-3">
              <button
                onClick={() => setSelectedCharacter(results)}
                className={`w-full flex items-center gap-4 p-4 rounded-lg border transition-all ${
                  selectedCharacter?.character_name === results.character_name
                    ? 'border-blue-500 bg-blue-50'
                    : 'border-gray-200 hover:border-blue-200 hover:bg-gray-50'
                }`}>
                <img
                  src={results.character_image}
                  alt={results.character_name}
                  className="w-16 h-16 rounded-lg object-cover bg-gray-100"
                />
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {results.character_name}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {results.world_name} • {results.character_class} • Lv.
                    {results.character_level}
                  </p>
                </div>
              </button>
            </div>
          ) : searchName && !isLoading ? (
            <div className="flex flex-col items-center justify-center h-[300px] text-gray-500">
              <p>검색 결과가 없습니다</p>
              <p className="text-sm mt-1">다른 닉네임으로 검색해보세요</p>
            </div>
          ) : null}
        </div>

        <div className="flex gap-3 mt-6">
          <button
            type="button"
            onClick={closeModal}
            className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-medium transition-colors">
            취소
          </button>
          <button
            type="button"
            disabled={!selectedCharacter}
            onClick={() => {
              closeModal()
            }}
            className="flex-1 px-4 py-2.5 bg-blue-500 text-white rounded-lg font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600">
            추가하기
          </button>
        </div>
      </div>
    </ModalLayout>
  )
}
