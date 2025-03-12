import { useEffect, useState } from 'react'
import { StatContainer } from '../components/Character/StatContainer'
import {
  fetchCharacterAbility,
  fetchCharacterStat
} from '../apis/Character/characterController'
import { CharacterAbility, CharacterStats } from '../types/character'
import { AbilitryContainer } from '../components/Character/AbilitryContainer'

const Character = () => {
  const [data, setData] = useState<CharacterStats>()
  const [ability, setAbility] = useState<CharacterAbility>()
  useEffect(() => {
    fetchCharacterStat().then(v => setData(v))
    fetchCharacterAbility().then(v => setAbility(v))
  }, [])

  if (!data || !ability) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex gap-1">
      <StatContainer data={data} />
      <AbilitryContainer ability={ability} />
    </div>
  )
}

export default Character
