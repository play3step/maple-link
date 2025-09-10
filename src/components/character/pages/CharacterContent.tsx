import { InventoryContainer } from '../inventory/InventoryContainer'
import {
  CharacterStats,
  CharacterAbility,
  HyperStat,
  CharacterBasic
} from '../../../types/character'

import { Inventory } from '../../../types/item'
import { CharacterInfoContainer } from '../containers/CharacterInfoContainer'
import { AbilitryContainer } from '../stats/AbilitryContainer'
import StatContainer from '../stats/StatContainer'
import { HyperStatContainer } from '../stats/HyperStatContainer'

interface CharacterContentProps {
  showStats: boolean
  basic?: CharacterBasic
  ability?: CharacterAbility
  characterStats?: CharacterStats
  hyperStat?: HyperStat
  inventory?: Inventory
}

export const CharacterContent = ({
  showStats,
  basic,
  ability,
  characterStats,
  hyperStat,
  inventory
}: CharacterContentProps) => {
  return (
    <div className="w-full max-w-6xl mx-auto rounded-xl bg-white/90 shadow-lg border border-blue-100 p-3 sm:p-4">
      {showStats ? (
        <>
          {/* 데스크톱 레이아웃 (lg 이상) */}
          <div className="hidden lg:grid grid-cols-1 lg:grid-cols-4 gap-3">
            <div className="lg:col-span-1 order-1 flex flex-col gap-3">
              <div>{basic && <CharacterInfoContainer basic={basic} />}</div>
              <div>{ability && <AbilitryContainer ability={ability} />}</div>
            </div>
            <div className="lg:col-span-2 order-3 lg:order-2 min-h-[500px]">
              {characterStats && <StatContainer Stats={characterStats} />}
            </div>
            <div className="lg:col-span-1 order-4 lg:order-3 min-h-[500px] flex flex-col">
              {hyperStat && <HyperStatContainer hyperStat={hyperStat} />}
            </div>
          </div>

          {/* 모바일 레이아웃 (lg 미만) */}
          <div className="lg:hidden space-y-4">
            {basic && (
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <CharacterInfoContainer basic={basic} />
              </div>
            )}
            {ability && (
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <AbilitryContainer ability={ability} />
              </div>
            )}
            {characterStats && (
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <StatContainer Stats={characterStats} />
              </div>
            )}
            {hyperStat && (
              <div className="bg-white rounded-xl overflow-hidden shadow-sm">
                <HyperStatContainer hyperStat={hyperStat} />
              </div>
            )}
          </div>
        </>
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
  )
}
