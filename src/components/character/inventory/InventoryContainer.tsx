import { useState, useEffect } from 'react'
import { Inventory, Item } from '../../../types/item'
import ItemInventory from './ItemInventory'
import { ItemOption } from './ItemOption'

interface Props {
  inventory: Inventory
  characterImg: string
}

export const InventoryContainer = ({ inventory, characterImg }: Props) => {
  const [selected, setSelected] = useState<Item>()
  const [preset, setPreset] = useState<Item[]>([])
  const [selectedPreset, setSelectedPreset] = useState<number>(1)

  useEffect(() => {
    const preset =
      selectedPreset === 1
        ? inventory.item_equipment_preset_1
        : selectedPreset === 2
          ? inventory.item_equipment_preset_2
          : inventory.item_equipment_preset_3
    setPreset(preset)
  }, [inventory, selectedPreset])

  return (
    <div className="w-full flex flex-col lg:flex-row gap-4">
      <div className="lg:w-3/5 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
        <div className="flex justify-between items-center p-3 border-b bg-white">
          <h3 className="text-lg font-medium text-gray-800">캐릭터 장비</h3>
          <div className="flex justify-center gap-2">
            {[1, 2, 3].map(num => (
              <button
                key={num}
                onClick={() => setSelectedPreset(num)}
                className={`px-3 py-1 rounded-md text-sm transition-all ${
                  selectedPreset === num
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}>
                프리셋 {num}
              </button>
            ))}
          </div>
        </div>
        <div className="flex-1 overflow-auto p-4 bg-white">
          <ItemInventory
            inventory={preset}
            characterImg={characterImg}
            onSelected={setSelected}
          />
        </div>
      </div>

      <div className="lg:w-2/5 bg-white rounded-lg border border-gray-200 shadow-sm overflow-hidden flex flex-col min-h-[400px] max-h-[800px]">
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
