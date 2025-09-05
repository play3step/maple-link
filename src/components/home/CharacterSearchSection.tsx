import { FiSearch } from 'react-icons/fi'
import { useCharacterSearch } from '../../hooks/search/useCharacterSearch'
import Button from '../common/Button'

const CharacterSearchSection = () => {
  const {
    searchCharacterHandler,
    characterName,
    setCharacterName,
    searchLoading
  } = useCharacterSearch()
  return (
    <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden h-fit self-start">
      <div className="flex flex-col justify-between">
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shadow-sm">
            <FiSearch className="text-blue-600 text-lg" />
          </div>
          <h2 className="text-base font-semibold text-gray-800">캐릭터 검색</h2>
        </div>
        <div className="space-y-3">
          <input
            type="text"
            placeholder="캐릭터 이름을 입력하세요"
            value={characterName}
            onChange={e => setCharacterName(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
          />
          <Button
            size="medium"
            scheme="solid"
            disabled={searchLoading}
            className={`w-full text-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm ${
              searchLoading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
            onClick={searchCharacterHandler}>
            {searchLoading ? '검색 중...' : '검색'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default CharacterSearchSection
