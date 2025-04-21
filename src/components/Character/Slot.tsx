import { Item } from '../../types/character'

interface Prop {
  item: Item
}

export const Slot = ({ item }: Prop) => {
  return (
    <div className="w-12 h-12 p-1 bg-gray-200 border-gray-400 rounded-md overflow-hidden hover:border-red-600 border-2">
      {item?.item_icon && (
        <img
          src={item.item_icon}
          alt={item.item_equipment_slot}
          className="w-full h-full object-contain"
        />
      )}
    </div>
  )
}
