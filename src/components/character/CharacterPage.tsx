import { useState } from 'react'
import { AbilitryContainer } from './AbilitryContainer'
import { CharacterInfoContainer } from './CharacterInfoContainer'
import { HyperStatContainer } from './HyperStatContainer'
import { InventoryContainer } from './inventory/InventoryContainer'
import { StatContainer } from './StatContainer'
import { useCharacterData } from '../../hooks/character/useCharacterData'
import { useInventory } from '../../hooks/character/useInventory'

import { useUserStore } from '../../store/userStore'
import { searchCharacterOcid } from '../../apis/character/characterController'

import { FiAlertTriangle, FiRefreshCcw } from 'react-icons/fi'

interface CharacterPageProps {
  type: 'character' | 'search'
}

export const CharacterPage = ({ type }: CharacterPageProps) => {
  const { characterStats, ability, hyperStat, basic, isLoading, error } =
    useCharacterData()
  const [characterName, setCharacterName] = useState('')

  const { inventory } = useInventory()

  const [showStats, setShowStats] = useState(true)

  const { setCharacterOcid } = useUserStore()
  const [searchLoading, setSearchLoading] = useState(false)

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
      setCharacterOcid(ocid)
    } catch (error) {
      console.error(error)
      alert('캐릭터 검색에 실패했습니다.')
    } finally {
      setSearchLoading(false)
    }
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex justify-center items-center p-8">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mb-4"></div>
          <p className="text-gray-600 font-medium">
            캐릭터 정보를 불러오는 중...
          </p>
        </div>
        <div className="flex flex-col items-center"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="w-full h-full flex justify-center items-center p-8">
        <div className="max-w-lg w-full bg-white rounded-xl p-8 shadow-lg">
          <div className="flex items-center justify-center mb-6 relative">
            {type === 'search' && (
              <div className="absolute top-0 right-0 flex flex-col items-center justify-center gap-2">
                <button
                  onClick={() => {}}
                  className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-50 transition-all duration-200 hover:shadow-sm">
                  <FiRefreshCcw className="text-red-500 text-2xl flex-shrink-0" />
                  <span className="text-red-500 text-sm">동기화하기</span>
                </button>
              </div>
            )}
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
              <FiAlertTriangle className="text-red-500 text-2xl" />
            </div>
          </div>
          <h1 className="text-xl font-bold text-center text-gray-800 mb-2">
            캐릭터 정보를 불러올 수 없습니다
          </h1>
          <p className="text-gray-600 text-center mb-6">
            2023년 12월 21일 이후의 데이터만 조회할 수 있습니다.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 py-4">
      {/* 탭 버튼 */}
      <div className="flex justify-between items-center mb-2 max-w-6xl mx-auto w-full px-4">
        {type === 'character' ? (
          <div className="flex flex-col items-center justify-center gap-2 mr-24">
            <button
              onClick={() => {}}
              className="flex items-center gap-2 border border-red-500 text-red-500 px-4 py-2 rounded-md hover:bg-red-50 transition-all duration-200 hover:shadow-sm">
              <FiRefreshCcw className="text-red-500 text-2xl flex-shrink-0" />
              <span className="text-red-500 text-sm">동기화하기</span>
            </button>
          </div>
        ) : (
          <div className="w-64"></div>
        )}
        <div className="bg-white shadow-sm rounded-lg p-1 flex gap-1">
          <button
            onClick={() => setShowStats(true)}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              showStats
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}>
            스탯 정보
          </button>
          <button
            onClick={() => setShowStats(false)}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              !showStats
                ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-sm'
                : 'text-gray-600 hover:bg-gray-50'
            }`}>
            장비 정보
          </button>
        </div>

        <div className="flex items-center gap-2 w-64">
          <input
            type="text"
            placeholder="캐릭터 이름을 입력해주세요"
            className="flex-1 px-3 py-1.5 text-sm border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
            value={characterName}
            onChange={e => setCharacterName?.(e.target.value)}
          />
          <button
            onClick={searchCharacterHandler}
            disabled={searchLoading}
            className={`px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm flex-shrink-0 ${
              searchLoading
                ? 'bg-blue-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}>
            {searchLoading ? '검색 중...' : '검색'}
          </button>
        </div>
      </div>

      {/* 콘텐츠 영역 */}
      <div className="w-full max-w-6xl mx-auto rounded-xl bg-white/90 shadow-lg border border-blue-100 p-3 sm:p-4">
        {showStats ? (
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-3">
            {/* 캐릭터 정보와 어빌리티 (큰 화면에서 세로로 배치) */}
            <div className="lg:col-span-1 order-1 flex flex-col gap-3">
              {/* 캐릭터 정보 (작은 화면에서 맨 위) */}
              <div>{basic && <CharacterInfoContainer basic={basic} />}</div>

              {/* 어빌리티 (캐릭터 정보 아래에 배치) */}
              <div>{ability && <AbilitryContainer ability={ability} />}</div>
            </div>

            {/* 기본 스탯 (큰 화면에서 중앙에 위치) */}
            <div className="lg:col-span-2 order-3 lg:order-2 min-h-[500px]">
              {characterStats && <StatContainer Stats={characterStats} />}
            </div>

            {/* 하이퍼 스탯 (큰 화면에서 오른쪽에 위치) */}
            <div className="lg:col-span-1 order-4 lg:order-3 min-h-[500px] flex flex-col">
              {hyperStat && <HyperStatContainer hyperStat={hyperStat} />}
            </div>
          </div>
        ) : (
          <div className="w-full">
            {inventory && basic?.character_image && (
              <InventoryContainer
                inventory={inventory}
                characterImg={basic?.character_image}
              />
            )}
          </div>
        )}
      </div>
    </div>
  )
}
