import { useQuery } from '@tanstack/react-query'
import { useUserStore } from '../../store/userStore'
import { fetchCharacterItem } from '../../apis/character/characterController'
import { Inventory } from '../../types/item'

export const useInventory = () => {
  const { characterOcid } = useUserStore()
  const { data: inventory, isLoading: inventoryLoading } = useQuery<Inventory>({
    queryKey: ['inventory', characterOcid],
    queryFn: () => fetchCharacterItem(characterOcid!),
    staleTime: 5 * 60 * 1000,
    enabled: !!characterOcid
  })

  return { inventory, inventoryLoading }
}
