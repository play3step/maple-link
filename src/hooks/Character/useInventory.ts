import { useQuery } from '@tanstack/react-query'

import { fetchCharacterItem } from '../../apis/Character/characterController'
import { Inventory } from '../../types/item'

export const useInventory = () => {
  const { data: inventory, isLoading: inventoryLoading } = useQuery<Inventory>({
    queryKey: ['inventory'],
    queryFn: fetchCharacterItem,
    staleTime: 5 * 60 * 1000
  })

  return { inventory, inventoryLoading }
}
