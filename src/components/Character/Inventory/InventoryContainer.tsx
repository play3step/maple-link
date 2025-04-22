import { useState } from 'react'
import { Inventory, Item } from '../../../types/item'
import ItemInventory from './ItemInventory'
import { ItemOption } from './ItemOption'

interface Props {
  inventory: Inventory
  characterImg: string
}

export const InventoryContainer = ({ inventory, characterImg }: Props) => {
  const [selected, setSelected] = useState<Item>()

  console.log(selected)

  return (
    <div className="flex gap-2">
      <ItemInventory
        inventory={inventory}
        characterImg={characterImg}
        onSelected={setSelected}
      />
      <ItemOption selectedItem={selected} />
    </div>
  )
}
