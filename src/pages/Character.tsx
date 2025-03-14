import { useEffect, useState } from 'react'
import { StatContainer } from '../components/Character/StatContainer'
import {
  fetchCharacterAbility,
  fetchCharacterHyperStat,
  fetchCharacterStat
} from '../apis/Character/characterController'
import { CharacterAbility, CharacterStats, HyperStat } from '../types/character'
import { AbilitryContainer } from '../components/Character/AbilitryContainer'
import { HyperStatContainer } from '../components/Character/HyperStatContainer'

const Character = () => {
  const [data, setData] = useState<CharacterStats>()
  const [ability, setAbility] = useState<CharacterAbility>()
  const [hyperStat, setHyperStat] = useState<HyperStat>()
  useEffect(() => {
    fetchCharacterStat().then(v => setData(v))
    fetchCharacterAbility().then(v => setAbility(v))
    fetchCharacterHyperStat().then(v => setHyperStat(v))
  }, [])

  if (!data || !ability || !hyperStat) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex gap-1">
      <HyperStatContainer hyperStat={hyperStat} />
      <StatContainer data={data} />
      <AbilitryContainer ability={ability} />
    </div>
  )
}

export default Character
