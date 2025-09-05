import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FiSearch } from 'react-icons/fi'
import { useAuthStore } from '../../store/authStore'
import { useUserStore } from '../../store/userStore'
import { searchCharacterOcid } from '../../apis/character/characterController'
import Button from '../common/Button'

const CharacterSearchSection = () => {
  const [characterName, setCharacterName] = useState('')
  const [searchLoading, setSearchLoading] = useState(false)
  const { storeLogin } = useAuthStore()
  const { setCharacterOcid } = useUserStore()
  const nav = useNavigate()

  const searchCharacterHandler = async () => {
    if (characterName.trim() === '') {
      alert('캐릭터 이름을 입력해주세요.')
      return
    }

    setSearchLoading(true)
    try {
      const { ocid } = await searchCharacterOcid(characterName.trim())

      if (!ocid) {
        alert('캐릭터를 찾을 수 없습니다.')
        return
      }
      await storeLogin('', '', 'search')
      setCharacterOcid(ocid)
      nav('/searchCharacter')
    } catch {
      alert('캐릭터 검색에 실패했습니다.')
    } finally {
      setSearchLoading(false)
    }
  }

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
