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

  const {
    data: characterStats,
    isLoading: statsLoading,
    error: statsError
  } = useQuery<CharacterStats>({
    queryKey: ['characterStats', ocid],
    queryFn: ocid ? () => fetchCharacterStat(ocid) : undefined,
    staleTime: 5 * 60 * 1000,
    retry: false
  })

  const {
    data: ability,
    isLoading: abilityLoading,
    error: abilityError
  } = useQuery<CharacterAbility>({
    queryKey: ['characterAbility', ocid],
    queryFn: ocid ? () => fetchCharacterAbility(ocid) : undefined,
    staleTime: 5 * 60 * 1000,
    retry: false
  })

  const {
    data: hyperStat,
    isLoading: hyperLoading,
    error: hyperError
  } = useQuery<HyperStat>({
    queryKey: ['characterHyperStat', ocid],
    queryFn: ocid ? () => fetchCharacterHyperStat(ocid) : undefined,
    staleTime: 5 * 60 * 1000,
    retry: false
  })

  const {
    data: basic,
    isLoading: basicLoading,
    error: basicError
  } = useQuery<CharacterBasic>({
    queryKey: ['characterBasic', ocid],
    queryFn: ocid ? () => fetchCharacterBasic(ocid) : undefined,
    staleTime: 5 * 60 * 1000,
    retry: false
  })

  useEffect(() => {
    if (basic?.character_name) {
      setUserName(basic.character_name)
    }
  }, [basic?.character_name])

  const isLoading =
    statsLoading || abilityLoading || hyperLoading || basicLoading

  const error = statsError || abilityError || hyperError || basicError

  return {
    characterStats,
    ability,
    hyperStat,
    basic,
    isLoading,
    error
  }
}
