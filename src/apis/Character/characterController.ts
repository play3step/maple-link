import { nexonApi } from '..'
import { CharacterAbility, CharacterStats } from '../../types/character'

export const fetchCharacterStat = async () => {
  const response = await nexonApi.get<CharacterStats>(
    '/maplestory/v1/character/stat',
    {
      params: {
        ocid: import.meta.env.VITE_ocid
      }
    }
  )
  return response.data
}

export const fetchCharacterAbility = async () => {
  const response = await nexonApi.get<CharacterAbility>(
    '/maplestory/v1/character/ability',
    {
      params: {
        ocid: import.meta.env.VITE_ocid
      }
    }
  )
  return response.data
}
