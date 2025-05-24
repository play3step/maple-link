import { useQuery } from '@tanstack/react-query'
import {
  fetchCharacterAbility,
  fetchCharacterBasic,
  fetchCharacterHyperStat,
  fetchCharacterStat
} from '../../apis/character/characterController'
import {
  CharacterAbility,
  CharacterBasic,
  CharacterStats,
  HyperStat
} from '../../types/character'

import { useUserStore } from '../../store/userStore'
import { useEffect } from 'react'

export const useCharacterData = () => {
  const { userInfo, setUserName } = useUserStore()
  const ocid = userInfo?.ocid

  const { data: characterStats, isLoading: statsLoading } =
    useQuery<CharacterStats>({
      queryKey: ['characterStats', ocid],
      queryFn: ocid ? () => fetchCharacterStat(ocid) : undefined,
      staleTime: 5 * 60 * 1000
    })

  const { data: ability, isLoading: abilityLoading } =
    useQuery<CharacterAbility>({
      queryKey: ['characterAbility', ocid],
      queryFn: ocid ? () => fetchCharacterAbility(ocid) : undefined,
      staleTime: 5 * 60 * 1000
    })

  const { data: hyperStat, isLoading: hyperLoading } = useQuery<HyperStat>({
    queryKey: ['characterHyperStat', ocid],
    queryFn: ocid ? () => fetchCharacterHyperStat(ocid) : undefined,
    staleTime: 5 * 60 * 1000
  })

  const { data: basic, isLoading: basicLoading } = useQuery<CharacterBasic>({
    queryKey: ['characterBasic', ocid],
    queryFn: ocid ? () => fetchCharacterBasic(ocid) : undefined,
    staleTime: 5 * 60 * 1000
  })

  useEffect(() => {
    if (basic?.character_name) {
      setUserName(basic.character_name)
    }
  }, [basic?.character_name])

  const isLoading =
    statsLoading || abilityLoading || hyperLoading || basicLoading

  return {
    characterStats,
    ability,
    hyperStat,
    basic,
    isLoading
  }
}
