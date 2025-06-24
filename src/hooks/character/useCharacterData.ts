import { useMutation, useQuery } from '@tanstack/react-query'
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
import { syncCharacter } from '../../apis/user/userController'

export const useCharacterData = () => {
  const { setUserName, characterOcid } = useUserStore()

  const {
    data: characterStats,
    isLoading: statsLoading,
    error: statsError
  } = useQuery<CharacterStats>({
    queryKey: ['characterStats', characterOcid],
    queryFn: characterOcid
      ? () => fetchCharacterStat(characterOcid)
      : undefined,
    staleTime: 5 * 60 * 1000,
    retry: false
  })

  const {
    data: ability,
    isLoading: abilityLoading,
    error: abilityError
  } = useQuery<CharacterAbility>({
    queryKey: ['characterAbility', characterOcid],
    queryFn: characterOcid
      ? () => fetchCharacterAbility(characterOcid)
      : undefined,
    staleTime: 5 * 60 * 1000,
    retry: false
  })

  const {
    data: hyperStat,
    isLoading: hyperLoading,
    error: hyperError
  } = useQuery<HyperStat>({
    queryKey: ['characterHyperStat', characterOcid],
    queryFn: characterOcid
      ? () => fetchCharacterHyperStat(characterOcid)
      : undefined,
    staleTime: 5 * 60 * 1000,
    retry: false
  })

  const {
    data: basic,
    isLoading: basicLoading,
    error: basicError
  } = useQuery<CharacterBasic>({
    queryKey: ['characterBasic', characterOcid],
    queryFn: characterOcid
      ? () => fetchCharacterBasic(characterOcid)
      : undefined,
    staleTime: 5 * 60 * 1000,
    retry: false
  })

  const mutateSyncCharacter = useMutation({
    mutationFn: () => syncCharacter()
  })

  const syncCharacterHandler = async () => {
    try {
      await mutateSyncCharacter.mutateAsync()
    } catch (error) {
      console.error(error)
    }
  }

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
    error,
    syncCharacterHandler
  }
}
