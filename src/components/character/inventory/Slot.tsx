import { Item } from '../../../types/item'

interface Prop {
  item: Item
  onClick: (item: Item) => void
}

export const Slot = ({ item, onClick }: Prop) => {
  return (
    <div
      className={`w-8 h-8 sm:w-12 sm:h-12 p-0.5 sm:p-1 ${
        item?.item_icon
          ? 'bg-gray-200 border-gray-400 hover:border-blue-500 cursor-pointer'
          : 'bg-gray-100 border-gray-300'
      } rounded-md overflow-hidden border-2 transition-colors duration-200`}
      onClick={() => item?.item_icon && onClick(item)}>
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
