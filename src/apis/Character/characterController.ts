import { nexonApi } from '..'
import {
  CharacterAbility,
  CharacterBasic,
  CharacterStats,
  HyperStat,
  CharacterSearch
} from '../../types/character'
import { Inventory } from '../../types/item'

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

export const fetchCharacterHyperStat = async () => {
  const response = await nexonApi.get<HyperStat>(
    '/maplestory/v1/character/hyper-stat',
    {
      params: {
        ocid: import.meta.env.VITE_ocid
      }
    }
  )
  return response.data
}

export const fetchCharacterBasic = async () => {
  const response = await nexonApi.get<CharacterBasic>(
    '/maplestory/v1/character/basic',
    {
      params: {
        ocid: import.meta.env.VITE_ocid
      }
    }
  )
  return response.data
}

export const fetchCharacterItem = async () => {
  const response = await nexonApi.get<Inventory>(
    '/maplestory/v1/character/item-equipment',
    {
      params: {
        ocid: import.meta.env.VITE_ocid
      }
    }
  )
  return response.data
}

export const searchCharacter = async (characterName: string) => {
  const characterOcid = await nexonApi.get('/maplestory/v1/id', {
    params: {
      character_name: characterName
    }
  })

  if (characterOcid.status === 400) {
    return null
  }

  const response = await nexonApi.get<CharacterSearch>(
    '/maplestory/v1/character/basic',
    {
      params: {
        ocid: characterOcid.data.ocid
      }
    }
  )
  return response.data
}
