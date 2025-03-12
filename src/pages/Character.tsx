import { useEffect, useState } from 'react'
import { StatContainer } from '../components/Character/StatContainer'
import { fetchCharacterStat } from '../apis/Character/characterController'
import { CharacterStats } from '../types/character'

const Character = () => {
  const [data, setData] = useState<CharacterStats>()
  useEffect(() => {
    fetchCharacterStat().then(v => setData(v))
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <StatContainer data={data} />
    </div>
  )
}

export default Character
