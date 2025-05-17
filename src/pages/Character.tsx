import { StatContainer } from '../components/character/StatContainer'

import { AbilitryContainer } from '../components/character/AbilitryContainer'
import { HyperStatContainer } from '../components/character/HyperStatContainer'

import { CharacterInfoContainer } from '../components/character/CharacterInfoContainer'
import { useCharacterData } from '../hooks/character/useCharacterData'
import { useInventory } from '../hooks/character/useInventory'

import { InventoryContainer } from '../components/character/inventory/InventoryContainer'
import { useState } from 'react'

const Character = () => {
  const { characterStats, ability, hyperStat, basic, isLoading } =
    useCharacterData()

  const { inventory } = useInventory()

  // true: 스탯 페이지, false: 아이템 페이지
  const [showStats, setShowStats] = useState(true)

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

  return (
    <div className="w-full flex flex-col gap-4 py-4">
      {/* 탭 버튼 */}
      <div className="flex justify-center mb-2">
        <div className="bg-white shadow-md rounded-lg p-1 flex">
          <button
            onClick={() => setShowStats(true)}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              showStats
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100'
            }`}>
            스탯 정보
          </button>
          <button
            onClick={() => setShowStats(false)}
            className={`px-6 py-2 rounded-md font-medium transition-all duration-200 ${
              !showStats
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-700 hover:bg-gray-100'
            }`}>
            장비 정보
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

export default Character
