import { useQuery } from '@tanstack/react-query'
import { useUserStore } from '../../store/userStore'
import { fetchCharacterItem } from '../../apis/Character/characterController'
import { Inventory } from '../../types/item'

export const useInventory = () => {
  const { characterUid } = useUserStore()
  const { data: inventory, isLoading: inventoryLoading } = useQuery<Inventory>({
    queryKey: ['inventory'],
    queryFn: characterUid ? () => fetchCharacterItem(characterUid) : undefined,
    staleTime: 5 * 60 * 1000
  })

  return { inventory, inventoryLoading }
}
