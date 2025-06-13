import { nexonApi } from '..'
import {
  CharacterAbility,
  CharacterBasic,
  CharacterStats,
  HyperStat,
  CharacterSearch
} from '../../types/character'
import { Inventory } from '../../types/item'

export const searchCharacterOcid = async (characterName: string) => {
  try {
    const response = await nexonApi.get<{ ocid: string }>('/maplestory/v1/id', {
      params: { character_name: characterName }
    })
    return response.data
  } catch {
    return { ocid: null }
  }
}

export const fetchCharacterStat = async (characterUid: string) => {
  const response = await nexonApi.get<CharacterStats>(
    '/maplestory/v1/character/stat',
    {
      params: {
        ocid: characterUid
      }
    }
  )
  return response.data
}

export const fetchCharacterAbility = async (characterUid: string) => {
  const response = await nexonApi.get<CharacterAbility>(
    '/maplestory/v1/character/ability',
    {
      params: {
        ocid: characterUid
      }
    }
  )
  return response.data
}

export const fetchCharacterHyperStat = async (characterUid: string) => {
  const response = await nexonApi.get<HyperStat>(
    '/maplestory/v1/character/hyper-stat',
    {
      params: {
        ocid: characterUid
      }
    }
  )
  return response.data
}

export const fetchCharacterBasic = async (characterUid: string) => {
  const response = await nexonApi.get<CharacterBasic>(
    '/maplestory/v1/character/basic',
    {
      params: {
        ocid: characterUid
      }
    }
  )
  return response.data
}

export const fetchCharacterItem = async (characterUid: string) => {
  const response = await nexonApi.get<Inventory>(
    '/maplestory/v1/character/item-equipment',
    {
      params: {
        ocid: characterUid
      }
    }
  )
  return response.data
}

const getOcid = async (characterName: string) => {
  try {
    const response = await nexonApi.get('/maplestory/v1/id', {
      params: { character_name: characterName }
    })
    return response.data.ocid ?? null
  } catch {
    return null
  }
}

const getTodayDate = () => {
  return new Date().toISOString().slice(0, 10)
}

// 캐릭터 기본 정보 조회
export const searchCharacter = async (characterName: string) => {
  const ocid = await getOcid(characterName)
  if (!ocid) return null

  const response = await nexonApi.get<CharacterSearch>(
    '/maplestory/v1/character/basic',
    {
      params: { ocid }
    }
  )
  return response.data
}

// 메인 캐릭터 조회
export const findMainCharacter = async (characterName: string) => {
  const ocid = await getOcid(characterName)
  if (!ocid) return null

  const { data: basicInfo } = await nexonApi.get<CharacterSearch>(
    '/maplestory/v1/character/basic',
    {
      params: { ocid }
    }
  )

  const { data: unionInfo } = await nexonApi.get(
    '/maplestory/v1/ranking/union',
    {
      params: {
        date: getTodayDate(),
        ocid,
        world_name: basicInfo.world_name
      }
    }
  )

  return unionInfo
}
