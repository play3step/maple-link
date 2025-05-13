import { useQuery } from '@tanstack/react-query'
import {
  fetchCharacterAbility,
  fetchCharacterBasic,
  fetchCharacterHyperStat,
  fetchCharacterStat
} from '../../apis/Character/characterController'
import {
  CharacterAbility,
  CharacterBasic,
  CharacterStats,
  HyperStat
} from '../../types/character'

import { useUserStore } from '../../store/userStore'

export const useCharacterData = () => {
  const { characterUid } = useUserStore()
  console.log(characterUid)

  const { data: characterStats, isLoading: statsLoading } =
    useQuery<CharacterStats>({
      queryKey: ['characterStats'],
      queryFn: characterUid
        ? () => fetchCharacterStat(characterUid)
        : undefined,
      staleTime: 5 * 60 * 1000
    })

  const { data: ability, isLoading: abilityLoading } =
    useQuery<CharacterAbility>({
      queryKey: ['characterAbility'],
      queryFn: characterUid
        ? () => fetchCharacterAbility(characterUid)
        : undefined,
      staleTime: 5 * 60 * 1000
    })

  const { data: hyperStat, isLoading: hyperLoading } = useQuery<HyperStat>({
    queryKey: ['characterHyperStat'],
    queryFn: characterUid
      ? () => fetchCharacterHyperStat(characterUid)
      : undefined,
    staleTime: 5 * 60 * 1000
  })

  const { data: basic, isLoading: basicLoading } = useQuery<CharacterBasic>({
    queryKey: ['characterBasic'],
    queryFn: characterUid ? () => fetchCharacterBasic(characterUid) : undefined,
    staleTime: 5 * 60 * 1000
  })

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
