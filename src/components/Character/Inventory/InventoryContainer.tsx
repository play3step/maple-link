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

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      <div className="lg:w-3/5 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-3 border-b bg-white">
          <h3 className="text-lg font-medium text-gray-800">캐릭터 장비</h3>
        </div>
        <div className="p-3 flex-1 overflow-auto bg-white">
          <ItemInventory
            inventory={inventory}
            characterImg={characterImg}
            onSelected={setSelected}
          />
        </div>
      </div>

      <div className="lg:w-2/5 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col">
        <div className="p-3 border-b bg-white">
          <h3 className="text-lg font-medium text-gray-800">
            아이템 상세 정보
          </h3>
        </div>
        <div className="p-3 flex-1 overflow-auto">
          <ItemOption selectedItem={selected} />
        </div>
      </div>
    </div>
  )
}
