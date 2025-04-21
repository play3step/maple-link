import { useState } from 'react'
import { Inventory } from '../../../types/item'
import ItemInventory from './ItemInventory'
import { ItemOption } from './ItemOption'

interface Props {
  inventory: Inventory
  characterImg: string
}

export const InventoryContainer = ({ inventory, characterImg }: Props) => {
  const [selected, setSelected] = useState('')

  const selectedHandle = (item: string) => {
    setSelected(item)
  }

  return (
    <div className="flex gap-2">
      <ItemInventory
        inventory={inventory}
        characterImg={characterImg}
        onSelected={selectedHandle}
      />
      <ItemOption selectedItem={selected} />
    </div>
  )
}
