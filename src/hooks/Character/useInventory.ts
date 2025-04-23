import { useQuery } from '@tanstack/react-query'
import { Inventory } from '../../types/character'
import { fetchCharacterItem } from '../../apis/Character/characterController'

export const useInventory = () => {
  const { data: inventory, isLoading: inventoryLoading } = useQuery<Inventory>({
    queryKey: ['inventory'],
    queryFn: fetchCharacterItem,
    staleTime: 5 * 60 * 1000
  })

  return { inventory, inventoryLoading }
}
