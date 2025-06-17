import { useState } from 'react'
import { AbilitryContainer } from './AbilitryContainer'
import { CharacterInfoContainer } from './CharacterInfoContainer'
import { HyperStatContainer } from './HyperStatContainer'
import { InventoryContainer } from './inventory/InventoryContainer'
import { StatContainer } from './StatContainer'
import { useCharacterData } from '../../hooks/character/useCharacterData'
import { useInventory } from '../../hooks/character/useInventory'
import { useNavigate } from 'react-router-dom'
import { useUserStore } from '../../store/userStore'
import { searchCharacterOcid } from '../../apis/character/characterController'

export const CharacterPage = () => {
  const { characterStats, ability, hyperStat, basic, isLoading, error } =
    useCharacterData()
  const [characterName, setCharacterName] = useState('')

  const { inventory } = useInventory()

  const [showStats, setShowStats] = useState(true)
  const nav = useNavigate()
  const { setCharacterOcid } = useUserStore()

  const searchCharacterHandler = async () => {
    if (characterName.trim() === '') {
      alert('캐릭터 이름을 입력해주세요.')
      return
    }

    const { ocid } = await searchCharacterOcid(characterName.trim())

    if (!ocid) {
      alert('캐릭터를 찾을 수 없습니다.')
      return
    }

    setCharacterOcid(ocid)
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
      </div>
    )
  }

  if (error) {
    alert(
      '2023년 12월 21일 이후의 데이터만 조회할 수 있습니다.\n게임에 접속한 뒤 다시 시도해주세요.'
    )
    nav('/')
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 py-4">
      {/* 탭 버튼 */}
      <div className="flex justify-between items-center mb-2 max-w-6xl mx-auto w-full px-4">
        <div className="w-64"></div>
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
            className="px-4 py-1.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-sm font-medium rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all shadow-sm flex-shrink-0">
            검색
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
