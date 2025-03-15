import { useEffect, useState } from 'react'
import { StatContainer } from '../components/Character/StatContainer'
import {
  fetchCharacterAbility,
  fetchCharacterBasic,
  fetchCharacterHyperStat,
  fetchCharacterStat
} from '../apis/Character/characterController'
import {
  CharacterAbility,
  CharacterBasic,
  CharacterStats,
  HyperStat
} from '../types/character'
import { AbilitryContainer } from '../components/Character/AbilitryContainer'
import { HyperStatContainer } from '../components/Character/HyperStatContainer'
import { CharacterInfoContainer } from '../components/Character/CharacterInfoContainer'

const Character = () => {
  const [data, setData] = useState<CharacterStats>()
  const [ability, setAbility] = useState<CharacterAbility>()
  const [hyperStat, setHyperStat] = useState<HyperStat>()
  const [basic, setBasic] = useState<CharacterBasic>()

  useEffect(() => {
    fetchCharacterStat().then(v => setData(v))
    fetchCharacterAbility().then(v => setAbility(v))
    fetchCharacterHyperStat().then(v => setHyperStat(v))
    fetchCharacterBasic().then(v => setBasic(v))
  }, [])

  if (!data || !ability || !hyperStat || !basic) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex gap-1">
      <HyperStatContainer hyperStat={hyperStat} />
      <StatContainer data={data} />
      <div className="flex flex-col gap-1">
        <CharacterInfoContainer basic={basic} />
        <AbilitryContainer ability={ability} />
      </div>
    </div>
  )
}

export default Character
