import { useState } from 'react'
import { useCharacterData } from '../../../hooks/character/useCharacterData'
import { useInventory } from '../../../hooks/character/useInventory'
import { useUserStore } from '../../../store/userStore'
import { searchCharacterOcid } from '../../../apis/character/characterController'

import { CharacterErrorState } from '../pages/CharacterErrorState'

import { CharacterLoadingSkeleton } from '../pages/CharacterLoadingSkeleton'
import { CharacterContent } from '../pages/CharacterContent'
import { CharacterDesktopHeader } from '../containers/CharacterDesktopHeader'
import { CharacterMobileHeader } from '../containers/CharacterMobileHeader'

interface CharacterPageProps {
  type: 'character' | 'search'
}

export const CharacterPage = ({ type }: CharacterPageProps) => {
  const { characterStats, ability, hyperStat, basic, isLoading, error } =
    useCharacterData()
  const { inventory } = useInventory()
  const [characterName, setCharacterName] = useState('')
  const [showStats, setShowStats] = useState(true)
  const [searchLoading, setSearchLoading] = useState(false)
  const { setCharacterOcid } = useUserStore()

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
    } catch {
      alert('캐릭터 검색에 실패했습니다.')
    } finally {
      setSearchLoading(false)
    }
  }

  // 에러 상태
  if (error) {
    return <CharacterErrorState type={type} />
  }

  return (
    <div className="w-full h-full flex flex-col gap-4 py-4">
      {/* 모바일 헤더 */}
      <CharacterMobileHeader
        type={type}
        characterName={characterName}
        setCharacterName={setCharacterName}
        searchLoading={searchLoading}
        onSearch={searchCharacterHandler}
        showStats={showStats}
        setShowStats={setShowStats}
      />

      {/* 데스크톱 헤더 */}
      <CharacterDesktopHeader
        type={type}
        characterName={characterName}
        setCharacterName={setCharacterName}
        searchLoading={searchLoading}
        onSearch={searchCharacterHandler}
        showStats={showStats}
        setShowStats={setShowStats}
      />

      {/* 컨텐츠 */}
      {isLoading ? (
        <CharacterLoadingSkeleton showStats={showStats} />
      ) : (
        <CharacterContent
          showStats={showStats}
          basic={basic}
          ability={ability}
          characterStats={characterStats}
          hyperStat={hyperStat}
          inventory={inventory}
        />
      )}
    </div>
  )
}
