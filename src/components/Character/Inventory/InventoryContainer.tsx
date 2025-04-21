import { useState } from 'react'
import { Inventory } from '../../../types/character'
import ItemInventory from './ItemInventory'

interface Props {
  inventory: Inventory
  characterImg: string
}

export const InventoryContainer = ({ inventory, characterImg }: Props) => {
  const [selected, setSelected] = useState('')

  const selectedHandle = (item: string) => {
    setSelected(item)
  }

  console.log(selected)

  return (
    <ItemInventory
      inventory={inventory}
      characterImg={characterImg}
      onSelected={selectedHandle}
    />
  )
}
