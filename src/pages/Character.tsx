import { StatContainer } from '../components/Character/StatContainer'

import { AbilitryContainer } from '../components/Character/AbilitryContainer'
import { HyperStatContainer } from '../components/Character/HyperStatContainer'
import { CharacterInfoContainer } from '../components/Character/CharacterInfoContainer'
import { useCharacterData } from '../hooks/Character/useCharacterData'

const Character = () => {
  const { characterStats, ability, hyperStat, basic, isLoading } =
    useCharacterData()

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex gap-1">
      {hyperStat && <HyperStatContainer hyperStat={hyperStat} />}
      {characterStats && <StatContainer Stats={characterStats} />}
      <div className="flex flex-col gap-1">
        {basic && <CharacterInfoContainer basic={basic} />}
        {ability && <AbilitryContainer ability={ability} />}
      </div>
    </div>
  )
}

export default Character
