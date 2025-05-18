import { useQuery } from '@tanstack/react-query'
import { useUserStore } from '../../store/userStore'
import { fetchCharacterItem } from '../../apis/character/characterController'
import { Inventory } from '../../types/item'

export const useInventory = () => {
  const { userInfo } = useUserStore()
  const { data: inventory, isLoading: inventoryLoading } = useQuery<Inventory>({
    queryKey: ['inventory', userInfo?.ocid],
    queryFn: () => fetchCharacterItem(userInfo!.ocid!),
    staleTime: 5 * 60 * 1000,
    enabled: !!userInfo?.ocid
  })

  return { inventory, inventoryLoading }
}
